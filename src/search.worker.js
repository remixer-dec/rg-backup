const {findIn, findInMany, addCachedTarget} = new ComlinkWorker(new URL('./search.js', import.meta.url), {})
export {
  findIn, findInMany, addCachedTarget
}
