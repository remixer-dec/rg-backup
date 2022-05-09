import {fetchJSON} from './tools/utils.worker'

const loadedDirs = {}
const loadedRangeDirs = {}

class ScreenshotLoader {
  getScreenshot(appId, dir) {
    return loadedDirs[dir]?.[appId]
  }
}
// TODO: Add support for multiple screenshots / video files
class V2RangedScreenshotLoader extends ScreenshotLoader {
  constructor(host, prefix = '', escapePath = false) {
    super()
    this.host = host
    this.prefix = prefix
    this.escapePath = escapePath
  }

  _parseComressedRangesFile(items) {
    const output = {}
    let globalOffset = 0
    for (let i = 0, l = items.length; i < l; i += 2) {
      let offset = 6 + (Math.log(items[i]) * Math.LOG10E + 1 | 0)
      const start = i === 0 ? --offset : offset + globalOffset
      const end = start + items[i + 1]
      globalOffset += offset + items[i + 1]
      output[items[i]] = [start, end]
    }
    return output
  }

  async getScreenshot(appId, dir) {
    const rangesFilePath = '/screenshots.ranges.json?alt=media'.replace(this.escapePath ? /\//g : false, '%2F')
    const screenshotsFilePath = '/screenshots.json?alt=media'.replace(this.escapePath ? /\//g : false, '%2F')

    if (app.config.screenshots) {
      // load ranges
      if (!(dir in loadedRangeDirs)) {
        await fetchJSON(this.host + this.prefix + dir + rangesFilePath).then(ranges => {
          loadedRangeDirs[dir] = this._parseComressedRangesFile(ranges)
          loadedDirs[dir] = {}
        })
      }
      let screenshot = false
      // try to load from cache
      if (typeof loadedDirs[dir] === 'object' && loadedDirs[dir][appId]) {
        screenshot = loadedDirs[dir][appId]
      }
      // load from file with range
      if (!screenshot && typeof loadedRangeDirs[dir] === 'object') {
        const range = loadedRangeDirs[dir][appId]
        if (!range) return false
        screenshot = await fetchJSON(
          this.host + this.prefix + dir + screenshotsFilePath,
          {headers: {range: 'bytes=' + range[0] + '-' + range[1]}}
        )
        loadedDirs[dir][appId] = screenshot
      }
      return screenshot ? 'data:image/jpeg;base64,' + screenshot : false
    }
    return false
  }
}

export {V2RangedScreenshotLoader, ScreenshotLoader}
