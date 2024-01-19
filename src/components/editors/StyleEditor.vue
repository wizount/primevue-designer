<template>
    <draggable :list="list" :animation="340" group="style" itemKey="index"
               handle=".drag-icon" @change="change" class="w-100">
      <template #item="{element,index}">
        <draggable-editor :remove-func="()=>{list.splice(index, 1);change()}">
          <p-auto-complete :suggestions="items" v-model="element.key" @complete="search" @change="change"
                           @item-select="change"/>
          <p-input-text v-model="element.value" @change="change"/>
        </draggable-editor>
      </template>
    </draggable>
    <div style="margin-left: 20px">
      <p-button style="padding-bottom: 0" text severity="primary" @click="list.push({key:'',value:''});change()"> 添加
      </p-button>
    </div>

</template>

<script setup>
import styleName from '@/utils/styleName.json'
import Draggable from '@/vuedraggable/vuedraggable';
import {ref, watchEffect} from "vue";
import {AutoCompleteCallback} from "@/utils/primevue-utils";
import DraggableEditor from "@/components/draggableEditor/index.vue";

const items = ref([]);
const search = (event) => {
  items.value = styleName.filter(n => n.indexOf(event.query) >= 0)
}

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
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
  const style = {}
  for (const l of list.value) {
    style[l.key] = l.value;
  }
  emits('update:modelValue', style)
}

const ac = new AutoCompleteCallback(styleName)
</script>

<style scoped lang="scss">
@import './editor.scss';
</style>
<style lang="scss">
.my-input-group-addon {
  .p-autocomplete {
    flex: 1 1 auto;
    width: 1%;

    .p-autocomplete-input {
      width: 100%
    }
  }
  .p-inputtext{
    flex: 1 1 auto;
    width: 1%;
  }
}
</style>
