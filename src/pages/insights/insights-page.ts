import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('insights-page')
export class InsightsPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Nutrition Insights';
}

