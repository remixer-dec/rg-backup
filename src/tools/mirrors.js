function selectMirrorPath() {
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

function generateMirrorSample() {
	let q = appDB.map((x) => 'agcsz'[getCfID(x[2])] + x[0] + ' : ' + x[1]).sort().join('\r\n')
	q = URL.createObjectURL(new Blob(['\ufeff' + q], {encoding: 'UTF-8', type: 'text/plain;charset=UTF-8'}))
	let l = appDB.length
	let e = $('#msample')
	e.innerHTML = `<br>Ссылка на файл (${l} приложений). Если не открывается, отключите блокировщик рекламы (её тут и так нет).`
	e.href = q
	e.target = '_blank'
	e.click()
}
