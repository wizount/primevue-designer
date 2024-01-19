<template>
  <div class="p-form-item">
    <label class="p-form-item__label">
      <div>
        <slot name="label">{{label}}</slot>
      </div>
    </label>
    <div class="p-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup name="FormItem">
const props = defineProps(["label"])
</script>


<style scoped lang="scss">


.p-form-item {
  display: flex;
  margin-bottom: 8px !important;

  .el-form-item__label {
    display: inline-flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 0 0 auto;
    height: 32px;
    line-height: 32px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }

  .p-form-item__content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
    line-height: 32px;
    position: relative;
    min-width: 0;
  }
}
</style>