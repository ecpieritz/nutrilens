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
        background: var(--color-background);
        color: var(--color-text-primary);
        font-family: var(--font-family-sans);
      }

      section {
        display: grid;
        min-height: 100dvh;
        padding: var(--content-gutter);
        place-items: center;
        text-align: center;
      }

      .eyebrow {
        margin: 0;
        color: var(--color-action);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        letter-spacing: var(--letter-spacing-eyebrow);
        line-height: var(--line-height-heading);
        text-transform: uppercase;
      }

      h1 {
        margin: var(--space-4) 0 0;
        color: var(--color-text-primary);
        font-size: var(--font-size-display);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-tight);
      }

      button {
        min-height: var(--control-height-md);
        margin-top: var(--space-8);
        border: var(--border-width) solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-background-elevated);
        color: var(--color-action);
        cursor: pointer;
        font-family: inherit;
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-heading);
        padding: var(--space-3) var(--space-4);
        transition:
          border-color var(--duration-fast) var(--ease-standard),
          background-color var(--duration-fast) var(--ease-standard);
      }

      button:hover {
        border-color: var(--color-action);
        background: var(--color-action-subtle);
      }

      button:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
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
