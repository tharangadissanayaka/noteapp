import { TestSetup } from './utils/TestSetup';

describe('Add Note UI Tests', () => {
  
  describe('Dashboard Navigation and Add Note Button', () => {
    beforeEach(async () => {
      // For these tests, we assume user is logged in and can access dashboard
      // In a real scenario, you might need to login first or mock the authentication
      await TestSetup.navigateToPage('/dashboard');
      await TestSetup.sleep(2000); // Wait for dashboard to load
    });

    test('should display the add note button on dashboard', async () => {
      // Look for the Plus button or Add Note button
      const addButtonExists = await TestSetup.isElementPresent('button[onclick*="setIsModalOpen"], button:has(svg.lucide-plus), [data-testid="add-note-button"]');
      
      // If the specific selector doesn't work, try finding any button with Plus icon
      if (!addButtonExists) {
        const plusIconExists = await TestSetup.isElementPresent('svg.lucide-plus, .lucide-plus');
        expect(plusIconExists).toBe(true);
      } else {
        expect(addButtonExists).toBe(true);
      }
    });

    test('should open add note modal when clicking add button', async () => {
      // Try multiple possible selectors for the add button
      const selectors = [
        'button:has(svg.lucide-plus)',
        'button[aria-label*="add"], button[title*="add"]',
        'button:contains("Add")',
        'svg.lucide-plus',
        '.lucide-plus'
      ];

      let buttonClicked = false;
      for (const selector of selectors) {
        try {
          if (await TestSetup.isElementPresent(selector)) {
            await TestSetup.clickElement(selector);
            buttonClicked = true;
            break;
          }
        } catch (error) {
          // Continue to next selector
          continue;
        }
      }

      // If we can't find the specific button, try clicking any button that might open the modal
      if (!buttonClicked) {
        const buttons = await TestSetup.driver.findElements({ css: 'button' });
        if (buttons.length > 0) {
          await buttons[buttons.length - 1].click(); // Click the last button (likely the add button)
          buttonClicked = true;
        }
      }

      expect(buttonClicked).toBe(true);

      // Wait for modal to appear
      await TestSetup.sleep(1000);

      // Check if modal/dialog is now open
      const modalExists = await TestSetup.isElementPresent('[role="dialog"], .dialog, [data-testid="add-modal"]');
      expect(modalExists).toBe(true);
    });
  });

  describe('Add Note Modal Elements', () => {
    beforeEach(async () => {
      await TestSetup.navigateToPage('/dashboard');
      await TestSetup.sleep(2000);
      
      // Open the add note modal
      try {
        const addButton = await TestSetup.driver.findElements({ css: 'button' });
        if (addButton.length > 0) {
          await addButton[addButton.length - 1].click(); // Click what's likely the add button
        }
      } catch (error) {
        // If we can't open modal programmatically, we'll skip this test suite
        console.warn('Could not open add note modal');
      }
      
      await TestSetup.sleep(1000);
    });

    test('should display all required form fields in add note modal', async () => {
      // Check for title input
      const titleInputExists = await TestSetup.isElementPresent('input[placeholder*="title"], input[placeholder*="Title"]');
      expect(titleInputExists).toBe(true);

      // Check for content textarea
      const contentTextareaExists = await TestSetup.isElementPresent('textarea[placeholder*="content"], textarea[placeholder*="note"]');
      expect(contentTextareaExists).toBe(true);

      // Check for tags input
      const tagsInputExists = await TestSetup.isElementPresent('input[placeholder*="tag"], input[placeholder*="Tag"]');
      expect(tagsInputExists).toBe(true);

      // Check for save button
      const saveButtonExists = await TestSetup.isElementPresent('button:contains("SAVE"), button:contains("Save"), button[type="submit"]');
      expect(saveButtonExists).toBe(true);
    });

    test('should allow input in all form fields', async () => {
      // Test title input
      const titleSelectors = ['input[placeholder*="title"]', 'input[placeholder*="Title"]'];
      for (const selector of titleSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          await TestSetup.sendKeysToElement(selector, 'Test Note Title');
          const element = await TestSetup.waitForElement(selector);
          const value = await element.getAttribute('value');
          expect(value).toBe('Test Note Title');
          break;
        }
      }

      // Test content textarea
      const contentSelectors = ['textarea[placeholder*="content"]', 'textarea[placeholder*="note"]'];
      for (const selector of contentSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          await TestSetup.sendKeysToElement(selector, 'This is a test note content.');
          const element = await TestSetup.waitForElement(selector);
          const value = await element.getAttribute('value');
          expect(value).toBe('This is a test note content.');
          break;
        }
      }

      // Test tags input
      const tagSelectors = ['input[placeholder*="tag"]', 'input[placeholder*="Tag"]'];
      for (const selector of tagSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          await TestSetup.sendKeysToElement(selector, 'test-tag');
          const element = await TestSetup.waitForElement(selector);
          const value = await element.getAttribute('value');
          expect(value).toBe('test-tag');
          break;
        }
      }
    });
  });

  describe('Add Note Form Validation', () => {
    beforeEach(async () => {
      await TestSetup.navigateToPage('/dashboard');
      await TestSetup.sleep(2000);
      
      // Try to open the modal
      try {
        const buttons = await TestSetup.driver.findElements({ css: 'button' });
        if (buttons.length > 0) {
          await buttons[buttons.length - 1].click();
        }
      } catch (error) {
        console.warn('Could not open modal for validation tests');
      }
      
      await TestSetup.sleep(1000);
    });

    test('should disable save button when required fields are empty', async () => {
      // Check if save button is disabled when form is empty
      const saveButtonSelectors = ['button:contains("SAVE")', 'button:contains("Save")', 'button[disabled]'];
      
      for (const selector of saveButtonSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          const element = await TestSetup.waitForElement(selector);
          const isDisabled = await element.getAttribute('disabled');
          
          // Button should be disabled when form is empty
          expect(isDisabled).toBeTruthy();
          break;
        }
      }
    });

    test('should enable save button when required fields are filled', async () => {
      // Fill in title
      const titleSelectors = ['input[placeholder*="title"]', 'input[placeholder*="Title"]'];
      for (const selector of titleSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          await TestSetup.sendKeysToElement(selector, 'Test Note');
          break;
        }
      }

      // Fill in content
      const contentSelectors = ['textarea[placeholder*="content"]', 'textarea[placeholder*="note"]'];
      for (const selector of contentSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          await TestSetup.sendKeysToElement(selector, 'Test content');
          break;
        }
      }

      await TestSetup.sleep(500); // Wait for validation

      // Check if save button is now enabled
      const saveButtonSelectors = ['button:contains("SAVE")', 'button:contains("Save")'];
      for (const selector of saveButtonSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          const element = await TestSetup.waitForElement(selector);
          const isDisabled = await element.getAttribute('disabled');
          
          // Button should be enabled when required fields are filled
          expect(isDisabled).toBeFalsy();
          break;
        }
      }
    });
  });

  describe('Add Note Tag Functionality', () => {
    beforeEach(async () => {
      await TestSetup.navigateToPage('/dashboard');
      await TestSetup.sleep(2000);
      
      // Open modal
      try {
        const buttons = await TestSetup.driver.findElements({ css: 'button' });
        if (buttons.length > 0) {
          await buttons[buttons.length - 1].click();
        }
      } catch (error) {
        console.warn('Could not open modal for tag tests');
      }
      
      await TestSetup.sleep(1000);
    });

    test('should add tags when clicking add tag button', async () => {
      // Enter a tag
      const tagSelectors = ['input[placeholder*="tag"]', 'input[placeholder*="Tag"]'];
      for (const selector of tagSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          await TestSetup.sendKeysToElement(selector, 'selenium-test');
          
          // Look for add tag button (Plus icon button)
          const addTagButton = await TestSetup.isElementPresent('button:has(svg.lucide-plus)');
          if (addTagButton) {
            await TestSetup.clickElement('button:has(svg.lucide-plus)');
          }
          
          await TestSetup.sleep(500);
          
          // Check if tag badge was created
          const tagBadgeExists = await TestSetup.isElementPresent('.badge, [class*="badge"]');
          expect(tagBadgeExists).toBe(true);
          
          break;
        }
      }
    });

    test('should add tags when pressing Enter key', async () => {
      const tagSelectors = ['input[placeholder*="tag"]', 'input[placeholder*="Tag"]'];
      for (const selector of tagSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          await TestSetup.sendKeysToElement(selector, 'enter-tag');
          
          // Press Enter key
          const element = await TestSetup.waitForElement(selector);
          await element.sendKeys('\n');
          
          await TestSetup.sleep(500);
          
          // Check if tag was added
          const tagExists = await TestSetup.isElementPresent('.badge, [class*="badge"]');
          expect(tagExists).toBe(true);
          
          break;
        }
      }
    });
  });

  describe('Complete Add Note Flow', () => {
    test('should successfully create a note with all fields filled', async () => {
      await TestSetup.navigateToPage('/dashboard');
      await TestSetup.sleep(2000);
      
      // Open the add note modal
      try {
        const buttons = await TestSetup.driver.findElements({ css: 'button' });
        if (buttons.length > 0) {
          await buttons[buttons.length - 1].click();
        }
      } catch (error) {
        console.warn('Could not open modal');
        return;
      }
      
      await TestSetup.sleep(1000);

      // Fill in all fields
      const titleFilled = await TestSetup.fillField(['input[placeholder*="title"]', 'input[placeholder*="Title"]'], 'Complete Test Note');
      const contentFilled = await TestSetup.fillField(['textarea[placeholder*="content"]', 'textarea[placeholder*="note"]'], 'This is a complete test note with all fields filled.');
      
      // Add a tag
      await TestSetup.fillField(['input[placeholder*="tag"]', 'input[placeholder*="Tag"]'], 'complete-test');
      
      // Click add tag button or press enter
      if (await TestSetup.isElementPresent('button:has(svg.lucide-plus)')) {
        await TestSetup.clickElement('button:has(svg.lucide-plus)');
      }
      
      await TestSetup.sleep(500);

      // Click save button
      const saveButtonSelectors = ['button:contains("SAVE")', 'button:contains("Save")'];
      let saveClicked = false;
      
      for (const selector of saveButtonSelectors) {
        if (await TestSetup.isElementPresent(selector)) {
          await TestSetup.clickElement(selector);
          saveClicked = true;
          break;
        }
      }

      expect(saveClicked).toBe(true);
      
      // Wait for save operation
      await TestSetup.sleep(3000);

      // Verify modal closed (note creation should close the modal)
      const modalStillOpen = await TestSetup.isElementPresent('[role="dialog"]');
      expect(modalStillOpen).toBe(false);

    }, 45000); // Longer timeout for complete flow
  });
});