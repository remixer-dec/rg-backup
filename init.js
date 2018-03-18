let tabhtml = ''
let panelhtml = ''
let tthtml = ''

function addTab(type,id,name,hidden){
    hidden  = hidden ? ' hidden':''
    let tab = `<a class="${type}-tab mdl-layout__tab${hidden}" id="tab_${type}_${id}" href="#${type}_${id}"> ${name} </a>`
    let panel = `<section class="mdl-layout__tab-panel" id="${type}_${id}"><ul class="page-content mdl-list"></ul></section>`
    panelhtml += panel + '\n'
    tabhtml += tab + '\n'
}
function addTopTabs(type,hidden){
    addTab(type,'all',locale.all,hidden)
    addTab(type,'top',locale.top,hidden)
}
function addTabs(){
    for (let cat in locale.tabs){
        addTopTabs(cat,true)
        for(let tab of locale.tabs[cat]){
            addTab(cat,tab[0],tab[1],true)
        }
    }
    addTab('t','-1','chat',true)
    addTab('t','-2','stats',true)
    return tabhtml
}
function addTooltips(){
    for(tt in locale.tooltips){
        tthtml+= `<div class="mdl-tooltip" data-mdl-for="${tt}">${locale.tooltips[tt]}</div>`
    }
    return tthtml
}
function addStats(){
    let html = '';
    function addblock(){html+='<div class="mdl-grid"><div class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">';}
    function closeblock(){html+='</div></div>'}
    function ast(ic,n,txt){
        html+=`
        <a href="#"class="mdl-cell mdl-cell--5-col ai">
        <i class="material-icons">${ic}</i>${n}<br><small>${txt}</small>
        </a>`
    }
    addblock()
    ast('games',11212,locale.apps)
    ast('insert_drive_file',58830,locale.files)
    ast('storage','25+GB',locale.data)
    closeblock()
    addblock()
    ast('reorder','372KB',locale.ldb)
    ast('portrait','10MB',locale.idb)
    ast('important_devices','24MB',locale.scdb)
    ast('dns','45MB',locale.tdb)
    closeblock()
    html+='</div></div>'
    return html
}
function relocate(hash){
    document.location.hash=hash;
}
function scf(bw){
    return bw?(bw=='apps'?'applications':bw):(cf[0]=='a'?'apps':cf);
}
function parseHash(url){
    if(url.startsWith('#')){
        url=window.location.origin+'/'+url
    }
    let h = new URL(url).hash.substr(1)
    let type = h.match(/^\/(apps|games|cgames)\/([0-9]+)$/i)
    let bug = h.match(/applications_all/i)
    if(bug){
        console.log('unknown MDL caching  bug!')
        setTimeout(componentHandler.upgradeDom,300)
        setTimeout(()=>{$('.'+cf+'-tab').click()},500);
    }
    if(type){
        let at = scf(type[1])
        let id = parseInt(type[2])
        return [at,id]
    } else{
        if(h==''){
            closeTheBox()
        }
        return false;
    }
}
function locate(url){
    let r = parseHash(url)
    if(r){
        getAppInfo(r[1],r[0])
    }
}
function hashHangler(e){
    locate(e.newURL);
}
function initialize(){
    function addElement(e){
        let p = new Promise((rs,rj)=>{
            e.onload = () => rs()
            e.onerror = () => rj()
        })
        document.head.appendChild(e)
        return p;
    }
    function loadScript(src){
        let script = document.createElement('script')
        script.src = src
        return addElement(script)
    }
    function loadStyle(src){
        let st = document.createElement( "link" );
        st.rel = "stylesheet";
        st.href = src;
        return addElement(st)
    }
    document.getElementsByTagName('html')[0].lang = locale.l
    window.alltabs.innerHTML += addTabs()
    window.tooltips.innerHTML += addTooltips()
    window.lists.innerHTML += panelhtml
    document.querySelector('#t_-2').innerHTML=addStats()
    window.addEventListener("hashchange", hashHangler);
    loadScript("lib/material.min.js").then(()=>{
        let items = [
            loadStyle("lib/material.light_green-blue.min.css"),
            loadStyle("style.min.css")
        ]
        if(typeof fetch != 'function'){
            items.push(loadScript('https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.js'))
        }
        Promise.all(items).then(()=>{
                loadScript("main.js")
            })
        loadScript("https://vk.com/js/api/openapi.js?121")
    })
}
setTimeout(initialize,1)
