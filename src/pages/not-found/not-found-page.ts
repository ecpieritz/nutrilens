import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('not-found-page')
export class NotFoundPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Page not found';
}
