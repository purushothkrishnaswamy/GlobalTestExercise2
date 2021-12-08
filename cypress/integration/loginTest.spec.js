describe('LoginTestSuite', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('can login with valid user', () => {
        // Check Valid User Input
        cy.login()
        cy.get('.header_secondary_container').should('contain', 'Products')
    })

    it('cannot login with locked user', () => {

        // Check Locked User as Input
        // Use data stored in Fixture/example.json
        cy.fixture('users').then(function (data_login) {
            this.data_login = data_login
            //     Invalid user credentials
            cy.get('[data-test="username"]').type(this.data_login.email2)
            cy.get('[data-test="password"]').type(this.data_login.password2)
            cy.get('[data-test="login-button"]').click()
            cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.')
        })
    })

})