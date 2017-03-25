/**
 * Run a function on every insertion of an iframe on the current document
 * @param {object} currentDocument The document interface where to start
 * the Mutation Observer
 * @param {function} execFunction The function to run. The first function
 * argument will be the iframe node
 */
const onInsertedIframe = (currentDocument, execFunction) => {
  const observer = new window.MutationObserver(mutations => {
    mutations.forEach(mutation => {
      [...mutation.addedNodes]
        .filter(node => node.tagName === 'IFRAME')
        .forEach(node => {
          execFunction(node)
        })
    })
  })

  const observerConfig = {
    childList: true,
    subtree: true,
  }

  const targetNode = currentDocument.body
  observer.observe(targetNode, observerConfig)
}

export default onInsertedIframe
