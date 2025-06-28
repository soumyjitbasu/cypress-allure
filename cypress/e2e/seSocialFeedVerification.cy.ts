import { any } from "cypress/types/bluebird"
import { HomePage } from "../support/page_objects/homePageObjects"
import { LoginPage } from "../support/page_objects/loginPageObject"

describe('This is a test for opening SE Social and verifying the Home Feed post', () => {

    beforeEach('open SESocial staging environment', () => {
        Cypress.session.clearAllSavedSessions()
        cy.fixture('../fixtures/userLogin.json').as('userLoginData',)
        cy.fixture('../fixtures/postCreation.json').as('postData')

    })

    it('Login to SESocial and creating a post', () => {
        console.log('Soumyajit Basu')
        cy.loginApplication()
        const homePage = new HomePage()
        cy.get('@postData').then((postData:any) => {
            homePage.createQueryWithImageAttachment(postData.pdfdiscussiontext)
            
        })


    })
})  
