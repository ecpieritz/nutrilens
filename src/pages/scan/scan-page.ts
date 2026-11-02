import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('scan-page')
export class ScanPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Scan a barcode';
}

