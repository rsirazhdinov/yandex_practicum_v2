/// <reference types="cypress" />

describe('burger modal works correctly', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
        cy.visit('localhost:5173');
        cy.get('[data-testid=contstructor_container]').as('drop');
        window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshtoken'));
        window.localStorage.setItem('accessToken', JSON.stringify('test-accesstoken'));
    })



    it('should order create correctly', () => {
        cy.get('[data-testid="Краторная булка N-200i"]').trigger('dragstart');
        cy.get('@drop').trigger('drop');

        cy.get('[data-testid="Соус Spicy-X"]').trigger('dragstart');
        cy.get('@drop').trigger('drop');

        cy.get('[data-testid="Мясо бессмертных моллюсков Protostomia"]').trigger('dragstart');
        cy.get('@drop').trigger('drop');

        cy.get('[data-testid=create_order]').click();

        cy.get('[data-testid=modal]').contains('идентификатор заказа').should('exist');
        cy.get('[data-testid=modal]').contains('95375').should('exist');
        


    })




});
