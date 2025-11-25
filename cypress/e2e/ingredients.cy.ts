/// <reference types="cypress" />

describe('ingredients correclty work', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
    cy.visit('localhost:5173');
    cy.get('[data-testid=contstructor_container]').as('drop');
    // window.localStorage.setItem('accessToken', JSON.stringify('test-token'));
  })

  it('should drag bun', () => {
    cy.get('[data-testid="Краторная булка N-200i"]').trigger('dragstart');
    cy.get('@drop').trigger('drop');
    cy.get('@drop').contains('Краторная булка N-200i').should('exist');
    cy.get('@drop').children().should('contain', 'Краторная булка N-200i').and('contain', 'Краторная булка N-200i');

    cy.get('[data-testid="Флюоресцентная булка R2-D3"]').trigger('dragstart');
    cy.get('@drop').trigger('drop');
    cy.get('@drop').contains('Флюоресцентная булка R2-D3').should('exist');
    cy.get('@drop').children().should('contain', 'Флюоресцентная булка R2-D3').and('contain', 'Флюоресцентная булка R2-D3');
    cy.get('@drop').contains('Краторная булка N-200i').should('not.exist');
  })

  it('should drag ingredient', () => {
    cy.get('[data-testid="Соус Spicy-X"]').trigger('dragstart');
    cy.get('@drop').trigger('drop');
    cy.get('@drop').contains('Соус Spicy-X').should('exist');

    cy.get('[data-testid="Биокотлета из марсианской Магнолии"]').trigger('dragstart');
    cy.get('@drop').trigger('drop');
    cy.get('@drop').contains('Биокотлета из марсианской Магнолии').should('exist');
  })
});
