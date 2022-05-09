/* eslint-disable eqeqeq */
import $template from './html/favourites.html?raw'

class CollectionManager {
  constructor(name, params) {
    this.collection = JSON.parse(localStorage[name] || '{}')
    this.items = Object.entries(this.collection).map(([k, v]) => {
      return this.decodeAppInfo(v, k)
    })
    for (const item in params) {
      this[item] = params[item]
    }
  }

  decodeAppInfo(str, name) {
    const parts = str.substr(1).split('_')
    return {id: parseInt(parts[1], 32), dir: Object.keys(locale.tabs)[parts[0]], name}
  }

  encodeAppInfo({id, dir}) {
    return 'a' + Object.keys(locale.tabs).indexOf(dir) + '_' + parseInt(id).toString(32)
  }

  inCollection({id, dir}) {
    return this.items.find(x => x.id == id && x.dir === dir)
  }

  toggle({name, id, dir}) {
    if (this.inCollection({id, dir})) {
      const index = this.items.findIndex(x => x.id == id && x.dir === dir)
      this.items.splice(index, 1)
    } else {
      this.items.push({id, dir, name})
    }
  }
}

const favCollection = new CollectionManager('rg-fav', {
  $template,
  toggleAppStatus(appInfo) {
    this.toggle(appInfo)
    this.collection = this.items.reduce((all, x) => { all[x.name] = favCollection.encodeAppInfo(x); return all }, {})
    localStorage['rg-fav'] = JSON.stringify(this.collection)
  }
})

export default function Favourites(props) {
  return favCollection
}
