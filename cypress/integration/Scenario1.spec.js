describe('Successfull Checkout TestSuite', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.login()
  })
  it('can sort products by Price(High to Low)', () => {
    // Valid Login Credentials
    cy.get('.inventory_list > :nth-child(2) > .inventory_item_description > .pricebar > .btn_primary').click("topRight", { multiple: false })
    cy.get('.inventory_list > :nth-last-child(1) > .inventory_item_description > .pricebar > .btn_primary').click()
  })

  // This block tests if the inventory page enables sorting from high to low
  // Before that Tests the login page using custom commands
  it('can add second highest priced and lowest priced products to cart', () => {
    cy.log('This is for sorting the inventory page high to low price')
    cy.get('.select_container')
    cy.get('[data-test="product_sort_container"]').select('Price (high to low)')
    // This block tests the addition of 2nd High and last low price item
    cy.get('.inventory_list > :nth-child(2) > .inventory_item_description > .pricebar > .btn_primary').click("topRight", { multiple: false })
    cy.get('.inventory_list > :nth-last-child(1) > .inventory_item_description > .pricebar > .btn_primary').click()
    cy.get('.inventory_list > :nth-child(2) > .inventory_item_description > .pricebar > .btn_secondary').should('contain', 'Remove')
    cy.get('.inventory_list > :nth-last-child(1) > .inventory_item_description > .pricebar > .btn_secondary').should('contain', 'Remove')
    cy.get('.shopping_cart_link').click()
    cy.get('.header_secondary_container').should("contain", "Your Cart");
    cy.get('.cart_list > :nth-last-child(2) >.cart_item_label >.item_pricebar >.inventory_item_price').should('have.text', '$29.99')
    cy.get('.cart_list > :nth-last-child(1) >.cart_quantity').should('have.text', 1)
    cy.get('.cart_list > :nth-last-child(1) >.cart_item_label >.item_pricebar >.inventory_item_price').should('have.text', '$7.99')
  })

  it('can checkout with all mandatory data', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('.header_secondary_container').should("contain", "Your Cart");
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


})