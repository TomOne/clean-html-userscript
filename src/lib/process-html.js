import sanitizeHTML from 'sanitize-html'
import $ from 'jquery'

import wrapImmediateSiblingsWithTag from './wrap-immediate-siblings-with-tag.js'

import sanitizeHTMLOptions from './sanitize-html-options.js'

/**
 * Transform the input DOM tree in the desired manner and clean it from
 * undesired tags and attributes
 * @param  {object} inputDOMTree The input DOM tree as DOM element
 * @return {string} the processed and clean HTML as string
 */
const processHTML = inputDOMTree => {
  const $inputDOMTree = $(inputDOMTree)

  // Remove p tags that are immediate children of li elements
  $inputDOMTree.find('li > p').contents().unwrap()

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
