<template>
  <a-card :body-style="{padding: '5px'}" :bordered="false" class="widget-config">
    <a-form-model
      :label-col=" { span: 6 }"
      :wrapper-col="{ span: 18 }"
      layout="horizontal"
      :model="config"
      v-if="config.id!=='-1'">
      <!--      <a-divider-->
      <!--        v-if="['text'].indexOf(config.type)>-1"-->
      <!--      >基础配置-->
      <!--      </a-divider>-->
      <a-form-model-item
        label="字段名"
        v-if="['text','number','textarea','password','radio',
               'checkbox','select','cascader','rate','time-picker',
               'date-picker','range-picker','upload','tinymce'].indexOf(config.type)>-1"
        extra="同一个表单内不能有重复"
      >
        <a-input v-model="config.key"/>
      </a-form-model-item>
      <a-form-model-item
        label="组件名"
        v-if="['row'].indexOf(config.type)>-1"
      >
        <span>{{ config.key }}</span>
      </a-form-model-item>
      <a-form-model-item
        v-if="['text','number','textarea','password','radio',
               'checkbox','select','cascader','rate','time-picker',
               'date-picker','range-picker','upload','tinymce'].indexOf(config.type)>-1"
        label="标题"
      >
        <a-input v-model="config.label"/>
      </a-form-model-item>

      <!--评分-->
      <a-form-model-item
        v-if="['rate'].indexOf(config.type)>-1"
        label="总分"
      >
        <a-input v-model="config.count" @change="rateChange"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['time-picker','date-picker','range-picker'].indexOf(config.type)>-1"
        label="格式"
      >
        <a-input v-model="config.format"/>
      </a-form-model-item>

      <!--默认值 ,'range-picker'-->
      <a-form-model-item
        v-if="['range-picker'].indexOf(config.type)>-1"
        label="默认值"
      >
        <a-input placeholder="开始日期" v-model="config.defaultValue[0]"/>
        <a-input placeholder="结束日期" v-model="config.defaultValue[1]"/>

      </a-form-model-item>

      <!--默认值 文本-->
      <a-form-model-item
        v-if="['text','number','textarea','password','rate','time-picker','date-picker'].indexOf(config.type)>-1"
        label="默认值"
      >
        <a-input v-model="config.defaultValue"/>
      </a-form-model-item>

      <!--默认值 单选-->
      <a-form-model-item
        v-if="['radio','select'].indexOf(config.type)>-1"
        label="默认值"
      >
        <a-select :allowClear="true" v-model="config.defaultValue">
          <a-select-option :value="opt.value" v-for="(opt,o) in config.options" :key="o">
            {{ opt.label }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <!--默认值 多选-->
      <a-form-model-item
        v-if="['checkbox'].indexOf(config.type)>-1"
        label="默认值"
      >
        <a-select mode="multiple" :allowClear="true" v-model="config.defaultValue">
          <a-select-option :value="opt.value" v-for="(opt,o) in config.options" :key="o">
            {{ opt.label }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item
        v-if="['text','number','textarea','password','select','cascader',
               'time-picker','date-picker','range-picker'].indexOf(config.type)>-1"
        label="占位提示"
      >
        <a-input v-model="config.placeholder"/>
      </a-form-model-item>
      <a-form-model-item
        v-if="['text','number','textarea','password','radio',
               'checkbox','select','cascader','rate','time-picker',
               'date-picker','range-picker','upload','tinymce'].indexOf(config.type)>-1"
        label="底部提示"
      >
        <a-input v-model="config.extra"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['tinymce'].indexOf(config.type)>-1"
        label="跟地址"
        extra="文件访问的根路径"
      >
        <a-input v-model="config.basePath"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['upload'].indexOf(config.type)>-1"
        label="跟地址"
        extra="文件访问的根域名"
      >
        <a-input v-model="config.imgBasePath"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['tinymce'].indexOf(config.type)>-1"
        label="资源地址"
      >
        <a-input v-model="config.staticPath"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['upload','tinymce'].indexOf(config.type)>-1"
        label="上传地址"
      >
        <a-input v-model="config.action"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['upload'].indexOf(config.type)>-1"
        label="上传类型"
      >
        <div>
          <div :style="{ }">
            <a-checkbox :indeterminate="imgIndeterminate" :checked="imgCheckAll" @change="onImageCheckAllChange">
              图片
            </a-checkbox>
          </div>
          <a-checkbox-group v-model="imgCheckedList" @change="onImageChange" :options="imgOptions"/>
        </div>
        <div>
          <div :style="{ }">
            <a-checkbox :indeterminate="videoIndeterminate" :checked="videoCheckAll" @change="onVideoCheckAllChange">
              视频
            </a-checkbox>
          </div>
          <a-checkbox-group v-model="videoCheckedList" @change="onVideoChange" :options="videoOptions"/>
        </div>
        <div>
          <div :style="{ }">
            <a-checkbox :indeterminate="fileIndeterminate" :checked="fileCheckAll" @change="onFileCheckAllChange">
              文件
            </a-checkbox>
          </div>
          <a-checkbox-group v-model="fileCheckedList" @change="onFileChange" :options="fileOptions"/>
        </div>
        <div>
          <div :style="{ lineHight:'20px'}">
            其他<span style="font-size: 12px;color: #999999;">多个类型用英文逗号（,）分割。例:jpg,png</span>
          </div>
          <a-input v-model="otherUploads"/>
        </div>
      </a-form-model-item>

      <a-form-model-item
        v-if="['date-picker','range-picker'].indexOf(config.type)>-1"
        label="显示时间"
      >
        <a-switch
          checked-children="是"
          un-checked-children="否"
          :checked="config.showTime"
          @click="showTimeChange"
        />
      </a-form-model-item>

      <!--日期时间配置-->
      <div
        style="background-color: antiquewhite;padding: 0px 10px;"
        v-if="['date-picker','range-picker'].indexOf(config.type)>-1 && config.showTime"
      >
        <a-form-model-item
          label="时间格式"
        >
          <a-input v-model="config.showTime.format"/>
        </a-form-model-item>
        <a-form-model-item
          label="小时步长"
        >
          <a-input v-model="config.showTime.hourStep"/>
        </a-form-model-item>
        <a-form-model-item
          label="分钟步长"
        >
          <a-input v-model="config.showTime.minuteStep"/>
        </a-form-model-item>
        <a-form-model-item
          label="秒步长"
        >
          <a-input v-model="config.showTime.secondStep"/>
        </a-form-model-item>
      </div>

      <a-form-model-item
        v-if="['time-picker'].indexOf(config.type)>-1"
        label="小时步长"
      >
        <a-input-number v-model="config.hourStep" :min="1" :max="23"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['time-picker'].indexOf(config.type)>-1"
        label="分钟步长"
      >
        <a-input-number v-model="config.minuteStep" :min="1" :max="59"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['time-picker'].indexOf(config.type)>-1"
        label="秒步长"
      >
        <a-input-number v-model="config.secondStep" :min="1" :max="59"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['rate'].indexOf(config.type)>-1"
        label="各项提示"
      >
        <a-input v-for="(r,i) in config.tooltips" :key="i" v-model="config.tooltips[i]"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['row'].indexOf(config.type)>-1"
        label="栅格间隔">
        <a-input-number v-model="config.gutter" :min="1" :max="50"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['tinymce'].indexOf(config.type)>-1"
        label="组件高度">
        <a-input v-model="config.height"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['tinymce'].indexOf(config.type)>-1"
        label="组件皮肤">
        <a-radio-group v-model="config.skin" button-style="solid">
          <a-radio-button value="light">
            白
          </a-radio-button>
          <a-radio-button value="dark">
            light
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item
        v-if="['text','row','number','textarea','password','radio',
               'checkbox','select','cascader','time-picker',
               'date-picker','range-picker','upload','tinymce'].indexOf(config.type)>-1"
        label="组件栅格">
        <a-slider @change="sliderChange" v-model="config.span" :max="24" :min="1"/>
      </a-form-model-item>

      <a-divider
        v-if="['radio','checkbox','select','cascader'].indexOf(config.type)>-1"
      >选项配置
      </a-divider>
      <a-form-model-item
        v-if="['select'].indexOf(config.type)>-1"
        label="展开选项">
        <a-switch
          checked-children="是"
          un-checked-children="否"
          v-model="config.open"
        />
      </a-form-model-item>

      <a-form-model-item label="数据类型" v-if="['radio','checkbox','select','cascader'].indexOf(config.type)>-1">
        <a-radio-group v-model="config.dataType" button-style="solid">
          <a-radio-button value="static">
            静态数据
          </a-radio-button>
          <a-radio-button value="dynamic">
            动态数据
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item
        v-if="['radio','checkbox','select','cascader'].indexOf(config.type)>-1 && config.dataType=='dynamic'"
        label="数据地址"
      >
        <a-input v-model="config.dynamicOptions.url">
          <label
            @click="getOptions()"
            slot="addonAfter"
            :class="optionLoading?'option-loading':''"
            class="designer-icon pointer color-blue">&#xe60a;</label>
        </a-input>
      </a-form-model-item>

      <a-form-model-item
        v-if="['radio','checkbox','select','cascader'].indexOf(config.type)>-1 && config.dataType=='dynamic'"
        label="标签键名"
      >
        <a-input v-model="config.dynamicOptions.label"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['radio','checkbox','select','cascader'].indexOf(config.type)>-1 && config.dataType=='dynamic'"
        label="值键名"
      >
        <a-input v-model="config.dynamicOptions.value"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['cascader'].indexOf(config.type)>-1 && config.dataType=='dynamic'"
        label="子级键名"
      >
        <a-input v-model="config.dynamicOptions.children"/>
      </a-form-model-item>

      <div
        style="background-color: antiquewhite;padding: 0px 20px;ax-height: 300px;overflow: auto;"
        v-if="['cascader'].indexOf(config.type)>-1 && config.dataType=='static'"
      >
        <a-tree
          :tree-data="config.options"
          :defaultExpandAll="true"
          :replaceFields="{
            children:'children', title:'label', key:'value'
          }"
        >
        </a-tree>
      </div>

      <draggable
        v-if="['radio','checkbox','select'].indexOf(config.type)>-1 && config.dataType=='static'"
        v-model="config.options"
        v-bind="{group:'widgetConfig', ghostClass: 'ghost',animation: 200}"
        class="widget-form-list"
        handle=".config-move"
      >
        <div class="config-options margin-bottom-sm" v-for="(opt,o) in config.options" :key="o">
          <i class="designer-icon config-move" style="font-size: 22px;cursor:move;">&#xe63f;</i>
          <a-input
            class="margin-left-sm"
            :value="opt.label"
            @change="e => optChange(e.target.value, opt,'label')"
            placeholder="选项名"/>
          <a-input
            class="margin-left-sm"
            @change="e => optChange(e.target.value, opt,'value')"
            :value="opt.value"
            placeholder="选项值"/>
          <i
            class="designer-icon margin-left-sm"
            @click="delOpt(config.options,o)"
            style="cursor:pointer;font-size: 22px;color: #f5222d">&#xe656;</i>
        </div>
      </draggable>
      <div class="margin-left-xxl margin-tb-lg">
        <a
          v-if="['radio','checkbox','select'].indexOf(config.type)>-1 && config.dataType=='static'"
          @click="addOptions()"
          class="designer-icon">&#xe655;添加选项</a>
      </div>

      <!--      <a-divider-->
      <!--        v-if="['text','number','textarea','password','radio',-->
      <!--               'select','rate','time-picker','date-picker',-->
      <!--               'range-picker','upload'].indexOf(config.type)>-1"-->
      <!--      >扩展配置-->
      <!--      </a-divider>-->
      <a-form-model-item label="形态" v-if="['radio'].indexOf(config.type)>-1">
        <a-radio-group v-model="config.style" button-style="solid">
          <a-radio-button value="default">
            默认
          </a-radio-button>
          <a-radio-button value="button">
            按钮
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="排列方式" v-if="['radio','checkbox'].indexOf(config.type)>-1">
        <a-radio-group v-model="config.layout" button-style="solid">
          <a-radio-button value="across">
            横排
          </a-radio-button>
          <a-radio-button value="vertical">
            竖排
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item
        label="风格"
        v-if="['radio'].indexOf(config.type)>-1"
        :extra="config.type==='radio'?'仅在形态为按钮时生效':''"
      >
        <a-radio-group v-model="config.buttonStyle" button-style="solid">
          <a-radio-button value="outline">
            outline
          </a-radio-button>
          <a-radio-button value="solid">
            solid
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item
        label="控件大小"
        v-if="['text','number','password','radio',
               'select','cascader','time-picker','date-picker','range-picker'].indexOf(config.type)>-1"
        :extra="config.type==='radio'?'仅在形态为按钮时生效':''"
      >
        <a-radio-group v-model="config.size" button-style="solid">
          <a-radio-button value="large">
            大
          </a-radio-button>
          <a-radio-button value="default">
            中
          </a-radio-button>
          <a-radio-button value="small">
            小
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item
        v-if="['textarea'].indexOf(config.type)>-1"
        label="最小高度"
      >
        <a-input-number
          style="width: 100%"
          :min="0"
          :max="10"
          v-model="config.minRows"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['textarea'].indexOf(config.type)>-1"
        label="最大高度"
      >
        <a-input-number
          style="width: 100%"
          :min="0"
          :max="10"
          v-model="config.maxRows"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['number'].indexOf(config.type)>-1"
        label="数值精度"
      >
        <a-input-number
          style="width: 100%"
          :min="0"
          :max="5"
          v-model="config.precision"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['number'].indexOf(config.type)>-1"
        label="小数点"
      >
        <a-input v-model="config.decimalSeparator"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['number'].indexOf(config.type)>-1"
        label="步长"
        extra="每次改变步数，可以为小数"
      >
        <a-input-number
          v-model="config.step"
          :precision="5"
          :min="0.1"
          :max="100000"
          :step="0.01"
          style="width:100%"
          decimalSeparator="."
        />
      </a-form-model-item>

      <a-form-model-item
        v-if="['text','number','textarea','password','radio','checkbox',
               'select','cascader','rate','time-picker','date-picker',
               'range-picker','upload','tinymce'].indexOf(config.type)>-1"
        label="标签宽度"
        extra="默认跟随表单标签设置"
      >
        <a-slider @change="sliderChange" v-model="config.labelCol" :max="24" :min="0"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['text','password'].indexOf(config.type)>-1"
        label="前置标签"
      >
        <a-input v-model="config.addonBefore">
          <a slot="addonAfter" class="designer-icon" @click="chooseIcon('addonBefore')">&#xe886; 选择</a>
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        v-if="['text','password'].indexOf(config.type)>-1"
        label="后置标签"
      >
        <a-input v-model="config.addonAfter">
          <a slot="addonAfter" class="designer-icon" @click="chooseIcon('addonAfter')">&#xe886; 选择</a>
        </a-input>
      </a-form-model-item>

      <a-form-model-item
        v-if="['text'].indexOf(config.type)>-1"
        label="前置图标"
      >
        <a-input v-model="config.prefix">
          <a slot="addonAfter" class="designer-icon" @click="chooseIcon('prefix')">&#xe886; 选择</a>
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        v-if="['text'].indexOf(config.type)>-1"
        label="后置图标"
      >
        <a-input v-model="config.suffix">
          <a slot="addonAfter" class="designer-icon" @click="chooseIcon('suffix')">&#xe886; 选择</a>
        </a-input>
      </a-form-model-item>

      <a-form-model-item
        v-if="['text'].indexOf(config.type)>-1"
        label="后置图标提示"
        :label-col=" { span: 9 }"
        :wrapper-col="{ span: 15 }"
      >
        <a-input v-model="config.suffixTip"></a-input>
      </a-form-model-item>

      <a-form-model-item
        v-if="['text','number','textarea','password','radio',
               'select','cascader','rate','time-picker','date-picker',
               'range-picker','upload','tinymce'].indexOf(config.type)>-1"
        label="显示标签"
      >
        <a-switch
          checked-children="是"
          un-checked-children="否"
          v-model="config.showLebel"
        />
      </a-form-model-item>
      <a-form-model-item
        v-if="['text','textarea','select','cascader','rate','time-picker','date-picker','range-picker'].indexOf(config.type)>-1"
        label="允许清空"
      >
        <a-switch
          checked-children="是"
          un-checked-children="否"
          v-model="config.allowClear"
        />
      </a-form-model-item>

      <!--      <a-form-model-item-->
      <!--        v-if="['rate'].indexOf(config.type)>-1"-->
      <!--        label="允许半选"-->
      <!--      >-->
      <!--        <a-switch-->
      <!--          checked-children="是"-->
      <!--          un-checked-children="否"-->
      <!--          v-model="config.allowHalf"-->
      <!--        />-->
      <!--      </a-form-model-item>-->

      <a-form-model-item
        v-if="['select','cascader'].indexOf(config.type)>-1"
        label="允许筛选"
      >
        <a-switch
          checked-children="是"
          un-checked-children="否"
          v-model="config.showSearch"
        />
      </a-form-model-item>

      <a-form-model-item
        v-if="['text','number','textarea','password','radio',
               'checkbox','select','cascader','rate','time-picker',
               'date-picker','range-picker','upload','tinymce'].indexOf(config.type)>-1"
        label="是否禁用"
      >
        <a-switch
          checked-children="是"
          un-checked-children="否"
          v-model="config.disabled"
        />
      </a-form-model-item>

      <!--      <a-divider-->
      <!--        v-if="['row'].indexOf(config.type)>-1"-->
      <!--      >布局结构树-->
      <!--      </a-divider>-->

      <a-divider
        v-if="['text','number','textarea','password','radio',
               'checkbox','select','cascader','time-picker',
               'date-picker','range-picker','upload','tinymce'].indexOf(config.type)>-1"
      >校验配置
      </a-divider>
      <a-form-model-item
        v-if="['text','number','textarea','password','radio',
               'checkbox','select','cascader','time-picker',
               'date-picker','range-picker','upload','tinymce'].indexOf(config.type)>-1"
        label="是否必填"
      >
        <a-switch
          checked-children="是"
          un-checked-children="否"
          v-model="config.required"
        />
      </a-form-model-item>

      <a-form-model-item
        v-if="['upload'].indexOf(config.type)>-1"
        label="最大数量"
      >
        <a-input-number
          :min="1"
          :max="20"
          v-model="config.maxNum"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['upload'].indexOf(config.type)>-1"
        label="最大大小"
        extra="单位MB"
      >
        <a-input-number
          :min="0"
          :max="10240"
          v-model="config.size"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['text','textarea','password'].indexOf(config.type)>-1"
        label="最小长度"
      >
        <a-input-number
          :min="0"
          :max="9999999999"
          v-model="config.minLength"/>
      </a-form-model-item>
      <a-form-model-item
        v-if="['text','textarea','password'].indexOf(config.type)>-1"

        label="最大长度"
      >
        <a-input-number
          :min="0"
          :max="9999999999"
          v-model="config.maxLength"/>
      </a-form-model-item>

      <a-form-model-item
        v-if="['number'].indexOf(config.type)>-1"
        label="最小值"
      >
        <a-input-number
          style="width: 100%"
          :min="0"
          :max="9999999999"
          v-model="config.min"/>
      </a-form-model-item>
      <a-form-model-item
        v-if="['number'].indexOf(config.type)>-1"
        label="最大值"
      >
        <a-input-number
          style="width: 100%"
          :min="0"
          :max="9999999999"
          v-model="config.max"/>
      </a-form-model-item>

      <div
        v-for="(rule,i) in config.rules"
        :key="i"
        v-if="['text','number','textarea','password'].indexOf(config.type)>-1"
        class="padding-lg widget-rules"
      >
        <div class="designer-icon del" @click="delRule(i)">&#xe667;</div>
        <a-input placeholder="表达式" v-model="rule.reg">
          <a slot="addonAfter" class="designer-icon" @click="chooseReg(i)">&#xe886; 选择</a>
        </a-input>
        <a-input class="margin-top-sm" placeholder="错误提示" v-model="rule.msg">
        </a-input>
      </div>
      <a
        v-if="['text','number','textarea','password'].indexOf(config.type)>-1"
        @click="addRules"
        class="designer-icon margin-left-xxl">&#xe655;添加规则</a>

    </a-form-model>
    <a-modal :width="720" v-model="visible" title="选择图标" :footer="null">
      <a-row type="flex" :gutter="5">
        <a-col @click="doChooseIcon(ic)" class="text-center choose" :span="3" v-for="(ic,i) in icons" :key="i">
          <div><i class="designer-icon size-xxl" v-html="ic.value"></i></div>
          <div>{{ ic.name }}</div>
        </a-col>
      </a-row>
    </a-modal>

    <a-modal :width="500" v-model="regsVisible" title="内置表达式" :footer="null">
      <a-list class="list-container" item-layout="horizontal" :data-source="regs">
        <a-list-item slot="renderItem" slot-scope="reg">
          <a-list-item-meta
            :description="reg.msg"
          >
            <span slot="title">{{ reg.name }}</span>
          </a-list-item-meta>
          <a slot="actions" @click="doChooseRes(reg)">选择</a>
        </a-list-item>
      </a-list>
    </a-modal>
  </a-card>
</template>

<script>
import icons from './config/icons'
import regs from './config/regs'
import draggable from 'vuedraggable'
/* 图标选择当前项标记 */
let v = ''
/* 正则选择当前项标记 */
let regIndex = -1
export default {
  name: 'WidgetConfig',
  components: { draggable },
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
    config: {
      handler (v) {
        this.$emit('updateAttr', v)
      },
      deep: true
    },
    /* 文件上传类型选择 start */
    imgCheckedList (v) {
      this.setAccept()
    },
    videoCheckedList (v) {
      this.setAccept()
    },
    fileCheckedList (v) {
      this.setAccept()
    },
    otherUploads (v) {
      this.setAccept()
    }
    /* 文件上传类型选择 end */
  },
  data () {
    return {
      config: this.item,
      visible: false,
      icons: icons,
      regsVisible: false,
      regs: regs,
      optionLoading: false,

      /* 文件上传-图片类 */
      imgCheckedList: [],
      imgIndeterminate: false,
      imgCheckAll: false,
      imgOptions: ['png', 'jpg', 'jpeg', 'gif'],

      /* 文件上传-视频类 */
      videoCheckedList: [],
      videoIndeterminate: false,
      videoCheckAll: false,
      videoOptions: ['avi', 'mp4', 'wmv', 'rmvb', 'flv', '3gp'],

      /* 文件上传-文件类 */
      fileCheckedList: [],
      fileIndeterminate: false,
      fileCheckAll: false,
      fileOptions: ['doc', 'docx', 'pdf', 'xls', 'xlsx'],
      /* 文件上传，其他类型 */
      otherUploads: ''
    }
  },
  mounted () {
    /* 文件上传格式处理 */
    if (this.config.type === 'upload') {
      const S = this.config.accept.split(',')
      S.forEach(s => {
        if (s === '') {
          return
        }
        s = s.substring(1, s.length)
        if (this.imgOptions.indexOf(s) > -1) {
          this.imgCheckedList.push(s)
        } else if (this.videoOptions.indexOf(s) > -1) {
          this.videoCheckedList.push(s)
        } else if (this.fileOptions.indexOf(s) > -1) {
          this.fileCheckedList.push(s)
        } else {
          this.otherUploads += s + ','
        }
      })
      this.onImageChange(this.imgCheckedList)
      this.onVideoChange(this.videoCheckedList)
      this.onFileChange(this.fileCheckedList)
    }
  },
  methods: {
    /* 设置文件上传格式 */
    setAccept () {
      this.config.accept = ''
      this.imgCheckedList.forEach(v => {
        this.config.accept += `.${v},`
      })
      this.videoCheckedList.forEach(v => {
        this.config.accept += `.${v},`
      })
      this.fileCheckedList.forEach(v => {
        this.config.accept += `.${v},`
      })

      const otherUploadsArray = this.otherUploads.split(',')
      otherUploadsArray.forEach(v => {
        if (v === '') {
          return
        }
        if (v.indexOf('.') === 0) {
          this.config.accept += `${v},`
        } else {
          this.config.accept += `.${v},`
        }
      })
    },
    /* 文件上传类型 - 图片类 */
    onImageCheckAllChange (e) {
      Object.assign(this, {
        imgCheckedList: e.target.checked ? this.imgOptions : [],
        imgIndeterminate: false,
        imgCheckAll: e.target.checked
      })
    },
    onImageChange (checkedList) {
      this.imgIndeterminate = !!checkedList.length && checkedList.length < this.imgOptions.length
      this.imgCheckAll = checkedList.length === this.imgOptions.length
    },
    /* 文件上传类型 - 视频类 */
    onVideoCheckAllChange (e) {
      Object.assign(this, {
        videoCheckedList: e.target.checked ? this.videoOptions : [],
        videoIndeterminate: false,
        videoCheckAll: e.target.checked
      })
    },
    onVideoChange (checkedList) {
      this.videoIndeterminate = !!checkedList.length && checkedList.length < this.videoOptions.length
      this.videoCheckAll = checkedList.length === this.videoOptions.length
    },
    /* 文件上传类型 - 文件类 */
    onFileCheckAllChange (e) {
      Object.assign(this, {
        fileCheckedList: e.target.checked ? this.fileOptions : [],
        fileIndeterminate: false,
        fileCheckAll: e.target.checked
      })
    },
    onFileChange (checkedList) {
      this.fileIndeterminate = !!checkedList.length && checkedList.length < this.fileOptions.length
      this.fileCheckAll = checkedList.length === this.fileOptions.length
    },
    /* 日期组件是否显示时间控制 */
    showTimeChange () {
      if (this.config.showTime === false) {
        this.config.showTime = {
          format: 'HH:mm:ss', // 格式
          hourStep: 1, // 小时步长
          minuteStep: 1, // 分钟步长
          secondStep: 1 // 秒步长
        }
      } else {
        this.config.showTime = false
      }
    },
    /* 评分总分改变 */
    rateChange () {
      if (this.config.tooltips.length < this.config.count) {
        const length = this.config.count - this.config.tooltips.length
        for (let i = 0; i < length; i++) {
          this.config.tooltips.push('')
        }
      } else {
        const length = this.config.tooltips.length - this.config.count
        for (let i = 0; i < length; i++) {
          this.config.tooltips.pop()
        }
      }
    },
    /* 添加选项 */
    addOptions () {
      this.config.options.push({ label: '', value: '' })
    },
    /* 选项值改变 */
    optChange (v, o, i) {
      o[i] = v
    },
    /* 删除选项值 */
    delOpt (options, i) {
      options.splice(i, 1)
    },
    /* 标签宽度 */
    sliderChange (v) {
      this.config.wrapperCol = 24 - v
    },
    /* 选择icon弹窗 */
    chooseIcon (val) {
      v = val
      this.visible = true
    },
    /* 选择icon */
    doChooseIcon (icon) {
      this.config[v] = icon.value
      this.visible = false
    },
    /* 添加校验规则 */
    addRules () {
      this.config.rules.push({
        reg: '',
        msg: ''
      })
    },
    /* 选择正则弹窗 */
    chooseReg (i) {
      regIndex = i
      this.regsVisible = true
    },
    /* 选择正则表达式 */
    doChooseRes (item) {
      this.config.rules[regIndex] = {
        reg: item.val,
        msg: item.msg
      }
      this.regsVisible = false
    },
    /* 删除正则表达式规则 */
    delRule (i) {
      this.config.rules.splice(i, 1)
    },
    /* 动态获取选项 */
    getOptions () {
      const url = this.config.dynamicOptions.url
      const regx = new RegExp('http(s)?:\\/\\/([\\w-]+\\.)+[\\w-]+(\\/[\\w- .\\/?%&=]*)?')
      if (!regx.test(url)) {
        this.$message.error('请输入正确url！')
        return
      }
      this.optionLoading = true

      this.$http({
        url: this.config.dynamicOptions.url,
        method: 'get',
        params: {}
      }).then(res => {
        if (res.code === 1 && res.data.length > 0) {
          if (this.config.dynamicOptions.label !== 'label' || this.config.dynamicOptions.value !== 'value') {
            res.data.forEach(item => {
              item.label = item[this.config.dynamicOptions.label]
              item.value = item[this.config.dynamicOptions.value]
            })
          }
          this.config.options = res.data
          this.optionLoading = false
        } else {
          this.$message.error('接口异常，请检查！' + res.code)
        }
      }).catch(e => {
        console.log(e)
        this.optionLoading = false
        this.$message.error('接口异常，请检查！')
      })
    }
  }
}
</script>

<style scoped lang="less">
  .widget-config {
    height: calc(100vh - 180px);
    overflow-y: auto;
  }

  .choose {
    cursor: pointer;

    &:hover {
      background-color: #1890FF;
    }
  }

  .widget-rules {
    position: relative;
    background-color: #F8F8F8;

    .del {
      cursor: pointer;
      position: absolute;
      top: -15px;
      right: 0;
      font-size: 20px !important;

      &:hover {
        color: #FE0000;
      }
    }
  }

  .list-container {
    overflow: auto;
    padding: 8px 24px;
    height: 500px;
  }

  .config-options {
    display: flex;
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(-360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  .option-loading {
    display: inline-block;
    /*-webkit-animation: spin 1s linear 1s 5 alternate;*/
    /*animation: spin 1s linear infinite alternate;*/

    -webkit-transform: rotate(-360deg);
    animation: spin 2s linear infinite;
    -moz-animation: spin 2s linear infinite;
    -webkit-animation: spin 2s linear infinite;
    -o-animation: spin 2s linear infinite;
  }
</style>
