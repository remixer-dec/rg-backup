//fix.js | you can use this as a template to change something in dowloaded data
var fs = require('fs');
var jp = require('./jparse.js');
var f = fs.readFileSync('games/data/allappsdata.json','utf-8');
f = JSON.parse(f);

var i = 0;
var t = 1000;
function xd(ai){
	jp.parseApp('http://rugame.mobi/game/'+f[ai].id+'/')
	.then((app)=>{
		//do something
		fs.writeFileSync('games/data/all/'+app.id+'.json', JSON.stringify(app));	
		fs.writeFileSync('games/data/allappsdata.json', JSON.stringify(f));	
		//save after every change
	});
}
for(var el of f){
	var fc = 0;
	if(el.desc.match(/Прислал|Производитель|Категория/im)){
		console.log('found in app:'+el.id);
		//get app info again
		setTimeout(xd,t,i);
		t+=700;
	}
	i++;
}
