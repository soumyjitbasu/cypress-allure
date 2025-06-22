import {faker} from "@faker-js/faker"
import { userData } from "../models/User"

describe('user test suite', ()=>{

    it('should be able to register', ()=>{

        cy.visit('/signup')
        cy.get('[data-testid="first-name"]').type(userData.getFirstName())
        cy.get('[data-testid="last-name"]').type(userData.getLastName())
        cy.get('[data-testid="email"]').type(userData.getEmail())
        cy.get('[data-testid="password"]').type(userData.getPassword())
        cy.get('[data-testid="confirm-password"]').type(userData.getPassword())
        cy.get('[data-testid="submit"]').click()
        cy.get('[data-testid="welcome"]').should('be.visible')
    })
})