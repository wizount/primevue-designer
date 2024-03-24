const r=o=>{const e=[];o.__data__;const t=o.__config__,n=t.optionType==="button"?"p-checkbox-button":"p-checkbox",i=t.border?"border":"";return e.push(`<${n} v-for="(item, index) in ${o.__refs__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${i}>{{item.label}}</${n}>`),e.join(`
`)};export{r as default};
