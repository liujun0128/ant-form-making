<template>
  <a-card :body-style="{padding: '5px'}" :bordered="false" class="widget-config">
    <a-tabs v-model="activeKey">
      <a-tab-pane key="0">
        <span slot="tab">
          <i class="designer-icon">&#xe615;</i>
          index
        </span>
      </a-tab-pane>
      <a-tab-pane key="1">
        <span slot="tab">
          <i class="designer-icon">&#xe7d1;</i>
          template
        </span>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <i class="designer-icon">&#xe810;</i>
          javascript
        </span>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <i class="designer-icon">&#xee1d;</i>
          CSS
        </span>
      </a-tab-pane>
    </a-tabs>
    <div @click="$emit('close')" class="form-close">
      <i class="designer-icon">&#xe667;</i>关闭
    </div>
    <div id="sIndex" v-show="activeKey=='0'" :key="0" class="container"></div>
    <div id="sVue" v-show="activeKey=='1'" :key="1" class="container"></div>
    <div id="sJavascript" v-show="activeKey=='2'" :key="2" class="container"></div>
    <div id="sCSS" v-show="activeKey=='3'" :key="3" class="container"></div>
  </a-card>
</template>

<script>
import * as monaco from 'monaco-editor'
import { makeUpHtml } from './util/html'
import { makeUpJs } from './util/js'
import { makeUpCss } from './util/css'

import beautifier from 'beautifier'
import { beautifierConf, buildScript, buildStyle } from './util/index'

export default {
  name: 'FormDrawer',
  data () {
    return {
      activeKey: '0',
      htmlCode: null,
      jsCode: null,
      cssCode: null,

      formData: null,
      editor: {
        indexEditor: null,
        vueEditor: null,
        jsEditor: null,
        cssEditor: null
      }
    }
  },
  methods: {
    open (data) {
      setTimeout(() => {
        this.formData = data
        this.htmlCode = makeUpHtml(this.formData)
        this.htmlCode = beautifier.html(this.htmlCode, beautifierConf.html)

        this.jsCode = makeUpJs(this.formData)
        this.jsCode = beautifier.js(this.jsCode, beautifierConf.js)

        this.cssCode = makeUpCss(this.formData)
        this.cssCode = beautifier.css(this.cssCode, beautifierConf.js)

        this.draw('indexEditor', `${this.htmlCode}\n${buildScript(this.jsCode)}\n${buildStyle(this.cssCode)}`, 'sIndex', 'html')

        this.draw('vueEditor', this.htmlCode, 'sVue', 'html')
        this.draw('jsEditor', this.jsCode, 'sJavascript', 'javascript')
        this.draw('cssEditor', this.cssCode, 'sCSS', 'css')
      })
    },
    draw (tag, v, ele, language) {
      if (this.editor[tag] !== null) {
        this.editor[tag].setValue(v)
      } else {
        this.editor[tag] = monaco.editor.create(document.getElementById(ele), {
          value: v,
          fontSize: '14px',
          language: language,
          theme: 'vs-dark',
          readOnly: false,
          folding: true,
          foldingStrategy: 'indentation', // 代码可分小段折叠
          automaticLayout: true, // 自适应布局
          overviewRulerBorder: false, // 不要滚动条的边框
          scrollBeyondLastLine: false, // 取消代码后面一大段空白
          height: 500,
          minimap: {
            // 不要小地图
            enabled: false
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    width: 100%;
    height: calc(100vh - 75px);
    overflow: hidden;
    border: 1px solid #eaeaea;

    .monaco-editor .scroll-decoration {
      box-shadow: none;
    }
  }

  .ant-tabs-bar {
    margin: unset !important;
  }

  .form-close {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 20px;
    z-index: 10;

    &:hover {
      color: #f5222d;
    }
  }
</style>
