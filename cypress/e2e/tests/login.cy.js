/// <reference types="cypress" />

describe('Login API Test cases', () => {

  let validLogin;
  let invalidLogin;

  // HERE I'M LOADING THE FIXTURES ONCE< FOR USING THE REQUEST BODY AND VALIDATING THE RESPONSE
  before(() => {
    cy.fixture('login-invalid-payload.json').then((data) => {
      invalidLogin = data;
    });

    cy.fixture('login-valid-payload.json').then((data) => {
      validLogin = data;
    });
  });


  it('Validate the login API response with valid credentials', () => {

    cy.request({

      method: 'POST',
      url: 'api/login',
      body: validLogin.request

    }).then((loginResponse) => {

      expect(loginResponse.status).to.eq(200);
      expect(loginResponse.body).to.have.property('token');
      expect(loginResponse.body.token).to.eq(validLogin.response.token);

    })
  })

  it('Validate the login API response with invalid credentials', () => {

    cy.request({

      method: 'POST',
      url: 'api/login',
      failOnStatusCode: false,
      body: invalidLogin.request

    }).then((loginResponse) => {

      expect(loginResponse.status).to.eq(400);
      expect(loginResponse.body).to.have.property('error');
      expect(loginResponse.body.error).to.eq(invalidLogin.response.error);
    })

  })

})

