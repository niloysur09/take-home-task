// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "cypress-localstorage-commands"
import { LoginPage, CommonPage } from '../support/pages';
Cypress.Commands.add('login', (username, password) => {
    if (username != ''){
    LoginPage.UserName()
        .type(username)
        .should('have.value', username)
    }
    if (password != ''){
    LoginPage.Password()
        .type(password)
        .should('have.value', password)
    }
    LoginPage.LoginButton().click()
})

Cypress.Commands.add('checkout', (firstName, lastname, pCode) => {
    let CartButton = () => {
    cy.get('.cart_button')
    .click();
    }

    cy.get('.checkout_button')
    .click();

    cy.get('#first-name')
    .type(firstName)
    .should('have.value', firstName)

    cy.get('#last-name')
    .type(lastname)
    .should('have.value', lastname)

    cy.get('#postal-code')
    .type(pCode)
    .should('have.value', pCode)

    CartButton()

    cy.get('.summary_subtotal_label')
    .should('have.text', 'Item total: $23.98')

    cy.get('.summary_tax_label')
    .should('have.text', 'Tax: $1.92')

    cy.get('.summary_total_label')
    .should('have.text', 'Total: $25.90')

    CartButton()

    cy.get('.title')
    .should('have.text', 'Checkout: Complete!')

    cy.get('.complete-header')
    .should('have.text', 'THANK YOU FOR YOUR ORDER')
})
