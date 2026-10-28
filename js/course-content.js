// Curriculum additions use escaped code so Python operators and backslashes display literally.
(() => {
  const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lesson = (title, text, code, takeaway) => ({
    type: 'lesson',
    content: `<h3>${title}</h3><p>${text}</p>${code ? `<pre class="code-block"><code>${escape(code)}</code></pre>` : ''}<p class="takeaway"><strong>Remember:</strong> ${takeaway}</p>`
  });
  const exercise = (task, code, explanation) => ({
    type: 'lesson', title: 'Practice lab',
    content: `<h3>Practice lab</h3><p>${task}</p><p>Write and run your answer locally before opening the solution. Try an empty input, a normal case, and an invalid input where applicable.</p><details><summary>Show worked solution</summary><pre class="code-block"><code>${escape(code)}</code></pre><p>${explanation}</p></details>`
  });
  const q = (question, options, correct, explanation) => ({ question, options, correct, explanation });
  const additions = [
    {
      id: 1, objectives: ['Explain names, objects, equality, and identity.', 'Predict truthiness and numeric conversion results.'],
      lessons: [
        lesson('Names point to objects', 'Assignment binds a name to an object; it does not copy the object. Equality compares values, while identity asks whether two references point to the same object. Use identity for singleton checks such as <code>value is None</code>, rather than for comparing numbers or strings.', String.raw`a = [1, 2]
b = a
b.append(3)
print(a)          # [1, 2, 3]
print(a == b)     # True: equal contents
print(a is b)     # True: same object
print(a == [1, 2, 3])  # True
print(a is [1, 2, 3])  # False`, 'Rebinding a name and mutating an object are different operations. Aliasing matters whenever objects are mutable.'),
        lesson('Truthiness, conversion, and arithmetic edges', 'Empty containers, zero, None, and False are falsy. A nonempty string such as <code>"False"</code> is truthy. Input returns text, so convert explicitly and handle conversion failures. Floor division rounds toward negative infinity; it does not simply remove the decimal part.', String.raw`print(bool("False"), bool([]))  # True False
print(int("42") + 1)           # 43
print(-7 // 3, -7 % 3)         # -3 2
print(7.0 // 3)                # 2.0
print(0.1 + 0.2 == 0.3)        # False
import math
print(math.isclose(0.1 + 0.2, 0.3))  # True`, 'Use math.isclose for approximate floating point comparisons. Use Decimal or integer minor units for exact money calculations.')
      ],
      lab: exercise('Create <code>parse_count(text)</code> that returns a nonnegative integer and raises ValueError for negative or noninteger input. Do not silently turn an invalid value into zero.', String.raw`def parse_count(text):
    count = int(text)
    if count < 0:
        raise ValueError("count must be nonnegative")
    return count

assert parse_count(" 12 ") == 12
assert parse_count("0") == 0
try:
    parse_count("-1")
except ValueError:
    print("invalid count rejected")`, 'int handles surrounding whitespace and rejects noninteger text. The domain check rejects negative counts.'),
      questions: [q('Which test should check for a missing value represented by None?', ['value == False', 'value is None', 'not value', 'value is 0'], 1, 'is None checks the singleton directly without also matching zero or an empty container.'), q('What is -7 // 3?', ['-2', '-3', '2', '3'], 1, 'Floor division rounds down, toward negative infinity.')]
    },
    {
      id: 2, objectives: ['Use iteration helpers instead of manual indexes.', 'Explain loop else and structural pattern matching.'],
      lessons: [
        lesson('Iterate with intent', 'Use enumerate when you need a position and a value. Use zip for related sequences. By default zip stops at the shorter input, so use strict=True when unequal lengths indicate a bug (Python 3.10+). A loop else runs when the loop finishes without break, including when the iterable is empty.', String.raw`names = ["Ada", "Grace"]
scores = [95, 98]
for position, (name, score) in enumerate(zip(names, scores, strict=True), start=1):
    print(position, name, score)

for score in scores:
    if score < 60:
        print("needs review")
        break
else:
    print("all passed")`, 'Prefer direct iteration. Avoid changing the size of a collection while iterating over it.'),
        lesson('Structural matching and guard clauses', 'A guard clause handles a special case early to reduce nesting. Structural matching (Python 3.10+) destructures shapes; it is useful for structured events, not just replacing every if. A bare name in a pattern captures a value; quoted strings match literal values.', String.raw`def route(event):
    match event:
        case {"kind": "move", "x": x, "y": y} if x >= 0 and y >= 0:
            return (x, y)
        case {"kind": "quit"}:
            return None
        case _:
            raise ValueError("unsupported event")

print(route({"kind": "move", "x": 2, "y": 3}))  # (2, 3)`, 'Choose comprehensions for simple transformations and ordinary loops for complex branching or side effects.')
      ],
      lab: exercise('Return the first negative number in a sequence, or None when there is none. Ensure zero is not treated as a negative value.', String.raw`def first_negative(values):
    for value in values:
        if value < 0:
            return value
    return None

assert first_negative([0, 3, -2, -5]) == -2
assert first_negative([]) is None`, 'Returning immediately avoids unnecessary work. None represents absence without conflating it with zero.'),
      questions: [q('When does a for loop else clause run?', ['Only after break', 'When iteration finishes without break', 'Only for nonempty inputs', 'After every iteration'], 1, 'Exhaustion, including an empty iterable, triggers else; break skips it.'), q('What does zip([1, 2], [3], strict=True) do when fully consumed?', ['Pads with None', 'Raises ValueError', 'Returns three pairs', 'Repeats 3'], 1, 'Strict zip detects mismatched lengths during iteration.')]
    },
    {
      id: 3, objectives: ['Avoid shared mutable defaults.', 'Design explicit function contracts and closures.'],
      lessons: [
        lesson('Defaults, keyword-only parameters, and contracts', 'Default arguments are evaluated once when def executes. A list default therefore survives across calls. Use None as a sentinel to create fresh state for each call. A slash marks preceding parameters positional-only; a star marks following parameters keyword-only.', String.raw`def add_tag(tag, tags=None):
    if tags is None:
        tags = []
    tags.append(tag)
    return tags

def total(price, /, *, quantity=1):
    """Return price times a positive quantity."""
    if quantity < 1:
        raise ValueError("quantity must be positive")
    return price * quantity

print(total(5, quantity=3))  # 15`, 'Document return values, mutations, and expected exceptions. Keyword-only flags make call sites easier to review.'),
        lesson('Closures and nonlocal', 'A closure keeps access to an enclosing scope after the outer call returns. Use nonlocal when rebinding an enclosing name; merely reading it needs no declaration. Closures capture names, so functions created in a loop may all observe the final loop value unless you bind each value deliberately.', String.raw`def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter = make_counter()
print(counter(), counter())  # 1 2
functions = [lambda i=i: i for i in range(3)]
print([f() for f in functions])  # [0, 1, 2]`, 'Prefer explicit parameters to hidden global state; use closures when shared private state improves the design.')
      ],
      lab: exercise('Implement <code>make_multiplier(factor)</code>, returning a function. Create independent double and triple functions.', String.raw`def make_multiplier(factor):
    def multiply(value):
        return value * factor
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
assert double(4) == 8
assert triple(4) == 12`, 'Each outer call creates its own enclosing binding. No global variable is needed.'),
      questions: [q('When is a default argument evaluated?', ['On every call', 'When the function definition executes', 'At program exit', 'When return executes'], 1, 'Defaults are created at definition time, which explains shared mutable defaults.'), q('Which keyword rebinds a name in an enclosing function?', ['global', 'nonlocal', 'outer', 'static'], 1, 'nonlocal targets an existing enclosing function binding, rather than a module global.')]
    },
    {
      id: 4, objectives: ['Distinguish shallow and deep copies.', 'Choose containers using access patterns and hashability.'],
      lessons: [
        lesson('Copying and nested mutability', 'A shallow copy creates a new outer container while keeping references to nested objects. A tuple prevents replacing its slots, but it can still contain mutable objects. Use deepcopy only when independent nested state is required; avoid copying resources such as open files.', String.raw`import copy
original = [[1], [2]]
shallow = original.copy()
deep = copy.deepcopy(original)
shallow[0].append(9)
print(original)  # [[1, 9], [2]]
print(deep)      # [[1], [2]]
record = ("scores", [10])
record[1].append(20)  # allowed: the list is still mutable`, 'For a grid, use [[0] * columns for _ in range(rows)]. Repeating a nested list with * shares the inner list.'),
        lesson('Hashability, lookup costs, and sorting', 'Dictionary keys and set elements must be hashable: their hash must remain stable while stored. Lists and dicts are unhashable; tuples are hashable only if all their elements are. Lists provide indexed access; sets support average constant-time membership. Dictionary insertion order is preserved, while sets have no guaranteed iteration order.', String.raw`users = [{"name": "Grace", "score": 98}, {"name": "Ada", "score": 95}]
ranked = sorted(users, key=lambda user: user["score"], reverse=True)
print(ranked[0]["name"])  # Grace
print(users[0]["name"])   # Grace: sorted did not mutate users
seen = set()
for name in ["Ada", "Ada", "Grace"]:
    seen.add(name)
print(len(seen))  # 2`, 'list.sort mutates and returns None; sorted returns a new list. Python sorting is stable.')
      ],
      lab: exercise('Deduplicate a sequence of hashable values while preserving the first occurrence order.', String.raw`def unique(values):
    seen = set()
    result = []
    for value in values:
        if value not in seen:
            seen.add(value)
            result.append(value)
    return result

assert unique([3, 1, 3, 2, 1]) == [3, 1, 2]
assert unique([]) == []`, 'A set handles membership, while a list preserves output order. dict.fromkeys(values) is a concise alternative.'),
      questions: [q('Which can be a dictionary key?', ['[1, 2]', '{"a": 1}', '(1, 2)', '(1, [2])'], 2, 'A tuple of integers is hashable. A tuple containing a list is not.'), q('What does list.sort() return?', ['The sorted list', 'A tuple', 'None', 'The first element'], 2, 'sort changes the existing list and returns None; use sorted for a new list.')]
    },
    {
      id: 5, objectives: ['Handle Unicode text and bytes explicitly.', 'Use regex fullmatch and formatting safely.'],
      lessons: [
        lesson('Unicode, bytes, and normalization', 'str contains Unicode text; bytes contains encoded data. Encode at an output boundary and decode at an input boundary using the agreed encoding, usually UTF-8. Character count is not the same as byte length or user-perceived glyph count. casefold is useful for caseless comparison; normalization can unify equivalent Unicode representations.', String.raw`import unicodedata
text = "café"
payload = text.encode("utf-8")
print(len(text), len(payload))  # 4 5
assert payload.decode("utf-8") == text
assert "Straße".casefold() == "STRASSE".casefold()
assert unicodedata.normalize("NFC", "e\u0301") == "é"`, 'Do not silently discard decoding errors. Decide explicitly whether invalid input should be rejected or replaced.'),
        lesson('Validation and precise formatting', 'Use fullmatch when the entire input must follow a pattern. search finds a match anywhere; match only anchors at the beginning. Raw strings keep Python from consuming regex backslashes. Use simple string methods for simple tasks; complicated regex can be difficult to maintain and expensive on hostile input.', String.raw`import re
identifier = re.compile(r"[A-Za-z_][A-Za-z0-9_]*")
assert identifier.fullmatch("user_42") is not None
assert identifier.fullmatch("user_42!") is None
price = 1234.5
print(f"{price:,.2f}")  # 1,234.50
print("report.csv".removesuffix(".csv"))  # report
print("abc".strip("ac"))  # b: strip removes a set of end characters`, 'Formatting rounds the displayed representation; it does not change the stored number. strip is not a substring remover.')
      ],
      lab: exercise('Normalize a list of user names by trimming whitespace, casefolding, and dropping empty results. Preserve input order.', String.raw`def normalize_names(names):
    result = []
    for name in names:
        cleaned = name.strip().casefold()
        if cleaned:
            result.append(cleaned)
    return result

assert normalize_names([" Ada ", "", "  ", "GRACE"]) == ["ada", "grace"]`, 'This intentionally keeps duplicates. Deduplication is a separate policy and should be explicit.'),
      questions: [q('Which validates an entire string against a regex?', ['re.search', 're.match', 're.fullmatch', 'str.find'], 2, 'fullmatch requires the complete string to match.'), q('What does UTF-8 encoding produce?', ['Another str', 'bytes', 'A list of characters', 'ASCII only'], 1, 'Encoding converts Unicode text into bytes using a particular encoding.')]
    },
    {
      id: 6, objectives: ['Explain file cursor movement and encoding.', 'Stream files and parse CSV without splitting on commas.'],
      lessons: [
        lesson('Cursors, encoding, and path handling', 'Reading advances a file cursor. After read consumes the file, readline returns an empty string until you seek or reopen. Specify encoding for portable text processing. Use pathlib for path joins; a relative path resolves against the current working directory, not automatically against the script directory.', String.raw`from pathlib import Path
from tempfile import TemporaryDirectory
with TemporaryDirectory() as directory:
    path = Path(directory) / "notes.txt"
    path.write_text("first\nsecond\n", encoding="utf-8")
    with path.open(encoding="utf-8") as stream:
        assert stream.readline() == "first\n"
        assert stream.read() == "second\n"
        assert stream.read() == ""
        stream.seek(0)
        assert stream.readline() == "first\n"`, 'read is convenient for small files; line iteration limits memory use for large files.'),
        lesson('CSV and serialization boundaries', 'CSV fields may contain commas, quotes, and newlines. Use csv.DictReader rather than split. Open CSV files with newline="" so the csv module handles line endings. JSON represents interoperable data, not arbitrary Python objects: tuples become arrays, and dates require an explicit representation.', String.raw`import csv
import io
import json
source = io.StringIO('name,score\n"Lovelace, Ada",95\n')
rows = list(csv.DictReader(source))
assert rows[0]["name"] == "Lovelace, Ada"
assert int(rows[0]["score"]) == 95
payload = json.dumps({"scores": [95, 98]})
assert json.loads(payload)["scores"] == [95, 98]`, 'Validate parsed data before trusting it. Never unpickle data from an untrusted source.')
      ],
      lab: exercise('Count nonblank lines in a UTF-8 text file without loading the entire file into memory.', String.raw`from pathlib import Path
from tempfile import TemporaryDirectory

def count_nonblank(path):
    with Path(path).open(encoding="utf-8") as stream:
        return sum(1 for line in stream if line.strip())

with TemporaryDirectory() as directory:
    path = Path(directory) / "sample.txt"
    path.write_text("one\n\n  \ntwo\n", encoding="utf-8")
    assert count_nonblank(path) == 2`, 'The generator feeds sum lazily. Files are closed even if reading raises an exception.'),
      questions: [q('After read() consumes a text file, what does another read() return?', ['All the text again', 'An empty string', 'None', 'A new file'], 1, 'Reads advance the cursor. Seek or reopen to read again.'), q('Why use csv instead of split(",")?', ['CSV is always numeric', 'Quoted fields may contain commas or newlines', 'split cannot handle text', 'CSV has no encoding'], 1, 'The CSV parser understands quoting, escaping, and record boundaries.')]
    },
    {
      id: 7, objectives: ['Catch specific failures and preserve causes.', 'Distinguish Exception from BaseException.'],
      lessons: [
        lesson('Catch narrowly and preserve context', 'Catch the failure you can handle and keep the try block small. Catching Exception does not catch every BaseException: KeyboardInterrupt and SystemExit normally propagate. When translating an implementation error into a domain error, chain it with raise ... from ... so the original cause remains visible.', String.raw`def parse_port(text):
    try:
        port = int(text)
    except ValueError as error:
        raise ValueError("port must be an integer") from error
    if not 1 <= port <= 65535:
        raise ValueError("port out of range")
    return port

assert parse_port("8080") == 8080`, 'Do not swallow unexpected errors with pass. Log or handle them at an appropriate boundary.'),
        lesson('Cleanup and traceback literacy', 'Read the final traceback line for the exception type and message, then work backward through frames to the operation that failed. finally runs during normal return and exception unwinding, but abrupt process termination can bypass cleanup. A return in finally can suppress a failure or replace a return value, so avoid it.', String.raw`def reciprocal(text):
    try:
        value = float(text)
    except ValueError:
        return None
    else:
        if value == 0:
            raise ValueError("zero has no reciprocal")
        return 1 / value

assert reciprocal("4") == 0.25
assert reciprocal("bad") is None`, 'Use assertions for internal invariants, not user input validation: optimized Python can remove assert statements.')
      ],
      lab: exercise('Create <code>require_key(mapping, key)</code> that returns a value or raises a descriptive ValueError chained from the original KeyError.', String.raw`def require_key(mapping, key):
    try:
        return mapping[key]
    except KeyError as error:
        raise ValueError(f"missing required field: {key}") from error

assert require_key({"count": 0}, "count") == 0
try:
    require_key({}, "count")
except ValueError as error:
    assert isinstance(error.__cause__, KeyError)`, 'A present value of zero is valid. Checking truthiness instead of key presence would reject it incorrectly.'),
      questions: [q('Which is normally NOT caught by except Exception?', ['ValueError', 'KeyError', 'KeyboardInterrupt', 'OSError'], 2, 'KeyboardInterrupt inherits directly from BaseException.'), q('Why use raise DomainError(...) from error?', ['To hide all traces', 'To preserve an explicit original cause', 'To retry automatically', 'To exit successfully'], 1, 'Explicit chaining records the lower-level failure as __cause__.')]
    },
    {
      id: 8, objectives: ['Use isolated environments and interpreter-bound pip.', 'Avoid import side effects and module shadowing.'],
      lessons: [
        lesson('A reproducible local environment', 'Use python -m pip to target the pip associated with that interpreter. The browser course itself requires no dependencies; some optional Python tooling does. A requirements snapshot describes installed versions, while pyproject.toml declares project metadata and dependencies. They solve different problems.', String.raw`# POSIX shell
python3 -m venv .venv
. .venv/bin/activate
python -m pip --version

# Windows PowerShell (alternative activation)
# .venv\Scripts\Activate.ps1

# Activation is optional: invoke the environment interpreter directly.
# POSIX: .venv/bin/python -m pip --version
# Windows: .venv\Scripts\python.exe -m pip --version`, 'Never commit .venv. Verify the interpreter path if your editor and terminal disagree.'),
        lesson('Import behavior and package boundaries', 'Import executes module-level code the first time a module is loaded in a process, then normally reuses sys.modules. Keep network calls and command execution behind functions and a main guard. A regular package has __init__.py; namespace packages may omit it. Avoid naming your module json.py or typing.py because it can shadow the standard library.', String.raw`# Save as greeter.py; safe to import.
def greet(name):
    return f"Hello, {name}"

def main():
    print(greet("Ada"))

if __name__ == "__main__":
    main()`, 'Run packages with python -m package.module when package-relative imports are involved.')
      ],
      lab: exercise('Make a module that exports <code>square</code> and prints a small demo only when run directly. Save it as square_demo.py and compare running with importing it.', String.raw`def square(value):
    return value * value

def main():
    print(square(5))

if __name__ == "__main__":
    main()`, 'python square_demo.py prints 25. python -c "import square_demo" prints nothing.'),
      questions: [q('Why run python -m pip instead of an ambiguous pip command?', ['It compiles dependencies', 'It selects pip for that interpreter', 'It disables isolation', 'It avoids downloading'], 1, 'This avoids installing into a different Python interpreter by mistake.'), q('Can a Python namespace package omit __init__.py?', ['Yes', 'No', 'Only on Windows', 'Only with NumPy'], 0, 'Namespace packages may omit it; regular packages use it.')]
    },
    {
      id: 9, objectives: ['Distinguish object allocation from initialization.', 'Prefer composition and understand shared class state.'],
      lessons: [
        lesson('Instance state versus class state', 'Class attributes are shared unless an instance shadows them. Put mutable per-instance state in __init__. Python calls __new__ to create an instance and __init__ to initialize it; __init__ must return None. self is a naming convention for the explicit instance parameter, not a reserved keyword.', String.raw`class Team:
    def __init__(self, name):
        self.name = name
        self.members = []

first = Team("A")
second = Team("B")
first.members.append("Ada")
assert second.members == []`, 'A mutable class attribute such as members = [] would accidentally share state between teams.'),
        lesson('Composition, properties, and protocols', 'Use inheritance for an actual substitutable relationship. Compose collaborators when one object uses another. A property can provide validation while preserving attribute syntax. A leading underscore signals a nonpublic implementation detail; it does not provide security or enforced privacy.', String.raw`class MemoryWriter:
    def __init__(self):
        self.messages = []
    def write(self, message):
        self.messages.append(message)

class Reporter:
    def __init__(self, writer):
        self.writer = writer
    def report(self, count):
        self.writer.write(f"processed {count}")

writer = MemoryWriter()
Reporter(writer).report(3)
assert writer.messages == ["processed 3"]`, 'Small collaborators are easy to substitute in tests without a deep inheritance hierarchy.')
      ],
      lab: exercise('Create an Inventory class with independent item dictionaries. Reject negative quantities before changing state.', String.raw`class Inventory:
    def __init__(self):
        self.items = {}
    def add(self, name, quantity):
        if quantity < 0:
            raise ValueError("quantity must be nonnegative")
        self.items[name] = self.items.get(name, 0) + quantity

first, second = Inventory(), Inventory()
first.add("book", 2)
assert first.items == {"book": 2}
assert second.items == {}`, 'Validation happens before mutation. Each instance owns a fresh dictionary.'),
      questions: [q('Which method initializes an already created instance?', ['__new__', '__init__', '__call__', '__enter__'], 1, '__new__ creates the instance; __init__ initializes it and returns None.'), q('Where should a per-instance mutable list usually be created?', ['In __init__ as self.items = []', 'As a mutable class attribute', 'In a global variable', 'In __repr__'], 0, 'Creating the list inside __init__ gives each instance independent state.')]
    },
    {
      id: 10, objectives: ['Preserve decorator metadata and cleanup.', 'Explain generator exhaustion and cache tradeoffs.'],
      lessons: [
        lesson('Production-friendly decorators', 'Use functools.wraps so a wrapper preserves the original function name, docstring, and __wrapped__ reference. Measure elapsed time with perf_counter, a monotonic performance clock. Use finally if timing should be reported even when the wrapped function fails.', String.raw`from functools import wraps
from time import perf_counter

def timed(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        start = perf_counter()
        try:
            return function(*args, **kwargs)
        finally:
            print(f"{function.__name__}: {perf_counter() - start:.6f}s")
    return wrapper

@timed
def add(a, b):
    """Add two numbers."""
    return a + b

assert add(2, 3) == 5
assert add.__name__ == "add"`, 'Decorators should preserve return values and exception behavior unless deliberately documented otherwise.'),
        lesson('Generators are one-shot; caches retain state', 'A generator resumes where it last yielded and cannot restart after exhaustion. Create a new generator for another pass. lru_cache memoizes calls with hashable arguments and retains references to arguments and results. Avoid caching functions whose correctness depends on changing external state.', String.raw`from functools import lru_cache
values = (x * x for x in range(3))
assert list(values) == [0, 1, 4]
assert list(values) == []

@lru_cache(maxsize=128)
def factorial(n):
    if n < 0:
        raise ValueError("n must be nonnegative")
    return 1 if n == 0 else n * factorial(n - 1)

assert factorial(5) == 120
factorial.cache_clear()`, 'Lazy evaluation saves materialization costs, but deferred work and errors happen when you consume the iterator.')
      ],
      lab: exercise('Write a generator that yields chunks of a sequence, including a final short chunk. Reject chunk sizes below one.', String.raw`def chunks(values, size):
    if size < 1:
        raise ValueError("size must be positive")
    for start in range(0, len(values), size):
        yield values[start:start + size]

assert list(chunks([1, 2, 3, 4, 5], 2)) == [[1, 2], [3, 4], [5]]
assert list(chunks([], 2)) == []`, 'Because this is a generator function, validation executes on first iteration, not when the generator object is created.'),
      questions: [q('Why apply functools.wraps to a wrapper?', ['To cache every result', 'To preserve wrapped function metadata', 'To suppress errors', 'To execute concurrently'], 1, 'wraps updates metadata and sets __wrapped__ for introspection.'), q('What does consuming an exhausted generator produce?', ['The original values', 'No more values', 'A fresh generator', 'A list of None'], 1, 'Generator instances are single-pass iterators.')]
    },
    {
      id: 11, objectives: ['Use timezone-aware timestamps and exact decimals.', 'Apply iterator and collection helpers deliberately.'],
      lessons: [
        lesson('Aware dates and decimal money', 'Use aware datetime values for timestamps. Store or exchange a clear timezone, often UTC; use zoneinfo for regional display and daylight saving rules. Decimal constructed from text avoids importing a float approximation. Decide a rounding policy at a business boundary.', String.raw`from datetime import datetime, timezone
from decimal import Decimal, ROUND_HALF_UP
now = datetime.now(timezone.utc)
assert now.tzinfo is not None
price = Decimal("19.99")
total = (price * Decimal("1.0825")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
assert total == Decimal("21.64")`, 'A fixed UTC offset is not a full regional timezone rule. Do not mix naive and aware datetimes in ordering comparisons.'),
        lesson('Small tools with clear contracts', 'Counter counts hashable values; defaultdict creates missing values on access; deque supports efficient operations at both ends. itertools tools are lazy. groupby groups adjacent equal keys, so sort first when you want global groups. Use secrets for security tokens and random for simulation.', String.raw`from itertools import groupby, islice, count
from operator import itemgetter
rows = [("B", 2), ("A", 1), ("B", 3)]
ordered = sorted(rows, key=itemgetter(0))
groups = {key: list(items) for key, items in groupby(ordered, key=itemgetter(0))}
assert groups["B"] == [("B", 2), ("B", 3)]
assert list(islice(count(10), 3)) == [10, 11, 12]`, 'Bound infinite iterators with islice or a stopping condition; do not pass them directly to list.')
      ],
      lab: exercise('Return the three most frequent whitespace-separated words, ignoring case and empty input. Punctuation may remain attached for this exercise.', String.raw`from collections import Counter

def top_words(text):
    return Counter(text.casefold().split()).most_common(3)

assert top_words("Python python code") == [("python", 2), ("code", 1)]
assert top_words("") == []`, 'Tokenization policy matters: a production search index would need an explicit punctuation and Unicode policy.'),
      questions: [q('Which input best preserves the intended decimal price?', ['Decimal(0.1)', 'Decimal("0.10")', 'float("0.10")', 'int(0.1)'], 1, 'A string constructs the decimal value directly rather than from a binary float.'), q('What does itertools.groupby group?', ['All equal items anywhere', 'Adjacent runs of equal keys', 'Only integers', 'Only unique values'], 1, 'Sort by the grouping key first when global groups are needed.')]
    }
  ];
  for (const addition of additions) {
    const chapter = CHAPTERS.find(ch => ch.id === addition.id);
    chapter.objectives = addition.objectives;
    chapter.steps.push(...addition.lessons, addition.lab);
    chapter.quiz.push(...addition.questions);
  }

  const advanced = [
    {
      title: 'Type Hints & Static Analysis',
      description: 'Annotations, unions, narrowing, generics, TypedDict, and Protocol',
      objectives: ['Separate static guarantees from runtime validation.', 'Model optional values and structural interfaces.'],
      lessons: [
        lesson('Types communicate contracts', 'Annotations help editors and static checkers understand intent, but Python does not enforce them at runtime. Built-in generic syntax such as list[str] needs Python 3.9+; union syntax str | None needs 3.10+. The course targets Python 3.11+. Avoid Any as a default escape hatch because it disables useful checking.', String.raw`def average(values: list[float]) -> float | None:
    if not values:
        return None
    return sum(values) / len(values)

result = average([2.0, 4.0])
if result is not None:
    print(round(result, 2))  # 3.0`, 'Narrow an optional value with an explicit None check. Truthiness would also exclude a valid numeric zero.'),
        lesson('Typed records and structural interfaces', 'TypedDict describes the expected keys and value types of a dictionary for static analysis. Protocol describes behavior without requiring inheritance. A type checker can accept any object that supplies the required methods. Neither replaces validation of external JSON or arbitrary user input.', String.raw`from typing import Protocol, TypedDict

class User(TypedDict):
    name: str
    active: bool

class Writer(Protocol):
    def write(self, message: str) -> object: ...

def announce(user: User, output: Writer) -> None:
    output.write(f"Hello, {user['name']}")

import io
buffer = io.StringIO()
announce({"name": "Ada", "active": True}, buffer)
assert buffer.getvalue() == "Hello, Ada"`, 'Use a small protocol for the behavior a caller actually needs, rather than coupling to a large concrete class.'),
        lesson('Generic functions and a checking workflow', 'A TypeVar relates input and output types. Sequence describes read-only indexed access and accepts lists or tuples. A static check should complement runtime tests: it can catch an invalid argument in code that no test happened to execute. Install mypy in a virtual environment for this optional workflow.', String.raw`from collections.abc import Sequence
from typing import TypeVar
T = TypeVar("T")

def first(values: Sequence[T]) -> T:
    if not values:
        raise ValueError("empty sequence")
    return values[0]

assert first(("a", "b")) == "a"
# Optional terminal commands:
# python -m pip install mypy
# python -m mypy --strict your_module.py`, 'Use object for an unknown value you must inspect safely; use Any only when dynamic behavior is intentional.')
      ],
      lab: exercise('Annotate a function that looks up a price and returns None when absent. Then show a caller handling a valid zero price correctly.', String.raw`def find_price(prices: dict[str, int], name: str) -> int | None:
    return prices.get(name)

price = find_price({"sample": 0}, "sample")
if price is not None:
    assert price == 0
else:
    raise LookupError("missing product")`, 'The union forces a static caller to account for absence. Runtime input still needs independent validation.'),
      questions: [
        q('Do Python annotations enforce argument types at runtime?', ['Yes, always', 'No, not by themselves', 'Only for int', 'Only on Windows'], 1, 'Annotations supply metadata for tools; runtime validation requires executable checks.'),
        q('What is a safe way to narrow int | None while retaining zero?', ['if value:', 'if value is not None:', 'if value > 0:', 'str(value)'], 1, 'A None check distinguishes absence from zero.'),
        q('What does Protocol describe?', ['A required base class only', 'An interface based on supported behavior', 'A network port', 'A JSON encoder'], 1, 'Structural typing checks that the necessary attributes and methods exist.'),
        q('What does TypedDict validate by itself at runtime?', ['Every JSON response', 'Nothing automatically', 'Only required keys', 'All nested values'], 1, 'TypedDict is a static description, not a runtime validator.')
      ],
      reference: ['typing', 'https://docs.python.org/3.11/library/typing.html']
    },
    {
      title: 'Dataclasses & Data Modeling',
      description: 'Value objects, factories, frozen records, enums, and validation',
      objectives: ['Model records with explicit invariants.', 'Avoid shared defaults and understand frozen records.'],
      lessons: [
        lesson('Generate the repetitive parts', 'dataclass generates methods such as __init__, __repr__, and field-based equality. Define data with annotations, but validate values separately. Use field(default_factory=list) for fresh mutable defaults. A dataclass is useful for records with behavior, while a dictionary remains useful at interchange boundaries.', String.raw`from dataclasses import dataclass, field

@dataclass
class Project:
    name: str
    tags: list[str] = field(default_factory=list)

first = Project("course")
second = Project("tools")
first.tags.append("python")
assert second.tags == []
assert Project("course") == Project("course")`, 'A factory is called for each instance, preventing shared mutable defaults.'),
        lesson('Invariants and value objects', 'Use __post_init__ to enforce invariants after generated initialization. frozen=True prevents ordinary field reassignment, but nested mutable objects can still change. Prefer immutable field values such as tuples when modeling a value object. slots=True limits dynamic attributes and can reduce instance overhead.', String.raw`from dataclasses import dataclass

@dataclass(frozen=True, slots=True)
class Money:
    cents: int
    currency: str = "USD"
    def __post_init__(self):
        if type(self.cents) is not int or self.cents < 0:
            raise ValueError("cents must be a nonnegative integer")
        if self.currency not in {"USD", "EUR"}:
            raise ValueError("unsupported currency")

assert Money(1250) == Money(1250, "USD")`, 'In Python bool is a subclass of int. Use an exact type check only when the domain must reject booleans.'),
        lesson('Enums and boundary conversion', 'An Enum makes a closed set of states explicit. Convert external strings at the boundary and handle unknown values. dataclasses.asdict recursively converts records, but enum and datetime values may still require explicit JSON conversion. Do not expose every internal field automatically in an API.', String.raw`from dataclasses import dataclass
from enum import Enum

class Status(Enum):
    OPEN = "open"
    CLOSED = "closed"

@dataclass
class Task:
    title: str
    status: Status = Status.OPEN

task = Task("Review course", Status("open"))
payload = {"title": task.title, "status": task.status.value}
assert payload["status"] == "open"`, 'Keep serialization rules explicit so internal refactoring does not accidentally change a public format.')
      ],
      lab: exercise('Create a frozen Rectangle record with positive width and height and a computed area property. Reject zero dimensions.', String.raw`from dataclasses import dataclass

@dataclass(frozen=True)
class Rectangle:
    width: float
    height: float
    def __post_init__(self):
        if self.width <= 0 or self.height <= 0:
            raise ValueError("dimensions must be positive")
    @property
    def area(self):
        return self.width * self.height

assert Rectangle(3, 4).area == 12`, 'The property avoids storing derived data that can become inconsistent. This lab assumes numeric inputs; external inputs need parsing and finite-number checks.'),
      questions: [
        q('How should a dataclass define a fresh list per instance?', ['tags = []', 'field(default_factory=list)', 'field(default=[])', 'Use a global list'], 1, 'The factory constructs independent values.'),
        q('Does frozen=True deeply freeze nested lists?', ['Yes', 'No', 'Only empty lists', 'Only with slots'], 1, 'Frozen blocks field reassignment, not mutation of objects stored in the fields.'),
        q('Where can a dataclass validate values after generated initialization?', ['__post_init__', '__del__', '__str__', '__hash__ only'], 0, '__post_init__ is called by the generated initializer.'),
        q('How do you serialize an Enum to its declared string value?', ['str(enum) always', 'enum.value', 'enum.index', 'enum.to_json()'], 1, 'value returns the declared underlying value.')
      ],
      reference: ['dataclasses', 'https://docs.python.org/3.11/library/dataclasses.html']
    },
    {
      title: 'Testing & Testable Design',
      description: 'unittest, pytest, boundary cases, mocks, and dependency injection',
      objectives: ['Test behavior and failures with deterministic inputs.', 'Separate pure logic from external effects.'],
      lessons: [
        lesson('Tests describe observable behavior', 'Arrange inputs, act once, and assert an outcome. Cover normal cases, boundaries, and expected failures. unittest is in the standard library; pytest is an optional dependency with concise assertions and fixtures. The example below is a complete unittest file; run it with python -m unittest test_discount.py.', String.raw`import unittest

def discounted(price, percent):
    if not 0 <= percent <= 100:
        raise ValueError("percent out of range")
    return price * (100 - percent) / 100

class DiscountTests(unittest.TestCase):
    def test_normal_discount(self):
        self.assertEqual(discounted(100, 20), 80)
    def test_full_discount(self):
        self.assertEqual(discounted(100, 100), 0)
    def test_rejects_invalid_percent(self):
        with self.assertRaises(ValueError):
            discounted(100, 101)`, 'A useful test would fail if the intended behavior regressed; it should not merely duplicate implementation details.'),
        lesson('Inject time and I/O', 'Functions that read clocks, call services, or use global state are harder to test deterministically. Pass collaborators as arguments when practical. Use a fake for behavior you own; use mocks sparingly to inspect an important interaction. Never let unit tests depend on the public network.', String.raw`from datetime import datetime, timezone
from unittest.mock import Mock

def send_receipt(email, send, now):
    timestamp = now().isoformat()
    send(email, f"Receipt at {timestamp}")

fixed = datetime(2025, 1, 1, tzinfo=timezone.utc)
sender = Mock()
send_receipt("ada@example.test", sender, lambda: fixed)
sender.assert_called_once_with("ada@example.test", "Receipt at 2025-01-01T00:00:00+00:00")`, 'If patching is necessary, patch the name where the code under test looks it up, rather than where it was originally defined.'),
        lesson('Fixtures, parameterization, and integration tests', 'Keep unit tests fast and isolated. Integration tests exercise real boundaries such as SQLite or the filesystem using temporary resources. A fixture manages setup and cleanup. Parameterization lets one behavioral rule run against many inputs without copy-pasting test bodies.', String.raw`# Optional pytest example: save as test_slug.py.
# Install with python -m pip install pytest, then run python -m pytest.
import pytest

def slug(text):
    return "-".join(text.strip().lower().split())

@pytest.mark.parametrize("text, expected", [
    ("Hello Python", "hello-python"),
    ("  MANY   spaces  ", "many-spaces"),
    ("", ""),
])
def test_slug(text, expected):
    assert slug(text) == expected`, 'Coverage shows which code ran, not whether assertions were meaningful. Prefer tests of contracts over tests of private call ordering.')
      ],
      lab: exercise('Write tests for a safe division function: ordinary values, a zero numerator, and division by zero. Verify the failure type.', String.raw`import unittest

def divide(a, b):
    return a / b

class DivisionTests(unittest.TestCase):
    def test_values(self):
        self.assertEqual(divide(8, 2), 4)
        self.assertEqual(divide(0, 2), 0)
    def test_zero_denominator(self):
        with self.assertRaises(ZeroDivisionError):
            divide(1, 0)`, 'A zero numerator is a valid result. The error contract belongs to the denominator.'),
      questions: [
        q('Which tool ships with Python?', ['pytest', 'unittest', 'mypy', 'ruff'], 1, 'unittest is in the standard library; the others require separate installation.'),
        q('What is the best default for time in a unit test?', ['The real current time', 'An injected fixed clock', 'A long sleep', 'A random timezone'], 1, 'A fixed clock makes the expected result deterministic.'),
        q('Where should patch target an imported name?', ['Always the standard library module', 'Where the code under test looks it up', 'Anywhere with the same name', 'Only __main__'], 1, 'Patching must replace the reference actually used by the tested code.'),
        q('Does 100% line coverage prove correctness?', ['Yes', 'No', 'Only for small modules', 'Only with pytest'], 1, 'Executing code does not prove all relevant behaviors were asserted.')
      ],
      reference: ['unittest', 'https://docs.python.org/3.11/library/unittest.html']
    },
    {
      title: 'Debugging, Logging & Observability',
      description: 'Tracebacks, breakpoints, log levels, and useful error context',
      objectives: ['Diagnose failures from evidence.', 'Add useful logs without leaking secrets.'],
      lessons: [
        lesson('Reproduce before changing code', 'Capture the smallest input that reproduces a failure. Read the traceback from the exception message upward, inspect assumptions, and form one hypothesis at a time. breakpoint opens the configured debugger; in pdb, n steps over, s steps into, p prints, and c continues. Remove exploratory breakpoints before shipping.', String.raw`def unit_price(total, count):
    if count <= 0:
        raise ValueError("count must be positive")
    # Add breakpoint() here during an interactive debugging session.
    return total / count

assert unit_price(12, 3) == 4`, 'After diagnosing a bug, add a focused regression test that reproduces the original failure.'),
        lesson('Library loggers and application configuration', 'Create module loggers with getLogger(__name__). Configure handlers and levels at the application entry point, rather than calling basicConfig in reusable library code. Use DEBUG for diagnostics, INFO for normal milestones, WARNING for recoverable concerns, and ERROR or exception for failures.', String.raw`import logging
logger = logging.getLogger(__name__)

def parse_count(text):
    try:
        return int(text)
    except ValueError:
        logger.exception("Could not parse count")
        raise

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s %(message)s")
    logger.info("Processed %s rows", 12)`, 'Parameterized logging delays message interpolation. Avoid putting credentials, tokens, or sensitive payloads in logs.'),
        lesson('Signals that help operations', 'A log describes an event, a metric measures behavior over time, and a trace connects work across boundaries. Include stable operation names and correlation identifiers where relevant. Measure durations with perf_counter, and report failures at a boundary that has enough context to explain them.', String.raw`import logging
from time import perf_counter
logger = logging.getLogger(__name__)

def process_rows(rows):
    start = perf_counter()
    result = [row.strip() for row in rows if row.strip()]
    logger.info("rows_processed count=%s elapsed_ms=%.2f", len(result), (perf_counter() - start) * 1000)
    return result

assert process_rows([" a ", "", "b"]) == ["a", "b"]`, 'Avoid logging the same exception at every layer; repeated stack traces obscure the event that needs attention.')
      ],
      lab: exercise('Test that a warning is emitted for a skipped malformed record, without depending on a terminal log handler.', String.raw`import logging
import unittest
logger = logging.getLogger("course.records")

def parse_record(text):
    if ":" not in text:
        logger.warning("skipping malformed record")
        return None
    return tuple(text.split(":", 1))

class RecordTests(unittest.TestCase):
    def test_warning(self):
        with self.assertLogs("course.records", level="WARNING") as captured:
            self.assertIsNone(parse_record("bad"))
        self.assertIn("malformed record", captured.output[0])`, 'assertLogs captures the behavioral signal without writing assertions against console formatting.'),
      questions: [
        q('What does logger.exception add inside an except block?', ['Automatic retries', 'Current exception traceback information', 'Encryption', 'A debugger session'], 1, 'exception logs at ERROR with exception information by default.'),
        q('Where should a reusable library configure root handlers?', ['On every import', 'It should leave application configuration to the caller', 'In every function', 'In __del__'], 1, 'Applications should control handlers, levels, and destinations.'),
        q('Which clock should measure elapsed runtime?', ['datetime.now', 'time.perf_counter', 'A timezone offset', 'A formatted string'], 1, 'perf_counter is suitable for elapsed performance measurements.'),
        q('What is the best first step for a reported bug?', ['Rewrite the module', 'Obtain a minimal reproducible case', 'Suppress all errors', 'Add sleeps'], 1, 'A reliable reproduction lets you test hypotheses and verify the fix.')
      ],
      reference: ['logging', 'https://docs.python.org/3.11/howto/logging.html']
    },
    {
      title: 'HTTP Clients & API Boundaries',
      description: 'URLs, JSON, timeouts, status codes, validation, and retries',
      objectives: ['Build a bounded HTTP request and validate a response.', 'Separate transport failures from domain validation.'],
      lessons: [
        lesson('An HTTP call crosses a trust boundary', 'Treat network input as untrusted even when JSON decoding succeeds. HTTP includes a method, URL, headers, status, and body. Encode query parameters with urllib.parse rather than concatenating user text. Set a timeout and bound how much data you read. The following is a request pattern to adapt, not an offline example.', String.raw`import json
from urllib.parse import urlencode
from urllib.request import Request, urlopen

# Requires network access; replace the example endpoint with a trusted API.
def fetch_json(base_url, search):
    query = urlencode({"q": search})
    request = Request(f"{base_url}?{query}", headers={"Accept": "application/json"})
    with urlopen(request, timeout=5) as response:
        if response.status != 200:
            raise ValueError(f"unexpected status: {response.status}")
        body = response.read(1_000_001)
    if len(body) > 1_000_000:
        raise ValueError("response too large")
    return json.loads(body.decode("utf-8"))`, 'A socket timeout is not a guaranteed whole-operation deadline. Keep TLS verification enabled and choose trusted destinations.'),
        lesson('Validate structure before using values', 'A successful HTTP status only confirms transport-level behavior. JSON can contain null, a list, or incorrectly typed fields. Parse into a small internal model after checking the shape. Distinguish bool from an integer count when needed, and reject impossible values before they enter business logic.', String.raw`def parse_count_response(payload):
    if not isinstance(payload, dict):
        raise ValueError("expected an object")
    count = payload.get("count")
    if type(count) is not int or count < 0:
        raise ValueError("count must be a nonnegative integer")
    return count

assert parse_count_response({"count": 0}) == 0
try:
    parse_count_response({"count": True})
except ValueError:
    print("boolean rejected")`, 'Do not assume a type annotation, a JSON parser, or a status code validates the application schema.'),
        lesson('Retries require a policy', 'Retry only failures that might be transient and operations safe to repeat. A timed-out POST may already have succeeded; an idempotency key can help when supported by the API. Respect Retry-After for rate limiting, bound attempts, use backoff with jitter, and log attempt context without tokens.', String.raw`from urllib.error import HTTPError, URLError

# HTTPError subclasses URLError: catch it first when distinguishing statuses.
def describe_failure(error):
    if isinstance(error, HTTPError):
        if error.code == 429:
            return "rate limited: consult Retry-After"
        if 500 <= error.code < 600:
            return "server failure: consider a bounded retry"
        return "request rejected: inspect request before retrying"
    if isinstance(error, URLError):
        return "connection failure: inspect cause"
    return "unexpected failure"`, 'Never retry forever, and do not retry every 4xx response. Test clients with fakes rather than a live service.')
      ],
      lab: exercise('Validate a JSON-style payload containing an items list of objects, each with a nonempty name. Return cleaned names or reject the entire payload.', String.raw`def parse_names(payload):
    if not isinstance(payload, dict) or not isinstance(payload.get("items"), list):
        raise ValueError("expected items list")
    names = []
    for item in payload["items"]:
        if not isinstance(item, dict):
            raise ValueError("expected item object")
        name = item.get("name")
        if not isinstance(name, str) or not name.strip():
            raise ValueError("expected nonempty name")
        names.append(name.strip())
    return names

assert parse_names({"items": [{"name": " Ada "}]}) == ["Ada"]
assert parse_names({"items": []}) == []`, 'This is a pure boundary parser: all tests can run offline. Define explicitly whether malformed individual records should fail the response or be skipped.'),
      questions: [
        q('Why set an HTTP timeout?', ['To validate JSON', 'To bound waiting on socket operations', 'To guarantee a full-operation deadline', 'To disable TLS'], 1, 'A timeout limits blocking socket operations but is not a full wall-clock deadline.'),
        q('Which status commonly signals rate limiting?', ['201', '204', '429', '301'], 2, '429 means Too Many Requests; inspect retry guidance from the server.'),
        q('Is a POST always safe to retry after a timeout?', ['Yes', 'No; it may already have taken effect', 'Only with JSON', 'Only over HTTPS'], 1, 'The server may have completed the action before the client timed out.'),
        q('What does successful json.loads prove?', ['The application schema is valid', 'The bytes represented valid JSON after decoding', 'All numbers are positive', 'All required keys exist'], 1, 'Parsing syntax and validating domain structure are separate steps.')
      ],
      reference: ['urllib.request', 'https://docs.python.org/3.11/library/urllib.request.html']
    },
    {
      title: 'SQLite & Transactions',
      description: 'Parameterized SQL, persistence, transactions, and connection lifetime',
      objectives: ['Bind SQL values safely.', 'Distinguish transaction cleanup from closing connections.'],
      lessons: [
        lesson('A small relational database', 'SQLite ships with Python and is useful for local tools and tests. A connection owns database resources; a cursor or execute result yields rows. Use placeholders for values rather than string interpolation. Placeholders do not substitute table or column names; choose identifiers from an explicit allowlist when needed.', String.raw`import sqlite3
from contextlib import closing

with closing(sqlite3.connect(":memory:")) as connection:
    connection.execute("CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL)")
    connection.execute("INSERT INTO tasks (title) VALUES (?)", ("Review Python",))
    connection.commit()
    rows = connection.execute("SELECT id, title FROM tasks WHERE title = ?", ("Review Python",)).fetchall()
    assert rows == [(1, "Review Python")]`, 'The comma in a single-element tuple matters: (value,) passes one parameter, while (value) is just value.'),
        lesson('Commit, rollback, and explicit resource ownership', 'A transaction groups changes so they can succeed or fail together. Under the legacy transaction mode used by the example, with connection commits a pending transaction on success and rolls it back on failure. It does not close the connection. Use closing or try/finally for lifetime. Python 3.12+ also offers an autocommit parameter; choose a transaction mode deliberately.', String.raw`import sqlite3
from contextlib import closing

with closing(sqlite3.connect(":memory:")) as connection:
    connection.execute("CREATE TABLE accounts (name TEXT PRIMARY KEY, balance INTEGER CHECK(balance >= 0))")
    with connection:
        connection.executemany("INSERT INTO accounts VALUES (?, ?)", [("A", 100), ("B", 50)])
    try:
        with connection:
            connection.execute("UPDATE accounts SET balance = balance - 200 WHERE name = ?", ("A",))
            connection.execute("UPDATE accounts SET balance = balance + 200 WHERE name = ?", ("B",))
    except sqlite3.IntegrityError:
        pass
    assert connection.execute("SELECT balance FROM accounts WHERE name = 'A'").fetchone()[0] == 100`, 'Put constraints in the database as well as validation in application code. Do not describe a connection context manager as an automatic close.'),
        lesson('Rows, indexes, and realistic limits', 'sqlite3.Row lets callers read columns by name. Iterate query results instead of fetchall for large result sets. Index columns used in selective filters and joins, but measure because indexes add write and storage costs. SQLite allows concurrent readers but serializes writers; a busy timeout does not eliminate contention.', String.raw`import sqlite3
from contextlib import closing

with closing(sqlite3.connect(":memory:")) as connection:
    connection.row_factory = sqlite3.Row
    connection.execute("CREATE TABLE users (name TEXT, active INTEGER)")
    connection.execute("CREATE INDEX users_active ON users(active)")
    connection.execute("INSERT INTO users VALUES (?, ?)", ("Ada", 1))
    for row in connection.execute("SELECT name FROM users WHERE active = ?", (1,)):
        assert row["name"] == "Ada"`, 'Keep transactions short. Use schema migrations and backups for durable applications rather than recreating tables on each launch.')
      ],
      lab: exercise('Store a title containing an apostrophe with a parameterized INSERT, then read it back. Use an in-memory database and close it.', String.raw`import sqlite3
from contextlib import closing

with closing(sqlite3.connect(":memory:")) as connection:
    connection.execute("CREATE TABLE books (title TEXT NOT NULL)")
    title = "Ada's Notes"
    with connection:
        connection.execute("INSERT INTO books VALUES (?)", (title,))
    found = connection.execute("SELECT title FROM books").fetchone()
    assert found == (title,)`, 'Binding handles quotes correctly and avoids interpreting input as SQL syntax.'),
      questions: [
        q('How should user input be supplied to a SQL value?', ['An f-string', 'A bound placeholder parameter', 'String concatenation', 'eval'], 1, 'Parameters keep values separate from SQL syntax.'),
        q('Does with connection close a sqlite3 connection?', ['Always', 'No', 'Only after SELECT', 'Only in memory'], 1, 'It handles transaction commit/rollback; closing is separate.'),
        q('What does rollback do?', ['Deletes the database', 'Reverts uncommitted transaction changes', 'Closes every cursor', 'Makes a backup'], 1, 'Rollback restores the state before the pending transaction changes.'),
        q('Can a placeholder safely substitute a table name?', ['Yes', 'No; placeholders bind values', 'Only with quotes', 'Only in INSERT'], 1, 'Choose dynamic identifiers from a trusted allowlist instead.')
      ],
      reference: ['sqlite3', 'https://docs.python.org/3.11/library/sqlite3.html']
    },
    {
      title: 'Asyncio & Structured Concurrency',
      description: 'Coroutines, tasks, TaskGroup, timeouts, and cancellation',
      objectives: ['Run independent I/O operations concurrently.', 'Handle cancellation and avoid blocking the event loop.'],
      lessons: [
        lesson('Coroutines cooperate at await points', 'Calling async def creates a coroutine object; it does not run the body immediately. Await it or schedule a task. asyncio is suited to many waiting I/O operations, not automatically to CPU-heavy Python. Use asyncio.run at a synchronous program entry point; do not nest it inside an already running event loop.', String.raw`import asyncio

async def fetch_label(label):
    await asyncio.sleep(0.01)  # simulated nonblocking I/O
    return label.upper()

async def main():
    result = await fetch_label("python")
    assert result == "PYTHON"

asyncio.run(main())`, 'await lets other ready tasks run when the awaited operation suspends. Merely marking a function async does not make blocking work nonblocking.'),
        lesson('TaskGroup owns related work', 'TaskGroup (Python 3.11+) waits for its tasks at scope exit. If a task fails with an ordinary exception, it cancels remaining tasks and reports failures using an ExceptionGroup. Use this when child tasks share an operation lifetime. Results can be read after a successful exit.', String.raw`import asyncio

async def work(value):
    await asyncio.sleep(0.01)
    return value * 2

async def main():
    async with asyncio.TaskGroup() as group:
        tasks = [group.create_task(work(n)) for n in range(3)]
    assert [task.result() for task in tasks] == [0, 2, 4]

asyncio.run(main())`, 'Creating unbounded tasks for a huge input can exhaust memory or overload a service; limit concurrency with a semaphore or bounded worker queue.'),
        lesson('Timeouts, cleanup, and blocking boundaries', 'asyncio.timeout cancels overdue work and exposes TimeoutError outside the context. Use finally for cleanup. If you catch CancelledError to clean up, normally re-raise it so callers can cancel reliably. Move blocking I/O to asyncio.to_thread; cancellation of the awaiting task does not forcibly stop an already running thread.', String.raw`import asyncio

async def main():
    try:
        async with asyncio.timeout(0.01):
            await asyncio.sleep(1)
    except TimeoutError:
        print("operation timed out")
    finally:
        print("cleanup reached")

asyncio.run(main())`, 'Use asyncio.sleep inside async code. time.sleep blocks the event loop and delays every task on that loop.')
      ],
      lab: exercise('Run three simulated jobs concurrently with TaskGroup and return their results in input order.', String.raw`import asyncio

async def job(value):
    await asyncio.sleep(0.01)
    return value + 1

async def run_jobs(values):
    async with asyncio.TaskGroup() as group:
        tasks = [group.create_task(job(value)) for value in values]
    return [task.result() for task in tasks]

assert asyncio.run(run_jobs([3, 1, 2])) == [4, 2, 3]
assert asyncio.run(run_jobs([])) == []`, 'Execution may interleave, but task references are retained in input order. For large inputs use bounded concurrency.'),
      questions: [
        q('What does calling an async def function produce?', ['Its final result immediately', 'A coroutine object', 'A new OS thread', 'A process'], 1, 'The coroutine must be awaited or scheduled to execute.'),
        q('What is time.sleep inside an event loop likely to do?', ['Yield cooperatively', 'Block other tasks on that loop', 'Spawn a thread', 'Cancel all tasks'], 1, 'time.sleep blocks the event-loop thread.'),
        q('What should cleanup code usually do after catching CancelledError?', ['Ignore it forever', 'Re-raise it after cleanup', 'Return success', 'Restart the loop'], 1, 'Propagating cancellation preserves the caller’s operation lifetime.'),
        q('Which version first includes asyncio.TaskGroup?', ['3.8', '3.9', '3.10', '3.11'], 3, 'TaskGroup and asyncio.timeout are available starting in Python 3.11.')
      ],
      reference: ['asyncio tasks', 'https://docs.python.org/3.11/library/asyncio-task.html']
    },
    {
      title: 'Threads, Processes & Parallel Work',
      description: 'Executors, shared state, synchronization, and workload selection',
      objectives: ['Choose concurrency based on workload.', 'Recognize race conditions and process boundaries.'],
      lessons: [
        lesson('Choose the execution model deliberately', 'Threads can overlap blocking I/O and share memory. Processes can run CPU-heavy Python in parallel but require serialization and separate memory. Asyncio coordinates cooperative I/O. In conventional GIL-enabled CPython, CPU-bound Python threads generally do not speed up bytecode execution; extensions may release the GIL, and optional free-threaded builds have different behavior.', String.raw`from concurrent.futures import ThreadPoolExecutor

def normalize(value):
    return value.strip().upper()

with ThreadPoolExecutor(max_workers=2) as executor:
    results = list(executor.map(normalize, [" a ", " b "]))
assert results == ["A", "B"]`, 'This tiny transformation demonstrates the API, not a performance improvement. Thread overhead can dominate small tasks.'),
        lesson('Shared state needs a design', 'A read-modify-write operation is not a reliable synchronization boundary. Use locks around shared invariants or avoid shared mutation by returning results to a single owner. queue.Queue supports communication between threads. Always release a lock with a context manager so exceptions do not leave it held.', String.raw`from concurrent.futures import ThreadPoolExecutor
from threading import Lock

class Counter:
    def __init__(self):
        self.value = 0
        self.lock = Lock()
    def increment(self, _):
        with self.lock:
            self.value += 1

counter = Counter()
with ThreadPoolExecutor(max_workers=4) as executor:
    list(executor.map(counter.increment, range(100)))
assert counter.value == 100`, 'The GIL is not an application-level lock for multi-step invariants. Avoid holding a lock while performing slow external I/O.'),
        lesson('Process pools and shutdown', 'Process workers need importable, serializable callables and data. Define functions at module scope and protect the entry point, especially for spawn-based platforms. Collect results to observe worker exceptions. Executor context managers wait for submitted work; cancellation generally cannot stop work already running.', String.raw`# Save as process_demo.py and run as a script.
from concurrent.futures import ProcessPoolExecutor

def square(value):
    return value * value

def main():
    with ProcessPoolExecutor(max_workers=2) as executor:
        assert list(executor.map(square, [1, 2, 3])) == [1, 4, 9]

if __name__ == "__main__":
    main()`, 'A process pool is not guaranteed to work with notebook-local functions or lambdas. Benchmark enough useful work to offset startup and serialization costs.')
      ],
      lab: exercise('Use a thread pool to normalize a collection while preserving order. Avoid a shared result list inside workers.', String.raw`from concurrent.futures import ThreadPoolExecutor

def clean(text):
    return text.strip().casefold()

def clean_all(values):
    with ThreadPoolExecutor(max_workers=3) as executor:
        return list(executor.map(clean, values))

assert clean_all([" C ", " A ", " B "]) == ["c", "a", "b"]`, 'map yields results in input order. For completion order, submit tasks and use as_completed.'),
      questions: [
        q('Which is usually a better candidate for a process pool?', ['Waiting for many sockets', 'Substantial CPU-heavy pure Python work', 'Changing one string', 'Reading a global list'], 1, 'Processes can run Python computation in parallel, subject to overhead.'),
        q('Why guard process-pool startup with __name__ == "__main__"?', ['To cache results', 'To prevent recursive startup when workers import the module', 'To disable exceptions', 'To share globals'], 1, 'Spawn-based workers import the main module; startup must not repeat on import.'),
        q('Does a GIL remove the need for application synchronization?', ['Yes', 'No', 'Only for integers', 'Only for dictionaries'], 1, 'Multi-step invariants and shared operations still require coordination.'),
        q('What order does Executor.map expose results in?', ['Completion order', 'Input order', 'Random order', 'Sorted value order'], 1, 'map preserves input order; as_completed exposes completion order.')
      ],
      reference: ['concurrent.futures', 'https://docs.python.org/3.11/library/concurrent.futures.html']
    },
    {
      title: 'Command-Line Tools & Configuration',
      description: 'argparse, environment variables, exit codes, and safe subprocesses',
      objectives: ['Build a predictable command-line interface.', 'Parse configuration and launch commands safely.'],
      lessons: [
        lesson('Arguments are a public interface', 'argparse generates help, validates simple types, and reports usage errors. Keep main(argv=None) testable by passing explicit arguments in tests. Write machine-consumable output to stdout and diagnostics to stderr. Return a nonzero exit status when the operation fails.', String.raw`import argparse

def main(argv=None):
    parser = argparse.ArgumentParser(description="Repeat a greeting")
    parser.add_argument("name")
    parser.add_argument("--count", type=int, default=1)
    args = parser.parse_args(argv)
    if args.count < 1:
        parser.error("--count must be positive")
    for _ in range(args.count):
        print(f"Hello, {args.name}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())`, 'Do not parse process arguments at import time. A test can call main(["Ada", "--count", "2"]).'),
        lesson('Configuration has precedence and types', 'Define a clear precedence, such as command-line flags over environment variables over defaults. Environment variables are strings, including values that look like booleans or integers. Validate ranges and reject unknown boolean spellings instead of using bool(text). Keep secrets out of command-line arguments when they could be visible in process listings.', String.raw`def parse_enabled(text):
    normalized = text.strip().casefold()
    if normalized in {"1", "true", "yes"}:
        return True
    if normalized in {"0", "false", "no"}:
        return False
    raise ValueError("expected a boolean setting")

assert parse_enabled("false") is False
assert parse_enabled(" YES ") is True`, 'Document required settings, defaults, and which configuration source wins.'),
        lesson('Run subprocesses without shell interpolation', 'Pass an argument list to subprocess.run with shell=False, the default. Use check=True to raise on nonzero exit, a timeout to bound waiting, and text=True when text output is expected. shell=True changes quoting and injection behavior and is unnecessary for ordinary executable calls.', String.raw`import subprocess
import sys
result = subprocess.run(
    [sys.executable, "-c", "print('child ready')"],
    capture_output=True,
    text=True,
    check=True,
    timeout=5,
)
assert result.stdout.strip() == "child ready"`, 'Argument lists prevent shell interpretation, but still validate inputs against the called program’s own options and semantics.')
      ],
      lab: exercise('Create a parser with a required path and an optional --limit integer. Reject negative limits and test parsing without invoking a shell.', String.raw`import argparse

def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument("path")
    parser.add_argument("--limit", type=int, default=10)
    args = parser.parse_args(argv)
    if args.limit < 0:
        parser.error("--limit cannot be negative")
    return args

args = parse_args(["data.csv", "--limit", "0"])
assert args.path == "data.csv"
assert args.limit == 0`, 'Zero has a defined meaning here and must not be replaced by a truthiness-based fallback.'),
      questions: [
        q('What type does os.environ return for a present value?', ['bool', 'int', 'str', 'bytes always'], 2, 'Environment values are text and need explicit parsing.'),
        q('Which subprocess style avoids shell interpolation?', ['shell=True with concatenation', 'An argument list with shell=False', 'eval(command)', 'An f-string command passed to a shell'], 1, 'An argument list bypasses shell parsing.'),
        q('What does check=True do in subprocess.run?', ['Validates user input', 'Raises CalledProcessError for a nonzero exit', 'Checks HTTPS certificates', 'Retries automatically'], 1, 'It turns a failing child exit status into an exception.'),
        q('Where should diagnostics normally go in a CLI?', ['stdout mixed with JSON', 'stderr', 'Only a popup', 'Nowhere'], 1, 'Separating diagnostics preserves stdout for pipes and machine-readable output.')
      ],
      reference: ['argparse', 'https://docs.python.org/3.11/library/argparse.html']
    },
    {
      title: 'Packaging & Project Workflows',
      description: 'pyproject.toml, src layouts, editable installs, builds, and CI',
      objectives: ['Structure an installable package.', 'Distinguish package metadata, environments, and release artifacts.'],
      lessons: [
        lesson('A project that imports predictably', 'A src layout separates importable code from repository tooling, which helps reveal missing installation steps. Put tests in tests/ and declare build metadata in pyproject.toml. The browser course remains a static application; this chapter teaches packaging for your own Python projects.', String.raw`example_project/
    pyproject.toml
    README.md
    src/
        course_tools/
            __init__.py
            cli.py
    tests/
        test_cli.py`, 'Distribution names can contain hyphens, while import names use valid Python identifiers. They need not be identical.'),
        lesson('Declare metadata and an entry point', 'The build-system table selects a backend. The project table describes the distribution, Python compatibility, and dependencies. A console script points to an importable callable. The following is TOML, not Python; save it as pyproject.toml and provide the files in the layout above.', String.raw`[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "course-tools-demo"
version = "0.1.0"
requires-python = ">=3.11"
readme = "README.md"
dependencies = []

[project.scripts]
course-tools = "course_tools.cli:main"

[tool.setuptools.packages.find]
where = ["src"]`, 'The entry point main should return an exit status or None and should not run at import time.'),
        lesson('Install, verify, and build locally', 'An editable install links a working tree into the current environment for development. A wheel is an installable artifact; a source distribution contains source and build metadata. Run checks in a clean environment and test the built artifact before a release. The commands below build locally and do not publish anything.', String.raw`python -m venv .venv
# Activate the environment using the command for your shell.
python -m pip install -e .
python -m unittest discover -s tests
python -m pip install build
python -m build
# dist/ now contains a wheel and a source distribution.`, 'Keep dependency locking separate from abstract compatibility ranges. Never commit credentials or upload a release as a side effect of running tests.')
      ],
      lab: exercise('Write src/course_tools/cli.py for the declared console script, with a testable main and a safe direct-execution guard.', String.raw`def main(argv=None):
    import argparse
    parser = argparse.ArgumentParser(description="Course helper")
    parser.add_argument("--name", default="developer")
    args = parser.parse_args(argv)
    print(f"Hello, {args.name}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())`, 'After python -m pip install -e ., course-tools --name Ada invokes this function. Packaging needs the full layout and pyproject.toml from the lessons.'),
      questions: [
        q('What does pip install -e . provide?', ['A public release', 'An editable local install', 'A global Python upgrade', 'A Docker image'], 1, 'Editable installs support development against the current source tree.'),
        q('Which table declares a console script?', ['[project.scripts]', '[python.commands]', '[pip.main]', '[tool.entry]'], 0, 'Each script name maps to an importable module:function target.'),
        q('What does python -m build normally create?', ['A running server', 'A wheel and source distribution', 'A GitHub repository', 'Only bytecode'], 1, 'The build frontend produces distribution artifacts in dist/.'),
        q('Why test in a clean environment?', ['To hide missing files', 'To catch undeclared dependencies and import assumptions', 'To avoid installation', 'To remove version metadata'], 1, 'A clean environment reveals accidental reliance on the development machine.')
      ],
      reference: ['Python Packaging User Guide', 'https://packaging.python.org/en/latest/tutorials/packaging-projects/']
    },
    {
      title: 'Performance & Secure Coding',
      description: 'Profiling, complexity, bounded inputs, secrets, and unsafe evaluation',
      objectives: ['Measure before optimizing.', 'Identify unsafe execution and resource consumption boundaries.'],
      lessons: [
        lesson('Measure representative work', 'Start with a correct implementation and a realistic input. Algorithm choice often matters more than tiny expression changes. List membership scans linearly; set membership is average constant time with memory and construction costs. timeit helps compare small operations, while cProfile finds where a whole program spends time.', String.raw`from timeit import timeit
values = list(range(10_000))
lookup = set(values)
list_time = timeit(lambda: 9999 in values, number=1000)
set_time = timeit(lambda: 9999 in lookup, number=1000)
print(f"list={list_time:.6f}s set={set_time:.6f}s")
# Profile a real script from a terminal:
# python -m cProfile -s cumulative your_script.py`, 'This benchmark excludes set construction. Include setup costs if the real operation performs only one lookup.'),
        lesson('Bound memory and expensive work', 'Generators avoid storing an entire transformed sequence, but consuming them into a list restores that cost. Bound file sizes, HTTP response bodies, concurrency, and retry counts. Caching trades memory and invalidation complexity for saved computation. Profile memory as well as runtime when a workload grows.', String.raw`from itertools import islice

def first_matches(values, limit):
    if limit < 0:
        raise ValueError("limit must be nonnegative")
    matches = (value for value in values if value % 2 == 0)
    return list(islice(matches, limit))

assert first_matches(range(1_000_000), 3) == [0, 2, 4]
assert first_matches(range(10), 0) == []`, 'Do not assume lazy means bounded: an infinite search with no matches can still run forever.'),
        lesson('Treat data as data', 'Never eval user input or unpickle untrusted payloads. JSON avoids arbitrary object execution but still needs size limits and schema validation. Use secrets for tokens, parameterized SQL for values, and subprocess argument lists for commands. Path validation must account for traversal and symlinks; string prefix checks are insufficient.', String.raw`import json
import secrets

def parse_settings(text):
    if len(text) > 10_000:
        raise ValueError("settings too large")
    value = json.loads(text)
    if not isinstance(value, dict):
        raise ValueError("expected settings object")
    return value

token = secrets.token_urlsafe(32)
assert isinstance(token, str)
assert parse_settings('{"enabled": true}')["enabled"] is True`, 'Security requires domain-specific validation and resource limits, even when using a safe parser.')
      ],
      lab: exercise('Return a user-selected path under a trusted root, rejecting escapes after resolution. Explain the limitation if an attacker can change symlinks concurrently.', String.raw`from pathlib import Path
from tempfile import TemporaryDirectory

def resolve_under(root, user_path):
    root = Path(root).resolve()
    candidate = (root / user_path).resolve()
    if not candidate.is_relative_to(root):
        raise ValueError("path escapes root")
    return candidate

with TemporaryDirectory() as directory:
    root = Path(directory)
    assert resolve_under(root, "notes.txt") == root / "notes.txt"
    try:
        resolve_under(root, "../outside.txt")
    except ValueError:
        print("escape rejected")`, 'This handles ordinary traversal and existing symlinks at validation time. It is not a complete defense against concurrent filesystem changes; stronger directory-relative OS operations may be required for adversarial write access.'),
      questions: [
        q('What should usually precede optimization?', ['Guessing', 'Profiling representative work', 'Adding threads everywhere', 'Removing validation'], 1, 'Measure the actual bottleneck and retain correctness checks.'),
        q('Which module should generate an authentication token?', ['random', 'secrets', 'timeit', 'pickle'], 1, 'secrets uses a cryptographically strong randomness source.'),
        q('Is unpickling an untrusted file safe?', ['Yes', 'No; loading can execute arbitrary code', 'Only for small files', 'Only on Linux'], 1, 'Pickle is an executable serialization format and must not be trusted from arbitrary sources.'),
        q('Does a JSON parser remove the need for resource limits?', ['Yes', 'No', 'Only for lists', 'Only with UTF-8'], 1, 'Valid JSON can still be huge, deeply nested, or invalid for the domain.')
      ],
      reference: ['profiling', 'https://docs.python.org/3.11/library/profile.html']
    },
    {
      title: 'Capstone: Expense Report CLI',
      description: 'Combine CSV parsing, exact money, typed records, tests, and a CLI',
      objectives: ['Deliver a runnable offline tool with a clear contract.', 'Test parsing, aggregation, failures, and the command boundary.'],
      lessons: [
        lesson('Define the contract before implementation', 'Build an expense report tool that reads UTF-8 CSV with category and amount columns, rejects malformed or negative amounts, groups by category, and prints exact two-decimal totals. Use Decimal from strings. Keep parsing and aggregation separate from terminal output. A complete runnable implementation, sample input, and tests live in examples/expense_report/.', String.raw`category,amount
books,12.50
travel,20.00
books,7.25

# Expected output (categories sorted):
# books: 19.75
# travel: 20.00`, 'Treat a blank category, missing header, non-finite amount, or amount with more than two meaningful decimal places as a validation error.'),
        lesson('Parse into a small immutable record', 'A dataclass gives each parsed record a clear shape. A pure amount parser can validate the domain without reading a file. Reject NaN and Infinity before comparison. Quantize only after checking precision so malformed input is not silently rounded into acceptable data.', String.raw`from decimal import Decimal, InvalidOperation

def parse_amount(text):
    try:
        amount = Decimal(text)
    except InvalidOperation as error:
        raise ValueError("invalid amount") from error
    if not amount.is_finite() or amount < 0:
        raise ValueError("amount must be finite and nonnegative")
    if amount > Decimal("999999999.99"):
        raise ValueError("amount exceeds per-record limit")
    rounded = amount.quantize(Decimal("0.01"))
    if rounded != amount:
        raise ValueError("amount has more than two decimal places")
    return rounded

assert parse_amount("12.50") == Decimal("12.50")`, 'The full project also rejects overlong input and bounds row counts and total size. Explicit bounds keep exact decimal operations predictable.'),
        lesson('A delivery checklist grounded in behavior', 'The project should work without network access or third-party packages. Run it against the sample CSV, then run its unittest suite. Test an empty file, a header-only file, invalid money, quoted categories, and CLI failures. Document how to run it and what nonzero exit statuses mean. Extend the tool only after these behaviors are reliable.', String.raw`# Run from the repository root:
python examples/expense_report/expense_report.py examples/expense_report/sample.csv
python -m unittest discover -s examples/expense_report -p 'test_*.py'

# Stretch goals:
# 1. Add --format json with explicit Decimal serialization.
# 2. Add date filtering with an explicit date format.
# 3. Store validated records in SQLite using parameters.
# 4. Package the CLI with a pyproject.toml entry point.`, 'Keep tests deterministic and use temporary files. Each stretch goal should specify new behavior and failure cases before changing code.')
      ],
      lab: exercise('Implement the pure aggregation function for validated expense records, then test repeated and empty categories. The complete project provides file and CLI integration.', String.raw`from dataclasses import dataclass
from decimal import Decimal

@dataclass(frozen=True)
class Expense:
    category: str
    amount: Decimal

def summarize(expenses):
    totals = {}
    for expense in expenses:
        totals[expense.category] = totals.get(expense.category, Decimal("0.00")) + expense.amount
    return totals

assert summarize([]) == {}
assert summarize([Expense("books", Decimal("1.10")), Expense("books", Decimal("2.20"))]) == {"books": Decimal("3.30")}`, 'Aggregation assumes records have already passed boundary validation. Tests for the parser and CLI live at those respective boundaries.'),
      questions: [
        q('Where should CSV amount validation happen?', ['After displaying totals', 'At the parsing boundary before aggregation', 'Only in a type annotation', 'Nowhere'], 1, 'Validated records keep internal aggregation simple and predictable.'),
        q('Why parse money from strings into Decimal?', ['To get binary float approximation', 'To preserve intended decimal values', 'To avoid validation', 'To make every operation free'], 1, 'Decimal from text avoids binary float representation errors.'),
        q('What should a malformed input file cause?', ['A silent partial success', 'A useful diagnostic and nonzero CLI exit', 'An infinite retry', 'A default zero report'], 1, 'The caller must be able to distinguish failure from a valid empty report.'),
        q('Which layer is easiest to test without the filesystem?', ['Pure aggregation', 'Process startup', 'File permissions', 'Terminal encoding'], 0, 'Pure functions accept values and return results without external effects.')
      ],
      reference: ['decimal', 'https://docs.python.org/3.11/library/decimal.html']
    }
  ];
  advanced.forEach((chapter, index) => {
    const firstQuestion = chapter.questions[0];
    CHAPTERS.push({
      id: index + 12,
      title: chapter.title,
      description: chapter.description,
      objectives: chapter.objectives,
      steps: [...chapter.lessons, { ...firstQuestion, type: 'question' }, chapter.lab],
      quiz: chapter.questions,
      reference: chapter.reference
    });
  });
  CHAPTERS.forEach(chapter => {
    chapter.revision = 2;
    chapter.track = chapter.id <= 11 ? 'Foundations' : 'Engineering';
    chapter.estimatedMinutes = chapter.id <= 11 ? 25 : 35;
    chapter.steps.forEach((step, index) => {
      if (!step.title) {
        const heading = step.content?.match(/<h3>([\s\S]*?)<\/h3>/)?.[1];
        step.title = heading ? heading.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&') : `Quick check ${index + 1}`;
      }
    });
  });
})();
