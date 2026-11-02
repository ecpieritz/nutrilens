import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('product-detail-page')
export class ProductDetailPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Product details';
}

