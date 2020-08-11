<template>
  <a-tabs
    v-model="tabsKey"
    size="default"
    :tabBarStyle="{
      height: '48px',
      border: '1px solid #DCDCDC',
      borderLeft:'none',
      padding: '4px',
      backgroundColor: '#fafafa',
      textAlign: 'center'
    }">
    <a-tab-pane key="1">
      <span slot="tab">
        组件属性
      </span>
      <div class="attr-config">
        <p v-if="showEmpty">请选择组件</p>
        <widget-config
          v-else
          ref="widgetConfig"
          :item="activeWidget"
          @updateAttr="updateAttr"
        />
      </div>
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        表单属性
      </span>
      <div class="attr-config">
        <form-config :formConf="formConf"/>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import formConfig from './formConfig'
import widgetConfig from './widgetConfig'

export default {
  components: { formConfig, widgetConfig },
  name: 'RightPanel',
  props: {
    formConf: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      /* 1组件配置，2表单配置 */
      tabsKey: '2',
      /* 空 */
      showEmpty: true,
      /* 当前选中配置 */
      activeWidget: {}
    }
  },
  watch: {},
  methods: {
    switchWidget (item) {
      this.tabsKey = '1'
      this.activeWidget = item
      this.showEmpty = true
      this.$nextTick(() => {
        this.showEmpty = false
      })
    },
    updateAttr (item) {
      this.$emit('updateAttr', item)
    }
  }
}
</script>

<style scoped>

</style>
