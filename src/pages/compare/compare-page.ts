import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('compare-page')
export class ComparePage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Compare products';
}

