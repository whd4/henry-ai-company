---
name: todo
description: Manage HENRY sprint tasks in todos.md. Supports add, complete, remove, list, next, past-due.
---

# HENRY Todo Manager

Manage sprint tasks in `todos.md` at the root of your current project.

## Usage
- `/todo add "Task description"`
- `/todo add "Task" tomorrow`
- `/todo complete 1`
- `/todo remove 2`
- `/todo list`
- `/todo next`
- `/todo past-due`
- `/todo undo 1`

## Instructions
1. Find or create `todos.md` in project root
2. Parse the command and take the action
3. Keep Active sorted by due date (soonest first, no-date items last)
4. Show confirmation after every action
5. Format:

```markdown
# HENRY Sprint Tasks

## Active
- [ ] Task description | Due: MM-DD-YYYY
- [ ] Another task

## Completed
- [x] Done task | Done: MM-DD-YYYY
```

## Rules
- Number todos when displaying
- Completed todos move to Completed section
- If todos.md missing, create it
- Always end with: NEXT ACTION → [next uncompleted task]
