import $template from './html/paginator.html?raw'
import './css/paginator.css'

const cached = {totalPages: 1, range: 1, currentPage: 1, ret: {leftPage: 1, rightPage: 1}}

/* returns page numbers for << and >> buttons */
function getLRpages(totalPages, range, currentPage) {
  if (cached.totalPages === totalPages && cached.range === range && cached.currentPage === currentPage) {
    return cached.ret
  }
  let k = 1; let l = totalPages
  if (totalPages > range) {
    l = range
    if (currentPage > range / 2) {
      k = currentPage - Math.floor(range / 2)
      l = k + range - 1
      if (currentPage > totalPages - Math.ceil(range / 2)) {
        k = totalPages - range + 1
        l = totalPages
      }
    }
  }
  cached.totalPages = totalPages
  cached.range = range
  cached.currentPage = currentPage
  cached.ret = {leftPage: k, rightPage: l}
  return cached.ret
}

export default function Pagination(props) {
  return {
    $template,
    totalPages: parseInt(props.totalPages),
    get currentPage() {
      return parseInt(app.selectedPage)
    },
    get range() {
      const range = this.totalPages > 3 ? 5 : this.totalPages
      return range
    },
    get pagesLR() {
      return getLRpages(this.totalPages, this.range, this.currentPage)
    },
    get displayPage() {
      return this.pagesLR.leftPage - 1 + this.pageNumber
    },
    changePage(p) {
      app.selectedPage = p
    },
    prevPage() {
      this.changePage(this.currentPage - 1)
    },
    nextPage() {
      this.changePage(this.currentPage + 1)
    },
    firstPage() {
      this.changePage(1)
    },
    lastPage() {
      this.changePage(this.totalPages)
    },
    toPage(e) {
      this.changePage(parseInt(e.target.getAttribute('data-page')))
    }
  }
}
