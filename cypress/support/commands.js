// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {...})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Custom commands
// Login with valid credentials
Cypress.Commands.add('login', (email, password) => {
  cy.fixture('users').then(function (data) {
    this.data = data
    //        Valid user credentials. email and password picked from fixtures
    cy.visit("https://www.saucedemo.com/")
    cy.get('[data-test="username"]').type(this.data.email1)
    cy.get('[data-test="password"]').type(this.data.password1)
    cy.get('[data-test="login-button"]').click()
  })
})



