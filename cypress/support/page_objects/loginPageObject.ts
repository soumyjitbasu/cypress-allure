export class LoginPage{

    //defining the objects in the SESocial Loginpage
    loginPageElements = {
        btnLoginWithSE: ()=> cy.get('[data-testid="login-button"]'),
        lnkSubscribe: ()=> cy.get('[href="#subscribe"]'),      
        btnLogin: ()=> cy.contains('button','Login'),
        btnRequestACall: ()=> cy.contains('button', 'Request a Call')
    }

    // clicking login with SE button
    loginWithSE(email, password){
        this.loginPageElements.btnLoginWithSE().click()
        cy.origin('https://staging1-accounts.stockedge.com/', {args: {email, password}},({email,password})=>{
            cy.get('#Username').type(email)
            cy.get('#Password').type(password)
            cy.get('[name="button"]').click()
        })
    }
}