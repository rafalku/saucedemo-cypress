beforeEach(() => {
  cy.visit('/');
})

it('Logs in successfully', () => {
  cy.login('standard_user', 'secret_sauce');
  cy.get('#header_container span.title').should(($header) => {
    expect($header.text().toLowerCase()).to.match(/products/);
  });
});

it('Displays log in error', () => {
  cy.login('non-existing', 'password');
  cy.get('[data-test="error"]').should('have.text',
    'Epic sadface: Username and password do not match any user in this service');
});

it('Logs out', () => {
  cy.login('standard_user', 'secret_sauce');
  cy.openMenu();
  cy.get('#logout_sidebar_link').click();
  cy.get('#login-button').should('be.visible');
});
