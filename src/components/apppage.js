function AppPage(props) {
    return {
        item: false,
        $template: '#AppPage',
        archiveHelperFunction,
        sourceSpoilerOpen: false,
        starIterator: 1,
        get starIcon() {
            return this.starIterator && favCollection.inCollection() ? 'star' : 'star_border'
        },
        updateFavStatus(name) {
            favCollection.toggleAppStatus(name)
            this.starIterator++
        },
        async load() {
            try {
                await app.datasource.loadAppInfo()
            } catch(e) {
                console.error(e)
                return
            } 
            if (!app.selectedApp) {
                return
            }
            app.selectedApp.desc = this.transformDescription(app.selectedApp.desc)
            this.item = app.selectedApp
            let rtg = this.item.rating.rtg.split('/')
            PetiteVue.nextTick(() => {
                componentHandler.upgradeDom()
                this.$refs.p1.MaterialProgress.setProgress((rtg[0] * 100) / (parseInt(rtg[0]) + parseInt(rtg[1])))
            })
        },
        getRelatedAppName(id) {
            return app.meta[app.selectedDir]['all'].find(x => x[0] == id)
        },
        transformDescription(o) {
            return b64u(o).replace(/\/smile\//g, 'https://web.archive.org/web/0if_/http://rugame.mobi/smile/')
        },
        getLink() {
            return this.item.src || 'http://rugame.mobi/' + (app.selectedDir == 'cgames' ? 'china/' : 'game/') + app.selectedId
        },
        toggleSourceSpoiler() {
            this.sourceSpoilerOpen = !this.sourceSpoilerOpen
        }
    }
}
