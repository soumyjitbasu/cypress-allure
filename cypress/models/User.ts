import {faker} from "@faker-js/faker"

export class User{
    private firsName:string
    private lastName:string
    private email:string
    private password:string

    constructor(){
        this.firsName = faker.person.firstName()
        this.lastName = faker.person.lastName()
        this.email = faker.internet.email()
        this.password = faker.internet.password()
    }

    getFirstName(){
        return this.firsName
    }

    getLastName(){
        return this.lastName
    }

    getEmail(){
        return this.email
    }

    getPassword(){
        return this.password
    }
}

export const userData = new User()