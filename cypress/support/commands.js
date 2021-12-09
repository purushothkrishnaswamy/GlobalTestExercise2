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

Cypress.Commands.add('login', (username, password) => {
  //        Valid user credentials. email and password picked from fixtures
  cy.visit("https://www.saucedemo.com/")
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()

})

Cypress.Commands.add('sort', (sortorder) => {
  cy.get('.select_container')
  cy.get('[data-test="product_sort_container"]').select(sortorder)
})

Cypress.Commands.add('addtocart', () => {
  cy.get('.inventory_list > :nth-child(2) > .inventory_item_description > .pricebar > .btn_primary').click("topRight", { multiple: false })
  cy.get('.inventory_list > :nth-last-child(1) > .inventory_item_description > .pricebar > .btn_primary').click()
})

Cypress.Commands.add('assertItemsAreAddedToCart', () => {
  cy.get('.inventory_list > :nth-child(2) > .inventory_item_description > .pricebar > .btn_secondary').should('contain', 'Remove')
  cy.get('.inventory_list > :nth-last-child(1) > .inventory_item_description > .pricebar > .btn_secondary').should('contain', 'Remove')
  //store the price values of 2nd high and low price items to file for asserting cart
  cy.get('.inventory_list > :nth-child(2) > .inventory_item_description > .pricebar > .inventory_item_price').then(($span) => {
    cy.log($span.text())
    cy.writeFile('cypress/fixtures/shoppingcartvalues.json', '{' + '\"SecondHighestpriceValue\":\"' + $span.text() + '\",', { flag: 'a+' })
  })
  cy.get('.inventory_list > :nth-last-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').then(($span) => {
    cy.log($span.text())
    cy.writeFile('cypress/fixtures/shoppingcartvalues.json', '\n' + '\"LowestpriceValue\":\"' + $span.text() + '\"}', { flag: 'a+' })

  })

})

Cypress.Commands.add('assertItemsInCart', () => {
  cy.get('.shopping_cart_link').click()
  //Assert items in cart for heading, item price and quantity
  cy.get('.header_secondary_container').should("contain", "Your Cart");
  cy.fixture('shoppingcartvalues.json').then(cartItems => {
    cy.get('.cart_list > :nth-last-child(2) >.cart_item_label >.item_pricebar >.inventory_item_price').should('have.text', cartItems.SecondHighestpriceValue)
    cy.get('.cart_list > :nth-last-child(1) >.cart_item_label >.item_pricebar >.inventory_item_price').should('have.text', cartItems.LowestpriceValue)
  })
  cy.get('.cart_list > :nth-last-child(2) >.cart_quantity').should('have.text', 1)
  cy.get('.cart_list > :nth-last-child(1) >.cart_quantity').should('have.text', 1)
})

Cypress.Commands.add('checkoutSuccessfully', () => {
  cy.get('[data-test="checkout"]').click()
  cy.get('.header_secondary_container').should('contain', 'Checkout: Your Information')
  //  Test with Valid check out information 
  cy.fixture('users').then(function (data_checkout) {
    this.data_checkout = data_checkout
    cy.get('[data-test="firstName"]').type(this.data_checkout.FirstName)
    cy.get('[data-test="lastName"]').type(this.data_checkout.LastName)
    cy.get('[data-test="postalCode"]').type(this.data_checkout.PostalCode)
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER')
  })
})

Cypress.Commands.add('checkoutUnSuccessfully', () => {
  cy.get('[data-test="checkout"]').click()
  cy.get('.header_secondary_container').should('contain', 'Checkout: Your Information')
  //  Test with Valid check out information 
  cy.fixture('users').then(function (data_checkout) {
    this.data_checkout = data_checkout
    cy.get('[data-test="firstName"]').type(this.data_checkout.FirstName)
    cy.get('[data-test="lastName"]').type(this.data_checkout.LastName)
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should('contain', 'Postal Code is required')
  })
})

