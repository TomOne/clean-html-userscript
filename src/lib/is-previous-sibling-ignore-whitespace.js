import $ from 'jquery'

/**
 * Check if the previous sibling matches the predicate,
 * using jQuery’s `.is()` method but ignoring whitespace
 * @param {object} element The DOM element to check
 * @param {string|Object|Array} predicate The element selector / array to check
 * @return {boolean} Result wheter it matched or not
 */
const isPreviousSiblingIgnoreWhitespace = (element, predicate) => {
  const $prevSibling = $(element.previousSibling)

  if ($prevSibling.is(predicate)) return true

  const isPrevSiblingWithWhitespace =
    element.previousSibling &&
    element.previousSibling.data &&
    !element.previousSibling.data.trim() &&
    $(element.previousSibling.previousSibling).is(predicate)

  if (isPrevSiblingWithWhitespace) return true

  return false
}

export default isPreviousSiblingIgnoreWhitespace
