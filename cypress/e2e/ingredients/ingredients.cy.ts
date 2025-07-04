describe('Возвращает созданые моковые данные', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('fetchIngredients');

    //перход на страницу, которая вызывает GET /ingredients
    cy.visit('/');

    //ждем, пока приложение сделаем этот запрос
    cy.wait('@fetchIngredients');
  });

  it('Перехват эндпоинда и возвращение моковых данных', () => {
    //проверим, что данные появились на странице
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Соус Spicy-X').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.contains('button', 'Добавить').click();

    //добавляем булку
    cy.contains('Краторная булка N-200i')
      .parent()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // добавляем мясо
    cy.contains('Говяжий метеорит (отбивная)')
      .parent()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // добавляем соус
    cy.contains('Соус Spicy-X')
      .parent()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // проверяем, что все ингредиенты есть в конструкторе
    cy.get('[data-testid="constructor"]').within(() => {
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('Говяжий метеорит (отбивная)').should('exist');
      cy.contains('Соус Spicy-X').should('exist');
    });
  });

  it('Открытие и закрытие модального окна с описанием ингредиента', () => {
    //открытие модального окна
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal"]').contains('Краторная булка N-200i');

    //закрытие модального окна на крестик
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Закрытие модального окна по оверлею', () => {
    //открытие модального окна
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal"]').contains('Краторная булка N-200i');

    //закрытие модального окна по оверлею
    cy.get('[data-testid="overlay-modal"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
