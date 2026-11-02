import type { RouteDefinition } from '@open-cells/core/types';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'root',
    component: 'dashboard-page',
    action: async () => {
      await import('../pages/dashboard/dashboard-page.js');
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: 'dashboard-page',
    action: async () => {
      await import('../pages/dashboard/dashboard-page.js');
    },
  },
  {
    path: '/products',
    name: 'products',
    component: 'products-page',
    action: async () => {
      await import('../pages/products/products-page.js');
    },
  },
  {
    path: '/products/:barcode',
    name: 'product-detail',
    component: 'product-detail-page',
    action: async () => {
      await import('../pages/product-detail/product-detail-page.js');
    },
  },
  {
    path: '/compare',
    name: 'compare',
    component: 'compare-page',
    action: async () => {
      await import('../pages/compare/compare-page.js');
    },
  },
  {
    path: '/collections',
    name: 'collections',
    component: 'collections-page',
    action: async () => {
      await import('../pages/collections/collections-page.js');
    },
  },
  {
    path: '/insights',
    name: 'insights',
    component: 'insights-page',
    action: async () => {
      await import('../pages/insights/insights-page.js');
    },
  },
  {
    path: '/scan',
    name: 'scan',
    component: 'scan-page',
    action: async () => {
      await import('../pages/scan/scan-page.js');
    },
  },
  {
    path: '/login',
    name: 'login',
    component: 'login-page',
    action: async () => {
      await import('../pages/login/login-page.js');
    },
  },
  {
    path: '/register',
    name: 'register',
    component: 'register-page',
    action: async () => {
      await import('../pages/register/register-page.js');
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: 'forgot-password-page',
    action: async () => {
      await import('../pages/forgot-password/forgot-password-page.js');
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: 'reset-password-page',
    action: async () => {
      await import('../pages/reset-password/reset-password-page.js');
    },
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: 'onboarding-page',
    action: async () => {
      await import('../pages/onboarding/onboarding-page.js');
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: 'profile-page',
    action: async () => {
      await import('../pages/profile/profile-page.js');
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: 'settings-page',
    action: async () => {
      await import('../pages/settings/settings-page.js');
    },
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: 'notifications-page',
    action: async () => {
      await import('../pages/notifications/notifications-page.js');
    },
  },
  {
    path: '/help',
    name: 'help',
    component: 'help-page',
    action: async () => {
      await import('../pages/help/help-page.js');
    },
  },
  {
    path: '/error',
    name: 'error',
    component: 'error-page',
    action: async () => {
      await import('../pages/error/error-page.js');
    },
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: 'not-found-page',
    notFound: true,
    action: async () => {
      await import('../pages/not-found/not-found-page.js');
    },
  },
];

