import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('bootstrap-page')
export class BootstrapPage extends LitElement {
  static styles = css`
    :host {
      display: grid;
      min-height: 100dvh;
      place-items: center;
      padding: 2rem;
    }

    section {
      max-width: 36rem;
      text-align: center;
    }

    p {
      margin: 0;
      color: #23694f;
      font-size: 0.875rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    h1 {
      margin: 1rem 0 0;
      color: #173d30;
      font-size: clamp(2rem, 8vw, 4rem);
      line-height: 1.05;
    }
  `;

  render() {
    return html`
      <section aria-labelledby="bootstrap-title">
        <p>Food intelligence</p>
        <h1 id="bootstrap-title">NutriLens is ready to grow.</h1>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bootstrap-page': BootstrapPage;
  }
}

