function alphasorter(a, b) {
    let al = a[1].toLowerCase()
    let bl = b[1].toLowerCase()
	return al < bl ? -1 : al > bl ? 1 : 0
}
