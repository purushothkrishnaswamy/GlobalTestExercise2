describe('LoginTestSuite', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('can login with valid user', () => {
        // Check Valid User Input
        // cy.login()
        cy.fixture('users').then(function (data) {
            this.data = data
            cy.login(this.data.username1, this.data.password1)
        })
        cy.get('.header_secondary_container').should('contain', 'Products')
    })

    it('cannot login with locked user', () => {

        // Check Locked User as Input
        // Use data stored in Fixture/example.json
        cy.fixture('users').then(function (data) {
            this.data = data
            cy.login(this.data.username2, this.data.password2)
        })
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.')

    })

})