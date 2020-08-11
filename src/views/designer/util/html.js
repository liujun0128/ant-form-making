/* 表单配置 */
let confGlobal

/**
 * 组装vue代码。【入口函数】
 * @param {Object} formConfig 整个表单配置
 */
export function makeUpHtml (formConfig) {
  const htmlList = []
  confGlobal = formConfig = JSON.parse(JSON.stringify(formConfig))
  // 遍历渲染每个组件成html
  formConfig.list.forEach(el => {
    if (el.type === 'row') {
      htmlList.push(layouts['row'](el))
    } else {
      htmlList.push(layouts['col'](el))
    }
  })
  const htmlStr = htmlList.join('\n')
  // 将组件代码放进form标签
  const temp = buildFormTemplate(formConfig.config, htmlStr)
  confGlobal = null
  return temp
}

function buildFormTemplate (el, child) {
  const formConf = confGlobal.config
  const style = `:style="{width:'${formConf.width}'}"`

  const { layout } = formConf

  let bind = `v-bind='{}'`
  if (layout === 'horizontal') {
    bind = `v-bind='{
      labelCol: { span: ${formConf.labelCol} },
      wrapperCol: { span: ${formConf.wrapperCol} }
    }'`
  }
  const colon = formConf.colon
  const labelAlign = formConf.labelAlign
  const ref = `ref='${formConf.formRef}'`
  const rules = `:rules='${formConf.formRules}'`
  const model = `:model='${formConf.formModel}'`
  let bottomBtn = bottomBtns()
  bottomBtn = colWrapper({}, bottomBtn)
  const str = `<a-form-model ${model} ${rules} ${ref} ${style} layout='${layout}' ${bind} :colon='${colon}' labelAlign='${labelAlign}'>
           <a-row style='height: 100%'>
      ${child}
      ${bottomBtn}
    </a-row></a-form-model>`
  return `<template><a-card :bordered='false' size='small'>${str}</a-card></template>`
}

const layouts = {
  col (el) {
    const label = `label='${el.label}'`
    const extra = `extra='${el.extra}'`
    let bind = `v-bind='{}'`
    if (el.labelCol !== 0) {
      bind = `v-bind='{
      labelCol: { span: ${el.labelCol} },
      wrapperCol: { span: ${el.wrapperCol} }
    }'`
    }
    const prop = `prop='${el.key}'`
    const tagDom = tags[el.type](el)
    let str = `<a-form-model-item  ${label} ${prop} ${extra} ${bind}>
        ${tagDom}
      </a-form-model-item>`
    str = colWrapper(el, str)
    return str
  },
  row (el) {
    const child = []
    el.columns.forEach(col => {
      if (col.type === 'row') {
        child.push(layouts['row'](col))
      } else {
        child.push(layouts['col'](col))
      }
    })
    const childStr = child.join('\n')
    const gutter = `:gutter='${el.gutter}'`
    let str = `<a-row ${gutter}>${childStr}</a-row>`
    str = colWrapper(el, str)
    return str
  }
}

// a-col 包裹
function colWrapper (scheme, str) {
  return `<a-col :span='${scheme.span || 24}'>
      ${str}
    </a-col>`
}

/* todo 2 */
const tags = {
  'text': el => {
    const {
      tag, vModel, allowClear, placeholder, size, disabled
    } = attrBuilder(el)
    let child = buildInputChild(el)
    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${placeholder} ${allowClear}  ${size} ${disabled}>${child}</${tag}>`
  },
  'number': el => {
    const {
      tag, vModel, placeholder, size, disabled
    } = attrBuilder(el)
    const precision = `:precision='${el.precision}'`
    const decimalSeparator = `decimalSeparator='${el.decimalSeparator}'`
    const step = `step='${el.step}'`
    const max = `:max='${el.max}'`
    const min = `:min='${el.min}'`
    const style = `style='width:100%'`
    return `<${tag} ${style} ${vModel} ${placeholder} ${size} ${disabled} ${decimalSeparator} ${precision} ${step} ${max} ${min}></${tag}>`
  },
  'textarea': el => {
    const {
      tag, vModel, allowClear, placeholder, disabled
    } = attrBuilder(el)
    const autosize = `:autoSize='{minRows:${el.minRows},maxRows:${el.maxRows}}'`
    return `<${tag} ${vModel} ${placeholder} ${allowClear} ${autosize} ${disabled}></${tag}>`
  },
  'password': el => {
    const {
      tag, vModel, placeholder, size, disabled
    } = attrBuilder(el)
    let child = buildInputChild(el)
    if (child) child = `\n${child}\n`
    return `<${tag} ${vModel} ${placeholder} ${size} ${disabled}>${child}</${tag}>`
  },
  'radio': el => {
    const {
      tag, vModel, size, disabled
    } = attrBuilder(el)

    const buttonStyle = `button-style='${el.buttonStyle}'`
    let child = buildRadioChild(el)
    if (child) child = `\n${child}\n`
    return `<${tag} ${vModel} ${buttonStyle}  ${size} ${disabled}>${child}</${tag}>`
  },
  'checkbox': el => {
    const {
      tag, vModel, disabled
    } = attrBuilder(el)

    let child = buildCheckboxChild(el)
    if (child) child = `\n${child}\n`
    return `<${tag} ${vModel}  ${disabled}>${child}</${tag}>`
  },
  'select': el => {
    const {
      tag, vModel, placeholder, size, disabled
    } = attrBuilder(el)

    const mode = `mode='${el.mode}'`
    const showSearch = `:showSearch='${el.showSearch}'`

    let child = buildSelectChild(el)
    if (child) child = `\n${child}\n`
    return `<${tag} ${vModel} ${mode} ${showSearch} ${placeholder} ${size} ${disabled}>${child}</${tag}>`
  },
  'cascader': el => {
    const {
      tag, vModel, placeholder, size, disabled
    } = attrBuilder(el)

    const showSearch = `:showSearch='${el.showSearch}'`
    const options = `:options='${el.key}_options'`
    return `<${tag} ${vModel}  ${showSearch} ${options} ${placeholder} ${size} ${disabled}></${tag}>`
  },
  'rate': el => {
    const {
      tag, vModel, disabled
    } = attrBuilder(el)
    const allowClear = `:allowClear='${el.allowClear}'`
    const allowHalf = `:allowHalf='${el.allowHalf}'`
    const count = `:count='${el.count}'`
    const tooltips = `:tooltips='${JSON.stringify(el.tooltips)}'`

    return `<${tag} ${vModel} ${tooltips} ${count}  ${allowHalf} ${allowClear}  ${disabled}></${tag}>`
  },
  'time-picker': el => {
    const {
      tag, vModel, placeholder, size, disabled
    } = attrBuilder(el)
    const allowClear = `:allowClear='${el.allowClear}'`
    const inputReadOnly = `:inputReadOnly='${el.inputReadOnly}'`
    const format = `format='${el.format}'`
    const hourStep = `:hourStep='${el.hourStep}'`
    const minuteStep = `:minuteStep='${el.minuteStep}'`
    const secondStep = `:secondStep='${el.secondStep}'`

    return `<${tag} ${vModel} ${hourStep} ${minuteStep} ${secondStep} ${inputReadOnly} ${format} ${placeholder} ${size} ${allowClear}  ${disabled}></${tag}>`
  },
  'date-picker': el => {
    const {
      tag, vModel, placeholder, size, disabled
    } = attrBuilder(el)
    const allowClear = `:allowClear='${el.allowClear}'`
    const inputReadOnly = `:inputReadOnly='${el.inputReadOnly}'`
    const format = `format='${el.format}'`
    const showToday = `:showToday='${el.showToday}'`
    const showTime = `:showTime='{
      format: "${el.showTime.format}",
      hourStep: ${el.showTime.hourStep},
      minuteStep: ${el.showTime.minuteStep},
      secondStep: ${el.showTime.secondStep} 
    }'`

    return `<${tag} ${vModel} ${showToday} ${showTime} ${inputReadOnly} ${format} ${placeholder} ${size} ${allowClear}  ${disabled}></${tag}>`
  },
  'range-picker': el => {
    const {
      tag, vModel, placeholder, size, disabled
    } = attrBuilder(el)
    const allowClear = `:allowClear='${el.allowClear}'`
    const inputReadOnly = `:inputReadOnly='${el.inputReadOnly}'`
    const format = `format='${el.format}'`
    const showTime = `:showTime='{
      format: "${el.showTime.format}",
      hourStep: ${el.showTime.hourStep},
      minuteStep: ${el.showTime.minuteStep},
      secondStep: ${el.showTime.secondStep} 
    }'`

    return `<${tag} ${vModel} ${showTime} ${inputReadOnly} ${format} ${placeholder} ${size} ${allowClear}  ${disabled}></${tag}>`
  },
  'upload': el => {
    const {
      tag, vModel, size, disabled
    } = attrBuilder(el)
    const maxNum = `:maxNum='${el.maxNum}'`
    const accept = `accept='${el.accept}'`
    const imgBasePath = `imgBasePath='${el.imgBasePath}'`
    const action = `action='${el.action}'`

    return `<${tag} ${vModel} ${maxNum}  ${size} ${action} ${imgBasePath} ${accept} ${disabled}></${tag}>`
  },
  'tinymce': el => {
    const {
      tag, vModel, disabled
    } = attrBuilder(el)
    const action = `action='${el.action}'`
    const basePath = `basePath='${el.basePath}'`
    const skin = `skin='${el.skin}'`
    const staticPath = `staticPath='${el.staticPath}'`
    const width = `width='${el.width}'`
    const height = `height='${el.height}'`

    return `<${tag} ${vModel}  ${basePath} ${skin} ${staticPath} ${width} ${height} ${action}  ${disabled}></${tag}>`
  }
}

// // a-input 子级
function buildInputChild (el) {
  const children = []
  if (el.addonBefore) {
    children.push(`<label slot='addonBefore' class='designer-icon' v-html=''${el.addonBefore}''></label>`)
  }
  if (el.addonAfter) {
    children.push(`<label slot='addonAfter' class='designer-icon' v-html=''${el.addonAfter}''></label>`)
  }
  if (el.prefix) {
    children.push(`<label slot='prefix' class='designer-icon' v-html=''${el.prefix}''></label>`)
  }
  if (el.suffix && el.suffixTip) {
    children.push(`<a-tooltip slot='suffix' placement='topRight'>
        <template slot='title'>
          <span>${el.suffixTip}</span>
        </template>
        <label style='cursor: pointer;' class='designer-icon' v-html=''${el.suffix}''></label>
      </a-tooltip>`)
  } else {
    if (el.suffix) {
      children.push(`<label slot='suffix' class='designer-icon' v-html=''${el.suffix}''></label>`)
    }
  }

  return children.join('\n')
}

// a-radio-group 子级
function buildRadioChild (el) {
  const children = []
  let style = ''
  if (el.layout === 'vertical') {
    style = `:style='{
        display: 'block',
      height: '30px',
      lineHeight: '30px'}'`
  }
  const forStr = `v-for='(opt,idx) in ${el.key}_options'`
  const keyStr = `:key='idx'`
  let valueStr = `:value='opt.value'`
  let label = `{{opt.label}}`
  if (el.dataType === 'dynamic') {
    valueStr = `:value='opt.${el.dynamicOptions.value}'`
    label = `{{opt.${el.dynamicOptions.label}}}`
  }
  if (el.options.length > 0 && el.style === 'default') {
    children.push(`<a-radio ${style} ${forStr} ${keyStr} ${valueStr}>
           ${label}
          </a-radio>`)
  }

  if (el.options.length > 0 && el.style === 'button') {
    children.push(`<a-radio-button ${style} ${forStr} ${keyStr} ${valueStr}>
           ${label}
          </a-radio-button>`)
  }
  return children.join('\n')
}

// a-checkbox-group 子级
function buildCheckboxChild (el) {
  const children = []
  let style = ''
  if (el.layout === 'vertical') {
    style = `:style='{
        display: 'block',
      height: '30px',
      lineHeight: '30px'}'`
  }

  const forStr = `v-for='(opt,idx) in ${el.key}_options'`
  const keyStr = `:key='idx'`
  let valueStr = `:value='opt.value'`
  let label = `{{opt.label}}`
  if (el.dataType === 'dynamic') {
    valueStr = `:value='opt.${el.dynamicOptions.value}'`
    label = `{{opt.${el.dynamicOptions.label}}}`
  }
  children.push(`<a-checkbox ${style} ${forStr} ${keyStr} ${valueStr}>
           ${label}
          </a-checkbox>`)
  return children.join('\n')
}

// a-select 子级
function buildSelectChild (el) {
  const children = []

  const forStr = `v-for='(opt,idx) in ${el.key}_options'`
  const keyStr = `:key='idx'`
  let valueStr = `:value='opt.value'`
  let label = `{{opt.label}}`
  if (el.dataType === 'dynamic') {
    valueStr = `:value='opt.${el.dynamicOptions.value}'`
    label = `{{opt.${el.dynamicOptions.label}}}`
  }
  children.push(`<a-select-option ${forStr} ${keyStr} ${valueStr}>
           ${label}
          </a-select-option>`)
  return children.join('\n')
}

function attrBuilder (el) {
  return {
    tag: htmlTag[el.type],
    vModel: `v-model='${confGlobal.config.formModel}.${el.key}'`,
    allowClear: `:allowClear='${el.allowClear || true}'`,
    placeholder: `placeholder='${el.placeholder}'`,
    size: `size='${el.size}'`,
    disabled: `:disabled='${el.disabled}'`
  }
}

/* todo 1 */
const htmlTag = {
  'text': 'a-input',
  'number': 'a-input-number',
  'textarea': 'a-textarea',
  'password': 'a-input-password',
  'radio': 'a-radio-group',
  'checkbox': 'a-checkbox-group',
  'select': 'a-select',
  'cascader': 'a-cascader',
  'rate': 'a-rate',
  'time-picker': 'lz-time-picker',
  'date-picker': 'lz-date-picker',
  'range-picker': 'lz-range-picker',
  'upload': 'lz-upload',
  'tinymce': 'lz-tinymce'

}

function bottomBtns () {
  const config = confGlobal.config
  if (config.showConfirmBtn || config.showCancelBtn) {
    return `<a-form-model-item :wrapper-col='{ span: ${config.wrapperCol}, offset: ${config.labelCol} }'>
      <a-button v-if='${config.showConfirmBtn}' type='primary' @click='onSubmit'>
        ${config.confirmText}
      </a-button>
      <a-button v-if='${config.showCancelBtn}' style='margin-left: 10px;' @click='onReset'>
        ${config.cancelText}
      </a-button>
    </a-form-model-item>`
  } else {
    return ''
  }
}
