<template>
  <div class="draggable-item">
    <i class="drag-icon pi pi-bars">
    </i>
    <slot></slot>
    <div class="remove-btn pi pi-trash" @click="removeFunc">
    </div>
  </div>

</template>

<script setup>
const props = defineProps({
  removeFunc: {
    type: Function,
  },
});

</script>

<style lang="scss" scoped>
.draggable-item {
  display: flex;
  border-bottom: 1px dashed #d5d4d4;
  align-items: center;

  .drag-icon {
    color: #777;
    cursor: move;
    margin:4px;
  }
  .remove-btn {
    cursor: pointer;
    color: #f56c6c;
    margin:4px;
  }



  &.chosen {
    border: 1px dashed #409eff;
  }

}

.draggable-item + .draggable-item {
  margin-top: 4px;
}


</style>
