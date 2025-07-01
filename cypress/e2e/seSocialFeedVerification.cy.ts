import { HomePage } from "../support/page_objects/homePageObjects"
import { LoginPage } from "../support/page_objects/loginPageObject"
import { faker } from "@faker-js/faker/."
import 'cypress-xpath'
import { User } from "../models/User"
import { any } from "cypress/types/bluebird"


describe('This is a test for opening SE Social and verifying the Home Feed post', () => {


    beforeEach('open SESocial staging environment', () => {
        Cypress.session.clearAllSavedSessions()
        cy.fixture('../fixtures/userLogin.json').as('userLoginData',)
        cy.fixture('../fixtures/postCreation.json').as('postData')

    })

    afterEach('Clearing the session',()=>{
        Cypress.session.clearAllSavedSessions()
        Cypress.session.clearCurrentSessionData()
        Cypress.LocalStorage.clear()
    })

    it('Login to SESocial and creating a post SESocial', () => {
        console.log('Soumyajit Basu')
        cy.loginApplication()
        const homePage = new HomePage()

        // reading the fixture
        cy.get('@postData').then((postData: any) => {
            homePage.createQueryWithImageAttachment(postData.pdfdiscussiontext)

        })
    })

    it('Conduit site user creation conduit',() => {

        const user_data = new User()
        cy.request({
            url: 'https://conduit-api.bondaracademy.com/api/users',
            method: 'POST',
            body: {
                "user": {
                    "email": user_data.getEmail(),
                    "password": user_data.getPassword(),
                    "username": user_data.getUserName()
                }
            },
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }).then((res) => {
            expect(res.status).to.equal(201)
            console.log(res.body.user.email)
            console.log(res.body.user.username)
            Cypress.env('token', res.body.user.token)
            console.log(Cypress.env('token'))


        })
    })

    it('SMOKE - API intercept', () => {
        const user_data = new User()
        cy.visit('https://conduit.bondaracademy.com/')
        cy.intercept('POST', '').as('resgisterUser')
        cy.contains('a', ' Sign up ').click()
        cy.get('[placeholder="Username"]').type(user_data.getUserName())
        cy.get('[placeholder="Email"]').type(user_data.getEmail())
        cy.get('[placeholder="Password"]').type(user_data.getPassword())
        cy.contains('button', ' Sign up ').click()

        cy.wait('@resgisterUser').then(registrationCall => {
            console.log(registrationCall.response.body.user.token)
            console.log(registrationCall.response.body.user.email)
            console.log(registrationCall.response.body.user.username)
            Cypress.env('email_address', registrationCall.response.body.user.email)
            Cypress.env('token', registrationCall.response.body.token)
        })
    })

    it('Mocking Tags conduit', () => {
        cy.visit('https://conduit.bondaracademy.com/login')
        cy.get('[placeholder="Email"]').type('soumybasu10@gmail.com')
        cy.get('[placeholder="Password"]').type('Soumyajit@2022')
        cy.get('[type="submit"]').click()
        cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', { fixture: 'tags.json' }).as('mockingTags')
        cy.get('.tag-list').should('contain', 'Cypress').and('contain', 'Automation').and('contain', 'Testing')

    })

    it('Mocking tag list using login api call conduit', () => {
        cy.request({
            url: 'https://conduit-api.bondaracademy.com/api/users/login',
            method: 'POST',
            body: {
                "user": {
                    "email": "soumybasu10@gmail.com",
                    "password": "Soumyajit@2022"
                }
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            }
        }).then(resLogin =>{
            expect(resLogin.status).to.equal(200)
        })
        cy.visit('https://conduit.bondaracademy.com/login')
        cy.get('[placeholder="Email"]').type('soumybasu10@gmail.com')
        cy.get('[placeholder="Password"]').type('Soumyajit@2022')
        cy.get('[type="submit"]').click()
        cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', { fixture: 'tags.json' }).as('mockTags')
        cy.get('.tag-list').should('contain', 'Cypress')
            .and('contain', 'Automation')
            .and('contain', 'Testing')
    })

    it('login using xpath in Cypress conduit',()=>{
        cy.visit('https://conduit.bondaracademy.com/login')
        cy.xpath('//input[@formcontrolname="email"]').type('soumybasu10@gmail.com')
        cy.xpath('//input[@placeholder="Password"]').type('Soumyajit@2022')
        cy.xpath('//button[contains(text(),"Sign")]').click()
        if (cy.xpath('//a[contains(text(),"soumybasu")]').should('be.visible')){
            cy.xpath('//a[contains(text(),"soumybasu")]').should('contain',' soumybasu ')
        }
        console.log(cy.xpath('//a[contains(text(),"soumybasu")]').invoke('attr','href'))
        cy.xpath('//a[contains(text(),"soumybasu")]').invoke('attr','href').should('equal','/profile/soumybasu')
    })

})  
