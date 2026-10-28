"""Validate a CSV expense file and print exact totals. Python 3.11+, standard library only."""
from __future__ import annotations

import argparse
import csv
import sys
from dataclasses import dataclass
from decimal import Decimal, InvalidOperation
from pathlib import Path
from typing import Iterable

MAX_ROWS = 100_000
MAX_FILE_BYTES = 10_000_000
MAX_AMOUNT = Decimal("999999999.99")
CENT = Decimal("0.01")


@dataclass(frozen=True)
class Expense:
    category: str
    amount: Decimal


def parse_amount(text: str) -> Decimal:
    """Reject invalid, negative, non-finite, overprecise, and oversized amounts."""
    if len(text) > 40:
        raise ValueError("amount text is too long")
    try:
        amount = Decimal(text)
    except InvalidOperation as error:
        raise ValueError("invalid amount") from error
    if not amount.is_finite() or amount < 0:
        raise ValueError("amount must be finite and nonnegative")
    if amount > MAX_AMOUNT:
        raise ValueError("amount exceeds per-record limit")
    rounded = amount.quantize(CENT)
    if rounded != amount:
        raise ValueError("amount has more than two decimal places")
    # Normalize negative zero to a nonnegative display.
    return abs(rounded)


def read_expenses(path: Path) -> list[Expense]:
    """Read a bounded UTF-8 CSV; fail the entire input on any invalid record."""
    if path.stat().st_size > MAX_FILE_BYTES:
        raise ValueError("file exceeds 10 MB limit")
    expenses = []
    with path.open(encoding="utf-8", newline="") as stream:
        reader = csv.DictReader(stream, strict=True)
        if reader.fieldnames != ["category", "amount"]:
            raise ValueError("expected exactly the header: category,amount")
        for index, row in enumerate(reader, start=1):
            if index > MAX_ROWS:
                raise ValueError("file exceeds row limit")
            if None in row or row.get("amount") is None:
                raise ValueError(f"line {reader.line_num}: expected two columns")
            category = row["category"].strip()
            if not category:
                raise ValueError(f"line {reader.line_num}: category is required")
            if any(ord(character) < 32 or ord(character) == 127 for character in category):
                raise ValueError(f"line {reader.line_num}: category contains control characters")
            try:
                amount = parse_amount(row["amount"])
            except ValueError as error:
                raise ValueError(f"line {reader.line_num}: {error}") from error
            expenses.append(Expense(category, amount))
    return expenses


def summarize(expenses: Iterable[Expense]) -> dict[str, Decimal]:
    """Aggregate validated expenses; no I/O and no input mutation."""
    totals: dict[str, Decimal] = {}
    for expense in expenses:
        totals[expense.category] = totals.get(expense.category, Decimal("0.00")) + expense.amount
    return totals


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", type=Path, help="UTF-8 CSV with category,amount header")
    args = parser.parse_args(argv)
    try:
        totals = summarize(read_expenses(args.path))
    except (OSError, UnicodeError, ValueError, csv.Error) as error:
        print(f"error: {error}", file=sys.stderr)
        return 1
    for category, amount in sorted(totals.items()):
        print(f"{category}: {amount:.2f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
