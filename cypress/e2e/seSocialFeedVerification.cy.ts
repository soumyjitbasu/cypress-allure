import { LoginPage } from "../support/page_objects/loginPageObject"

describe('This is a test for opening SE Social and verifying the Home Feed post', () => {

    beforeEach('open SESocial staging environment', () => {
Cypress.session.clearAllSavedSessions()
        cy.visit('https://staging.social.stockedge.com',{timeout:10000})

        cy.fixture('../fixtures/userLogin.json').as('userLoginData',)

    })

    it('Login to SESocial', () => {

        cy.get('@userLoginData').then((userLoginData: any) => {
            const login = new LoginPage()
            login.loginWithSE(userLoginData.username, userLoginData.password)

        })

    })
})  
