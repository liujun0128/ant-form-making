<template>
  <a-form-model-item
    :label="item.showLebel?item.label:''"
    v-bind="itemLayout"
    :extra="item.extra"
  >
    <!--文本框-->
    <a-input
      v-if="item.type==='text'"
      :placeholder="item.placeholder"
      :value="item.defaultValue"
      :size="item.size"
      :allowClear="item.allowClear"
      :disabled="item.disabled"
    >
      <label slot="addonBefore" class="designer-icon" v-if="item.addonBefore" v-html="item.addonBefore"></label>
      <label slot="addonAfter" class="designer-icon" v-if="item.addonAfter" v-html="item.addonAfter"></label>
      <label slot="prefix" class="designer-icon" v-if="item.prefix" v-html="item.prefix"></label>
      <a-tooltip slot="suffix" placement="topRight" v-if="item.suffix && item.suffixTip">
        <template slot="title">
          <span>{{ item.suffixTip }}</span>
        </template>
        <label style="cursor: pointer;" class="designer-icon" v-html="item.suffix"></label>
      </a-tooltip>
      <label v-else slot="suffix" class="designer-icon" v-html="item.suffix"></label>
    </a-input>

    <!--多行文本-->
    <a-textarea
      v-if="item.type==='textarea'"
      :value="item.defaultValue"
      :placeholder="item.placeholder"
      :allowClear="item.allowClear"
      :autoSize="{
        minRows:item.minRows,
        maxRows:item.maxRows
      }"
      :disabled="item.disabled"
    />

    <!--数字框-->
    <a-input-number
      v-if="item.type==='number'"
      style="width: 100%"
      :value="item.defaultValue"
      :placeholder="item.placeholder"
      :size="item.size"
      :disabled="item.disabled"
      :min="item.min"
      :max="item.max"
      :precision="item.precision"
      :decimalSeparator="item.decimalSeparator"
    />

    <!--密码框-->
    <a-input-password
      v-if="item.type==='password'"
      :placeholder="item.placeholder"
      :value="item.defaultValue"
      :size="item.size"
      :allowClear="item.allowClear"
      :disabled="item.disabled"
    >
      <label slot="addonBefore" class="designer-icon" v-if="item.addonBefore" v-html="item.addonBefore"></label>
      <label slot="addonAfter" class="designer-icon" v-if="item.addonAfter" v-html="item.addonAfter"></label>
    </a-input-password>

    <!--单选框组-->
    <a-radio-group
      v-if="item.type==='radio'"
      :value="item.defaultValue"
      :disabled="item.disabled"
      :button-style="item.buttonStyle"
      :size="item.size"
    >
      <div v-if="item.style==='button'">
        <a-radio-button :style="radioStyle" :value="opt.value" v-for="(opt,o) in item.options" :key="o">
          {{ opt.label }}
        </a-radio-button>
      </div>
      <div v-else>
        <a-radio :style="radioStyle" :value="opt.value" v-for="(opt,o) in item.options" :key="o">
          {{ opt.label }}
        </a-radio>
      </div>
    </a-radio-group>

    <!--多选-->
    <a-checkbox-group
      v-if="item.type==='checkbox'"
      :value="item.defaultValue"
      :disabled="item.disabled"
    >
      <a-checkbox :style="radioStyle" :value="opt.value" v-for="(opt,o) in item.options" :key="o">
        {{ opt.label }}
      </a-checkbox>
    </a-checkbox-group>

    <!--下拉-->
    <a-select
      v-if="item.type==='select'"
      :value="item.defaultValue"
      :disabled="item.disabled"
      :allowClear="item.allowClear"
      :mode="item.mode"
      :showSearch="item.showSearch"
      :open="item.open"
      :size="item.size"
      :placeholder="item.placeholder"
    >
      <a-select-option :value="opt.value" v-for="(opt,o) in item.options" :key="o">
        {{ opt.label }}
      </a-select-option>
    </a-select>

    <!--级联下拉-->
    <a-cascader
      v-if="item.type==='cascader'"
      :options="item.options"
      :value="item.defaultValue"
      :disabled="item.disabled"
      :size="item.size"
      :placeholder="item.placeholder"
      :allowClear="item.allowClear"
      style="width: 100%"
    />

    <!--评分-->
    <a-rate
      v-if="item.type==='rate'"
      :value="item.defaultValue"
      :disabled="item.disabled"
      :allowHalf="item.allowHalf"
      :count="item.count"
      :allowClear="item.allowClear"
    />

    <!--时间选择-->
    <lz-time-picker
      v-if="item.type==='time-picker'"
      :value="item.defaultValue"
      :disabled="item.disabled"
      :allowClear="item.allowClear"
      :inputReadOnly="item.inputReadOnly"
      :placeholder="item.placeholder"
      :format="item.format"
      :size="item.size"
      :hourStep="item.hourStep"
      :minuteStep="item.minuteStep"
      :secondStep="item.secondStep"
    />

    <!--日期选择-->
    <lz-date-picker
      v-if="item.type==='date-picker'"
      :value="item.defaultValue"
      :disabled="item.disabled"
      :allowClear="item.allowClear"
      :inputReadOnly="item.inputReadOnly"
      :placeholder="item.placeholder"
      :format="item.format"
      :size="item.size"
      :showTime="item.showTime"
      :showToday="item.showToday"
    />

    <!--日期范围选择-->
    <lz-range-picker
      v-if="item.type==='range-picker'"
      :value="item.defaultValue"
      :disabled="item.disabled"
      :allowClear="item.allowClear"
      :inputReadOnly="item.inputReadOnly"
      :placeholder="item.placeholder"
      :format="item.format"
      :size="item.size"
      :showTime="item.showTime"
    />

    <!--文件上传-->
    <lz-upload
      v-if="item.type==='upload'"
      :value="item.defaultValue"
      :max-num="item.maxNum"
      :size="item.size"
      :accept="item.accept"
      :imgBasePath="item.imgBasePath"
      :action="item.action"
    />

    <!--富文本-->
    <lz-tinymce
      v-if="item.type==='tinymce'"
      :value="item.defaultValue"
      :basePath="item.basePath"
      :action="item.action"
      :skin="item.skin"
      :staticPath="item.staticPath"
      :width="item.width"
      :height="item.height"
    />

  </a-form-model-item>
</template>

<script>
import moment from 'moment'

export default {
  name: 'WidgetItem',
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    itemLayout () {
      return this.item.labelCol !== 0 ? {
        labelCol: { span: this.item.labelCol },
        wrapperCol: { span: this.item.wrapperCol }
      } : {}
    },
    radioStyle () {
      return this.item.layout === 'vertical' ? {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      } : {}
    }
  },
  watch: {
    item: {
      handler (v) {
        this.$emit('update:item', v)
      },
      deep: true
    }
  },
  data () {
    return {}
  },

  created () {
  },
  methods: {
    getMoment (v, f) {
      if (v !== '') {
        return moment(v, f)
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>
