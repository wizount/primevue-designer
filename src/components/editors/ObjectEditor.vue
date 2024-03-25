<template>
  <div class="editor">
    <draggable :list="list" :animation="340" group="style" itemKey="index"
               handle=".drag-icon" @change="change">
      <template #item="{element,index}">
        <draggable-editor :remove-func="()=>{list.splice(index, 1);change()}">
          <component :is="keyTag" v-model="element.key" @change="change" placeholder="key"/>
          <component :is="valueTag" v-model="element.value" @change="change" placeholder="value"/>
        </draggable-editor>
      </template>
    </draggable>
    <div>
      <p-button class="add-btn" text severity="primary"
                @click="list.push({key:'',value:''});change()"> 添加
      </p-button>
    </div>
  </div>
</template>

<script setup>
import Draggable from '@/vuedraggable/vuedraggable';
import {ref, watchEffect} from "vue";
import DraggableEditor from "@/components/draggableEditor";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  keyTag: {
    type: String,
    default: 'PInputText'
  },
  valueTag: {
    type: String,
    default: 'PInputText'
  }
});
const emits = defineEmits(['update:modelValue']);

const list = ref([]);

watchEffect(() => {
  list.value = []
  props.modelValue && Object.keys(props.modelValue).forEach((key) => {
    list.value.push({key, value: props.modelValue[key]})
  })
})

function change() {
  const val = {}
  for (const l of list.value) {
    val[l.key] = l.value;
  }
  emits('update:modelValue', val)
}

</script>

<style scoped lang="scss">
@import './editor.scss';

</style>
