import {defineConfig} from 'vite'
import {ViteWebfontDownload} from 'vite-plugin-webfont-dl'
import {FontSubsetMaker, UnusedCodeRemover, ComlinkDevFirefox} from './vite-plugins'
import {comlink} from 'vite-plugin-comlink'

const DEBUG_IN_FIREFOX = true

export default defineConfig(({command, mode}) => {
  let cfg = {
    root: 'src',
    plugins: [
      ViteWebfontDownload()
    ]
  }
  if (command === 'build') {
    // production specific config
    cfg = {
      ...cfg,
      plugins: [
        ...cfg.plugins,
        comlink(),
        // https://github.com/google/material-design-icons/blob/master/font/MaterialIcons-Regular.codepoints
        FontSubsetMaker({
          fontPath: 'lib/MaterialIcons-Regular.ttf',
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
