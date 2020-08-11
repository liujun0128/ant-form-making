<template>
  <div>
    <iframe
      v-if="isIframeLoaded"
      ref="previewPage"
      class="result-wrapper"
      frameborder="0"
      src="/preview.html"
      @load="iframeLoad"
    />

    <a-spin v-show="load">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
    </a-spin>
  </div>
</template>

<script>

import { makeUpHtml } from './util/html'
import { makeUpJs } from './util/js'
import { makeUpCss } from './util/css'
// import beautifier from 'beautifier'
// import { beautifierConf } from './util'

export default {
  name: 'FormPreview',
  data () {
    return {
      isIframeLoaded: false,
      htmlCode: '',
      jsCode: '',
      cssCode: '',
      load: false
    }
  },
  mounted () {

  },
  methods: {
    iframeLoad () {
      this.runCode()
    },
    open (data) {
      this.formData = data
      this.isIframeLoaded = false
      this.load = true
      this.$nextTick(() => {
        this.isIframeLoaded = true
      })
    },
    runCode () {
      this.htmlCode = makeUpHtml(this.formData)
      // this.htmlCode = beautifier.html(this.htmlCode, beautifierConf.html)

      this.jsCode = makeUpJs(this.formData)
      // this.jsCode = beautifier.js(this.jsCode, beautifierConf.js)

      this.cssCode = makeUpCss(this.formData)
      // this.cssCode = beautifier.css(this.cssCode, beautifierConf.js)

      const postData = {
        type: 'refreshFrame',
        data: {
          generateConf: this.formData.config,
          html: this.htmlCode,
          js: this.jsCode.replace('export default', ''),
          css: this.cssCode
        }
      }

      this.$refs.previewPage.contentWindow.postMessage(
        postData,
        location.origin
      )
      this.load = false
    }
  }
}
</script>

<style scoped lang="less">
  .result-wrapper {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
</style>
