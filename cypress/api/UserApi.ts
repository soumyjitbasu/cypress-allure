import { User, userData } from "../models/User"

export default class UserApi{

    userRegistration(userData: User){
        
        return cy.request({
            url: 'https://todo.qacart.com/api/v1/users/register',
            method: 'POST',
            body: {
                'firstName': userData.getFirstName(),
                'lastName': userData.getLastName(),
                'email': userData.getEmail(),
                'password': userData.getPassword()
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
    }
}

export const userApi = new UserApi()