<template>
  <div style="padding: 5px">
    <p-mega-menu
        :model="[{label:'Home',icon:'pi pi-home'},{label:'Features',icon:'pi pi-star'},{label:'Projects',icon:'pi pi-search',items:[{label:'Templates',icon:'pi pi-palette',items:[{label:'Apollo',icon:'pi pi-palette'}]}]},{label:'Contact',icon:'pi pi-envelope'}]">
    </p-mega-menu>
  </div>
</template>

<script setup>


</script>