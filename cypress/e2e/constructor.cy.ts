describe('Конструктор бургера', () => {
  const BIOCUTLET_SELECTOR = 'Биокотлета из марсианской Магнолии';
  const KRAATOR_BUN_SELECTOR = 'Краторная булка N-200i';
  const SPICY_SAUCE_SELECTOR = 'Соус Spicy-X';
  const ORDER_ACCEPTED_TEXT = 'Ваш заказ начали готовить';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    cy.setCookie('accessToken', 'test-access-token');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Загрузка страницы', () => {
    it('должен загрузить главную страницу конструктора', () => {
      cy.contains('Соберите бургер').should('be.visible');
      cy.contains('Булки').should('be.visible');
      cy.contains('Начинки').should('be.visible');
      cy.contains('Соусы').should('be.visible');
    });

    it('должен отобразить ингредиенты', () => {
      cy.contains(KRAATOR_BUN_SELECTOR).should('be.visible');
      cy.contains(BIOCUTLET_SELECTOR).should('be.visible');
      cy.contains(SPICY_SAUCE_SELECTOR).should('be.visible');
    });
  });

  describe('Модальные окна', () => {
    it('должен открыть модальное окно ингредиента при клике', () => {
      cy.get('li').contains(BIOCUTLET_SELECTOR).click({ force: true });
      cy.url().should('include', '/ingredients/');
      cy.contains(BIOCUTLET_SELECTOR).should('be.visible');
    });

    it('должен закрыть модальное окно по клику на крестик', () => {
      cy.get('li').contains(BIOCUTLET_SELECTOR).click({ force: true });
      cy.url().should('include', '/ingredients/');
      cy.get('button').first().should('be.visible').click({ force: true });
      cy.get('button').first().should('be.visible');
    });

    it('должен закрыть модальное окно по клику на оверлей', () => {
      cy.get('li').contains(BIOCUTLET_SELECTOR).click({ force: true });
      cy.url().should('include', '/ingredients/');
      cy.get('body').type('{esc}');
      cy.url().should('not.include', '/ingredients/');
    });
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавить булку в конструктор', () => {
      cy.get('[data-testid="ingredient-bun"]')
        .first()
        .find('button')
        .click({ force: true });
      cy.get('[data-testid="constructor-bun-top"]').should(
        'contain',
        KRAATOR_BUN_SELECTOR
      );
    });

    it('должен добавить начинку в конструктор', () => {
      cy.get('[data-testid="ingredient-bun"]')
        .first()
        .find('button')
        .click({ force: true });
      cy.get('[data-testid="ingredient-main"]')
        .first()
        .find('button')
        .click({ force: true });
      cy.get('[data-testid="constructor-ingredients"]').should(
        'contain',
        BIOCUTLET_SELECTOR
      );
    });
  });

  describe('Создание заказа', () => {
    it('должен показать кнопку оформления заказа', () => {
      cy.get('[data-testid="ingredient-bun"]')
        .first()
        .find('button')
        .click({ force: true });
      cy.get('[data-testid="ingredient-main"]')
        .first()
        .find('button')
        .click({ force: true });

      cy.get('[data-testid="order-button"]').should('not.be.disabled');
    });

    it('должен создать заказ и показать номер заказа', () => {
      cy.get('[data-testid="ingredient-bun"]')
        .first()
        .find('button')
        .click({ force: true });
      cy.get('[data-testid="ingredient-main"]')
        .first()
        .find('button')
        .click({ force: true });

      cy.get('[data-testid="order-button"]').should('not.be.disabled').click();

      cy.contains('12345').should('be.visible');
      cy.contains(ORDER_ACCEPTED_TEXT).should('be.visible');
    });
  });

  describe('Конструктор', () => {
    it('должен отображать пустой конструктор', () => {
      cy.contains('Выберите булки').should('be.visible');
      cy.contains('Выберите начинку').should('be.visible');
    });

    it('должен отображать кнопку оформления заказа', () => {
      cy.contains('Оформить заказ').should('be.visible');
    });
  });
});
