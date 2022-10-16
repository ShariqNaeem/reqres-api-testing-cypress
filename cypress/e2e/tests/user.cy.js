/// <reference types="cypress" />

describe('User API Test cases', () => {

    let singleUserDetails;
    let userListDetails;
    let newUserDetails;

    // HERE I'M LOADING THE FIXTURES ONCE< FOR USING THE REQUEST BODY AND VALIDATING THE RESPONSE
    before(() => {
        cy.fixture('single-user.json').then((data) => {
            singleUserDetails = data;
        });

        cy.fixture('user-list.json').then((data) => {
            userListDetails = data;
        });

        cy.fixture('new-user.json').then((data) => {
            newUserDetails = data;
        });
    });


    it('Validate the GET method for fetching the SINGLE USER details', () => {

        cy.request({

            method: 'GET',
            url: 'api/users/2',

        }).then((response) => {

            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data.id).to.eq(singleUserDetails.data.id);
            expect(response.body.data).to.have.property('email');
            expect(response.body.data.email).to.eq(singleUserDetails.data.email);
            expect(response.body.data).to.have.property('first_name');
            expect(response.body.data.first_name).to.eq(singleUserDetails.data.first_name);
            expect(response.body.data).to.have.property('last_name');
            expect(response.body.data.last_name).to.eq(singleUserDetails.data.last_name);
            expect(response.body.data).to.have.property('avatar');
            expect(response.body.data.avatar).to.eq(singleUserDetails.data.avatar);

            expect(response.body).to.have.property('support');
            expect(response.body.support).to.have.property('url');
            expect(response.body.support.url).to.eq(singleUserDetails.support.url);
            expect(response.body.support).to.have.property('text');
            expect(response.body.support.text).to.eq(singleUserDetails.support.text);

        })
    })


    it('Validate the GET method for fetching the USER LIST details', () => {

        cy.request({

            method: 'GET',
            url: 'api/users?page=2',

        }).then((response) => {

            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('page');
            expect(response.body.page).to.eq(userListDetails.page);

            expect(response.body).to.have.property('per_page');
            expect(response.body.per_page).to.eq(userListDetails.per_page);

            expect(response.body).to.have.property('total');
            expect(response.body.total).to.eq(userListDetails.total);

            expect(response.body).to.have.property('total_pages');
            expect(response.body.total_pages).to.eq(userListDetails.total_pages);

            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.a('array');

            expect(response.body).to.have.property('support');
            expect(response.body.support).to.have.property('url');
            expect(response.body.support.url).to.eq(userListDetails.support.url);
            expect(response.body.support).to.have.property('text');
            expect(response.body.support.text).to.eq(userListDetails.support.text);

        })
    })


    it('Validate the GET method for fetching the INVALID USER details', () => {

        cy.request({

            method: 'GET',
            url: 'api/users/23',
            failOnStatusCode: false,

        }).then((response) => {

            expect(response.status).to.eq(404);

        })
    })

    it('Validate the POST method for creating a NEW USER', () => {

        cy.request({

            method: 'POST',
            url: 'api/users',
            body: newUserDetails.request,


        }).then((response) => {

            expect(response.status).to.eq(201);

            expect(response.body).to.have.property('name');
            expect(response.body.name).to.eq(newUserDetails.response.name);

            expect(response.body).to.have.property('job');
            expect(response.body.job).to.eq(newUserDetails.response.job);

            expect(response.body).to.have.property('id');
            //expect(response.body.id).to.eq(newUserDetails.response.id);

            expect(response.body).to.have.property('createdAt');
        })
    })

    it('Validate the PUT method for updating an USER details', () => {

        cy.request({

            method: 'PUT',
            url: 'api/users/2',
            body: newUserDetails.request,


        }).then((response) => {

            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('name');
            expect(response.body.name).to.eq(newUserDetails.response.name);

            expect(response.body).to.have.property('job');
            expect(response.body.job).to.eq(newUserDetails.response.job);

            expect(response.body).to.have.property('updatedAt');
        })
    })

    it('Validate the PATCH method for updating an USER details', () => {

        cy.request({

            method: 'PATCH',
            url: 'api/users/2',
            body: newUserDetails.request,


        }).then((response) => {

            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('name');
            expect(response.body.name).to.eq(newUserDetails.response.name);

            expect(response.body).to.have.property('job');
            expect(response.body.job).to.eq(newUserDetails.response.job);

            expect(response.body).to.have.property('updatedAt');
        })
    })


    it('Validate the DELETE method for deleting an specific USER', () => {

        cy.request({

            method: 'DELETE',
            url: 'api/users/2',


        }).then((response) => {

            expect(response.status).to.eq(204);

        })
    })

})

