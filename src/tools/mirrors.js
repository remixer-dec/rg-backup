function selectMirrorPath() {
  let path = prompt(locale.mirrors.path, atob('aHR0cHM6Ly9vbGRmYWcudG9wL3RyYXNoLw=='))
  if (path) {
    if (!path.match(/^http|^ftp/i)) {
      path = path.replace(/file:\/\/\/?/g, '')
      path = 'file:///' + path
      path = path.replace(/\\/g, '/')
      path = path[path.length - 1] === '/' ? path : path + '/'
      alert(locale.mirrors.fileSchema)
    }
    localStorage.lmirror = path
  }
}

// deprecated
function generateMirrorSample() {}

export {selectMirrorPath, generateMirrorSample}
