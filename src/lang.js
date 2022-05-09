import locales from './locales'
const l = window.navigator.languages || [window.navigator.language.substr(0, 2).toLowerCase()]

let locale = l.filter(x => ['ru', 'ru-RU', 'be', 'uk', 'kk'].indexOf(x) !== -1).length > 0 ? locales.ru : locales.en

if (localStorage['rg-lng']) {
  locale = locales[localStorage['rg-lng']]
}

locale.languages = Object.keys(locales)
window.locale = locale
export default locale
