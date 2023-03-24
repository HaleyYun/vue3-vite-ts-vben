<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="setWeb"
  >
    <VoNav :title="title" is-fixed is-have-more />
    <web-view
      class="setWeb-web p-b-safe-area"
      src="https://m.fdjcyl.com/pages/CommonWeb/PrivacyPolicy"
    />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
      }
    },
    methods: {},
    onLoad(options) {
      this.title = options.title
    },
  }
</script>

<style lang="scss" scoped>
  .setWeb {
    width: 750rpx;
    height: 100vh;
    background-color: #ffffff;
    &-web {
      margin-top: 88rpx;
    }
  }
</style>
