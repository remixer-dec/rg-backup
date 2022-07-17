import {defineConfig} from 'vite'
import {ViteWebfontDownload} from 'vite-plugin-webfont-dl'
import {FontSubsetMaker, UnusedCodeRemover, ComlinkDevFirefox, HTMLBuildAttributes} from './vite-plugins'
import {comlink} from 'vite-plugin-comlink'
import {version} from './package.json'
import {execSync} from 'child_process'

const DEBUG_IN_FIREFOX = true

const BUILD_ATTRIBUTES = {
  BUILD_DATE: (new Date()).toLocaleDateString('en-GB'),
  BUILD_VERSION: version
}

export default defineConfig(({command, mode}) => {
  let cfg = {
    root: 'src',
    plugins: [
      HTMLBuildAttributes(BUILD_ATTRIBUTES),
      ViteWebfontDownload()
    ]
  }
  if (command === 'build') {
    // production specific config
    const COMMIT_HASH = execSync('git rev-parse --short HEAD').toString()
    BUILD_ATTRIBUTES.BUILD_VERSION += `@${COMMIT_HASH.slice(0, 7)}`
    cfg = {
      ...cfg,
      build: {
        outDir: '../dist'
      },
      plugins: [
        ...cfg.plugins,
        comlink(),
        // https://github.com/google/material-design-icons/blob/master/font/MaterialIcons-Regular.codepoints
        FontSubsetMaker({
          fontPath: 'src/lib/MaterialIcons-Regular.ttf',
          searchPattern: /data-icon="([^"]+)"/gm,
          codePoint: 'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints',
          extraIcons: 'smartphone tablet clear_all mode_comment book settings star star_border chevron_left chevron_right insert_link menu'.split(' ')
        }),
        UnusedCodeRemover([
          {
            name: 'material.light_green-blue',
            ext: 'css',
            hash: 'e4868944',
            path: 'styles'
          }
        ])
      ],
      worker: {
        plugins: [
          comlink()
        ]
      }
    }
  } else {
    cfg.plugins.push(DEBUG_IN_FIREFOX ? ComlinkDevFirefox() : comlink())
  }
  return cfg
})
