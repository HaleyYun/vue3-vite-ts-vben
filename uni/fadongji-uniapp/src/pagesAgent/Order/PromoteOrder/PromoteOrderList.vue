<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="order flex flex-column"
  >
    <VoNav isHaveMore title="推广订单" />
    <PromoteOrder v-if="current === 0 && show" class="flex1" :source="source" />
  </view>
</template>

<script>
  import PromoteOrder from '../components/PromoteOrder'

  export default {
    components: {
      PromoteOrder,
    },
    data() {
      return {
        current: 0,
        searchModel: '',
        source: 1,
        // 由于子组件的create会先于父组件调用，导致部分参数无法接收，暂定为父组件加载完后再加载子组件
        show: false,
      }
    },
    onLoad(option) {
      if (option) {
        console.log(option)
        this.searchModel = option.search
        this.orderType = option.type
        this.current = option.type ? 1 : 0
        if (option.source) {
          /**
           * 跳转来源：
           * 1：默认，服务商拓客查看修理厂订单
           * 2：集师傅推广
           */
          this.source = +option.source
        }
      }
    },
    mounted() {
      this.show = true
    },
    methods: {
      back() {
        this.$backFn()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
  }
</style>
