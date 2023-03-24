<template>
  <view class="account">
    <VoNav :is-fixed="false" is-have-more title="还款订单" />
    <view class="content">
      <u-collapse @change="change" @close="close" @open="open">
        <u-collapse-item title="文档指南" name="Docs guide" />
      </u-collapse>
    </view>
    <view class="bottom" />
  </view>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped></style>
