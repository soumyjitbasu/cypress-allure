describe('API Testing Scenarios', () => {

    it('Conduit Authorization', () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/auth',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "username": "admin",
                "password": "password123"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            Cypress.env('token', response.body.token)
            console.log(Cypress.env('token'))
        })
    })

    it('Conduit Get Booking', () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/booking',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            console.log(response.body)
        })
    })

    it('Conduit Create Booking', () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/booking',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: {
                "firstname": "Soumyajit",
                "lastname": "Basu",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2025-10-01",
                    "checkout": "2025-10-02"
                },
                "additionalneeds": "Breakfast"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body)
        })
    })
})