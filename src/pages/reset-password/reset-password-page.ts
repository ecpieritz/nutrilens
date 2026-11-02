import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('reset-password-page')
export class ResetPasswordPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Reset your password';
}

