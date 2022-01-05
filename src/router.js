class Router {
    static initialize() {
        if (app.prefix === "#/") {
            const pathParser = (e) => {
                let path = new URL(e.newURL).hash.slice(1)
                let parts = path.match(/^\/([a-z0-9]+)\/?(cat\/)?([a-z0-9]+)?\/?$/i)
                if (!parts || parts.length < 4) return
                let [fullPath, dir, category, id] = parts
                if (dir != 'ui') {
                    if (app.selectedDir !== dir) {
                        app.useEmptyMeta = true
                        V.nextTick(() => app.useEmptyMeta = false)
                    }
                    app.selectedDir = dir
                    app.ui = ''
                    if (app.datasource && !app.meta[app.selectedDir]) {
                        app.datasource.loadMetadata()
                    }
                } else {
                    app.ui = id
                }
                if (category && category === 'cat/') {
                    app.selectedCategory = parseInt(id) || id
                    app.selectedId = false
                } else if (id) {
                    //id == 0 is not allowed
                    const appId = parseInt(id) || ''
                    if (app.selectedId) {
                        app.selectedId = false
                        V.nextTick(() => app.selectedId = appId)
                    } else {
                        app.selectedId = appId
                    }
                } else {
                    app.selectedId = ''
                    if (!(app.selectedCategory in app.currentMeta)) {
                        app.selectedCategory = 'all'
                    }
                }
            }
            window.onhashchange = pathParser
            pathParser({newURL: window.location.href})
        }
    }
}
