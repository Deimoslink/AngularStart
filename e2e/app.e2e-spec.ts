import {AppPage} from './app.po';
import {browser} from 'protractor';

describe('angular-start App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should open page', () => {
    page.navigateTo();
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain('login');
  });


});
