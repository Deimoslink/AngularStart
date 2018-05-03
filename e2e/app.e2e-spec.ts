import {AppPage} from './app.po';
import {browser} from "protractor";

describe('angular-start App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should login and navigate', () => {
    page.navigateTo();
    page.getNavigationButton('componentB').click();
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain('componentB');
    page.getButtonByLabel('Login').click();
    expect(page.getParagraphText()).toEqual('Authentication status true');
    browser.waitForAngular();
    page.getNavigationButton('componentA').click();
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain('componentA');
  });

  it('should logout and protect navigation', () => {
    page.navigateTo('componentB');
    page.getButtonByLabel('Logout').click();
    expect(page.getParagraphText()).toEqual('Authentication status false');
    page.getNavigationButton('componentA').click();
    page.navigateTo('componentA');
    expect(browser.getCurrentUrl()).not.toContain('componentA');
  });

  it('should open and close modal windows', () => {
    page.navigateTo('componentB');
    page.getButtonByLabel('Open A Modal').click();
    expect(page.getParagraphTextFromModal()).toEqual('Hello, a!');
    page.getButtonByLabel('Close').click();
    page.getButtonByLabel('Open B Modal').click();
    expect(page.getParagraphTextFromModal()).toEqual('Hello, b!');
    page.getButtonByLabel('Close').click();
  });

});
