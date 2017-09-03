 **RG-Backup**   
 Backup of information about j2me apps and games from rugame.mobi.  
 Created to prevent data loss if something happens to this site.  

This project contains:  
1. The parser, to get and save data from the server.  
2. The client, html file to manage, sort and search all saved data. 
The client is availible [here](https://remixer-dec.github.io/rg-backup)   

The parser is based on node.js platform.  
to use it run *`npm install`* in project folder  
then change paths in app.js and allappsinfo.js and top.js for every global category,  
make sure you have folders for each global category,  
then run `node app.js` and wait untill it stops,  
then run `node allappsinfo.js`,  
then run `node top.js`,  
you'll get some txt files (icons.txt and appfileslinks.txt) use them in your favourite download manager (such as wget or aria2),  
then run node `node packicons.js` in every global category folder.  

Lisence: public domain
