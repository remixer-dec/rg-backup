import archiveHelperFunction from '../tools/archelper'
import Favourites from '../components/favourites'
import {nextTick} from 'petite-vue'
import {b64u} from '../tools/utils'
import $template from './html/apppage.html?raw'
import './css/apppage.css'

const favCollection = Favourites()

export default function AppPage(props) {
  return {
    $template,
    item: false,
    id: props.id,
    dir: props.dir,
    archiveHelperFunction,
    sourceSpoilerOpen: false,
    screenshot: false,
    starIterator: 1,
    get starIcon() {
      return this.starIterator && favCollection.inCollection(this) ? 'star' : 'star_border'
    },
    updateFavStatus(name) {
      this.name = name
      favCollection.toggleAppStatus(this)
      this.starIterator++
    },
    async load() {
      try {
        await app.datasource.loadAppInfo()
        this.getScreenshot()
      } catch (e) {
        console.error(e)
        return
      }
      if (!app.selectedApp) {
        return
      }
      app.selectedApp.desc = this.transformDescription(app.selectedApp.desc)
      this.item = app.selectedApp
      const rtg = this.item.rating.rtg.split('/')
      nextTick(() => {
        componentHandler.upgradeDom()
        this.$refs.p1?.MaterialProgress?.setProgress((rtg[0] * 100) / (parseInt(rtg[0]) + parseInt(rtg[1])))
      })
    },
    getRelatedAppName(id) {
      // eslint-disable-next-line eqeqeq
      return app.meta[this.dir].all.find(x => x[0] == id)
    },
    transformDescription(o) {
      return b64u(o).replace(/\/smile\//g, 'https://web.archive.org/web/0if_/http://rugame.mobi/smile/')
    },
    getLink() {
      return this.item.src || 'http://rugame.mobi/' + (this.dir === 'cgames' ? 'china/' : 'game/') + this.id
    },
    async getScreenshot() {
      this.screenshot = await app.datasource.screenshots.getScreenshot(this.id, this.dir)
    },
    toggleSourceSpoiler() {
      this.sourceSpoilerOpen = !this.sourceSpoilerOpen
    }
  }
}
