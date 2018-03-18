var staticCache = 'rg-main-v1'
var allCaches = [staticCache]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(staticCache).then(function (cache) {
    return cache.addAll([
    	'/',
    	'https://fonts.gstatic.com/s/materialicons/v29/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2',
    	'https://raw.githubusercontent.com/subtlepatterns/SubtlePatterns/gh-pages/dark_dotted.png',
    	'./lib/material.min.js',
    	'./lib/material.light_green-blue.min.css',
    	'./10.png',
    	'./lang.js',
    	'./style.min.css',
    	'./init.js',
    	'./main.js',
    	'./applications/data/cats.json',
    	'./games/data/cats.json',
    	'./cgames/data/cats.json',
    	'./applications/data/v2data.json',
    	'./games/data/v2data.json',
    	'./cgames/data/v2data.json',
    	'./icon.png'])
  }))
})

self.addEventListener('activate',(event)=>{
	event.waitUntil(caches.keys().then((cacheNs)=>{
		return Promise.all(cacheNs.filter((cacheN)=>{
			return !allCaches.includes(cacheN)
		}).map((cN)=>{
			return caches['delete'](cN)
		}))
	}))
})

self.addEventListener('fetch', (event)=>{
  event.respondWith(caches.match(event.request).then((response)=>{
    return response || fetch(event.request).catch(e=>{ return new Response('{"error":"connection lost"}')})
  }));
});

self.addEventListener('message',(event)=>{
  if (event.data.action === 'refresh') {
    self.skipWaiting()
  }
})

