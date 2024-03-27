<!--有固定keys的Object-->
<template>
  <div>
    <p-input-group v-for="k in keys" v-p-tooltip.top="k.title">
      <p-input-group-addon>{{ k.name }}</p-input-group-addon>
      <config-value-input v-model="values[k.name]" :attr-config="k" @change="change"
      ></config-value-input>
    </p-input-group>
  </div>


</template>

<script setup>

import ConfigValueInput from "@/views/design/ConfigValueInput";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  keys: {
    type: Array,
    required: true,
    default: () => {
      return []
    }
  }

});
onMounted(() => {

  setValues();
})

function setValues() {

  if (typeof props.modelValue === 'object' && !Array.isArray(props.modelValue)) {
    values.value = props.modelValue || {}
  } else {
    values.value = props.modelValue
  }
}

const values = ref({});
const emits = defineEmits(['update:modelValue']);
watch(() => props.modelValue, (v) => {
  setValues();
})

function change() {
  console.log(values)
  emits("update:modelValue", values.value);
}

</script>

<style scoped lang="scss">
@import './editor.scss';

</style>
