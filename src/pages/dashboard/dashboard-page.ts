import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('dashboard-page')
export class DashboardPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Overview';
}
