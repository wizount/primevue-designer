<template>
  <div class="right-board">
    <p-tab-view>
      <p-tab-panel header="组件属性" key="field">
        <p-scroll-panel class="right-scrollbar">
          <div v-show="showField">
            <p-input-group>
              <p-input-group-addon>组件类型</p-input-group-addon>

              <a target="_blank" :href="curDocLink"
                 title="查看组件文档" rel="noopener noreferrer" class="p-button p-button-link pi pi-link"></a>
              <p-button link class="document-link" title="切换到父组件"
                        @click="activeParentDrawItem">
                <i class="pi pi-download" style="transform:rotate(180deg);">
                </i>
              </p-button>

              <div v-for="slot in curComSlots" v-if="showSlots">
                <template v-if="slot.subtags&&slot.subtags.length>0">
                  <div v-if="slot.subtags.length===1">
                    <p-button link severity="primary" icon="Plus" v-p-tooltip.top="`添加${slot.subtags[0]}组件`"
                              @click="addSlotDrawItem({slotName:slot.name,subtag:slot.subtags[0]})"/>
                  </div>
                  <div v-else>
                    <p-split-button severity="primary" label="添加组件"
                                    :model="slot.subtags.map(subtag=>{return {label:`添加${{subtag}}组件`,command:()=>addSlotDrawItem({slotName:slot.name,subtag})}})">
                    </p-split-button>
                  </div>

                </template>

              </div>
            </p-input-group>


            <attributes-render :attribute-config="curComAttrs"
                               :active-data="activeData"></attributes-render>

          </div>


        </p-scroll-panel>
      </p-tab-panel>
      <p-tab-panel header="插槽" v-if="showSlots" key="slots">
        <p-scroll-panel class="right-scrollbar">
          <div v-if="showSlots" class="slot-tab-pane">
            <div v-for="slot in curComSlots">
              <p-card>
                <template #title>
                  <div class="d-flex">
                    <div class="flex-grow-1"><span>{{ slot.name }}</span>
                      <p-tag icon="pi pi-info-circle" rounded severity="info" v-p-tooltip.top="slot.title"/>
                    </div>
                    <template v-if="slot.subtags&&slot.subtags.length>0">
                      <div v-if="slot.subtags.length===1">
                        <p-button link severity="primary" icon="pi pi-plus" size="small" v-p-tooltip.top="`添加${slot.subtags[0]}组件`"
                                  @click="addSlotDrawItem({slotName:slot.name,subtag:slot.subtags[0]})"/>
                      </div>
                      <div v-else>
                        <p-split-button severity="primary" label="添加组件"
                                        :model="slot.subtags.map(subtag=>{return {label:`添加${{subtag}}组件`,command:()=>addSlotDrawItem({slotName:slot.name,subtag})}})">
                        </p-split-button>
                      </div>

                    </template>
                  </div>
                </template>
                <template #content>
                  <template v-if="Array.isArray(curItemSlots[slot.name])">
                    <draggable :list="curItemSlots[slot.name]" :animation="340" group="componentsGroup"
                               itemKey="renderKey"
                               handle=".drag-icon" style="min-height: 30px" class="slot-container">
                      <template #item="{element,index}">
                        <div class="draggable-item" :class="{chosen:chosenSlotIndex===(slot.name+index)}">
                          <div class="flex-grow-1 d-flex" @click="chooseSlotDrawItem(element,slot.name,index)">
                            <div class="drag-icon pi pi-bars">
                            </div>
                            <div v-if="typeof element==='string'">
                              <p-input-text v-model="curItemSlots[slot.name][index]"></p-input-text>
                            </div>
                            <div v-else-if="element.__id__==='plainText'">
                              <p-input-text v-model="element.__slots__.default"></p-input-text>
                            </div>
                            <div class="text-item" v-else>
                              {{ element.__config__.tag + "-" + element.__config__.drawItemId }}
                            </div>
                          </div>
                          <div @click="deleteSlotDrawItem(slot.name,index)" class="remove-btn pi pi-trash">
                          </div>
                        </div>
                      </template>
                    </draggable>
                  </template>
                  <template v-else>
                    <div v-if="typeof curItemSlots[slot.name]==='string'">
                      <p-input-text v-model="curItemSlots[slot.name]"></p-input-text>
                    </div>
                  </template>
                </template>


              </p-card>
              <div v-if="chosenSlotDrawItem&&chosenSlotIndex.indexOf(slot.name)===0">
                <attributes-render
                    :active-data="chosenSlotDrawItem"
                    :attribute-config="chosenSlotDrawItemAttributes"></attributes-render>
              </div>
            </div>
          </div>
        </p-scroll-panel>
      </p-tab-panel>
<!--      <p-tab-panel header="事件" key="events">-->
<!--        <p-scroll-panel class="right-scrollbar">-->
<!--          <div>-->
<!--            <p-dropdown @command="addEvent">-->
<!--              <p-button link severity="primary" :content="`添加事件`" icon="Plus">添加事件</p-button>-->
<!--              <template #dropdown>-->
<!--                <p-dropdown-menu>-->
<!--                  <p-dropdown-item v-for="e in curComConfig.events" :command="e">-->
<!--                    添加{{ e.name }}事件-->
<!--                  </p-dropdown-item>-->
<!--                </p-dropdown-menu>-->
<!--              </template>-->
<!--            </p-dropdown>-->
<!--            <div v-for="e in activeData.__events__">-->
<!--              <p-input-group label="事件名">-->
<!--                <p-tag>{{ e.name }}</p-tag>-->
<!--              </p-input-group>-->
<!--              <p-input-group label="函数">-->
<!--                <p-input-text v-model="e.fnName"></p-input-text>-->
<!--              </p-input-group>-->
<!--              <p-input-group label="参数">-->
<!--                <p-input-text v-model="e.params"></p-input-text>-->
<!--              </p-input-group>-->
<!--              <p-input-group label="函数体">-->
<!--                <p-input-text type="textarea" v-model="e.fnBody"></p-input-text>-->
<!--              </p-input-group>-->
<!--            </div>-->
<!--          </div>-->
<!--        </p-scroll-panel>-->
<!--      </p-tab-panel>-->
      <p-tab-panel header="样式" key="style">
        <p-scroll-panel class="right-scrollbar">
            <style-editor v-model="curItemProps.style"></style-editor>
        </p-scroll-panel>
      </p-tab-panel>
      <p-tab-panel header="正则表达式" v-if="Array.isArray(curItemConfig.regList)" key="reg">
        <p-scroll-panel class="right-scrollbar">
          <div v-if="Array.isArray(curItemConfig.regList)">
            <p-divider>正则校验</p-divider>
            <div class="draggable-item" v-for="(item, index) in curItemConfig.regList" :key="index">
              <div class="flex-grow-1 d-flex">
                <div>
                  <p-input-group>
                    <p-input-group-addon>表达式</p-input-group-addon>
                    <p-auto-complete v-model="item.pattern" placeholder="请输入正则表达式"
                                     :fetch-suggestions="ac.querySearch"
                                     clearable @select="regChange(item)">
                      <template #default="{ item }">
                        <span>{{ item.text }}</span>
                        <div>{{ item.value }}</div>
                      </template>
                    </p-auto-complete>
                  </p-input-group>
                  <p-input-group>
                    <p-input-group-addon>错误提示</p-input-group-addon>
                    <p-input-text v-model="item.message" placeholder="请输入错误提示" clearable/>
                  </p-input-group>

                </div>
              </div>
              <div class="remove-btn" @click="curItemConfig.regList.splice(index, 1)">
                <i class="pi pi-trash"></i>
              </div>
            </div>


            <div style="margin-left: 20px">
              <p-button @click="addReg" size="small">添加规则</p-button>
            </div>
          </div>
        </p-scroll-panel>
      </p-tab-panel>
    </p-tab-view>
    <div style="position: absolute; bottom: 2px;right: 10px;color: grey">PrimeVue version {{ version }}</div>
  </div>
</template>

<script setup lang="jsx">
const version = "3.45.0";
import Draggable from '@/vuedraggable/vuedraggable';
import {saveDesignConf} from '@/utils/db'
import AttributesRender from "@/views/design/AttributesRender.vue";
import primeVueConfigMap from "@/primevue-config";
import StyleEditor from "@/components/editors/StyleEditor.vue";


const props = defineProps({
      showField: Boolean,
      activeData: {
        type: Object,
        required: true
      },
      designConf: {
        type: Object,
        required: true
      }
    }
)

const emits = defineEmits(['addSlotDrawItem', "activeParentDrawItem"])

const curItemConfig = computed(() => {
  return props.activeData.__config__ || {}
})
//当前组件的属性值
const curItemProps = computed(() => {
  return props.activeData.__props__ || {}
})

//当前组件信息
const curComConfig = computed(() => {
  return primeVueConfigMap[props.activeData.__id__] || {}
})
//当前组件的属性配置
const curComAttrs = computed(() => {
  return curComConfig.value.attributes
})

const curComSlots = computed(() => {
  return curComConfig.value.slots;
})


const curDocLink = computed(() => {
  return curComConfig.value.document ||
      'https://primevue.org/introduction/'
})
const curItemSlots = computed(() => {
  return props.activeData.__slots__ || {}
})

const showSlots = computed(() => {
  return curItemConfig.value.layout !== 'fixedItem' && curComConfig.value.slots && curComConfig.value.slots.length > 0
})
//当选中组件变化，也就是renderKey变化，重新选中的插槽数据
watch(() => props.activeData.renderKey, (val) => {
  chosenSlotDrawItem.value = undefined;
  chosenSlotIndex.value = ""
})
//监听，并随时保存
watch(curItemProps, (newVal) => {
  curComAttrs.value && Object.keys(curComAttrs.value).forEach((k) => {
    if (curComAttrs.value[k].remember) {
      props.designConf[k] = curItemProps.value[k];
    }
  })
  saveDesignConf(props.designConf)
}, {deep: true})

//region 对部分的tag进行修改
watch(() => curItemProps.value.multiple, (val) => {
  if (['p-listbox'].indexOf(curItemConfig.value.tag) >= 0) {
    if (val) {
      if (!Array.isArray(curItemConfig.value.defaultValue)) {
        curItemConfig.value.defaultValue = []
      }
    } else {
      if (typeof curItemConfig.value.defaultValue !== 'string') {
        curItemConfig.value.defaultValue = ''
      }
    }

  }
})
watch(() => curItemProps.value['is-range'], (val) => {
  changeRenderKey();
  if (curItemConfig.value.tag === 'p-time-picker') {
    curItemConfig.value.defaultValue = []
  }
})
watch(() => curItemProps.value.range, (val) => {
  if (curItemConfig.value.tag === 'p-slider') {
    if (val) {
      if (!Array.isArray(curItemConfig.value.defaultValue)) {
        curItemConfig.value.defaultValue = [25, 50]
      }
    } else {
      if (typeof curItemConfig.value.defaultValue !== 'number') {
        curItemConfig.value.defaultValue = 50
      }
    }
  }
})
//endregion
watch(() => curItemConfig.value.label, (newVal, oldVal) => {
  if (curItemProps.value && curComAttrs.value && curItemProps.value.placeholder === (curComAttrs.value.placeholder + oldVal)) {
    curItemProps.value.placeholder = curComAttrs.value.placeholder + newVal
  }
})


watch(() => curItemConfig.value.itemName, (newVal, oldVal) => {
  props.activeData.renderKey && changeDrawItemVariableName(props.activeData, newVal, oldVal);
})

watch(() => props.activeData.__data__ && props.activeData.__data__.source, (val) => {
  if (val) changeRenderKey();
})


function changeRenderKey() {
  props.activeData.renderKey = `${curItemConfig.value.drawItemId}${Math.floor(Math.random() * 10000)}`
}

//region 对时间和日期组件进行格式操作
//监听date-picker-type格式

const dateTimeFormatList = {
  date: 'YYYY-MM-DD',
  dates: 'YYYY-MM-DD',
  week: 'YYYY 第w周',
  month: 'YYYY-MM',
  year: 'YYYY',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  daterange: 'YYYY-MM-DD',
  monthrange: 'YYYY-MM',
  datetimerange: 'YYYY-MM-DD HH:mm:ss',
}
watch(() => curItemProps.value.type, (newVal) => {
  if (newVal && curItemConfig.value.tag === 'p-date-picker') {
    if (newVal === 'dates' || newVal.indexOf('range') > 0) {
      curItemConfig.value.defaultValue = []
    } else {
      curItemConfig.value.defaultValue = null
    }
    curItemProps.value['value-format'] = dateTimeFormatList[newVal]
    curItemProps.value['format'] = dateTimeFormatList[newVal]
  }

})
//endregion

//region 正则表达式
//AutoComplete 回调
import {AutoCompleteCallback} from "@/utils/primevue-utils";
import regList from '@/utils/regList.json'
import {changeDrawItemVariableName} from "@/views/design/DrawItemProcessor";
import {deepClone, titleCase} from "@/utils";

const ac = new AutoCompleteCallback(regList)

function addReg() {
  curItemConfig.value.regList.push({
    pattern: '',
    message: '',
  })
}

//fixme 当更新时，要填入正则表达式的message
function regChange(item) {
  for (const reg of regList) {
    console.info(reg.value)
    if (reg.value === item.pattern) {
      item.message = reg.text;
      console.info(item)
      break;
    }
  }
}

//endregion


//region 插槽操作

const chosenSlotDrawItem = ref(undefined)
const chosenSlotDrawItemAttributes = computed(() => {
  return chosenSlotDrawItem.value && primeVueConfigMap[chosenSlotDrawItem.value.__id__] && primeVueConfigMap[chosenSlotDrawItem.value.__id__].attributes || {}
})

function addSlotDrawItem(slotNameAndSubtag) {
  emits('addSlotDrawItem', slotNameAndSubtag)
}

const chosenSlotIndex = ref("")

function chooseSlotDrawItem(element, slotName, index) {
  chosenSlotDrawItem.value = element;
  chosenSlotIndex.value = slotName + index;
}

function deleteSlotDrawItem(slotName, index) {
  curItemSlots.value[slotName].splice(index, 1);
  nextTick(() => {
    chosenSlotDrawItem.value = undefined
    chosenSlotIndex.value = "";
  })
}

//根据当前选中的组件，选中他的父组件
function activeParentDrawItem() {
  emits('activeParentDrawItem')
}


//endregion


//region
function addEvent(event) {

  props.activeData.__events__.push({
    name: event.name, fnName: curItemConfig.value.itemName + titleCase(event.name),
    params: (event.params || []).join(",")
  })
}

//endregion
</script>

<style lang="scss" scoped>
.right-board {
  width: 350px;

  .right-scrollbar {
    position: relative;
    padding-right: 20px;
    height: calc(100vh - 100px);
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }

}

//
//.time-range {
//  .p-date-editor {
//    width: 227px;
//  }
//
//  :deep(.p-icon-time) {
//    display: none;
//  }
//}

.document-link {
  padding-left: 10px;
  padding-right: 10px
}

.node-label {
  font-size: 14px;
}

//.node-icon {
//  color: #bebfc3;
//}

@import '@/components/editors/editor.scss';


:deep(.p-tabview-panels) {
  padding-right: 0px
}
</style>
