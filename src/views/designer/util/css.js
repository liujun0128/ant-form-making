/**
 * 组装vue代码。【入口函数】
 * @param {Object} formConfig 整个表单配置
 */
export function makeUpCss (formConfig) {
  // 将组件代码放进form标签
  const style = `
      /*复选框样式*/
    .ant-checkbox-wrapper + .ant-checkbox-wrapper {
      margin-left: 0px;
    }
`
  return style
}
