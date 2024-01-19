<template>
  <p-input-group v-if="curComConfig.layouts&&curComConfig.layouts.length>1">
    <p-input-group-addon>组件布局</p-input-group-addon>
    <p-select-button :options="curComConfig.layouts" v-model="curItemConfig.layout"></p-select-button>
  </p-input-group>
  <p-input-group v-if="activeData.__id__&&activeData.__id__!=='plainText'">
    <p-input-group-addon>组件名</p-input-group-addon>
    <p-input-text v-model="curItemConfig.itemName" placeholder="请输入组件名"/>
  </p-input-group>
  <p-input-group v-if="activeData.__id__!=='plainText' &&typeof activeData!=='string'">
    <p-input-group-addon>ref</p-input-group-addon>
    <p-input-text v-model="curItemProps.ref" title="请输入ref对象变量名">
    </p-input-text>
  </p-input-group>
  <template v-if="curItemConfig.wrapWithInputGroup">

    <p-divider>表单属性</p-divider>
    <p-input-group
        v-if="curItemConfig.showLabel !== undefined &&curItemConfig.labelWidth !== undefined"
        label="">
      <p-input-group-addon>显示标签</p-input-group-addon>
      <p-input-switch v-model="curItemConfig.showLabel"/>
    </p-input-group>
    <p-input-group v-if="curItemConfig.wrapWithInputGroup">
      <p-input-group-addon>标题</p-input-group-addon>
      <p-input-text v-model="curItemConfig.label" placeholder="请输入标题"/>
    </p-input-group>
    <p-input-group v-if="curItemProps.placeholder !== undefined">
      <p-input-group-addon>占位提示</p-input-group-addon>
      <p-input-text v-model="curItemProps.placeholder" placeholder="请输入占位提示"/>
    </p-input-group>
  </template>

  <p-input-group v-if="activeData.__vModel__ !== undefined" title="字段名，用于v-model">
    <p-input-group-addon>字段名</p-input-group-addon>
    <p-input-text v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）"/>
  </p-input-group>
  <p-input-group v-if="activeData.__vModel__ !== undefined">
    <p-input-group-addon v-p-tooltip.top="'请在控件上输入'">
      默认值
    </p-input-group-addon>
    <div class="flex-grow-1 d-flex">
      <div class="flex-grow-1 align-self-center"> {{ curItemConfig.defaultValue }}</div>
      <p-button text icon="pi pi-trash" severity="danger" title="清空" v-if="curItemConfig.defaultValue!==undefined"
                @click="curItemConfig.defaultValue=undefined"></p-button>
    </div>

  </p-input-group>
  <p-input-group v-if="curItemConfig.tag==='p-dialog'||curItemConfig.tag==='p-sidebar'"
                 title="显示dialog或者drawer">
    <p-input-group-addon>显示</p-input-group-addon>
    <p-button
        @click="curItemConfig.defaultValue=!curItemConfig.defaultValue">显示{{ curItemConfig.tag }}
    </p-button>
  </p-input-group>
  <template v-if="activeData.__id__!=='plainText'">
    <p-divider>属性</p-divider>

    <form-item label="原生属性">
<!--      <p-input-group-addon>原生属性</p-input-group-addon>-->
      <object-editor v-model="activeData.__native__"/>
    </form-item>
    <p-input-group v-if="curItemConfig.iconName !== undefined">
      <p-input-group-addon>图标</p-input-group-addon>
      <icon-chooser v-model="curItemConfig.iconName"></icon-chooser>
    </p-input-group>
    <p-input-group v-if="curItemConfig.reference !== undefined">
      <p-input-group-addon>文字</p-input-group-addon>
      <p-input-text v-model="curItemConfig.reference"/>
    </p-input-group>
    <p-input-group v-if="activeData.__slots__&&typeof activeData.__slots__.default==='string'">
      <p-input-group-addon>文字</p-input-group-addon>
      <p-input-text v-model="activeData.__slots__.default" placeholder="请输入文字"/>
    </p-input-group>
    <p-input-group v-if="curItemConfig.required !== undefined" label="">
      <p-input-group-addon>必填</p-input-group-addon>
      <p-input-switch v-model="curItemConfig.required"></p-input-switch>
    </p-input-group>
    <p-input-group v-if="activeData.__data__">
      <p-input-group-addon>{{ curComConfig.data.label }}</p-input-group-addon>
      <!--v-if="activeData.__data__.dynamic-->

      <div>
      <p-select-button v-model="activeData.__data__.source" class="w-100"
                       :options="[{text:'静态数据',value:'static'},{text:'动态数据',value:'dynamic'}]"
                       option-label="text" option-value="value"/>

      <p-input-text v-model="activeData.__refs__[curComConfig.data.name]" class="w-100"
                    v-if="activeData.__data__[activeData.__data__.source].ref"/>
      <div v-if="activeData.__data__.source==='static'">
        <config-value-input :attr-config="curComConfig.data.static.type"
                            v-model="activeData.__data__.static[curComConfig.data.name]"></config-value-input>
      </div>
      <div v-show="activeData.__data__.source==='dynamic'" v-if="activeData.__data__.dynamic">
        <p-input-group>
          <p-input-group-addon>网址</p-input-group-addon>
          <p-input-text v-model="activeData.__data__.dynamic.url" placeholder="网址">
          </p-input-text>
        </p-input-group>
        <p-input-group>
          <p-input-group-addon>方法</p-input-group-addon>
          <p-select-button v-model="activeData.__data__.dynamic.method"
                           :options="['get','post']"/>
        </p-input-group>
        <p-input-group>
          <p-input-group-addon>数据位置</p-input-group-addon>
          <p-input-text v-model="activeData.__data__.dynamic.dataKey" placeholder="数据位置"
                        @change="changeRenderKey()">
          </p-input-text>
        </p-input-group>
      </div>
      </div>
    </p-input-group>
    <template v-for="(v,k) in defaultSetterData" :key="v">
      <p-input-group v-show="!v.switch||v.switch&&curItemProps[v.switch[0]]===v.switch[1]">
        <p-input-group-addon v-if="v.title">

          <span :title="`${k}${v.title?'：'+v.title:''}。${v.ref?'':'双击可以变成ref对象'}`"
                @dblclick.prevent="!v.ref&&switchRef(k)" @click.prevent="">
          {{ v.label || v.title }}</span>
          <i v-if="attributeConfig[k]&&attributeConfig[k].types.length>1"
             class="pi pi-arrow-right-arrow-left ml-1"
             :title="`当前${v.type.name}类型，点击更换类型`" @click.native="changeType(k,v.type.name)">
          </i>
          <i v-if="v.required" style="color:var(--red-500)">*</i>
        </p-input-group-addon>

        <div class="flex-grow-1 d-flex flex-wrap">
          <p-input-text v-model="__refs__[k]" v-if="__refs__&&__refs__[k]" placeholder="请输入ref对象变量名" class="w-100"
                        title="请输入ref对象变量名"
          />
          <!--      :treeProps="curItemProps.props"使用不明智，但确实解决了问题-->
          <config-value-input v-model="curItemProps[k]" v-if="v.type.tag" :treeProps="curItemProps.props"
                              :attr-config="v.type"></config-value-input>
        </div>
      </p-input-group>
    </template>
  </template>


</template>

<script setup>
import ConfigValueInput from "@/views/design/ConfigValueInput";
import {computed} from "vue";
import {camelCase, deepClone, getType} from "@/utils";
import IconChooser from "@/components/editors/IconChooser.vue";
import primeVueConfigMap from "@/primevue-config";
import ObjectEditor from "@/components/editors/ObjectEditor.vue";
import FormItem from "@/components/formItem"

const props = defineProps(["activeData", "attributeConfig"]);
const curItemConfig = computed(() => {
  return props.activeData.__config__ || {}
})
//当前组件的属性值
const curItemProps = computed(() => {
  return props.activeData.__props__ || {}
})
const __refs__ = computed(() => {
  return props.activeData && props.activeData.__refs__ || {}
})

onMounted(() => {
  nextTick(() => {
    setDefaultSetterData();
  })

})
const defaultSetterData = ref({});
watch(() => curItemConfig.value.tag, (val) => {
  setDefaultSetterData();
})
const curComConfig = computed(() => {
  return primeVueConfigMap[props.activeData.__id__] || {}
})

function setDefaultSetterData() {
  defaultSetterData.value = {};
  const res = {};
  for (const name in props.attributeConfig) {
    if (name === 'placeholder' || name === 'vModel') {
      continue;
    }
    if (props.attributeConfig[name].hide) {
      continue;
    }

    const anotherConf = deepClone(props.attributeConfig[name]);
    let typeIndex = 0;
    let type = getType(curItemProps.value[name]);

    anotherConf.types.forEach((t, index) => {
      if (type === t.name) {
        typeIndex = index;
        return true;
      }
    })
    anotherConf.type = anotherConf.types[typeIndex]
    res[name] = anotherConf;
  }

  nextTick(() => {
    defaultSetterData.value = res;
  })
}

//更改

function changeType(key, typeName) {
  console.info(key, typeName)
  const types = props.attributeConfig[key].types;
  let nextTypeName
  let thisDefault;
  defaultSetterData.value[key].type = {};
  types.forEach((t, index) => {
    if (typeName === t.name) {
      const type = types[(index + 1) % types.length];

      nextTypeName = type.name;
      thisDefault = type.default;
      nextTick(() => {
        defaultSetterData.value[key].type = type;
      })
      return true;
    }
  })
  if (getType(props.attributeConfig[key].default) === nextTypeName) {
    curItemProps.value[key] = props.attributeConfig[key].default;
    return;
  }
  switch (nextTypeName) {

    case 'string':
      curItemProps.value[key] = "";
      break;
    case 'enum':
      curItemProps.value[key] = props.attributeConfig[key].default;
      break;
    case 'object':
      curItemProps.value[key] = {};
      break;
    case 'array':
      curItemProps.value[key] = [];
      break;
    case 'number':
      curItemProps.value[key] = thisDefault || 0;
      break;
    default:
      curItemProps.value[key] = undefined;
  }
}

import {useConfirm} from "primevue/useconfirm";

const confirm = useConfirm();

function switchRef(key) {
  let __refs__ = props.activeData.__refs__;
  if (!__refs__) {
    props.activeData.__refs__ = {};
    __refs__ = props.activeData.__refs__;
  }
  let refName = __refs__[key];
  if (!refName) {
    confirm.require({
      message: '是否将此设置改成ref对象？',
      header: '提示',
      icon: 'pi pi-info',
      accept: () => {
        __refs__[key] = camelCase(curItemConfig.value.itemName + "-" + key);
      },
      reject: () => {
      }
    });
  } else {
    delete __refs__[key]
  }
}
</script>

<style scoped>

</style>