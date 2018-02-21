if(check()){ //es6
    var localLinks = false;
    var screenshots = true;
    var cf = 'games' //current folder
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
                });
            });
        });
    }
    function b64u(str) { //base64 unicode
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
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
    function selectSection(folder){
        document.querySelectorAll('.'+cf+'-tab').forEach((e)=>{e.classList.add('hidden')});
        cf = folder;
        document.querySelectorAll('.'+cf+'-tab').forEach((e)=>{e.classList.remove('hidden')});
        if(loaded.indexOf(folder)== -1){ //load only once
        $('#spinner').classList.remove('hidden');
        loaded.push(folder);
            fetchJSON(folder+'/data/cats.json').then((j)=>{
                fetchJSON(cf+'/data/icons.json').then((ic)=>{
                    if(screenshots){
                        fetchJSON(cf+'/data/screenshots.json').then((sc)=> {
                            window['scr_'+folder] = sc;
                        });
                    }
                    window['icons_'+folder] = ic;
                    all = '';
                    tt = ttt = 0;
                    for(let cat of j){
                        setTimeout(loadAppList,tt,cat,ic);
                        tt+=50;
                    }
                    setTimeout(loadAppList,tt,{id:'top'},ic);
                    tt+=2500;
                    setTimeout(()=>{$('.'+folder+'-tab').click()},tt);
                    //$('.mdl-layout__tab-bar-right-button').classList.add('is-active')
                });
            });
        } else {
            $('.'+cf+'-tab').click();
        }
    }
    function loadAppList(cat,ic){
        var pth = '';
        if(cat.id == 'top'){
            pth = 'top.json'
        }  else{
            pth = cat.name+'/applist.json';
        }
        fetchJSON(cf+'/data/'+pth).then((al)=>{
            var list = '';
            for(var app of al){
                let icon = ic['i'+app.id];
                if(icon){
                    icon = 'data:image/png;base64,'+icon;
                } else {
                    icon = '10.png'
                }
                list += `
                <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content" onclick="fillAppInfo(${app.id})">
                  <img class="mdl-list__item-icon" src="${icon}">
                  <span class="mdl-list__item-text-body">${app.name}</span>
                  </span>
                  <span class="mdl-list__item-secondary-content">
                    <a class="mdl-list__item-secondary-action" href="javascript:fillAppInfo(${app.id})"><i class="material-icons">info</i></a>
                  </span>
                </li>
                `;
            }
                setTimeout(insertAppList,ttt,$(`#${cf}_${cat.id}`).firstChild,list);
                ttt+=300;
                if(cat.id!='top'){
                    all += list;
                } else {
                    setTimeout(insertAppList,ttt,$(`#${cf}_all`).firstChild,all);
                    ttt+=500;
                    setTimeout(()=>{$('#spinner').classList.add('hidden')},ttt);
                }
        });
    }
    function insertAppList(el,list){
        console.log('loading:'+el.parentElement.id);
        el.innerHTML = list;
    }
    function optsearch(){
        lastinput = new Date().getTime()
        fastsearch();
    }
    function fastsearch(){
        if(lastinput){
            if(new Date().getTime() - lastinput > 900){
                lastinput = false;
            } else {
                return setTimeout(fastsearch,920);
            }
        } else {
            return;
        }
        console.log('seaching')
        var text = $('#fixed-header-drawer-exp').value;
        var t = new RegExp(text,'im');
        document.querySelectorAll('.mdl-layout__tab-panel.is-active .mdl-list__item.hidden').forEach((e)=>{
            setTimeout((e)=>e.classList.remove('hidden'),0,e);
        });
        if(text!=''){
        document.querySelectorAll('.mdl-layout__tab-panel.is-active .mdl-list__item').forEach((e)=>{
            if(!e.children[0].children[1].innerHTML.match(t)){
            setTimeout((e)=>e.classList.add('hidden'),0,e);
            }
        });
        }
    }
    function getMLink(e,filename){
        return;
        e.preventDefault()
        const appFilter = ['1.1','BEST_GAMES_17_LITE','E1000_mega_konon','GhostSensor_K500',
        'ICQMobile','LIKE_PC_GAME_4_FULL','MOBGAMES_5','MoM4lite','NUMISMAT_40','qipmobile_sie_a',
        'rugame_mobi_mir_strategii_6','rugame_mobi_Vista','SlovoEd_Deluxe_Eng','the_best_novosti11','vvs_notepadRu']
        let currentFilter=appFilter
        let magicNumber = 0;
        if(filename<'0'||filename[0]=='_'||filename.endsWith('.zip')){
            console.log('100% 0')
            magicNumber = currentFilter.length;
        } else{
            let i = 0;
            for(let fn of currentFilter){
                console.log('i: '+i+'fil: '+filename+'fn: '+fn)
                if(filename > fn){
                    magicNumber = i;
                    i++;
                } else{
                    break;
                }
            }
        }
        alert('The magic number is:'+magicNumber)

    }
    function fillAppInfo(appid){
        fetchJSON(cf+'/data/all/'+appid+'.json').then((a)=>{
            let icons = window['icons_'+cf];
            $('#appIcon').src=icons['i'+a.id]?'data:image/png;base64,'+icons['i'+a.id]:'10.png';
            setField(a,'name','appTitle');
            setField(a,'vie','appViews');
            setField(a,'dwn','appDls');
            setField(a,'cmm','appComments');
            setField(a,'rating','appRating','rtg');
            $('#appLink').href ='http://rugame.mobi/'+(cf=='cgames'?'china/':'game/')+a.id;
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
                    let link = localLinks?cf+'/files/'+l.file:l.url;
                    dlc+=`
                    <a href="${link}" onclick="getMLink(event,'${l.file}')" target="_blank" class="mdl-cell mdl-cell--5-col ai" id="x${t+'_'+i}">
                    <i class="material-icons">file_download</i>${l.type}
                    </a>
                    <div class="mdl-tooltip mdl-tooltip--top" data-mdl-for="x${t+'_'+i}">${l.file}<br>${size}</div>
                    `;
                }
                dlc+='</div>'
            }
            }
            $('#dls').innerHTML=dlc;
            setTimeout(componentHandler.upgradeDom, 150);
            openTheBox();
        });
    }
    function setDesc(o){
        var sc = '';
        if('desc' in o){
            if(screenshots&&('i'+o.id in window['scr_'+cf])){
                sc += `<br><center><img src="data:image/png;base64,${window['scr_'+cf]['i'+o.id]}"></center><br>`;
            }
            $('#appDesc').innerHTML = sc+b64u(o['desc']);
        }
    }
    function setField(obj,prp,fld,sp) {
        if(prp in obj){
            if(sp && sp in obj[prp]){
                $('#'+fld).innerHTML = obj[prp][sp];
            } else{
                $('#'+fld).innerHTML = obj[prp];
            }
        } else{
            $('#'+fld).innerHTML = '?';
        }
    }
    function closeTheBox(){
        $('#infobox').classList.add('hidden');
    }
    function openTheBox(){
        $('#infobox').classList.remove('hidden');
        $('#lybox').scroll(0,0);
    }
    setTimeout(()=>{
        for(let folder in locale.folders){
                addItem('a','mdl-navigation__link',locale.folders[folder],'.mdl-layout__drawer .mdl-navigation',`javascript:selectSection('${folder}')`,'me-'+locale.folders[folder]);
            }
            addItem('a','mdl-navigation__link',locale.about,'.mdl-layout__drawer .mdl-navigation',`javascript:alert(locale.about2)`,'me-about');
        selectSection('applications');
    }, 1200);
}
