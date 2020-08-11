<template>
  <a-col :span="item.span || 24">
    <div class="widget-form " @click.stop="$emit('selectItem', item)" :class="activeWidget.id===item.id?'active':''">
      <div class="widget-btns padding-sm-lr" v-show="activeWidget.id===item.id">
        <a-tooltip placement="top" v-show="['row'].indexOf(item.type)<0">
          <template slot="title">
            <span>复制</span>
          </template>
          <span @click="$emit('copy', item)" class="designer-icon">&#xe648;</span>
        </a-tooltip>
        <a-tooltip placement="top">
          <template slot="title">
            <span>删除</span>
          </template>
          <span @click="$emit('remove', item)" class="designer-icon margin-left-sm">&#xe614;</span>
        </a-tooltip>
      </div>
      <template v-if="item.type==='row'">
        <a-row
          :gutter="item.gutter || 0"
        >
          <draggable
            v-model="item.columns"
            v-bind="{group:'widget', ghostClass: 'ghost',animation: 200}"
            class="widget-col-list"
          >
            <widget-form
              v-for="(w,i) in item.columns"
              :key="i"
              :item="w"
              :activeWidget="activeWidget"
              @selectItem="selectItem"
              @copy="copy"
              @remove="remove"
            />
          </draggable>
        </a-row>
      </template>
      <template v-else>
        <!--        <div>添加一个组件</div>-->
        <div class="widget-col ">
          <widget-item
            :item="item"
          />
        </div>
      </template>
    </div>
  </a-col>
</template>

<script>
import draggable from 'vuedraggable'
import widgetItem from './widgetItem'

export default {
  components: { draggable, widgetItem },
  name: 'WidgetForm',
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    },
    activeWidget: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    /* 复制 */
    copy (item) {
      this.$emit('copy', item)
    },
    /* 移除 */
    remove (item) {
      this.$emit('remove', item)
    },
    /* 选中组件 */
    selectItem (item) {
      this.$emit('selectItem', item)
    }
  }
}
</script>

<style scoped lang="less">
  .active {
    border: 2px solid #1890ff !important;
  }

  .widget-form {
    position: relative;
    /*min-height: 50px;*/
    cursor: move;

    .widget-btns {
      font-size: 14px;
      z-index: 100;
      position: absolute;
      bottom: 0px;
      right: 0px;
      color: white;
      background-color: #1890FF;
      cursor: pointer;
    }
  }

  .widget-col-list {
    float: left;
    width: calc(100% - 20px);
    min-height: 70px;
    border: 1px dashed #999;
    padding: 10px;
    margin: 10px;
  }

  .widget-col {
    border: 1px dashed #999;
    margin: 10px;
    padding: 10px;
    background-color: #cccccc;

    &:after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: block;
      z-index: 8;
      content: "";
      cursor: move;
    }
  }
</style>
