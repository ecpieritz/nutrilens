# ADR-001: Use Open Cells page hosts with Vue custom elements

- Status: Accepted
- Date: 2026-11-03
- Decision owners: NutriLens maintainers

## Context

NutriLens requires Open Cells to own application bootstrap, hash routing, page
lifecycle, and cross-component communication. The intended feature UI stack is
Vue 3, while Open Cells routes need registered custom elements that participate
in `PageController` lifecycle.

Using an independent Vue router or mounting one monolithic Vue application
would create competing navigation and lifecycle owners. Letting feature views
depend directly on Open Cells would also spread framework-specific APIs through
the UI and make cleanup behavior harder to verify.

## Decision

Use a thin Lit custom element as the host for every Open Cells page and render a
Vue 3 custom element inside that host.

Open Cells remains the sole application runtime and router. Each route lazily
imports its Lit page host. The host owns `PageController`, translates page
enter/leave callbacks into public properties, and connects a typed interop
adapter to its Vue child.

Communication across the Lit/Vue boundary uses browser platform contracts:

- Lit supplies data and lifecycle state through custom-element properties.
- Vue emits public `CustomEvent` instances for user intent.
- A typed adapter validates event payloads and delegates navigation to
  `PageController`.
- The adapter disconnects its listeners with the host lifecycle.

The first contract is `navigation-request`, whose payload contains a registered
route name and optional string, number, or boolean parameters. The route table
and event contract consume the same route-name registry.

## Data-flow rules

The interop bridge transports intent, not duplicated application state.

```text
user action
  -> Vue emits typed intent
  -> bridge validates payload
  -> Open Cells controller performs navigation
  -> Open Cells applies route and page lifecycle
  -> Lit host updates Vue public properties
```

Global UI messages will use typed Open Cells channels. Remote responses will be
owned by TanStack Query when the API layer is introduced. Transient interaction
state remains local to the rendering component, shareable state belongs in the
URL, and durable user data belongs behind a persistence adapter. Sensitive
tokens must never be published to channels.

## Consequences

### Positive

- Open Cells has one unambiguous ownership boundary for routing and lifecycle.
- Route modules remain independently lazy-loadable.
- Feature UI can use Vue without hiding or replacing Open Cells.
- DOM properties and events keep the framework boundary explicit and testable.
- Runtime payload validation protects the controller from malformed events.
- Idempotent connect/disconnect behavior supports retained Open Cells pages
  without accumulating listeners.

### Trade-offs

- Each feature page has a small Lit host in addition to its Vue custom element.
- Cross-framework contracts require both TypeScript types and runtime guards.
- Vue custom elements use shadow roots, so shared design tokens must be exposed
  as CSS custom properties rather than relying on document-scoped selectors.
- Lifecycle-sensitive resources must be deliberately mapped to page leave and
  element disconnection instead of relying only on Vue component unmounting.

## Rejected alternatives

### Vue Router inside Open Cells

Rejected because two routers would compete for URLs, navigation history, lazy
loading, guards, and not-found behavior.

### One monolithic Vue application wrapped by Open Cells

Rejected because Open Cells would no longer meaningfully own pages and their
lifecycle, contrary to the project architecture.

### Feature views call Open Cells directly

Rejected because it couples Vue components to infrastructure APIs and makes
their events and disposal behavior less explicit.

### Lit-only feature UI

Rejected as the default because the selected stack calls for Vue 3 custom
elements for feature UI. Lit remains appropriate for the small Open Cells host
boundary and future shell elements where that ownership is useful.

## Implementation references

- `src/app/bootstrap.ts`
- `src/app/routes.ts`
- `src/app/interop/navigation-contract.ts`
- `src/app/interop/open-cells-vue-bridge.ts`
- `src/app/interop/vue-page-view.ts`
- `src/pages/shared/open-cells-page-host.ts`
