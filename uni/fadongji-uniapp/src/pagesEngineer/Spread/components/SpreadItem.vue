<template>
  <view class="spread fz-28">
    <image
      v-if="data.photoUrl"
      class="spread_img"
      :src="transferCosUrlFn(data.photoUrl, 1)"
      @error="imgErr"
    />
    <image
      v-else
      class="spread_img"
      :src="currentSelected === 1 ? '/static/logo.jpg' : '/static/default_avatar.png'"
    />
    <view class="spread_detail m-l-16 flex1">
      <view class="spread_detail_title">
        <view class="flex flex1 fz-32 flex-vertical-c flex-wrap">
          {{ data.contractName }}
          <view
            class="status-icon flex flex-vertical-c m-l-16"
            :class="
              data.status === 3
                ? 'green'
                : data.status === 1
                ? 'yellow'
                : data.status === 2
                ? 'red'
                : ''
            "
          >
            <!-- （0-未认证；1-认证中；2-认证失败；3-认证成功） -->
            <voIcon v-if="data.status === 3" color="#26BF26" :size="12" name="pending-review" />
<!--            <voIcon v-else-if="data.status === 1" :size="12" name="in-certification" />-->
            <VoIcon
              v-else-if="data.status === 1"
              :size="12"
              color="#FF9B05"
              name="pending-review"
            />
            <voIcon
              v-else-if="data.status === 2"
              :size="12"
              color="#EE0A24"
              name="pending-review"
            />
            <VoIcon v-else :opacity="0.25" color="#000000" name="pending-review" size="12" />
            <text class="p-l-4 text-nowrap">{{ data.statusStr }}</text>
          </view>
        </view>
      </view>
      <view class="fz-24">{{ data.createTime }}</view>
      <view class="spread_detail_number m-t-8">{{ data.contractPhone }}</view>
      <view class="spread_detail_addr m-t-8">{{ data.areaCodeStr }}{{ data.address }}</view>
    </view>
  </view>
</template>

<script>
  import { transferCosUrl } from "@/common/helper";

  export default {
    name: 'SpreadItem',
    props: {
      data: {
        type: Object,
        default() {
          return {
            url: 'https://cdn.uviewui.com/uview/album/1.jpg',
            name: '江陵动力修理厂',
            lastDate: '2022-08-22',
            phoneNm: '132****1789',
            addr: '河南省郑州市金水区龙子湖街道中央广场',
          }
        },
      },
      currentSelected: {
        type: [String, Number],
        default: 1, // 1修理厂 2集师傅
      },
    },
    methods: {
      transferCosUrlFn: transferCosUrl,
      // 图片加载失败处理
      imgErr() {
        if (this.currentSelected === 1) {
          this.data.photoUrl = '/static/logo.jpg'
        } else {
          this.data.photoUrl = '/static/default_avatar.png'
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .spread {
    display: flex;
    color: rgba(0, 0, 0, 0.45);

    .spread_img {
      width: 94rpx;
      height: 94rpx;
      border-radius: 8rpx;
      overflow: hidden;
    }

    .spread_detail {
      flex-grow: 1;

      .spread_detail_title {
        display: flex;
        justify-content: space-between;

        > :nth-child(1) {
          // line-height: 48rpx;
          color: rgba(0, 0, 0, 0.85);
        }
      }

      .spread_detail_number {
        line-height: 42rpx;
      }
    }
    .status-icon {
      height: 36rpx;
      background: #F7F7F8;
      border-radius: 100px;
      color: rgba(0, 0, 0, 0.25);
      padding: 0 10rpx;
      box-sizing: border-box;
      font-size: 20rpx;
      font-weight: 500;
      margin-top: 8rpx;
      margin-bottom: 8rpx;
      &.green {
        background: #ECFAF3;
        color: #07C160;
      }
      &.yellow {
        background: #FFF5E5;
        color: #FF9B05;
      }
      &.red {
        color: #F45F70;
        background: #FEECEE;
      }
    }
  }
</style>
