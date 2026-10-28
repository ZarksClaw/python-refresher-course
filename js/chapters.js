const CHAPTERS = [
  {
    id: 1,
    title: 'Python Basics',
    description: 'Syntax, variables, data types, and basic I/O',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>Hello, Python!</h3>
          <p>Python is an interpreted, high-level, general-purpose programming language known for its readability and simplicity.</p>
          <div class="code-block"><span class="keyword">print</span>(<span class="string">"Hello, World!"</span>)</div>
          <h4>Key Features</h4>
          <ul>
            <li><strong>Indentation-based</strong> — blocks are defined by whitespace, not braces</li>
            <li><strong>Dynamically typed</strong> — no need to declare variable types</li>
            <li><strong>Everything is an object</strong> — even functions and classes</li>
          </ul>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Variables &amp; Basic Types</h3>
          <p>Variables are created by assignment. No declaration needed.</p>
          <div class="code-block">name = <span class="string">"Alice"</span>      <span class="comment"># str</span>
age = <span class="number">30</span>            <span class="comment"># int</span>
height = <span class="number">5.8</span>        <span class="comment"># float</span>
is_student = <span class="literal">True</span>   <span class="comment"># bool</span></div>
          <p>Use <code>type()</code> to check the type of any value.</p>
          <div class="code-block"><span class="keyword">print</span>(<span class="keyword">type</span>(age))   <span class="comment"># &lt;class 'int'&gt;</span></div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Basic Operators</h3>
          <div class="code-block"><span class="comment"># Arithmetic</span>
a + b   a - b   a * b   a / b   a // b   a % b   a ** b

<span class="comment"># Comparison</span>
==  !=  &lt;  &gt;  &lt;=  &gt;=

<span class="comment"># Logical</span>
<span class="keyword">and</span>  <span class="keyword">or</span>  <span class="keyword">not</span></div>
          <p>Note: <code>/</code> on integers produces a float. <code>//</code> performs floor division; a float operand can produce a float result.</p>
        `
      },
      {
        type: 'question',
        question: 'What does the expression `9 // 2` evaluate to in Python?',
        options: ['4.5', '4', '5', 'Error'],
        correct: 1,
        explanation: 'The `//` operator performs floor division (integer division), so 9 // 2 = 4.'
      }
    ],
    quiz: [
      {
        question: 'Which of the following is NOT a valid Python variable name?',
        options: ['my_var', '_count', '2nd_place', 'data2'],
        correct: 2,
        explanation: 'Variable names cannot start with a digit.'
      },
      {
        question: 'What type does `type(3.14)` return?',
        options: ['int', 'float', 'str', 'complex'],
        correct: 1,
        explanation: '3.14 is a float literal, so type(3.14) returns the float class.'
      },
      {
        question: 'Which operator performs exponentiation in Python?',
        options: ['^', '**', 'exp()', '^^'],
        correct: 1,
        explanation: 'The `**` operator is used for exponentiation (e.g., 2 ** 3 = 8).'
      }
    ]
  },

  {
    id: 2,
    title: 'Control Flow',
    description: 'Conditionals, loops, and comprehensions',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>if / elif / else</h3>
          <p>Conditional execution uses <code>if</code>, <code>elif</code>, and <code>else</code>.</p>
          <div class="code-block">x = <span class="number">10</span>
<span class="keyword">if</span> x > <span class="number">0</span>:
    <span class="keyword">print</span>(<span class="string">"Positive"</span>)
<span class="keyword">elif</span> x == <span class="number">0</span>:
    <span class="keyword">print</span>(<span class="string">"Zero"</span>)
<span class="keyword">else</span>:
    <span class="keyword">print</span>(<span class="string">"Negative"</span>)</div>
          <p>No parentheses around the condition are required (but allowed). The colon <code>:</code> is mandatory.</p>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Loops: for &amp; while</h3>
          <div class="code-block"><span class="comment"># For loop over a range</span>
<span class="keyword">for</span> i <span class="keyword">in</span> <span class="keyword">range</span>(<span class="number">5</span>):
    <span class="keyword">print</span>(i)          <span class="comment"># 0 1 2 3 4</span>

<span class="comment"># For loop over a list</span>
<span class="keyword">for</span> item <span class="keyword">in</span> [<span class="string">"a"</span>, <span class="string">"b"</span>, <span class="string">"c"</span>]:
    <span class="keyword">print</span>(item)

<span class="comment"># While loop</span>
count = <span class="number">0</span>
<span class="keyword">while</span> count < <span class="number">3</span>:
    <span class="keyword">print</span>(count)
    count += <span class="number">1</span></div>
          <p>Use <code>break</code> to exit early, <code>continue</code> to skip the rest of the current iteration.</p>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>List Comprehensions</h3>
          <p>A concise way to create lists.</p>
          <div class="code-block"><span class="comment"># Traditional</span>
squares = []
<span class="keyword">for</span> i <span class="keyword">in</span> <span class="keyword">range</span>(<span class="number">10</span>):
    squares.append(i * i)

<span class="comment"># Comprehension</span>
squares = [i * i <span class="keyword">for</span> i <span class="keyword">in</span> <span class="keyword">range</span>(<span class="number">10</span>)]

<span class="comment"># With condition</span>
evens = [i <span class="keyword">for</span> i <span class="keyword">in</span> <span class="keyword">range</span>(<span class="number">10</span>) <span class="keyword">if</span> i % <span class="number">2</span> == <span class="number">0</span>]</div>
          <p>Also works for <code>dict</code> and <code>set</code> comprehensions.</p>
        `
      },
      {
        type: 'question',
        question: 'What does `range(3, 7)` produce?',
        options: ['[3, 4, 5, 6, 7]', '[3, 4, 5, 6]', '[4, 5, 6, 7]', '[3, 4, 5]'],
        correct: 1,
        explanation: 'range(start, stop) includes start but excludes stop, so it yields 3, 4, 5, 6.'
      },
      {
        type: 'question',
        question: 'What is the output of: `[x**2 for x in range(4) if x % 2 == 0]`?',
        options: ['[0, 4, 16]', '[0, 4]', '[1, 9]', '[4, 16]'],
        correct: 1,
        explanation: 'x=0 → 0, x=2 → 4. Only even numbers are included. 0**2=0, 2**2=4.'
      }
    ],
    quiz: [
      {
        question: 'How do you write an empty loop body in Python?',
        options: ['do nothing', 'skip', 'pass', 'continue'],
        correct: 2,
        explanation: '`pass` is a null operation used when a statement is syntactically required but no action is needed.'
      },
      {
        question: 'What statement exits a loop immediately?',
        options: ['exit', 'stop', 'break', 'return'],
        correct: 2,
        explanation: '`break` terminates the nearest enclosing loop.'
      },
      {
        question: 'Which keyword starts a conditional branch?',
        options: ['when', 'if', 'switch', 'cond'],
        correct: 1,
        explanation: 'Python uses `if`, `elif`, and `else` for conditionals.'
      }
    ]
  },

  {
    id: 3,
    title: 'Functions & Scope',
    description: 'Defining functions, arguments, return values, and scoping rules',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>Defining Functions</h3>
          <p>Functions are defined with the <code>def</code> keyword.</p>
          <div class="code-block"><span class="keyword">def</span> <span class="function">greet</span>(name):
    <span class="keyword">return</span> <span class="string">f"Hello, {name}!"</span>

<span class="keyword">print</span>(<span class="function">greet</span>(<span class="string">"Alice"</span>))   <span class="comment"># Hello, Alice!</span></div>
          <p>Functions without an explicit <code>return</code> return <code>None</code>.</p>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Arguments: Positional &amp; Keyword</h3>
          <div class="code-block"><span class="keyword">def</span> <span class="function">describe</span>(name, age=<span class="number">0</span>, *hobbies, **details):
    <span class="keyword">print</span>(<span class="string">f"Name: {name}, Age: {age}"</span>)
    <span class="keyword">print</span>(<span class="string">f"Hobbies: {hobbies}"</span>)
    <span class="keyword">print</span>(<span class="string">f"Details: {details}"</span>)

<span class="function">describe</span>(<span class="string">"Bob"</span>, <span class="number">25</span>, <span class="string">"coding"</span>, <span class="string">"chess"</span>, city=<span class="string">"NYC"</span>)</div>
          <ul>
            <li><strong>Positional</strong>: matched by order</li>
            <li><strong>Default</strong>: <code>age=0</code> — optional with a fallback</li>
            <li><strong>*args</strong>: captures extra positional args as a tuple</li>
            <li><strong>**kwargs</strong>: captures extra keyword args as a dict</li>
          </ul>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Scope Rules (LEGB)</h3>
          <p>Python resolves names in this order:</p>
          <ol>
            <li><strong>L</strong>ocal — inside the current function</li>
            <li><strong>E</strong>nclosing — outer functions (nested functions)</li>
            <li><strong>G</strong>lobal — module level</li>
            <li><strong>B</strong>uilt-in — Python's built-in names</li>
          </ol>
          <div class="code-block">x = <span class="string">"global"</span>
<span class="keyword">def</span> <span class="function">outer</span>():
    x = <span class="string">"enclosing"</span>
    <span class="keyword">def</span> <span class="function">inner</span>():
        x = <span class="string">"local"</span>
        <span class="keyword">print</span>(x)
    <span class="function">inner</span>()</div>
        `
      },
      {
        type: 'question',
        question: 'What does a function return if no `return` statement is executed?',
        options: ['0', 'False', 'None', 'An empty string'],
        correct: 2,
        explanation: 'Functions without a return statement return None by default.'
      },
      {
        type: 'question',
        question: 'What does `*args` capture?',
        options: ['Keyword arguments as a dict', 'Extra positional arguments as a tuple', 'The first positional argument', 'Default parameter values'],
        correct: 1,
        explanation: '*args captures extra positional arguments into a tuple.'
      }
    ],
    quiz: [
      {
        question: 'What is the output? `def f(a, b=[]): b.append(a); return b` then `print(f(1)); print(f(2))`',
        options: ['[1] [2]', '[1] [1, 2]', 'Error', '[1] [1]'],
        correct: 1,
        explanation: 'Default argument values are evaluated once at definition time, so the same list is mutated across calls.'
      },
      {
        question: 'Which keyword is used to modify a global variable inside a function?',
        options: ['global', 'nonlocal', 'extern', 'public'],
        correct: 0,
        explanation: 'The `global` keyword declares that a name refers to the global scope.'
      },
      {
        question: 'What does `lambda x: x * 2` return when called with 5?',
        options: ['10', '25', '5', '2'],
        correct: 0,
        explanation: 'lambda creates an anonymous function. lambda x: x * 2 multiplies its argument by 2.'
      }
    ]
  },

  {
    id: 4,
    title: 'Data Structures',
    description: 'Lists, tuples, dicts, sets, and their methods',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>Lists</h3>
          <p>Ordered, mutable sequences.</p>
          <div class="code-block">nums = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>]
nums.append(<span class="number">5</span>)       <span class="comment"># [1, 2, 3, 4, 5]</span>
nums.insert(<span class="number">0</span>, <span class="number">0</span>)    <span class="comment"># [0, 1, 2, 3, 4, 5]</span>
nums.pop()            <span class="comment"># removes & returns 5</span>
nums.remove(<span class="number">2</span>)        <span class="comment"># removes first 2</span>
nums[<span class="number">1</span>:<span class="number">3</span>]             <span class="comment"># slicing: [1, 3]</span></div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Tuples</h3>
          <p>Ordered, immutable sequences. Useful for fixed data.</p>
          <div class="code-block">point = (<span class="number">3</span>, <span class="number">4</span>)
x, y = point          <span class="comment"># tuple unpacking</span>
<span class="keyword">print</span>(x, y)            <span class="comment"># 3 4</span></div>
          <h3>Sets</h3>
          <p>Unordered collections of unique elements.</p>
          <div class="code-block">a = {<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>}
b = {<span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>}
a | b  <span class="comment"># union: {1,2,3,4,5}</span>
a & b  <span class="comment"># intersection: {3}</span>
a - b  <span class="comment"># difference: {1,2}</span></div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Dictionaries</h3>
          <p>Key-value mappings, ordered (as of Python 3.7+).</p>
          <div class="code-block">student = {
    <span class="string">"name"</span>: <span class="string">"Alice"</span>,
    <span class="string">"age"</span>: <span class="number">22</span>,
    <span class="string">"courses"</span>: [<span class="string">"Math"</span>, <span class="string">"CS"</span>]
}

<span class="keyword">print</span>(student[<span class="string">"name"</span>])     <span class="comment"># Alice</span>
student[<span class="string">"gpa"</span>] = <span class="number">3.8</span>       <span class="comment"># add or update</span>
student.get(<span class="string">"age"</span>)         <span class="comment"># 22 (safe access)</span>
student.keys()              <span class="comment"># dict_keys view</span>
student.values()            <span class="comment"># dict_values view</span></div>
        `
      },
      {
        type: 'question',
        question: 'Which of the following is immutable?',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correct: 2,
        explanation: 'Tuples are immutable — they cannot be modified after creation.'
      },
      {
        type: 'question',
        question: 'What does `{1, 2, 3} - {2, 3, 4}` return?',
        options: ['{1, 2, 3, 4}', '{1}', '{2, 3}', '{4}'],
        correct: 1,
        explanation: 'Set difference (-) returns elements in the left set but not in the right set: {1}.'
      }
    ],
    quiz: [
      {
        question: 'How do you access the last element of a list `nums`?',
        options: ['nums.last()', 'nums[-1]', 'nums[end]', 'nums[len]'],
        correct: 1,
        explanation: 'Negative indices count from the end; nums[-1] is the last element.'
      },
      {
        question: 'What method adds an element to the end of a list?',
        options: ['push()', 'insert()', 'append()', 'add()'],
        correct: 2,
        explanation: 'list.append(x) appends x to the end of the list.'
      },
      {
        question: 'What is the output of `len({})`?',
        options: ['0', '1', 'None', 'Error'],
        correct: 0,
        explanation: 'An empty dict has length 0.'
      }
    ]
  },

  {
    id: 5,
    title: 'String Manipulation',
    description: 'String methods, formatting, f-strings, and regex basics',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>String Basics &amp; Methods</h3>
          <p>Strings are immutable sequences of characters.</p>
          <div class="code-block">s = <span class="string">"  Hello, Python!  "</span>
s.strip()       <span class="comment"># "Hello, Python!"</span>
s.lower()       <span class="comment"># "  hello, python!  "</span>
s.upper()       <span class="comment"># "  HELLO, PYTHON!  "</span>
s.replace(<span class="string">"Python"</span>, <span class="string">"World"</span>)
s.split(<span class="string">","</span>)     <span class="comment"># ["  Hello", " Python!  "]</span>
<span class="string">"-"</span>.join([<span class="string">"a"</span>, <span class="string">"b"</span>])  <span class="comment"># "a-b"</span></div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>String Formatting</h3>
          <p>Python offers several ways to format strings. <strong>f-strings</strong> (Python 3.6+) are preferred.</p>
          <div class="code-block">name = <span class="string">"Alice"</span>
age = <span class="number">30</span>

<span class="comment"># f-string (modern, preferred)</span>
<span class="keyword">print</span>(<span class="string">f"{name} is {age} years old"</span>)

<span class="comment"># .format()</span>
<span class="keyword">print</span>(<span class="string">"{} is {} years old"</span>.format(name, age))

<span class="comment"># %-formatting (old style)</span>
<span class="keyword">print</span>(<span class="string">"%s is %d years old"</span> % (name, age))</div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Regex with <code>re</code> Module</h3>
          <div class="code-block"><span class="keyword">import</span> re

pattern = <span class="string">r"\d+"</span>   <span class="comment"># raw string for regex</span>
text = <span class="string">"Order 42: 3 items"</span>

re.findall(pattern, text)  <span class="comment"># ['42', '3']</span>
re.search(pattern, text)   <span class="comment"># Match object or None</span>
re.match(pattern, text)    <span class="comment"># match at start only</span>
re.sub(pattern, <span class="string">"#"</span>, text) <span class="comment"># "Order #: # items"</span></div>
          <p>Use <code>r"..."</code> (raw strings) to avoid escaping backslashes.</p>
        `
      },
      {
        type: 'question',
        question: 'What does `"a-b-c".split("-")` return?',
        options: ['["a", "b", "c"]', '["a-b-c"]', '["a", "b-c"]', '["a", "-", "b", "-", "c"]'],
        correct: 0,
        explanation: 'split("-") splits the string at each "-" delimiter, returning ["a", "b", "c"].'
      },
      {
        type: 'question',
        question: 'Which string method checks if a string ends with a given suffix?',
        options: ['ends()', 'suffix()', 'endswith()', 'matches()'],
        correct: 2,
        explanation: 'The `endswith()` method returns True if the string ends with the specified suffix.'
      }
    ],
    quiz: [
      {
        question: 'What is the result of `"hello".upper()`?',
        options: ['"hello"', '"HELLO"', '"Hello"', '"hELLO"'],
        correct: 1,
        explanation: 'upper() converts all characters to uppercase.'
      },
      {
        question: 'Which operator concatenates strings?',
        options: ['&', '+', '.', '*'],
        correct: 1,
        explanation: 'The + operator concatenates strings: "a" + "b" → "ab".'
      },
      {
        question: 'What does `re.search(r"\\d+", "abc123")` return?',
        options: ['None', 'A Match object', 'True', '"123"'],
        correct: 1,
        explanation: 're.search finds the first location where the pattern matches and returns a Match object.'
      }
    ]
  },

  {
    id: 6,
    title: 'File I/O',
    description: 'Reading and writing files, context managers, common formats',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>Opening &amp; Closing Files</h3>
          <p>Use the built-in <code>open()</code> function. Always close files, preferably with a context manager.</p>
          <div class="code-block"><span class="comment"># With context manager (recommended)</span>
<span class="keyword">with</span> <span class="keyword">open</span>(<span class="string">"file.txt"</span>, <span class="string">"r"</span>) <span class="keyword">as</span> f:
    content = f.read()
    <span class="comment"># file is auto-closed after block</span>

<span class="comment"># Modes</span>
<span class="string">"r"</span>   <span class="comment"># read (default)</span>
<span class="string">"w"</span>   <span class="comment"># write (overwrites)</span>
<span class="string">"a"</span>   <span class="comment"># append</span>
<span class="string">"rb"</span>  <span class="comment"># read binary</span>
<span class="string">"w+"</span>  <span class="comment"># read + write (truncates)</span></div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Reading Methods</h3>
          <div class="code-block"><span class="keyword">with</span> <span class="keyword">open</span>(<span class="string">"data.txt"</span>) <span class="keyword">as</span> f:
    entire = f.read()        <span class="comment"># consumes the whole file</span>
    f.seek(0)               <span class="comment"># rewind before another read</span>
    line = f.readline()      <span class="comment"># first line</span>
    lines = f.readlines()    <span class="comment"># remaining lines</span>

<span class="comment"># Iterate directly (memory efficient)</span>
<span class="keyword">with</span> <span class="keyword">open</span>(<span class="string">"data.txt"</span>) <span class="keyword">as</span> f:
    <span class="keyword">for</span> line <span class="keyword">in</span> f:
        <span class="keyword">print</span>(line.strip())</div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Writing &amp; JSON</h3>
          <div class="code-block"><span class="comment"># Writing</span>
<span class="keyword">with</span> <span class="keyword">open</span>(<span class="string">"out.txt"</span>, <span class="string">"w"</span>) <span class="keyword">as</span> f:
    f.write(<span class="string">"Hello, World!\n"</span>)
    f.writelines([<span class="string">"line1\n"</span>, <span class="string">"line2\n"</span>])

<span class="comment"># JSON</span>
<span class="keyword">import</span> json
data = {<span class="string">"name"</span>: <span class="string">"Alice"</span>, <span class="string">"score"</span>: <span class="number">95</span>}

<span class="keyword">with</span> <span class="keyword">open</span>(<span class="string">"data.json"</span>, <span class="string">"w"</span>) <span class="keyword">as</span> f:
    json.dump(data, f, indent=<span class="number">2</span>)

<span class="keyword">with</span> <span class="keyword">open</span>(<span class="string">"data.json"</span>) <span class="keyword">as</span> f:
    loaded = json.load(f)</div>
        `
      },
      {
        type: 'question',
        question: 'What does the `with` statement provide when working with files?',
        options: ['Multi-threading', 'Automatic file closing', 'Faster I/O', 'File locking'],
        correct: 1,
        explanation: 'The `with` statement (context manager) ensures the file is automatically closed when the block exits.'
      },
      {
        type: 'question',
        question: 'Which mode opens a file for writing without truncating it?',
        options: ['"w"', '"a"', '"r"', '"w+"'],
        correct: 1,
        explanation: '`"a"` (append) opens a file for writing, and new data is written at the end without truncating.'
      }
    ],
    quiz: [
      {
        question: 'What does `json.load()` do?',
        options: ['Loads JSON from a string', 'Loads JSON from a file object', 'Writes JSON to a file', 'Converts a dict to JSON'],
        correct: 1,
        explanation: 'json.load() reads JSON data from a file object (opened file).'
      },
      {
        question: 'Which function writes a string to a file without adding a newline?',
        options: ['writeline()', 'write()', 'read()', 'print()'],
        correct: 1,
        explanation: 'file.write() writes a string without appending a newline.'
      },
      {
        question: 'What happens if you open a non-existent file in mode "r"?',
        options: ['It creates the file', 'It returns None', 'It raises FileNotFoundError', 'It returns an empty string'],
        correct: 2,
        explanation: 'Opening a non-existent file in read mode raises FileNotFoundError.'
      }
    ]
  },

  {
    id: 7,
    title: 'Error Handling & Exceptions',
    description: 'Try/except, finally, custom exceptions, and best practices',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>Try / Except</h3>
          <p>Python uses <code>try</code>/<code>except</code> blocks to handle exceptions gracefully.</p>
          <div class="code-block"><span class="keyword">try</span>:
    num = <span class="keyword">int</span>(<span class="keyword">input</span>(<span class="string">"Enter a number: "</span>))
    result = <span class="number">10</span> / num
<span class="keyword">except</span> ValueError:
    <span class="keyword">print</span>(<span class="string">"That's not a valid number!"</span>)
<span class="keyword">except</span> ZeroDivisionError:
    <span class="keyword">print</span>(<span class="string">"Can't divide by zero!"</span>)
<span class="keyword">else</span>:
    <span class="keyword">print</span>(<span class="string">f"Result: {result}"</span>)
<span class="keyword">finally</span>:
    <span class="keyword">print</span>(<span class="string">"Done."</span>)</div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Raising &amp; Custom Exceptions</h3>
          <div class="code-block"><span class="keyword">class</span> <span class="class">ValidationError</span>(Exception):
    <span class="string">"""Custom exception for validation failures."""</span>
    <span class="keyword">pass</span>

<span class="keyword">def</span> <span class="function">validate_age</span>(age):
    <span class="keyword">if</span> age < <span class="number">0</span>:
        <span class="keyword">raise</span> <span class="class">ValidationError</span>(<span class="string">"Age cannot be negative"</span>)
    <span class="keyword">return</span> age

<span class="keyword">try</span>:
    <span class="function">validate_age</span>(-<span class="number">5</span>)
<span class="keyword">except</span> <span class="class">ValidationError</span> <span class="keyword">as</span> e:
    <span class="keyword">print</span>(e)</div>
          <p>Custom exceptions should inherit from <code>Exception</code> (or a subclass).</p>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Common Built-in Exceptions</h3>
          <ul>
            <li><code>ValueError</code> — wrong value</li>
            <li><code>TypeError</code> — wrong type</li>
            <li><code>IndexError</code> — list index out of range</li>
            <li><code>KeyError</code> — dict key not found</li>
            <li><code>FileNotFoundError</code> — file doesn't exist</li>
            <li><code>AttributeError</code> — object has no such attribute</li>
          </ul>
          <p>Use the <code>raise</code> keyword to trigger an exception intentionally.</p>
        `
      },
      {
        type: 'question',
        question: 'Which block executes regardless of whether an exception occurred?',
        options: ['except', 'else', 'finally', 'try'],
        correct: 2,
        explanation: 'The `finally` block always executes, even if an exception is raised or a return exits the function.'
      },
      {
        type: 'question',
        question: 'What exception is raised when trying to access a list index that does not exist?',
        options: ['ValueError', 'KeyError', 'IndexError', 'AttributeError'],
        correct: 2,
        explanation: 'IndexError is raised when a sequence subscript is out of range.'
      }
    ],
    quiz: [
      {
        question: 'When does the `else` block in a try/except execute?',
        options: ['Always', 'Only when an exception occurs', 'Only when no exception occurs', 'Never'],
        correct: 2,
        explanation: 'The `else` block runs only if no exception was raised in the try block.'
      },
      {
        question: 'Which handler catches ordinary application errors while allowing KeyboardInterrupt and SystemExit to propagate?',
        options: ['except Exception as e', 'except:', 'except * as e', 'Both A and B'],
        correct: 0,
        explanation: 'except Exception as e catches ordinary application errors. A bare except also catches BaseException subclasses such as KeyboardInterrupt and SystemExit.'
      },
      {
        question: 'What does `raise` do without an argument?',
        options: ['Does nothing', 'Re-raises the current exception', 'Raises RuntimeError', 'Exits the program'],
        correct: 1,
        explanation: 'A bare `raise` re-raises the currently active exception (must be inside an except block).'
      }
    ]
  },

  {
    id: 8,
    title: 'Modules & Packages',
    description: 'Importing, __name__, pip, and virtual environments',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>Importing Modules</h3>
          <div class="code-block"><span class="comment"># Various import styles</span>
<span class="keyword">import</span> math
<span class="keyword">import</span> os.path
<span class="keyword">from</span> datetime <span class="keyword">import</span> datetime
<span class="keyword">from</span> collections <span class="keyword">import</span> defaultdict <span class="keyword">as</span> dd
<span class="keyword">import</span> statistics <span class="keyword">as</span> stats

<span class="keyword">print</span>(math.sqrt(<span class="number">16</span>))      <span class="comment"># 4.0</span>
<span class="keyword">print</span>(datetime.now())    <span class="comment"># current date/time</span></div>
          <p>A module is a <code>.py</code> file. A regular package contains <code>__init__.py</code>; namespace packages can omit it.</p>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>The <code>__name__</code> Variable</h3>
          <p>Every module has a <code>__name__</code> attribute. It is <code>"__main__"</code> when the file is run directly.</p>
          <div class="code-block"><span class="keyword">if</span> __name__ == <span class="string">"__main__"</span>:
    <span class="comment"># This runs only when the script is executed directly</span>
    main()</div>
          <p>This pattern allows a file to be both a reusable module and a standalone script.</p>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>pip &amp; Virtual Environments</h3>
          <div class="code-block"><span class="comment"># Install packages</span>
python -m pip install requests

<span class="comment"># Create a virtual environment</span>
python -m venv venv
<span class="comment"># Activate (Linux/Mac)</span>
<span class="keyword">source</span> venv/bin/activate
<span class="comment"># Activate (Windows PowerShell)</span>
venv\Scripts\Activate.ps1

<span class="comment"># Freeze requirements</span>
python -m pip freeze > requirements.txt</div>
          <p>Always use virtual environments to isolate project dependencies.</p>
        `
      },
      {
        type: 'question',
        question: 'What is the value of `__name__` when a script is run directly?',
        options: ['"__module__"', '"__main__"', '"__script__"', '"__direct__"'],
        correct: 1,
        explanation: 'When a Python file is executed directly, __name__ is set to "__main__".'
      },
      {
        type: 'question',
        question: 'Which file marks a regular Python package?',
        options: ['main.py', 'init.py', '__init__.py', 'package.py'],
        correct: 2,
        explanation: 'An `__init__.py` file (can be empty) marks a regular package; namespace packages may omit it.'
      }
    ],
    quiz: [
      {
        question: 'How do you import only the `sqrt` function from `math`?',
        options: ['import math.sqrt', 'from math import sqrt', 'include math.sqrt', 'using math.sqrt'],
        correct: 1,
        explanation: '`from math import sqrt` imports only the sqrt function into the current namespace.'
      },
      {
        question: 'What command creates a requirements file?',
        options: ['pip list > requirements.txt', 'python -m pip freeze > requirements.txt', 'pip export > requirements.txt', 'pip save > requirements.txt'],
        correct: 1,
        explanation: '`pip freeze` outputs installed packages in requirements format, which can be redirected to a file.'
      },
      {
        question: 'What is the purpose of a virtual environment?',
        options: ['To simulate production servers', 'To isolate project dependencies', 'To speed up Python execution', 'To compile Python to C'],
        correct: 1,
        explanation: 'Virtual environments create isolated Python environments so each project can have its own dependencies.'
      }
    ]
  },

  {
    id: 9,
    title: 'Object-Oriented Programming',
    description: 'Classes, inheritance, magic methods, and properties',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>Classes &amp; Instances</h3>
          <div class="code-block"><span class="keyword">class</span> <span class="class">Dog</span>:
    species = <span class="string">"Canis familiaris"</span>  <span class="comment"># class attribute</span>

    <span class="keyword">def</span> <span class="function">__init__</span>(self, name, age):
        self.name = name            <span class="comment"># instance attribute</span>
        self.age = age

    <span class="keyword">def</span> <span class="function">bark</span>(self):
        <span class="keyword">return</span> <span class="string">f"{self.name} says Woof!"</span>

buddy = <span class="class">Dog</span>(<span class="string">"Buddy"</span>, <span class="number">3</span>)
<span class="keyword">print</span>(buddy.bark())               <span class="comment"># Buddy says Woof!</span>
<span class="keyword">print</span>(buddy.species)              <span class="comment"># Canis familiaris</span></div>
          <p><code>self</code> refers to the current instance. It is the conventional name for the first parameter of an ordinary instance method.</p>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Inheritance</h3>
          <div class="code-block"><span class="keyword">class</span> <span class="class">Puppy</span>(<span class="class">Dog</span>):    <span class="comment"># Inherits from Dog</span>
    <span class="keyword">def</span> <span class="function">__init__</span>(self, name, age, toy):
        <span class="keyword">super</span>().<span class="function">__init__</span>(name, age)  <span class="comment"># call parent constructor</span>
        self.toy = toy

    <span class="keyword">def</span> <span class="function">bark</span>(self):                <span class="comment"># Override method</span>
        <span class="keyword">return</span> <span class="string">f"{self.name} yips!"</span>

pup = <span class="class">Puppy</span>(<span class="string">"Max"</span>, <span class="number">1</span>, <span class="string">"ball"</span>)
<span class="keyword">print</span>(pup.bark())    <span class="comment"># Max yips!</span></div>
          <p>Use <code>super()</code> to call parent class methods. Python supports multiple inheritance.</p>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Magic Methods &amp; Properties</h3>
          <div class="code-block"><span class="keyword">class</span> <span class="class">Vector</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(self, x, y):
        self._x = x
        self._y = y

    <span class="keyword">def</span> <span class="function">__repr__</span>(self):          <span class="comment"># string representation</span>
        <span class="keyword">return</span> <span class="string">f"Vector({self._x}, {self._y})"</span>

    <span class="keyword">def</span> <span class="function">__add__</span>(self, other):    <span class="comment"># v + other</span>
        <span class="keyword">return</span> <span class="class">Vector</span>(self._x + other._x, self._y + other._y)

    <span class="meta">@property</span>
    <span class="keyword">def</span> <span class="function">magnitude</span>(self):         <span class="comment"># computed property</span>
        <span class="keyword">return</span> (self._x**<span class="number">2</span> + self._y**<span class="number">2</span>) ** <span class="number">0.5</span></div>
          <p>Magic methods (dunder methods) allow operator overloading and integrate with Python protocols.</p>
        `
      },
      {
        type: 'question',
        question: 'Which method initializes a newly created Python instance?',
        options: ['__construct__', '__new__', '__init__', '__create__'],
        correct: 2,
        explanation: '__new__ creates an instance; __init__ initializes it after creation and must return None.'
      },
      {
        type: 'question',
        question: 'How do you call the parent class constructor?',
        options: ['parent.__init__(self)', 'super().__init__()', 'base.__init__()', 'ParentClass.__init__()'],
        correct: 1,
        explanation: 'super().__init__() is the recommended way to call the parent class constructor.'
      }
    ],
    quiz: [
      {
        question: 'What does `@property` do?',
        options: ['Makes a method private', 'Makes a method accessible as an attribute', 'Creates a class method', 'Defines a static method'],
        correct: 1,
        explanation: 'The @property decorator allows a method to be accessed like an attribute (without parentheses).'
      },
      {
        question: 'What is the conventional name of the instance parameter?',
        options: ['cls', 'this', 'self', 'instance'],
        correct: 2,
        explanation: 'self is the conventional name for the instance parameter, not a reserved keyword.'
      },
      {
        question: 'Which magic method is called by `str(obj)`?',
        options: ['__repr__', '__str__', '__format__', '__unicode__'],
        correct: 1,
        explanation: '__str__ defines the string representation used by str() and print().'
      }
    ]
  },

  {
    id: 10,
    title: 'Advanced Topics',
    description: 'Decorators, generators, context managers, and more',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3>Decorators</h3>
          <p>A decorator is a function that wraps another function to extend its behavior.</p>
          <div class="code-block"><span class="keyword">def</span> <span class="function">timer</span>(func):
    <span class="keyword">import</span> time
    <span class="keyword">from</span> functools <span class="keyword">import</span> wraps
    @wraps(func)
    <span class="keyword">def</span> <span class="function">wrapper</span>(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        <span class="keyword">print</span>(<span class="string">f"Took {time.perf_counter()-start:.3f}s"</span>)
        <span class="keyword">return</span> result
    <span class="keyword">return</span> wrapper

<span class="meta">@timer</span>
<span class="keyword">def</span> <span class="function">slow_function</span>():
    <span class="keyword">import</span> time
    time.sleep(<span class="number">1</span>)
    <span class="keyword">return</span> <span class="string">"Done"</span></div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Generators</h3>
          <p>Generators yield values lazily using the <code>yield</code> keyword.</p>
          <div class="code-block"><span class="keyword">def</span> <span class="function">fibonacci</span>(n):
    a, b = <span class="number">0</span>, <span class="number">1</span>
    <span class="keyword">for</span> _ <span class="keyword">in</span> <span class="keyword">range</span>(n):
        <span class="keyword">yield</span> a
        a, b = b, a + b

<span class="keyword">for</span> num <span class="keyword">in</span> <span class="function">fibonacci</span>(<span class="number">5</span>):
    <span class="keyword">print</span>(num)  <span class="comment"># 0 1 1 2 3</span></div>
          <p>Generator expressions: <code>(x**2 for x in range(10))</code></p>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3>Context Managers</h3>
          <p>Use <code>__enter__</code> and <code>__exit__</code> or <code>@contextmanager</code>.</p>
          <div class="code-block"><span class="keyword">from</span> contextlib <span class="keyword">import</span> contextmanager

<span class="meta">@contextmanager</span>
<span class="keyword">def</span> <span class="function">open_file</span>(name, mode):
    f = <span class="keyword">open</span>(name, mode)
    <span class="keyword">try</span>:
        <span class="keyword">yield</span> f
    <span class="keyword">finally</span>:
        f.close()

<span class="keyword">with</span> <span class="function">open_file</span>(<span class="string">"test.txt"</span>, <span class="string">"w"</span>) <span class="keyword">as</span> f:
    f.write(<span class="string">"Hello!"</span>)</div>
        `
      },
      {
        type: 'question',
        question: 'What keyword is used in a generator function?',
        options: ['return', 'emit', 'generate', 'yield'],
        correct: 3,
        explanation: 'The `yield` keyword produces a value from a generator and suspends execution.'
      },
      {
        type: 'question',
        question: 'What does a decorator do?',
        options: ['Removes a function from scope', 'Modifies the behavior of a function', 'Deletes a function', 'Renames a function'],
        correct: 1,
        explanation: 'A decorator takes a function, wraps it, and returns a new function with modified behavior.'
      }
    ],
    quiz: [
      {
        question: 'What does `functools.lru_cache` do?',
        options: ['Logs function calls', 'Caches return values of a function', 'Limits recursion depth', 'Speeds up I/O'],
        correct: 1,
        explanation: 'lru_cache is a decorator that caches the return values of a function based on its arguments.'
      },
      {
        question: 'Which method must a context manager class implement?',
        options: ['__enter__ and __exit__', '__open__ and __close__', '__start__ and __end__', '__context__ and __exit__'],
        correct: 0,
        explanation: '__enter__ sets up the context, __exit__ cleans up (regardless of exceptions).'
      },
      {
        question: 'What is the advantage of a generator over a list?',
        options: ['Faster access', 'Memory efficiency (lazy evaluation)', 'Supports indexing', 'Automatic sorting'],
        correct: 1,
        explanation: 'Generators produce items one at a time and only when needed, using less memory for large sequences.'
      }
    ]
  },

  {
    id: 11,
    title: 'Standard Library Highlights',
    description: 'Useful built-in modules: collections, itertools, datetime, os, sys, and more',
    steps: [
      {
        type: 'lesson',
        content: String.raw`
          <h3><code>collections</code> Module</h3>
          <div class="code-block"><span class="keyword">from</span> collections <span class="keyword">import</span> Counter, defaultdict, deque

<span class="comment"># Counter — count items</span>
freq = <span class="class">Counter</span>(<span class="string">"mississippi"</span>)
<span class="comment"># Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})</span>

<span class="comment"># defaultdict — default value for missing keys</span>
dd = <span class="class">defaultdict</span>(<span class="keyword">int</span>)
dd[<span class="string">"key"</span>] += <span class="number">1</span>  <span class="comment"># no KeyError</span>

<span class="comment"># deque — double-ended queue</span>
dq = <span class="class">deque</span>([<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>])
dq.appendleft(<span class="number">0</span>)   <span class="comment"># deque([0, 1, 2, 3])</span>
dq.pop()             <span class="comment"># 3</span></div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3><code>itertools</code> &amp; <code>datetime</code></h3>
          <div class="code-block"><span class="keyword">from</span> itertools <span class="keyword">import</span> chain, cycle, permutations
<span class="keyword">from</span> datetime <span class="keyword">import</span> datetime, timedelta

<span class="comment"># itertools.chain — combine iterables</span>
<span class="keyword">list</span>(<span class="function">chain</span>([<span class="number">1</span>, <span class="number">2</span>], [<span class="number">3</span>, <span class="number">4</span>]))  <span class="comment"># [1, 2, 3, 4]</span>

<span class="comment"># datetime</span>
now = datetime.now()
yesterday = now - <span class="class">timedelta</span>(days=<span class="number">1</span>)
<span class="keyword">print</span>(now.strftime(<span class="string">"%Y-%m-%d %H:%M"</span>))</div>
        `
      },
      {
        type: 'lesson',
        content: String.raw`
          <h3><code>os</code>, <code>sys</code>, &amp; <code>pathlib</code></h3>
          <div class="code-block"><span class="keyword">import</span> os, sys
<span class="keyword">from</span> pathlib <span class="keyword">import</span> Path

<span class="comment"># os module</span>
os.getcwd()          <span class="comment"># current working directory</span>
os.listdir(<span class="string">"."</span>)     <span class="comment"># list files</span>

<span class="comment"># sys module</span>
sys.argv             <span class="comment"># command-line arguments</span>
sys.version          <span class="comment"># Python version</span>

<span class="comment"># pathlib (modern, preferred)</span>
p = <span class="class">Path</span>(<span class="string">"/home/user/file.txt"</span>)
p.name               <span class="comment"># "file.txt"</span>
p.stem               <span class="comment"># "file"</span>
p.suffix             <span class="comment"># ".txt"</span>
p.parent             <span class="comment"># /home/user</span></div>
        `
      },
      {
        type: 'question',
        question: 'Which collections class provides an efficient double-ended queue?',
        options: ['Queue', 'deque', 'DoubleList', 'Array'],
        correct: 1,
        explanation: 'collections.deque provides O(1) append/pop from both ends.'
      },
      {
        type: 'question',
        question: 'How do you get the current working directory with `pathlib`?',
        options: ['Path.cwd()', 'Path.getcwd()', 'os.path.cwd()', 'Path.current()'],
        correct: 0,
        explanation: 'Path.cwd() is the pathlib way to get the current working directory.'
      }
    ],
    quiz: [
      {
        question: 'What does `Counter("aabbbc").most_common(1)` return?',
        options: ['[("b", 3)]', '[("a", 2)]', '[("b", 3), ("a", 2)]', '["b"]'],
        correct: 0,
        explanation: 'most_common(1) returns the single most common element as a list of (element, count) tuples.'
      },
      {
        question: 'Which module provides `permutations` and `combinations`?',
        options: ['math', 'statistics', 'itertools', 'functools'],
        correct: 2,
        explanation: 'The itertools module provides combinatorial iterators like permutations, combinations, and product.'
      },
      {
        question: 'What does `Path("/data/file.csv").suffix` return?',
        options: ['/data/file.csv', 'file.csv', 'file', '.csv'],
        correct: 3,
        explanation: 'The `.suffix` property returns the file extension including the dot, e.g., ".csv".'
      }
    ]
  }
];
