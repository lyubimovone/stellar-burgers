describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', { fixture: 'user.json' }).as('getUser');
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
      cy.contains('Краторная булка N-200i').should('be.visible');
      cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
      cy.contains('Соус Spicy-X').should('be.visible');
    });
  });

  describe('Модальные окна', () => {
    it('должен открыть модальное окно ингредиента при клике', () => {
      cy.get('li').contains('Биокотлета из марсианской Магнолии').click({ force: true });
      cy.url().should('include', '/ingredients/');
      cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
    });

    it('должен закрыть модальное окно по клику на крестик', () => {
      cy.get('li').contains('Биокотлета из марсианской Магнолии').click({ force: true });
      cy.url().should('include', '/ingredients/');
      cy.get('button').first().should('be.visible').click({ force: true });
      cy.get('button').first().should('be.visible');
    });

    it('должен закрыть модальное окно по клику на оверлей', () => {
      cy.get('li').contains('Биокотлета из марсианской Магнолии').click({ force: true });
      cy.url().should('include', '/ingredients/');
      cy.get('body').type('{esc}');
      cy.url().should('not.include', '/ingredients/');
    });
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавить булку в конструктор', () => {
      cy.get('[data-testid="ingredient-bun"]').first().find('button').click({ force: true });
      cy.get('[data-testid="constructor-bun-top"]').should('contain', 'Краторная булка N-200i');
    });

    it('должен добавить начинку в конструктор', () => {
      cy.get('[data-testid="ingredient-bun"]').first().find('button').click({ force: true });
      cy.get('[data-testid="ingredient-main"]').first().find('button').click({ force: true });
      cy.get('[data-testid="constructor-ingredients"]').should('contain', 'Биокотлета из марсианской Магнолии');
    });
  });

  describe('Создание заказа', () => {
    it('должен показать кнопку оформления заказа', () => {
      cy.get('[data-testid="ingredient-bun"]').first().find('button').click({ force: true });
      cy.get('[data-testid="ingredient-main"]').first().find('button').click({ force: true });

      cy.get('[data-testid="order-button"]').should('not.be.disabled');
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
