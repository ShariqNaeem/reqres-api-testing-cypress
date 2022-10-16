/// <reference types="cypress" />

describe('Register API Test cases', () => {

  let validRegister;
  let invalidRegister;
  // HERE I'M LOADING THE FIXTURES ONCE< FOR USING THE REQUEST BODY AND VALIDATING THE RESPONSE
  before(() => {
    cy.fixture('register-invalid-payload.json').then((data) => {
      invalidRegister = data;
    });

    cy.fixture('register-valid-payload.json').then((data) => {
      validRegister = data;
    });
  });


  it('Validate the register API response with valid credentials', () => {

    cy.request({

      method: 'POST',
      url: 'api/register',
      body: validRegister.request

    }).then((registerResponse) => {

      expect(registerResponse.status).to.eq(200);
      expect(registerResponse.body).to.have.property('token');
      expect(registerResponse.body.token).to.eq(validRegister.response.token);

    })
  })

  it('Validate the register API response with invalid credentials', () => {

    cy.request({

      method: 'POST',
      url: 'api/register',
      failOnStatusCode: false,
      body: invalidRegister.request

    }).then((registerResponse) => {

      expect(registerResponse.status).to.eq(400);
      expect(registerResponse.body).to.have.property('error');
      expect(registerResponse.body.error).to.eq(invalidRegister.response.error);
    })

  })

})

