import { CommonPage, LoginPage } from '../support/pages';

context('Product Purchase', () => {
  before(() => {
    cy.clearLocalStorageSnapshot()
  })

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/')
    cy.login('standard_user', 'secret_sauce')

    CommonPage.MainBurgerButton()
        .invoke('text')
        .should('match', /Menu/i)
  })

  afterEach(() => {
    cy.saveLocalStorage();
  })

  describe('Inventory Page', () => {
    it('has visible inventory items', () => {
        CommonPage.InventoryItems()
          .its('length')
          .should('be.gt', 1)

    })
    it('has visible price, header and description', () => {
      CommonPage.InventoryItems()
        .first().as('inventoryItem')

      cy.get('@inventoryItem')
        .find('.inventory_item_name')
        .invoke('text')
        .its('length')
        .should('be.gt', 1)

        cy.get('@inventoryItem')
        .find('.inventory_item_desc')
        .invoke('text')
        .its('length')
        .should('be.gt', 1)

      cy.get('@inventoryItem')
        .find('.inventory_item_price')
        .should('have.text', '$29.99')
        
    })
    it('has visible page header', () => {
      cy.get('.title')
        .should('have.text', 'Products')

    })
  })
  describe('Display in Order', () => {
    it('change order according to name', () => {
      let productNames = [];
      CommonPage.InventoryItems()
        .find('.inventory_item_name')
        .each(($el, index, $list) => {
          cy.wrap($el).invoke('text').as('item')
          cy.get('@item')
            .then((item) => {
              productNames.push(item)
            })
        })
        
      cy.get('.product_sort_container')
          .should('have.value', 'az')
          .select('Name (Z to A)')
      cy.get('.product_sort_container').should('have.value', 'za')

      CommonPage.InventoryItems()
        .find('.inventory_item_name')
        .each(($el, index, $list) => {
          cy.wrap($el).should('have.text', productNames[productNames.length - index - 1])
        })

    })
  })
  describe('Cart', () => {
    it('add/remove product', () => {
      CommonPage.InventoryItems()
        .first()
        .find('.btn_primary')
        .click()
      CommonPage.InventoryItems()
        .first()
        .find('.btn_secondary')
        .should('have.text', 'Remove')

      CommonPage.ShoppingCartBadge()
        .should('have.text', '1')

      CommonPage.InventoryItems()
        .first()
        .find('.btn_secondary')
        .click()
      CommonPage.InventoryItems()
        .first()
        .find('.btn_primary')
        .should('have.text', 'Add to cart')

      CommonPage.ShoppingCartBadge()
        .should('not.exist')

    })
    it('add final products to cart', () => {
      let inCart = 0;
      CommonPage.InventoryItems()
        .each(($el, index, $list) => {
          if (index % 2 == 0) {
            cy.wrap($el).find('.btn_primary')
              .click()
          cy.wrap($el).find('.btn_secondary')
              .should('have.class', 'btn btn_secondary btn_small btn_inventory')
            
            inCart++;
          }
        })
        .then(() => {
          CommonPage.ShoppingCartBadge()
            .should('have.text', '' + inCart)
        })

      })

    })
    describe('Cart Page', () => {
      it('has visible inventory items', () => {
        cy.get('.shopping_cart_link').click()
        CommonPage.CartListItems()
          .should('have.length', 3)
  
      })
      it('has visible price, header and description', () => {
        cy.get('.shopping_cart_link').click()
        CommonPage.CartListItems()
          .first().as('inventoryItem')
  
        cy.get('@inventoryItem')
          .find('.inventory_item_name')
          .should('contain', 'Sauce')
  
        cy.get('@inventoryItem')
          .find('.inventory_item_desc')
          .invoke('text')
          .its('length')
          .should('be.gt', 1)
  
        cy.get('@inventoryItem')
          .find('.inventory_item_price')
          .should('have.text', '$29.99')
         
      })
      it('has visible page header', () => {
        cy.get('.shopping_cart_link').click()
        cy.get('.title')
          .should('have.text', 'Your Cart')
  
      })
    })
  describe('Cart Details', () => {
    it('remove product from cart details', () => {
      cy.get('.shopping_cart_link').click()
      let RemoveFirstItem = ($cart, $count) => { 
        CommonPage.CartListItems()
        .first()
        .find('.btn_secondary')
        .click()

        if ($count) {
          CommonPage.ShoppingCartBadge()
            .should('have.text',  $count)
        } else {
          CommonPage.ShoppingCartBadge()
            .should('not.exist')
        }
      }
      
      RemoveFirstItem('[1,2]', '2')

    })
    it('checkout and purchase product', () => {
      cy.get('.shopping_cart_link').click()
      cy.checkout('Niloy', 'Sur', '712235')
    })
  })
})
