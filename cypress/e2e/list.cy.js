describe('cypress', () => {
  it('opens the app', () => {
    // baseURL set in cypress config
    cy.visit("/")

    cy.get('a').first().click();
    cy.url().should('include', 'list');
    
    
  })

  it('navigates to form to add a new list item', () => {
    //cy.get('button').contains('+ Add Item').click();
    cy.get('[data-cy=addItem]').click();
    cy.url().should('include', 'new');
    
  })

  it('fills in and submits the form', () => {
     cy.get('form').within(() => {

     cy.get('input[name=title]').type('Test item');
     cy.get('input[name=quantity]').type('3');
     cy.get('input[name=price]').type(12);
     cy.get('[data-cy=submitForm]').click();
     });
    })

  it('and verifies if the item is added', () => {
       cy.wait(600);
       cy.get('h3').contains('Test item');
       })
})