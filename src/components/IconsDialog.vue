<template>
  <div class="icon-dialog">
    <p-dialog
        v-bind="$attrs"
        width="980px"
        append-to-body
        @open="onOpen"
    >
      <template #header>
          <p-input-group>
            <p-input-group-addon>选择图标</p-input-group-addon>
            <p-input-text
                v-model="key"
                placeholder="请输入图标名称"
            />

              <p-toggle-button on-label="Spin" off-label="Unspin"
                               v-model="spin"></p-toggle-button>

          </p-input-group>


      </template>
      <p-scroll-panel style="height: calc(50vh)">
        <IconListDiv :iconList="iconList" :chosen="chosen"></IconListDiv>
      </p-scroll-panel>

    </p-dialog>
  </div>
</template>

<script setup lang="jsx">
import {PrimeIcons} from 'primevue/api';

const props = defineProps(['chosen'])
const emits = defineEmits(['select']);
const active = ref(null);
const key = ref("");
const iconList = ref("")
const spin = ref(false);

const originList = [];
Object.keys(PrimeIcons).map((key) => {
  originList.push(PrimeIcons[key])
})
iconList.value = originList;

//函数式组件
const IconListDiv = (props, context) => {
  const AllIconRender = [];
  props.iconList.forEach((key) => {
    const icon = `pi ${key}`+(active.value===key&&spin.value?' pi-spin':'');
    const itemClass=active.value===key?'icon-item chosen':'icon-item';
    AllIconRender.push(<li className={itemClass} onClick={() => onSelect(key)}>
    <span className="demo-svg-icon">
        <i style="font-size: 20px;" className={icon}></i>
        <span className="icon-name">{key}</span>
    </span>
    </li>)

  })
  return <ul className="demo-icon-list">{AllIconRender}</ul>;
};

IconListDiv.props = ['iconList', 'chosen']

watch(key, (val) => {
  if (val) {
    //val = val.toLowerCase()
    iconList.value = originList.filter((name) => name.indexOf(val) > -1)
  } else {
    iconList.value = originList
  }
})


function onOpen() {
  // props.chosen="Aim"
  //iconList = originList
  const ss=(props.chosen||"").split(" ");
  let idx=ss.indexOf("pi-spin");
  if(idx>=0){
    ss.splice(idx,1);
    active.value = ss.join(" ");
    spin.value=true;
  }else{
    active.value = props.chosen;
    spin.value=false;
  }

  console.info(active.value)
  iconList.value.slice(iconList.value.indexOf(props.chosen), 1)
  key.value = ''
  //scrollToActive()
}


function onSelect(icon) {
  active.value = icon
  if(spin.value){
    emits('select', icon+' pi-spin')
  }else{
    emits('select', icon)
  }

  emits('update:visible', false)
}

</script>

<style lang="scss">
.demo-icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border-top: 1px solid var( --gray-300);
  border-left: 1px solid var( --gray-300);
  border-radius: 4px;
  display: grid;
  grid-template-columns:repeat(7, 1fr);

  .icon-item {
    text-align: center;
    color: var(--text-color-regular);
    height: 90px;
    font-size: 13px;
    border-right: 1px solid var( --gray-300);
    border-bottom: 1px solid var( --gray-300);

    &:hover {
      background-color: var( --gray-300-extra-light);
      color: var(--brand-color-light)
    }
    &.chosen{
      background-color: lightblue;
    }
  }
}


.demo-icon-list .icon-item
.demo-icon-list .icon-item:hover .p-icon {
  color: var(--brand-color-light)
}


.demo-icon-list .icon-item .demo-svg-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer
}

.demo-icon-list .icon-item .demo-svg-icon .icon-name {
  margin-top: 8px
}
</style>
