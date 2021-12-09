describe('UnSuccessfull Checkout TestSuite', () => {
  beforeEach(() => {
    cy.fixture('users').then(function (data) {
      this.data = data
      cy.login(this.data.username1, this.data.password1)
    })
  })
  after(() => {
    cy.writeFile('cypress/fixtures/shoppingcartvalues.json', '')
  })

  // This block tests if the inventory page enables sorting from high to low, add items to cart, assert added items in cart and checkout unsuccessfully
  it('can add second highest priced and lowest priced products to cart and checkout unsuccessfully due to missing Postcode information', () => {
    //Sort the inventory page high to low price
    cy.sort('Price \(high to low\)')
    //Add 2nd high and low price item to cart
    cy.addtocart()
    // This block asserts the addition of 2nd High and last low price item
    cy.assertItemsAreAddedToCart()

    //Assert the items in CArt matches the selection
    cy.assertItemsInCart()
    //checkout the cart without postal code
    cy.checkoutUnSuccessfully()

  })


})