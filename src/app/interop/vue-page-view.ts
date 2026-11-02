import { defineCustomElement, h } from 'vue';
import {
  isNavigationRequest,
  NAVIGATION_REQUEST_EVENT,
  routeNames,
} from './navigation-contract.js';

export const VUE_PAGE_VIEW_TAG = 'nutrilens-page-view';

export interface VuePageViewElement extends HTMLElement {
  active: boolean;
  pageName: string;
  pageTitle: string;
}

const VuePageView = defineCustomElement({
  name: 'NutriLensPageView',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    pageName: {
      type: String,
      required: true,
    },
    pageTitle: {
      type: String,
      required: true,
    },
  },
  emits: {
    [NAVIGATION_REQUEST_EVENT]: isNavigationRequest,
  },
  setup(props, { emit }) {
    const navigateToDashboard = () => {
      emit(NAVIGATION_REQUEST_EVENT, { name: routeNames.dashboard });
    };

    return () => {
      const titleId = `${props.pageName}-view-title`;
      const children = [
        h('p', { class: 'eyebrow' }, 'NutriLens'),
        h('h1', { id: titleId }, props.pageTitle),
      ];

      if (props.pageName !== routeNames.dashboard) {
        children.push(
          h(
            'button',
            {
              type: 'button',
              onClick: navigateToDashboard,
            },
            'Back to overview',
          ),
        );
      }

      return h(
        'section',
        {
          'aria-labelledby': titleId,
          'data-active': String(props.active),
        },
        [h('div', children)],
      );
    };
  },
  styles: [
    `
      :host {
        display: block;
        min-height: 100dvh;
      }

      section {
        display: grid;
        min-height: 100dvh;
        padding: 2rem;
        place-items: center;
        text-align: center;
      }

      .eyebrow {
        margin: 0;
        color: #23694f;
        font: 700 0.875rem/1.2 Inter, ui-sans-serif, system-ui, sans-serif;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: 1rem 0 0;
        color: #173d30;
        font: 700 clamp(2rem, 8vw, 4rem)/1.05 Inter, ui-sans-serif, system-ui, sans-serif;
      }

      button {
        margin-top: 2rem;
        border: 1px solid #23694f;
        border-radius: 0.5rem;
        background: #ffffff;
        color: #173d30;
        cursor: pointer;
        font: 600 1rem/1.2 Inter, ui-sans-serif, system-ui, sans-serif;
        padding: 0.75rem 1rem;
      }

      button:focus-visible {
        outline: 3px solid #e36c54;
        outline-offset: 3px;
      }
    `,
  ],
});

if (!customElements.get(VUE_PAGE_VIEW_TAG)) {
  customElements.define(VUE_PAGE_VIEW_TAG, VuePageView);
}

declare global {
  interface HTMLElementTagNameMap {
    [VUE_PAGE_VIEW_TAG]: VuePageViewElement;
  }
}

