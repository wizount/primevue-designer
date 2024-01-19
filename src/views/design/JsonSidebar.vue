<template>

  <p-sidebar v-bind="$attrs" style="width:750px" position="right">
    <template #header>
      <div class="w-100 d-flex">
        <div class="flex-grow-1">
          <p-button security="primary" class="pi pi-copy mr-2" @click="triggerCopy" label="复制JSON"/>
          <p-button security="primary" @click="exportJsonFile" class="pi pi-download" label="导出JSON文件"/>
        </div>
        <p-dropdownn v-model="designConf.jsCodeStyle" :options="jsCodeStyleList" option-label="text"
                     option-value="value"/>
      </div>
    </template>
    <div id="jsonCopyNode" class="display:none;"></div>
    <VAceEditor
        v-model:value="aceStr"
        class="json-editor"
        :options="{fontSize:'15px'}"
        lang="json"
        theme="one_dark"/>
  </p-sidebar>

</template>
<script setup>
import {useToast} from 'primevue/usetoast';

const toast = useToast();

import ClipboardJS from 'clipboard'
import {saveAs} from 'file-saver'


import {VAceEditor} from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-one_dark';
import {jsCodeStyleList} from "@/components/config/config";

const props = defineProps({
  jsonStr: {type: String, required: true},
  designConf: {type: Object, required: true}
})

const aceStr = ref(props.jsonStr);

watch(() => props.jsonStr, () => {
  aceStr.value = props.jsonStr
})
import {useConfirm} from "primevue/useconfirm";

const confirm = useConfirm();

function exportJsonFile() {
  confirm.require({
    message: '文件名:',
    header: '导出文件',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      const fileName = `${+new Date()}.json`
      const codeStr = aceStr.value
      const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
      saveAs(blob, fileName)
    },
    reject: () => {
    }
  });
}

function triggerCopy(event) {
  let clipboard = new ClipboardJS('#jsonCopyNode', {
    text: (trigger) => {
      toast.add({severity: 'success', summary: '成功', detail: '代码已复制到剪切板，可粘贴。', life: 3000});
      return aceStr.value
    },

  })
  clipboard.on('error', (e) => {
    toast.add({severity: 'error', summary: '错误', detail: '代码复制失败', life: 3000});
  })
  clipboard.onClick(event)
}
</script>


<style lang="scss" scoped>

.json-editor {
  height: calc(100vh - 110px);
}


</style>
