const fs = require('fs')
const axios = require('axios')
const {spawn} = require('child_process')

// creates font based with icons that are used in the project (requires fonttools binary)
function FontSubsetMaker({searchPattern, codePoint, extraIcons = [], fontPath}) {
  let unicodes = ''
  let fontName = ''
  return {
    name: 'font-subset-maker',
    enforce: 'post',
    async generateBundle(details, f) {
      const files = Object.keys(f)
      const fontPath = files.find(x => x.endsWith('woff2'))
      const htmlOrJSPaths = files.filter(x => x.endsWith('html') || x.endsWith('js'))

      fontName = 'dist/' + fontPath

      const icons = new Set()

      for (const path of htmlOrJSPaths) {
        const srcText = f[path].code ? f[path].code : f[path].source.toString()
        for (const i of srcText.matchAll(searchPattern)) {
          const found = i[1].match('\'') ? i[1].match(/(?<=')[^:']+(?=')/g) : [i[1]]
          for (const name of found) {
            icons.add(name)
          }
        }
      }
      const iconArr = [...icons, ...extraIcons]
      let fontstring = '5f-7a,30-39'

      const response = await axios.get(codePoint)
      const dict = response.data.split('\n').reduce((prev, current) => {
        const [name, code] = current.split(' ')
        if (name) {
          prev[name] = code
        }
        return prev
      }, {})

      for (const icon of iconArr) {
        fontstring += dict[icon] ? (',' + dict[icon]) : ''
      }
      unicodes = fontstring
    },
    async writeBundle() {
      const optimizer = spawn('fonttools',
        [
          'subset', fontPath,
          '--unicodes=' + unicodes,
          '--no-layout-closure',
          '--output-file=' + fontName,
          '--flavor=woff2'
        ]
      )
      optimizer.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })

      optimizer.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
      })
    }
  }
}

// removes unused css based on chrome's coverage export report
function UnusedCodeRemover(targets) {
  return {
    name: 'unused-code-remover',
    generateBundle(details, f) {
      for (const target of targets) {
        const name = `assets/${target.name}.${target.hash}.${target.ext}`
        if (name in f) {
          const coverage = JSON.parse(fs.readFileSync(`${target.path}/${target.name}.coverage.json`).toString('utf-8'))
          let output = ''
          const data = f[name].source

          // coverage reports does not support media ranges and keyframew, find them manually
          const mediaRanges = []
          for (const e of data.matchAll(/(@(media|keyframes)[^{]+{)((.|)[^}])+}}/gm)) {
            if (e[2] === 'media') {
              mediaRanges.push(
                {start: e.index, end: e.index + e[1].length}
              )
              mediaRanges.push(
                {start: e.index + e[0].length - 1, end: e.index + e[0].length}
              )
            } else {
              mediaRanges.push({start: e.index, end: e.index + e[0].length})
            }
          }
          coverage.ranges = [...coverage.ranges, ...mediaRanges].sort((a, b) => a.start - b.start)
          for (const i in coverage.ranges) {
            const range = coverage.ranges[i]
            if (i === 0) output += data.slice(0, range.start)
            output += data.slice(range.start, range.end)
          }
          f[name].source = output
        }
      }
    }
  }
}

// allows to use comlink in production, keeping dev mode in firefox
function ComlinkDevFirefox() {
  const workerSearcher =
  /\bnew\s+(ComlinkWorker)\s*\(\s*new\s+URL\s*\(\s*('[^']+'|"[^"]+"|`[^`]+`)\s*,\s*import\.meta\.url\s*\)\s*(.*)\)/g
  return {
    name: 'comlink-dev-firefox',
    transform(code, id) {
      if (!code.includes('ComlinkWorker')) return
      if (!id.endsWith('.js')) return
      code = code.replace(workerSearcher, (match, type, url, rest) => {
        return `await import(${url})`
      })
      return {
        code
      }
    }
  }
}

// replaces variables in html at build-time
function HTMLBuildAttributes(items) {
  return {
    name: 'html-build-attributes',
    transformIndexHtml(html, ctx) {
      for (const item in items) {
        html = html.replace('[[' + item + ']]', items[item])
      }
      return html
    }
  }
}

export {
  FontSubsetMaker,
  UnusedCodeRemover,
  ComlinkDevFirefox,
  HTMLBuildAttributes
}
