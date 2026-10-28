const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync('js/chapters.js', 'utf8') + fs.readFileSync('js/course-content.js', 'utf8') + ';globalThis.chapters = CHAPTERS', context);
const nonPython = new Set(['A reproducible local environment', 'A project that imports predictably', 'Declare metadata and an entry point', 'Install, verify, and build locally', 'Define the contract before implementation', 'A delivery checklist grounded in behavior']);
for (const chapter of context.chapters) {
  for (const step of chapter.steps) {
    const code = step.content?.match(/<pre class="code-block"><code>([\s\S]*?)<\/code><\/pre>/)?.[1];
    if (!code || nonPython.has(step.title)) continue;
    let python = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    if (python.includes('unittest.TestCase')) python += '\n\nif __name__ == \"__main__\":\n    unittest.main()\n';
    test(`Python example: ${chapter.id} ${step.title}`, () => {
      const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'python-course-'));
      try {
        const file = path.join(directory, 'example.py');
        fs.writeFileSync(file, python);
        // pytest is optional course tooling, not a requirement for repository checks.
        const args = step.title === 'Fixtures, parameterization, and integration tests'
          ? ['-m', 'py_compile', file] : step.title === 'Arguments are a public interface' ? [file, 'Ada', '--count', '2'] : [file];
        const result = spawnSync(process.env.PYTHON || 'python3', args, { cwd: directory, encoding: 'utf8', timeout: 15000 });
        assert.equal(result.status, 0, result.stderr || result.error?.message || result.stdout);
      } finally {
        fs.rmSync(directory, { recursive: true, force: true });
      }
    });
  }
}
