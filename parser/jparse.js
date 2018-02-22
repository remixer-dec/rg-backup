//jparse.js is part of a rugame.mobi parser that parses the exact application/game page
var fetch = require('node-fetch');
var fs = require('fs');
const $ = require('cheerio')
var fnames = {};
var App = function(aid,anm,add,upd,dwn,vie,vnd,upl,cat,cmm,rtg,top,dsc,dls,s3d,sbt){
	this.id = parseInt(aid);
	this.name = anm;
	this.desc = new Buffer(dsc).toString('base64');
	this.add = add;
	this.upd = upd;
	this.dwn = dwn?parseInt(dwn):dwn;
	this.vie = vie?parseInt(vie):vie; 
	this.vnd = vnd;
	this.upl = upl;
	this.cat = cat;
	this.cmm = cmm?parseInt(cmm):cmm;
	this.s3D = s3d;
	this.bt = sbt;
	this.rating = 
				{
					rtg: rtg,
					ups: parseInt(rtg.split('/')[0]),
					dws: parseInt(rtg.split('/')[1]),
					scr: rtg.split('/')[0] - rtg.split('/')[1],
				};
	this.top = top?parseInt(top):top;
	if(dls){
		var filearr = dls.split('<font color="♯"><hr/></font>');
		var lc = 0;
		this.files = [];
		for(var el of filearr){
			try {var size = el.match(/\[([0-9]+) Кб\]/im)[1]} catch(e){console.log('cannot find filesize')}
			var txt = el.replace(/(.+?)<a.+/,'$1')
			var links = $('a',el).toArray();
			var lnk = [];
			for(var ew of links){
				lc++;
				var fname = ew.attribs.href.match(/.+\/(.+\..+)$/im)
				if(fname){
					fname = fname[1];
					if(fname in fnames){//deal with files with same names
						fnames[fname]++;
						fname = fname.replace(/(\.[a-z]+$)/i,'.'+fnames[fname]+'$1')
					} else {
						fnames[fname]=0;
					}
				} else {
					fname = false;
				}
				lnk.push({url:'http://rugame.mobi'+ew.attribs.href,file:fname,type:$(ew).text()});
				if('dwnlinks' in global){
					global.dwnlinks.push([...lnk].pop().url);	
				}
			}
			this.files.push({
				text: txt,
				links: lnk,
				size: size?parseInt(size):size
			})
		}
		console.log('found '+lc+' links');
		if(lc == 0){
			console.log('NO LINKS FOUND: '+aid);
		}
	}
	return this;
}
function parseApp(url){
	return new Promise((resolve, reject) => {
		fetch(url)
    		.then(function(res) {
    		    return res.text();
    		}).then(function(body) {
    			console.log('page loaded: '+url)
    		   body = body.replace(/\#/img,'♯'); //to prevent the cheerio issue https://github.com/cheeriojs/cheerio/issues/1075
    		   var text = $(body).text();
    		   try{ var add = text.match(/Добавлена: (.+?:[0-9]{2})/i)[1];} catch(e){console.log('cannot find add date')}
    		   try{ var upd = text.match(/Обновлена: (.+?:[0-9]{2})/i)[1];} catch(e){/*console.log('cannot find upd date')*/}
    		   try{ var dwn = text.match(/Скачиваний: ([0-9]+)/i)[1];} catch(e){console.log('cannot find download count')}
    		   try{ var vie = text.match(/Просмотров: ([0-9]+)/i)[1];} catch(e){console.log('cannot find view count')}
			   try{ var vnd = text.match(/Производитель: ([a-z0-9а-яё ]+)/i)[1];} catch(e){console.log('cannot find vendor')}
    		   try{ var upl = text.match(/Загрузил: ([a-z0-9а-яё,_\-\$\^ ]+[a-z0-9а-яё])/i)[1];} catch(e){console.log('cannot find app uploader')}
    		   try{ var cat = text.match(/Категория: ([a-z0-9а-яё, ]+)/i)[1];} catch(e){console.log('cannot find category')}
    		   try{ var top = text.match(/Место №([0-9]+)/i)[1];} catch(e){ }
    		   try{ var cmm = text.match(/Обсудить \[([0-9]+)\]/i)[1];} catch(e){console.log('cannot find comment count')}
    		   try{ var aid = url.match(/(game|china)\/([0-9]+)\//im)[2]} catch(e){console.log('cannot find appID')}
    		   try{ var rtg = text.match(/Рейтинг файла.+?([0-9]+\/[0-9]+)/i)[1];} catch(e){console.log('cannot find file rating')}
    		   try{ 
    		   	var dsc = body.match(/.+/img)[14].match('>Скриншоты:')?body.match(/.+/img)[15]:body.match(/.+/img)[14];
    		   	if(dsc.match(/Производитель|Загрузил/)){
    		   		dsc = body.match(/.+/img)[12];
    		   		if(dsc.match(/div class="pic"/im)){
    		   			var rg = new RegExp(upl+'<\/b>.+<\/small>(.+?)<\/div>')
    		   			if(body.match(rg)){
    		   				dsc =body.match(rg)[1];
    		   			} else{
    		   				dsc = 'Описания нет.';
    		   				console.log(dsc+' '+aid);
    		   			}
    		   		} else {
    		   			console.log(dsc+' '+aid);
    		   		}
    		   	}
    		   	if(dsc.match('Категория<')){
    		   		dsc= body.match(/.+/img)[12];
    		   	}
    		   } catch(e){console.log('cannot find app description: '+e)}
    		   try{ var dls = body.match(/на телефон<\/h..+?font>((.|\n|\r|\r\n)+?)(<div class="komm1">|<div class="title h."|<\/div>)/)[1]} catch(e){console.log('cannot find download links in app '+aid)}
    		   try{ var anm = body.match(/Скачать (.+?) на телефон/)[1]} catch(e){console.log('cannot find app name')}
    		   try{ var s3D = text.match(/3D: есть/i)?true:false;} catch(e){ }
    		   try{ var sBT = text.match(/BT: есть/i)?true:false;} catch(e){ }
    		   var jApp = new App(aid,anm,add,upd,dwn,vie,vnd,upl,cat,cmm,rtg,top,dsc,dls,s3D,sBT);
			   resolve(jApp);
    	});
	});
}
// parseApp('http://rugame.mobi/game/$INSERTAPPIDHERE$/').then((e)=>{
	// fs.writeFileSync('app.json', JSON.stringify(e));	
// })
module.exports.parseApp = parseApp;