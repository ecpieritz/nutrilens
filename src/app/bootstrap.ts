import { startApp } from '@open-cells/core';
import { routes } from './routes.js';

startApp({
  routes,
  mainNode: 'app-content',
});
