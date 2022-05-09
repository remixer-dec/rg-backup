import {nextTick} from 'petite-vue'
import {findInMany} from '../search.worker'
import $QuickSearchTemplate from './html/quicksearch.html?raw'
import $SearchResultsTemplate from './html/searchresults.html?raw'
import './css/search.css'

let lastQuery = ''
function QuickSearch(props) {
  return {
    $template: $QuickSearchTemplate,
    resultsVisible: false,
    found: [],
    total: 0,
    lastInput: new Date().getTime(),
    lastQuery: '',
    mounted() {},
    handleInput(query) {
      this.lastInput = new Date().getTime()
      this.performSearch(query)
    },
    performSearch(query) {
      if (this.lastInput) {
        if (new Date().getTime() - this.lastInput > 600) this.lastInput = false
        else return setTimeout(this.performSearch, 620, query)
      } else return
      this.lastQuery = query
      lastQuery = query
      findInMany(app.selectedDir, query).then(f => {
        this.found = f.items.map(x => {
          return {link: `${app.prefix}${x[2]}/${x[0]}/info`, text: x[1], id: x[0], dir: x[2]}
        })
        this.total = f.total
      })
    },
    showResults() {
      this.resultsVisible = true
    },
    hideResults() {
      setTimeout(() => {
        this.resultsVisible = false
      }, 400)
    }
  }
}

function updateListItems(list, localeKey, selection, wrapper) {
  list.splice(0, list.length)
  if (this.searchSection in locale.folders) {
    return list.push(...Object[wrapper](locale[localeKey][selection]).map(x => { return {value: x[0], text: x[1]} }))
  }
}

function SearchResults(props) {
  return {
    $template: $SearchResultsTemplate,
    searchSection: 'any',
    searchDir: 'any',
    searchCategory: 'any',
    dirs: [],
    categories: [],
    results: [],
    showUpdated: 0,
    searches: 0,
    query: '',
    mounted() {
      this.searches = 0
      if (app.selectedCategory === 'run' && lastQuery !== '') {
        this.query = lastQuery
        this.search(true)
      }
    },
    // forcing reactivity for third party library
    updateDirs() {
      updateListItems.call(this, this.dirs, 'folders', this.searchSection, 'entries')
      this.searchCategory = 'any'
      this.searchDir = 'any'
      this.showUpdated++
      nextTick(() => this.showUpdated++)
    },
    updateCategories() {
      updateListItems.call(this, this.categories, 'tabs', this.searchDir, 'values')
      this.searchCategory = 'any'
      this.showUpdated++
      nextTick(() => this.showUpdated++)
    },
    async loadData() {
      let toLoad = Object.keys(locale.tabs)
      if (!(this.searchSection === 'any')) {
        if (this.searchDir === 'any') toLoad = toLoad.filter(x => Object.keys(locale.folders[this.searchSection]).indexOf(x) !== -1)
        else {
          toLoad = [this.searchDir]
        }
      }
      const searchInDirs = toLoad
      toLoad = toLoad.filter(x => !(x in app.meta))
      for (const loadable of toLoad) {
        await app.datasource.loadMetadata(loadable)
      }
      if (toLoad.length > 0) {
        await new Promise((resolve) => setTimeout(() => resolve(), 1000))
      }
      return searchInDirs
    },
    async search(autorun = false) {
      if (this.query.trim() === '') return
      this.results = []
      const searchInDirs = autorun ? [] : await this.loadData()
      findInMany('none', this.query, Infinity, searchInDirs).then(x => {
        let {items} = x
        if (this.searchCategory !== 'any') {
          items = items
            .filter(item => app.meta[this.searchDir][this.searchCategory].find(x => x[0] === item[0]))
        }
        app.loading = false
        app.selectedCategory = 'search'
        app.selectedPage = 1
        this.results = items
        this.searches++
      })
    }
  }
}

export {QuickSearch, SearchResults}
