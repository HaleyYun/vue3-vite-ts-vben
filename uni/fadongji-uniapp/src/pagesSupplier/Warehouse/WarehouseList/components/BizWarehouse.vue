<template>
  <scroll-view
    class="biz"
    :scroll-y='true'
    @scrolltolower='reachBottom'
  >
    <WarehouseItem @initData="initDataFn" :item="item" v-for='(item,index) of bizList' :key="index"></WarehouseItem>

  </scroll-view>
</template>

<script>

import WarehouseItem from "@/pagesSupplier/Warehouse/WarehouseList/components/WarehouseItem";

export default {
    name: 'BizWarehouse',
    components: { WarehouseItem },
    props:{
      bizList:{
        type:Array,
        default:()=>[]
      }
    },
    data() {
      return {
      }
    },
    methods:{
      initDataFn(){
        this.$emit('initData')
      },
      reachBottom(){
        this.$emit('reachBottom')
      }
    }
  }
</script>

<style lang="scss" scoped>
.biz{
  height: 100%;
  overflow-y: scroll;
  width: 750rpx;
  background-color: #f6f7f8;
}


</style>
