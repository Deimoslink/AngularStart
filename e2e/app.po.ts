import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(url?) {
    return browser.get('/' + url);
  }

  getParagraphText() {
    return element(by.css('app-root > p')).getText();
  }

  getParagraphTextFromModal() {
    return element(by.css('div.modal-body p')).getText();
  }

  getNavigationButton(component) {
    return element(by.css(`a[routerLink=${component}]`));
  }

  getButtonByLabel(label) {
    return element(by.cssContainingText('button', label));
  }
}
