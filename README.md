# Python Refresher Course

A practical, interactive refresher for developers returning to Python or moving
beyond the basics: **23 chapters, 147 learning steps, 103 knowledge-check
questions, and 23 practice labs with worked solutions**.

The browser course has no build step, third-party dependencies, remote fonts, or
network requirements. Open `index.html` directly, or serve the repository:

```bash
python3 -m http.server 8080
```

Visit http://localhost:8080. Python examples target **Python 3.11+**; the course
labels newer syntax and distinguishes optional tools from the standard library.
The browser displays examples; it does **not** execute Python. Run exercises in
your local interpreter. HTTP examples require an actual endpoint when invoked;
the supplied capstone and automated checks work offline.

## How to study

1. Search chapters by topic or learning goal, or filter by learning track.
2. Read the chapter goals and work through lessons and prediction questions.
3. Write and run the practice lab before opening **Show worked solution**.
4. Use the lesson outline to revisit unlocked steps. Later steps unlock as you work.
5. Complete the knowledge check. At least 60% is required; explanations appear
   after submission and quizzes can be retried.
6. Build the expense-report capstone, then try a stretch goal.

Plan about 25 minutes per Foundations chapter and 35 minutes per Engineering
chapter, plus extra time for experiments and the capstone. These are estimates,
not timers. Experienced developers can choose any chapter from the dashboard.

Progress stays in the browser's local storage for that origin; a different browser,
port, or hostname has separate progress. When upgrading from the original course,
completed lesson positions remain, but expanded quizzes must be passed again.
Reset clears lesson progress, scores, and session answers. If browser storage is
blocked, a notice explains that progress is kept only during the current session.
Practice solutions are self-assessed; quiz completion does not verify that code
was written or run.

## Foundations

| # | Chapter | Added depth |
|---|---------|-------------|
| 1 | Python Basics | Names and objects, equality vs identity, truthiness, numeric edges |
| 2 | Control Flow | enumerate, strict zip, loop else, matching, guard clauses |
| 3 | Functions & Scope | Mutable defaults, keyword-only arguments, closures, nonlocal |
| 4 | Data Structures | Nested mutability, shallow/deep copying, hashing, sorting |
| 5 | String Manipulation | Unicode, bytes, normalization, regex validation, formatting |
| 6 | File I/O | Cursor movement, encodings, pathlib, streaming, CSV and JSON |
| 7 | Error Handling & Exceptions | Narrow catches, chaining, BaseException, tracebacks |
| 8 | Modules & Packages | Interpreter-bound pip, environments, import side effects, namespaces |
| 9 | Object-Oriented Programming | Instance vs class state, allocation vs initialization, composition |
| 10 | Advanced Topics | wraps, performance clocks, generator exhaustion, cache tradeoffs |
| 11 | Standard Library Highlights | Aware timestamps, Decimal, groupby, bounded iterators |

## Engineering

| # | Chapter | Practical outcome |
|---|---------|-------------------|
| 12 | Type Hints & Static Analysis | Model optional values, generics, TypedDict, and Protocol |
| 13 | Dataclasses & Data Modeling | Create records with factories, invariants, enums, and explicit serialization |
| 14 | Testing & Testable Design | Write unittest/pytest tests and inject clocks and I/O |
| 15 | Debugging, Logging & Observability | Diagnose failures and add useful operational signals |
| 16 | HTTP Clients & API Boundaries | Bound requests, validate payloads, reason about retries |
| 17 | SQLite & Transactions | Bind parameters, handle rollback, close connections explicitly |
| 18 | Asyncio & Structured Concurrency | Use TaskGroup, timeouts, cancellation, and nonblocking I/O |
| 19 | Threads, Processes & Parallel Work | Choose executors and coordinate shared state |
| 20 | Command-Line Tools & Configuration | Parse arguments and environment settings; launch safe subprocesses |
| 21 | Packaging & Project Workflows | Use src layouts, pyproject.toml, editable installs, local builds |
| 22 | Performance & Secure Coding | Profile real work and bound unsafe/resource-intensive input |
| 23 | Capstone: Expense Report CLI | Deliver a tested tool combining CSV, Decimal, records, and a CLI |

## Runnable capstone

[Expense report project](examples/expense_report/README.md) includes the full
implementation, sample data, behavior contract, and tests, using only the Python
standard library:

```bash
python examples/expense_report/expense_report.py examples/expense_report/sample.csv
python -m unittest discover -s examples/expense_report -p 'test_*.py'
```

Expected output:

```text
books: 19.75
travel: 20.00
```

## Development and checks

Keep the application static and dependency-free. Development checks need Node.js
22+ and Python 3.11+, but neither Node nor testing tools are needed to view the course.

```bash
node --test tests/*.test.js
python -m unittest discover -s examples/expense_report -p 'test_*.py'
```

The Node suite validates curriculum structure, progress migration, completion,
storage fallback, and reset. It also executes the new standalone Python snippets
and worked solutions in temporary directories, including their assertions. The
optional pytest example is syntax-checked; actual HTTP requests and packaging
installation/build commands are not executed. Original introductory fragments
illustrating isolated syntax are not treated as standalone scripts.

Optional browser smoke checks require Playwright and its Chromium browser:

```bash
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node tests/browser-smoke.cjs
```

The browser check walks every chapter and quiz, exercises failed quizzes, reloads,
searches, filters, resets, and mobile layout. GitHub Actions runs the Node and capstone checks plus a separate Playwright
browser job on pushes and pull requests. Playwright is a development-only tool.

## Content maintenance

- `js/chapters.js`: the original 11 chapters, with correctness fixes.
- `js/course-content.js`: expanded lessons/labs, learning goals, and chapters 12–23.
  Shared helpers escape Python code before rendering it into HTML.
- `js/app.js`, `js/quiz.js`, `js/tracker.js`: rendering, assessments, and progress.
- `tests/`: curriculum checks, executable examples, and optional browser smoke test.

Append lessons to existing chapters to preserve saved step positions. Increment a
chapter's revision when assessment requirements change; older quiz passes are then
invalidated. If you reorder existing steps, provide an explicit progress migration.
Titles/descriptions are trusted repository content, not arbitrary user HTML.

## References

Lessons link to relevant primary documentation. Useful starting points:

- [Python 3.11 tutorial](https://docs.python.org/3.11/tutorial/)
- [Python standard library](https://docs.python.org/3.11/library/)
- [Coroutines and tasks](https://docs.python.org/3.11/library/asyncio-task.html)
- [Python Packaging User Guide](https://packaging.python.org/en/latest/tutorials/packaging-projects/)
- [pytest documentation](https://docs.pytest.org/en/stable/)

See [the course review](docs/course-review.md) for the gaps addressed in this expansion.
