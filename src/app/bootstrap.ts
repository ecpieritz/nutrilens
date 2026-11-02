import { startApp } from '@open-cells/core';
import type { RouteDefinition } from '@open-cells/core/types';

const bootstrapRoutes: RouteDefinition[] = [
  {
    path: '/',
    name: 'bootstrap',
    component: 'bootstrap-page',
    action: async () => {
      await import('../pages/bootstrap/bootstrap-page.js');
    },
  },
];

startApp({
  routes: bootstrapRoutes,
  mainNode: 'app-content',
});

