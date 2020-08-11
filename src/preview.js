import Vue from 'vue'
import './core/lazy_use'
import lt from 'lazyit-tools'
import 'lazyit-tools/lib/lazyit-tools.css'
Vue.use(lt)
const $previewApp = document.getElementById('previewApp')
window.addEventListener('message', init, false)

function init (event) {
  const code = event.data.data
  if (event.data.type === 'refreshFrame') {
    $previewApp.innerHTML = `<style>${code.css}</style><div id="app"></div>`
    const attrs = ''
    newVue(attrs, code.js, code.html)
  }
}

function newVue (attrs, main, html) {
  // eslint-disable-next-line no-eval
  main = eval(`(${main})`)
  main.template = `<div>${html}</div>`
  new Vue({
    components: {
      child: main
    },
    data () {
      return {
        visible: true
      }
    },
    template: `<div><child ${attrs}/></div>`
  }).$mount('#app')
}
