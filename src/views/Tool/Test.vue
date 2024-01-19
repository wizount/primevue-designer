<template>
  <div style="padding: 5px">
    <p-cascade-select option-label="label" option-value="value" option-group-label="label"
                      :option-group-children="['children']" placeholder="Please enter CascadeSelect"
                      v-model="cascadeSelect101"></p-cascade-select>
  </div>
</template>

<script setup>
import {
  ref
}
  from "vue";
const cascadeSelect101 = ref(undefined);
const cascadeSelect101Value = ref([{
  value: "1",
  label: "选项1",
  children: [{
    value: "2",
    label: "选项1-1"
  }]
}]);

</script>