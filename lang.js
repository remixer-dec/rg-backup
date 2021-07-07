var l = window.navigator.languages||[window.navigator.language.substr(0,2).toLowerCase()]
locales = {
    en:{
        l:'en',
        notSupported:'Your browser does not support ES6. This app requires it. Please updete your browser if you want to use this project.',
        tabs:{
            apps:[
                [3482,'ARCHIVERS'], [3483,'MULTIMEDIA'], [3484,'INTERNET'], [3485,'GPS'], [3486,'SYSTEM'], [3738,'MAPS'],
                [3739,'TRANSLATORS'], [4330,'JOKES'], [4715,'OTHER'], [75081,'EMULATORS'], [2171,'SMS COLLECTIONS'],
                [10727,'MESSENGERS'], [10732,'OFFICE'], [5733,'BLUETOOTH'], [10810,'NEWS RSS WEATHER'],
                [10641,'GUIDES JOURNALS'], [10645,'ALARMS CLOCKS'], [13816,'STUDY CALCULATORS'], [22133,'SCREENSAVERS']
            ],
            games:[
                [3,'ARCADE'], [2,'ACTION'], [4,'CARDGAMES'], [5,'ONLINE'], [6,'RACING'], [7,'FIGHTING'], [8,'QUESTS'], [9,'RPG'], [10,'LOGICAL'],
                [6920,'TABLE'], [7169,'ADVENTURES'], [7135,'SIMULATORS'], [11,'STRATEGY'], [12,'SHOOTERS'], [13,'SPORTS']
            ],
            cgames:[
                [195,'CARDGAMES'], [12,'ARCADE'], [2,'ACTION'], [328,'RACING'], [17,'FIGHTING'], [19,'QUESTS'], [13,'LOGICAL'],
                [389,'TABLE'], [4,'ONLINE'], [1513,'ADVENTURES'], [15,'RPG'], [358,'SIMULATORS'], [14,'SPORTS'], [7,'STRATEGY'], [6,'SHOOTERS']
            ],
            sapps:[
                [9790, 'Archivers'], [36428, 'Audio Codecs'], [52342, 'Widgets'],
                [9791, 'GPS Navigators'], [37765, 'For PC'], [9787, 'Internet Messengers'], [9788, 'Multimedia'], [25141, 'Organizers'],
                [47167, 'Patches Mods Add-ons'], [28342, 'Translators'], [36427, 'Others'], [18972, 'System'], [19464, 'Utilities'],
                [24627, 'Study calculators'], [9789, 'FileManagers'], [11318, 'Alarm Clocks'], [21593, 'Office Readers'], [29585, 'Emulators'],
                [46777, 'Mods (for all)'], [37432, 'Mods 6-7-8'], [37433, 'Mods 9.1-9.3'], [37434, 'Mods 9.4']
            ],
            sgames:[
                [2107,'Action'],[47591,'J2ME ports'],[2115,'RPG'],[2108,'Cardgames'],[2114,'Arcade'],[2109,'Racing'],[47589,'Mods'],[2118,'Fighting'],[3129,'Quests'],[15717,'Puzzles'],[29540,'Simulators'],[2116,'Sports'],[5136,'Strategy'],[2117,'Shooters'],[48195,'S3 Puzzles'],[46761,'S3 Strategy & RPG'],[43217,'S3 Simulators'],[43215,'S3 Racing'],[43214,'S3 Sports'],[43213,'S3 Action'],[43212,'S3 Arcade']
            ]

        },
        tooltips:{
            'appLink':'Go to the source', 'appViews':'Views', 'appDls':'Downloads',
            'appComments':'Comments', 'appBy':'Uploaded by', 'appVendor':'Developer',
            'appCat':'Category', 'appDate':'Uploaded', 'appUpdate':'Updated'
        },
        folders:{
            'apps': 'Apps',
            'games':'Games',
            'cgames': 'Chinese Games',
            'sapps': 'S-Apps',
            'sgames': 'S-Games'
        },
        about:'Settings',
        about2:'This is a J2ME & Symbian app & game catalogue, created to preserve all the info about mobile apps and games from <a href="http://rugame.mobi">rugame.mobi</a>. This project does not include any game files. J2ME is registered trademark of Oracle. Symbian is registered trademark of Nokia',
        all:'ALL',
        top:'TOP',
        apps: 'apps',
        files: 'files',
        data: 'of data',
        ldb: 'list DB',
        idb: 'icon DB',
        scdb:'image DB',
        tdb: 'info DB',
        stats: 'Stats',
        copy: 'This website does not provide direct access to an archived copy. You have to manually click on the arrow after the result URL',
        nodata: 'This app is unavailable',
        arc0:'This file is named as "',
        arc1:'" and is probably located in the following parts of archive: ',
        arc2:'" and is probably located in the following part of archive: ',
        traffic:'This app loads a lot of data every time you reload it. We do not recommend to enable graphical content if you have limited data plan.',
        icons:'app-icons (1-10mb)',
        screenshots:'screenshots (6-36mb)',
        save:'save settings',
        cache:'caching',
        reload:'relod the app?',
        alphasort:'alphabeticall sorting',
        archivehelper:'multi-part archive helper', 
        pf: 'fix lags turning "all" tab off',
        pferr: 'This tab wad disabled in settings',
        src: 'Source',
        loadmore: 'show more',
        listmode: 'List rendering mode',
        pfull: 'full (for PC)',
        pload: 'per-scroll loading',
        ppage: 'pagination',
        found: 'results:',
        notfound: 'No results',
        favs: 'Favorites',
        mirrors: 'Mirrors',
        mirrormenu: "<div class='bpx'>In this version you can set up 1 file mirror:<br> <button class='mdl-button mdl-button--colored' onclick='selectMirrorPath()'>Set up path</button><br>Your local backup server can be used together with this app, to provide you with better file search options.<br></br> With any file-ralated questions please contact mirror owners. We are not responsible for those files</div>", 
        nomirror: 'Please, set up a mirror URL to download files from that mirror!', 
        related: 'Related apps'
    },
    ru:{
        l:'ru',
        notSupported:'Ваш браузер устарел, данный сервис разработан с использованием современных стандартов, которые не поддерживаются вашим браузером.',
        tabs:{
            apps:[
                [3482,'АРХИВАТОРЫ'],[3483,'МУЛЬТИМЕДИЯ'],[3484,'ИНТЕРНЕТ'],[3485,'GPS'],[3486,'СИСТЕМНЫЕ'],[3738,'КАРТЫ СХЕМЫ'],
                [3739,'СЛОВАРИ / ПЕРЕВОДЧИКИ'],[4330,'ЮМОР'],[4715,'РАЗНОЕ'],[75081,'ЭМУЛЯТОРЫ'], [2171,'СБОРНИКИ СМС'],
                [10727,'ОБМЕН СООБЩЕНИЯМИ'], [10732,'ОФИСНЫЕ / ОРГАНАЙЗЕРЫ'], [5733,'BLUETOOTH'],[10810,'НОВОСТИ / RSS / ПОГОДА'],
                [10641,'СПРАВОЧНИКИ / ЖУРНАЛЫ'], [10645,'ВРЕМЯ / ЧАСЫ / БУДИЛЬНИКИ'],[13816,'УЧЕБА / КАЛЬКУЛЯТОРЫ'], [22133,'СКРИНСЕЙВЕРЫ']
            ],
            games:[
                [3,'АРКАДЫ'],[2,'ACTION'],[4,'АЗАРТНЫЕ'],[5,'ONLINE'],[6,'ГОНКИ'],[7,'ДРАКИ'],[8,'КВЕСТЫ'],[9,'RPG'],[10,'ЛОГИЧЕСКИЕ'],
                [6920,'НАСТОЛЬНЫЕ'],[7169,'ПРИКЛЮЧЕНИЯ'],[7135,'СИМУЛЯТОРЫ'],[11,'СТРАТЕГИИ'],[12,'СТРЕЛЯЛКИ'],[13,'СПОРТИВНЫЕ']
            ],
            cgames:[
                [195,'АЗАРТНЫЕ'], [12,'АРКАДЫ'], [2,'ACTION'], [328,'ГОНКИ'], [17,'ДРАКИ'], [19,'КВЕСТЫ'], [13,'ЛОГИЧЕСКИЕ'],
                [389,'НАСТОЛЬНЫЕ'], [4,'ONLINE'], [1513,'ПРИКЛЮЧЕНИЯ'], [15,'RPG'], [358,'СИМУЛЯТОРЫ'], [14,'СПОРТИВНЫЕ'],
                [7,'СТРАТЕГИИ'], [6,'СТРЕЛЯЛКИ']
            ],
            sapps:[
                [9790,'Архиваторы'],[36428,'Аудио-кодеки'],[52342,'Виджеты'],
                [9791,'GPS / Навигаторы'],[37765,'Для ПК'],[9787,'Интернет / Мессенджеры'],[9788,'Мультимедия'],[25141,'Органайзеры'],
                [47167,'Патчи / Моды / Дополнения'],[28342,'Переводчики'],[36427,'Прочие'],[18972,'Системные'],[19464,'Утилиты'],
                [24627,'Учеба / калькуляторы'],[9789,'Файловые'],[11318,'Часы / Будильники'],[21593,'Читалки / Офисные'],[29585,'Эмуляторы'],
                [46777,'Моды (все)'],[37432,'Моды 6-7-8'],[37433,'Моды 9.1-9.3'],[37434,'Моды 9.4']
            ],
            sgames:[
                [2107,'Action'],[47591,'J2ME порты'],[2115,'RPG'],[2108,'Азартные'],[2114,'Аркады'],[2109,'Гонки'],[47589,'Моды'],[2118,'Драки'],[3129,'Квесты / Прилючения'],[15717,'Логические'],[29540,'Симуляторы'],[2116,'Спортивные'],[5136,'Стратегии'],[2117,'Стрелялки'],[48195,'S3 Логические'],[46761,'S3 Стратегии и RPG'],[43217,'S3 Cимуляторы'],[43215,'S3 Гонки'],[43214,'S3 Спортивные'],[43213,'S3 Action'],[43212,'S3 Аркады']
            ]
        },
        tooltips:{
            'appLink':'Перейти на сайт', 'appViews':'Просмотров', 'appDls':'Загрузок',
            'appComments':'Обсуждение', 'appBy':'Загрузил', 'appVendor':'Разработчик',
            'appCat':'Категория', 'appDate':'Добавлено', 'appUpdate':'Обновлено'
        },
        folders:{
            'apps': 'Приложения',
            'games':'Игры',
            'cgames': 'China-игры',
            'sapps': 'S-приложения',
            'sgames': 'S-игры'
        },
        about:'Настройки',
        about2:'Этот проект был разработан с целью архивирования данных обо всех доступных мобильных приложениях для старых платформ с сайта <a href="http://rugame.mobi">rugame.mobi</a>, на случай, если с ним что-то случится. Тем не менее, из публичного репозитория были вырезаны некоторые NSFW игры и категории. Данный проект не содержит самих приложений, а лишь предоставляет информационную базу о них. Разработчик не несет ответственности за все данные и файлы этого проекта. Авторские права на приложения принадлежат их разработчикам. Для работы с сервисом требуется современный браузер.',
        all:'ВСЕ',
        top:'ТОП',
        comments: 'Обсуждение',
        stats: 'Статистика',
        apps: 'мидлетов',
        files: 'файлов',
        data: 'данных',
        ldb: 'БД списков',
        idb: 'БД иконок',
        scdb:'БД скринов',
        tdb: 'БД текста',
        copy: 'выбранный сайт не даёт прямых ссылок на сохраненные копии сайтов, чтобы открыть копию, используйте стрелку рядом с адресом найденного результата',
        nodata: 'информация о данном приложении недоступна.',
        arc0:'Выбран файл (',
        arc1:'), он скорее всего, находится между частями ',
        arc2:'), он скорее всего, находится в части архива №',
        traffic:'Сервис загружает много данных при каждой перезагрузке и может расходовать трафик. Если у вас ограничен трафик, не рекомендуется включать загрзуку графического контента. Отображение иконок также может замедлять сервис во время первичных загрузок.',
        icons:'иконки (1-10мб)',
        screenshots:'скриншоты (6-36мб)',
        save:'сохранить',
        cache:'кэшировать',
        reload: 'перезагрузить для применения изменений?',
        alphasort: 'алфавитная сортировка',
        archivehelper: 'помощник для .part архивов', 
        pf: 'не использовать вкладку "все" (устраняет лаги)',
        pferr: 'эта вкладка была отключена в настройках',
        src:'Источник',
        loadmore: 'показать ещё',
        listmode: 'Режим отображения списков',
        pfull: 'Полный (рек. только для ПК)',
        pload: 'Подгружаемый',
        ppage: 'Постраничный',
        found: 'Всего найдено:',
        notfound: 'нет результатов в загруженных разделах',
        favs: 'Избранное',
        mirrors: 'Зеркала', 
        mirrormenu: "<div class='bpx'>На данный момент можно выбрать одно основное файловое зеркало:<br> <button class='mdl-button mdl-button--colored' onclick='selectMirrorPath()'>Указать путь</button><br>Примером использования может стать локальное зеркало. Это способ связать ваш локальный бэкап распакованных файлов и данный сервис.Необходимо указать путь до папки, или до вашего сервера. В корне указанной папки должны находиться отдельные папки для каждой категории.Их имена должны быть apps, games, cgames, sapps, sgames, внутри каждой из которых находятся распакованные файлы приложений с оригинальными именами. После привязки, выбранный вами файл будет загружаться из вашего же хранилища.<br><br>Если вы решите создать или разместить файловое зеркало и желаете опубликовать его на этом сайте, прочитайте подробнее в блоге, в конце поста о версии 2.8<br>По вопросам размещения файлов просьба обращаться напрямую к владельцам публичных зеркал.</div>", 
        nomirror: 'Зеркало не установлено.', 
        related: 'Связанные приложения'
    }
}
var locale = (l.indexOf('ru')!=-1||l.indexOf('ru-RU')!=-1||l.indexOf('be')!=-1||l.indexOf('uk')!=-1||l.indexOf('kk')!=-1)?locales.ru:locales.en
function check(){"use strict";try{eval("let es6 = (x)=>x+`${x}`")}catch(a){return!1}return!0}
if(!check()){
    alert(locale.notSupported)
} else{
    if(!('foreach' in NodeList.prototype)){//Firefox OS fix
        NodeList.prototype.forEach = Array.prototype.forEach
    }
    if(localStorage['rg-lng']){
        locale = locales[localStorage['rg-lng']];
    }
    document.querySelectorAll('.lc').forEach(function(e){e.innerHTML=locale[e.innerHTML]})
}
