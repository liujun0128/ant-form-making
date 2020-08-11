<template>
  <!--  accordion-->
  <a-collapse :default-active-key="['0','1','2']">
    <a-collapse-panel v-for="(item,i) in widgetsConf" :key="i+''" :header="item.name">
      <draggable
        v-model="item.list"
        v-bind="{group:{ name:'widget', pull:'clone',put:false},sort:false}"
        class="left-panel"
        :clone="cloneWidget"
      >
        <div
          class="left-widget"
          v-for="(widget,idx) in item.list"
          :key="idx">
          <i class="designer-icon" v-html="widget.icon"></i>
          {{ widget.label }}
        </div>
      </draggable>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { widgetsConf } from './config/config'
import draggable from 'vuedraggable'
import { widgetRandomId } from '@/utils/tools'

export default {
  components: { draggable },
  name: 'LeftPanel',
  data () {
    return {
      widgetsConf: JSON.parse(JSON.stringify(widgetsConf))
    }
  },
  methods: {
    /* 组件拖动到body区域 */
    cloneWidget (v) {
      const activeWidget = JSON.parse(JSON.stringify(v))
      activeWidget.id = new Date().getTime() + '-' + widgetRandomId(5)
      activeWidget.key = 'field' + widgetRandomId(2) + widgetRandomId(2) + widgetRandomId(2) + widgetRandomId(2) + widgetRandomId(2)
      this.activeWidget = activeWidget
      return activeWidget
    }
  }
}
</script>

<style scoped lang="less">
  .left-panel {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;

    .left-widget {
      width: 48%;
      transition: transform 0ms !important;
      max-height: 35px;
      cursor: move;
      margin: 1%;
      border: 1px solid #DCDCDC;
      padding: 5px;

      &:active {
        color: #1890FF;
      }
    }
  }

  /*覆盖左侧手风琴样式*/
  .ant-collapse {
    border-radius: unset;
    border-right: none;
  }
</style>
