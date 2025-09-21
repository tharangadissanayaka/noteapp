# Selenium UI Tests for Note App

This directory contains Selenium WebDriver UI tests for the Note App frontend.

## Test Coverage

### 1. Login UI Tests (`login.test.ts`)
- **Form Elements Validation**: Checks all login form elements are present
- **Form Validation**: Tests empty form submission and input validation
- **Navigation**: Tests signup link navigation
- **Loading States**: Validates form behavior during loading
- **Success Flow**: Tests login success and redirect

### 2. Add Note UI Tests (`addNote.test.ts`)
- **Dashboard Navigation**: Tests add note button presence and functionality
- **Modal Elements**: Validates all form fields in the add note modal
- **Form Validation**: Tests required field validation and save button states
- **Tag Functionality**: Tests adding/removing tags
- **Complete Flow**: Tests full note creation process

## Prerequisites

Before running the tests, ensure:

1. **Frontend is running**: Start the frontend development server
   ```bash
   npm run dev
   ```

2. **Backend is running**: Start the backend server (for authentication/API calls)
   ```bash
   cd ../backend
   npm run dev
   ```

3. **Chrome browser**: Tests use Chrome WebDriver (headless mode)

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests with Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Only UI Tests
```bash
npm run test:ui
```

### Run Specific Test File
```bash
# Login tests only
npx jest login.test.ts

# Add Note tests only
npx jest addNote.test.ts
```

## Test Configuration

- **Jest Config**: `jest.config.js`
- **TypeScript Config**: `tests/tsconfig.json`
- **Test Setup**: `tests/setup.ts`
- **Test Utilities**: `tests/utils/TestSetup.ts`

## Test Environment

- **Browser**: Chrome (headless)
- **Test Framework**: Jest
- **WebDriver**: Selenium WebDriver
- **Language**: TypeScript
- **Timeout**: 30 seconds default, 45 seconds for complex flows

## Test Data Requirements

For comprehensive testing, you may need:

1. **Test User Account**: Create a test user for login success scenarios
2. **Clean Database**: Some tests assume a clean state
3. **Valid Credentials**: Update test credentials in `login.test.ts` if needed

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure frontend runs on `http://localhost:5173`
2. **ChromeDriver**: Ensure Chrome browser is installed
3. **Timeouts**: Increase timeouts if tests fail due to slow loading
4. **Element Selectors**: Tests use multiple fallback selectors for robustness

### Debug Mode

To run tests in non-headless mode for debugging:

1. Edit `tests/utils/TestSetup.ts`
2. Comment out the `--headless` option in `chromeOptions`
3. Run tests to see browser interactions

### Test Output

Tests provide detailed output including:
- Element interaction logs
- Screenshot capabilities (can be added)
- Detailed error messages for failures

## Adding New Tests

1. Create new `.test.ts` file in `tests/` directory
2. Import `TestSetup` utility class
3. Follow existing test patterns
4. Use descriptive test names and organize with `describe` blocks

## CI/CD Integration

These tests can be integrated into CI/CD pipelines:
- Ensure Chrome/ChromeDriver is available
- Set up test data/database
- Run tests after deployment
- Capture test results and screenshots on failure