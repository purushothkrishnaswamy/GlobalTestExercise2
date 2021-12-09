# SauceDemo UI Automation testing using Cypress

This project is a demo project which demonstrates SauceDemo UI automation with Javascript([Cypress])(https://www.cypress.io/) 

Requirement for Test Exercise 2 -- UI automation
---
## Implement a test to verify the following user journey

1) Login to https://www.saucedemo.com/ using the "standard_user" account
2) Sort the products by Price (high to low)
3) Add the cheapest & the 2nd costliest products to your basket
4) Open the basket
5) Checkout
6) Enter details and Finish the purchase

## Instructions and deliverables

* Design and implement an extensible test framework to run and verify the above user journey. This should incorporate the best practices of the tooling you chose, and will be reviewed against extensibility and clean code.
* Writing the tests Use Java([Selenium](https://www.selenium.dev/)) or Javascript([Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/))
* We don't expect every single aspect of the journey to be thoroughly tested, but would expect to see some set of scenarios tested
* A README.md file explaining the framework briefly and how to run the tests, what you need installed
* Pushed to GitHub for review

Precondition
---
Node 
Cypress

Steps
---
```bash
## clone this repo to a local directory
git clone https://github.com/purushothkrishnaswamy/GlobalTestExercise2.git

## cd into the cloned repo
cd GlobalTestExercise2

## install the node_modules
npm install

We are now ready to run Cypress tests.

Run Cypress Test locally
---
```bash
## launch the test runner in background
npm run test
## launch test runner in cypress browser
npm run cypress
```
