import j2meIcon from './icons/10.svg'
import symbianIcon from './icons/11.svg'
import {fetchJSON} from './tools/utils.worker'
import {nextTick} from 'petite-vue'

let icons = []
const loadedDirs = {}

class IconLoader {
  constructor() {
    icons = new Map(Object.entries({}))
  }

  getIcon(appId, dir) {
    const iconId = dir + appId
    return icons.get(iconId) || this.getDefaultIcon(dir)
  }

  getDefaultIcon(dir) {
    return dir.startsWith('s') ? symbianIcon : j2meIcon
  }
}

class V2IconLoader extends IconLoader {
  constructor() {
    super()
  }

  getIcon(appId, dir) {
    if (app.config.icons) {
      if (!(dir in loadedDirs)) {
        if (app.datasource.ds.contentDirs.indexOf(dir) === -1) return this.getDefaultIcon(dir)
        loadedDirs[dir] = false
        fetchJSON(app.datasource.ds.host + dir + '/data/icons.json').then(iconJSON => {
          loadedDirs[dir] = iconJSON.length === 0 ? false : iconJSON
          app.initialized.then(() => {
            app.useEmptyMeta = true
            nextTick(() => (app.useEmptyMeta = false))
          })
        })
      }
      if (typeof loadedDirs[dir] === 'object') {
        const icon = loadedDirs[dir]['i' + appId]
        return icon ? 'data:image/png;base64,' + icon : this.getDefaultIcon(dir)
      }
      return super.getIcon(appId, dir)
    } else {
      return this.getDefaultIcon(dir)
    }
  }
}

export {IconLoader, V2IconLoader}
