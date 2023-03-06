export default {
  l: 'en',
  notSupported: 'Your browser does not support ES6. This app requires it. Please update your browser if you want to use this project.',
  tabs: {
    apps: [
      [3482, 'ARCHIVERS'], [3483, 'MULTIMEDIA'], [3484, 'INTERNET'], [3485, 'GPS'], [3486, 'SYSTEM'], [3738, 'MAPS'],
      [3739, 'TRANSLATORS'], [4330, 'JOKES'], [4715, 'OTHER'], [75081, 'EMULATORS'], [2171, 'SMS COLLECTIONS'],
      [10727, 'MESSENGERS'], [10732, 'OFFICE'], [5733, 'BLUETOOTH'], [10810, 'NEWS RSS WEATHER'],
      [10641, 'GUIDES JOURNALS'], [10645, 'ALARMS CLOCKS'], [13816, 'STUDY CALCULATORS'], [22133, 'SCREENSAVERS']
    ],
    games: [
      [3, 'ARCADE'], [2, 'ACTION'], [4, 'CARDGAMES'], [5, 'ONLINE'], [6, 'RACING'], [7, 'FIGHTING'], [8, 'QUESTS'], [9, 'RPG'], [10, 'LOGICAL'],
      [6920, 'TABLE'], [7169, 'ADVENTURES'], [7135, 'SIMULATORS'], [11, 'STRATEGY'], [12, 'SHOOTERS'], [13, 'SPORTS']
    ],
    cgames: [
      [195, 'CARDGAMES'], [12, 'ARCADE'], [2, 'ACTION'], [328, 'RACING'], [17, 'FIGHTING'], [19, 'QUESTS'], [13, 'LOGICAL'],
      [389, 'TABLE'], [4, 'ONLINE'], [1513, 'ADVENTURES'], [15, 'RPG'], [358, 'SIMULATORS'], [14, 'SPORTS'], [7, 'STRATEGY'], [6, 'SHOOTERS']
    ],
    sapps: [
      [9790, 'Archivers'], [36428, 'Audio Codecs'], [52342, 'Widgets'],
      [9791, 'GPS Navigators'], [37765, 'For PC'], [9787, 'Internet Messengers'], [9788, 'Multimedia'], [25141, 'Organizers'],
      [47167, 'Patches Mods Add-ons'], [28342, 'Translators'], [36427, 'Others'], [18972, 'System'], [19464, 'Utilities'],
      [24627, 'Study calculators'], [9789, 'FileManagers'], [11318, 'Alarm Clocks'], [21593, 'Office Readers'], [29585, 'Emulators'],
      [46777, 'Mods (for all)'], [37432, 'Mods for v6-7-8'], [37433, 'Mods for v9.1-9.3'], [37434, 'Mods for v9.4']
    ],
    sgames: [
      [2107, 'Action'], [47591, 'J2ME ports'], [2115, 'RPG'], [2108, 'Cardgames'], [2114, 'Arcade'], [2109, 'Racing'], [47589, 'Mods'], [2118, 'Fighting'], [3129, 'Quests'], [15717, 'Puzzles'], [29540, 'Simulators'], [2116, 'Sports'], [5136, 'Strategy'], [2117, 'Shooters'], [48195, 'S3 Puzzles'], [46761, 'S3 Strategy & RPG'], [43217, 'S3 Simulators'], [43215, 'S3 Racing'], [43214, 'S3 Sports'], [43213, 'S3 Action'], [43212, 'S3 Arcade']
    ]
  },
  tooltips: {
    appLink: 'Go to the source',
    appViews: 'Views',
    appDls: 'Downloads',
    appComments: 'Comments',
    appBy: 'Uploaded by',
    appVendor: 'Developer',
    appCat: 'Category',
    appDate: 'Uploaded',
    appUpdate: 'Updated'
  },
  folders: {
    J2ME: {
      apps: 'Apps',
      games: 'Games',
      cgames: 'Chinese Games'
    },
    Symbian: {
      sapps: 'S-Apps',
      sgames: 'S-Games'
    }
  },
  search: {
    full: 'Advanced search',
    found: 'results:',
    notfound: 'No results',
    notfoundatall: 'No results',
    name: 'Title',
    catalogue: 'Catalogue',
    type: 'Type',
    category: 'Category',
    any: 'Any',
    anyF: 'Any',
    find: 'Search'
  },
  loading: 'Loading',
  about: 'Settings',
  about2: 'This is a J2ME & Symbian app & game catalogue, created to preserve all the info about mobile apps and games from <a href="http://rugame.mobi">rugame.mobi</a>. This project does not include any game files. J2ME is registered trademark of Oracle. Symbian is registered trademark of Nokia. Other names may be trademarks of their respective owners.',
  all: 'ALL',
  top: 'TOP',
  apps: 'apps',
  files: 'files',
  data: 'of data',
  ldb: 'list DB',
  idb: 'icon DB',
  scdb: 'image DB',
  tdb: 'info DB',
  stats: 'Stats',
  copy: 'This website does not provide direct access to an archived copy. You have to manually click on the arrow after the result URL',
  nodata: 'This app is unavailable',
  arc0: 'This file is named as "',
  arc1: '" and is probably located in the following parts of archive: ',
  arc2: '" and is probably located in the following part of archive: ',
  traffic: 'This app loads data every time you reload it. We do not recommend to enable graphical content if you have limited data plan.',
  icons: 'app-icons (1-10mb)',
  screenshots: 'screenshots (on demand)',
  save: 'save settings',
  cache: 'caching',
  reload: 'reload the app?',
  alphasort: 'alphabetical sorting',
  archivehelper: 'multi-part archive helper',
  pf: 'fix lags turning "all" tab off',
  pferr: 'This tab wad disabled in settings',
  src: 'Source',
  loadmore: 'show more',
  listmode: 'List rendering mode',
  pfull: 'full (legacy)',
  pfullcv: 'full (+virtual render)',
  pload: 'per-scroll loading',
  ppage: 'pagination',
  ppage2: 'optimized pagination',
  favs: 'Favorites',
  mirrors: {
    name: 'Mirrors',
    menu: "<div class='bpx'>In this version you can set up 1 file mirror:<br> <button class='mdl-button mdl-button--colored' onclick='app.selectMirrorPath()'>Set up path</button><br>Your local backup server can be used together with this app, to provide you with better file search options.<br></br> With any file-related questions please contact mirror owners. We are not responsible for those files</div>",
    no: 'Please, set up a mirror URL to download files from that mirror!',
    path: 'Enter the path to the root folder with application files',
    fileSchema: 'Browsers do not allow you to link directly to local files. As a solution, a window with a link to a local file will be shown. It can be copied and pasted into the address bar. As an alternative, you can put a local http server and use an http-link to the mirror'
  },
  related: 'Related apps'
}
