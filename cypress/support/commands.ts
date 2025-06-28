/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import { LoginPage } from "../support/page_objects/loginPageObject"
declare global{
    namespace Cypress{
        interface Chainable{
            loginApplication: Chainable<any>
        }
    }
}
Cypress.Commands.add('loginApplication',()=>{
          cy.fixture('../fixtures/userLogin.json').as('userLoginData',)
    cy.get('@userLoginData').then((userLoginData: any) => {
                const login = new LoginPage()
                cy.visit('https://staging.social.stockedge.com')
                login.loginWithSE(userLoginData.username, userLoginData.password)
    
            })
})