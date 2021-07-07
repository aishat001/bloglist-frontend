/* eslint-disable linebreak-style */
describe('Blog', function() {
  beforeEach(function () {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  describe('Login', function () {

    it('login form is shown', function() {
      cy.contains('log in').click()
      cy.get('#username').type('Aeeshah')
      cy.get('#password').type('mypassword')
      cy.get('#loginbtn').click()

      cy.contains('waheed Aishat loggen in')
    })

    describe('when logged in', function () {
      beforeEach(function () {
        cy.contains('log in').click()
        cy.get('#username').type('Aeeshah')
        cy.get('#password').type('mypassword')
        cy.get('#loginbtn').click()
      })

      it('A blog can be created', function() {
        cy.contains('create blog').click()
        cy.get('#title').type('modest fashion')
        cy.get('#author').type('waheed aishat')
        cy.get('#url').type('none')
        cy.contains('save').click()
        cy.contains('modest fashion')
      })
      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('.likebtn').click()
        cy.get('#author').type('waheed aishat')
        cy.get('#url').type('none')
        cy.contains('save').click()
        cy.contains('modest fashion')
      })

    })
  })
})