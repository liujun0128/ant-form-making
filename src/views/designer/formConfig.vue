<template>
  <a-card :body-style="{padding: '5px'}" :bordered="false" class="form-config">
    <a-form-model layout="vertical" :model="config">
      <a-form-model-item label="标签对齐方式">
        <a-radio-group v-model="labelVal" @change="labelChange" button-style="solid">
          <a-radio-button :value="1">
            左对齐
          </a-radio-button>
          <a-radio-button :value="2">
            右对齐
          </a-radio-button>
          <a-radio-button :value="3">
            顶部对齐
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="表单名">
        <a-input v-model="config.formRef"/>
      </a-form-model-item>
      <a-form-model-item label="表单模型">
        <a-input v-model="config.formModel"/>
      </a-form-model-item>
      <a-form-model-item label="校验模型">
        <a-input v-model="config.formRules"/>
      </a-form-model-item>
      <a-form-model-item label="表单宽度" extra="支持百分比或像素">
        <a-input v-model="config.width"/>
      </a-form-model-item>
      <!--      <a-form-model-item label="标签文本对齐方式">-->
      <!--        <a-radio-group v-model="config.labelAlign" button-style="solid">-->
      <!--          <a-radio-button value="left">-->
      <!--            左对齐-->
      <!--          </a-radio-button>-->
      <!--          <a-radio-button value="right">-->
      <!--            右对齐-->
      <!--          </a-radio-button>-->
      <!--        </a-radio-group>-->
      <!--      </a-form-model-item>-->
      <a-form-model-item label="表单标签宽度">
        <a-slider @change="sliderChange" v-model="config.labelCol" :max="24" :min="1"/>
      </a-form-model-item>
      <a-form-model-item
        label="是否显示冒号"
        extra="配合 label 属性使用，表示是否显示 label 后面的冒号">
        <a-switch
          checked-children="是"
          un-checked-children="否"
          v-model="config.colon"
        />
      </a-form-model-item>
      <a-form-model-item
        label="是否显示提交按钮">
        <a-row>
          <a-col :span="4">
            <a-switch
              checked-children="是"
              un-checked-children="否"
              v-model="config.showConfirmBtn"
            />
          </a-col>
          <a-col v-show="config.showConfirmBtn" :span="18">
            <a-input v-model="config.confirmText"/>
          </a-col>
        </a-row>
      </a-form-model-item>
      <a-form-model-item
        label="是否显示取消按钮">
        <a-row>
          <a-col :span="4">
            <a-switch
              checked-children="是"
              un-checked-children="否"
              v-model="config.showCancelBtn"
            />
          </a-col>
          <a-col v-show="config.showCancelBtn" :span="18">
            <a-input v-model="config.cancelText"/>
          </a-col>
        </a-row>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
export default {
  name: 'FormConfig',
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
      config: this.formConf,
      labelVal: 0
    }
  },
  created () {
    if (this.config.layout === 'horizontal' && this.config.labelAlign === 'left') {
      this.labelVal = 1 // 左对齐
    } else if (this.config.layout === 'horizontal' && this.config.labelAlign === 'right') {
      this.labelVal = 2 // 右对齐
    } else if (this.config.layout === 'vertical') {
      this.labelVal = 3 // 顶部对齐
    }
  },
  methods: {
    sliderChange (v) {
      this.config.wrapperCol = 24 - v
    },
    labelChange () {
      if (this.labelVal === 1) {
        this.config.layout = 'horizontal'
        this.config.labelAlign = 'left'
      } else if (this.labelVal === 2) {
        this.config.layout = 'horizontal'
        this.config.labelAlign = 'right'
      }
      if (this.labelVal === 3) {
        this.config.layout = 'vertical'
      }
    }
  }
}
</script>

<style scoped>
  .form-config {
    height: calc(100vh - 180px);
    overflow-y: auto;
  }
</style>
