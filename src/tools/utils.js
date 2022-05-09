function alphasorter(a, b) {
  const al = a[1].toLowerCase()
  const bl = b[1].toLowerCase()
  return al < bl ? -1 : al > bl ? 1 : 0
}

async function fetchJSON(filename, ...args) {
  try {
    const f = await fetch(filename, ...args)
    return await f.json()
  } catch (e) {}
}

// base64 unicode decoder
function b64u(str) {
  return decodeURIComponent(
    atob(str).split('').map(c => ('%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))).join('')
  )
}

class EPromise {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    this.promise.resolve = this.resolve
    this.promise.reject = this.reject
    return this.promise
  }
}

export {alphasorter, fetchJSON, b64u, EPromise}
