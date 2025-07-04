import type { Config } from 'jest';

const config: Config = {
  // Автоматически очищать вызовы моков, экземпляры и контексты между тестами,
  // чтобы тесты не влияли друг на друга
  clearMocks: true,

  // Включить сбор покрытия кода при запуске тестов
  collectCoverage: true,

  // Папка, в которую будет сохраняться отчет о покрытии кода
  coverageDirectory: 'coverage',

  // Провайдер для сбора покрытия — v8 использует встроенный механизм V8 для скорости
  coverageProvider: 'v8',

  // Использовать пресет ts-jest для работы с TypeScript файлами в тестах
  preset: 'ts-jest',

  // Окружение тестов — jsdom имитирует браузер, нужен для тестирования React-компонентов
  testEnvironment: 'jsdom',

  // Файлы, которые запускаются после настройки тестового окружения,
  // например, подключение расширений jest-dom для удобных матчеров
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Маппинг модулей — замена импортов стилей (css, scss и т.д.) на мок,
  // чтобы не возникало ошибок при импорте стилей в тестах
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/$1'
  }
};

export default config;
