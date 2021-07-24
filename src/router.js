class Router {
    static initialize() {
        if (app.prefix === "#/") {
            window.onhashchange = (e) => {
                let path = new URL(e.newURL).hash.slice(1)
                let parts = path.match(/^\/([a-z0-9]+)\/?(cat\/)?([a-z0-9]+)?\/?$/i)
                if (!parts || parts.length < 4) return
                let [fullPath, dir, category, id] = parts
                if (dir != 'ui') {
                    app.selectedDir = dir
                    app.ui = ''
                } else {
                    app.ui = id
                }
                if (category && category === 'cat/') {
                    app.selectedCategory = parseInt(id) || id
                } else if (id) {
                    //id == 0 is not allowed
                    app.selectedId = parseInt(id) || ''
                } else app.selectedId = ''
            }
        }
    }
}
