/**
 * All appropriate application startup logic can be placed here.
 */

/**
 * Async rendering based on if the component is present in the dom.
 *
 * Note:
 *   This may be a good place for logic that involves allowing a CMS
 *   to dynamically insert components.
 *
 *   https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */
export default function render(element, module) {
  document.querySelectorAll(element).forEach(module)
}
