import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('products-page')
export class ProductsPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Product Explorer';
}

