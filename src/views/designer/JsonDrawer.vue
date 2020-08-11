<template>
  <div>
    <div class="json-tools bg-white padding-lg">
      <a class="designer-icon" @click="refresh">&#xe65c;刷新</a>
      <a class="designer-icon  margin-left-lg copy-json-btn">&#xe63e;复制</a>
      <a class="designer-icon  margin-left-lg" @click="exports">&#xe616;导出</a>
      <a style="float: right;" class="designer-icon" @click="$emit('close')">&#xe667;关闭</a>
    </div>
    <div id="monaco" class="code-container"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import beautifier from 'js-beautify'
import { saveAs } from 'file-saver'
import ClipboardJS from 'clipboard'
export default {
  name: 'JsonDrawer',
  data () {
    return {
      editor: null,
      JSONData: this.data
    }
  },
  mounted () {
    const _this = this
    const clipboard = new ClipboardJS('.copy-json-btn', {
      text: trigger => {
        _this.$notification.open({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return this.JSONData
      }
    })
    clipboard.on('error', e => {
      this.$message.error('代码复制失败')
    })
  },
  methods: {
    init () {
      const _this = this
      this.JSONData = beautifier.js(JSON.stringify(_this.JSONData), {
        indent_size: '2',
        indent_char: ' ',
        max_preserve_newlines: '-1',
        preserve_newlines: false,
        keep_array_indentation: false,
        break_chained_methods: false,
        indent_scripts: 'normal',
        brace_style: 'end-expand',
        space_before_conditional: true,
        unescape_strings: false,
        jslint_happy: true,
        end_with_newline: true,
        wrap_line_length: '110',
        indent_inner_html: true,
        comma_first: false,
        e4x: true,
        indent_empty_lines: true
      })
    },
    open (data) {
      this.JSONData = data
      this.init()
      this.draw()
    },
    refresh () {
      this.draw()
    },
    exports () {
      const value = `${+new Date()}.json`
      const codeStr = this.editor.getValue()
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, value)
    },
    draw () {
      const _this = this
      if (this.editor) {
        this.editor.setValue(_this.JSONData)
      } else {
        this.editor = monaco.editor.create(document.getElementById('monaco'), {
          value: _this.JSONData,
          fontSize: '14px',
          language: 'json',
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
  .code-container {
    width: 100%;
    height: calc(100vh - 56px);
    overflow: hidden;
    border: 1px solid #eaeaea;

    .monaco-editor .scroll-decoration {
      box-shadow: none;
    }
  }
</style>
