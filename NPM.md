# 📦 How to Publish to npm

## 🧪 Prepare

```bash
npm login               # Only once per machine
npm install             # Ensure deps are up to date
npm test                # Optional: run tests if any
npm run build           # Optional: generate dist if needed
```

## 📝 Commit any pending changes

```bash
git status              # Check for uncommitted changes
git add -A
git commit -m "chore: prepare release"
```

## 🆙 Bump Version

```bash
npm version patch       # or: minor / major
```

This will:

- Update `package.json` and `package-lock.json`
- Create a Git commit and tag

## 🚀 Publish

```bash
npm publish             # Add --access public for scoped packages
```

## 🔄 Push changes

```bash
git push --follow-tags
```

---

## 🧹 Gotcha: Git Working Directory Not Clean?

Error:

```
Git working directory not clean.
```

Fix:

```bash
git add -A
git commit -m "chore: commit before version bump"
```

Or bypass Git checks (not recommended for real releases):

```bash
npm version patch --no-git-tag-version
```

---

## 🔙 Unpublish (within 24h)

```bash
npm unpublish your-package@x.x.x
```

## ⚠️ Deprecate a version

```bash
npm deprecate your-package@"<version>" "This version is broken."
```

---

## 🗃 Example

```bash
npm version minor -m "chore(release): %s"
npm publish
git push --follow-tags
```
