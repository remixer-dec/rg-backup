//es6
if (!check()) throw new EvalError("unsupported browser")
//hide splashscreen after loading
setTimeout(() => {
	window.splash.classList.add('spf')
}, 500)
setTimeout(() => window.splash.remove(), 21000)
componentHandler.upgradeDom()

//fix the mdl layout and declare configuration
const MAX_ITEMS_P = 20
var screenshots = loadConfig('rg-screenshots', true)
var icons = loadConfig('rg-icons', false)
var alphasort = loadConfig('rg-alphasort', false)
var pageRenderingMode = parseInt(localStorage['rg-performance'] || false)
var archiveHelper = loadConfig('rg-archelper', false)
pageRenderingMode = pageRenderingMode == NaN ? 1 : pageRenderingMode
var favs = JSON.parse(localStorage['rg-fav'] || '{}')
var cf = '' //current folder
var loaded = []
var lastInput = 0
var lastTarget = false
var delay1, delay2 //timers to optimize loading
const appDB = []
const folders = Object.keys(locale.folders)
var $ = (q) => document.querySelector(q)
$$ = typeof $$ != 'function' ? (q) => document.querySelectorAll(q) : $$
var innerContent = 'innerText' in document.body ? 'innerText' : 'innerHTML'
let vkinit = false

async function fetchJSON(filename) {
	let f = await fetch(filename)
	return await f.json()
}

function b64u(str) {
	//base64 unicode
	return decodeURIComponent(
		atob(str)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join('')
	)
}

function getCfID(n) {
	let scf = cf
	if (typeof n == 'string') {
		scf = n
		n = undefined
	}
	let x = folders.indexOf(scf)
	return typeof n !== 'undefined' ? folders[n] : x
}

function addItem(type, xclass, text, to, href, id) {
	var item = document.createElement(type)
	item.innerHTML = text
	item.className = xclass
	if (href) {
		item.href = href
	}
	if (id) {
		item.id = id
	}
	componentHandler.upgradeElement(item)
	$(to).appendChild(item)
}

function loadScreenshots(folder) {
	autoLoader()
	if (screenshots) {
		fetchJSON(cf + '/data/screenshots.json').then((sc) => {
			window['scr_' + folder] = sc
			loaded[folder].confirm()
			loaded[folder].confirmed = 1
		})
	}
}

function switchTabs(hide, show) {
	$$(`.${hide}-tab`).forEach((e) => e.classList.add('hidden'))
	$$(`.${show}-tab`).forEach((e) => e.classList.remove('hidden'))
}

function switchSelectedMenuItem(item) {
	let noExtraBarItems = ['favourites', 'blog', 'comments', 'mirrors']
	/*if (noExtraBarItems.indexOf(item) != -1) {
		$('#alltabs').parentElement.classList.add('hidden')
	} else {
		$('#alltabs').parentElement.classList.remove('hidden')
	}*/

	let oldm = $('.mds')
	if (oldm) {
		oldm.classList.remove('mds')
	}
	let newm = $('#me-' + item)
	if (newm) {
		newm.classList.add('mds')
	}
}

function loadCoreData(folder) {
	delay1, delay2 = 0
	if (icons) {
		fetchJSON(cf + '/data/icons.json').then((ic) => {
			loadScreenshots(folder)
			window['icons_' + folder] = ic
			setTimeout(loadAppList, delay1, ic)
			setTimeout(() => {
				$('.' + folder + '-tab').click()
			}, delay1)
		})
	} else {
		loadScreenshots(folder)
		setTimeout(loadAppList, delay1, [])
		setTimeout(() => {
			/*$('.' + folder + '-tab').click()*/
		}, delay1)
	}
}

function selectSection(folder) {
	if (cf == folder) {
		return
	}
	switchSelectedMenuItem(folder)
	switchTabs(cf, folder)
	cf = folder
	if (!document.location.hash.match(cf)) {
		relocate('#/' + folder + '/')
	}
	if (!(folder in loaded)) {
		//load only once
		$('#spinner').classList.remove('hidden')
		loaded[folder] = {confirmed: 0}
		loaded[folder].all = new Promise((res, rej) => {
			loaded[folder].confirm = res
		})
		if (window.location.hash.length > 1) {
			setTimeout(locate, 1, window.location.href)
		}
		loadCoreData(folder)
	} else {
		$('.' + cf + '-tab').click()
	}
}

function setContentVisibilityListRendering(mode) {
	if (mode == -1) {
		$('#lists').classList.add('cvmode')
	}
}
/*
function setupConfiguredOptions() {
	getmdlSelect.init('.getmdl-select')

	if (typeof pageRenderingMode != 'number' || isNaN(pageRenderingMode)) {
		pageRenderingMode = 2
	}

	if (localStorage['rg-intro']) {
		cscreenshots.checked == screenshots ? 1 : cscreenshots.parentElement.click()
		cicons.checked == icons ? 1 : cicons.parentElement.click()
		cazsort.checked == alphasort ? 1 : cazsort.parentElement.click()
		carchelper.checked = archiveHelper ? carchelper.parentElement.click() : 0
		setContentVisibilityListRendering(pageRenderingMode)
	}

	$$('.mdl-menu__item')[(pageRenderingMode + 1)].click()
}
*/

function autoSelectSection() {
	/*if (window.location.hash.length > 1) {
		//let h = parseHash(window.location.hash)[0]
		if (h != 'custom') {
			selectSection(h)
		}
	} else {
		selectSection('apps')
	}*/
}


function pageRenderer(page, active) {
	page = parseInt(page)
	page = page - 1
	let elems = $$('.mdl-layout__tab-panel.is-active >ul > div')
	let activeElem = $('.mdl-layout__tab-panel.is-active .pactive')
	if (!activeElem) return
	if (activeElem.classList.contains('loadmore')) {
		activeElem.classList.add('hidden')
		return false
	}
	if (!active) {
		activeElem.classList.add('hidden')
		var target = elems[page]
	} else {
		var target = activeElem.nextElementSibling
	}
	if (!target) return
	if (target == lastTarget) return
	window.lastTarget = target
	activeElem.classList.remove('pactive')
	target.classList.add('pactive')
	target.classList.remove('hidden')
}
function loadAppList(iconDB) {
	let cats = locale.tabs[cf].map((e) => {
		return {id: e[0], name: e[1]}
	})
	cats.push({id: 0, name: locale.top})
	fetchJSON(cf + '/data/v2data.json').then((al) => {
		if (alphasort) {
			for (let pr in al) {
				if (pr == 0) {
					continue
				}
				al[pr].sort(alphasorter)
			}
		}
		let all = []
		for (let cat of cats) {
			let list = '<div class="pactive">'
			let ii = 0
			for (var app of al[cat.id]) {
				let icon = iconDB['i' + app[0]]
				if (icon) {
					icon = 'data:image/png;base64,' + icon
				} else {
					icon = '10.png'
					if (cf == 'sapps' || cf == 'sgames') {
						icon = '11.png'
					}
				}
				let ricon = 'info'
				let aclass = 'mi hidden'
				if (app.length == 3) {
					if (app[2] == 1) {
						ricon = 'flag'
					}
				}
				let appItem = `
			<li class="mdl-list__item" onclick="relocate('#/${cf}/${app[0]}')">
			  <span class="mdl-list__item-primary-content">
			  <img class="mdl-list__item-icon appic" data-src="${icon}">
			  <span class="mdl-list__item-text-body">${app[1]}</span>
			  </span>
			  <span class="mdl-list__item-secondary-content">
				<a class="mdl-list__item-secondary-action" href="#/${cf}/${app[0]}"><i class="mi hidden">${ricon}</i></a>
			  </span>
			</li>
			`
				list += appItem
				ii++
				if (ii % MAX_ITEMS_P == 0) {
					list += '</div><div' + (pageRenderingMode > 0 ? ' class="hidden"' : '') + '>'
				}
				if (cat.id != 0) {
					if (app.length == 3) {
						app.splice(2, 1)
					}
					appDB.push(app.concat([cf, cat.name]))
					all.push([appItem, app[1]])
				}
			}
			let appPageCount = Math.ceil(al[cat.id].length / MAX_ITEMS_P)
			if (pageRenderingMode == 2 && appPageCount > 1) {
				list +=
					`</div><div class="paginator" id="page${cf + cat.id}"><img src="10.png" onload="new Pagination(this.parentElement,'page${cf +
					cat.id}', {totalPage:${appPageCount}, range:${(appPageCount > 3 ? 5 : appPageCount)},callback:pageRenderer})"></div>`
			}
			if (pageRenderingMode == 1 && appPageCount > 1) {
				list += '</div><div class="loadmore mdl-button" onclick="pageRenderer(1,1)">' + locale.loadmore + '</div>'
			}
			if (cat.id == '0') {
				cat.id = 'top'
			}
			setTimeout(insertAppList, delay2, $(`#${cf}_${cat.id}`).firstChild, list)
			delay2 += 20
			if (cats[cats.length - 1].id == cat.id) {
				all = alphasort ? all.sort(alphasorter) : all
				let appPageCount = Math.ceil(all.length / MAX_ITEMS_P)
				all = all
						.map((a, b) => b == 0 ? '<div class="pactive">' + a[0] : b % MAX_ITEMS_P == 0 ? '</div><div' + (pageRenderingMode > 0 ? ' class="hidden"' : '') + '>' + a[0] : a[0])
						.join('') +
					(pageRenderingMode == 2
						?  `</div><div class="paginator" id="page${cf + cat.id}">
							<img src="10.png" onload="new Pagination(this.parentElement,'page${cf + cat.id}',\
							{totalPage: ${appPageCount}, range:${(appPageCount > 3 ? 5 : appPageCount)},callback:pageRenderer})"></div>`
						: pageRenderingMode == 1
						? '<div class="loadmore mdl-button" onclick="pageRenderer(1,1)">' + locale.loadmore + '</div>'
						: '')

				setTimeout(insertAppList, 10, $(`#${cf}_all`).firstChild, all)
				delay2 += 50
				setTimeout(() => {
					$$('.mi.hidden').forEach((k, v) => k.className = 'material-icons')
					$$('.appic').forEach((k, v) => {
						if (k.src == '') {
							k.src = k.getAttribute('data-src')
						}
					})
				}, delay2)
				delay2 += 850
				setTimeout(() => {
					$('#spinner').classList.add('hidden')
					all = undefined
					$('#me-' + cf).innerHTML += '<i class="material-icons rc">check</i>'
					componentHandler.upgradeDom()
				}, delay2)
			}
		}
	})
}
function insertAppList(el, list, add) {
	el.innerHTML = add ? el.innerHTML + list : list
	//TODO: add experimental iscroll support here
}

function autoLoader() {
	if (pageRenderingMode == 1) {
		Array.from(lists.children).forEach((e) =>
			e.addEventListener(
				'scroll',
				(ev) => {
					if (e.offsetHeight + e.scrollTop > e.scrollHeight - 60) {
						pageRenderer(0, true)
					}
				},
				supportsPassive ? {passive: !0} : !1
			)
		)
	}
}

function optsearch() {
	lastInput = new Date().getTime()
	fastsearch()
}

function fastsearch() {
	if (lastInput) {
		if (new Date().getTime() - lastInput > 700) {
			lastInput = false
		} else {
			return setTimeout(fastsearch, 720)
		}
	} else {
		return
	}
	var text = $('#fixed-header-drawer-exp').value
	if (pageRenderingMode <= 0 && text != '' && text[0] == '!') {
		text = text.slice(1)
		let t = new RegExp(text, 'im')
		if (text.length > 0) {
			if (text.length < 2) return
			$$('.mdl-layout__tab-panel.is-active .mdl-list__item').forEach((e) => {
				e.classList.add('hidden')
			})
			$$('.mdl-layout__tab-panel.is-active .mdl-list__item').forEach((e) => {
				if (e.children[0].children[1].innerHTML.match(t)) {
					setTimeout((e) => e.classList.remove('hidden'), 0, e)
				}
			})
		} else {
			$$('.mdl-layout__tab-panel.is-active .mdl-list__item').forEach((e) => {
				e.classList.remove('hidden')
			})
		}
	} else {
		if (text.length > 2) {
			let t = new RegExp(text, 'im')
			let cc = cf
			let results = appDB.filter((e) => e[1].match(t))
			let total = results.length
			results = results
				.splice(0, 30)
				.sort(alphasorter)
				.sort((a, b) => {
					if (a[2] == cc) {
						return -9
					} else return 9
				})
				.splice(0, 10)
			if (results.length == 0) {
				searchresults.innerHTML = `<a>${locale.notfound}</a>`
				return
			}
			results.push
			searchresults.innerHTML =
				results.map((r) => `<a href='#/${r[2]}/${r[0]}'>${r[1]}<br>`).join('') + (total > 10 ? `<a id="totalr">${locale.found} ${total}</a>` : '')
		} else {
			searchresults.innerHTML = ''
		}
	}
}

function favourite(onlyCheck) { /*
	function checkFavStatus(x) {
		return x in favs
	}
	let appInfo = fvicon.name.split('|')
	let xid = parseInt(appInfo[0])
	let core = 'a' + appInfo[1] + '_' + xid.toString(32)
	if (onlyCheck) {
		return checkFavStatus(core)
	}
	if (checkFavStatus(core)) {
		delete favs[core]
		fvicon.innerHTML = 'star_border'
	} else {
		favs[core] = appInfo[2]
		fvicon.innerHTML = 'star'
	}
	localStorage['rg-fav'] = JSON.stringify(favs)
	if ($('.mds').id == 'me-favourites') {
		showFavourites()
	}
	*/
}

function getAppInfo(appid, folder) {
	if (!folder) {
		folder = cf
	}
	if (cf == 'custom') {
		cf = folder
		setTimeout(() => (cf = 'custom'), 600)
	}
	fetchJSON(folder + '/data/all/' + appid + '.json')
		.then((a) => {
			a.id = appid
			let icons = window['icons_' + folder] || []
			$('#appIcon').src = icons['i' + a.id] ? 'data:image/png;base64,' + icons['i' + a.id] : cf[0] == 's' ? '11.png' : '10.png'
			document.title = a['name'] + ' - RuGame Unofficial Archive'
			fvicon.name = appid + '|' + getCfID() + '|' + a.name
			fvicon.innerHTML = favourite(1) ? 'star' : 'star_border'
			setField(a, 'name', 'appTitle')
			setField(a, 'vie', 'appViews')
			setField(a, 'dwn', 'appDls')
			setField(a, 'cmm', 'appComments')
			setField(a, 'rating', 'appRating', 'rtg')
			let appURL = 'http://rugame.mobi/' + (cf == 'cgames' ? 'china/' : 'game/') + a.id
			$('#appSRC').href = appURL
			$('#appWA').href = 'https://web.archive.org/web/' + appURL
			$('#appGGL').href = 'http://webcache.googleusercontent.com/search?q=' + appURL
			$('#appYND').href = 'https://yandex.com/search/?text=site:' + appURL
			$('#appBNG').href = 'https://bing.com/search?q=site:' + appURL
			$('#appYAH').href = 'https://search.yahoo.com/search?p=site:' + appURL
			if ('rating' in a) {
				let rtg = a.rating.rtg.split('/')
				p1.MaterialProgress.setProgress((rtg[0] * 100) / (parseInt(rtg[0]) + parseInt(rtg[1])))
			}
			's3D' in a && a['s3D'] ? $('#s3D').classList.remove('hidden') : $('#s3D').classList.add('hidden')
			'bt' in a && a['bt'] ? $('#sBT').classList.remove('hidden') : $('#sBT').classList.add('hidden')
			setDesc(a)
			setField(a, 'upl', 'appBy')
			setField(a, 'vnd', 'appVendor')
			setField(a, 'cat', 'appCat')
			setField(a, 'add', 'appDate')
			if ('upd' in a) {
				setField(a, 'upd', 'appUpdate')
			} else {
				setField(a, 'add', 'appUpdate')
			}
			var dlc = ''
			var i = 0
			if ('files' in a) {
				for (let f of a.files) {
					let t = new Date().getTime() + a.id
					dlc += f.text + '<div class="mdl-grid">'
					for (let l of f.links) {
						l.type = l.file.match(/(?!\.)[a-z]+$/im)
						l.type = l.type ? l.type[0].toUpperCase() : '???'
						i++
						let size
						if (f.size) {
							size = l.type == 'JAD' ? '1Кб' : f.size + 'Кб'
						} else {
							size = ''
						}
						let link = localStorage['lmirror'] ? localStorage['lmirror'] + folder + '/' + l.file : "javascript:alert('" + locale.nomirror + "')"
						if (l.type == '???') {
							link = `javascript:alert('${locale.notfound}')`
						}
						let onclick = ''
						let target = '_blank'
						if (link.match('ipt:')) {
							target = ''
						}
						if (link.match('file:')) {
							onclick = `prompt('ссылка на локльный файл','${link}');`
							link = `#dls`
							target = ''
						}
						let extraclass = ''
						if (l.not_renamed) {
							extraclass = ' red'
						}
						dlc += `
				<a href="${link}" rel="noreferrer" target="${target}" class="mdl-cell mdl-cell--5-col ai${extraclass}" id="x${t + '_' + i}" onclick="${onclick}">
				<i class="material-icons">file_download</i>${l.type}
				</a>
				<div class="mdl-tooltip mdl-tooltip--top" data-mdl-for="x${t + '_' + i}">${l.file}<br>${size}</div>
				`
						if (archiveHelper && l.type != 'JAD' && l.file != '') {
							dlc += `<a href="#mega" onclick="archiveHelperFunction(event, this,'${l.file}')" class="mdl-cell mdl-cell--5-col ai">
					<i class="material-icons">archive</i>ArchiveHelper
					</a>`
						}
					}
					dlc += '</div>'
				}
			}
			$('#dls').innerHTML = dlc
			setTimeout(componentHandler.upgradeDom, 150)
			openTheBox('thebox')
		})
		.catch((reason) => {
			alert(locale.nodata)
		})
}

function setRelated(app) {/*
	if (!app.related || (app.related && app.related.length == 0)) {
		$('#related').innerHTML = ''
		return
	}

	let html = `<p><b>${locale.related}</b></p>`
	for (let item of app.related) {
		html += `<div class="mdl-list__item"><a href="#/${cf}/${item}">${appDB.find((x) => x[0] == item)[1]}</a></div>`
	}
	html += '<hr/>'
	$('#related').innerHTML = html
	*/
}

function setDesc(o) {/*
	let screenshotString = ''
	if ('desc' in o) {
		let desc = b64u(o['desc']).replace(/\/smile\//g, 'https://web.archive.org/web/0if_/http://rugame.mobi/smile/')
		if (!(cf in loaded)) {
			$('#appDesc').innerHTML = desc
		} else {
			if (!loaded[cf].confirmed) {
				$('#appDesc').innerHTML = desc
			}
			loaded[cf].all.then((s) => {
				if (screenshots && 'i' + o.id in window['scr_' + cf]) {
					screenshotString += `<br><center><img src="data:image/png;base64,${window['scr_' + cf]['i' + o.id]}"></center><br>`
				}
				$('#appDesc').innerHTML = screenshotString + desc
				try {
					setRelated(o)
				} catch (e) {
					console.error(e)
				}
			})
		}
	}
*/
}

function setField(obj, prp, fld, sp) {
	let f = $('#' + fld)
	let p = innerContent
	if (prp in obj) {
		if (sp && sp in obj[prp]) {
			f[p] = obj[prp][sp]
		} else {
			f[p] = obj[prp]
		}
	} else {
		f[p] = '?'
	}
}

function closeTheBox(b) {
	$('#infobox').classList.add('hidden')
	$$('.box').forEach((h) => {
		h.classList.add('hidden')
	})
	if (!b) {
		window.location.hash = '#'
	}
	document.title = 'RuGame Archive'
}

function openTheBox(id) {
	$('#' + id).classList.remove('hidden')
	$('#infobox').classList.remove('hidden')
	$('#lybox').scroll(0, 0)
}

/*
function showFavourites() {
	let html = ''
	for (fv in favs) {
		let fx = fv.substr(1)
		let f = fx.split('_')

		let id = parseInt(f[1], 32)
		let appType = getCfID(parseInt(f[0]))
		let name = favs[fv]
		html += `
		<li class="mdl-list__item" onclick="relocate('#/${appType}/${id}')">
		<span class="mdl-list__item-primary-content">
			  <span class="mdl-list__item-text-body">${name}</span>
		</span>
		<span class="mdl-list__item-secondary-content">
			<a class="mdl-list__item-secondary-action" href="#/${appType}/${id}"><i class="material-icons">star</i></a>
		</span></li>`
	}
	document.querySelector('#t_-4').innerHTML = html
	showCustomTab('favourites', 4)
}
*/
/*
function showComments() {
	showCustomTab('comments', 1)
	if (!vkinit && VK) {
		VK.init({apiId: 0x4f9438, onlyWidgets: true})
		VK.Widgets.Comments('t_-1', {limit: 20, width: 'auto', attach: false})
		$('#t_-1').innerHTML += '<a id="tglink" href="tg://resolve?domain=konon_mobi">Беседа konon.mobi в Telegram.</a>'
		vkinit = true
	}
}
*/
function autoClose() {
	if (drawerON()) {
		ly.MaterialLayout.toggleDrawer()
	}
}

function drawerON() {
	return ly.MaterialLayout.drawer_.classList.contains('is-visible')
}

function initSwipes(a) {
	// navbar swipe opener
	let n = {
		open: false,
		startloc: [],
		complete: false,
		iterator: 0,
		width: 240,
		pos: 0,
		element: $('.mdl-layout__drawer'),
		bg: $('.mdl-layout__obfuscator'),
	}

	window.addEventListener(
		'touchstart',
		function (e) {
			n.startloc = [e.touches[0].clientX, e.touches[0].clientY]
			n.complete = false
			n.open = $('.mdl-layout__drawer').classList.contains('is-visible')
			n.iterator = 0
			n.pos = 0
			n.allowed = $('#infobox').classList.contains('hidden')
		},
		supportsPassive ? {passive: !0} : !1
	)

	window.addEventListener(
		'touchmove',
		function (e) {
			if ((!n.open && n.startloc[0] > 60) || (n.open && n.startloc[0] > 250) || !n.allowed) return
			n.iterator++
			//detect horizontal swipe
			let loc = [e.touches[0].clientX, e.touches[0].clientY]
			if (n.iterator > 4 && !n.complete) {
				let diff = [loc[0] - n.startloc[0], loc[1] - n.startloc[1]]
				if (Math.abs(diff[0]) > Math.abs(diff[1])) {
					n.complete = true
					n.element.style.transition = 'none'
					n.bg.style.transition = 'none'
				}
			}
			if (n.complete) {
				n.pos = n.width - loc[0]
				if (n.startloc[0] > 20 && !n.open) {
					n.pos += n.startloc[0]
				}
				if (n.startloc[0] < 200 && n.open) {
					n.pos -= n.width - n.startloc[0]
				}
				n.pos = n.pos < 0 ? 0 : n.pos
				n.element.style.transform = `translate(-${n.pos}px)`
				n.bg.style.opacity = 1 - n.pos / 250
			}
		},
		supportsPassive ? {passive: !0} : !1
	)

	window.addEventListener(
		'touchend',
		function () {
			if (n.complete) {
				n.element.style.transition = '.4s all'
				n.bg.style.transition = '.4s all'
				n.element.style.transform = ''
				n.bg.style.opacity = ''
				if (n.pos < 135) {
					n.element.classList.add('is-visible')
					n.bg.classList.add('is-visible')
				} else {
					n.element.classList.remove('is-visible')
					n.bg.classList.remove('is-visible')
				}
			}
		},
		supportsPassive ? {passive: !0} : !1
	)

	//tab swipe switcher
	let touchTool = {
		translateX: function (t, e, n) {
			;(t.style.display = 'block'), (t.style.transition = n ? 'transform 0.2s' : ''), (t.style.transform = 'translate3d(' + e + 'px, 0, 0)')
		},
		prevElement: function (t) {
			return t.previousElementSibling
		},
		nextElement: function (t) {
			return t.nextElementSibling
		},
		resetStyles: function () {
			for (var t = this.firstElementChild; t; ) {
				t.style.display = ''
				t.style.transition = ''
				t.style.transform = ''
				t = touchTool.nextElement(t)
			}
		},
	}

	lists.addEventListener(
		'touchstart',
		function (t) {
			this.startX = t.changedTouches[0].clientX
			this.startY = t.changedTouches[0].clientY
			this.canGoRight = $('#alltabs > .is-active').nextElementSibling
			this.canGoRight = this.canGoRight ? !this.canGoRight.classList.contains('hidden') : false
			this.canGoLeft = $('#alltabs > .is-active').previousElementSibling
			this.canGoLeft = this.canGoLeft ? !this.canGoLeft.classList.contains('hidden') : false
			if (this.startX < 60 || cf == 'custom') {
				this.canGoRight = false
				this.canGoLeft = false
			}
		},
		supportsPassive ? {passive: !0} : !1
	)

	lists.addEventListener(
		'touchmove',
		function (t) {
			if (!(this.childElementCount < 2)) {
				if (!this.touchDir) {
					var e = Math.abs(t.changedTouches[0].clientX - this.startX),
						n = Math.abs(t.changedTouches[0].clientY - this.startY)
					this.touchDir = e > n ? 'x' : 'y'
				}
				if (!this.selected) {
					this.selected = $('#lists > .is-active')
				}
				if ('x' === this.touchDir) {
					var i = Math.round(t.changedTouches[0].clientX - this.startX),
						prev = touchTool.prevElement(this.selected),
						next = touchTool.nextElement(this.selected)
					if ((!prev && i > 0) || (!next && i < 0) || (next && i < 0 && !this.canGoRight) || (prev && i > 0 && !this.canGoLeft)) {
						i = 0
					}
					touchTool.translateX(this.selected, i)
					if (prev) touchTool.translateX(prev, i - this.offsetWidth)
					if (next) touchTool.translateX(next, i + this.offsetWidth)
				}
			}
			return true
		},
		supportsPassive ? {passive: !0} : !1
	)
	lists.addEventListener('transitionend', (e) => touchTool.resetStyles.call(lists))
	lists.addEventListener(
		'touchend',
		function (t) {
			if (!(this.childElementCount < 2 || t.touches.length)) {
				if ('x' === this.touchDir) {
					let activeTab = $('#alltabs > .is-active')
					var e = Math.round(t.changedTouches[0].clientX - this.startX),
						prev = touchTool.prevElement(this.selected),
						next = touchTool.nextElement(this.selected)
					if ((!prev && e > 0) || (!next && e < 0) || (next && e < 0 && !this.canGoRight) || (prev && e > 0 && !this.canGoLeft)) {
						e = 0
					}
					if (e > 0) {
						if (e > 100) {
							if (e === this.offsetWidth) {
								touchTool.resetStyles.call(lists)
							} else {
								activeTab.classList.remove('is-active')
								activeTab = activeTab.previousElementSibling
								activeTab.classList.add('is-active')
								touchTool.translateX(prev, 0, !0)
								touchTool.translateX(this.selected, this.offsetWidth, !0)
								$('#alltabs').scrollTo({left: activeTab.offsetLeft - 60, top: 0, behavior: 'smooth'})
							}
							this.selected = prev
						} else {
							touchTool.translateX(prev, -this.offsetWidth, !0)
							touchTool.translateX(this.selected, 0, !0)
						}
					} else {
						if (e < 0) {
							if (e < -100) {
								if (e === -this.offsetWidth) {
									touchTool.resetStyles.call(lists)
								} else {
									activeTab.classList.remove('is-active')
									activeTab.nextElementSibling.classList.add('is-active')
									touchTool.translateX(this.selected, -this.offsetWidth, !0)
									touchTool.translateX(next, 0, !0)
									$('#alltabs').scrollTo({left: activeTab.offsetLeft - 60 + activeTab.offsetWidth, top: 0, behavior: 'smooth'})
								}
								this.selected = next
							} else {
								touchTool.translateX(this.selected, 0, !0)
								touchTool.translateX(next, this.offsetWidth, !0)
							}
						} else {
							touchTool.resetStyles.call(lists)
						}
					}
					$('#lists > .is-active').classList.remove('is-active')
					this.selected.classList.add('is-active')
				}
				this.touchDir = null
				this.selected = null
			}
		},
		supportsPassive ? {passive: !0} : !1
	)
}

function saveConfig() {
	localStorage['rg-icons'] = icons = cicons.checked
	localStorage['rg-screenshots'] = screenshots = cscreenshots.checked
	localStorage['rg-intro'] = 1
	localStorage['rg-alphasort'] = alphasort = cazsort.checked
	localStorage['rg-archelper'] = archiveHelper = carchelper.checked
	localStorage['rg-performance'] = pageRenderingMode = parseInt(document.getElementsByName('pmode')[0].value)
	closeTheBox(1)
	if (cf == '') {
		autoSelectSection()
		setContentVisibilityListRendering(pageRenderingMode)
	} else {
		if (confirm(locale.reload)) {
			window.location.reload()
		}
	}
}

function toggleBlogPost(id) {
	if ($('.bpopened')) {
		relocate(`#!/blog/`)
	} else {
		relocate(`#!/blog/${id}`)
	}
}

function showBlogPosts(hashChange) {
	/*
	if (!isBlogLoaded) {
		fetchJSON('blog/blog.json').then((b) => {
			for (let post of b) {
				post.longtext = b64u(post.longtext)
				post.longtext = post.longtext.replace(
					/\[\[(app|cgame|game)-([0-9]+)-([^\]]+)\]\]/gim,
					'<div><a href="#/$1s/$2"><i class="material-icons">&#xE250;</i> $3 </a></div>'
				)
				post.longtext = post.longtext.replace(
					/@@([^@]+)@([^@]+)@@/gim,
					'<div><button class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect" onclick="this.parentElement.lastChild.classList.toggle(\'hidden\')">$1</button><div class="hidden">$2</div></div>'
				)
				$('#t_-3').innerHTML += `
<div class="mdl-grid blogpost" id="blog_${post.id}">
<div class="mdl-card--expand mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col">
<div class="mdl-card__title" style="background:url(${post.bgpic})" onclick="toggleBlogPost(${post.id})"><h2 class="mdl-card__title-text">${post.title}</h2></div>
<div class="mdl-card__supporting-text">
${post.desc}
<span class="mdl-chip"><span class="mdl-chip__text">${post.date}</span></span>
</div>
<div class="mdl-card__menu">
<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick="toggleBlogPost(${post.id})"><i class="material-icons">keyboard_arrow_right</i></button>
</div>
<div class="mdl-card__actions mdl-card--border">${post.longtext}</div>
</div>
</div>`
				blogPosts[post.id] = post
			}
		})
	}
	showCustomTab('blog', 3, hashChange === false ? false : undefined)
	isBlogLoaded = true
	*/
}

function showMirrors() {
	/*
	let localM = localStorage['rg-lmirror'] || false
	document.querySelector('#t_-5').innerHTML = locale.mirrormenu
	showCustomTab('mirrors', 5)
	*/
}

function showCustomTab(menuItem, id, norelocate) {
	switchTabs(cf, '')
	switchSelectedMenuItem(menuItem)
	$('#tab_t_-' + id).click()
	cf = 'custom'
	if (typeof norelocate == 'undefined') {
		relocate('#!/' + menuItem)
	}
}

function click(arg, id) {
	autoClose()
	menuA[id](arg, id)
}

/*function selectMirrorPath() {
	var lmp = prompt('Введите путь до основной папки', atob('aHR0cDovL29sZGZhZy50b3AvdHJhc2gv'))
	if (lmp) {
		if (!lmp.match(/^http|^ftp/i)) {
			lmp = lmp.replace(/file:\/\/\/?/g, '')
			lmp = 'file:///' + lmp
			lmp = lmp.replace(/\\/g, '/')
			lmp = lmp[lmp.length - 1] == '/' ? lmp : lmp + '/'
			alert(
				'Браузеры не позволяют ссылаться напрямую на локальные файлы. В качестве решения будет показано окно с ссылкой на локалньый файл. Её можно скопировать и вставить в адресную строку. В качестве альтернативы можно поставить локальный сервер, с ним все будет работать напрямую.'
			)
		}
		localStorage['lmirror'] = lmp
	}

}
*/
function registerSW() {
	let updateReady = function (worker) {
		worker.postMessage({action: 'refresh'})
	}
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker
			.register('./sw.js')
			.then(function (reg) {
				if (!navigator.serviceWorker.controller) {
					return
				}

				if (reg.waiting) {
					updateReady(reg.waiting)
					return
				}
				if (reg.installing) {
					return
				}

				reg.addEventListener('updatefound', () => {
					let rfr = (w) => {
						w.addEventListener('statechange', () => {
							if (w.state === 'installed') {
								updateReady(w)
							}
						})
					}
					rfr(reg.installing)
				})
			})
			.catch((e) => console.log('Unable to register serviceWorker!'))
		let refreshing
		navigator.serviceWorker.addEventListener('controllerchange', () => {
			if (refreshing) return
			window.location.reload()
			refreshing = true
		})
	}
}

setTimeout(() => {
	initSwipes();
	//setTimeout(setupConfiguredOptions, 400);
	//app.displayMode = D_MODES.AdvancedPagination;
	(async () => await app.datasource.loadMetadata())()
	if (localStorage['rg-intro'] || navigator.userAgent.match('bot') || window.location.hash.match('blog')) {
		autoSelectSection()
	} else {
		openTheBox('about')
	}

	registerSW()
}, 1200)


function generateMirrorSample() { /*
	let q = appDB.map((x) => 'agcsz'[getCfID(x[2])] + x[0] + ' : ' + x[1]).sort().join('\r\n')
	q = URL.createObjectURL(new Blob(['\ufeff' + q], {encoding: 'UTF-8', type: 'text/plain;charset=UTF-8'}))
	let l = appDB.length
	let e = $('#msample')
	e.innerHTML = `<br>Ссылка на файл (${l} приложений). Если не открывается, отключите блокировщик рекламы (её тут и так нет).`
	e.href = q
	e.target = '_blank'
	e.click()
	*/
}

function switchLang() {
	localStorage['rg-lng'] = locale.l === 'en' ? 'ru' : 'en'
	window.location.reload()
}

var menuA = [selectSection, openTheBox, showCustomTab, showBlogPosts, false, false, showMirrors]
