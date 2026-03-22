---
name: pr
description: Create a pull request. Auto-creates branch, commits changes with logical split, pushes, and opens PR against main.
---

# Create Pull Request

Create a new branch, commit changes, and submit a PR.

## Steps
1. Check current git status
2. Create branch named `feature/[description-from-changes]`
3. Stage all changes
4. Analyze changes and split into logical commits if multiple concerns
5. Write descriptive commit message(s)
6. Push branch to origin
7. Create PR with:
   - Title: concise description of what changed
   - Body: what + why + how to test
   - Link any related issues

## Commit Message Format
```
type(scope): description

- bullet of key change
- bullet of key change
```
Types: feat, fix, refactor, docs, chore, style

## Rules
- Never commit to main directly
- Split unrelated changes into separate commits
- PR description must include "How to test"
NEXT ACTION → [exact git command to run first]
