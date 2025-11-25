/// <reference types="cypress" />

import { bun1, bun2 } from "./ingredients.cy";

describe('ingredients modal works correctly', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
        cy.visit('/');
        window.localStorage.setItem('accessToken', JSON.stringify('test-token'));
        cy.get(`[data-testid="${bun1}"]`).as('bun');
    })

    it('should work open modal', () => {
        cy.get('@bun').click();
        cy.get('[data-testid=modal]').as('modal').contains('Детали ингредиента').should('exist');
        cy.get('@modal').contains(bun1).should('exist');
    })


    it('should work close modal on button click', () => {
        cy.get('@bun').click();
        cy.get('[data-testid=modal] svg').click();
        cy.get('[data-testid=modal]').should('not.exist');
    })



    it('should work close modal on overlay click', () => {
        cy.get(`[data-testid="${bun1}"]`).click();
        cy.get('[data-testid=modal_overlay]').click("left", { force: true });
        cy.get('[data-testid=modal]').should('not.exist');
    })



});
