'use strict'

import processHTML from './lib/process-html.js'
import HTMLToDocumentFragment from './lib/html-to-document-fragment.js'
import prepareSuccessNotification from './lib/prepare-success-notification.js'
import triggerSuccessNotification from './lib/trigger-success-notification.js'

prepareSuccessNotification()

const pasteEvent = (documentContext, handler) =>
  documentContext.addEventListener('paste', handler)

const onPaste = event => {
  const containsHTML = event.clipboardData.types.includes('text/html')
  const selectorForTargetElement = '[contenteditable]:not(.clean-html-userscript-disabled)'
  // Only proceed if the target element or one of its ancestors are contenteditable,
  // otherwise interrupt execution
  if (!(containsHTML && event.target.closest(selectorForTargetElement))) return

  // Prevent the default pasting of the clipboard content
  event.preventDefault()
  const clipboardHTML = event.clipboardData.getData('text/html')
  const tempElement = HTMLToDocumentFragment(clipboardHTML)
  const transformedHTML = processHTML(tempElement)

  // Use the correct document context if the active element is an iframe
  const targetDocument = document.activeElement.tagName === 'IFRAME'
    ? document.activeElement.contentDocument
    : document

  targetDocument.execCommand('insertHTML', false, `<html><body>${transformedHTML}</body></html>`)
  triggerSuccessNotification()
}

// Recursively add the event listener to all iframes if they exist in the document
const recursivePasteEventListener = (currentDocument) => {
  pasteEvent(currentDocument, onPaste)
  const iframes = currentDocument.querySelectorAll('iframe')
  ;[...iframes].forEach(iframe => {
    recursivePasteEventListener(iframe.contentDocument)
  })
}

// TODO: use events to check if the document/iFrame has loaded instead
// of a clumsy setTimeout
setTimeout(() => {
  recursivePasteEventListener(document)
}, 3000)
