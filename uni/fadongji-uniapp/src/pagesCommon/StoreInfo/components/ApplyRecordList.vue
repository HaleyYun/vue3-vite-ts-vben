<template>
  <view class="record" @click="goAuditResult">
    <view class="record-public record-line flex flex-justify-between">
      <view class="color-block-65">{{ applyRecord.createTime }}</view>
      <view
        :class="{
          yellow: applyRecord.status === 1,
          green: applyRecord.status === 2,
          red: applyRecord.status === 3,
        }"
      >
        {{ applyRecord.statusText }}
      </view>
    </view>
    <view class="record-public">
      <view class="record-content" v-for="(item, index) in applyRecord.list" :key="index">
        {{ item.name }}: {{ item.value }}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ApplyRecordList',
    props: {
      /**
       * time 时间
       * status 审核状态：审核中、审核通过、审核不通过
       * series 发动机系列(经营品类)/品牌名称(经营品牌)
       */
      applyRecord: {
        type: Object,
        default: {},
      },
    },
    methods: {
      goAuditResult() {
        this.$emit('goAuditResult')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .record {
    width: 750rpx;
    background: #fff;
    padding: 0 32rpx;
    overflow: hidden;
    box-sizing: border-box;

    &-public {
      line-height: 42rpx;
      font-size: 28rpx;
      padding: 32rpx 0;
      box-sizing: border-box;
    }

    &-line {
      border-bottom: 2rpx solid $v-bg-light;
    }

    &-content {
      color: $v-c0-85;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .yellow {
    color: #fda202;
  }

  .green {
    color: #07c160;
  }

  .red {
    color: #e50012;
  }
</style>
