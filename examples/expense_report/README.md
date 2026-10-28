# Expense report capstone

Python 3.11+; no third-party dependencies. Run from the repository root:

```bash
python examples/expense_report/expense_report.py examples/expense_report/sample.csv
python -m unittest discover -s examples/expense_report -p 'test_*.py'
```

Expected sample output:

```text
books: 19.75
travel: 20.00
```

Input must be UTF-8 CSV with exactly `category,amount` in that order. Categories
are trimmed, case-sensitive, and must be nonempty without control characters.
Quoted commas are supported. Blank physical lines are skipped by the CSV reader.
A header-only file is valid; a completely empty file is not.

Amounts must be finite, nonnegative, at most 999999999.99, and exactly representable
to two decimal places. Trailing zeroes are accepted; extra meaningful decimal places
are rejected rather than silently rounded. Negative zero is displayed as 0.00.
Decimal syntax, including scientific notation, is accepted within these limits.
Input is limited to 10 MB, 100,000 records, and 40 characters per amount. This is a
local-file learning tool; the initial size check is not a streaming upload defense
against a file that changes concurrently.

On success, sorted totals go to stdout and the exit status is 0. On an input error,
a diagnostic goes to stderr, stdout stays empty, and the exit status is 1. Argument
usage errors use argparse's exit status 2. No files are modified.

The functions illustrate separate boundaries: `parse_amount` validates money,
`read_expenses` validates CSV records, `summarize` aggregates validated records, and
`main` handles terminal I/O. Tests use temporary files and require no network.

Try extending this with JSON output, date filtering, or SQLite persistence. Define
new validation and failure behavior before implementing each extension.
