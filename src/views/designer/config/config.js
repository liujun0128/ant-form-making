// 表单属性【右面板】
export const formConf = {
  formRef: 'myForm', // 表单$refs
  formModel: 'formData', // 表单模型
  formRules: 'rules', // 校验模型
  layout: 'horizontal', // 表单布局 horizontal | vertical | inline
  labelCol: 4, // label 宽度
  wrapperCol: 20, // 组件宽度
  labelAlign: 'right', // label 标签的文本对齐方式 left|right
  width: '100%',
  colon: true, // 表示是否显示 label 后面的冒号
  showConfirmBtn: true, // 显示确定按钮
  showCancelBtn: true, // 显示取消按钮
  confirmText: '确定', // 确定按钮名称
  cancelText: '取消' // 取消按钮名称
}

export const widgetsConf = [
  {
    name: '基础组件',
    list: [
      {
        key: '', // 输入框的id
        type: 'text', // 类型
        label: '单行文本', // label名称
        icon: '&#xe62a;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        placeholder: '', // 空提示
        defaultValue: '', // 默认值
        size: 'default', // 组件大小
        extra: '', // 额外的提示信息
        addonAfter: '', // 后置标签
        addonBefore: '', // 前置标签
        prefix: '', // 前缀图标
        suffix: '', // 后缀图标
        suffixTip: '', // 后缀图标悬浮提示
        showLebel: true, // 显示标签
        allowClear: true, // 允许清空
        disabled: false, // 禁用
        required: true, // 必填
        maxLength: 255, // 最大长度
        minLength: 0, // 最小长度
        rules: []// 正则校验
      },
      {
        key: '', // 输入框的id
        type: 'textarea', // 类型
        label: '多行文本', // label名称
        icon: '&#xe6e7;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        placeholder: '', // 空提示
        extra: '', // 额外的提示信息
        showLebel: true, // 显示标签
        defaultValue: '', // 默认值
        disabled: false, // 禁用
        required: true, // 必填
        maxLength: 255, // 最大长度
        minLength: 0, // 最小长度
        minRows: 1, // 最小高度
        maxRows: 4, // 最大高度
        allowClear: true, // 允许清空
        rules: []// 正则校验
      },
      {
        key: '', // 输入框的id
        type: 'number', // 类型
        label: '数字框', // label名称
        icon: '&#xe660;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        placeholder: '', // 空提示
        extra: '', // 额外的提示信息
        showLebel: true, // 显示标签
        defaultValue: '', // 默认值
        size: 'default', // 组件大小
        disabled: false, // 禁用
        required: true, // 必填
        max: 999999999, // 最大值
        min: 0, // 最小值
        precision: 2, // 数据精度
        decimalSeparator: '.', // 小数点
        step: 1, // 每次改变步数，可以为小数
        rules: []// 正则校验
      },
      {
        key: '', // 输入框的id
        type: 'password', // 类型
        label: '密码框', // label名称
        icon: '&#xe7e2;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        placeholder: '', // 空提示
        extra: '', // 额外的提示信息
        showLebel: true, // 显示标签
        defaultValue: '', // 默认值
        size: 'default', // 组件大小
        disabled: false, // 禁用
        required: true, // 必填
        maxLength: 255, // 最大长度
        minLength: 0, // 最小长度
        addonAfter: '', // 后置标签
        addonBefore: '', // 前置标签
        rules: []// 正则校验
      },
      {
        key: '', // 输入框的id
        type: 'radio', // 类型
        label: '单选框组', // label名称
        icon: '&#xe610;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        placeholder: '', // 空提示
        extra: '', // 额外的提示信息
        showLebel: true, // 显示标签
        defaultValue: '', // 默认值
        disabled: false, // 禁用
        required: true, // 必填
        size: 'default', // 组件大小
        layout: 'across', // 横across|竖vertical
        buttonStyle: 'outline', // outline | solid
        style: 'default', // 形态 普通|按钮button
        dataType: 'static', // 数据类型 static 静态，dynamic 动态
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ], // 选项
        dynamicOptions: {
          url: 'https://getman.cn/mock/lazy/radio',
          label: 'label',
          value: 'value'
        }
      },
      {
        key: '', // 输入框的id
        type: 'checkbox', // 类型
        label: '复选框组', // label名称
        icon: '&#xe7f9; ', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        placeholder: '', // 空提示
        extra: '', // 额外的提示信息
        showLebel: true, // 显示标签
        defaultValue: [], // 默认值
        disabled: false, // 禁用
        required: true, // 必填
        layout: 'across', // 横across|竖vertical
        dataType: 'static', // 数据类型 static 静态，dynamic 动态
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ], // 选项
        dynamicOptions: {
          url: 'https://getman.cn/mock/lazy/radio',
          label: 'label',
          value: 'value'
        }
      },
      {
        key: '', // 输入框的id
        type: 'select', // 类型
        label: '下拉选择', // label名称
        icon: '&#xe68f;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        placeholder: '', // 空提示
        extra: '', // 额外的提示信息
        showLebel: true, // 显示标签
        defaultValue: '', // 默认值
        allowClear: true, // 允许清空
        disabled: false, // 禁用
        mode: 'default', // 模式 'default' | 'multiple' | 'tags' | 'combobox'\
        showSearch: true, // 单选模式可搜索
        size: 'default', // 选择框大小large small
        required: true, // 必填
        open: false, // 展开下拉
        dataType: 'static', // 数据类型 static 静态，dynamic 动态
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ], // 选项
        dynamicOptions: {
          url: 'https://getman.cn/mock/lazy/radio',
          label: 'label',
          value: 'value'
        }
      },
      {
        key: '', // 输入框的id
        type: 'rate', // 类型
        label: '评分', // label名称
        icon: '&#xe611;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        defaultValue: 0, // 默认值
        showLebel: true, // 显示标签
        extra: '', // 额外的提示信息
        allowClear: true, // 允许清空
        allowHalf: false, // 是否允许半选
        count: 5, // 评分 总数
        disabled: false, // 禁用
        tooltips: ['', '', '', '', ''], // 每项的提示信息
        rules: []// 正则校验
      },
      {
        key: '', // 输入框的id
        type: 'time-picker', // 类型
        label: '时间选择', // label名称
        icon: '&#xe657;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        defaultValue: '', // 默认值
        showLebel: true, // 显示标签
        extra: '', // 额外的提示信息
        allowClear: true, // 允许清空
        disabled: false, // 禁用
        inputReadOnly: true, // 输入框只读
        placeholder: '', // 空值提示
        format: 'HH:mm:ss', // 格式
        hourStep: 1, // 小时步长
        minuteStep: 1, // 分钟步长
        secondStep: 1, // 秒步长
        size: 'default', // 控件大小
        required: true, // 必填
        rules: []// 正则校验
      },
      {
        key: '', // 输入框的id
        type: 'date-picker', // 类型
        label: '日期选择', // label名称
        icon: '&#xe68c;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        defaultValue: '', // 默认值
        showLebel: true, // 显示标签
        extra: '', // 额外的提示信息
        allowClear: true, // 允许清空
        disabled: false, // 禁用
        placeholder: '', // 输入框提示文字
        size: 'default', // 输入框大小
        inputReadOnly: 'true', // 设置输入框为只读
        format: 'YYYY-MM-DD', // 日期格式
        showTime: false, // 加时间选择功能
        showToday: true, // 是否展示“今天”按钮
        required: true, // 必填
        rules: []// 正则校验
      },
      {
        key: '', // 输入框的id
        type: 'range-picker', // 类型
        label: '日期范围', // label名称
        icon: '&#xe65b;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        defaultValue: ['', ''], // 默认值
        showLebel: true, // 显示标签
        extra: '', // 额外的提示信息
        allowClear: true, // 允许清空
        disabled: false, // 禁用
        placeholder: '', // 输入框提示文字
        size: 'default', // 输入框大小
        inputReadOnly: 'true', // 设置输入框为只读
        format: 'YYYY-MM-DD', // 日期格式
        showTime: false, // 加时间选择功能
        required: true, // 必填
        rules: []// 正则校验
      }
    ]
  },
  {
    name: '高级组件',
    list: [
      {
        key: '', // 输入框的id
        type: 'cascader', // 类型
        label: '级联下拉', // label名称
        icon: '&#xe6a2;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        extra: '', // 额外的提示信息
        showLebel: true, // 显示标签
        placeholder: '', // 空提示
        allowClear: true, // 允许清空
        defaultValue: [], // 默认值
        disabled: false, // 禁用
        required: true, // 必填
        showSearch: true, // 显示搜索
        dataType: 'dynamic', // 数据类型 static 静态，dynamic 动态
        size: 'default',
        options: [
          {
            'value': '河南',
            'label': '河南',
            'children': [
              {
                'value': '郑州',
                'label': '郑州',
                'children': [
                  {
                    'value': '中原区',
                    'label': '中原区'
                  },
                  {
                    'value': '高新区',
                    'label': '高新区'
                  }
                ]
              }
            ]
          }
        ], // 选项
        dynamicOptions: {
          url: 'https://getman.cn/mock/lazy/tree',
          label: 'label',
          value: 'value',
          children: 'children'
        }
      },
      {
        key: '', // 输入框的id
        type: 'upload', // 类型
        label: '文件上传', // label名称
        icon: '&#xe661;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        extra: '', // 额外的提示信息
        showLebel: true, // 显示标签
        defaultValue: [], // 默认值
        disabled: false, // 禁用
        required: true, // 必填
        maxNum: 1, // 最大数量
        size: 2, // 文件大小限制 单位MB
        accept: '', // 文件格式
        imgBasePath: '', // 文件访问跟路径
        action: ''// 上传路径
      },
      {
        key: '', // 输入框的id
        type: 'tinymce', // 类型
        label: '富文本', // label名称
        icon: '&#xe602;', // 左侧组件列表图标
        span: 24,
        labelCol: 0, // label 宽度
        wrapperCol: 18, // 组件宽度
        extra: '', // 额外的提示信息
        showLebel: true, // 显示标签
        defaultValue: '', // 默认值
        disabled: false, // 禁用
        required: true, // 必填
        action: '', // 上传路径
        basePath: '', // 文件访问跟路径
        skin: 'light', // 皮肤light,dark,
        staticPath: '/static', // 静态资源路径
        width: '100%', // 宽 单位px
        height: '300px'// 高 单位px
      }
    ]
  },
  {
    name: '布局组件',
    list: [
      {
        type: 'row', // 类型
        label: '行容器', // label名称
        icon: '&#xe64f;',
        span: 24,
        gutter: 5, // 栅格间隔
        columns: []
      }

    ]
  },
  {
    name: '详情',
    list: []
  }
]
