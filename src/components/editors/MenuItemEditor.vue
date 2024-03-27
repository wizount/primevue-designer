<template>

  <fixed-keys-object-editor :keys='[
                {
                  "name": "label",
                  "tag": "p-input-text"
                },
                {
                  "name": "icon",
                  "tag": "icon-chooser"
                }
              ]' v-bind="$attrs"/>
</template>

<script setup>

import FixedKeysObjectEditor from "@/components/editors/FixedKeysObjectEditor.vue";
</script>


