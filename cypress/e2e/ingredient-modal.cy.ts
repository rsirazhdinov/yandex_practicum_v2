/// <reference types="cypress" />

describe('ingredients modal works correctly', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
        cy.visit('localhost:5173');
        window.localStorage.setItem('accessToken', JSON.stringify('test-token'));
    })

    it('should work open modal', () => {
        cy.get('[data-testid="Краторная булка N-200i"]').click();
        cy.get('[data-testid=modal]').as('modal').contains('Детали ингредиента').should('exist');
        cy.get('@modal').contains('Краторная булка N-200i').should('exist');
    })

    it('should work close modal on button click', () => {
        cy.get('[data-testid="Краторная булка N-200i"]').click();
        cy.get('[data-testid=modal] svg').click();
        cy.get('[data-testid=modal]').should('not.exist');
    })



    it('should work close modal on overlay click', () => {
        cy.get('[data-testid="Краторная булка N-200i"]').click();
        cy.get('[data-testid=modal_overlay]').click('topRight');
        cy.get('[data-testid=modal]').should('not.exist');
    })



});
