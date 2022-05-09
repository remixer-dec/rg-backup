const {fetchJSON, alphasorter} = new ComlinkWorker(new URL('./utils.js', import.meta.url), {})
export {
  fetchJSON, alphasorter
}
