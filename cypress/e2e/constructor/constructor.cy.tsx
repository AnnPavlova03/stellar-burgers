import { TIngredient } from '../../../src/utils/types';
import cypress from 'cypress';
const url = 'https://norma.nomoreparties.space/api';

describe('Constructor page', () => {
  let ingredientData: TIngredient[];

  const openModal = (ingredientId: string) => {
    cy.get(`[data-cy=${ingredientId}]`).click();
    cy.get("[data-cy='modal']").should('be.visible').should('exist');
  };
  beforeEach(() => {
    cy.intercept(`GET`, `${url}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients').then((data) => {
      ingredientData = data.response?.body.data;
    });
  });
  it('display ingredients', () => {
    expect(ingredientData).to.have.length.gt(0);
    expect(ingredientData).to.have.length(15);
  });

  it('add ingredient', () => {
    ingredientData.forEach((item: TIngredient) => {
      const _id = item._id;
      cy.get(`[data-cy="${_id}"]`).contains('button', 'Добавить').click();
    });
    cy.get("[data-cy='bun']").should('have.length', 2);
    cy.get("[data-cy='main'] li").should('have.length', 13);
  });
  describe('cheking modal work', () => {
    it('modal open', () => {
      const firstElement = ingredientData[0]._id;
      openModal(firstElement);
    });
    it('modal close by Icon', () => {
      const firstElement = ingredientData[0]._id;
      openModal(firstElement);
      cy.get("[data-cy='modal']").find('button[type="button"]').click();
      cy.get("[data-cy='modal']").should('not.exist');
    });
    it('modal close by Overlay', () => {
      const firstElement = ingredientData[0]._id;
      openModal(firstElement);
      cy.get("[data-cy='modalOverlay']").click({ force: true });
      cy.get("[data-cy='modal']").should('not.exist');
    });
  });

  describe('Order tests', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    beforeEach(() => {
      cy.intercept('POST', `${url}/auth/login`, {
        fixture: 'login.json'
      }).as('login');

      cy.intercept('POST', `${url}/orders`, {
        fixture: 'order.json'
      }).as('getOrder');
    });
    afterEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
    });

    it('test order', () => {
      cy.visit('/login');
      cy.get("[data-cy='emailInput'] input")
        .type(loginData.email)
        .should('have.value', loginData.email);
      cy.get("[data-cy='passwordInput'] input")
        .type(loginData.password)
        .should('have.value', loginData.password);
      cy.get("[data-cy='enterButton'] ").should('be.visible').click();
      cy.wait('@login').then((interception) => {
        interception.response?.body.user;
        window.localStorage.setItem(
          'refreshToken',
          interception.response?.body.refreshToken
        );
        cy.setCookie('accessToken', interception.response?.body.accessToken);
      });

      cy.get(`[data-cy="643d69a5c3f7b9001cfa093c"]`)
        .contains('button', 'Добавить')
        .click();

      cy.get(`[data-cy="643d69a5c3f7b9001cfa093e"]`)
        .contains('button', 'Добавить')
        .click();

      cy.get("[data-cy='orderButton']").should('be.visible').click();
      cy.get("[data-cy='modal']").should('be.visible').should('exist');
      cy.get("[data-cy='orderNumber']").should('contain.text', '52218');
      cy.get("[data-cy='modal']").find('button[type="button"]').click();
      cy.get("[data-cy='modal']").should('not.exist');
      cy.get("[data-cy='bun']").should('have.length', 0);
      cy.get("[data-cy='main'] input").should('have.length', 0);
    });
  });
});
