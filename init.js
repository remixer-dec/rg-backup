const l = window.navigator.languages||[window.navigator.language]
locales = {
    en:{
        l:'en',
        notSupported:'Your browser does not support ES6. This app requires it.',
        tabs:{
            applications:[
                [3482,'ARCHIVERS'], [3483,'MULTIMEDIA'], [3484,'INTERNET'], [3485,'GPS'], [3486,'SYSTEM'], [3738,'MAPS'],
                [3739,'TRANSLATORS'], [4330,'JOKES'], [4715,'OTHER'], [75081,'EMULATORS'], [2171,'SMS COLLECTIONS'],
                [10727,'MESSEGENRS'], [10732,'OFFICE'], [5733,'BLUETOOTH'], [10810,'NEWS RSS WEATHER'],
                [10641,'GUIDES JOURNALS'], [10645,'ALARMS CLOCKS'], [13816,'STUDY CALCULATORS'], [22133,'SCREENSAVERS']
            ],
            games:[
                [3,'ARCADE'], [2,'ACTION'], [4,'CARDGAMES'], [5,'ONLINE'], [6,'RACING'], [7,'FIGHTING'], [8,'QUESTS'], [9,'RPG'], [10,'LOGICAL'],
                [6920,'TABLE'], [7169,'ADVENTURES'], [7135,'SIMULATORS'], [11,'STRATEGIES'], [12,'SHOOTERS'], [13,'SPORTS']
            ],
            cgames:[
                [195,'CARDGAMES'], [12,'ARCADE'], [2,'ACTION'], [328,'RACING'], [17,'FIGHTING'], [19,'QUESTS'], [13,'LOGICAL'],
                [389,'TABLE'], [4,'ONLINE'], [1513,'ADVENTURES'], [15,'RPG'], [358,'SIMULATORS'], [14,'SPORTS'], [7,'STRATEGIES'], [6,'SHOOTERS']
            ]
        },
        tooltips:{
            'appLink':'Go to the source', 'appViews':'Views', 'appDls':'Downloads',
            'appComments':'Comments', 'appBy':'Uploaded by', 'appVendor':'Developer',
            'appCat':'Category', 'appDate':'Uploaded', 'appUpdate':'Updated'
        },
        folders:{
            "applications": "Apps",
            "games":"Games",
            "cgames": "Chinese Games"
        },
        about:'About',
        about2:'This is a j2me game catalogue, created to backup all the info about all J2ME ROMS from rugame.mobi. See readme.md for more info.',
        all:'ALL',
        top:'TOP'
    },
    ru:{
        l:'ru',
        notSupported:'Ваш браузер устарел, данный сервис разработан с использованием современных стандартов, которые не поддерживаются вашим браузером.',
        tabs:{
            applications:[
                [3482,'АРХИВАТОРЫ'],[3483,'МУЛЬТИМЕДИЯ'],[3484,'ИНТЕРНЕТ'],[3485,'GPS'],[3486,'СИСТЕМНЫЕ'],[3738,'КАРТЫ СХЕМЫ'],
                [3739,'СЛОВАРИ ПЕРЕВОДЧИКИ'],[4330,'ПРИКОЛЫ'],[4715,'РАЗНОЕ'],[75081,'ЭМУЛЯТОРЫ'], [2171,'СБОРНИКИ СМС'],
                [10727,'ОБМЕН СООБЩЕНИЯМИ'], [10732,'ОФИСНЫЕ ОРГАНАЙЗЕРЫ'], [5733,'BLUETOOTH'],[10810,'НОВОСТИ RSS ПОГОДА'],
                [10641,'СПРАВОЧНИКИ ЖУРНАЛЫ'], [10645,'ВРЕМЯ ЧАСЫ БУДИЛЬНИКИ'],[13816,'УЧЕБА КАЛЬКУЛЯТОРЫ'], [22133,'СКРИНСЕЙВЕРЫ']
            ],
            games:[
                [3,'АРКАДЫ'],[2,'ACTION'],[4,'АЗАРТНЫЕ'],[5,'ONLINE'],[6,'ГОНКИ'],[7,'ДРАКИ'],[8,'КВЕСТЫ'],[9,'RPG'],[10,'ЛОГИЧЕСКИЕ'],
                [6920,'НАСТОЛЬНЫЕ'],[7169,'ПРИКЛЮЧЕНИЯ'],[7135,'СИМУЛЯТОРЫ'],[11,'СТРАТЕГИИ'],[12,'СТРЕЛЯЛКИ'],[13,'СПОРТИВНЫЕ']
            ],
            cgames:[
                [195,'АЗАРТНЫЕ'], [12,'АРКАДЫ'], [2,'ACTION'], [328,'ГОНКИ'], [17,'ДРАКИ'], [19,'КВЕСТЫ'], [13,'ЛОГИЧЕСКИЕ'],
                [389,'НАСТОЛЬНЫЕ'], [4,'ONLINE'], [1513,'ПРИКЛЮЧЕНИЯ'], [15,'RPG'], [358,'СИМУЛЯТОРЫ'], [14,'СПОРТИВНЫЕ'],
                [7,'СТРАТЕГИИ'], [6,'СТРЕЛЯЛКИ']
            ]
        },
        tooltips:{
            'appLink':'Перейти на сайт', 'appViews':'Просмотров', 'appDls':'Загрузок',
            'appComments':'Обсуждение', 'appBy':'Загрузил', 'appVendor':'Разработчик',
            'appCat':'Категория', 'appDate':'Добавлено', 'appUpdate':'Обновлено'
        },
        folders:{
            "applications": "Приложения",
            "games":"Игры",
            "cgames": "China-игры"
        },
        about:'О сервисе',
        about2:'Данный проект был разработан с целью архивирования данных о всех доступных j2me-приложениях с сайта rugame.mobi, на случай, если с ним что-то случится. Тем не менее, из публичного репозитория были вырезаны некоторые NSFW игры и категории. Также разработчик не несет ответственности за все предоставленные данные и файлы в папке all. Подробнее о бэкапе сайта в readme.md . Для работы с данным сервисом требуется современный брауезер с поддержкой ES6',
        all:'ВСЕ',
        top:'ТОП'
    }
}
var locale = (l.indexOf('ru')!=-1||l.indexOf('ru-RU')!=-1||l.indexOf('be')!=-1||l.indexOf('uk')!=-1)?locales.ru:locales.en
function check(){"use strict";try{eval("var es6 = (x)=>x+`${x}`")}catch(a){return!1}return!0}

let tabhtml = ''
let panelhtml = ''
let tthtml = ''
if(!check()){
    alert(locale.notSupported)
}
function addTab(type,id,name,hidden){
    hidden  = hidden ? ' hidden':''
    let tab = `<a class="${type}-tab mdl-layout__tab${hidden}" href="#${type}_${id}"> ${name} </a>`
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
    return tabhtml
}
function addTooltips(){
    for(tt in locale.tooltips){
        tthtml+= `<div class="mdl-tooltip" data-mdl-for="${tt}">${locale.tooltips[tt]}</div>`
    }
    return tthtml
}
function relocate(hash){
    document.location.hash=hash;
}
function scf(bw){
    return bw?(bw=='apps'?'applications':bw):(cf[0]=='a'?'apps':cf);
}
function parseHash(url){
    let h = new URL(url).hash.substr(1)
    let type = h.match(/^\/(apps|games|cgames)\/([0-9]+)$/i)
    if(type){
        let at = scf(type[1])
        let id = parseInt(type[2])
        return [at,id]
    } else{
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
    function loadScript(src){
        var script = document.createElement('script')
        script.src = src
        var p = new Promise((rs,rj)=>{
            script.onload = () => rs()
            script.onerror = () => rj()
        })
        document.head.appendChild(script)
        return p;
    }
    document.getElementsByTagName('html')[0].lang = locale.l
    window.alltabs.innerHTML += addTabs()
    window.tooltips.innerHTML += addTooltips()
    window.lists.innerHTML += panelhtml
    window.addEventListener("hashchange", hashHangler);
    loadScript("https://code.getmdl.io/1.3.0/material.min.js").then(()=>{
        loadScript("/main.js")
    })
}
setTimeout(initialize,1)
