/**
 * Removes (unwraps) the currently selected element and only leaves the child nodes
 * @param  {object} wrapperElement The element to remove
 * @return {undefined}
 */
const unwrapElement = wrapperElement => {
  // place childNodes in document fragment
  const docFrag = document.createDocumentFragment()
  while (wrapperElement.firstChild) {
    const child = wrapperElement.removeChild(wrapperElement.firstChild)
    docFrag.appendChild(child)
  }

  // replace wrapperElement with document fragment
  wrapperElement.parentNode.replaceChild(docFrag, wrapperElement)
}

export default unwrapElement
