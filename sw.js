var staticCache = 'rg-main-v11'
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
        './11.png',
        './lang.js',
        './style.min.css',
        './init.js',
        './main.js',
        './apps/data/v2data.json',
        './games/data/v2data.json',
        './cgames/data/v2data.json',
        './sapps/data/v2data.json',
        './sgames/data/v2data.json',
        './icon.png'].map(x => new Request(x, {cache: 'no-cache'})))
  }))
})

caches.keys().then((ckeys) => {
    ckeys.filter(x => x == 'rg-main-v5').map(x => caches['delete'](x).then(r => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
	event.waitUntil(caches.keys().then((cacheNs) => {
		return Promise.all(cacheNs.filter((cacheN) => {
			return !allCaches.includes(cacheN)
		}).map((cN) => {
			return caches['delete'](cN)
		}))
	}))
})

self.addEventListener('fetch', (event) => {
    let u = event.request.url
    if(u.match('out.php')){
        let red = u.match(/\&(http:\/\/.+$)/im)[1]
        event.respondWith(Response.redirect(red, 302))
    } else{
        event.respondWith(caches.match(event.request).then((response) => {
          return response || fetch(event.request)
          .then(r => r.status === 404 ? (new Response('404 :(', {status: 404})) : r)
          .catch(e => new Response('{"error": "connection lost"}'))
        }))
    }
})

self.addEventListener('message', (event) => {
  if (event.data.action === 'refresh') {
    self.skipWaiting()
  }
})
