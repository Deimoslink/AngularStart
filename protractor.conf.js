// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  // capabilities: {
  //   'browserName': 'chrome'
  // },
  multiCapabilities: [{
    'browserName': 'chrome'
  },{
    'browserName': 'firefox'
  },{
    'browserName': 'internet explorer'
  }],
  directConnect: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  async onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    let config = await browser.getProcessedConfig();
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'e2e/reports',
        fileName: 'e2e-report-' + config.capabilities.browserName,
        screenshotsFolder: 'screenshots'
      })
    );
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
