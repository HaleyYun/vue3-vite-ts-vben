<template>
  <view v-if="info && info.deliveryType" class="send">
    <view class="serve-title p-b-24 fz-32 fz-b">寄回信息</view>
    <view
      v-if="logisticsDetail && logisticsDetail.trackNum"
      class="flex flex-vertical-c flex-justify-between lh42 m-t-24"
    >
      <view class="fz-28 color-block">物流单号：</view>
      <view class="flex flex-vertical-c">
        <view class="fz-28 color-block-65">
          {{ logisticsDetail.trackNum }}
        </view>
        <view class="m-l-8 send-blue fz-28" @click="copyThis(logisticsDetail.trackNum)">
          复制
        </view>
      </view>
    </view>
    <view
      v-if="logisticsDetail && logisticsDetail.trackNum"
      class="flex flex-vertical-c flex-justify-between lh42 m-t-16"
    >
      <view class="fz-28 color-block">物流查询电话：</view>
      <view class="fz-28 color-block-65">{{ logisticsDetail.logPhone }}</view>
      <!--      <view class="fz-28 color-block-65">{{ encryptPhone(info.phone) || '测试渲染手机号' }}</view>-->
    </view>
    <view class="send-way flex flex-vertical-c flex-justify-between lh42 m-t-16">
      <view class="fz-28 color-block w140">发货方式：</view>
      <view class="fz-28 color-block-65 send-blue">{{
        logisticsDetail.logCompany || info.deliveryType
      }}</view>
    </view>
    <view class="flex flex-vertical-c flex-justify-between lh42 m-t-6">
      <view class="fz-28 color-block">发货时间：</view>
      <view class="fz-28 color-block-65">{{ info.createTime }}</view>
    </view>
    <view class="m-t-16" v-if="logisticsDetail.sendCerti">
      <view class="fz-28 color-block lh42">发货凭证：</view>
      <view class="send-proof flex flex-wrap">
        <image @click="previewImage" :src="logisticsDetail.sendCerti" class="send-proof__img" />
      </view>
    </view>
    <!--    <view class="send-button">查看物流信息</view>-->
  </view>
</template>

<script>
  export default {
    name: 'SendInformation',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        imageProof: [
          {
            srcProof: '/static/demo/rectangle.png',
          },
        ],
      }
    },
    computed: {
      logisticsDetail() {
        if (this.info.logisticsDetail) {
          return JSON.parse(this.info.logisticsDetail)
        } else {
          return ''
        }
      },
    },
    methods: {
      /**
       * 复制
       */
      copyThis(code) {
        const _this = this
        uni.setClipboardData({
          data: code,
          success: function () {
            _this.$u.toast('复制成功')
          },
        })
      },
      // 加密电话
      encryptPhone(phone) {
        return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
      },
      /**
       * 预览图片
       */
      previewImage() {
        uni.previewImage({
          current: 0,
          urls: [this.logisticsDetail.sendCerti],
          indicator: 'none',
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .send {
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    &-blue {
      color: #155bd4;
    }
    &-way {
      padding-bottom: 8rpx;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-proof {
      margin-top: 24rpx;
      &__img {
        width: 218rpx;
        height: 218rpx;
        display: block;
        &:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
    }
    &-button {
      margin-top: 48rpx;
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border: 2rpx solid #ff5319;
      border-radius: 48rpx;
      font-size: 32rpx;
      color: #ff5319;
    }
  }
</style>
