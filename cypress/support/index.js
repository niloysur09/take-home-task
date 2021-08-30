// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import addContext from "mochawesome/addContext"

Cypress.Cookies.defaults({
    preserve: ['session_id', 'remember_token'],
  })

  Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
      addContext({test}, { title: "Screenshot", value:`${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png` })
    }
  })

  module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, args) => {
      console.log(config, browser, args);
      if (browser.name === 'chrome') {
        args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
        args.push("--load-extension=cypress/extensions/Ignore-X-Frame-headers_v1.1");
      }
      return args;
    })
  }

// Alternatively you can use CommonJS syntax:
// require('./commands')
