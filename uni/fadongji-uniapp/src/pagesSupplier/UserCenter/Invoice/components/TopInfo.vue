<template>
  <view class="receivableList-top">
    <view class="flex">
      <view class="flex1">
        <view class="receivableList-top__gay fz-28">剩余应收账款</view>
        <view class="receivableList-top__red flex flex-vertical-c fz-24">
          <VoPointPrice :price="info.leftAmount" :leftSize="20" show-unit />
        </view>
      </view>
      <FilterTags
        v-if="showFilter"
        :badge="0"
        :style="{ opacity: 0.65, width: 'initial', display: 'block' }"
        @rightClick="showFilterPop"
        :tag-list="[]"
      />
    </view>
    <view class="flex flex-justify-between flex-vertical-c m-t-16">
      <view class="receivableList-top__gay fz-28">累计应收</view>
      <view class="receivableList-top__gay fz-28">{{ info.totalAmount }}元</view>
    </view>
    <view class="flex flex-justify-between flex-vertical-c m-t-8">
      <view class="receivableList-top__gay fz-28">实际已收</view>
      <view class="receivableList-top__gay fz-28">{{ info.actualAmount }}元</view>
    </view>
    <view class="flex flex-justify-between flex-vertical-c m-t-8">
      <view class="receivableList-top__gay fz-28">剩余未收</view>
      <view class="receivableList-top__gay fz-28">{{ info.leftUnpaid }}元</view>
    </view>
  </view>
</template>
<script>
  import FilterTags from '@/components/VoTabbarCreate/components/FilterTags'
  export default {
    name: 'TopInfo',
    components: {
      FilterTags,
    },
    props: {
      info: {
        type: Object,
        default: () => {},
      },
      showFilter: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // info: '',
      }
    },
    created() {
      // this.getStaic()
    },
    methods: {
      showFilterPop() {
        console.log("zxc");
        this.$emit('show', true)
      },
      //应收账款统计
      // getStaic() {
      //   this.$VoHttp
      //     .apiOrderAccountPeriodReceivableStatistics()
      //     .then((res) => {
      //       console.log(res)
      //       this.info = res.data
      //     })
      //     .catch((e) => {
      //       uni.$u.toast(e.message || '请求失败')
      //     })
      // },
    },
  }
</script>
<style lang="scss" scoped>
  .receivableList {
    &-top {
      background-color: #ffffff;
      padding: 32rpx;
      width: 750rpx;
      box-sizing: border-box;
      &__gay {
        color: $v-c0-65;
      }
      &__gay65 {
        color: $v-c0-65;
      }
      &__red {
        color: $color-primary-red;
      }
      &__gay45 {
        color: $v-c0-45;
      }
    }
  }
  ::v-deep .fliter-tags {
    .tags-right {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
</style>
