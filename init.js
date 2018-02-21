const l = window.navigator.languages||[window.navigator.language]
locales = {
    en:{},
    ru:{
        notSupported:'Ваш браузер устарел, данный сервис разработан с использованием современных стандартов, которые не поддерживаются вашим браузером.'
        tabs:{
            applications:{
                3482: 'АРХИВАТОРЫ',3483: 'МУЛЬТИМЕДИЯ',3484: 'ИНТЕРНЕТ',3485: 'GPS',3486: 'СИСТЕМНЫЕ',3738: 'КАРТЫ СХЕМЫ',
                3739: 'СЛОВАРИ ПЕРЕВОДЧИКИ',4330: 'ПРИКОЛЫ',4715: 'РАЗНОЕ',75081:'ЭМУЛЯТОРЫ', 2171: 'СБОРНИКИ СМС',
                10727:'ОБМЕН СООБЩЕНИЯМИ', 10732:'ОФИСНЫЕ ОРГАНАЙЗЕРЫ', 5733: 'BLUETOOTH',10810:'НОВОСТИ RSS ПОГОДА',
                10641:'СПРАВОЧНИКИ ЖУРНАЛЫ', 10645:'ВРЕМЯ ЧАСЫ БУДИЛЬНИКИ',13816:'УЧЕБА КАЛЬКУЛЯТОРЫ', 22133:'СКРИНСЕЙВЕРЫ'
            },
            games:{
                3: 'АРКАДЫ',2: 'ACTION',4: 'АЗАРТНЫЕ',5: 'ONLINE',6: 'ГОНКИ',7: 'ДРАКИ',8: 'КВЕСТЫ',9: 'RPG',10: 'ЛОГИЧЕСКИЕ',
                6920: 'НАСТОЛЬНЫЕ',7169: 'ПРИКЛЮЧЕНИЯ',7135: 'СИМУЛЯТОРЫ',11: 'СТРАТЕГИИ',12: 'СТРЕЛЯЛКИ',13: 'СПОРТИВНЫЕ'
            },
            cgames:{
                195: 'АЗАРТНЫЕ', 12: 'АРКАДЫ', 2: 'ACTION', 328: 'ГОНКИ', 17: 'ДРАКИ', 19: 'КВЕСТЫ', 13: 'ЛОГИЧЕСКИЕ',
                389: 'НАСТОЛЬНЫЕ', 4: 'ONLINE', 1513: 'ПРИКЛЮЧЕНИЯ', 15: 'RPG', 358: 'СИМУЛЯТОРЫ', 14: 'СПОРТИВНЫЕ',
                7: 'СТРАТЕГИИ', 6: 'СТРЕЛЯЛКИ'
            }
        },
        tooltips:{
            'appLink':'Перейти на сайт', 'appViews':'Просмотров', 'appDls':'Загрузок',
            'appComments':'Обсуждение', 'appBy':'Загрузил', 'appVendor':'Разработчик',
            'appCat':'Категория', 'appDate':'Добавлено', 'appUpdate':'Обновлено'
        },
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
        for(let tab in locale.tabs[cat]){
            addTab(cat,tab,locale.tabs[cat][tab],true)
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
function initialize(){
    window.alltabs.innerHTML += addTabs()
    window.tooltips.innerHTML += addTooltips()
    window.lists.innerHTML += panelhtml
}
setTimeout(initialize,1)
