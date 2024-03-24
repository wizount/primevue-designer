const d=o=>{const t=[];o.__data__;const e=o.__config__,i=e.optionType==="button"?"p-radio-button":"p-radio",n=e.border?"border":"";return t.push(`<${i} v-for="(item, index) in ${o.__refs__.options}" :key="index" :label="item.value" :disabled="item.disabled" ${n}>{{item.label}}</${i}>`),t.join(`
`)};export{d as default};
