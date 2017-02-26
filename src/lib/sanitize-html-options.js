const sanitizeHTMLOptions = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'p',
    'a',
    'ul',
    'ol',
    'nl',
    'li',
    'b',
    'i',
    'strong',
    'em',
    'strike',
    'code',
    'hr',
    'br',
    'table',
    'thead',
    'caption',
    'tbody',
    'tr',
    'th',
    'td',
  ],
  allowedAttributes: {
    a: ['href', 'target'],
  },
  parser: {
    lowerCaseTags: true,
  },
  // Remove empty a tags
  exclusiveFilter: frame => frame.tag === 'a' && !frame.text.trim(),
  // Replace non breaking spaces with normal spaces
  textFilter: text => text.replace(/\u00A0/g, ' '),
  transformTags: {
    'b': 'strong',
    'i': 'em',
  },
}

export default sanitizeHTMLOptions
