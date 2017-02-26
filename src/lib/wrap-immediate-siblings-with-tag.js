import $ from 'jquery'

import isPreviousSiblingIgnoreWhitespace from './is-previous-sibling-ignore-whitespace.js'

/**
 * Wraps all selected elements that are immediate siblings with
 * the specified tag. This function is impure because it directly mutates
 * DOM elements.
 * @param {Object} options.$elementsToWrap The selected elements with jQuery,
 * e.g. $('.myClass')
 * @param {string} options.wrapperTag The tag to wrap the selected elments with,
 * e.g. '<ul>'.
 * @param {string} options.transformSelectedElementsToTag The tag to transform
 * the selected elements to, e.g. to an <li> element.
 * @return {undefined}
 */
const wrapImmediateSiblingsWithTag = ({
  $elementsToWrap,
  wrapperTag,
  transformSelectedElementsToTag,
}) => {
  const elementsToWrapArray = $elementsToWrap.toArray()
  const hasPrevSiblingToWrapArray = elementsToWrapArray
    .map(element => isPreviousSiblingIgnoreWhitespace(element, $elementsToWrap))

  elementsToWrapArray.reduce(($wrapperOfPrevIteration, element, index) => {
    const $currentWrapperElement = hasPrevSiblingToWrapArray[index]
    ? $wrapperOfPrevIteration
    : $(wrapperTag)

    const $markerElement = $('<div>').insertBefore(element)
    const $element = $(element)

    $element
      .appendTo($currentWrapperElement)
      // Replace the tag of the element with a proper `<li>` tag
      .replaceWith((index, element) => $(transformSelectedElementsToTag)
        .append($element.contents())
      )

    if (!hasPrevSiblingToWrapArray[index + 1]) {
      $currentWrapperElement.insertBefore($markerElement)
    }

    $markerElement.remove()

    return $currentWrapperElement
  }, $(wrapperTag))
}

export default wrapImmediateSiblingsWithTag
