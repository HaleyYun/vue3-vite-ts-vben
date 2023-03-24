<template>
  <view class="apply">
    <VoNav is-fixed title="申请上架" is-have-more>

    </VoNav>
    <NoticeBar :text="NoticeBarText" />
    <GoodsInfo />
  </view>
</template>
<script>
  import NoticeBar from './components/NoticeBar.vue'
  import GoodsInfo from './components/GoodsInfo.vue'
  export default {
    name: 'ApplySale',
    components:{NoticeBar, GoodsInfo},
    data() {
      return {
        visible: false,
        NoticeBarText: '投资项目正在审核中，请耐心等待。',
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      confirm() {
        this.visible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .apply {
    min-height: 100vh;
    // background: #fff;
    overflow-x: hidden;
  }
</style>
