import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('settings-page')
export class SettingsPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Settings';
}
