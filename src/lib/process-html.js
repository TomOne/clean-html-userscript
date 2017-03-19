import sanitizeHTML from 'sanitize-html'
import $ from 'jquery'

import wrapImmediateSiblingsWithTag from './wrap-immediate-siblings-with-tag.js'
import unwrapElements from './unwrap-elements.js'
import sanitizeHTMLOptions from './sanitize-html-options.js'

/**
 * Transform the input DOM tree in the desired manner and clean it from
 * undesired tags and attributes
 * @param  {object} inputDOMTree The input DOM tree as DOM element
 * @return {string} the processed and clean HTML as string
 */
const processHTML = inputDOMTree => {
  // Remove p tags that are immediate children of li elements
  unwrapElements(inputDOMTree, 'li > p')

  const tmpElement = document.createElement('div')
  tmpElement.appendChild(inputDOMTree)

  const $inputDOMTree = $(tmpElement)

  wrapImmediateSiblingsWithTag({
    $elementsToWrap: $inputDOMTree.find('p.BulletList'),
    wrapperTag: '<ul>',
    transformSelectedElementsToTag: '<li>',
  })

  const transformedHTMLString = $inputDOMTree.html()
  const cleanHTML = sanitizeHTML(transformedHTMLString, sanitizeHTMLOptions).trim()

  return cleanHTML
}

export default processHTML
