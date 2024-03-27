<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo"><img :src="logo" alt="logo"/> PrimeVue Designer<a class="github"
                                                                            href="https://github.com/wizount/prime-vue-designer"
                                                                            target="_blank">
          <svg-icon icon-class="github"/>
        </a>
          <a class="github"
             href="https://gitee.com/wizount/prime-vue-designer"
             target="_blank">
            <svg-icon icon-class="gitee"/>
          </a>
        </div>


      </div>
      <p-scroll-panel class="left-scrollbar">
        <p-accordion class="components-list" multiple>
          <p-accordion-tab :header="c.title" :name="c.title" v-for="c in leftComponent" :key="c.title">

            <draggable tag="div" class="components-draggable" :list="c.list" item-key="renderKey"
                       :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneDrawItem"
                       draggable=".components-item" :sort="false" @end="onEnd">
              <template #item="{element}">

                <p-button v-if="!element.__link__" class="components-item" @click="addDrawItem(element)"
                          severity="info"
                          v-p-tooltip.right="primeVueConfigMap[element.__id__].description">
                  <svg-icon :icon-class="element.__config__.tagIcon" class-name="m-2"/>
                  {{ element.__config__.name }}
                </p-button>
                <p-split-button v-else class="components-item" @click="addDrawItem(element)" severity="info"
                                :model="element.__link__.map(l=>{return {label:l.__config__.name || l.__config__.tag,command:()=>addDrawItem(l)}})">
                  <svg-icon :icon-class="element.__config__.tagIcon" class-name="m-2"/>
                  {{ element.__config__.name }}
                </p-split-button>
              </template>
            </draggable>

          </p-accordion-tab>

        </p-accordion>

      </p-scroll-panel>
    </div>
    <div class="center-board">
      <p-toast/>
      <p-menubar :model="toolbarItems" style="position: relative; z-index: 100;">
        <template #start>

        </template>
      </p-menubar>

      <p-overlay-panel ref="settingOp">
        <p-input-group>
          <p-input-group-addon>未选中组件画边框</p-input-group-addon>
          <p-input-switch v-model="designConf.unFocusedComponentBorder"></p-input-switch>
        </p-input-group>
        <!--        <p-input-group>-->
        <!--          <p-input-group-addon>组件包裹col</p-input-group-addon>-->
        <!--          <p-input-switch v-model="designConf.wrapWithCol"></p-input-switch>-->
        <!--        </p-input-group>-->
        <p-input-group>
          <p-input-group-addon>表单组件包裹input-group</p-input-group-addon>
          <p-input-switch v-model="designConf.wrapWithInputGroup"></p-input-switch>
        </p-input-group>

        <p-input-group>
          <p-input-group-addon>代码风格</p-input-group-addon>
          <p-dropdown style="float: right;" v-model="designConf.jsCodeStyle" :options="jsCodeStyleList"
                      option-label="text" option-value="value"/>
        </p-input-group>
        <p-input-group>
          <p-input-group-addon>暗黑模式</p-input-group-addon>
          <p-input-switch @click="toggleDark()" :model-value="isDark" title="暗黑模式"></p-input-switch>
        </p-input-group>
      </p-overlay-panel>


      <div id="copyNode" class="display:none;"></div>
      <!--      </div>-->
      <p-scroll-panel class="center-scrollbar" @scroll="resetActiveDrawItemPosition">
        <draggable tag="div" :list="drawItemList" style="padding: 5px;min-height: 400px"
                   group="componentsGroup" item-key="renderKey" @change="itemChange" :move="itemMove">
          <template #item="{element,index}">
            <draggable-item :current-item="element"
                            :active-id="activeId" :design-conf="designConf" @activeItem="activeDrawItem"
                            @change="itemChange" :item-move="itemMove" :form-models-and-rules="formModelsAndRules"
                            :dynamic-data="dynamicData"/>
          </template>
        </draggable>
        <div v-show="!drawItemList||drawItemList.length===0" class="empty-info"> 从左侧拖入或点选组件进行界面设计</div>
        <div class="activeToolbar" ref="activeToolbar" v-if="activeData.renderKey">
          <svg-icon style="color: var(--text-color)" :icon-class="activeData.__config__.tagIcon"/>
          <span style="color: var(--text-color)"> {{ activeData.__config__.itemName }}</span>

          <p-button class="tinyBtn" circle @click="activeParentDrawItem"
                    title="跳到父组件" icon="pi pi-angle-double-up"/>
          <p-button class="tinyBtn" severity="info" circle icon="pi pi-arrow-up"
                    @click="moveDrawItem(-1)"
                    title="上移"/>
          <p-button class="tinyBtn" severity="info" circle icon="pi pi-arrow-down"
                    @click="moveDrawItem(1)"
                    title="下移"/>
          <p-button class="tinyBtn" severity="info" circle icon="pi pi-copy" @click="drawItemCopy"
                    title="复制组件"/>
          <p-button class="tinyBtn" severity="danger" circle icon="pi pi-trash" @click="deleteDrawItem"
                    title="删除组件"/>
        </div>
      </p-scroll-panel>
    </div>
    <right-panel :active-data="activeData" :design-conf="designConf" :show-field="!!drawItemList.length"
                 @add-slot-draw-item="addSlotDrawItem"
                 @active-parent-draw-item="activeParentDrawItem"/>
    <preview-sidebar v-model:visible="previewSidebarVisible" :draw-item-list="drawItemList" position="full"/>
    <json-sidebar v-model:visible="JsonSidebarVisible" :json-str="jsonStr" @refresh="refreshJson"
                  :design-conf="designConf"/>

    <html-sidebar v-model:visible="htmlSidebarVisible" :html-str="htmlStr" :design-conf="designConf"/>
    <theme-sidebar v-model:visible="themeSidebarVisible"></theme-sidebar>
    <p-sidebar v-model:visible="drawItemTreeVisible" header="组件树" style="width: 480px" position="right"
               @show="openTreeSidebar">
      <!--      fixme 更改height-->
      <p-scroll-panel :style="{height: (height-100)+'px'}">
        <p-tree :value="drawItemTreeData" ref="drawItemTree" @node-select="activeDrawItemThroughTree">
          <template #default="{node:data}">
            <span v-if="data.__id__==='plainText' "><svg-icon
                :icon-class="data.__config__.tagIcon" :class="{ac:data.renderKey===activeData.renderKey}"/>{{
                data.__id__
              }} - {{ data.__config__.itemName }}</span>
            <span v-else-if="data.__config__&&data.__config__.tag" type="primary"><svg-icon
                :icon-class="data.__config__.tagIcon" :class="{ac:data.renderKey===activeData.renderKey}"/>{{
                data.__config__.tag
              }} - {{ data.__config__.itemName }}</span>
            <span v-else :title="`插槽${data.slotName}`">{{ data.slotName }}</span>

            <!--            <p-button style="margin-left: 8px" @click="removeItemFromTree(data)" icon="pi pi-trash" link-->
            <!--                      security="danger"/>-->


          </template>
          <!--          <template #default="{ node, data }">-->

          <!--          </template>-->

        </p-tree>
      </p-scroll-panel>

    </p-sidebar>
    <confirm-dialog></confirm-dialog>
  </div>
</template>

<script setup>


import logo from "@/assets/logo.png"
import Draggable from '@/vuedraggable/vuedraggable'
import {saveAs} from 'file-saver'
import ClipboardJS from 'clipboard'
import PreviewSidebar from './PreviewSidebar.vue'
import JsonSidebar from './JsonSidebar.vue'
import RightPanel from './RightPanel'
import {
  designConf as designConfPreset, jsCodeStyleList
} from '@/config/config'
import {addClass, camelCase, deepClone, deleteObjectProps} from '@/utils'


import {getDesignConf, saveDesignConf} from '@/utils/db'
import loadBeautifier from '@/utils/loadBeautifier'
import {useConfirm} from "primevue/useconfirm";

const confirm = useConfirm();


import {useToast} from 'primevue/usetoast';

const toast = useToast();

import DraggableItem from "./DraggableItem"
import {primeVueComponents} from "@/config/primevueConfig";


import primeVueConfigMap from "@/config";

const componentMap = {};
const leftComponent=[];
primeVueComponents.forEach((first) => {
 let list=[];
  first.children.forEach((second) => {
    second.children.forEach((third) => {
      list.push(third);
      createComponentMap(third)
      if (third.__link__) {
        third.__link__.forEach(l => {
          createComponentMap(l)
        })
      }
    });
  });
  leftComponent.push({
    title:first.title,
    list
  })
})
function createComponentMap(com) {

  if (primeVueConfigMap[com.__id__]) {
    if(primeVueConfigMap[com.__id__].directive){
      return
    }
    if (!com.__config__) {
      com.__config__ = {};
    }
    const {name, tag, tagIcon, layouts} = primeVueConfigMap[com.__id__];
    if (!com.__config__.name) {
      com.__config__.name = com.name||name;
    }
    if (!com.__config__.tag) {
      com.__config__.tag = tag;
    }
    if (!com.__config__.tagIcon) {
      com.__config__.tagIcon = tagIcon;
    }
    com.__config__.layout = layouts[0];
    componentMap[com.__id__] = com;
  }
}

import {nextTick} from "vue";
import HtmlSidebar from "@/views/design/HtmlSidebar.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";


let tempActiveData
let beautifier

//region 初始化

const props = defineProps({
  modelValue: {
    type: Array,
    default: []
  }
});
const emits = defineEmits(["update:modelValue"]);


const drawItemList = ref([])

watch(() => props.modelValue, (val) => {
  drawItemList.value = val;
})

watch(drawItemList, (val) => {
  if (val.length === 0) idGlobal.value = 100
  emits("update:modelValue", val);
  formModelsAndRules.value = {};
  buildFormModelsAndRules(val);
  buildDynamicData();
  drawItemTreeData.value = [];

}, {deep: true})
//endregion
const idGlobal = ref(100);

const designConf = ref(designConfPreset);
const drawingData = ref()
const activeId = ref(0)
const previewSidebarVisible = ref(false)

const generateConf = ref(null)

const activeData = ref({})
const activeToolbar = ref(null)

//region 初始化及退出
let clipboard
onMounted(() => {
  drawItemList.value = props.modelValue;
  if (drawItemList.value.length >= 1) {
    activeDrawItem(drawItemList.value[0])
  }

  idGlobal.value = 100;
  recursiveProcessDrawItemList(drawItemList.value, setMaxIdGlobal)
  const designConfInDB = getDesignConf()
  if (designConfInDB) {
    designConf.value = designConfInDB
  }
  loadBeautifier((btf) => {
    beautifier = btf
  })
  clipboard = new ClipboardJS('#copyNode', {
    text: (trigger) => {
      const codeStr = generateCode()
      toast.add({severity: 'success', summary: '成功', detail: '代码已复制到剪切板，可粘贴。', life: 3000});
      return codeStr
    },
  })
  clipboard.on('error', (e) => {
    toast.add({severity: 'error', summary: '错误', detail: '代码复制失败', life: 3000});
  })
})

onBeforeUnmount(() => {
  clipboard && clipboard.destroy();
})

/**
 *找出最大的idGlobal
 * @param item
 */
function setMaxIdGlobal(item) {
  if (!item || !item.__config__) return;
  let config = item.__config__;
  idGlobal.value = Math.max(idGlobal.value, config.drawItemId)
}

function findItemIndexInDrawItemList(targetItem) {
  return recursiveFindItemIndexInList(null, drawItemList.value, targetItem);
}

//endregion

//region 选中组件的操作

import {isObject, useWindowSize} from "@vueuse/core";

const {width, height} = useWindowSize();
watch([width, height], (val) => {
  nextTick(() => {
    resetActiveDrawItemPosition();
  })
})

function activeDrawItem(item) {
  if (!item || !item.__config__) {
    return;
  }
  activeData.value = item;
  activeId.value = item.__config__.drawItemId;
  setTimeout(() => {
    resetActiveDrawItemPosition();
  }, 50)
}

function drawItemCopy() {
  let res = findItemIndexInDrawItemList(activeData.value);
  if (res) {
    let {list} = res;

    let clone = deepClone(activeData.value);
    processADrawItemAndSlots(clone, resetDrawItemId)

    list.push(clone);
  }
}


function deleteDrawItem(e, item) {
  let {parent, list, index} = findItemIndexInDrawItemList(item || activeData.value);
  if (!Array.isArray(list) || index < 0 || index > list.length) {
    return;
  }
  list.splice(index, 1);
  nextTick(() => {
    const len = list.length
    if (len > 0) {
      index = index - 1;
      if (index < 0) {
        index = 0;
      }
      activeDrawItem(list[index])
    } else {
      parent && activeDrawItem(parent);
    }
    if (drawItemList.value.length === 0) {
      activeData.value = {}
    }
  })
}

//active父组件
function activeParentDrawItem() {
  let {parent} = findItemIndexInDrawItemList(activeData.value);
  if (parent) {
    activeDrawItem(parent);
  } else {
    // ("无父组件");
  }
}

//移动
function moveDrawItem(upOrDown) {

  let res = findItemIndexInDrawItemList(activeData.value);
  if (!res) {
    return;
  }
  let {list, index} = res;
  if (!list || list.length <= 1) {
    return
  }
  let moveIndex = index + upOrDown;
  if (moveIndex < 0 || moveIndex >= list.length) {
    return;
  }
  let a = list[index];
  list[index] = list[moveIndex];
  list[moveIndex] = a;
  nextTick(() => {
    activeDrawItem(activeData.value)
  })

}

function resetActiveDrawItemPosition() {
  let ele = document.querySelector(".selected-draw-ele");
  if (!ele) {
    ele = document.querySelector(".selected-raw-ele :first-child");
    if (ele) {
      addClass(ele, "drawing-ele");
    }
  }
  if (ele) {
    let rect = ele.getBoundingClientRect()
    activeToolbar.value.style.display = 'block';
    activeToolbar.value.style.left = (rect.left + rect.width - activeToolbar.value.clientWidth) + "px";
    activeToolbar.value.style.top = (rect.top - 20) + "px";
  } else {
    activeToolbar.value.style.display = 'none';
  }
}

//endregion


//region 组件克隆操作

//拖拽结束的操作

function onEnd(obj) {
  if (obj.from !== obj.to) {
    const {parent, list, index} = findItemIndexInDrawItemList(tempActiveData);
    //判断是否可以添加
    if (allowToAdd(parent, tempActiveData)) {
      if (obj.to.className !== 'slot-container') {
        activeDrawItem(tempActiveData)
      }
    } else {//不能添加就删除
      list.splice(index, 1);
    }
    if (parent && parent.__id__ === 'button-group' && tempActiveData.__id__ === 'button') {
      delete tempActiveData.__props__.size;
    }
  }
}

function addDrawItem(item) {
  const clone = cloneDrawItem(item);
  if (activeData.value && activeData.value.__config__ && activeData.value.__config__.layout === 'containerItem') {
    if (allowToAdd(activeData.value, clone)) {
      activeData.value.__slots__.default.push(clone)
    }
  } else {
    if (allowToAdd(undefined, clone)) {
      drawItemList.value.push(clone)
      activeDrawItem(clone)
    }
  }
}


//克隆组件
function cloneDrawItem(origin) {


  const clone = deepClone(origin);
  if (!clone["__config__"]) {
    clone["__config__"] = {}
  }
  if (!clone["__directives__"]) {
    clone["__directives__"] = {}
  }
  delete clone.__link__;
  createIdAndKey(clone);
  if (!clone["__props__"]) {
    clone["__props__"] = {}
  }
  if (!clone["__events__"]) {
    clone["__events__"] = []
  }
  if (!clone["__native__"]) {
    clone["__native__"] = {}
  }
  //__refs__用来放需要通过变量引用的属性值。比如<p-input-text :disabled="disabled/> 中的 const disabled=ref(false)
  if (!clone["__refs__"]) {
    clone["__refs__"] = {}
  }
  const {__props__: props, __config__: config} = clone;

  const id = clone.__id__;


  if (id && primeVueConfigMap[id]) {
    const {attributes, data} = primeVueConfigMap[id];
    for (const key in attributes) {
      const attr = attributes[key];
      if (attr.ref) {
        clone.__refs__[key] = camelCase(config.itemName + "-" + key);
      } else if (attr.propsRef) {
        props[key] = camelCase(config.itemName + '-' + key)
      }
      if (key === 'vModel') {
        continue
      }

      if (attr.hide) {
        continue;
      }
      if (isObject(props[key]) && isObject(attr.default)) {
        props[key] = Object.assign(deepClone(attr.default), props[key])
      } else if (props[key] === undefined && attr.default !== undefined) {
        props[key] = deepClone(attr.default)
      }

      if (attr.remember && designConf.value[key]) {
        props[key] = deepClone(designConf.value[key]);
      }
    }
    if (attributes.placeholder)
      props.placeholder = attributes.placeholder
    //复制像p-dropdown的选项
    if (data) {
      const {name, source, inProps} = data;//props为true，代表是__props__里面的属性
      const static_ = {
        ref: data.static.ref,
        [data.name]: deepClone(data.static.default)
      }
      if (data.static.ref) {
        clone.__refs__[data.name] = camelCase(config.itemName + '-' + data.name)
      }
      let dynamic;
      if (data.dynamic) {
        dynamic = {ref: true}
        Object.assign(dynamic, data.dynamic)
      }
      clone.__data__ = {
        name, source, dynamic, static: static_, inProps
      };

    }

    if (!config.tag) {
      const {name, tag, tagIcon, layouts} = primeVueConfigMap[id];
      config.name = name
      config.tag = tag
      config.tagIcon = tagIcon;
      config.layout = layouts[0]
    }

  }
  //不包裹input-group
  if (config.wrapWithInputGroup && !designConf.value.wrapWithInputGroup) {
    delete config.showLabel;
    delete config.labelWidth;
    delete config.required;
    config.wrapWithInputGroup = false;
  }
  props.placeholder !== undefined && (props.placeholder += config.label);
  if (!props.style) {
    props.style = {}
  }

  if (clone.__slots__) {
    Object.keys(clone.__slots__).forEach(k => {
      if (Array.isArray(clone.__slots__[k])) {
        for (let i = 0; i < clone.__slots__[k].length; i++) {
          if (typeof clone.__slots__[k][i] !== 'string') {
            clone.__slots__[k][i] = cloneDrawItem(clone.__slots__[k][i]);
          }
        }
      }
    })
  }
  tempActiveData = clone
  console.info(tempActiveData)

  return tempActiveData
}


function createIdAndKey(item) {
  const config = item.__config__
  config.drawItemId = ++idGlobal.value;
  if (config.showLabel) {
    config.label = config.name
  }
  item.renderKey = `${config.drawItemId}${Math.floor(Math.random() * 10000)}` // 改变renderKey后可以实现强制更新组件

  const itemId = item.__id__;
  const itemNamePrefix = config.itemName || item.__id__;
  if (itemId && primeVueConfigMap[itemId] && primeVueConfigMap[itemId].attributes.vModel) {
    item.__vModel__ = camelCase(`${itemNamePrefix}${idGlobal.value}`);
  }

  config.itemName = `${itemNamePrefix}${idGlobal.value}`

  if (primeVueConfigMap[item.__id__]) {
    if (!item.__slots__) {
      item.__slots__ = {}
    }
    for (const slot of primeVueConfigMap[item.__id__].slots) {//有一般有default插槽就是containerItem
      if (!item.__slots__[slot.name]) {
        item.__slots__[slot.name] = [];
      }
    }
  }
  return item
}

/**
 * 重新设置组件id，复制组件都会调用
 * @param item
 */
function resetDrawItemId(item) {
  let newId = ++idGlobal.value;
  let config = item.__config__;
  let oldItemName = config.itemName;
  config.itemName = `${item.__id__}${newId}`
  changeDrawItemVariableName(item, config.itemName, oldItemName);
  config.drawItemId = newId;
  item.renderKey = `${config.drawItemId}${Math.floor(Math.random() * 10000)}` // 改变renderKey后可以实现强制更新组件
}


function allowToAdd(parent, clone, noShowMessage) {
  if (!parent || !parent.__id__) {

    const {parentTag} = primeVueConfigMap[clone.__id__];
    if (parentTag) {

      !noShowMessage && toast.add({
        severity: 'error',
        summary: '失败',
        detail: `不能添加${clone.__config__.name}（${clone.__config__.tag}）。`,
        life: 3000
      });
      return false;
    }
    return true;
  }
  const {childTag} = primeVueConfigMap[parent.__id__];
  if (childTag) {
    if (childTag.indexOf(clone.__config__.tag) < 0) {

      !noShowMessage && toast.add({
        severity: 'error',
        summary: '失败',
        detail: ` ${parent.__config__.name}（${parent.__config__.tag}）组件下只能添加${childTag}。`,
        life: 3000
      });
      return false;
    }
  }
  const {parentTag} = primeVueConfigMap[clone.__id__];
  if (parentTag) {
    if (parentTag.indexOf(parent.__config__.tag) < 0) {
      !noShowMessage && toast.add({
        severity: 'error',
        summary: '失败',
        detail: `只能添加到${clone.__config__.name}（${parentTag}）组件下。`,
        life: 3000
      });
      return false;
    }
  }

  //专用，删除button-group下面button的size属性
  if (parent && parent.__id__ === 'button-group' && clone.__id__ === 'button') {
    delete clone.__props__.size;
  }

  return true;
}

//endregion

//region 组件移动操作
//组件变成操作
function itemChange(evt) {
  //todo 可以用来记录操作历史


}

function itemMove(evt) {
  const {draggedContext, relatedContext} = evt;
  const {element} = draggedContext;//拖拽对象
  const {list} = relatedContext;//放到哪个位置

  let parent = findChildrenParentRoot(list);

  return allowToAdd(parent, element, true);


}

function findChildrenParentRoot(children) {
  if (children === drawItemList.value) {//检查数组地址相同
    return undefined;
  } else {
    for (const item of drawItemList.value) {
      return findChildrenParent(item, children);
    }
  }
}

/**
 * 查找children的父节点
 */
function findChildrenParent(parent, children) {

  if (parent.__slots__) {
    for (const slotName in parent.__slots__) {
      if (parent.__slots__[slotName] === children) {
        return parent;
      } else {
        for (const item of parent.__slots__[slotName]) {
          return findChildrenParent(item, children);
        }
      }
    }
  }

}

//endregion


function execPreview() {
  previewSidebarVisible.value = true
}

function execDownload(codeStyle) {
  designConf.value.jsCodeStyle = codeStyle;
  const codeStr = generateCode()
  const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
  saveAs(blob, `${+new Date()}.vue`)
}

function execCopy(codeStyle) {
  designConf.value.jsCodeStyle = codeStyle;
  document.getElementById('copyNode').click()
}

function emptyDrawItemList() {
  confirm.require({
    message: '确定要清空所有组件吗？',
    header: '提示',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      drawItemList.value = []
      activeData.value = {}
      idGlobal.value = 100;
    },
    reject: () => {
    }
  });
}


function generateCode() {
  let cloneJsonList = simplifyJson();
  return renderSfc(cloneJsonList, designConf.value.jsCodeStyle, beautifier)
}

//region json显示操作
function simplifyJson(all) {
  const cloneDrawItemList = deepClone(drawItemList.value)
  recursiveProcessDrawItemList(cloneDrawItemList, (item) => {
    const {__id__: id} = item;
    if (!primeVueConfigMap[id]) {
      return
    }
    const {attributes} = primeVueConfigMap[id];
    const {__props__: props, __slots__, __refs__} = item;
    for (const attr in props) {
      const val = props[attr];
      if (val === '' || val === undefined) {
        delete props[attr];
        continue;
      }
      const default_ = attributes[attr] && attributes[attr].default;
      if (val === default_) {
        delete props[attr];
      } else if (typeof val === 'object') {
        if (Array.isArray(val)) {
          if (isArrayEqual(val, default_)) {
            delete props[attr];
          }
          if (val.length === 0) {
            delete props[attr];
          }
        } else {
          if (default_) {
            for (const key in val) {
              if (val[key] === default_[key]) {
                delete val[key];
              }
            }
          }
          if (JSON.stringify(val) === '{}') {
            delete props[attr];
          }
        }
      }
    }


    if (id === 'container') {//direction 子元素中有 p-header 或 p-footer 时为 vertical，否则为 horizontal"
      let hasHeaderOrFooter = false;
      for (const aItem of item.__slots__.default) {
        if (aItem.__id__ === 'header' || aItem.__id__ === 'footer') {
          hasHeaderOrFooter = true;
          break;
        }
      }
      if (hasHeaderOrFooter && item.__props__.direction === 'vertical' || !hasHeaderOrFooter && item.__props__.direction === 'horizontal') {
        delete item.__props__.direction;
      }
    }
    if (all) {
      deleteObjectProps(__slots__);
      deleteObjectProps(__refs__);
      deleteObjectProps(item);
      delete item["renderKey"];
      //  delete item.__id__;
      delete item.__config__["name"];
      delete item.__config__["drawItemId"];
      delete item.__config__["tagIcon"];
      delete item.__config__["itemName"];
    }
  })
  return cloneDrawItemList;
}

const JsonSidebarVisible = ref(false)
const jsonStr = ref("");

function showJson(inner) {
  if (designConf.value.jsonSimplified) {
    jsonStr.value = JSON.stringify(simplifyJson(true), null, 2);
  } else {
    jsonStr.value = JSON.stringify(drawItemList.value, null, 2);
  }

  !inner && (JsonSidebarVisible.value = true)
}

function refreshJson(data) {
  drawItemList.value = deepClone(data)
}

watch(() => designConf.value.jsonSimplified, (val) => {
  showJson(true);
})
//endregion

//region html显示操作
const htmlSidebarVisible = ref(false)
const htmlStr = ref("");

function showHtml(inner) {
  htmlStr.value = generateCode();

  !inner && (htmlSidebarVisible.value = true)
}

watch(() => designConf.value.jsCodeStyle, () => {
  showHtml(true);
})

//endregion

//region 组件树操作
const drawItemTreeVisible = ref(false)
const showTree = ref(true)//为了树能自动刷新
const drawItemTreeData = ref([]);
const drawItemTree = ref()

function openTreeSidebar() {
  drawItemTreeData.value = [];
  buildDrawItemTree(drawItemList.value, drawItemTreeData.value)
  // nextTick(() => {
  //   drawItemTree.value.setCurrentKey(activeData.value.renderKey)
  // })

}

function buildDrawItemTree(list, parent) {
  for (const item of list) {
    if (typeof item === 'string') {
      continue;
    }
    const {renderKey, __id__} = item;
    const {tag, tagIcon, itemName} = item.__config__;
    let treeItem = {__id__, renderKey, __config__: {tag, tagIcon, itemName}};
    treeItem.children = [];
    parent.push(treeItem);

    if (Array.isArray(item.__slots__.default)) {
      buildDrawItemTree(item.__slots__.default, treeItem.children)
    }

    for (const slotName in item.__slots__) {
      if (slotName === 'default') {
        continue;
      }
      if (Array.isArray(item.__slots__[slotName]) && item.__slots__[slotName].length > 0) {
        let c = [];

        buildDrawItemTree(item.__slots__[slotName], c);
        c.length > 0 && treeItem.children.push({
          slotName,
          renderKey,
          children: c
        })
      }
    }
  }

}

function removeItemFromTree(data) {
  deleteDrawItem(undefined, data);
  nextTick(() => {
    drawItemTreeData.value = [];
    buildDrawItemTree(drawItemList.value, drawItemTreeData.value);
  })
}

function activeDrawItemThroughTree(node) {
  const {list, index} = findItemIndexInDrawItemList(node);
  list && activeDrawItem(list[index])
}

//endregion
//region 表单操作
const formModelsAndRules = ref({});

//构建表单model
function buildFormModelsAndRules(list, modal, rules) {
  for (const item of list) {
    if (typeof item === 'string') {
      continue;
    }
    if (item.__id__ === 'form') {
      modal = {};
      rules = {};
      formModelsAndRules.value[item.__props__.model] = modal;
      formModelsAndRules.value[item.__props__.rules] = rules;
    } else {
      if (item.__config__.wrapWithInputGroup && item.__vModel__) {
        const {__config__: config, __props__: props} = item;
        modal && (modal[item.__vModel__] = config.defaultValue);
        if (rules) {
          const r = buildRules(item);
          if (r.length > 0) {
            rules[item.__vModel__] = r;
          }
        }
      }

    }
    if (Array.isArray(item.__slots__.default)) {
      buildFormModelsAndRules(item.__slots__.default, modal, rules)
    }
  }
}

// 构建校验规则
function buildRules(item) {
  const rules = []
  const {__config__: config, __props__: props} = item;
  if (ruleTrigger[config.tag]) {
    if (config.required) {
      const type = Array.isArray(config.defaultValue) ? "array" : config.defaultValueType
      let message = Array.isArray(config.defaultValue)
          ? `请至少选择一个${config.label}`
          : props.placeholder
      if (message === undefined) message = `${config.label}不能为空`
      rules.push(
          {
            required: true, type, message, trigger: ruleTrigger[config.tag]
          }
      )
    }
    if (config.regList && Array.isArray(config.regList)) {
      config.regList.forEach((reg) => {
        if (reg.pattern) {
          rules.push({
                pattern: new RegExp(reg.pattern),
                message: reg.message,
                trigger: ruleTrigger[config.tag]
              }
          )
        }
      })
    }
  }
  return rules;
}

//endregion

//region 动态数据获取
const dynamicData = ref({})

import axios from 'axios'

function buildDynamicData() {
  recursiveProcessDrawItemList(drawItemList.value, (item) => {
    if (item.__data__) {
      const {data} = primeVueConfigMap[item.__id__];
      if (item.__data__.source === 'dynamic' && !dynamicData.value[item.__refs__[data.name]]) {
        const {method, url, dataKey} = item.__data__.dynamic;
        axios({method, url}).then((resp) => {
          item.renderKey = `${item.__config__.drawItemId}${Math.floor(Math.random() * 10000)}`
          dynamicData.value[item.__refs__[data.name]] = resp.data;
        })
        // }

      }
    }
  })


}

// endregion

//region 插槽操作
//添加子项，比如el-steps下加上el-step子项
function addSlotDrawItem({slotName, subtag}) {
  let child = componentMap[subtag]
  if (child) {
    const clone = cloneDrawItem(child);

    activeData.value.__slots__[slotName].push(clone);
    resetDrawItemId(activeData.value);
  } else {
    toast.add({severity: 'info', summary: '失败', detail: `添加${subtag}子组件失败！`, life: 3000});
  }
}

//endregion
//region 配置自动保存
watch(designConf, (val) => {
  saveDesignConf(val)
}, {deep: true})
//endregion

//region 暗黑模式

import ruleTrigger from "@/components/generator/ruleTrigger";
import {
  processADrawItemAndSlots,
  recursiveProcessDrawItemList,
  recursiveFindItemIndexInList,
  changeDrawItemVariableName, findDrawItemByRenderKey
} from "@/views/design/DrawItemProcessor";
import {isArrayEqual} from "@/components/generator/utils";
import {renderSfc} from "@/components/generator";


import ThemeSidebar from "@/views/design/ThemeSidebar.vue";

const themeSidebarVisible = ref(false)


//endregion

//region
const settingOp = ref();
const toolbarItems = ref([
  {
    label: '预览',
    icon: 'pi pi-eye',
    command: () => execPreview()
  },
  {
    label: '查看json',
    icon: 'pi pi-code',
    command: () => showJson(false)
  },
  {
    label: '查看代码',
    icon: 'pi pi-code',
    command: () => showHtml(false)

  },
  {
    label: '复制代码',
    icon: 'pi pi-copy',
    items: jsCodeStyleList.map(cs => {
      return {
        label: cs.text,
        command: () => execCopy(cs.value)
      }
    })
  },
  {
    label: '导出代码',
    icon: 'pi pi-download',
    items: jsCodeStyleList.map(cs => {
      return {
        label: cs.text,
        command: () => execDownload(cs.value)
      }
    })
  },
  {
    label: '组件树',
    icon: 'pi pi-list',
    command: () => drawItemTreeVisible.value = true
  },
  {
    label: '设置',
    icon: 'pi pi-cog',
    command: (event) => {
      settingOp.value.toggle(event.originalEvent);
    }
  },
  {
    label: '主题',
    icon: 'pi pi-palette',
    command: (event) => {
      themeSidebarVisible.value = true;
    }
  },
  {
    label: '清空',
    icon: 'pi pi-trash',
    command: emptyDrawItemList
  },
]);


//endregion

//region 对静态数据和动态数据监听处理
watch(dynamicData.value, () => {
  console.info("dy", dynamicData.value)
})
//end

</script>


<style lang="scss" scoped>
@import '@/styles/designer.scss';




:deep(.p-menubar-root-list) {
  width: 100%;
  justify-content: flex-end !important;

  .p-menuitem-link {
    padding: 5px 10px;
  }
}
</style>
