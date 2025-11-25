export const bun1 = 'Краторная булка N-200i';
export const bun2= 'Флюоресцентная булка R2-D3';
export const sauce = 'Соус Spicy-X';
export const main = 'Биокотлета из марсианской Магнолии';

/// <reference types="cypress" />

describe('ingredients correclty work', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
    cy.visit('/');
    cy.get('[data-testid=contstructor_container]').as('drop_place');
    cy.get(`[data-testid="${bun1}"]`).as('bun1');
    cy.get(`[data-testid="${bun2}"]`).as('bun2');


  })

  it('should drag bun', () => {
    cy.get('@bun1').trigger('dragstart');
    cy.get('@drop_place').trigger('drop');
    cy.get('@drop_place').contains(bun1).should('exist');
    cy.get('@drop_place').children().should('contain', bun1).and('contain', bun1);

    cy.get('@bun2').trigger('dragstart');
    cy.get('@drop_place').trigger('drop');
    cy.get('@drop_place').contains(bun2).should('exist');
    cy.get('@drop_place').children().should('contain', bun2).and('contain', bun2);
    cy.get('@drop_place').contains(bun1).should('not.exist');
  })

  it('should drag ingredient', () => {
    cy.get(`[data-testid="${sauce}"]`).trigger('dragstart');
    cy.get('@drop_place').trigger('drop');
    cy.get('@drop_place').contains(sauce).should('exist');

    cy.get(`[data-testid="${main}"]`).trigger('dragstart');
    cy.get('@drop_place').trigger('drop');
    cy.get('@drop_place').contains(main).should('exist');
  })
});
