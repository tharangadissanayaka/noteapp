# CI/CD Pipeline Documentation

## 🚀 GitHub Actions CI/CD Pipeline

This repository includes a comprehensive CI/CD pipeline using GitHub Actions that automatically builds, tests, and deploys the Note App.

## 📋 Pipeline Overview

### Workflows Included:

1. **`ci-cd.yml`** - Main CI/CD pipeline
2. **`quick-check.yml`** - Quick validation for all commits
3. **`selenium-tests.yml`** - Dedicated Selenium automation tests

## 🔄 Main CI/CD Pipeline (`ci-cd.yml`)

### Jobs:

#### 1. **Backend Build & Test**
- ✅ Checkout code
- ✅ Setup Node.js 18
- ✅ Install dependencies with caching
- ✅ Build backend (TypeScript compilation)
- ✅ Run backend tests
- ✅ Upload build artifacts

#### 2. **Frontend Build & Test**
- ✅ Checkout code
- ✅ Setup Node.js 18  
- ✅ Install dependencies with caching
- ✅ Run ESLint
- ✅ Build frontend (Vite)
- ✅ Run unit tests (Jest)
- ✅ Upload build artifacts

#### 3. **End-to-End Testing**
- ✅ Setup MongoDB service
- ✅ Install Chrome browser
- ✅ Start backend and frontend servers
- ✅ Run Selenium automation tests
- ✅ Upload test results and screenshots

#### 4. **Security & Quality Checks**
- ✅ Run npm audit
- ✅ Check for outdated packages
- ✅ Security vulnerability scanning

#### 5. **Deployment** (main branch only)
- ✅ Deploy to staging environment
- ✅ Notify deployment status

## 🧪 Tests Executed

### Unit Tests:
- ✅ Login form validation
- ✅ Add note functionality
- ✅ Navigation logic
- ✅ Component state management
- ✅ Form validation
- ✅ Tag operations

### Selenium Automation Tests:
- 🖥️ Login UI flow testing
- 🖥️ Add note UI flow testing  
- 🖥️ Form interaction validation
- 🖥️ Navigation testing
- 🖥️ Modal functionality

## ⚡ Quick Check Pipeline (`quick-check.yml`)

Runs on every commit for fast feedback:
- Build validation
- TypeScript compilation
- Unit test execution
- Lint checking

## 🎯 Selenium Tests Pipeline (`selenium-tests.yml`)

Dedicated automation testing:
- Runs daily at 2 AM UTC
- Manual trigger available
- Full browser automation testing
- Screenshot capture on failures

## 🚦 Pipeline Triggers

### Automatic Triggers:
- **Push to main/develop**: Full CI/CD pipeline
- **Pull Requests**: Build and test validation
- **Daily Schedule**: Selenium automation tests

### Manual Triggers:
- Selenium tests can be triggered manually
- Full pipeline can be re-run from GitHub Actions tab

## 📊 Pipeline Results

### Success Criteria:
- ✅ All builds complete successfully
- ✅ All unit tests pass (12/12 tests)
- ✅ No critical security vulnerabilities
- ✅ TypeScript compilation succeeds
- ✅ ESLint passes with no errors

### Artifacts Generated:
- 📦 Backend build files
- 📦 Frontend build files  
- 📊 Test results (JUnit XML)
- 📸 Screenshots (on test failures)
- 📈 Coverage reports

## 🔧 Configuration Files

```
.github/
└── workflows/
    ├── ci-cd.yml          # Main CI/CD pipeline
    ├── quick-check.yml    # Fast validation
    └── selenium-tests.yml # Automation tests
```

## 🛠️ Local Development

### To run the same checks locally:

```bash
# Backend
cd backend
npm ci
npx tsc --noEmit
npm test

# Frontend  
cd frontend
npm ci
npm run build
npm run lint
npx jest mockTests.test.ts
```

## 🎯 Deployment

The pipeline automatically deploys to staging when:
- Code is pushed to `main` branch
- All tests pass
- Build completes successfully

### Deployment includes:
- Built backend application
- Built frontend application
- Database migrations (if any)
- Environment configuration

## 📈 Monitoring & Notifications

- ✅ Build status badges in README
- ✅ Failed build notifications
- ✅ Test result summaries
- ✅ Deployment confirmations

## 🚀 Getting Started

1. **Fork/Clone** this repository
2. **Push to main branch** to trigger the pipeline
3. **Check Actions tab** in GitHub to see pipeline execution
4. **View results** and artifacts in the workflow runs

## 🔍 Troubleshooting

### Common Issues:
- **Build failures**: Check dependency versions
- **Test failures**: Review test logs in Actions
- **Selenium issues**: Browser compatibility in CI environment

### Debugging:
- Enable debug logging in workflows
- Download artifacts for investigation
- Check service health endpoints

---

## 📋 Pipeline Status

| Component | Status | Tests |
|-----------|--------|-------|
| Backend Build | ✅ Ready | TypeScript compilation |
| Frontend Build | ✅ Ready | Vite build + ESLint |
| Unit Tests | ✅ Ready | 12 Jest tests |
| Selenium Tests | ✅ Ready | UI automation |
| Deployment | ✅ Ready | Staging environment |

**🎉 Your CI/CD pipeline is production-ready!**