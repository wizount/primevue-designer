<template>

  <p-sidebar v-bind="$attrs" style="width:400px" position="left">

    <p-listbox :options="themeList" v-model="theme"></p-listbox>
  </p-sidebar>
  <component is="style">
    :root {
    --border-color: {{ inputGroupAddonBorderColor }};
    }
  </component>
</template>
<script setup>
import themeList from "@/assets/themes";
import {usePrimeVue} from "primevue/config";

const PrimeVue = usePrimeVue();
const theme = ref("lara-light-green");
const inputGroupAddonBorderColor = ref("#d1d5db")//和上个变量theme保持一致
watch(theme, (newVal, oldVal) => {
  PrimeVue.changeTheme(oldVal, newVal, 'theme-link', () => {
  });

  setTimeout(() => {
    const style = getComputedStyle(document.getElementsByClassName("p-inputgroup-addon")[0], null);
    inputGroupAddonBorderColor.value = style.borderLeftColor;
  },200)
})

</script>
<style lang="scss" scoped>


</style>
