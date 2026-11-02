import { PageController } from '@open-cells/page-controller';
import { html, LitElement } from 'lit';

export abstract class OpenCellsPageHost extends LitElement {
  readonly pageController = new PageController(this);

  protected abstract readonly pageTitle: string;

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  render() {
    const titleId = `${this.localName}-title`;

    return html`
      <section data-page-host aria-labelledby=${titleId}>
        <div>
          <p>NutriLens</p>
          <h1 id=${titleId}>${this.pageTitle}</h1>
        </div>
      </section>
    `;
  }
}
