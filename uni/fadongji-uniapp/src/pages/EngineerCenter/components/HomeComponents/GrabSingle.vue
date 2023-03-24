<template>
  <u-overlay :show="show" @click="closePop">
    <view v-if="show" class="popup flex flex-column flex-vertical-c flex-justify-c">
      <view class="popup-white" :class="{ initial: !row.list || !row.list.length }" @click.stop>
        <scroll-view class="p-l-24 p-r-24 border-box flex1 h-full" scroll-y>
          <view class="popup-white__title">
            <block v-if="row.row.supportType === 33">
              <text class="title-sign flex-shark-0 m-r-16 green">回收</text>
            </block>
            <block v-else-if="row.row.supportType === 31">
              <text class="title-sign flex-shark-0 m-r-16 yellow">售后</text>
            </block>
            <block v-else-if="row.row.supportType === 32">
              <text class="title-sign flex-shark-0 m-r-16">安装</text>
            </block>
            <view class="color-block fz-32 overEllipsis lh48 fz-b flex1">{{
              row.row.modelId || ''
            }}</view>
            <VoPointPrice
              :leftSize="20"
              :price="row.row.supportAmount"
              :showUnit="true"
              class="lh60"
              color="#EE0A24"
            />
          </view>
          <view class="flex flex-vertical-c fz-28 m-b-16 lh42">
            <view class="overEllipsis m-r-24">{{ row.row.buyerName }}</view>
            <view class="flex-shark-0 flex flex-vertical-c">
              <block v-if="+row.row.distance >= 1000">
                距离
                <text class="orange">{{ (+row.row.distance / 1000).toFixed(2) || 0 }}</text>
                公里
              </block>
              <block v-else>
                距离
                <text class="orange">{{ row.row.distance || 0 }}</text>
                米
              </block>
            </view>
          </view>
          <view class="flex flex-vertical-c color-block-65 fz-24 m-b-8">
            <VoIcon
              :opacity="0.45"
              :size="16"
              class="m-r-6 flex-shark-0"
              color="#000000"
              name="address"
            />
            <view v-if="row.row.addressDetail.address" class="overTwoEllipsis lh36">
              {{ row.row.addressDetail.address }}
            </view>
            <view v-else class="overTwoEllipsis lh36">
              {{ row.row.addressDetail }}
            </view>
          </view>
          <view class="popup-white__time color-block-65 fz-24 lh36">
            上门时间：{{ row.row.time }}
          </view>
          <block v-if="row.list.length">
            <view class="flex flex-vertical-c flex-justify-c">
              <view class="popup-white__short" />
              <view class="popup-white__more">该买家还有更多服务单</view>
              <VoIcon :size="14" color="#FF6633" name="arrow-bottom-line" />
              <view class="popup-white__short m-l-16" />
            </view>
            <view v-for="(item, index) in row.list" :key="index">
              <block v-if="item.id !== row.row.id">
                <view class="popup-white__title">
                  <block v-if="item.supportType === 33">
                    <text class="title-sign flex-shark-0 m-r-16 green">回收</text>
                  </block>
                  <block v-else-if="item.supportType === 31">
                    <text class="title-sign flex-shark-0 m-r-16 yellow">售后</text>
                  </block>
                  <block v-else-if="item.supportType === 32">
                    <text class="title-sign flex-shark-0 m-r-16">安装</text>
                  </block>
                  <view class="color-block fz-32 overEllipsis lh48 fz-b flex1">{{
                      item.modelId || ''
                    }}</view>
                  <VoPointPrice
                    :leftSize="20"
                    :price="item.supportAmount"
                    :showUnit="true"
                    class="lh60"
                    color="#EE0A24"
                  />
                </view>
                <view class="flex flex-vertical-c fz-28 m-b-16 lh42">
                  <view class="overEllipsis m-r-24">{{ item.buyerName }}</view>
                  <view class="flex-shark-0 flex flex-vertical-c">
                    <block v-if="row.row.distance">
                      <block v-if="+row.row.distance >= 1000">
                        距离
                        <text class="orange">{{ (+row.row.distance / 1000).toFixed(2) || 0 }}</text>
                        公里
                      </block>
                      <block v-else>
                        距离
                        <text class="orange">{{ row.row.distance || 0 }}</text>
                        米
                      </block>
                    </block>
                    <block v-else>--米</block>
                  </view>
                </view>
                <view class="flex flex-vertical-c color-block-65 fz-24 m-b-8">
                  <VoIcon
                    :opacity="0.45"
                    :size="16"
                    class="m-r-6 flex-shark-0"
                    color="#000000"
                    name="address"
                  />
                  <view class="overTwoEllipsis lh36">{{ item.addressDetail }}</view>
                </view>
                <view class="popup-white__time color-block-65 fz-24 lh36">
                  上门时间：{{ item.time }}
                </view>
                <!--              <view v-if="index === 0" class="flex flex-vertical-c flex-justify-c">-->
                <!--                <view class="popup-white__short" />-->
                <!--                <view class="popup-white__more">该买家还有更多服务单</view>-->
                <!--                <VoIcon :size="14" color="#FF6633" name="arrow-bottom-line" />-->
                <!--                <view class="popup-white__short m-l-16" />-->
                <!--              </view>-->
                <view class="popup-white__line" />
              </block>
            </view>
          </block>
        </scroll-view>
        <view class="popup-white__bottom flex flex-justify-between flex-vertical-c">
          <block v-if="row.list.length">
            <view v-if="row.row.supportType === 33" class="bottom-left" @click="recyclinList">
              只抢1单
            </view>
            <view v-else class="bottom-left" @click="recyclinList">只抢{{ formatType() }}单</view>
            <view class="bottom-right" @click="robList">都抢了</view>
          </block>
          <block v-else>
            <view class="bottom-left" @click="close">取消</view>
            <view class="bottom-right" @click="recyclinList">确认接单</view>
          </block>
        </view>
      </view>
      <image class="popup-close" src="/static/oldbuyer/technical_workers/delete.png" />
    </view>
  </u-overlay>
</template>

<script>
  import { getLocation } from "@/common/helper";

  export default {
    name: 'GrabSingle',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        },
      },
      show: {
        type: Boolean,
        default: false,
      },
      row: {
        type: Object,
        default: () => {
          return {
            row: {},
            list: [],
          }
        },
      },
    },
    data() {
      return {
        loading: false,
        locationgTips: {
          message: '为更好的为您推送服务单，请尽快打开位置开关。',
          cancel: '再想想',
          confirm: '去打开',
        },
      }
    },
    methods: {
      close() {
        this.$emit('update:show', false)
      },
      formatType() {
        console.log(this.row.row.supportType)
        if (this.row.row.supportType === 31) {
          return '售后'
        } else if (this.row.row.supportType === 32) {
          return '安装'
        } else if (this.row.row.supportType === 33) {
          return '回收'
        }
      },
      closePop() {
        this.$emit('update:show', false)
      },
      /**
       * 只抢回收单 & 确认抢单
       */
      async recyclinList() {
        let LocationInfo
        try {
          LocationInfo = await getLocation(this.locationgTips)
        } catch (e) {
          console.log(e)
          return
        }
        if (!LocationInfo || !LocationInfo.longitude) return
        if (this.loading) return
        this.loading = !this.loading
        let param = {
          type: 1,
          orderIds: [this.row.row.id],
          buyerId: this.row.row.buyerId,
          longitude: +LocationInfo.longitude,
          latitude: +LocationInfo.latitude,
          createTime: this.row.row.createTime,
          isTwoConfirm: 1,
        }
        this.$VoHttp
          .apiGraborderGraborders(param)
          .then((res) => {
            this.$emit('update:show', false)
            this.$toast('抢单成功', 'success', '/static/icons/success_icon.png')
            setTimeout(() => {
              this.$emit('updateFn')
            }, 1500)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '抢单失败')
          })
          .finally(() => {
            this.loading = !this.loading
            setTimeout(() => {
              this.$emit('updateFn')
            }, 1500)
          })
      },
      /**
       * 都抢了
       */
      async robList() {
        let LocationInfo
        try {
          LocationInfo = await getLocation(this.locationgTips)
        } catch (e) {
          console.log(e)
          return
        }
        if (!LocationInfo || !LocationInfo.longitude) return
        if (this.loading) return
        this.loading = !this.loading
        let orderIds = [this.row.row.id]
        this.row.list.map((item) => {
          orderIds.push(item.id)
        })
        let param = {
          type: 1,
          orderIds: orderIds,
          buyerId: this.row.row.buyerId,
          longitude: +LocationInfo.longitude,
          latitude: +LocationInfo.latitude,
          isTwoConfirm: 1,
        }
        this.$VoHttp
          .apiGraborderGraborders(param)
          .then((res) => {
            this.$emit('update:show', false)
            this.$toast('抢单成功', 'success', '/static/icons/success_icon.png')
            setTimeout(() => {
              this.$emit('updateFn')
            }, 1500)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '抢单失败')
          })
          .finally(() => {
            this.loading = !this.loading
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .popup {
    width: 750rpx;
    height: 100vh;
    //overflow-y: auto;
    &-white {
      width: 640rpx;
      height: 1000rpx;
      background: #fff;
      margin: 0 auto;
      border-top-left-radius: 8rpx;
      border-top-right-radius: 8rpx;
      //overflow: hidden;
      &.initial {
        height: initial;
      }
      &__title {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        padding-top: 40rpx;
        .title-sign {
          height: 36rpx;
          line-height: 36rpx;
          font-size: 24rpx;
          padding: 0 16rpx;
          border-radius: 8rpx;
          background: linear-gradient(96.72deg, #f20014 -13.61%, #fa6419 104.67%);
          color: #fff;
          &.green {
            background: linear-gradient(96.72deg, #00b259 -13.61%, #29d446 104.67%);
          }
          &.yellow {
            background: linear-gradient(96.72deg, #ff9b05 -13.61%, #ffbe0d 104.67%);
          }
        }
      }
      &__time {
        padding: 14rpx 16rpx;
        background: #f7f7f8;
        border-radius: 8rpx;
        margin-bottom: 32rpx;
      }
      &__more {
        line-height: 36rpx;
        font-size: 24rpx;
        color: #ff4a0d;
        margin-left: 16rpx;
        margin-right: 4rpx;
      }
      &__short {
        width: 120rpx;
        height: 2rpx;
        background: $v-bg-light;
      }
      &__line {
        width: 100%;
        height: 2rpx;
        background: $v-bg-light;
      }
      &__bottom {
        background: #fff;
        padding: 24rpx;
        border-top: 2rpx solid $v-bg-light;
        border-bottom-left-radius: 8rpx;
        border-bottom-right-radius: 8rpx;
        //box-sizing: border-box;
        .bottom-left {
          width: 286rpx;
          height: 78rpx;
          line-height: 78rpx;
          text-align: center;
          border: 2rpx solid #ff5319;
          border-radius: 48rpx;
          box-sizing: border-box;
          font-size: 28rpx;
          color: #ff5319;
        }
        .bottom-right {
          width: 286rpx;
          height: 80rpx;
          line-height: 80rpx;
          text-align: center;
          background: #ff5319;
          border-radius: 48rpx;
          box-sizing: border-box;
          font-size: 28rpx;
          color: #ffffff;
        }
      }
    }
    &-close {
      width: 56rpx;
      height: 56rpx;
      display: block;
      margin-top: 176rpx;
    }
  }
  .orange {
    color: #ff5319;
  }
</style>
