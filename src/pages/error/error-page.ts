import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('error-page')
export class ErrorPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Connection error';
}
