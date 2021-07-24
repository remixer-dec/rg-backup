function QuickSettingsWindow(props) {
    return {
        $template: '#QuickSettingsWindow',
        mounted() {
            PetiteVue.nextTick(() => {
                componentHandler.upgradeDom()
            })
        }
    }
}
