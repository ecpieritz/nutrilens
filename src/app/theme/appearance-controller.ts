export const appearancePreferences = ['light', 'dark', 'system'] as const;

export type AppearancePreference = (typeof appearancePreferences)[number];
export type ResolvedAppearance = Exclude<AppearancePreference, 'system'>;

export const APPEARANCE_STORAGE_KEY = 'nutrilens:appearance';

const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';

interface AppearanceStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

interface AppearanceControllerOptions {
  root: HTMLElement;
  mediaQuery: MediaQueryList;
  storage: AppearanceStorage | null;
  themeColorMeta: HTMLMetaElement | null;
}

const isAppearancePreference = (value: unknown): value is AppearancePreference => {
  return typeof value === 'string' && appearancePreferences.some((item) => item === value);
};

const getBrowserStorage = (): AppearanceStorage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const createBrowserOptions = (): AppearanceControllerOptions => ({
  root: document.documentElement,
  mediaQuery: window.matchMedia(SYSTEM_DARK_QUERY),
  storage: getBrowserStorage(),
  themeColorMeta: document.querySelector<HTMLMetaElement>('meta[name="theme-color"]'),
});

export class AppearanceController {
  private preference: AppearancePreference = 'system';
  private resolvedAppearance: ResolvedAppearance = 'light';
  private started = false;

  constructor(private readonly options: AppearanceControllerOptions = createBrowserOptions()) {}

  start(): void {
    if (this.started) {
      return;
    }

    this.preference = this.readStoredPreference();
    this.applyPreference();
    this.options.mediaQuery.addEventListener('change', this.handleSystemAppearanceChange);
    this.started = true;
  }

  stop(): void {
    if (!this.started) {
      return;
    }

    this.options.mediaQuery.removeEventListener('change', this.handleSystemAppearanceChange);
    this.started = false;
  }

  getPreference(): AppearancePreference {
    return this.preference;
  }

  getResolvedAppearance(): ResolvedAppearance {
    return this.resolvedAppearance;
  }

  setPreference(preference: AppearancePreference): void {
    this.preference = preference;
    this.storePreference(preference);
    this.applyPreference();
  }

  private readonly handleSystemAppearanceChange = (): void => {
    if (this.preference === 'system') {
      this.applyPreference();
    }
  };

  private readStoredPreference(): AppearancePreference {
    try {
      const storedPreference = this.options.storage?.getItem(APPEARANCE_STORAGE_KEY);

      return isAppearancePreference(storedPreference) ? storedPreference : 'system';
    } catch {
      return 'system';
    }
  }

  private storePreference(preference: AppearancePreference): void {
    try {
      this.options.storage?.setItem(APPEARANCE_STORAGE_KEY, preference);
    } catch {
      // Appearance persistence is optional when storage is unavailable.
    }
  }

  private applyPreference(): void {
    this.resolvedAppearance =
      this.preference === 'system'
        ? this.options.mediaQuery.matches
          ? 'dark'
          : 'light'
        : this.preference;

    this.options.root.dataset['appearance'] = this.preference;
    this.options.root.dataset['theme'] = this.resolvedAppearance;
    this.options.root.style.colorScheme = this.resolvedAppearance;
    this.updateBrowserThemeColor();
  }

  private updateBrowserThemeColor(): void {
    if (!this.options.themeColorMeta) {
      return;
    }

    const themeColor = getComputedStyle(this.options.root)
      .getPropertyValue('--color-browser-chrome')
      .trim();

    if (themeColor) {
      this.options.themeColorMeta.content = themeColor;
    }
  }
}

export const appearanceController = new AppearanceController();
