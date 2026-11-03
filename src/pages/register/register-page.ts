import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('register-page')
export class RegisterPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Create your account';
}
