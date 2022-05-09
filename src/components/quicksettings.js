import $template from './html/quicksettings.html?raw'
import './css/quicksettings.css'
export default function QuickSettingsWindow(props) {
  return {
    $template,
    mounted() {},
    pModeSelection: [locale.pfull, locale.pload, locale.ppage, locale.ppage2]
      .map((x, i) => { return {value: i, text: x} }),
    saveConfig() {
      ['icons', 'screenshots', 'archelper', 'displaymode'].forEach(x => {
        const configItem = document.getElementById('c' + x)
        app.config[x] = configItem.type === 'checkbox' ? configItem.checked : configItem.value
      })
      window.history.back()
    },
    switchLang(lang) {
      localStorage['rg-lng'] = lang
      window.location.reload()
    }
  }
}
