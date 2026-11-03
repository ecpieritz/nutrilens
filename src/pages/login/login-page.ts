import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('login-page')
export class LoginPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Welcome back';
}
