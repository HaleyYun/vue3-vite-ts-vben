<template>
  <view class="wrap">
    <view class="m-t-30 step-wrap">
      <EraScreenTabs
        :list="list1"
        lineWidth="0"
        :activeStyle="{
          color: '#E50012',
          fontWeight: 500,
          background: '$v-error-btn-disabled',
          border: '1px solid $v-error-light-two',
        }"
        :inactiveStyle="{
          color: 'rgba(0, 0, 0, 0.85)',
          background: '#F7F7F8',
        }"
        @click="tabClick"
      />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list1: [
          {
            name: '筛选条件',
          },
          {
            name: '筛选条件',
          },
          {
            name: '筛选',
          },
          {
            name: '筛选',
          },
          {
            name: '筛选',
          },
          {
            name: '筛选',
          },
          {
            name: '筛选',
          },
          {
            name: '筛选',
          },
          {
            name: '筛选',
          },
          {
            name: '筛选',
          },
          {
            name: '筛选',
          },
        ],
      }
    },
  }
</script>

<style scoped>
  .step-wrap {
    background: #fff;
    padding: 5px 0;
    box-sizing: border-box;
  }
</style>
