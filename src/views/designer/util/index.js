/* 代码美化配置 */
export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
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
  }
}

/* 组件校验触发方式配置
* todo 1 */
export const ruleTrigger = {
  'text': 'blur',
  'number': 'blur',
  'textarea': 'blur',
  'password': 'blur',
  'radio': 'change',
  'checkbox': 'change',
  'select': 'change',
  'cascader': 'change',
  'rate': 'change',
  'time-picker': 'change',
  'date-picker': 'change',
  'range-picker': 'change',
  'upload': 'change',
  'tinymce': 'blur'
}

export function buildScript (child) {
  return `<script>\n${child}\n</script>`
}

export function buildStyle (child) {
  return `<style scoped lang="less">\n${child}\n</style>`
}
