<template>
  <view class="eva">
    <VoNav is-fixed is-have-more title="评价详情">

    </VoNav>
    <view class="eva-info">
      <view
        class="eva-info__title flex"
        @click="
          $linkToEasy(
            `/pagesGarage/ShopList/GoodsDetail?id=${detailInfo.goodsId}&wid=${detailInfo.warehouseId}`,
          )
        "
      >
        <image v-if="detailInfo.pic" :src="detailInfo.pic[0] + '&type=2'" class="title-img" />
        <view class="title-con flex1">
          <text v-show="detailInfo.categoryType" class="good-tips m-r-8">{{
            detailInfo.categoryType
          }}</text>
          <text> {{ detailInfo.goodsName || '' }} </text>
        </view>
        <VoIcon :size="20" class="m-t-4" color="#000" name="right-arrow" />
      </view>
      <view class="eva-info__people flex flex-vertical-c">
        <view class="photoBox">
          <view class="relative">
            <image
              :src="
                detailInfo.photoUrl ? detailInfo.photoUrl + '&type=1' : '/static/default_avatar.png'
              "
              class="people-img"
            />
            <VoIcon v-if="detailInfo.checkStatus === 4" class="people-v" name="v-icon" size="8" />
            <image class="leader" src="/static/icons/head.png" />
          </view>
        </view>
        <view class="people-name m-r-8 color-block">{{ detailInfo.nickName }}</view>
        <view class="people-name color-block-45">({{ userInfo.storeName }})</view>
        <view class="m-l-auto color-block-45 fz-24 lh150 nowrap">
          {{ detailInfo.createTime }}
        </view>
      </view>
      <view class="flex flex-vertical-c m-l-32">
        <view class="lh42 fz-28 color-block nowrap">评分：</view>
        <u-rate
          :value="detailInfo.starMark / 2"
          activeIcon="/static/created/evaluate/score_activate.png"
          gutter="12"
          inactiveIcon="/static/created/evaluate/score_not_active.png"
          readonly
        />
        <view v-if="detailInfo.starMark / 2 === 5" class="fz-24 lh36 m-l-4 nowrap">非常满意</view>
        <view v-else-if="detailInfo.starMark / 2 === 4" class="fz-24 lh36 m-l-4 nowrap">满意</view>
        <view v-else-if="detailInfo.starMark / 2 === 3" class="fz-24 lh36 m-l-4 nowrap">良好</view>
        <view v-else-if="detailInfo.starMark / 2 === 2" class="fz-24 lh36 m-l-4 nowrap">差</view>
        <view v-else-if="detailInfo.starMark / 2 === 1" class="fz-24 lh36 m-l-4 nowrap">极差</view>
      </view>
      <view v-if="labelList || labelList.length > 0" class="eva-info__label flex flex-wrap">
        <view v-for="(info, index) in labelList" :key="index" class="label-list nowrap">
          {{ info }}
        </view>
      </view>
      <view v-if="detailInfo.content && detailInfo.content.content" class="eva-info__con flex">
        <view class="lh42 fz-28 color-block nowrap">内容：</view>
        <view class="con-content flex1">
          {{ detailInfo.content.content }}
        </view>
      </view>
      <view class="eva-info__photo flex flex-wrap">
        <block v-for="(item, index) of photoImg" :key="index">
          <view v-if="+item.type === 1" class="photo-img">
            <image :src="item.src + '&type=1'" class="photo-img" @click="previewImgFn(index)" />
          </view>

          <view v-else class="photo-img" @click="playVideo(item)">
            <image :src="item.poster" class="photo-img" mode="aspectFill" />
            <image class="play" src="/static/created/circle/circle_video_play.png" />
          </view>
        </block>
      </view>
    </view>
    <view class="eva-other">
      <view class="eva-other__title">其他服务评价</view>
      <view class="flex flex-vertical-c m-t-16 p-b-40">
        <view class="lh42 fz-28 color-block nowrap">店家服务：</view>
        <u-rate
          :value="detailInfo.hotelService"
          activeIcon="/static/created/evaluate/score_activate.png"
          gutter="12"
          inactiveIcon="/static/created/evaluate/score_not_active.png"
          readonly
        />

        <view v-if="detailInfo.hotelService === 5" class="fz-24 lh36 m-l-4 nowrap">非常满意</view>
        <view v-else-if="detailInfo.hotelService === 4" class="fz-24 lh36 m-l-4 nowrap">满意</view>
        <view v-else-if="detailInfo.hotelService === 3" class="fz-24 lh36 m-l-4 nowrap">良好</view>
        <view v-else-if="detailInfo.hotelService === 2" class="fz-24 lh36 m-l-4 nowrap">差</view>
        <view v-else-if="detailInfo.hotelService === 1" class="fz-24 lh36 m-l-4 nowrap">极差</view>
      </view>
      <view class="flex flex-vertical-c p-b-26">
        <view class="lh42 fz-28 color-block nowrap">物流时效履约：</view>
        <u-rate
          :value="detailInfo.logisticsTimeliness"
          activeIcon="/static/created/evaluate/score_activate.png"
          gutter="12"
          inactiveIcon="/static/created/evaluate/score_not_active.png"
          readonly
        />
        <view v-if="detailInfo.logisticsTimeliness === 5" class="fz-24 lh36 m-l-4 nowrap"
          >非常满意</view
        >
        <view v-else-if="detailInfo.logisticsTimeliness === 4" class="fz-24 lh36 m-l-4 nowrap"
          >满意</view
        >
        <view v-else-if="detailInfo.logisticsTimeliness === 3" class="fz-24 lh36 m-l-4 nowrap"
          >良好</view
        >
        <view v-else-if="detailInfo.logisticsTimeliness === 2" class="fz-24 lh36 m-l-4 nowrap"
          >差</view
        >
        <view v-else-if="detailInfo.logisticsTimeliness === 1" class="fz-24 lh36 m-l-4 nowrap"
          >极差</view
        >
      </view>
    </view>
    <EraPreviewVideo
      ref="EraPreviewVideo"
      :poster="videoChoose.poster"
      :videoSrc="videoChoose.src"
    />
  </view>
</template>

<script>
  export default {
    name: 'EvaluationDetails',
    data() {
      return {
        detailInfo: {},
        select: 5,
        storeService: 5,
        logisticsAging: 4,
        labelList: [],
        photoImg: [],
        videoChoose: {},
      }
    },
    onLoad(option) {
      let param = {
        orderId: option.orderId,
        sourceId: option.sourceId,
      }
      this.evaluateRequest(param)
    },
    methods: {
      playVideo(item) {
        console.log(item, '9999999999')
        this.videoChoose = item
        this.$refs.EraPreviewVideo.show(this.videoChoose.src)
      },
      previewImgFn(index) {
        let urls = []
        this.photoImg.map((item) => {
          if (+item.type === 1) {
            urls.push(item.src)
          }
        })
        uni.previewImage({
          urls: urls,
          current: index,
        })
      },
      //发送评价接口
      evaluateRequest(param) {
        this.$VoHttp
          .apiOrderEvaluateGetEvaluateOrderDetail(param)
          .then((res) => {
            console.log(res)
            this.detailInfo = res.data
            this.detailInfo.createTime = this.detailInfo.createTime.split(' ')[0]
            if (this.detailInfo.keyword) {
              this.labelList = this.detailInfo.keyword.split(',')
            }
            this.detailInfo.content = JSON.parse(this.detailInfo.content)
            const photoImg = this.detailInfo.content.pic
            if (photoImg) {
              this.photoImg = JSON.parse(photoImg)
            }
            if (this.detailInfo.pic) {
              this.detailInfo.pic = JSON.parse(this.detailInfo.pic)
            }
            console.log(this.detailInfo)
            console.log(this.photoImg)
          })
          .catch((err) => {
            console.log(err, 'ssssss')
            uni.$u.toast(err.message || '评价详情失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .eva {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-info {
      background: #fff;
      margin-top: 16rpx;
      &__title {
        padding: 24rpx 32rpx 16rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid $v-bg-light;
        .title-img {
          width: 80rpx;
          height: 80rpx;
          border-radius: 8rpx;
          overflow: hidden;
          margin-right: 24rpx;
        }
        .title-con {
          height: 48rpx;
          font-weight: bold;
          font-size: 32rpx;
          color: $v-c0-85;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 16rpx;
        }
      }

      &__people {
        padding: 40rpx 32rpx 24rpx;
        box-sizing: border-box;
        .photoBox {
          width: 88rpx;
          height: 88rpx;
          margin-right: 8rpx;
        }
        .people-img {
          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          left: 20rpx;
          top: 20rpx;
        }
        .leader {
          width: 88rpx;
          height: 88rpx;
          position: absolute;
          top: 0;
          left: 0;
        }

        .people-v {
          position: absolute;
          top: -2rpx;
          right: 4rpx;
        }
        .people-name {
          line-height: 42rpx;
          font-size: 28rpx;
          //width: 180rpx;
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      &__label {
        padding: 52rpx 0 0 32rpx;
        box-sizing: border-box;
        .label-list {
          line-height: 36rpx;
          font-size: 24rpx;
          color: $color-primary-yellow;
          padding: 6rpx 24rpx;
          background: $v-tags-btn-disabled;
          border: 2rpx solid $color-primary-yellow;
          border-radius: 80rpx;
          margin-right: 32rpx;
          margin-bottom: 32rpx;
        }
      }
      &__con {
        padding: 0 32rpx 40rpx;
        box-sizing: border-box;
        .con-content {
          line-height: 42rpx;
          font-size: 28rpx;
          color: $v-c0-45;
          //display: -webkit-box;
          //overflow: hidden;
          //-webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-left: 8rpx;
        }
      }
      &__photo {
        padding: 0 0 16rpx 32rpx;
        .photo-img {
          width: 218rpx;
          height: 218rpx;
          margin: 0 16rpx 16rpx 0;
          border-radius: 8rpx;
          overflow: hidden;
          position: relative;
        }
      }
    }
    &-other {
      margin-top: 16rpx;
      padding: 0 32rpx;
      background: #fff;
      &__title {
        padding: 24rpx 0;
        border-bottom: 2rpx solid $v-bg-light;
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
      }
    }
  }
  .play {
    width: 120rpx;
    height: 120rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
  }

  .nowrap {
    white-space: nowrap;
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
