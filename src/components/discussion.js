/* eslint-disable no-undef */
export default function Discussion(props) {
  return {
    $template: '#Discussion',
    mounted() {
      if (typeof VK === 'undefined') {
        const openapi = document.createElement('script')
        openapi.onload = () => {
          VK.init({apiId: 0x4f9438, onlyWidgets: true})
          VK.Widgets.Comments('vkcomments', {limit: 20, width: 'auto', attach: false})
        }
        openapi.src = 'https://vk.com/js/api/openapi.js?121'
        document.head.appendChild(openapi)
      }
    }
  }
}
