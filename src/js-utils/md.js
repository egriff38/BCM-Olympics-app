
let markdown = require('markdown-it')()
export default function md (text) {
  return markdown.render(text)
}
