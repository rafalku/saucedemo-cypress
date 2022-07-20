Cypress.Commands.add('login', (username, password) => {
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
})

Cypress.Commands.add('openMenu', () => {
  cy.get('#react-burger-menu-btn').click();
});

Cypress.Commands.add('addToCart', (item) => {
  cy.get(`#add-to-cart-${item.toLowerCase().replaceAll(' ', '-')}`).click();
});

Cypress.Commands.add('goToShoppingCart', (item) => {
  cy.get('a.shopping_cart_link').click();
});
