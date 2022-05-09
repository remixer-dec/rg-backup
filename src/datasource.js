import {fetchJSON} from './tools/utils.worker'
import {addCachedTarget} from './search.worker'
import {alphasorter} from './tools/utils'

let app = {}

class DataSource {
  constructor() {}
  getMetadata() {}
  getAppInfo() {}
}

class V2DataSource extends DataSource {
  contentDirs = ['apps', 'games', 'cgames', 'sapps', 'sgames']
  constructor(host = 'https://rugame.ml/') {
    super()
    this.host = host
  }

  async getMetadata(dir) {
    return await fetchJSON(this.host + dir + '/data/v2data.json')
  }

  async getAppInfo(dir, id) {
    const data = await fetchJSON(this.host + dir + '/data/all/' + id + '.json')
    const mirror = localStorage.lmirror
    if (!data) {
      alert(locale.nodata)
      return false
    }
    if (!data.files) return data
    for (let i = 0, id = 0, l = data.files.length, none = '_self', blank = '_blank'; i < l; i++) {
      for (let y = 0, links = data.files[i].links, l2 = links.length; y < l2; y++, id++) {
        links[y].type = links[y].file.slice(1 + links[y].file.lastIndexOf('.')).toUpperCase() || '???'
        links[y].size = links[y].type !== 'JAD' ? data.files[i].size : ''
        links[y].url = mirror ? `${mirror}${app.selectedDir}/${links[y].file}` : "javascript:alert('" + locale.nomirror + "')"
        links[y].target = mirror ? blank : none
        links[y].id = 'x' + id
      }
    }
    return data
  }
}

class DataSourceManager {
  constructor(SelectedDataSource, SelectedIconLoader, SelectedScreenshotLoader, appObj) {
    app = appObj
    this.ds = new SelectedDataSource()
    this.icons = new SelectedIconLoader()
    this.screenshots = new SelectedScreenshotLoader()
  }

  async loadMetadata(dir) {
    if (this.ds.contentDirs.indexOf(dir) === -1) return
    app.loading = true
    app.metaLoadingStarted = true
    const meta = await this.ds.getMetadata(dir)
    const all = this.combineAllCategories(dir, meta)
    addCachedTarget(dir, all)
    app.meta[dir] = meta
    app.meta[dir].all = all
    if (!app.sortedMeta[dir]) {
      this.sortByAlpha(dir)
    }
    return meta
  }

  async loadAppInfo() {
    const dir = app.virtual.selectedDir || app.selectedDir
    const id = app.virtual.selectedId || app.selectedId
    app.selectedApp = await this.ds.getAppInfo(dir, id)
  }

  combineAllCategories(dir, src) {
    /* //alternative (as fast, less compatible, more readable)
        let all = locale.tabs[dir]
            .reduce((x, y) => x.push(app.meta[app.selectedDir][y[0]]) ? x : x , [])
            .flat()
        */
    const all = []
    let y = 0
    for (const i of locale.tabs[dir]) {
      for (let j = 0, cat = src[i[0]], l = cat.length; j < l; j++) all[y++] = cat[j]
    }
    return all
  }

  swapSorted() {
    app.useEmptyMeta = true
    app.toggleSort()
  }

  async sortByAlpha(dir) {
    const clone = JSON.parse(JSON.stringify(app.meta[dir]))
    for (const cat in clone) {
      // eslint-disable-next-line eqeqeq
      if (cat != 0) clone[cat].sort(alphasorter)
    }
    app.sortedMeta[dir] = clone
  }
}

export {DataSource, V2DataSource, DataSourceManager}
