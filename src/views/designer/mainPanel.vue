<template>
  <div class="widget-form-container">
    <a-form-model
      :style="{
        width:formConf.width,
      }"
      :layout="formConf.layout"
      v-bind="formItemLayout"
      :colon="formConf.colon"
      :labelAlign="formConf.labelAlign">
      <a-row style="height: 100%">
        <draggable
          v-model="centerWidgetList"
          v-bind="{group:'widget', ghostClass: 'ghost',animation: 200}"
          @end="handleMoveEnd"
          @add="handleAdd"
          class="widget-form-list"
        >
          <widget-form
            v-for="(item,i) in centerWidgetList"
            :key="i"
            :item="item"
            :activeWidget="activeWidget"
            @selectItem="selectItem"
            @copy="copy"
            @remove="remove"
          />
        </draggable>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import widgetForm from './widgetForm'
import { widgetRandomId } from '@/utils/tools'

export default {
  components: { draggable, widgetForm },
  name: 'MainPanel',
  data () {
    return {
      /* 主体组件 */
      centerWidgetList: [],
      /* 当前选中组件 */
      activeWidget: {}
    }
  },
  watch: {
    activeWidget: {
      handler (v) {

      },
      deep: true
    }
  },
  props: {
    /* 表单配置 */
    formConf: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    formItemLayout () {
      const { layout } = this.formConf
      return layout === 'horizontal'
        ? {
          labelCol: { span: this.formConf.labelCol },
          wrapperCol: { span: this.formConf.wrapperCol }
        }
        : {}
    }
  },
  methods: {
    /* 清空 */
    clear () {
      const _this = this
      this.$confirm({
        title: '确定清空？',
        content: '清空后无法恢复！',
        onOk () {
          _this.centerWidgetList = []
        },
        onCancel () {}
      })
    },
    /* 组件移动结束 */
    handleMoveEnd ({ newIndex, oldIndex }) {
      console.log('index', newIndex, oldIndex)
    },
    /* 组件添加到列表 */
    handleAdd ({ newIndex }) {
      this.activeWidget = this.centerWidgetList[newIndex]
      this.$emit('select', this.activeWidget)
    },
    /* 选中组件 */
    selectItem (item) {
      this.activeWidget = item
      this.$emit('select', item)
    },
    /* 修改组件属性 */
    updateAttr (item) {
      console.log('修改组件属性', this.centerWidgetList, item)
      const traverse = array => {
        array.forEach((element, index) => {
          if (element.id === item.id) {
            // 覆盖节点属性
            Object.assign(element, item)
          }
          if (element.type === 'row') {
            traverse(element.columns)
          }
        })
      }
      traverse(this.centerWidgetList)
    },
    /* 复制组件 */
    copy (activeWidget) {
      console.log('复制组件', activeWidget)
      const traverse = array => {
        array.forEach((element, index) => {
          if (element.id === activeWidget.id) {
            // 复制添加到选择节点后面
            if (element.type !== 'row') {
              const item = JSON.parse(JSON.stringify(element))
              item.id = new Date().getTime() + '-' + widgetRandomId(5)
              array.splice(index + 1, 0, item)
            } else {
              console.log('行容器不让复制')
            }
          }
          if (element.type === 'row') {
            traverse(element.columns)
          }
        })
      }
      traverse(this.centerWidgetList)
    },
    /* 删除组件 */
    remove (activeWidget) {
      console.log('删除组件', activeWidget)
      const traverse = array => {
        array = array.filter((element, index) => {
          if (element.type === 'row') {
            element.columns = traverse(element.columns)
          }
          if (element.id !== activeWidget.id) {
            return true
          } else {
            if (array.length === 1) {
              this.activeWidget = {}
            } else if (array.length - 1 > index) {
              this.activeWidget = array[index + 1]
            } else {
              this.activeWidget = array[index - 1]
            }
            return false
          }
        })
        return array
      }
      this.centerWidgetList = traverse(this.centerWidgetList)
    }
  }
}
</script>

<style scoped lang="less">
  .widget-form-container {
    height: 100%;

    .widget-form-list {
      /*border: 1px dashed #999;*/
      min-height: calc(100vh - 180px);
      margin: 10px;
      padding: 10px;
    }
  }
</style>
