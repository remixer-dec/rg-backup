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
    pages: Math.ceil(props.category.length/20),
    $template: '#TabContent',
    dir: props.dir,
    isVisible(id) {
      if (app.selectedCategory == id)
        return app.selectedCategory == id // && app.selectedDir === props.dir
    },
    loadOnScroll(e) {
        if (app.displayMode != D_MODES.Onscroll) return
        if (e.target.offsetHeight + e.target.scrollTop > e.target.scrollHeight - 60) {
            app.selectedPage += 1
        }
    }
  }
}

function TabContentPage(props) {
  return {
    apps: props.category.slice(props.page * 20, (1 + props.page) * 20),
    $template: '#TabContentPage',
    isHidden(page) {
        return (app.displayMode == D_MODES.Pagination && page != app.selectedPage) ||
               (app.displayMode == D_MODES.Onscroll && page > app.selectedPage)
    }
  }
}

function DynamicTabContentPage(props) {
  return {
    get apps() {
        return props.category.slice((app.selectedPage - 1) * 20, app.selectedPage * 20)
    },
    $template: '#TabContentPage'
    }
}


function CustomContentFragment(props) {
    return {
        $template: '#CustomContentFragment'
    }
}
