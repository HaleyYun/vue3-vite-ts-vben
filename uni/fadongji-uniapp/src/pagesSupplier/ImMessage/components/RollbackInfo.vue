<template>
<view class="flex flex-vertical-c flex-justify-c color-block-25 fz-28 m-b-40" >
        <view v-if="info.direction === 'to'">你撤回了一条消息</view>
        <view v-else-if="info.direction === 'from'">对方撤回了一条消息</view>
        <view v-if="info.type=='rollbackText'&&info.direction === 'to'" class="color-0D66FF m-l-14" @click="reEditFn">重新编辑</view>
</view>

</template>
<script>

  export default {
    name: 'RollbackInfo',
    props: {
      /**
       * message 消息内容
       * bubbleType 等于left时是左边气泡样式 等于right时是右边气泡样式
       */
      info: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {}
    },
    methods: {
      reEditFn(){
        this.$emit('reEditFn',{message:this.info.content})
      }
    },
  }
</script>
<style lang="scss" scoped>
.color-0D66FF{
  color: #0D66FF;
}
</style>
