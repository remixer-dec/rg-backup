var fs = require('fs');
var jp = require('./jparse.js');
global.dwnlinks = [];
var apath = 'cgames';
var f = fs.readFileSync(apath+'/data/allapplinks.txt','utf-8');
var applinks = f.split('\n');
var appdata = [];

addApp(0);
function addApp(n){
	if(n == applinks.length){
		fs.writeFileSync(apath+'/data/appfileslinks.txt', global.dwnlinks.join('\n'));	
		fs.writeFileSync(apath+'/data/allappsdata.json', JSON.stringify(appdata));	
		console.log('mission complete');
		return;
	}
	console.log('parsing app '+n);
	jp.parseApp(applinks[n])
	.then((app)=>{
		appdata.push(app);
		fs.writeFileSync(apath+'/data/all/'+app.id+'.json', JSON.stringify(app));	
		fs.writeFileSync(apath+'/data/appfileslinks.txt', global.dwnlinks.join('\n'));	
		fs.writeFileSync(apath+'/data/allappsdata.json', JSON.stringify(appdata));	
		//uncomment 2 lines above to all data after every request
		n++;
		setTimeout(()=>{
			addApp(n);
		},350);
	});	
}
/*

*/