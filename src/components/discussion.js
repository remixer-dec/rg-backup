function Discussion(props) {
    return {
        $template: '#Discussion',
        mounted() {
            VK.init({apiId: 0x4f9438, onlyWidgets: true})
            VK.Widgets.Comments('vkcomments', {limit: 20, width: 'auto', attach: false})
        }
    }
}
