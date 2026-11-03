import { PageController } from '@open-cells/page-controller';
import { html, LitElement } from 'lit';
import { OpenCellsVueBridge } from '../../app/interop/open-cells-vue-bridge.js';
import { VUE_PAGE_VIEW_TAG, type VuePageViewElement } from '../../app/interop/vue-page-view.js';

export abstract class OpenCellsPageHost extends LitElement {
  readonly pageController = new PageController(this);

  protected abstract readonly pageTitle: string;

  private active = false;
  private bridge?: OpenCellsVueBridge;

  override connectedCallback(): void {
    super.connectedCallback();
    this.bridge?.connect();
  }

  override disconnectedCallback(): void {
    this.bridge?.disconnect();
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  protected override firstUpdated(): void {
    const vueElement = this.querySelector<VuePageViewElement>(VUE_PAGE_VIEW_TAG);

    if (!vueElement) {
      throw new Error(`Expected ${VUE_PAGE_VIEW_TAG} in ${this.localName}`);
    }

    this.bridge = new OpenCellsVueBridge(this.pageController, vueElement);
    this.bridge.connect();
    this.bridge.setPageActive(this.active);
  }

  onPageEnter(): void {
    this.active = true;
    this.bridge?.setPageActive(true);
  }

  onPageLeave(): void {
    this.active = false;
    this.bridge?.setPageActive(false);
  }

  override render() {
    const pageName = this.localName.replace(/-page$/, '');

    return html`
      <nutrilens-page-view
        .active=${this.active}
        .pageName=${pageName}
        .pageTitle=${this.pageTitle}
      ></nutrilens-page-view>
    `;
  }
}
