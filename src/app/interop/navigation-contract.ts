export const routeNames = {
  root: 'root',
  dashboard: 'dashboard',
  products: 'products',
  productDetail: 'product-detail',
  compare: 'compare',
  collections: 'collections',
  insights: 'insights',
  scan: 'scan',
  login: 'login',
  register: 'register',
  forgotPassword: 'forgot-password',
  resetPassword: 'reset-password',
  onboarding: 'onboarding',
  profile: 'profile',
  settings: 'settings',
  notifications: 'notifications',
  help: 'help',
  error: 'error',
  notFound: 'not-found',
} as const;

export type AppRouteName = (typeof routeNames)[keyof typeof routeNames];

export type NavigationParameter = string | number | boolean;

export interface NavigationRequest {
  name: AppRouteName;
  params?: Record<string, NavigationParameter>;
}

export const NAVIGATION_REQUEST_EVENT = 'navigation-request';

const knownRouteNames = new Set<string>(Object.values(routeNames));

const hasValidParameters = (value: unknown): value is Record<string, NavigationParameter> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((parameter) => {
    return ['string', 'number', 'boolean'].includes(typeof parameter);
  });
};

export const isNavigationRequest = (value: unknown): value is NavigationRequest => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const candidate = value as { name?: unknown; params?: unknown };

  return (
    typeof candidate.name === 'string' &&
    knownRouteNames.has(candidate.name) &&
    (candidate.params === undefined || hasValidParameters(candidate.params))
  );
};

