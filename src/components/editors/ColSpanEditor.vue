<template>
  <div style="display: flex;width: 100%">
    <p-slider style="flex-grow:1" v-bind="$attrs" v-model="value" @input="onInput" :max="24" :min="0"
               @change="$emit('onChange')"></p-slider>
    <p-button icon="CircleClose" circle link @click="setToDefault(defaultValue)" style="margin-left: 10px"></p-button>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue', 'defaultValue'])
const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)
watch(
    () => props.modelValue,
    (v1, v2) => {
      value.value = v1;
    }
);

function setToDefault(val) {
  emit("update:modelValue", val);
}

function onInput(e) {
  emit("update:modelValue", e);
  emit("input", e);
}
</script>

<style scoped>

</style>
