import { Builder, WebDriver, By, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

export class TestSetup {
  static driver: WebDriver;
  static readonly BASE_URL = 'http://localhost:5173';
  static readonly TIMEOUT = 10000;

  static async setupDriver(): Promise<WebDriver> {
    try {
      const chromeOptions = new chrome.Options();
      chromeOptions.addArguments('--headless'); // Run in headless mode
      chromeOptions.addArguments('--no-sandbox');
      chromeOptions.addArguments('--disable-dev-shm-usage');
      chromeOptions.addArguments('--disable-gpu');
      chromeOptions.addArguments('--window-size=1920,1080');
      chromeOptions.addArguments('--disable-web-security');
      chromeOptions.addArguments('--allow-running-insecure-content');
      chromeOptions.addArguments('--ignore-certificate-errors');

      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();

      await this.driver.manage().setTimeouts({ implicit: this.TIMEOUT });
      return this.driver;
    } catch (error) {
      console.error('Failed to setup WebDriver:', error);
      throw error;
    }
  }

  static async teardownDriver(): Promise<void> {
    if (this.driver) {
      await this.driver.quit();
    }
  }

  static async navigateToPage(path: string = ''): Promise<void> {
    await this.driver.get(`${this.BASE_URL}${path}`);
  }

  static async waitForElement(selector: string, timeout: number = this.TIMEOUT) {
    return await this.driver.wait(
      until.elementLocated(By.css(selector)),
      timeout
    );
  }

  static async waitForElementVisible(selector: string, timeout: number = this.TIMEOUT) {
    const element = await this.waitForElement(selector, timeout);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  static async clickElement(selector: string): Promise<void> {
    const element = await this.waitForElementVisible(selector);
    await element.click();
  }

  static async sendKeysToElement(selector: string, text: string): Promise<void> {
    const element = await this.waitForElementVisible(selector);
    await element.clear();
    await element.sendKeys(text);
  }

  static async getElementText(selector: string): Promise<string> {
    const element = await this.waitForElement(selector);
    return await element.getText();
  }

  static async isElementPresent(selector: string): Promise<boolean> {
    try {
      await this.driver.findElement(By.css(selector));
      return true;
    } catch (error) {
      return false;
    }
  }

  static async waitForUrl(expectedUrl: string, timeout: number = this.TIMEOUT): Promise<boolean> {
    return await this.driver.wait(async () => {
      const currentUrl = await this.driver.getCurrentUrl();
      return currentUrl.includes(expectedUrl);
    }, timeout);
  }

  static async sleep(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  static async fillField(selectors: string[], value: string): Promise<boolean> {
    for (const selector of selectors) {
      if (await this.isElementPresent(selector)) {
        await this.sendKeysToElement(selector, value);
        return true;
      }
    }
    return false;
  }
}