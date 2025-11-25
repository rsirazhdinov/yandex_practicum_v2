
/// <reference types="cypress" />

import { bun1, sauce } from "./ingredients.cy";

describe('burger modal works correctly', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
        cy.visit('/');
        cy.get('[data-testid=contstructor_container]').as('drop_place');
        window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshtoken'));
        window.localStorage.setItem('accessToken', JSON.stringify('test-accesstoken'));
    })



    it('should order create correctly', () => {
        cy.get(`[data-testid="${bun1}"]`).trigger('dragstart');
        cy.get('@drop_place').trigger('drop');

        cy.get(`[data-testid="${sauce}"]`).trigger('dragstart');
        cy.get('@drop_place').trigger('drop');

        cy.get('[data-testid="Мясо бессмертных моллюсков Protostomia"]').trigger('dragstart');
        cy.get('@drop_place').trigger('drop');

        cy.get('[data-testid=create_order]').click();

        cy.get('[data-testid=modal]').as('modal').contains('идентификатор заказа').should('exist');
        cy.get('@modal').contains('95375').should('exist');
        


    })




});
