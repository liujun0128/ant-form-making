<template>
  <div class="d-container">
    <div class="d-left">
      <left-panel/>
    </div>
    <div class="d-center">
      <div class="d-operation">
        <a-button @click="showPreview" style="margin-left: 5px;">
          <i class="designer-icon margin-right-sm">&#xe605;</i>
          预览
        </a-button>
        <a-button @click="showForm" style="margin-left: 5px;">
          <i class="designer-icon margin-right-sm">&#xe606;</i>
          查看源码
        </a-button>
        <a-button @click="showJson" style="margin-left: 5px;">
          <i class="designer-icon margin-right-sm">&#xe7bd;</i>
          查看JSON
        </a-button>
        <a-button class="copy-json-btn" style="margin-left: 5px;">
          <i class="designer-icon margin-right-sm">&#xe63e;</i>
          复制Vue
        </a-button>
        <a-button @click="exports" icon="download" style="margin-left: 5px;">
          导出Vue
        </a-button>
        <a-button icon="delete" style="margin-left: 5px;" @click="clear">
          清空
        </a-button>
      </div>
      <div class="d-main">
        <main-panel
          ref="mainPanel"
          :formConf="formConf"
          @select="select"/>
      </div>
    </div>
    <div class="d-right">
      <right-panel
        ref="rightPanel"
        :formConf="formConf"
        @updateAttr="updateAttr"
      />
    </div>

    <!--预览json-->
    <a-drawer
      :width="720"
      :visible="jsonVisible"
      @close="jsonVisible=false"
      :bodyStyle="{
        padding:'unset'
      }"
      :closable="false"
    >
      <json-drawer
        @close="jsonVisible=false"
        ref="jsonDrawer"
      />
    </a-drawer>

    <!--源码-->
    <a-drawer
      width="100%"
      :visible="formVisible"
      @close="formVisible=false"
      :bodyStyle="{
        padding:'unset'
      }"
      :closable="false"
    >
      <form-drawer @close="formVisible=false" ref="formDrawer"/>
    </a-drawer>

    <!--预览-->
    <a-drawer
      width="100%"
      :visible="previewVisible"
      @close="previewVisible=false"
      placement="left"
      :bodyStyle="{
        padding:'unset'
      }"
      title="预览"
      :closable="true"
    >
      <form-preview @close="previewVisible=false" ref="formPreview"/>
    </a-drawer>

  </div>
</template>

<script>
import leftPanel from './leftPanel'
import rightPanel from './rightPanel'
import mainPanel from './mainPanel'
import { formConf } from './config/config'
import JsonDrawer from './JsonDrawer'
import formDrawer from './formDrawer'
import formPreview from './formPreview'
import ClipboardJS from 'clipboard'
import { makeUpHtml } from './util/html'
import { beautifierConf, buildScript, buildStyle } from './util'
import { makeUpJs } from './util/js'
import { makeUpCss } from './util/css'
import beautifier from 'beautifier'
import { saveAs } from 'file-saver'

export default {
  components: { leftPanel, rightPanel, mainPanel, JsonDrawer, formDrawer, formPreview },
  name: 'Index',
  data () {
    return {
      /* 当前移动项 */
      activeWidget: null,
      /* 表单配置 */
      formConf: formConf,
      /* JSON预览窗口 */
      jsonVisible: false,
      monacoInstance: null,
      /* 表单预览窗口 */
      previewVisible: false,
      /* 源码窗口 */
      formVisible: false
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
        return _this.getTemplate()
      }
    })
    clipboard.on('error', e => {
      this.$message.error('代码复制失败')
    })
  },
  methods: {
    /* 下载vue */
    exports () {
      const value = `${+new Date()}.vue`
      const codeStr = this.getTemplate()
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, value)
    },
    getTemplate () {
      const data = {
        config: JSON.parse(JSON.stringify(this.formConf)),
        list: JSON.parse(JSON.stringify(this.$refs.mainPanel.centerWidgetList))
      }
      let htmlCode = makeUpHtml(data)
      htmlCode = beautifier.html(htmlCode, beautifierConf.html)

      let jsCode = makeUpJs(data)
      jsCode = beautifier.js(jsCode, beautifierConf.js)

      let cssCode = makeUpCss(data)
      cssCode = beautifier.css(cssCode, beautifierConf.js)
      return `${htmlCode}\n${buildScript(jsCode)}\n${buildStyle(cssCode)}`
    },
    /* 清空 */
    clear () {
      this.$refs.mainPanel.clear()
    },
    /* 查看JSON */
    showJson () {
      this.jsonVisible = true
      this.$nextTick(() => {
        const data = {
          config: JSON.parse(JSON.stringify(this.formConf)),
          list: JSON.parse(JSON.stringify(this.$refs.mainPanel.centerWidgetList))
        }
        this.$refs.jsonDrawer.open(data)
      })
    },
    /* 组件选中 */
    select (item) {
      this.activeWidget = JSON.parse(JSON.stringify(item))
      // this.activeWidget = item
      this.$refs.rightPanel.switchWidget(this.activeWidget)
    },
    /* 修改组件属性 */
    updateAttr (item) {
      this.$refs.mainPanel.updateAttr(item)
    },
    /* 显示源码窗口 */
    showForm () {
      this.formVisible = true
      this.$nextTick(() => {
        const data = {
          config: JSON.parse(JSON.stringify(this.formConf)),
          list: JSON.parse(JSON.stringify(this.$refs.mainPanel.centerWidgetList))
        }
        this.$refs.formDrawer.open(data)
      })
    },
    /* 显示预览窗口 */
    showPreview () {
      this.previewVisible = true
      setTimeout(() => {
        const data = {
          config: JSON.parse(JSON.stringify(this.formConf)),
          list: JSON.parse(JSON.stringify(this.$refs.mainPanel.centerWidgetList))
        }
        this.$refs.formPreview.open(data)
      }, 300)
    }
  }
}
</script>
<style scoped lang="less">
  .d-container {
    display: flex;
    height: calc(100vh - 70px);
    background-color: #ffffff;

    .d-left {
      width: 245px;
    }

    .d-center {
      min-height: calc(100vh - 120px);
      flex: 1;
      /*操作条区域*/

      .d-operation {
        height: 47px;
        border: 1px solid #DCDCDC;
        border-bottom: none;
        padding: 7px;
        background-color: #fafafa;
      }

      /*内容区域*/

      .d-main {
        border: 1px solid #DCDCDC;
        overflow: auto;
        height: calc(100vh - 150px);
      }
    }

    .d-right {
      width: 300px;
    }
  }
</style>
