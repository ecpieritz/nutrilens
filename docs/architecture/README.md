# NutriLens architecture

This document records the application boundaries established by the foundation
commits. It describes the current architecture, not functionality planned for
later roadmap stages.

## Framework responsibilities

| Layer | Technology | Responsibility |
| --- | --- | --- |
| Application runtime | Open Cells | Bootstrap, hash-based routing, page creation, page lifecycle, and future cross-component channels |
| Page host | Lit | Register the custom element expected by a route and adapt Open Cells lifecycle to the feature view |
| Feature view | Vue 3 custom element | Render feature UI and expose public properties and typed DOM events |
| Build | Vite and TypeScript | Compile strict TypeScript, split lazy route modules, and create the production bundle |

Open Cells is the only application router. Vue Router or another independent
router must not be introduced. Routes use conceptual paths such as `/products`,
while browser navigation uses the Open Cells hash format.

## Dependency direction

The current dependency direction is:

```text
bootstrap -> route registry -> Lit page host -> Vue custom element
                                 |
                                 +-> typed interop contracts
```

Feature work will follow the broader direction `pages -> features -> domain`.
Integrations will implement typed domain ports so that external API payloads do
not leak into rendering components.

## Navigation flow

1. A Vue custom element emits the public `navigation-request` DOM event.
2. The payload contains a known route name and optional scalar parameters.
3. `OpenCellsVueBridge` normalizes Vue's custom-element event detail and
   validates it at runtime.
4. The bridge delegates to `PageController.navigate`.
5. Open Cells updates the hash, loads the route module when needed, and applies
   page enter/leave lifecycle callbacks.

The route-name registry in `src/app/interop/navigation-contract.ts` is shared by
the route table and the UI boundary. This prevents either side from maintaining
an independent list of navigation targets.

## Page lifecycle flow

Each route resolves to a registered Lit custom element derived from
`OpenCellsPageHost`. Its `PageController` connects the host to Open Cells.

- `onPageEnter` marks the Vue view as active.
- `onPageLeave` marks it as inactive.
- `connectedCallback` reconnects the DOM-event adapter when a retained page is
  attached again.
- `disconnectedCallback` removes the adapter listener to avoid leaks.

Feature-specific resources such as subscriptions, timers, and camera streams
must use the same lifecycle boundary and be disposed when a page leaves or is
disconnected, according to their retention requirements.

## State ownership

State belongs to one owner according to its purpose:

| State kind | Owner | Examples and constraints |
| --- | --- | --- |
| Global UI communication | Open Cells typed channels | Session summaries, comparison selection, preferences, search intent, and toast requests; never credentials or private `__oc_*` channels |
| Remote server state | TanStack Query in a future integration commit | Responses, cache keys, deduplication, cancellation, retries, stale time, and invalidation; responses are not copied into global channels |
| Local transient state | Lit or Vue component | Form drafts, open dialogs, selected tabs, and other view-only interaction state |
| Shareable navigation state | URL managed through Open Cells | Search terms, filters, pagination, route parameters, and eligible active tabs |
| Durable user state | Persistence adapter in a future backend commit | Profiles, preferences, collections, saved comparisons, and notifications |

Libraries mentioned for future layers are ownership decisions only. They are
not installed or claimed as implemented by this document.

## Boundary contracts

- Cross-framework input uses public custom-element properties.
- Cross-framework output uses composed DOM events with typed payloads.
- Payloads crossing a runtime boundary are validated before use.
- Page hosts remain thin and contain no feature business logic.
- Vue views do not import or call the Open Cells router directly.
- External data will enter through integrations and typed domain mappings, not
  direct `fetch` calls in render components.

## Decisions

- [ADR-001: Use Open Cells page hosts with Vue custom elements](decisions/001-open-cells-lit-vue-interop.md)

API, persistence, missing-value semantics, and notification infrastructure are
separate decisions reserved for their corresponding roadmap stages.
