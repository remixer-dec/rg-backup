function QuickSettingsWindow(props) {
    return {
        $template: '#QuickSettingsWindow',
        mounted() {
            PetiteVue.nextTick(() => {
                componentHandler.upgradeDom()
                getmdlSelect.init('.getmdl-select')
                document.querySelector(`li[data-val="${app.config.displaymode}"]`).click()
            })
        },
        saveConfig() {
            ['icons', 'screenshots', 'archelper', 'displaymode'].forEach(x => {
                const configItem = document.getElementById('c' + x)
                app.config[x] = configItem.type === 'checkbox' ? configItem.checked : configItem.value
            })
            window.history.back()
        },
        switchLang() {
            localStorage['rg-lng'] = locale.l === 'en' ? 'ru' : 'en'
            window.location.reload()
        }
    }
}
