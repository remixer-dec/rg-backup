import Config from './config'
import Router from './router'
import * as PV from 'petite-vue'
import {DataSourceManager, V2DataSource} from './datasource'
import {V2IconLoader} from './icon'
import {V2RangedScreenshotLoader} from './screenshot'
import {selectMirrorPath} from './tools/mirrors'
import {D_MODES} from './enums'
import {EPromise} from './tools/utils'
import components from './components'
import initialize from './init'

let app = {
  selectedDir: 'apps',
  selectedCategory: 'all',
  selectedId: '',
  selectedPage: 1,
  selectedApp: false,
  virtual: {
    selectedId: '',
    selectedDir: ''
  },
  loading: true,
  prefix: '#/',
  meta: {},
  sortedMeta: {},
  datasource: {},
  alphasort: false,
  useEmptyMeta: false,
  initialized: new EPromise(),
  ui: '',
  config: new Config({
    displaymode: D_MODES.AdvancedPagination
  }),
  selectMirrorPath,
  get tabs() {
    let tabList = locale.tabs[this.selectedDir]
    if (!tabList) return locale.tabs.apps
    tabList = tabList.map(x => { return {id: x[0], tab: x[1]} })
    tabList.unshift(
      {id: 'all', tab: locale.all},
      {id: '0', tab: locale.top}
    )
    return tabList
  },
  get currentMeta() {
    // use empty array for 1 tick to force PetiteVue reactivity for objects with the same keys.
    // use meta / sorted meta otherwise, if data is not loaded, use empty array
    return this.useEmptyMeta
      ? []
      : (this.alphasort
        ? this.sortedMeta[this.selectedDir]
        : this.meta[this.selectedDir]
      ) || []
  },
  toggleSort() {
    this.alphasort = !this.alphasort
    this.selectedPage = 1
    PV.nextTick(() => (this.useEmptyMeta = false))
  }
}

const FirebaseScreenshotLoader = V2RangedScreenshotLoader.bind(null, 'https://firebasestorage.googleapis.com/', 'v0/b/rugame-db' + '.appspot.com/o/public%2F', true)

app = PV.reactive(app)
app.datasource = new DataSourceManager(V2DataSource, V2IconLoader, FirebaseScreenshotLoader, app)
Router.initialize(app)

window.app = app

initialize().then(() => {
  app.loading = false
  PV.createApp({
    ...components,
    D_MODES
  }).mount()
  if (!app.metaLoadingStarted) {
    app.datasource.loadMetadata(app.selectedDir)
      .then(() => { app.loading = false })
  }
  document.getElementsByClassName('container')[0].style.display = 'block'
  // hide splashscreen after loading
  setTimeout(() => window.splash.classList.add('spf'), 300)
  setTimeout(() => app.initialized.resolve(), 1000)
  setTimeout(() => window.splash.remove(), 21000)
  componentHandler.upgradeDom()
  document.fonts.load('24px Material Icons').then(() => {
    document.styleSheets[0].insertRule('.material-icons:after {content: attr(data-icon)}')
  })
})
