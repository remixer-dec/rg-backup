import {alphasorter} from './tools/utils' // not worker due to issues with Safari support

const cachedTargets = {}

function findIn(src, query) {
  const q = new RegExp(query, 'i')
  const results = src.filter(x => q.test(x[1]))
  return results || []
}

async function findInMany(priority, query, limit = 10, searchOnlyIn = []) {
  // limit search targets to specified ones
  const src = searchOnlyIn.length === 0
    ? cachedTargets
    : Object.fromEntries(Object.entries(cachedTargets).filter(x => searchOnlyIn.indexOf(x[0]) !== -1))
  // do not process less than 2 symbols
  if (query.length < 2) return {total: 0, items: []}
  let priorityResults = []
  let results = []
  // search in relevante directory first
  if (priority in src) {
    priorityResults = findIn(src[priority], query)
    priorityResults.forEach(item => (item[2] = priority))
    priorityResults.sort(alphasorter)
  }
  for (const target in src) {
    if (target === priority) continue
    const found = findIn(src[target], query)
    found.forEach(item => (item[2] = target))
    results = results.concat(found)
  }
  results.sort(alphasorter)
  results = priorityResults.concat(results)
  return {
    total: results.length,
    items: results.length > 0 ? results.slice(0, limit) : []
  }
}

async function addCachedTarget(name, data) {
  cachedTargets[name] = data
}

export {
  findIn,
  findInMany,
  addCachedTarget
}
