import sanitizeHTML from 'sanitize-html'

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

  wrapImmediateSiblingsWithTag({
    elementsToWrap: tmpElement.querySelectorAll('p.BulletList'),
    wrapperTagName: 'ul',
    transformSelectedElementsToTag: 'li',
  })

  wrapImmediateSiblingsWithTag({
    elementsToWrap: tmpElement.querySelectorAll('p[class^="MsoListParagraph"]'),
    wrapperTagName: 'ul',
    transformSelectedElementsToTag: 'li',
  })

  const transformedHTMLString = tmpElement.innerHTML
  const cleanHTML = sanitizeHTML(transformedHTMLString, sanitizeHTMLOptions).trim()

  return cleanHTML
}

export default processHTML
