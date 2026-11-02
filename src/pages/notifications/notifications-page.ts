import { customElement } from 'lit/decorators.js';
import { OpenCellsPageHost } from '../shared/open-cells-page-host.js';

@customElement('notifications-page')
export class NotificationsPage extends OpenCellsPageHost {
  protected readonly pageTitle = 'Notifications';
}

