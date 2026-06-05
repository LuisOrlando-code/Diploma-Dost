# Contributing to Diploma Dost

First of all — thanks for being here. This project exists to help thousands of diploma students who don't have proper guidance. Every contribution, big or small, matters.

This guide tells you everything you need to know to get started.

---

## Before you start

1. Read the [README](README.md) to understand what the project is and what we're building.
2. Check the [Issues](../../issues) tab — pick something that's open and unassigned.
3. Comment on the issue saying you want to work on it. Wait for the maintainer (Piush) to assign it to you.
4. Then fork, branch, code, and raise a PR.

> Don't start coding without picking an issue first. Two people working on the same thing is wasted effort.

---

## Types of contributions

You don't have to write code to contribute. Here's what we need:

| Type | Examples |
|---|---|
| 🖥️ Frontend (React) | Build a page, fix a bug, improve mobile layout |
| ⚙️ Backend (Supabase) | Create tables, set up RLS policies, write queries |
| 📝 Content | Write guide text, collect PYQ links, curate YouTube playlists |
| 🐛 Bug reports | Found something broken? Open an issue |
| 🎨 Design | Suggest better UI, fix spacing/typography issues |
| 🐍 Python | Data cleaning scripts for college predictor CSVs |
| 📖 Docs | Improve README, add code comments, fix typos |

---

## Branch naming

Always create a new branch for your work. Never work directly on `main`.

Format: `type/your-name-short-description`

```
feature/ravi-git-guide-page
feature/shraddha-csv-cleaner
fix/yogesh-navbar-mobile
content/anushka-career-roadmap-text
docs/piush-update-readme
```

### Branch types
- `feature/` — new page or feature
- `fix/` — bug fix
- `content/` — adding or editing content (no code changes)
- `docs/` — documentation only
- `style/` — UI/CSS changes only, no logic changes

---

## Step-by-step workflow

```bash
# 1. Fork the repo (click Fork on GitHub)

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/diploma-dost.git
cd diploma-dost

# 3. Add upstream remote (to stay updated with main repo)
git remote add upstream https://github.com/piush365/diploma-dost.git

# 4. Create your branch from main
git checkout -b feature/your-name-task-name

# 5. Make your changes

# 6. Stage and commit
git add .
git commit -m "feat: add git guide page"

# 7. Push to your fork
git push origin feature/your-name-task-name

# 8. Open a Pull Request on GitHub
# Base: piush365/diploma-dost → main
# Compare: your fork → your branch
```

---

## Commit message format

Keep it short and clear. Use one of these prefixes:

| Prefix | When to use |
|---|---|
| `feat:` | Adding something new |
| `fix:` | Fixing a bug |
| `content:` | Adding or editing content |
| `style:` | CSS or UI changes |
| `docs:` | README or documentation |
| `refactor:` | Code cleanup, no behaviour change |

Examples:
```
feat: add internship guide page
fix: mobile navbar menu not closing
content: add sem 3 youtube playlists
style: fix card spacing on small screens
docs: add setup steps to README
```

---

## Pull Request format

When you open a PR, use this format in the description:

```
## What does this PR do?
[Short description — one or two lines]

## Related issue
Closes #[issue number]

## Changes made
- [List of what you changed]

## Screenshots (if UI change)
[Paste a screenshot if you changed anything visual]

## Tested on mobile?
Yes / No
```

---

## Code style

- Use functional React components only (no class components)
- Use Tailwind for all styling — no inline styles unless absolutely necessary
- One component per file
- Keep components in `src/components/`, pages in `src/pages/`
- No console.log left in production code — remove before raising PR
- If you're adding a new page, add its route in `src/App.jsx`

---

## Content contributions (no code)

If you're contributing content — YouTube links, PYQ links, guide text, roadmap content — use this format:

**For resource links:** Add them to the relevant JSON file in `src/data/`. Example for YouTube playlists:

```json
{
  "semester": 3,
  "subject": "Data Structures using C",
  "channel": "Jenny's Lectures",
  "url": "https://youtube.com/playlist/...",
  "language": "English"
}
```

**For guide content:** Write it in a `.md` file and place it in `src/data/content/`. The page component will render it.

If you're not sure where something goes, just ask in the group or drop a comment on the issue.

---

## Need help?

- Stuck on something? Drop a message in the WhatsApp group.
- Found a bug but don't know how to fix it? Open an issue anyway — someone else might.
- Not sure if your idea is in scope? Open a Discussion on GitHub or ask Piush.

---

## Code of conduct

This is a friendly project. Everyone here is learning.

- Be helpful, not harsh in PR reviews
- If someone's code is wrong, explain why and suggest the fix
- No gatekeeping — if someone asks a "basic" question, answer it properly
- Credit people for their contributions

---

> This project started as one person's ITR project. It can become something thousands of diploma students rely on — but only if we build it together. Welcome to the team.
