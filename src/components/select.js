import {nextTick} from 'petite-vue'
import $template from './html/select.html?raw'

let increment = 0
export default function Select(props) {
  return {
    $template,
    items: props.items || ('itemsArr' in props ? props.itemsArr.map((x) => { return {text: x, value: x} }) : []),
    id: props.id || 'select' + Date.now() + '_' + ++increment,
    dataType: props.dataType || 'string',
    icon: props.icon || false,
    label: props.label,
    topItem: props.topItem || false,
    hiddenId: props.hiddenId || 'hidden' + Date.now() + '_' + ++increment,
    onChange: props.onchange,
    selected: props.selected,
    cssclass: props.cssclass || '',
    value: '',
    ignoreChanges: true,
    mounted(e) {
      nextTick(() => {
        componentHandler.upgradeDom()
        getmdlSelect.init('.' + this.id)
        document.querySelector(`ul[for=${this.id}] li[data-val="${props.selected}"]`).click()
        setTimeout(() => { this.ignoreChanges = false }, 300)
      })
    },
    changed(e) {
      if (this.ignoreChanges) return
      this.value = e.target.parentElement.querySelector('input[type=hidden]').value
      if (this.onChange) {
        this.onChange(this.value)
      }
    }
  }
}
