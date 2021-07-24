const V = PetiteVue

const D_MODES = {Full: 0, Onscroll: 1, Pagination: 2, AdvancedPagination: 3}

let app = {
    displayMode: D_MODES.AdvancedPagination,
    selectedDir: 'apps',
    selectedCategory: 'all',
    selectedId: '',
    selectedPage: 1,
    selectedApp: false,
    prefix: '#/',
    meta: {},
    sortedMeta: {},
    alphasort: false,
    useEmptyMeta: false,
    ui: '',
    get tabs() {
        let tabList = locale.tabs[this.selectedDir]
        if (!tabList) return locale.tabs['apps']
        tabList = tabList.map(x => {return {id: x[0], tab: x[1]}})
        tabList.unshift(
            {id: 'all', tab: locale.all},
            {id: '0', tab: locale.top}
        )
        return tabList
    },
    get currentMeta() {
        //use empty array for 1 tick to force PetiteVue reactivity for objects with the same keys.
        //use meta / sorted meta otherwise, if data is not loaded, use empty array
        return this.useEmptyMeta ? [] :
              (this.alphasort?
                  this.sortedMeta[this.selectedDir] :
                  this.meta[this.selectedDir]
               ) || []
    },
    toggleSort() {
        this.alphasort = !this.alphasort
        V.nextTick(() => this.useEmptyMeta = false)
    }
}


app = V.reactive(app)
Router.initialize()
V.createApp({}).mount()
