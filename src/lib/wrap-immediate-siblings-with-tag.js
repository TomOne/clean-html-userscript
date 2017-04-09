import isPreviousSiblingIgnoreWhitespace from './is-previous-sibling-ignore-whitespace.js'

/**
 * Wraps all selected elements that are immediate siblings with
 * the specified tag. This function is impure because it directly mutates
 * DOM elements.
 * @param {Object} options.elementsToWrap The selected DOM elements to wrap
 * @param {string} options.wrapperTag The tag name to wrap the selected elments with,
 * e.g. 'ul'.
 * @param {string} options.transformSelectedElementsToTag The tag name to transform
 * the selected elements to, e.g. li
 * @return {undefined}
 */
const wrapImmediateSiblingsWithTag = ({
  elementsToWrap,
  wrapperTagName,
  transformSelectedElementsToTag,
}) => {
  const elementsToWrapArray = [...elementsToWrap]
  const hasPrevSiblingToWrapArray = elementsToWrapArray
    .map(element => isPreviousSiblingIgnoreWhitespace(element, elementsToWrap))

  elementsToWrapArray.reduce((wrapperOfPrevIteration, element, index) => {
    const currentWrapperElement = hasPrevSiblingToWrapArray[index]
    ? wrapperOfPrevIteration
    : document.createElement(wrapperTagName)

    const markerElement = document.createElement('div')

    // Insert the marker element before the current element of the iteration
    element.parentNode.insertBefore(markerElement, element)

    const newElement = document.createElement(transformSelectedElementsToTag)

    // Iterate of the children of the element and append them to the new element.
    while (element.firstChild) {
      const child = element.removeChild(element.firstChild)
      newElement.appendChild(child)
    }
    currentWrapperElement.appendChild(newElement)

    if (!hasPrevSiblingToWrapArray[index + 1]) {
      // Insert the current wrapper element before the marker element
      markerElement.parentNode.insertBefore(currentWrapperElement, markerElement)
    }

    // Remove the temporary marker element as it’s no longer necessary
    markerElement.parentNode.removeChild(markerElement)

    return currentWrapperElement
  }, document.createElement(wrapperTagName))
}

export default wrapImmediateSiblingsWithTag
