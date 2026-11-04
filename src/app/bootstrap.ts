import { startApp } from '@open-cells/core';
import { routes } from './routes.js';
import { appearanceController } from './theme/appearance-controller.js';

appearanceController.start();

startApp({
  routes,
  mainNode: 'app-content',
});
