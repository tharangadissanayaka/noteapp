# Contributing to Note App

## 🔄 CI/CD Process

### Before You Commit:
1. Run tests locally: `npm test`
2. Build the project: `npm run build`
3. Check linting: `npm run lint`

### Pipeline Stages:
1. **Quick Check** - Runs on every commit
2. **Full CI/CD** - Runs on main/develop branches
3. **Selenium Tests** - Runs daily or manually

### Test Requirements:
- All unit tests must pass
- No ESLint errors
- TypeScript compilation successful
- Selenium tests should not break existing flows

## 🚀 Deployment Process:
- **Staging**: Automatic on main branch
- **Production**: Manual approval required
- **Rollback**: Available through GitHub Actions

---

*See `.github/README.md` for complete CI/CD documentation*