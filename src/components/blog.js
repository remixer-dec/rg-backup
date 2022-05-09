import {fetchJSON, b64u} from '../tools/utils'
import $template from './html/blog.html?raw'
import './css/blog.css'

const cachedPosts = []

export default function Blog(props) {
  return {
    $template,
    posts: [],
    contentLoadingStarted: false,
    loadContent() {
      this.contentLoadingStarted = true
      app.loading = true
      fetchJSON(app.datasource.ds.host + 'blog/blog.json').then((blogPosts) => {
        for (const post of blogPosts) {
          post.longtext = b64u(post.longtext)
          /* app links */
          post.longtext = post.longtext.replace(
            /\[\[(app|cgame|game)-([0-9]+)-([^\]]+)\]\]/gim,
            '<div><a href="#/$1s/$2"><i class="material-icons">&#xE250;</i> $3 </a></div>'
          )
          /* v2-compatible spoilers */
          post.longtext = post.longtext.replace(
            /@@([^@]+)@([^@]+)@@/gim,
            '<div><button class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect" onclick="this.parentElement.lastChild.classList.toggle(\'hidden\')">$1</button><div class="hidden">$2</div></div>'
          )
        }
        this.posts = blogPosts
        app.loading = false
      })
    },
    mounted() {
      if (!this.contentLoadingStarted) {
        if (cachedPosts.length > 0) {
          this.posts = cachedPosts
          this.contentLoadingStarted = true
        } else this.loadContent()
      }
    }
  }
}
