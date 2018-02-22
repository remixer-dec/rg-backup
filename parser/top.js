var fetch = require('node-fetch');
var fs = require('fs');
const $ = require('cheerio')

var csv = '';
var jsn = [];
var gc = 'game';
var mainurl = 'http://rugame.mobi/'+gc+'/top_file.php?'; 
var all = 0;
var apath = 'games';

fetch(mainurl)
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        lastpage = getLastPage(body);
        getAppList(body);
        getPageContent(2)
    });

function getPageContent(page){
	if(page > lastpage) return writeFiles();
    console.log('all:'+all)
	console.log('getting page '+page);
	fetch(mainurl+'&page='+page)
    	.then(function(res) {
    	    return res.text();
    	}).then(function(body) {
    	    getAppList(body);
    	    page++;
    	    setTimeout(()=>{getPageContent(page)},500)
    	});	
}
function getLastPage(htmlc){
    if(gc=='china'){return 10}
	lastpage = $('.page a:last-of-type' ,htmlc).prev().html();
	return lastpage;
}

function getAppList(htmlc){
	var pgamelist = $('.main a',htmlc).slice(2,12)
	pgamelist.each(function(idx, el) {
    	var gameName = $(el).text();
    	var gameID = el.attribs.href.replace(/\/(china|game)\/([0-9]+)\//im,'$2');
    	if(!el.attribs.href.match(/\/(game|china)\/[0-9]+\/$/img)||gameName == 'Java приложения') return; 
    	//checks if link on the last page is not a gamelink
    	csv+=`${gameID},${gameName}\r\n`;
        console.log(gameName)
    	jsn.push({id:gameID,name:gameName});
        all++;
  	});

}

function writeFiles(){
	fs.writeFileSync(apath+'data/top.csv', csv);
	fs.writeFileSync(apath+'data/top.json', JSON.stringify(jsn));
}

/*
edited version of old app.js to create top file
*/