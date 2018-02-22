//
var fetch = require('node-fetch');
var fs = require('fs');
const $ = require('cheerio');

//init
var csv = allcsv = '';
var jsn = [];
var alljsn = [];
var g = 'game'; //url path
var apath = 'games/'; // folder path
var chi = ''; //set to ch for china gamepath
var gExp = new RegExp(`\/${g}\/([0-9]+)\/$`,'im');
var mainurl = `http://rugame.mobi/${g}/`;  
var starturl = `http://rugame.mobi/${g}/1/`; 
var lastPage = 1;
var cats = [];
var currentCat = 0;
var icons = '';
var applinks = '';
var ac = 0;

function initParsing(){
	console.log('hello');
	fetch(starturl)
    	.then(function(res) {
    	    return res.text();
    	}).then(function(body) {
    	    getCategories(body);
    	});	
}
function getCategories(html){
	var l = getAppList(html);
	l.each(function(idx, el) {
    	if(!el.attribs.href.match(gExp)) return; 
    	var catName = $(el).text();
    	var catID = el.attribs.href.replace(gExp,'$1');
		console.log('adding category: '+catName);
    	cats.push({id:catID,name:catName.replace(/,? /img,'_')});
    });
    setTimeout(()=>{
    	createFolders();
    	parseCategory(0);       
        fs.writeFileSync(apath+'/data/cats.json', JSON.stringify(cats)); //
    },1000)	
}
function createFolders(){
    createFolder(apath+'/data/');
    createFolder(apath+'/data/all/');
    createFolder(apath+'/icons/');
	for(el of cats){
		var dir = apath+'/data/'+el.name;
		createFolder(dir);
	}
}
function createFolder(dir){
    if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
}
function parseCategory(catN){
console.log('parsing category '+cats[catN].name);
currentCat = catN;
fetch(mainurl+cats[catN].id+'/')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        lastpage = getLastPage(body);
        getPageContent(catN,1);
    });
}

function getPageContent(catN,page){
	if(page > lastpage) return writeFiles();
	console.log('getting page '+page);
	fetch(mainurl+cats[catN].id+'/'+page+'/')
    	.then(function(res) {
    	    return res.text();
    	}).then(function(body) {
    	    var al = getAppList(body);
    	    if(chi='ch' && cats[catN].name!="RPG"){pushApps(al.slice(1,11))} else {pushApps(al.slice(2,12))}
    	    page++;
    	    setTimeout(()=>{getPageContent(catN,page)},500)
    	});	
}

function getLastPage(htmlc){
	lastpage = $('.page a:last-of-type' ,htmlc).prev().html();
	lastpage = lastpage?lastpage:1;
	return lastpage;
}

function getAppList(htmlc){
	return $('.main a',htmlc);
}
function pushApps(applist){
	applist.each(function(idx, el) {
    	var appName = $(el).text();
    	var appID = parseInt(el.attribs.href.replace(gExp,'$1'));
    	if(!el.attribs.href.match(gExp)||appName == 'Java приложения'||appName == 'Java игры') return; 
    	//checks if link on the last page is not a gamelink
    	csv+=`${appID},${appName}\n`;
    	jsn.push({id:appID,name:appName});
    	icons+=`http://rugame.mobi/cache/g${chi}_th/${appID}.png\n`;
        applinks+=`http://rugame.mobi/${g}/${appID}/\n`;
    	ac++;
  	});
}
function writeFiles(){
	fs.writeFileSync(apath+'/data/'+cats[currentCat].name+'/applist.csv', csv);
	fs.writeFileSync(apath+'/data/'+cats[currentCat].name+'/applist.json', JSON.stringify(jsn));
	alljsn = alljsn.concat(jsn);
	allcsv += csv;
	jsn = [];
	csv = '';
	currentCat++;
	if(currentCat < cats.length){
		parseCategory(currentCat);
	} else {
		fs.writeFileSync(apath+'/data/fullapplist.csv', allcsv);
		fs.writeFileSync(apath+'/data/fullapplist.json', JSON.stringify(alljsn));
        fs.writeFileSync(apath+'/data/allapplinks.txt', applinks);
		fs.writeFileSync(apath+'icons/icons.txt', icons);
		console.log('operation finished: '+ac+' apps found');
	}
}

initParsing();
/*
[app.js] List and category loading 
app loads list of categories and goes through each of them
app gets last page 
app loads pages untill last
app goes to next cetegory
app writes data about each category and all list

[allappsinfo.js]
app loads saved list of all apps and goes on each page 
app calls jparse.js for each of the apps
app writes data in files

[jparse.js]
app parses and downloads info of every app
app returns parsed array of j2me application info

[fix.js]
you can it this as a template to change something in dowloaded data
*/