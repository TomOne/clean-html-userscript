/**
 * Returns the active element via document.activeElement. This also works with nested iframes.
 * @param  {object} currentDocument The document object of the context to check
 * @return {object} The active DOM element
 */
const getActiveElement = (currentDocument) => {
  const activeIsIframe = currentDocument.activeElement.tagName === 'IFRAME'
  // If the active element is not an iframe, it can be returned as end result
  if (!activeIsIframe) return currentDocument.activeElement

  // If the active element is an iframe, go one level deeper in finding
  // the active element
  return getActiveElement(currentDocument.activeElement.contentDocument)
}

export default getActiveElement
