import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('help-page')
export class HelpPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Help & about';
}

