<template>
  <view class="order bg-white" @click="toDetail">
    <view class="order-title">
      <block v-if="info.supportType === 33">
        <text class="order-title__sign flex-shark-0 m-r-16 green">回收</text>
      </block>
      <block v-else-if="info.supportType === 31">
        <text class="order-title__sign flex-shark-0 m-r-16 yellow">售后</text>
      </block>
      <block v-else-if="info.supportType === 32">
        <text class="order-title__sign flex-shark-0 m-r-16">安装</text>
      </block>
      <!-- 发动机型号 -->
      <view class="color-block fz-32 overEllipsis lh48 fz-b">{{ info.modelId || '' }}</view>
    </view>

    <view class="flex flex-vertical-c fz-28 m-b-20">
      <view class="overEllipsis m-r-24">{{ info.buyerName }}</view>
      <view class="flex-shark-0 flex flex-vertical-c" @click.stop="openGPSApp">
        <text>距离</text>
        <block v-if="info.distance">
          <block v-if="+info.distance > 1000">
            <text style="color: #ff5319">
              {{ info.distance ? (+info.distance / 1000).toFixed(2) : '0' }}
            </text>
            <text>公里</text>
          </block>
          <block v-else>
            <text style="color: #ff5319">
              {{ info.distance && info.distance ? info.distance : '0' }}
            </text>
            <text>米</text>
          </block>
        </block>
        <block v-else>--米</block>
        <view class="icon-map flex flex-vertical-c m-l-8">
          <VoIcon :size="14" class="m-r-4" color="#0D66FF" name="plane" />
          <text class="fz-24">导航</text>
        </view>
      </view>
    </view>

    <view class="flex flex-vertical-c color-block-65 fz-24 m-b-12">
      <VoIcon
        :opacity="0.45"
        :size="16"
        class="m-r-6 flex-shark-0"
        color="#000000"
        name="address"
      />
      <view class="overTwoEllipsis lh36">{{ info.addressDetail }}</view>
    </view>

    <view class="order-time color-block-65 fz-24 lh36">上门时间：{{ info.time }}</view>

    <view class="order-footer">
      <!--      <view class="fz-40 lh150 fz-b" style="color: #ee0a24"-->
      <!--        >{{ info.supportAmount }}<text class="fz-24">元</text></view-->
      <!--      >-->
      <VoPointPrice :left-size="20" :price="info.supportAmount" :show-unit="true" color="#F20014" />
      <view
        v-if="
          +info.orderStatus === 3230 ||
          +info.orderStatus === 3130 ||
          +info.orderStatus === 3231 ||
          +info.orderStatus === 3330 ||
          +info.orderStatus === 3331
        "
        class="rob-order"
        @click.stop="robOrderFn"
        >抢单</view
      >
      <view v-else class="have-order color-block-25">已分配</view>
    </view>
  </view>
</template>
<script>
  import { mapGetters } from 'vuex'
  import {checkIsApproveFn, getLocation, openGpsAppFn} from "@/common/helper";

  export default {
    name: 'OrderItem',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
      index: {
        type: Number,
        default: 0,
      },
      skillerState: {
        type: Array,
        default: () => [],
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
    computed: {
      // 辅助函数
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
      }),
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    //生命周期 - 创建之前
    beforeCreate() {},
    //生命周期 - 挂载之前
    beforeMount() {},
    //生命周期 - 更新之前
    beforeUpdate() {},
    //生命周期 - 更新之后
    updated() {},
    //生命周期 - 销毁之前
    beforeUnmount() {},
    //生命周期 - 销毁完成
    unmounted() {},
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {},
    methods: {
      toDetail() {
        console.log(this.info)
        this.$VoHttp.apiGraborderIsUndertaker({ id: this.info.id }).then((res) => {
          if (!res.data) {
            this.$linkToEasy(`/pagesEngineer/ServiceOrder/ServiceOrderDetail?id=${this.info.id}&distance=${this.info.distance || 0}`)
          } else {
            console.log(this.info.supportType, this.info.orderStatus)
            let url = ''
            if (this.info.supportType === 32) {
              // 安装
              // 3210=待付款
              // 3230=待接单
              // 3231=待指派
              // 3240=待安装
              // 3250=安装中
              // 3260=已完成
              // 3270=已取消
              // 3280=已关闭
              if (this.info.orderStatus === 3240) {
                // 待安装
                // #ifdef H5
                url = `/pagesCommon/MapDrag/MapDrag?title=待安装&origin=1&id=${this.info.id}`
                // #endif
                // #ifdef APP-PLUS
                url = `/pagesCommon/MapDrag/MapDragApp?title=待安装&origin=1&id=${this.info.id}`
                // #endif
                this.$store.dispatch('mapDrag/setMapData', this.info)
              } else if (this.info.orderStatus === 3250) {
                // 安装中
                url = `/pagesEngineer/InstallOrder/InInstallation?id=${this.info.id}`
              } else if (this.info.orderStatus === 3260) {
                // 已完成
                url = `/pagesEngineer/InstallOrder/HasCompleted?id=${this.info.id}&type=已完成`
              } else if (this.info.orderStatus === 3270) {
                // 已取消
                url = `/pagesEngineer/InstallOrder/HasCancelled?id=${this.info.id}`
              } else if (this.info.orderStatus === 3280) {
                // 已关闭
                url = `/pagesEngineer/InstallOrder/HasCompleted?id=${this.info.id}&type=已关闭`
              }
            } else if (this.info.supportType === 33) {
              // 回收
              //3340：待上门，3350：回收中，3351：待寄回，3352：待收货
              //3360：已完成；3370：已取消
              if (this.info.orderStatus === 3340) {
                // 待上门
                // #ifdef H5
                url = `/pagesCommon/MapDrag/MapDrag?title=待上门&origin=2&id=${this.info.id}`
                // #endif
                // #ifdef APP-PLUS
                url = `/pagesCommon/MapDrag/MapDragApp?title=待上门&origin=2&id=${this.info.id}`
                // #endif
              } else if (this.info.orderStatus === 3350) {
                // 回收中
                url = `/pagesEngineer/RecallOrder/RecallOrderDetails?id=${this.info.id}&type=1`
              } else if (this.info.orderStatus === 3351) {
                // 待寄回
                url = `/pagesEngineer/RecallOrder/RecallOrderDetails?id=${this.info.id}&type=2`
              } else if (this.info.orderStatus === 3352) {
                // 待收货
                url = `/pagesEngineer/RecallOrder/RecallOrderDetails?id=${this.info.id}&type=3`
              } else if (this.info.orderStatus === 3360) {
                // 已完成
                url = `/pagesEngineer/RecallOrder/RecallOrderDetails?id=${this.info.id}&type=4`
              } else if (this.info.orderStatus === 3370) {
                // 已取消
                url = `/pagesEngineer/RecallOrder/RecallOrderDetails?id=${this.info.id}&type=5`
              } else if (this.info.orderStatus === 3380) {
                // 已关闭
                url = `/pagesEngineer/RecallOrder/RecallOrderDetails?id=${this.info.id}&type=6`
              }
            } else if (this.info.supportType === 31) {
              // 售后 "3170": "已完成",
              // "3140": "待上门",
              // "3160": "待确认",
              // "3130": "待接单",
              // "3180": "已取消",
              // "3150": "上门中",3170=已完成
              if (this.info.orderStatus === 3140) {
                // 待上门
                // #ifdef H5
                url = `/pagesCommon/MapDrag/MapDrag?title=待上门&origin=3&id=${this.info.id}`
                // #endif
                // #ifdef APP-PLUS
                url = `/pagesCommon/MapDrag/MapDragApp?title=待上门&origin=3&id=${this.info.id}`
                // #endif
              } else if (this.info.orderStatus === 3150) {
                // 上门中
                url = `/pagesEngineer/AfterSalesOrder/DoorStatus?id=${this.info.id}&type=0`
              } else if (this.info.orderStatus === 3160) {
                // 待确认
                url = `/pagesEngineer/AfterSalesOrder/DoorStatus?id=${this.info.id}&type=1`
              } else if (this.info.orderStatus === 3170) {
                // 已完成
                url = `/pagesEngineer/AfterSalesOrder/DoorStatus?id=${this.info.id}&type=2`
              } else if (this.info.orderStatus === 3180) {
                // 已取消
                url = `/pagesEngineer/AfterSalesOrder/DoorStatus?id=${this.info.id}&type=3`
              }
            }
            console.log(this.info)
            console.log(url, 'asd')
            this.$linkToEasy(url)
            console.log('zxc')
          }
        })
      },
      // 抢单后向父组件传值
      async robOrderFn() {
        let LocationInfo
        try {
          LocationInfo = await getLocation(this.locationgTips)
        } catch (e) {
          console.log(e)
          return
        }
        if (!LocationInfo || !LocationInfo.longitude) return
        if (!checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        if (this.loading) return
        this.loading = !this.loading
        // 判断是否具有该类型单的抢单资格
        let type = this.info.supportType
        let obj = this.skillerState.filter((item) => +item.qualifyType === +type)
        if (obj.length && !obj[0].certification) {
          this.loading=false
          this.$emit('skillApprove', this.info)
          return
        }
        let param = {
          orderIds: [this.info.id],
          buyerId: this.info.buyerId,
          longitude: +LocationInfo.longitude,
          latitude: +LocationInfo.latitude,
          createTime: this.info.createTime,
          isTwoConfirm: 0,
        }

        this.$VoHttp
          .apiGraborderGraborders(param)
          .then((res) => {
            // 抢单二次弹窗，无20001的的情况了
            // this.$toast('抢单成功', 'success', '/static/icons/success_icon.png')
            // setTimeout(() => {
            //   this.$emit('success', this.info)
            // }, 1500)
            // 需要传递条件
          })
          .catch((e) => {
            if (+e.code === 20002) {
              if (e.data && e.data.length) {
                // 20002 还有其他单子可以抢
                e.data.forEach((item) => {
                  //组装时间段
                  if (item.homeStartTime && item.homeEndTime) {
                    item.time =
                      this.$vocenApi.VoUtils.timeFormat(item.homeStartTime, 'yyyy-mm-dd hh:MM') +
                      '-' +
                      this.$vocenApi.VoUtils.timeFormat(item.homeEndTime, 'hh:MM')
                  }
                })
                this.$emit('robFn', {
                  list: e.data,
                  row: this.info,
                })
              } else {
                // 20002 无其他单子可以抢
                this.$emit('robFn', {
                  row: this.info,
                  list: [],
                })
              }
            } else if (+e.code === 20003) {
              this.$emit('skillApprove', this.info)
            } else {
              uni.$u.toast(e.message || '抢单失败')
            }
          })
          .finally(() => {
            this.loading = !this.loading
          })
        // 抢单的逻辑
      },
      // 打开第三方导航
      openGPSApp() {

        openGpsAppFn(this.info.latitude,this.info.longitude)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .order {
    padding: 24rpx;
    border-radius: 16rpx;
    margin: 0 32rpx 24rpx;
    &-title {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      &__sign {
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
    &-time {
      padding: 14rpx 16rpx;
      background: #f7f7f8;
      border-radius: 8rpx;
    }
    .icon-map {
      height: 36rpx;
      padding: 0 16rpx 0 12rpx;
      color: #0d66ff;
      border: 2rpx solid #5996ff;
      border-radius: 20rpx;
    }
    &-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24rpx;
      .rob-order {
        width: 200rpx;
        height: 64rpx;
        font-size: 28rpx;
        line-height: 64rpx;
        text-align: center;
        background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
        border-radius: 64rpx;
        color: #fff;
      }
      .have-order {
        width: 200rpx;
        height: 64rpx;
        font-size: 28rpx;
        line-height: 64rpx;
        text-align: center;
        background: #f6f7f8;
        border-radius: 64rpx;
      }
    }
  }
</style>
