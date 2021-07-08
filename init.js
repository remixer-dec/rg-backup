let tabhtml = ''
let panelhtml = ''
let tthtml = ''
let isblogloaded = false
let blogposts = []

function addTab(type, id, name, hidden) {
    hidden = hidden ? ' hidden' : ''
    let tab = `<a class="${type}-tab mdl-layout__tab${hidden}" id="tab_${type}_${id}" href="#${type}_${id}"> ${name} </a>`
    let panel = `<section class="mdl-layout__tab-panel" id="${type}_${id}"><ul class="page-content mdl-list"></ul></section>`
    panelhtml += panel + '\n'
    tabhtml += tab + '\n'
}

function addTopTabs(type, hidden) {
    addTab(type, 'all', locale.all, hidden)
    addTab(type, 'top', locale.top, hidden)
}

function addTabs() {
    for (let cat in locale.tabs) {
        addTopTabs(cat, true)
        for (let tab of locale.tabs[cat]) {
            addTab(cat, tab[0], tab[1], true)
        }
    }
    addTab('t', '-1', 'chat', true)
    addTab('t', '-2', 'stats', true)
    addTab('t', '-3', 'blog', true)
    addTab('t', '-4', 'favourites', true)
    addTab('t', '-5', 'mirrors', true)
    return tabhtml
}

function addTooltips() {
    for (tt in locale.tooltips) {
        tthtml += `<div class="mdl-tooltip" data-mdl-for="${tt}">${locale.tooltips[tt]}</div>`
    }
    return tthtml
}

function relocate(hash) {
    document.location.hash = hash
}

function parseHash(url) {
    if (url.startsWith('#')) {
        url = window.location.origin + '/' + url
    }
    let h = new URL(url).hash.substr(1)
    let type = h.match(/^\/(apps|games|cgames|sapps|sgames)\/([0-9]+)\/?$/i)
    let blog = h.match(/\!\/blog\/?([0-9]+)?\/?/i)
    let bug = h.match(/apps_all/i)
    if (bug) {
        console.log('unknown MDL caching  bug!')
        setTimeout(componentHandler.upgradeDom, 300)
        setTimeout(() => {
            $('.' + cf + '-tab').click()
        }, 500)
    }
    if (blog) {
        cf = cf != 'custom' ? 'custom' : cf
        if (!isblogloaded) {
            showBlogPosts(false)
            $('#spinner').classList.add('hidden')
        }
        if (typeof blog[1] != 'undefined') {
            setTimeout(() => {
                $$('.blogpost').forEach((e) => {
                    if (e.id != 'blog_' + blog[1]) {
                        e.classList.add('hiddenpost')
                    } else {
                        e.classList.remove('hiddenpost')
                        e.classList.add('bpopened')
                    }
                })
            }, 120)
        } else {
            if ($('.bpopened')) {
                $('.bpopened').classList.remove('bpopened')
                $$('.blogpost').forEach((e) => {
                    e.classList.remove('hiddenpost')
                })
            }
        }
        return ['custom']
    }
    if (type) {
        let at = type[1]
        let id = parseInt(type[2])
        return [at, id]
    } else {
        if (h == '') {
            closeTheBox()
        }
        return false
    }
}

function locate(url) {
    let r = parseHash(url)
    if (r && r != 'custom') {
        getAppInfo(r[1], r[0])
    }
}

function hashHandler(e) {
    locate(e.newURL)
}

function initialize() {
    function addElement(e) {
        let p = new Promise((rs, rj) => {
            e.onload = () => rs()
            e.onerror = () => rj()
        })
        document.head.appendChild(e)
        return p
    }
    function loadScript(src) {
        let script = document.createElement('script')
        script.src = src
        return addElement(script)
    }
    function loadStyle(src) {
        let st = document.createElement('link')
        st.rel = 'stylesheet'
        st.href = src
        return addElement(st)
    }
    document.getElementsByTagName('html')[0].lang = locale.l
    window.alltabs.innerHTML += addTabs()
    window.tooltips.innerHTML += addTooltips()
    window.lists.innerHTML += panelhtml
    window.addEventListener('hashchange', hashHandler)
    loadScript('lib/material.min.js').then(() => {
        let items = [loadStyle('lib/material.light_green-blue.min.css'), loadStyle('style.min.css')]
        if (typeof fetch != 'function') {
            items.push(loadScript('https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.js'))
        }
        Promise.all(items).then(() => {
            loadScript('main.js')
        })
        loadScript('https://vk.com/js/api/openapi.js?121')
    })
}

function loadConfig(lsname, dvalue) {
    let c = localStorage[lsname] || dvalue
    return c == 'true'
}

setTimeout(initialize, 1)
