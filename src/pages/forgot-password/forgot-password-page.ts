import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('forgot-password-page')
export class ForgotPasswordPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Forgot your password?';
}

