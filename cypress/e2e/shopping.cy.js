import {SortingOrder} from '../support/sortingOrder';

beforeEach(() => {
  cy.visit('/')
  cy.login('standard_user', 'secret_sauce');
});


it('Sorts by price', () => {
  cy.get('select[data-test="product_sort_container"]').select(SortingOrder.PRICE_ASC);
  cy.get('div.inventory_item_price').then(($priceElems) => {
    const prices = $priceElems.map(function() {return parseFloat(this.textContent.substring(1))}).toArray();
    const sortedPrices = [...prices].sort(function(a, b){return a-b});
    expect(prices).to.eql(sortedPrices);
  });
});


describe('Given shopping list', () => {
  [
    ["Sauce Labs Bike Light",
    "Sauce Labs Backpack",
    "Sauce Labs Fleece Jacket"],
    ["Sauce Labs Onesie"],
  ].forEach((shoppingList) => {
    it('adds items to cart', () => {
      shoppingList.forEach((item) => {
        cy.addToCart(item);
      })
      cy.goToShoppingCart();
      cy.get('div.inventory_item_name').then(($items) => {
        return Cypress.$.makeArray($items)
          .map((el) => el.innerText);
      }).should('deep.equal', shoppingList);
    })
  })
});


it('Completes purchase', () => {
  cy.addToCart('Sauce Labs Bike Light');
  cy.goToShoppingCart();
  cy.get('#checkout').click();
  cy.get('#first-name').type('John');
  cy.get('#last-name').type('Doe');
  cy.get('#postal-code').type('123456');
  cy.get('#continue').click();
  cy.get('div.summary_total_label').then(($label) => {
    cy.wrap(parseFloat($label.text().split('$')[1]));
  }).should('equal', 10.79);
  cy.get('#finish').click();
  cy.get('h2.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER');
});
