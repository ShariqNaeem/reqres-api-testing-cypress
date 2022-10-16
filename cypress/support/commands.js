Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'https://alpha.sev.14bis.aero/api/login',
        body: {
            username: 'pradeepm',
            password: '4c3c610b-57cc-4445-9acf-e2643e36f19a'
        }
    }).then((loginRes) => {
        expect(loginRes.status).to.eq(200);
        Cypress.env('Token',loginRes.body.payload.token)
    })
})