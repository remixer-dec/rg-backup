import {nextTick} from 'petite-vue'
export default class Router {
  static initialize(app) {
    if (app.prefix === '#/') {
      const pathParser = (e) => {
        const path = new URL(e.newURL).hash.slice(1)
        const parts = path.match(/^\/([a-z0-9]+)\/?(cat\/)?([a-z0-9]+)?\/?(info)?$/i)
        if (!parts || parts.length < 4) return
        // eslint-disable-next-line no-unused-vars
        const [fullPath, dir, category, id, virtual] = parts
        if (!virtual && dir !== 'ui') {
          app.virtual.selectedId = false
          app.virtual.selectedDir = false
          if (app.selectedDir !== dir) {
            app.useEmptyMeta = true
            app.selectedPage = 1
            nextTick(() => (app.useEmptyMeta = false))
          }
          app.selectedDir = dir
          app.ui = ''
          if (app.datasource && !app.meta[app.selectedDir]) {
            app.datasource.loadMetadata(app.selectedDir).then(() => {
              app.loading = false
            })
          }
        } else {
          app.ui = id
          if (virtual) {
            app.virtual.selectedId = id
            app.virtual.selectedDir = dir
            app.virtual.back = e.oldURL
          }
        }
        if (category && category === 'cat/') {
          app.selectedCategory = parseInt(id) || id
          app.selectedId = false
        } else if (id) {
          // id == 0 is not allowed
          const appId = parseInt(id) || ''
          if (app.selectedId) {
            app.selectedId = false
            nextTick(() => (app.selectedId = appId))
          } else {
            app.selectedId = appId
          }
        } else {
          app.selectedId = ''
          if (!(app.selectedCategory in app.currentMeta)) {
            app.selectedCategory = 'all'
          }
        }
        if (e.oldURL && e.oldURL.match(/search|favourites/)) {
          e.preventDefault()
          e.stopPropagation()
          return false
        }
      }
      window.onhashchange = pathParser
      pathParser({newURL: window.location.href})
    }
  }
}
