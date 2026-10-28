"""Behavioral tests: python -m unittest discover -s examples/expense_report."""
import contextlib
import io
from decimal import Decimal
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from expense_report import Expense, main, parse_amount, read_expenses, summarize


class AmountTests(unittest.TestCase):
    def test_exact_values(self):
        for text, expected in [("0", "0.00"), ("-0", "0.00"), ("12.50", "12.50"), ("1.2300", "1.23")]:
            with self.subTest(text=text):
                self.assertEqual(str(parse_amount(text)), expected)

    def test_rejects_invalid_values(self):
        for text in ["", "bad", "-1", "NaN", "sNaN", "Infinity", "1.001", "1000000000", "1e999999", "9" * 41]:
            with self.subTest(text=text), self.assertRaises(ValueError):
                parse_amount(text)


class ReportTests(unittest.TestCase):
    def setUp(self):
        directory = TemporaryDirectory()
        self.addCleanup(directory.cleanup)
        self.path = Path(directory.name) / "expenses.csv"

    def write(self, text):
        self.path.write_text(text, encoding="utf-8")

    def test_exact_aggregation_and_empty_input(self):
        self.assertEqual(summarize([]), {})
        self.assertEqual(summarize([Expense("books", Decimal("0.10")), Expense("books", Decimal("0.20"))]), {"books": Decimal("0.30")})

    def test_csv_quoting_and_unicode(self):
        self.write('category,amount\n"books, café",12.50\n')
        self.assertEqual(read_expenses(self.path), [Expense("books, café", Decimal("12.50"))])

    def test_header_only_is_valid(self):
        self.write("category,amount\n")
        self.assertEqual(read_expenses(self.path), [])

    def test_bad_headers_and_rows(self):
        for content in ["", "amount,category\n", "category,amount,extra\n", "category,amount\n,2\n", "category,amount\nbooks\n", "category,amount\nbooks,2,extra\n", "category,amount\nbooks,NaN\n", 'category,amount\n"bad\ncategory",1\n']:
            with self.subTest(content=content):
                self.write(content)
                with self.assertRaises(ValueError):
                    read_expenses(self.path)

    def test_cli_success_is_sorted(self):
        self.write("category,amount\ntravel,20\nbooks,12.50\nbooks,7.25\n")
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            self.assertEqual(main([str(self.path)]), 0)
        self.assertEqual(output.getvalue(), "books: 19.75\ntravel: 20.00\n")

    def test_failure_has_no_partial_stdout(self):
        self.write("category,amount\nbooks,1\ntravel,bad\n")
        output, errors = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(output), contextlib.redirect_stderr(errors):
            self.assertEqual(main([str(self.path)]), 1)
        self.assertEqual(output.getvalue(), "")
        self.assertIn("line 3", errors.getvalue())

    def test_missing_file_and_invalid_encoding(self):
        errors = io.StringIO()
        with contextlib.redirect_stderr(errors):
            self.assertEqual(main([str(self.path)]), 1)
        self.path.write_bytes(b"category,amount\n\xff,1\n")
        with contextlib.redirect_stderr(errors):
            self.assertEqual(main([str(self.path)]), 1)


if __name__ == "__main__":
    unittest.main()
