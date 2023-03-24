<template>
  <view class="wrap">
    <view>
      <u-list>
        <u-list-item>
          <u-cell :title="indexList[0].title">
            <u-avatar slot="icon" shape="circle" size="35" />
          </u-cell>
        </u-list-item>
        <u-list-item>
          <u-cell :title="indexList[1].title">
            <u-avatar slot="icon" shape="circle" size="35" />
          </u-cell>
        </u-list-item>
        <view>A</view>
      </u-list>
    </view>
    <view>A</view>
    222
  </view>
</template>

<script>
  import { pageMixin } from '@/common/mixins/index.js'
  export default {
    name: 'AddressBook',
    mixins: [pageMixin],
    data() {
      return {
        indexList: [{ title: '111' }, { title: '222' }],
      }
    },
  }
</script>

<style lang="scss" scoped></style>
