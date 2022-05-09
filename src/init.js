export default function initialize() {
  document.getElementsByTagName('html')[0].lang = locale.l
  const items = [import('./lib/material.min.js'), import('./styles/material.light_green-blue.css')]
  return Promise.all(items).then(() => {
    items.push(import('./styles/style.css'))
    if (typeof fetch !== 'function') {
      items.push(import('https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.js'))
    }
    return Promise.all(items)
  })
}
