/**
 * Check if a DOM element is contained in a given node list
 * @param {Object} elementToCheck The DOM element to check for
 * @param {Object} DOMElementsToCheckAgainst The list of DOM nodes that
 * potentially includes the elementToCheck
 * @return {boolean}
 */
const isOneOfTheElements = (elementToCheck, DOMElementsToCheckAgainst) =>
  [...DOMElementsToCheckAgainst]
    .some(currentDOMElementToCheckAgainst => currentDOMElementToCheckAgainst === elementToCheck)

/**
 * Check if the previous sibling matches the predicate.
 * Whitespace as previous sibling text node is ignored.
 * @param {object} element The DOM element to check
 * @param {Object} predicate The DOM element list as context
 * @return {boolean} Result wheter it matched or not
 */
const isPreviousSiblingIgnoreWhitespace = (element, predicate) => {
  if (isOneOfTheElements(element.previousSibling, predicate)) return true

  const isPrevSiblingWithWhitespace =
    element.previousSibling &&
    element.previousSibling.data &&
    !element.previousSibling.data.trim() &&
    isOneOfTheElements(element.previousSibling.previousSibling, predicate)

  if (isPrevSiblingWithWhitespace) return true

  return false
}

export default isPreviousSiblingIgnoreWhitespace
