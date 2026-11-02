import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('onboarding-page')
export class OnboardingPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Welcome to NutriLens';
}

