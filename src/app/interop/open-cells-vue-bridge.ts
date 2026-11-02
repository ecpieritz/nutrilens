import type { PageController } from '@open-cells/page-controller';
import {
  isNavigationRequest,
  NAVIGATION_REQUEST_EVENT,
  type NavigationRequest,
} from './navigation-contract.js';
import type { VuePageViewElement } from './vue-page-view.js';

type NavigationController = Pick<PageController, 'navigate'>;

const readVueEventPayload = (event: CustomEvent<unknown>): unknown => {
  if (Array.isArray(event.detail)) {
    return event.detail[0];
  }

  return event.detail;
};

export class OpenCellsVueBridge {
  private connected = false;

  constructor(
    private readonly controller: NavigationController,
    private readonly element: VuePageViewElement,
  ) {}

  connect(): void {
    if (this.connected) {
      return;
    }

    this.element.addEventListener(NAVIGATION_REQUEST_EVENT, this.handleNavigationRequest);
    this.connected = true;
  }

  disconnect(): void {
    if (!this.connected) {
      return;
    }

    this.element.removeEventListener(NAVIGATION_REQUEST_EVENT, this.handleNavigationRequest);
    this.connected = false;
  }

  setPageActive(active: boolean): void {
    this.element.active = active;
  }

  private readonly handleNavigationRequest = (event: Event): void => {
    if (!(event instanceof CustomEvent)) {
      return;
    }

    const payload = readVueEventPayload(event);

    if (!isNavigationRequest(payload)) {
      return;
    }

    this.navigate(payload);
  };

  private navigate(request: NavigationRequest): void {
    this.controller.navigate(request.name, request.params);
  }
}
