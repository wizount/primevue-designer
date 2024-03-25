<template>
  <div class="editor">
    <p-button class="click-remove-btn" text v-if="icon"
                :title="`${icon}，点击删除`"
               @click="setIcon('')">

      <i :class="icon"></i>
    </p-button>
    <p-button @click="openIconsDialog" text> 选择...</p-button>
    <icons-dialog v-model:visible="iconsVisible" :chosen="icon"
                  @select="setIcon">
    </icons-dialog>

  </div>
</template>

<script setup>

import IconsDialog from "@/components/IconsDialog.vue";

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String
  }
});
const icon=ref(props.modelValue);
watch(props.modelValue,(val)=>{
  icon.value=val;
})
const iconsVisible = ref(false)

function openIconsDialog() {
  iconsVisible.value = true
}

function setIcon(val) {
  icon.value= val;
  emits("update:modelValue",val);
}

</script>

<style scoped lang="scss">
.click-remove-btn:hover {
  text-decoration: line-through red
}
.p-button{
  padding: 0 6px;
}
.p-button + .p-button {
  margin-left: 2px;
}
</style>
