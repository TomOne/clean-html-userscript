const HTMLToDocumentFragment = HTMLString => {
  const templateElement = document.createElement('template')
  templateElement.innerHTML = HTMLString
  return templateElement.content
}

export default HTMLToDocumentFragment
