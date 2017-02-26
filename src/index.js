'use strict'

import throttle from 'lodash.throttle'

import processHTML from './lib/process-html.js'
import getActiveElement from './lib/get-active-element.js'

const processHTMLFromRichTextEditor = () => {
  const activeElement = getActiveElement(document)
  if (!activeElement.matches('body[contenteditable=true]')) return false
  const newHTML = processHTML(activeElement)
  console.log(newHTML)
  activeElement.innerHTML = newHTML
}

const onKeyPress = event => {
  // If the user has pressed `Ctrl + y` or `Cmd + y`
  if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
    console.log('key pressed')
    processHTMLFromRichTextEditor()
  }
}

const keyDownEvent = (documentContext, handler) => documentContext.addEventListener(
  'keydown', throttle(handler, 500)
)

// Recursively add the key event listener to all iframes
const recursiveKeyEventListener = (currentDocument) => {
  console.log('event registered')
  keyDownEvent(currentDocument, onKeyPress)
  const iframes = currentDocument.querySelectorAll('iframe')
  ;[...iframes].forEach(iframe => {
    recursiveKeyEventListener(iframe.contentDocument)
  })
}

setTimeout(() => {
  recursiveKeyEventListener(document)
}, 3000)
