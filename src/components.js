/* eslint-disable object-property-newline */
import {Tab, TabGroup, TabContent, TabContentPage, DynamicTabContentPage, CustomContentFragment} from './components/tabs'
import {MenuItem, MenuItemGroup, MenuItemSpoiler, mainMenuItemGroup, javaMenuSpoiler, symbianMenuSpoiler} from './components/menu'
import {QuickSearch, SearchResults} from './components/search'
import AppPage from './components/apppage'
import Blog from './components/blog'
import Discussion from './components/discussion'
import Favourites from './components/favourites'
import Pagination from './components/paginator'
import Select from './components/select'
import QuickSettingsWindow from './components/quicksettings'

const components = {
  Tab, TabGroup, TabContent, TabContentPage, DynamicTabContentPage, CustomContentFragment, Select,
  MenuItem, MenuItemGroup, MenuItemSpoiler, mainMenuItemGroup, javaMenuSpoiler, symbianMenuSpoiler,
  AppPage, Blog, Discussion, Favourites, Pagination, QuickSettingsWindow, QuickSearch, SearchResults
}

export default components
