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
        items: props.items,
    }
}

function MenuItemSpoiler(props) {
    return {
        $template: '#MenuItemSpoiler',
        open: false,
        icon: props.icon,
        title: props.title,
        items: props.items,
        toggleSpoiler() {
            this.open = !this.open
        }
    }
}

const javaMenuSpoiler = {
    icon: 'smartphone',
    title: 'J2ME',
    items: Object.entries(locale.folders.J2ME).map(([key, value]) => {
        return {
            name: value,
            link: key
        }
    })
}

const symbianMenuSpoiler = {
    icon: 'tablet',
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

if (locale.l == 'ru') {
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
