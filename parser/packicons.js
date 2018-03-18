var fs = require('fs');
var f = fs.readFileSync('data/fullapplist.json', 'utf-8');
var j = JSON.parse(f);
var icons = {};
for(el of j){
	if(fs.existsSync('icons/'+el.id+'.png')){
		icons['i'+el.id] = fs.readFileSync('icons/'+el.id+'.png').toString('base64')
	} else {
		icons['i'+el.id] = false;
	}
}
fs.writeFileSync('data/icons.json', JSON.stringify(icons));
