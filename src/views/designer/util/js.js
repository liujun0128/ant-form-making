import { ruleTrigger } from './index'

let confGlobal

/**
 * 组装js 【入口函数】
 * @param {Object} formConfig 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpJs (formConfig) {
  confGlobal = JSON.parse(JSON.stringify(formConfig))
  /* 混入方法 */
  const methodList = mixinMethod()
  /* 钩子 */
  const mountedList = []
  /* data */
  const dataList = []
  /* optionList */
  const optionList = []
  /* rules */
  const ruleList = []

  confGlobal.list.forEach(el => {
    buildAttributes(el, dataList, ruleList, methodList, optionList, mountedList)
  })

  const script = build(
    confGlobal.config,
    dataList.join('\n'),
    ruleList.join('\n'),
    methodList.join('\n'),
    optionList.join('\n'),
    mountedList.join('\n')
  )
  confGlobal = null
  return script
}

/**
 * @Author : liu.q [916000612@qq.com]
 * @Date : 2020/6/5 5:38 下午
 * @Description : 内部默认方法
 */
function mixinMethod () {
  const list = []
  list.push(`onSubmit() {
        this.$refs['${confGlobal.config.formRef}'].validate(valid => {
          if(!valid){
            console.log('error')
          }else{
           // TODO 提交表单
           console.log(this.${confGlobal.config.formModel})
          }
        })
      },`)
  list.push(`onReset() {
        this.$refs['${confGlobal.config.formRef}'].resetFields()
      },`)
  return list
}

// 构建组件属性
function buildAttributes (el, dataList, ruleList, methodList, optionList, mountedList) {
  buildData(el, dataList)
  buildRules(el, ruleList)
  buildOption(el, optionList)
  buildMethod(el, methodList)
  buildMounted(el, mountedList)

  // 构建子级组件属性
  if (el.columns) {
    el.columns.forEach(item => {
      buildAttributes(item, dataList, ruleList, methodList, optionList, mountedList)
    })
  }
}

// 构建data
function buildData (el, dataList) {
  if (el.key === undefined) return
  if (['row'].indexOf(el.type) < 0) {
    let defaultValue
    if (typeof (el.defaultValue) === 'string') {
      defaultValue = `'${el.defaultValue}'`
    } else {
      defaultValue = `${JSON.stringify(el.defaultValue)}`
    }
    dataList.push(`${el.key}: ${defaultValue},`)
  }
}

// 构建选项或配置等其他数据
function buildOption (el, optionList) {
  if (el.key === undefined) return
  if (['select', 'checkbox', 'radio', 'cascader'].indexOf(el.type) > -1) {
    if (el.dataType && el.dataType === 'dynamic') {
      optionList.push(`${el.key}_options: [],`)
    } else {
      optionList.push(`${el.key}_options: ${JSON.stringify(el.options)},`)
    }
  }
}

// 构建方法
function buildMethod (el, methodList) {
  if (el.key === undefined) return
  if (['select', 'checkbox', 'radio', 'cascader'].indexOf(el.type) > -1) {
    if (el.dataType && el.dataType === 'dynamic') {
      methodList.push(`get${el.key}Options(){
        this.$http({
            url: '${el.dynamicOptions.url}',
            method: 'get',
            params: {}
          }).then(res => {
            if (res.code === 1 && res.data.length > 0) {
              this.${el.key}_options = res.data
            }else{
              this.$message.error(res.msg || '数据异常，请检查！')
            }
          }).catch(e => {
            this.$message.error('接口异常，请检查！')
          })
      },`)
    }
  }
}

// 构建钩子函数
function buildMounted (el, mountedList) {
  if (el.key === undefined) return
  if (['select', 'checkbox', 'radio', 'cascader'].indexOf(el.type) > -1) {
    if (el.dataType && el.dataType === 'dynamic') {
      mountedList.push(`this.get${el.key}Options();`)
    }
  }
}

// 构建校验规则
function buildRules (el, ruleList) {
  if (el.key === undefined) return
  const rules = []
  if (ruleTrigger[el.type]) {
    if (el.required) {
      const message = `${el.label}不能为空`
      rules.push(`{ required: true,  message: '${message}', trigger: '${ruleTrigger[el.type]}' }`)
    }
    if (el.maxLength) {
      const message = `${el.label}最大长度不能大于${el.maxLength}`
      rules.push(`{ max: ${el.maxLength},  message: '${message}', trigger: '${ruleTrigger[el.type]}' }`)
    }
    if (el.minLength) {
      const message = `${el.label}最小长度不能小于${el.minLength}`
      rules.push(`{ min: ${el.minLength},  message: '${message}', trigger: '${ruleTrigger[el.type]}' }`)
    }
    if (el.rules && isArray(el.rules)) {
      el.rules.forEach(item => {
        if (item.reg !== '') {
          rules.push(
            // eslint-disable-next-line no-eval
            `{ pattern: '${item.reg}', message: '${item.msg}', trigger: '${ruleTrigger[el.type]}' }`
          )
        }
      })
    }
    ruleList.push(`${el.key}: [${rules.join(',')}],`)
  }
}

// js整体拼接
function build (conf, data, rules, methods, options, mounted) {
  const str = `export default {
  components: {},
  props: [],
  data () {
    return {
      ${conf.formModel}: {
        ${data}
      },
      ${conf.formRules}: {
        ${rules}
      },
      ${options}
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    ${mounted}
  },
  methods: {
    ${methods}
  }
}`
  return str
}

function isArray (obj) {
  if (obj instanceof Array) {
    return true
  }
  return false
}
