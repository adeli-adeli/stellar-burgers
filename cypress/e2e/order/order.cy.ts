describe('Создание заказа', () => {
  beforeEach(() => {
    // мокаем POST-запрос на логин пользователя
    cy.intercept('POST', '**/auth/login', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          user: {
            name: 'Джо',
            email: 'yandex@yandex.ru'
          }
        }
      });
    }).as('login');

    // мокаем  GET-запрос для получения данных пользователя
    cy.intercept('GET', '**/auth/login', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          user: {
            name: 'Джо',
            email: 'yandex@yandex.ru'
          }
        }
      });
    }).as('getUser');

    // мокаем GET-запрос для получения ингредиентов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('fetchIngredients');

    // мокаем POST-запрос для создания заказа и проверяем заголовок авторизации
    cy.intercept('POST', '**/api/orders', (req) => {
      expect(req.headers.authorization).to.eq('mock-access-token');
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          order: {
            number: 856245
          }
        }
      });
    }).as('createOrder');

    cy.visit('/');
  });

  //очищаем куки и localStorage после каждого теста для изоляции
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('корректно оформляет заказ и очищает конструктор после закрытия модального окна', () => {
    //проходим авторизацию через форму логина
    cy.visit('/login');
    cy.get('input[name="email"]').type('yandex@yandex.ru');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait('@login');

    //проверка, что произошёл редирект с /login
    cy.url().should('not.include', '/login');

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

    cy.get('[data-testid="submit-button"]').click();
    cy.wait('@createOrder');

    // открываем модальное окно
    // проверяем номер заказа
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal"]').contains('856245');

    //закрываем модальное окно по кнопке-крестику
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    //проверка, что конструктор пуст
    cy.get('[data-testid="constructor"]').within(() => {
      cy.contains('Краторная булка N-200i').should('not.exist');
      cy.contains('Говяжий метеорит (отбивная)').should('not.exist');
      cy.contains('Соус Spicy-X').should('not.exist');
    });
  });
});
