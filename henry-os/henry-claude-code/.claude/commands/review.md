---
name: review
description: Run a full code review on the current file or specified files. Checks security, performance, error handling, logic, and HENRY conventions.
---

# HENRY Code Review

Run a thorough code review. If no file specified, review the most recently modified file.

## Review Criteria
1. **Security** — no hardcoded keys, no .env exposure, no injection risks
2. **Performance** — no unnecessary loops, no blocking calls, token budget awareness
3. **Error handling** — every async has try/catch, every API call checks status code
4. **Logic** — edge cases covered, no race conditions in parallel agent calls
5. **HENRY conventions** — confidence scores present, NEXT ACTION at end

## Output Format
**CRITICAL** (fix before commit):
- Issue + exact fix

**IMPROVEMENTS** (nice to have):
- Issue + suggestion  

**WINS**:
- What's done well

**OVERALL: X/20**
NEXT ACTION → [first fix to make]
