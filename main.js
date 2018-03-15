if(check()){ //es6
    setTimeout(()=>{window.splash.classList.add('spf')},500)
    setTimeout(()=>window.splash.remove(),21000)
    componentHandler.upgradeDom()
    var localLinks = false;
    var screenshots = localStorage['rg-screenshots'] || true;
    screenshots = screenshots == 'true'
    var icons = localStorage['rg-icons'] || true;
    icons = icons == 'true'
    var cf = '' //current folder
    var $ = (q) => document.querySelector(q);
    var loaded = [];
    var lastinput = 0;
    var tt,ttt;//timers to optimize loading
    function fetchJSON(filename){
        console.log('loading '+filename)
        return new Promise((rs,rj)=>{
            fetch(filename).then((f)=>{
                f.json().then((j)=>{
                    rs(j);
                }).catch(e=>rj());
            });
        });
    }
    function b64u(str) { //base64 unicode
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    function addItem(type,xclass,text,to,href,id){
        var item = document.createElement(type);
        item.innerHTML = text;
        item.className = xclass;
        if(href){
            item.href = href;
        }
        if(id){
            item.id = id;
        }
        componentHandler.upgradeElement(item);
        $(to).appendChild(item);
    }
    function loadScreenshots(folder){
        if(screenshots){
            fetchJSON(cf+'/data/screenshots.json').then((sc)=> {
                window['scr_'+folder] = sc;
                loaded[folder].confirm()
                loaded[folder].confirmed = 1
            });
        }
    }
    function selectSection(folder){
        $('.mds').classList.remove('mds')
        $('#me-'+folder).classList.add('mds')
        if(cf==folder){return}
        document.querySelectorAll('.'+cf+'-tab').forEach((e)=>{e.classList.add('hidden')});
        cf = folder;
        document.querySelectorAll('.'+cf+'-tab').forEach((e)=>{e.classList.remove('hidden')});
        if(!(folder in loaded)){ //load only once
        $('#spinner').classList.remove('hidden');
        loaded[folder] = {confirmed:0}
        loaded[folder].all = new Promise((res,rej)=>{loaded[folder].confirm = res})
        if(window.location.hash.length > 1){
            setTimeout(locate,1,window.location.href)
        }
            fetchJSON(folder+'/data/cats.json').then((j)=>{
                tt = ttt = 0;
                if(icons){
                    fetchJSON(cf+'/data/icons.json').then((ic)=>{
                        loadScreenshots(folder)
                        window['icons_'+folder] = ic;
                        setTimeout(loadAppList,tt,j,ic);
                        setTimeout(()=>{$('.'+folder+'-tab').click()},tt);
                    });
                } else{
                    loadScreenshots(folder)
                    setTimeout(loadAppList,tt,j,[]);
                    setTimeout(()=>{$('.'+folder+'-tab').click()},tt);
                }
            });
        } else {
            $('.'+cf+'-tab').click();
        }
    }
    function autoSelectSection(){
        cscreenshots.checked == screenshots? 1 : cscreenshots.parentElement.click()
        cicons.checked == icons? 1 : cicons.parentElement.click()
        if(window.location.hash.length>1){
            selectSection(parseHash(window.location.hash)[0]||'applications')
        }else{
            selectSection('applications');
        }
    }
    function loadAppList(cats,ic){
        fetchJSON(cf+'/data/v2data.json').then((al)=>{
            let all = '';
            for(let cat of cats){
            let list = '';
            for(var app of al[cat.id]){
                let icon = ic['i'+app[0]];
                if(icon){
                    icon = 'data:image/png;base64,'+icon;
                } else {
                    icon = '10.png'
                }
                list += `
                <li class="mdl-list__item" onclick="relocate('#/${scf()}/${app[0]}')">
                  <span class="mdl-list__item-primary-content">
                  <img class="mdl-list__item-icon appic" data-src="${icon}">
                  <span class="mdl-list__item-text-body">${app[1]}</span>
                  </span>
                  <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" href="#/${scf()}/${app[0]}"><i class="mi hidden">info</i></a>
                  </span>
                </li>
                `;
            }
            if(cat.id=="0"){cat.id="top"}
                setTimeout(insertAppList,ttt,$(`#${cf}_${cat.id}`).firstChild,list);
                ttt+=20;
                if(cat.id != 'top'){
                    all += list;
                }
                if(cats[cats.length-1].id==cat.id){
                    setTimeout(insertAppList,10,$(`#${cf}_all`).firstChild,all);
                    ttt+=50;
                    setTimeout(()=>{
                        document.querySelectorAll('.mi.hidden').forEach((k,v)=>{k.className = 'material-icons'})
                        document.querySelectorAll('.appic').forEach((k,v)=>{if(k.src==''){k.src = k.getAttribute('data-src')}})
                    },ttt)
                    ttt+=250
                    setTimeout(()=>{
                        $('#spinner').classList.add('hidden')
                        all = undefined
                    },ttt);
                }
        }});
    }
    function insertAppList(el,list,add){
        console.log('loading:'+el.parentElement.id);
        el.innerHTML = add?el.innerHTML+list:list;
    }
    function optsearch(){
        lastinput = new Date().getTime()
        fastsearch();
    }
    function fastsearch(){
        if(lastinput){
            if(new Date().getTime() - lastinput > 700){
                lastinput = false;
            } else {
                return setTimeout(fastsearch,720);
            }
        } else {
            return;
        }
        console.log('seaching')
        var text = $('#fixed-header-drawer-exp').value;
        var t = new RegExp(text,'im');
        if(text!=''){
            document.querySelectorAll('.mdl-layout__tab-panel.is-active .mdl-list__item').forEach((e)=>{
                e.classList.add('hidden')
            });
            document.querySelectorAll('.mdl-layout__tab-panel.is-active .mdl-list__item').forEach((e)=>{
                if(e.children[0].children[1].innerHTML.match(t)){
                    setTimeout((e)=>e.classList.remove('hidden'),0,e);
                }
            });
        } else{
            document.querySelectorAll('.mdl-layout__tab-panel.is-active .mdl-list__item').forEach((e)=>{
                e.classList.remove('hidden')
            });
        }
    }
    function getMLink(e,filename){
        const filters = []
        const links = {
            applications: 'aHR0cHM6Ly9tZWdhLm56LyNGIWplSkFFWTVJIWczcWdzNWhPTUV6UzdDZVRCTnFzWEE=',
            games: 'aHR0cHM6Ly9tZWdhLm56LyNGIXZQd0NGSXJBIUxZSm9MSnZHbkRiUlRqS0FueWhELWc=',
            cgames: 'aHR0cHM6Ly9tZWdhLm56LyNGITdMcFFIYXdiITBRZm9xYjhoUWt0Um9BY0VDb01MdEE='
        }
        e.href = b64u(links[cf])
        filters['applications'] = ['1.1','BEST_GAMES_17_LITE','E1000_mega_konon','GhostSensor_K500',
        'ICQMobile','LIKE_PC_GAME_4_FULL','MOBGAMES_5','MoM4lite','NUMISMAT_40','qipmobile_sie_a',
        'rugame_mobi_mir_strategii_6','rugame_mobi_Vista','SlovoEd_Deluxe_Eng','the_best_novosti11','vvs_notepadRu']
        filters['games'] = ["!P","3DMiniGolfWor_n95_bykriker","160.jar","240x320_se_k770_k800_s500_t650_w850_rus_paris","365Bowling_s5230","996280","AlienQuarantine_SAMSUNG_GT_S5230_EN","apo_se_aino_en","Atudela_240","BeachBallCrabMayhem_w","BMW_Racing_nokia_62","bubble_pop","CallofDuty3_n623","CBS240x320lg","Collapse_2010_SE_Satio","Circket 2016 24","daughter2_ru_nokia_240x320_s60","Dirty_D5","DragonMania_LG_KU","EarthwormJim_ru_s60","everybodys_golf_nokia_n95","FerrariGT3_Nokia_N73","formularacingpro_nokia_240x320_s60",
        "GangstarCity_Samsung_GT_S8","GM_PowerPuffGirlsSnowboarding_Nokia_176x208","guitar_hero3_sp1_N7","holes_RU_Nok_360","iec_tophacker_f","JellyStar_SE_176","Kapsle_PL__Breakpoint_2009__k5","Legends_Of_Lore_Eposide1","loveriddle","MegaBloks_Builder_se_k6","Mind_Habits_nok",
        "Moto Racing 3D v1.2_3","navy_warK800","Nokia_Racing","OregonTrailAmericanSettler_Nokia_58","Phone_","PocketGod_Samsung_S5","Puzzle_Pets","RealB","RN80","rugame_mobi_valentine_journey_81","SantaInTrouble240","shaolin_en_fr_it_de_es_pt_d5","smes","SpaceInv_s60","STD_CakeMania4_SEU","Super_golf",
        "TempleRush3D2_240x4","TheBigLebowskiBowling_s60_32","tmp_10180","tmp_19623-2012r","Tomb_Raider_Underworld_3D","TRU240s6","uno2_nokia_e71","warriors_z","wpt-showdown.N95","zombiemobdefense","zumasrevenge_k"]
        filters['cgames'] = ["0A","240x320a","AYSJ","ChanKuo3_N3","d608","DPCQ2N73","E2.123","e2.313","e2.496","E2.666","E6.114","e6.302","e62.169","e62.306","E62.459","e62.661","E62.789","e62.957","fcjdE2","guardianlegend_s4","guangjinN5","jxihab_n","k700.239","k700.583","K790.145","K790.298","K790.463","K790.605","L6.2","LOK","MHQ","Myz",
        "N73.215","n73.339","n73.472","n73.615","N73.787","n73.1007","n73.1208","n73.1332","n73.1470","N73.1633","n73.1817","n73_bt.20","n97.110","n97.225","n97.356","n97.484","n97.613","N5500.90","N5800.42","N5800.168","N5800.283","N7370.1","n7370.204","N7370.399","n7370.642",
        "N7370.799","N7370.979","N7610.109","n7610.380","N6710.695","N7610.943","N7610.1132","NHDiaoyueMuzhu_v1.0.0_D6","PES2011_N76","s40n7370.1","se_k700","SJQYE2","Sword_H","TJSXC_no","V8.17","WLQJN7610","XLQYK","ylsgsN","ZSSFN73","ZZTKW"]
        let currentFilter=filters[cf]
        let magicNumber = 0;
        filename = filename.toLowerCase()
        function advancedCompare(w1,w2){
            for(let i=0,l=w2.length;i<l;i++){
                if(w1[i]){
                    if(w1[i] != w2[i]){
                        if(isNaN(parseInt(w1[i]))&&isNaN(parseInt(w2[i]))){
                            return w1[i]>w2[i]
                        } else {
                            if(!isNaN(parseInt(w1[i]))&&!isNaN(parseInt(w2[i]))){
                                return parseInt(w1.slice(i)) > parseInt(w2.slice(i))
                            } else{
                                let who = !isNaN(parseInt(w1[i]))
                                if(i>0){
                                    return who && !isNaN(parseInt(w1[i-1]))
                                } else {
                                    return w1[0] > w2[0]
                                }
                            }
                        }
                    }
                } else{
                    return false
                }
            }
        }
        if(filename<'0'||filename[0]=='_'||!filename.endsWith('.jar')||filename<filters[0]){
            if(cf!='games'){
                magicNumber = currentFilter.length;
            } else {
                magicNumber = 1;
            }
        } else{
            if(cf == 'games' && filename > 'zumarevenge_LG'){
                    magicNumber = 1;
            }
            else{
                let i = 0;
                for(let fn of currentFilter){
                    fn = fn.toLowerCase()
                    if(filename.startsWith(fn)){
                        return alert(locale.arc0 + filename + locale.arc1+i+', '+(i+1))
                    }
                    if(advancedCompare(filename,fn)){
                        i++;
                        magicNumber = i;
                    } else{
                        break;
                    }
                }
            }
        }
        if(cf=='cgames' && filename.match('\.[0-9]+\.jar')){
            alert('A number in the filename might be not correct.')
        }
        alert(locale.arc0 + filename + locale.arc2+magicNumber)
    }
    var isAlive = true
    function isRGAlive(){
        let f = new Image()
        f.onerror= () => { isAlive = false }
        f.src='http://rugame.mobi/favicon.ico'

    }
    function getAppInfo(appid,folder){
        if(!folder){
            folder = cf;
        }
        fetchJSON(folder+'/data/all/'+appid+'.json').then((a)=>{
            let icons = window['icons_'+folder]||[];
            $('#appIcon').src=icons['i'+a.id]?'data:image/png;base64,'+icons['i'+a.id]:'10.png';
            document.title = a['name']+' - RuGame J2ME Archive'
            setField(a,'name','appTitle');
            setField(a,'vie','appViews');
            setField(a,'dwn','appDls');
            setField(a,'cmm','appComments');
            setField(a,'rating','appRating','rtg');
            $('#appLink').href =(isAlive?'':'https://web.archive.org/web/')+'http://rugame.mobi/'+(cf=='cgames'?'china/':'game/')+a.id;
            p1.MaterialProgress.setProgress(a.rating.ups*100/(parseInt(a.rating.ups)+parseInt(a.rating.dws)));
            ('s3D' in a && a['s3D'])?$('#s3D').classList.remove('hidden'):$('#s3D').classList.add('hidden');
            ('bt' in a && a['bt'])?$('#sBT').classList.remove('hidden'):$('#sBT').classList.add('hidden')
            setDesc(a);
            setField(a,'upl','appBy');
            setField(a,'vnd','appVendor');
            setField(a,'cat','appCat');
            setField(a,'add','appDate');
            if('upd' in a){
                setField(a,'upd','appUpdate');
            } else {
                setField(a,'add','appUpdate');
            }
            var dlc = '';
            var i = 0;
            if('files' in a){
            for(let f of a.files){
                let t = new Date().getTime()+a.id
                dlc+=f.text+'<div class="mdl-grid">';
                for(let l of f.links){
                    i++;
                    let size;
                    if(f.size){
                        size = l.type == 'JAD'?'1Кб':f.size+'Кб'
                    } else {
                        size = '';
                    }
                    let link = localLinks?folder+'/files/'+l.file:l.url;
                    dlc+=`
                    <a href="${link}" rel="noreferrer" target="_blank" class="mdl-cell mdl-cell--5-col ai" id="x${t+'_'+i}">
                    <i class="material-icons">file_download</i>${l.type}
                    </a>
                    <div class="mdl-tooltip mdl-tooltip--top" data-mdl-for="x${t+'_'+i}">${l.file}<br>${size}</div>
                    `;
                    if(l.type != 'JAD'){
                        dlc+=`<a href="#mega" onclick="getMLink(this,'${l.file}')" target="_blank" class="mdl-cell mdl-cell--5-col ai">
                        <i class="material-icons">cloud_download</i>[MEGA]
                        </a>`
                        if(!isAlive){
                        dlc+=`
                        <a onclick="prompt(locale.copy,'${l.file}')" href="https://web.archive.org/web/*/rugame.mobi/game/*" target="_blank" class="mdl-cell mdl-cell--5-col ai">
                        <i class="material-icons">find_in_page</i>[WA]
                        </a>
                        <a href="https://google.com/search?q=${encodeURI('"'+l.file+'"')}" target="_blank" class="mdl-cell mdl-cell--5-col ai">
                        <i class="material-icons">find_in_page</i>[G]
                        </a>
                        <a href="https://yandex.com/search?text=${encodeURI('"'+l.file+'"')}" target="_blank" class="mdl-cell mdl-cell--5-col ai">
                        <i class="material-icons">find_in_page</i>[Y]
                        </a>
                        `
                        }
                    }
                }
                dlc+='</div>'
            }
            }
            $('#dls').innerHTML=dlc;
            setTimeout(componentHandler.upgradeDom, 150);
            openTheBox('thebox');
        }).catch((reason)=>{
            alert(locale.nodata)
        })
    }
    function setDesc(o){
        let sc = '';
        let desc = b64u(o['desc']);
        if('desc' in o){
            if(!loaded[cf].all.confidmed){
                $('#appDesc').innerHTML = desc;
            }
            loaded[cf].all.then((s)=>{
                if(screenshots&&('i'+o.id in window['scr_'+cf])){
                    sc += `<br><center><img src="data:image/png;base64,${window['scr_'+cf]['i'+o.id]}"></center><br>`;
                }
                $('#appDesc').innerHTML = sc+desc
            })
        }
    }
    var itx = (()=>'innerText' in document.body ? 'innerText' : 'innerHTML')()
    function setField(obj,prp,fld,sp) {
        let f = $('#'+fld)
        let p = itx
        if(prp in obj){
            if(sp && sp in obj[prp]){
                f[p] = obj[prp][sp];
            } else{
                f[p] = obj[prp];
            }
        } else{
            f[p] = '?';
        }
    }
    function closeTheBox(b){
        $('#infobox').classList.add('hidden');
        document.querySelectorAll('.box').forEach((h)=>{h.classList.add('hidden')})
        if(!b){
            window.location.hash="#"
        }
        document.title = 'RuGame J2ME Archive'
    }
    function openTheBox(id){
        $('#'+id).classList.remove('hidden');
        $('#infobox').classList.remove('hidden');
        $('#lybox').scroll(0,0);
    }
    let vkinit = false
    function showComments(){
        $("#tab_t_-1").click()
        if(!vkinit&&VK){
            VK.init({apiId: 0x4F9438, onlyWidgets: true});
            VK.Widgets.Comments("t_-1", {limit: 20, width: "auto", attach: false});
            VK.Widgets.Poll("t_-1", {}, "287271480_307283ab502526db03");
            $("#t_-1").innerHTML+='<iframe style="width:100%;height:550px" src="https://twitch.tv/rugame_/chat"/>'
            vkinit = true;
        }
    }
    function autoClose(){
        if (drawerON()){
            ly.MaterialLayout.toggleDrawer()
        }
    }
    function drawerON(){
        return ly.MaterialLayout.drawer_.classList.contains('is-visible')
    }
    function swipes(a){
        a = $(a)
        var gp,grs,grj
        function touchstart(evt){
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
            gp = new Promise((rs,rj)=>{
                grs = rs
                grj = rj
            })
            gp.then((t)=>{
                if(t<0 && !drawerON()){
                    ly.MaterialLayout.toggleDrawer()
                }
                if(t>0 && drawerON()){
                    ly.MaterialLayout.toggleDrawer()
                }
            })
        }
        function touchmove(a){
                var b=a.touches[0].clientX,c=a.touches[0].clientY,d=xDown-b,e=yDown-c;
                Math.abs(d)>Math.abs(e)&&(128<d?grs(1):-128>d&&grs(-1))
            }
        function touchend(){
            grs(0)
        }
        a.addEventListener('touchstart', touchstart, !1);
        a.addEventListener('touchmove', touchmove, !1);
        a.addEventListener('touchend', touchend, !1);
    }
    function saveConfig(){
        localStorage['rg-icons'] = icons = cicons.checked
        localStorage['rg-screenshots'] = screenshots = cscreenshots.checked
        localStorage['intro'] = 1
        closeTheBox(1)
        if(cf==''){
            autoSelectSection()
        } else{
            if(confirm(locale.reload)){
                window.location.reload()
            }
        }
    }
    var menuA = [
        selectSection,
        openTheBox,
        ()=>{$("#tab_t_-2").click()},
        showComments,
    ]
    function clk(arg,id){
        autoClose()
        menuA[id](arg)
    }
    setTimeout(()=>{
        for(let folder in locale.folders){
                addItem('a','mdl-navigation__link',locale.folders[folder],'.mdl-layout__drawer .mdl-navigation',`javascript:clk('${folder}',0)`,'me-'+folder);
        }
        addItem('a','mdl-navigation__link',locale.about,'.mdl-layout__drawer .mdl-navigation',`javascript:clk('about',1);`,'me-about');
        addItem('a','mdl-navigation__link',locale.stats,'.mdl-layout__drawer .mdl-navigation','javascript:clk(0,2)','me-stats');
        if(locale.l=='ru'){
            addItem('a','mdl-navigation__link',locale.comments,'.mdl-layout__drawer .mdl-navigation','javascript:clk(0,3)','me-comments');
        }
        swipes('#ly')
        if(localStorage.intro || navigator.userAgent.match('bot')){
            autoSelectSection()
        } else{
            openTheBox('about')
        }
        setTimeout(isRGAlive,5000)
    }, 1200);
}
