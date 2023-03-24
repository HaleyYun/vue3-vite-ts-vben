<template>
  <a-dropdown>
    <span class="ant-dropdown-link ml-10px" @click.prevent>
      <slot name="title"></slot>
      <caret-down-outlined style="color: #8C8C8C"/>
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="(item,index) of menuList" :key="index+'menu'"
                     @click="menuChange(item,index)">
          <a>{{type == 1?item.label:'应用到相同属性'+item.name}}</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

</template>

<script lang="ts" setup>
  import {ref,defineProps,defineEmits} from 'vue';
  import {CaretDownOutlined} from '@ant-design/icons-vue'
  const emits = defineEmits(['change'])
  const props = defineProps({
    menuList:{
      type:Array,
      default:[],
    },
    type:{
      type:Number,
      default: 1,

    }
  })

  const menuChange = (item,index)=>{
     emits('change',{item:item,index:index})
  }



</script>

<style scoped lang="less">

</style>
