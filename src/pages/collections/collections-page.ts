import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('collections-page')
export class CollectionsPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'My Collections';
}

