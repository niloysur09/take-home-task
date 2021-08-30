# take-home-task Automation

This Project automates https://www.saucedemo.com/ website using Cypress.io and generates Mochawesome Reports.

## Test case details

login_verification.spec.js - It verifies all types of user logins provided for saucedemo.com application. It also validated different types of Errors within the login page.

product_purchase.spec.js - It logs in using the "standard_user" and performs different actions like Add/Remove from cart, validate within cart details page and then finally checkout with added products

## Setup

Install Cypress: npm install cypress --save-dev

## Runing Test

Open the Cypress UI console by running command: npm run cypress:open

Select test and run on Electron/Chrome browser from UI console (any browser of choice)

OR

Run test directly from terminal using the below commands:

Headless - Ex: ./node_modules/.bin/cypress run --spec  "cypress/integration/login_verification.spec.js"

Headed - Ex:  ./node_modules/.bin/cypress run --spec  "cypress/integration/product_purchase.spec.js" --browser chrome --headed

## Reporting

Generates mochawesome HTML and JSON reports (with date and time stamp) under: report/mochawesome
