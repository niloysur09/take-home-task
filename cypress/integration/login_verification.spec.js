import { CommonPage, LoginPage } from '../support/pages';

context('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Page', () => {
    it('has Username input field', () => {
      LoginPage.UserName()
        .should('have.value', '')
        .and('have.attr', 'placeholder', 'Username')
        .and('be.visible') 
    })
    it('has Password input field', () => {
      LoginPage.Password()
        .should('have.value', '')
        .and('have.attr', 'placeholder', 'Password')
        .and('be.visible')
    })
    it('has LOGIN button', () => {
      LoginPage.LoginButton()
        .should('have.value', 'Login')
        .and('be.visible')
    })
  })
  describe('User', () => {
    it('can login with standard user', () => {
      cy.login('standard_user', 'secret_sauce')

      CommonPage.MainBurgerButton()
        .invoke('text')
        .should('match', /Menu/i)
    })
    it('can not login with blank username', () => {
      cy.login('', 'secret_sauce')

      LoginPage.ErrorMessage()
        .should('have.text', 'Epic sadface: Username is required')
    })
    it('can not login with blank password', () => {
      cy.login('standard_user', '')

      LoginPage.ErrorMessage()
        .should('have.text', 'Epic sadface: Password is required')
    })
    it('can not login with wrong username', () => {
      cy.login('normal_user', 'secret_sauce')

      LoginPage.ErrorMessage()
        .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })
    it('can not login with wrong password', () => {
      cy.login('standard_user', 'secret_labs')

      LoginPage.ErrorMessage()
        .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })
    it('can not login due to locked user', () => {
      cy.login('locked_out_user', 'secret_sauce')
  
      LoginPage.ErrorMessage()
        .should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    })
    it('can login with problem user', () => {
      cy.login('problem_user', 'secret_sauce')
  
      CommonPage.MainBurgerButton()
        .invoke('text')
        .should('match', /Menu/i)
    })
    it('can login with performance glitch user', () => {
      cy.login('performance_glitch_user', 'secret_sauce')
  
      CommonPage.MainBurgerButton()
        .invoke('text')
        .should('match', /Menu/i)
    })
  })
})
