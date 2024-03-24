const t=i=>{const e=[];return e.push(`<p-option v-for="(item, index) in ${i.__refs__.options}" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></p-option>`),e.join(`
`)};export{t as default};
