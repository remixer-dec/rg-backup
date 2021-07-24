class CollectionManager {
    constructor(name, params) {
        this.collection = JSON.parse(localStorage[name] || '{}')
        this.items = Object.entries(this.collection).map(([k,v]) => {
            return this.decodeAppInfo(v, k)
        })
        for (let item in params) {
            this[item] = params[item]
        }
    }
    decodeAppInfo(str, name) { 
        let parts = str.substr(1).split('_')
        return {id: parseInt(parts[1], 32), dir: Object.keys(locale.tabs)[parts[0]], name}
    }
    encodeAppInfo(id, dir) {
        return 'a' + Object.keys(locale.tabs).indexOf(dir) + '_' + id.toString(32)
    }
    inCollection() {
        return this.items.find(x => x.id == app.selectedId && x.dir === app.selectedDir)
    }
    toggle(name) {
        if (this.inCollection()) {
            let index = this.items.findIndex(x => x.id == app.selectedId && x.dir === app.selectedDir)
            this.items.splice(index, 1)
        } else {
            this.items.push({id: app.selectedId, dir: app.selectedDir, name})
        }
    }
}

let favCollection = new CollectionManager('rg-fav', {
    $template: '#Favourites',
    toggleAppStatus(name) {
        this.toggle(name)
        this.collection = this.items.reduce((all, x) => (all[x.name] = favCollection.encodeAppInfo(x.id, x.dir)) ? all : all, {})
        localStorage['rg-fav'] = JSON.stringify(this.collection)
    }
})

function Favourites(props) {
    return favCollection
}
