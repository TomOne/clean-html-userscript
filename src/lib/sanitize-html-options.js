// Remove some emtpy tags or those
// who only contain whitespace
const exclusiveFilter = frame =>
  ['a', 'p'].includes(frame.tag) &&
  !frame.text.trim()

// Replace no break spaces with normal spaces
const textFilter = text => text.replace(/\u00A0/g, ' ')

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
  exclusiveFilter,
  textFilter,
  transformTags: {
    'b': 'strong',
    'i': 'em',
  },
}

export default sanitizeHTMLOptions
