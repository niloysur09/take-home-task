This Project automates SauceDemo.com website using Cypress.io and Page Object Model. Also generates Mochawesome Reports.

Pre-Requisites

Install latest Chrome browser
Install Node.js (6 or higher)
Setup

Install the project dependencies by running command: npm install
Run Test

Open the Cypress console by running command: npm run cy:open
Run the test on Chrome browser in headed mode using command: npm run test:headed
Run the test on Chrome browser in headedless mode using command: npm run test:headless
Mochawesome Report

Generates mochawesome HTML reports at project directory: /mochawesome-report/mochawesome.html
Other Features

On every code push/change to master branch it runs the entire build on CircleCI and Cypress Dashboard as post deployment check.
We can also run this project on Docker using command: sh docker-cy-run.sh
