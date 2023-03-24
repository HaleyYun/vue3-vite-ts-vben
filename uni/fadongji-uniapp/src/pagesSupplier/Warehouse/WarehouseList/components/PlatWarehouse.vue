<template>
  <scroll-view
    class="plat"
    :scroll-y='true'
    @scrolltolower='reachBottom'
  >
    <WarehouseItem :is-plat="true" :item="item" v-for='(item,index) of platList' :key="index"></WarehouseItem>

  </scroll-view>
</template>

<script>

import WarehouseItem from "@/pagesSupplier/Warehouse/WarehouseList/components/WarehouseItem";

export default {
    name: 'PlatWarehouse',
    components: { WarehouseItem },
    props:{
      platList:{
        type:Array,
        default:()=>[]
      }
    },
    data() {
      return {
      }
    },
    methods:{
      reachBottom(){
        this.$emit('reachBottom')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .plat{
    height: 100%;
    overflow-y: scroll;
    width: 750rpx;
    background-color: #f6f7f8;
  }


</style>
