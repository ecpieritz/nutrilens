import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('profile-page')
export class ProfilePage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Profile';
}
