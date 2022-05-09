function MenuItem(props) {
  return {
    $template: '#MenuItem',
    link: props.link,
    name: props.name,
    icon: props.icon || 'keyboard_arrow_right'
  }
}

function MenuItemGroup(props) {
  return {
    $template: '#MenuItemGroup',
    items: props.items
  }
}

function MenuItemSpoiler(props) {
  return {
    $template: '#MenuItemSpoiler',
    open: false,
    icon: props.icon,
    eIcon: props.externalIcon,
    title: props.title,
    items: props.items,
    toggleSpoiler() {
      this.open = !this.open
    }
  }
}

const javaMenuSpoiler = {
  icon: '',
  externalIcon: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M15 2a1 1 0 0 0-1 1v3h-4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h5a2 2 0 0 0 2-2V8a2 2 0 0 0-1-1.7V3c0-.5-.4-1-1-1m-5 6h5v5h-5V8m0 7h1v1h-1v-1m2 0h1v1h-1v-1m2 0h1v1h-1v-1m-4 2h1v1h-1v-1m2 0h1v1h-1v-1m2 0h1v1h-1v-1m-4 2h1v1h-1v-1m2 0h1v1h-1v-1m2 0h1v1h-1v-1Z"/>
  </svg>`,
  title: 'J2ME',
  items: Object.entries(locale.folders.J2ME).map(([key, value]) => {
    return {
      name: value,
      link: key
    }
  })
}

const symbianMenuSpoiler = {
  icon: 'smartphone',
  title: 'Symbian',
  items: Object.entries(locale.folders.Symbian).map(([key, value]) => {
    return {
      name: value,
      link: key
    }
  })
}

const mainMenuItemGroup = {
  items: [{
    icon: 'star',
    name: locale.favs,
    link: 'favourites'
  },
  {
    icon: 'settings',
    name: locale.about,
    link: 'ui/settings'
  }
  ]
}

if (locale.l === 'ru') {
  mainMenuItemGroup.items.push({
    icon: 'book',
    name: locale.blog,
    link: 'blog'
  })
  mainMenuItemGroup.items.push({
    icon: 'mode_comment',
    name: locale.comments,
    link: 'comments'
  })
}

mainMenuItemGroup.items.push({
  icon: 'clear_all',
  name: locale.mirrors,
  link: 'mirrors'
})

export {MenuItem, MenuItemGroup, MenuItemSpoiler, mainMenuItemGroup, javaMenuSpoiler, symbianMenuSpoiler}
