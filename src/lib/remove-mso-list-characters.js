/**
 * Removes the characters that MS Office products put before each list item.
 * This function is best used before a transformation of lists copied from
 * MS Office to proper HTML lists (<ul> or <ol>)
 * @param {string} input The input HTML string
 * @return {string}
 */
const removeMsoListCharacters = input => input
  .replace(/<!--\[if !supportLists\]-->[\s\S]*?<!--\[endif\]-->/g)

export default removeMsoListCharacters
