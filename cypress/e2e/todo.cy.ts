import { random } from "cypress/types/lodash"
import { faker } from "@faker-js/faker"
import { User, userData } from "../models/User"
import UserApi, { userApi } from "../api/UserApi"

describe('todo item test suites', () => {

    it('user should be abl to add todo item', () => {
        var todo_name = faker.string.alpha(30)
        const user = new User()
        userApi.userRegistration(user).then((resRegistration)=>{
            expect(resRegistration.status).to.equal(201)
        })
        cy.visit('/todo')
        cy.get('[data-testid="add"]').click()
        cy.get('[data-testid="new-todo"]').type(todo_name)
        cy.get('[data-testid="submit-newTask"]').click()
        cy.get('[data-testid="todo-text"').should('contain', todo_name)
    })

    it('should be able to delete the added todos', () => {
        var todo_name = faker.string.alpha(30)
        let token = String
        const user = new User()
        // Registration through API
        userApi.userRegistration(user).then((resResgistration) => {
            expect(resResgistration.status).to.equal(201)
            token = resResgistration.body.access_token
            cy.request({
                url: 'https://todo.qacart.com/api/v1/tasks',
                method: 'POST',
                body: {
                    "item": todo_name,
                    "isCompleted": false
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((resCreateTodo) => {
                expect(resCreateTodo.status).to.eq(201)

            })

        })

        // Creating a to do item
        cy.visit('/todo')
        cy.get('[data-testid="add"]').click()
        cy.get('[data-testid="new-todo"]').type(todo_name)
        cy.get('[data-testid="submit-newTask"]').click()
        cy.get('[data-testid="todo-text"').should('contain', todo_name)
        cy.get('[data-testid="delete"]').eq(0).click()
        cy.get('[data-testid="delete"]').eq(1).click()
        cy.contains('No Available Todos').should('not.exist')
    })
})