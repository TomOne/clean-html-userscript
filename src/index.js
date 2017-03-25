'use strict'

import processHTML from './lib/process-html.js'
import HTMLToDocumentFragment from './lib/html-to-document-fragment.js'
import prepareSuccessNotification from './lib/prepare-success-notification.js'
import triggerSuccessNotification from './lib/trigger-success-notification.js'
import onInsertedIframe from './lib/on-inserted-iframe.js'

const pasteEvent = (documentContext, handler) =>
  documentContext.addEventListener('paste', handler)

// The entire logic that happens on a paste event in a contenteditable
// element, provided the clipboard’s content is HTML data. Performs the
// HTML cleanup and programmatic pasting afterwards.
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

// Insert necessary markup/CSS for the notification
prepareSuccessNotification()

// Attach the past event to the current document (does not affect iframes)
pasteEvent(document, onPaste)

// Attach the paste event listener to all iframes loaded
// prior DOMContentLoaded
;[...document.querySelectorAll('iframe')].forEach(iframe => {
  pasteEvent(iframe.contentDocument, onPaste)
})

// Attach the event listener for pasting on iframes inserted
// after DOMContentLoaded (using Mutation Observer)
onInsertedIframe(document, iframe => {
  pasteEvent(iframe.contentDocument, onPaste)
})
