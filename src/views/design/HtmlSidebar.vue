<template>

  <p-sidebar v-bind="$attrs" style="width:750px" position="right">
    <template #header>
      <div class="w-100 d-flex">
        <div class="flex-grow-1">
          <p-button security="primary" class="pi pi-copy mr-2" @click="triggerCopy" label="复制HTML"/>
          <p-button security="primary" @click="exportHtmlFile" class="pi pi-download" label="导出HTML文件"/>
        </div>
        <p-dropdown v-model="designConf.jsCodeStyle" :options="jsCodeStyleList" option-label="text"
                     option-value="value"/>
      </div>
    </template>
    <div id="htmlCopyNode" class="display:none;"></div>
    <VAceEditor
        v-model:value="aceStr"
        class="html-editor"
        :options="{fontSize:'15px'}"
        lang="html"
        theme="one_dark"/>
  </p-sidebar>

</template>
<script setup>
import {useToast} from 'primevue/usetoast';

const toast = useToast();

import ClipboardJS from 'clipboard'
import {saveAs} from 'file-saver'


import {VAceEditor} from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-one_dark';
import {jsCodeStyleList} from "@/config/config";

const props = defineProps({
  htmlStr: {type: String, required: true},
  designConf: {type: Object, required: true}
})

const aceStr = ref(props.htmlStr);

watch(() => props.htmlStr, () => {
  aceStr.value = props.htmlStr
})
import {useConfirm} from "primevue/useconfirm";

const confirm = useConfirm();

function exportHtmlFile() {
  confirm.require({
    message: '文件名:',
    header: '导出文件',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      const fileName = `${+new Date()}.vue`
      const codeStr = aceStr.value
      const blob = new Blob([codeStr], {type: 'text/plain;charset=utf-8'})
      saveAs(blob, fileName)
    },
    reject: () => {
    }
  });
}

function triggerCopy(event) {
  let clipboard = new ClipboardJS('#htmlCopyNode', {
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

.html-editor {
  height: calc(100vh - 110px);
}


</style>
