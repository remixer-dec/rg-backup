/* eslint-disable eqeqeq */
import {D_MODES} from '../enums'
const ITEMS_PER_PAGE = 20

function Tab(props) {
  return {
    $template: '#Tab',
    link: props.dir,
    name: props.id,
    icon: props.name,
    tabClick(e) {
      app.selectedPage = 1
      e.stopImmediatePropagation()
    }
  }
}

function TabGroup(props) {
  return {
    $template: '#TabGroup'
  }
}

function TabContent(props) {
  return {
    pages: Math.ceil(props.items.length / ITEMS_PER_PAGE),
    $template: '#TabContent',
    items: props.items,
    dir: props.dir,
    catId: props.catId,
    nonScrollable: props.nonScrollable,
    isVisible(id) {
      return app.selectedCategory == id
    },
    loadOnScroll(e) {
      if (app.config.displaymode != D_MODES.Onscroll) return
      if (e.target.offsetHeight + e.target.scrollTop > e.target.scrollHeight - 60) {
        if (app.selectedPage < this.pages) app.selectedPage += 1
      }
    }
  }
}

function TabContentPage(props) {
  return {
    apps: props.items.slice(props.page * ITEMS_PER_PAGE, (1 + props.page) * ITEMS_PER_PAGE),
    $template: '#TabContentPage',
    isHidden(page) {
      return (app.config.displaymode == D_MODES.Pagination && page != app.selectedPage) ||
             (app.config.displaymode == D_MODES.Onscroll && page > app.selectedPage)
    }
  }
}

function DynamicTabContentPage(props) {
  return {
    get apps() {
      return props.items.slice((app.selectedPage - 1) * ITEMS_PER_PAGE, app.selectedPage * ITEMS_PER_PAGE)
    },
    $template: '#TabContentPage'
  }
}

function CustomContentFragment(props) {
  return {
    $template: '#CustomContentFragment'
  }
}

export {Tab, TabGroup, TabContent, TabContentPage, DynamicTabContentPage, CustomContentFragment}
