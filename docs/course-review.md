# Course review and expansion

The original course provides a small, approachable static browser app, immediate
question feedback, and local progress tracking. Those strengths are retained.

## Gaps addressed

| Finding | Change |
|---------|--------|
| Chapters mostly show short syntax examples | Added explanations, edge cases, learning goals, and estimated study time |
| No hands-on exercises | Every chapter now has a practice lab and a collapsible worked solution |
| No testing, typing, async, HTTP, database, or delivery track | Added 12 chapters progressing from type contracts to an integrated capstone |
| No runnable integrated project | Added a standard-library expense report CLI with sample input and behavioral tests |
| Regex and newline escapes consumed by JS template literals | Used raw templates for original lessons and escaped code blocks for additions |
| Exception vs BaseException conflated | Corrected the assessment and explained interruption/exit propagation |
| Regular packages presented as the only packages | Added namespace-package distinctions |
| __init__ presented as object creation | Distinguished allocation by __new__ from initialization |
| Sequential file reads implied each started at the beginning | Added cursor movement and rewind explanations |
| Append-mode quiz had a second plausible answer (exclusive creation) | Replaced the ambiguous distractor |
| write-method quiz also included writelines as a plausible answer | Replaced the ambiguous distractor |
| Reset left session question answers locked | Reset now clears in-memory answers as well as stored progress |
| All chapters displayed without discovery controls | Added search, track filtering, and a lesson outline |
| Clickable cards were mouse-oriented divs | Replaced them with keyboard-accessible buttons and visible focus states |
| Storage failures could interrupt learning | Added a session fallback and a visible storage notice |
| Existing passes did not account for expanded assessments | Added revision-aware quiz invalidation while retaining original step progress |

## Verification scope

Automated checks validate curriculum structure and execute the new standalone
Python examples and solutions. Capstone tests exercise exact arithmetic, malformed
records, quoting, Unicode, missing files, encoding errors, and stdout/stderr
contracts. The browser smoke suite is designed to cover the complete course flow and small
screens, and runs in a separate CI job. Local browser launch can be blocked in
restricted environments; do not interpret passing content checks as a browser pass.

This remains a self-paced refresher, not a browser Python runtime or an automatic
code grader. Practice is local and self-assessed. Network clients, optional pytest
execution, static type checking, and package build commands are taught explicitly
but do not run as part of the offline course checks. Process-pool examples should
be saved as scripts; notebook execution has different import constraints.
