<!--用于树型数据-->
<template>
  <div>
    <div>树形编辑器
      <p-button link icon="Setting" @click="showSetting=!showSetting"></p-button>
    </div>
    <div>
      <div v-show="treeProps&&showSetting">
        <p-input-group>
          <p-input-group-addon>label</p-input-group-addon>
          <p-input-text v-model="treeProps.label" placeholder="标签属性"></p-input-text>
        </p-input-group>
        <p-input-group>
          <p-input-group-addon>value</p-input-group-addon>
          <p-input-text v-model="treeProps.value" placeholder="值属性"></p-input-text>
        </p-input-group>

        <p-input-group>
          <p-input-group-addon>children</p-input-group-addon>
          <p-input-text v-model="treeProps.children" placeholder="子选项属性值"></p-input-text>
        </p-input-group>

        <p-input-group>
          <p-input-group-addon>disabled</p-input-group-addon>
          <p-input-text v-model="treeProps.disabled" placeholder="子选项属性值"></p-input-text>
        </p-input-group>
      </div>
    </div>
    <p-button class="tinyBtn" icon="pi pi-plus" title="添加选项" v-if="treeData.length===0"
              severity="primary" @click="addItem($event,null)"/>
    <p-scroll-panel style="min-height:100px" class="w-100 m-1">
      <p-tree :value="treeData" node-key="value" :props="treeProps"
              @nodeDragEnd="dropEnd"
      >
        <template #default="{ node }">
          <span>
           <i>{{ node[treeProps.label || "label"] }}</i>
          <span>
                 <p-button class="tinyBtn" icon="pi pi-pencil" severity="primary" title="编辑"
                           @click="popupEdit($event,node)"/>
            <p-split-button icon="pi pi-angle-double-up" severity="info" title="上移一级"
                            @click="moveToParent(node)" :model="buildMoveModels(node)"/>
              <p-split-button icon="pi pi-plus" title="添加子选项"
                              severity="primary" @click="addItem($event,node,0)" :model="buildAddModels(node)"/>

          </span>
        </span>
        </template>

      </p-tree>
      <popup-input ref="popupRef">
        <p-input-group>
          <p-input-group-addon>标签</p-input-group-addon>
          <p-input-text v-model="tempItem[treeProps.label||'label']"/>
        </p-input-group>

        <p-input-group>
          <p-input-group-addon>值</p-input-group-addon>
          <p-input-text v-model="tempItem[treeProps.value||'value']"/>
        </p-input-group>

        <p-input-group v-if="treeProps.disabled!==undefined">
          <p-input-group-addon>禁用</p-input-group-addon>
          <p-input-switch v-model="tempItem[treeProps.disabled||'disabled']" active-value="disabled"/>
        </p-input-group>
      </popup-input>
    </p-scroll-panel>
  </div>
</template>

<script setup>
import PopupInput from "@/components/PopupInput"
import {ref, watchEffect} from "vue";
import {deepClone} from "@/utils";
import {useToast} from 'primevue/usetoast';

const toast = useToast();


const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  treeProps: {
    type: Object,
    required: true,
    default: () => {
      return {}
    }
  }
});
const emits = defineEmits(["update:modelValue"])
const popupRef = ref("")
const tempItem = ref({})

const treeData = ref([]);
watchEffect(() => {
  if (Array.isArray(props.modelValue)) {
    treeData.value = deepClone(props.modelValue)
  } else {
    treeData.value = [];
  }
})

function popupEdit(event, node) {
  tempItem.value = deepClone(node)
  popupRef.value.popup({x: event.clientX, y: event.clientY}, tempItem.value).then((d => {
    Object.assign(node, d);
    emits("update:modelValue", treeData.value)
  }));
}

function recursiveFindParentAndIndex(parent, list, item, childrenKey) {
  if (!Array.isArray(list)) {
    return;
  }
  let index = list.indexOf(item);
  if (index >= 0) {
    return {parent, index}
  } else {
    for (const i of list) {
      const res = recursiveFindParentAndIndex(i, i[childrenKey], item, childrenKey);
      if (res) {
        return res;
      }
    }
  }
}

function buildMoveModels(node) {
  return [
    {
      label: '变成下一项的子项',
      icon: 'pi pi-angle-double-down',
      command: (event) => {
        // addItem(event.originalEvent, node, -1);
      }
    },
    {
      label: '上移',
      icon: 'pi pi-angle-up',
      command: () => {
        moveToPrev(node)
      }
    },
    {
      label: '下移',
      icon: 'pi pi-angle-down',
      command: (event) => {
        moveToNext(node)
      }
    }
  ];
}

function buildAddModels(node) {
  return [
    {
      label: '添加到选项前',
      icon: 'pi pi-arrow-up',
      command: (event) => {
        addItem(event.originalEvent, node, -1);
      }
    },
    {
      label: '添加到选项后',
      icon: 'pi pi-arrow-down',
      command: (event) => {
        addItem(event.originalEvent, node, 1);
      }
    },
    {
      label: '删除此选项',
      icon: 'pi pi-trash',
      command: () => {
        deleteItem(node);
      }
    },
  ];
}


const save = () => {
  toast.add({severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000});
};

function addItem(event, node, pos) {
  const childrenKey = props.treeProps.children || 'children'
  tempItem.value = {}
  popupRef.value.popup({x: event.clientX, y: event.clientY}, tempItem.value).then((item => {
    item[childrenKey] = []
    if (node === null) {
      treeData.value.push(item);
      return
    }
    if (pos === 0) {
      if (!node[childrenKey]) {
        node[childrenKey] = []
      }
      node[childrenKey].push(item)
    } else {
      let {parent, index} = recursiveFindParentAndIndex(null, treeData.value, node, childrenKey);

      if (pos === 1) {
        index++;
      }
      const list = parent && parent[childrenKey] || treeData.value;
      list.splice(index, 0, item)
    }
    emits("update:modelValue", treeData.value)
  }));

}

const deleteItem = (node) => {
  const childrenKey = props.treeProps.children || 'children';
  let {parent, index} = recursiveFindParentAndIndex(null, treeData.value, node, childrenKey);
  const list = parent && parent[childrenKey] || treeData.value;
  list.splice(index, 1);
  emits("update:modelValue", treeData.value)
}

function moveToParent(node) {
  const childrenKey = props.treeProps.children || 'children';
  let {parent, index} = recursiveFindParentAndIndex(null, treeData.value, node, childrenKey);
  if (parent) {
    let list = parent[childrenKey];
    list.splice(index, 1);
    let res = recursiveFindParentAndIndex(null, treeData.value, parent, childrenKey);
    list = res && res.parent && res.parent[childrenKey] || treeData.value;
    list.splice(index, 0, node);
    emits("update:modelValue", treeData.value)
  }
}

function moveToNext(node) {
  const childrenKey = props.treeProps.children || 'children';
  let {parent, index} = recursiveFindParentAndIndex(null, treeData.value, node, childrenKey);

  let list = parent && parent[childrenKey] || treeData.value;
  list.splice(index, 1);
  list.splice(index+1, 0, node);
  emits("update:modelValue", treeData.value)

}
function moveToPrev(node) {
  const childrenKey = props.treeProps.children || 'children';
  let {parent, index} = recursiveFindParentAndIndex(null, treeData.value, node, childrenKey);

  let list = parent && parent[childrenKey] || treeData.value;
  list.splice(index, 1);
  list.splice(index-1, 0, node);
  emits("update:modelValue", treeData.value)

}

const defaultKeys = ["label", "value", "disabled", "children"]
watch(() => [props.treeProps.label, props.treeProps.value, props.treeProps.disabled, props.treeProps.children], (newVal, oldVal) => {
  defaultKeys.map((key, idx) => {
    changeKeys(treeData.value, oldVal[idx] || key, newVal[idx] || key, oldVal[3])
  })
  emits("update:modelValue", treeData.value)
});


function changeKeys(list, oldKey, newKey, children) {
  if (oldKey === newKey) {
    return;
  }
  for (const l of list) {
    l[newKey] = l[oldKey];
    if (l[children]) {
      changeKeys(l[children], oldKey, newKey, children)
    }
    delete l[oldKey]

  }
}

function dropEnd() {
  emits("update:modelValue", treeData.value)
}

const showSetting = ref(false)
</script>

<style scoped lang="scss">
.p-tree {
  padding: 5px;

  :deep(.p-treenode-content) {
    padding: 0;

    .p-tree-toggler {
      margin-right: 0
    }
  }
}

.p-splitbutton {
  :deep(button) {
    width: 20px;
    height: 20px;
    padding: 0
  }
}
</style>
