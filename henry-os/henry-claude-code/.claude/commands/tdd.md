---
name: tdd
description: Test-Driven Development workflow. Write tests first, confirm they fail, then implement code to pass them.
---

# HENRY TDD Workflow

Test-Driven Development: tests before code.

## Workflow
1. **Understand** the requirement — what inputs, what outputs
2. **Write tests** — unit tests covering happy path + edge cases
3. **Run tests** — confirm they FAIL (if they pass, tests are wrong)
4. **Commit tests** — `git commit -m "test: [what is being tested]"`
5. **Implement** — write minimum code to pass tests
6. **Run tests** — confirm they PASS
7. **Refactor** — clean up, keep tests green
8. **Commit code** — `git commit -m "feat: [what was implemented]"`

## Test Structure (for HENRY Node.js code)
```javascript
describe('ComponentName', () => {
  it('should [expected behavior] when [condition]', () => {
    // Arrange
    // Act  
    // Assert
  });
});
```

NEXT ACTION → [first test to write]
