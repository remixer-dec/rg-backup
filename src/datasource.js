class DataSource {
    constructor() {}
    getMetadata() {}
    getAppInfo() {}
}

class V2DataSource extends DataSource {
    contentDirs = ['apps', 'games', 'cgames', 'sapps', 'sgames']
    constructor() {
        super()
        this.host = 'http://127.0.0.1:8081/'
    }
    async getMetadata(dir) {
        return await fetchJSON(this.host + dir + '/data/v2data.json')
    }
    async getAppInfo(dir, id) {
        let data = await fetchJSON(this.host + dir + '/data/all/' + id + '.json')
        let mirror = localStorage['lmirror']
        if (!data) {
            alert(locale.nodata)
            return false
        }
        if (!data.files) return data
        for (let i = 0, id = 0, l = data.files.length, none = '_self', blank = '_blank'; i<l; i++) {
            for (let y=0, links=data.files[i].links, l2=links.length; y<l2; y++, id++) {
                links[y].type = links[y].file.slice(1 + links[y].file.lastIndexOf('.')).toUpperCase() || '???'
                links[y].size = links[y].type != 'JAD' ? data.files[i].size : ''
                links[y].url = mirror ? `${mirror}${app.selectedDir}/${links[y].file}` : "javascript:alert('" + locale.nomirror + "')"
                links[y].target = mirror ? blank : none
                links[y].id = 'x' + id
            }
        }
        return data
    }
}

class DataSourceManager {
    constructor(SelectedDataSource) {
        this.ds = new SelectedDataSource()
    }
    async loadMetadata() {
        if (this.ds.contentDirs.indexOf(app.selectedDir) === -1) return
        app.loading = true
        let sel = app.selectedDir
        let meta = await this.ds.getMetadata(sel)
        app.meta[sel] = meta       
        app.meta[sel]['all'] = this.combineAllCategories(sel)
        if (!app.sortedMeta[app.selectedDir]) {
            this.sortByAlpha()
        }
        return meta
    }
    async loadAppInfo() {
        let dir = app.selectedDir
        let id = app.selectedId
        app.selectedApp = await this.ds.getAppInfo(dir, id)
    }
    combineAllCategories(dir) {
        /* //alternative (as fast, less compatible, more readable)
        let all = locale.tabs[dir]
            .reduce((x, y) => x.push(app.meta[app.selectedDir][y[0]]) ? x : x , [])
            .flat()
        */
        const all = []
        let y = 0
        for (let i of locale.tabs[dir]) {
            for (let j=0, cat=app.meta[dir][i[0]], l=cat.length; j<l; j++) all[y++] = cat[j]
        }
        return all
    }
    swapSorted() {
        app.useEmptyMeta = true
        app.toggleSort()
    }
    async sortByAlpha() {
        let clone = JSON.parse(JSON.stringify(app.meta[app.selectedDir]))
        for (let cat in clone) {
            if (cat != 0) clone[cat].sort(alphasorter)
        }
        app.sortedMeta[app.selectedDir] = clone
        app.loading = false
    }
}

app.datasource = new DataSourceManager(V2DataSource)
