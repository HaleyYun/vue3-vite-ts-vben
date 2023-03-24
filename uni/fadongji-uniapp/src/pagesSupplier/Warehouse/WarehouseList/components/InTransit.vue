<template>
  <scroll-view class="stock" :scroll-y="true" @scrolltolower="reachBottom">
    <block v-if="list.length === 0">
      <VoNoData
        no-data-tips="暂无仓库"
      />
    </block>
    <block v-else>
      <InItem :is-self="isSelf" :item="item" :type="2" v-for="(item, index) of list" :key="index" />
    </block>
  </scroll-view>
</template>

<script>
  import InItem from '@/pagesSupplier/Warehouse/WarehouseList/components/InItem'

  export default {
    name: 'InTransit',
    components: { InItem },
    props: {
      isSelf: {
        type: Number,
        default: 0,
      },
      list: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {}
    },
    methods: {
      reachBottom() {
        this.$emit('reachBottom')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .stock {
    height: 100%;
    overflow-y: scroll;
    width: 750rpx;
    background-color: #f6f7f8;
    padding-top: 24rpx;
    box-sizing: border-box;
  }
</style>
