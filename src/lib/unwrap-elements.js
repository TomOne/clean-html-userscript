import unwrapElement from './unwrap-element.js'

/**
 * Unwraps the selected elements
 * @param  {object} targetElement The element to use as source
 * @param  {string} selector CSS selector for the elements to unwrap
 * @return {undefined}
 */
const unwrapElements = (targetElement, selector) => {
  targetElement.querySelectorAll(selector)
    .forEach(element => unwrapElement(element))
}

export default unwrapElements
