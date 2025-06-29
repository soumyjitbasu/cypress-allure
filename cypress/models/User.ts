import {faker} from "@faker-js/faker"

export class User{
    private firsName:string
    private lastName:string
    private email:string
    private password:string
    private userName:string

    constructor(){
        this.firsName = faker.person.firstName()
        this.lastName = faker.person.lastName()
        this.email = faker.internet.email()
        this.password = faker.internet.password()
        this.userName = faker.internet.username()
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

    getUserName(){
        return this.userName
    }
}

export const userData = new User()