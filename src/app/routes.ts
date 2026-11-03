import type { RouteDefinition } from '@open-cells/core/types';
import { routeNames } from './interop/navigation-contract.js';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: routeNames.root,
    component: 'dashboard-page',
    action: async () => {
      await import('../pages/dashboard/dashboard-page.js');
    },
  },
  {
    path: '/dashboard',
    name: routeNames.dashboard,
    component: 'dashboard-page',
    action: async () => {
      await import('../pages/dashboard/dashboard-page.js');
    },
  },
  {
    path: '/products',
    name: routeNames.products,
    component: 'products-page',
    action: async () => {
      await import('../pages/products/products-page.js');
    },
  },
  {
    path: '/products/:barcode',
    name: routeNames.productDetail,
    component: 'product-detail-page',
    action: async () => {
      await import('../pages/product-detail/product-detail-page.js');
    },
  },
  {
    path: '/compare',
    name: routeNames.compare,
    component: 'compare-page',
    action: async () => {
      await import('../pages/compare/compare-page.js');
    },
  },
  {
    path: '/collections',
    name: routeNames.collections,
    component: 'collections-page',
    action: async () => {
      await import('../pages/collections/collections-page.js');
    },
  },
  {
    path: '/insights',
    name: routeNames.insights,
    component: 'insights-page',
    action: async () => {
      await import('../pages/insights/insights-page.js');
    },
  },
  {
    path: '/scan',
    name: routeNames.scan,
    component: 'scan-page',
    action: async () => {
      await import('../pages/scan/scan-page.js');
    },
  },
  {
    path: '/login',
    name: routeNames.login,
    component: 'login-page',
    action: async () => {
      await import('../pages/login/login-page.js');
    },
  },
  {
    path: '/register',
    name: routeNames.register,
    component: 'register-page',
    action: async () => {
      await import('../pages/register/register-page.js');
    },
  },
  {
    path: '/forgot-password',
    name: routeNames.forgotPassword,
    component: 'forgot-password-page',
    action: async () => {
      await import('../pages/forgot-password/forgot-password-page.js');
    },
  },
  {
    path: '/reset-password',
    name: routeNames.resetPassword,
    component: 'reset-password-page',
    action: async () => {
      await import('../pages/reset-password/reset-password-page.js');
    },
  },
  {
    path: '/onboarding',
    name: routeNames.onboarding,
    component: 'onboarding-page',
    action: async () => {
      await import('../pages/onboarding/onboarding-page.js');
    },
  },
  {
    path: '/profile',
    name: routeNames.profile,
    component: 'profile-page',
    action: async () => {
      await import('../pages/profile/profile-page.js');
    },
  },
  {
    path: '/settings',
    name: routeNames.settings,
    component: 'settings-page',
    action: async () => {
      await import('../pages/settings/settings-page.js');
    },
  },
  {
    path: '/notifications',
    name: routeNames.notifications,
    component: 'notifications-page',
    action: async () => {
      await import('../pages/notifications/notifications-page.js');
    },
  },
  {
    path: '/help',
    name: routeNames.help,
    component: 'help-page',
    action: async () => {
      await import('../pages/help/help-page.js');
    },
  },
  {
    path: '/error',
    name: routeNames.error,
    component: 'error-page',
    action: async () => {
      await import('../pages/error/error-page.js');
    },
  },
  {
    path: '/not-found',
    name: routeNames.notFound,
    component: 'not-found-page',
    notFound: true,
    action: async () => {
      await import('../pages/not-found/not-found-page.js');
    },
  },
];
