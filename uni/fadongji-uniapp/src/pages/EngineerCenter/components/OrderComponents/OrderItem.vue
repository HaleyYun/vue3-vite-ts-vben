<template>
  <view class="order m-t-16" @click="goTo">
    <!-- 服务单类型,31:售后回收单 32:安装单 33:回收单 -->
    <view class="order-state flex flex-vertical-c flex-justify-between fz-28 color-block">
      <view>
        <text v-if="info.supportType === 32" class="order-state-sign m-r-18">安装</text>
        <text v-else-if="info.supportType === 33" class="order-state-sign m-r-18 green">回收</text>
        <text v-else-if="info.supportType === 31" class="order-state-sign m-r-18 yellow">售后</text>
        <text>{{ info.time }}</text>
      </view>
      <text class="color-block-45">
        <!-- <template v-if="info.supportType === 32">
          {{ statusList[0][info.status] }}
        </template>
        <template v-else-if="info.supportType === 33">
          {{ statusList[1][info.status] }}
        </template>
        <template v-else-if="info.supportType === 31">
          {{ statusList[2][info.status] }}
        </template> -->
        {{ info.orderStatusEvent }}
      </text>
    </view>

    <view class="order-info my-24 flex">
      <view class="flex1 flex flex-vertical-c">
        <image
          :src="info.garageInfo.photoUrl || '/static/default_avatar.png'"
          class="icon-img flex-shark-0"
        />
        <view class="order-info__detail">
          <view class="font-weight-500 fz-32 order-info__detail-title overEllipsis">{{
            info.garageInfo.storeName || '未知'
          }}</view>
          <block v-if="pendingTags.indexOf(info.orderStatusEvent) > -1">
            <view
              class="map flex flex-vertical-c fz-24 color-block-65 m-t-10"
              @click.stop="goToMap"
            >
              <text>距离</text>
              <block v-if="info.mapLocationVO && info.mapLocationVO.distance">
                <block v-if="+info.mapLocationVO.distance > 1000">
                  <text style="color: '#FF5319'">
                    {{ (+info.mapLocationVO.distance / 1000).toFixed(2) }}
                  </text>
                  <text>公里</text>
                </block>
                <block v-else>
                  <text style="color: '#FF5319'">
                    {{ info.mapLocationVO.distance }}
                  </text>
                  <text>米</text>
                </block>
              </block>
              <block v-else>--米</block>
              <view class="icon-map flex flex-vertical-c m-l-8">
                <VoIcon :size="14" class="m-r-6" color="#0D66FF" name="plane" />
                <text>导航</text>
              </view>
            </view>
          </block>
        </view>
      </view>
      <!-- 仅【待安装】【安装中】【待上门】【上门中】状态的订单显示该图标 -->
      <view
        v-if="
          info.orderStatus === 3240 ||
          info.orderStatus === 3250 ||
          info.orderStatus === 3340 ||
          info.orderStatus === 3341 ||
          info.orderStatus === 3250
        "
        class="order-info__fn flex flex-vertical-c flex-shark-0"
      >
        <view @click.stop="callPhone(info.garageInfo.userName)">
          <VoIcon :size="24" class="m-r-32" color="#595959" name="mobile-new" />
        </view>
        <view @click.stop="goImUrl(info)">
          <VoIcon :size="24" color="#595959" name="smile-m" />
        </view>
      </view>
    </view>

    <view class="fz-28 color-block m-t-16">服务名称：{{ info.supportName }}</view>
    <view class="fz-28 color-block m-t-12">服务金额：{{ info.supportAmount }}元</view>
    <view class="flex flex-justify-r m-t-24">
      <!-- 安装订单 -->
      <block v-if="info.supportType === 32">
        <!-- 待安装 -->
        <block v-if="info.orderStatus === 3240">
          <view
            class="btn"
            @click.stop="
              goToUrl(`/pagesEngineer/OrderList/CancelOrder?id=${info.id}&supportType=32`)
            "
          >
            取消接单
          </view>
          <view v-if="!info.isVoucher" class="btn act m-l-32" @click.stop="goSubmitInstall"
            >提交安装凭证</view
          >
          <view class="btn act m-l-32" @click.stop="orderBegin">开始安装</view>
        </block>
        <!-- 安装中 -->
        <block v-else-if="info.orderStatus === 3250 && !info.isVoucher">
          <view class="btn" @click.stop="operationFn">联系平台售后</view>
          <view class="btn act m-l-32" @click.stop="goSubmitInstall">提交安装凭证</view>
        </block>
        <!-- 已完成 -->
        <block v-else-if="info.orderStatus === 3260 && !info.isVoucher">
          <view class="btn act" @click.stop="goSubmitInstall">提交安装凭证</view>
        </block>
      </block>

      <!-- 回收订单 -->
      <block v-if="info.supportType === 33">
        <!-- 待上门 -->
        <block v-if="info.orderStatus === 3340">
          <view
            class="btn"
            @click.stop="
              goToUrl(`/pagesEngineer/OrderList/CancelOrder?id=${info.id}&supportType=33`)
            "
          >
            取消接单
          </view>
          <view
            v-if="!info.isVoucher"
            class="btn act m-l-32"
            @click.stop="
              goToUrl(
                `/pagesEngineer/RecallOrder/SubmitVoucher?id=${info.id}&source=${info.supportSource}`,
              )
            "
            >提交验收凭证</view
          >
        </block>
        <!-- 回收中 -->
        <block v-else-if="info.orderStatus === 3350">
          <view class="btn" @click.stop="operationFn">联系平台售后</view>
          <view
            v-if="!info.isVoucher"
            class="btn act m-l-32"
            @click.stop="
              goToUrl(
                `/pagesEngineer/RecallOrder/SubmitVoucher?id=${info.id}&source=${info.supportSource}`,
              )
            "
            >提交验收凭证</view
          >
        </block>
        <!-- 待寄回 -->
        <block v-else-if="info.orderStatus === 3351">
          <view class="btn" @click.stop="upLoadLogistics">上传物流信息</view>
        </block>
        <!-- 待收货 -->
        <!-- <template v-else-if="info.orderStatus === 3352">
          <view class="btn" @click.stop="viewLogistics">查看物流信息</view>
        </template> -->
      </block>
      <!-- 售后订单 -->
      <block v-if="info.supportType === 31">
        <!-- 待上门 -->
        <block v-if="info.orderStatus === 3140">
          <view
            class="btn"
            @click.stop="
              goToUrl(`/pagesEngineer/OrderList/CancelOrder?id=${info.id}&supportType=31`)
            "
          >
            取消接单
          </view>
          <view
            class="btn act m-l-32"
            @click.stop="
              goToUrl(`/pagesEngineer/AfterSalesOrder/SubmitAcceptanceCertificate?id=${info.id}`)
            "
            >提交上门结果</view
          >
        </block>
        <!-- 上门中 -->
        <block v-else-if="info.orderStatus === 3150">
          <view class="btn" @click.stop="operationFn">联系平台售后</view>
          <view
            class="btn act m-l-32"
            @click.stop="
              goToUrl(`/pagesEngineer/AfterSalesOrder/SubmitAcceptanceCertificate?id=${info.id}`)
            "
            >提交上门结果</view
          >
        </block>
        <!-- 待确认 -->
        <block v-else-if="info.orderStatus === 3160">
          <view class="btn" @click.stop="concatFn">联系客服</view>
        </block>
      </block>
    </view>
  </view>
</template>
<script>
import { cellPhone, goOnlineCustomerFn, openGpsAppFn} from "@/common/helper";

  export default {
    name: 'OrderItem',
    props: {
      info: {
        type: Object,
        default: () => {
          return {}
        },
      },
      locationInfo: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        statusList: [
          ['待安装', '安装中', '已完成', '已取消', '已关闭'],
          ['待上门', '回收中', '待寄回', '待收货', '已完成', '已取消', '已关闭'],
          ['待上门', '上门中', '待确认', '已完成', '已取消'],
        ],
        tagList: { 31: '售后', 32: '安装', 33: '回收' },
        pendingTags: ['待安装', '安装中', '待上门', '回收中', '上门中'], //进行中状态值
      }
    },
    methods: {
      concatFn(){
        goOnlineCustomerFn(1)
      },
      // card跳转
      goTo() {
        console.log('点击了')
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
      },
      /**
       * 去提交安装凭证页
       */
      goSubmitInstall() {
        this.$linkToEasy(`/pagesEngineer/InstallOrder/SubmitInstall?id=${this.info.id}`)
      },
      // 开始安装
      async orderBegin() {
        if (this.loading) return
        // if (!this.locationInfo.latitude || !this.locationInfo.longitude) {
        //   this.$u.toast('当前无法获取到您的位置信息，请检查手机定位权限是否开启')
        //   return
        // }
        this.loading = true
        try {
          //默认为不可点击状态。获取当前集师傅和修理厂的位置，若二者距离小于50米，该按钮为可点击状态
          // const res = await this.$VoHttp.apiOrderRecycleTechnologyMapLocation({
          //   ...this.locationInfo,
          //   id: this.info.id,
          //   addressDetail: this.info.addressDetail,
          // })
          // if (res.data.distance && res.data.distance > 50) {
          //   this.$u.toast('您当前距离修理厂超过50米，无法开始安装')
          //   this.loading = false
          //   return
          // }
          // else {  //上线需放开
          await this.$VoHttp.apiOrderTechnicianInstallStart$Id({ id: this.info.id })
          this.$u.toast('开始安装工作，安装过程中如有问题您可联系平台售后协助解决')
          this.$emit('refresh')
        } catch (e) {
          this.$u.toast(err.message || '开始失败')
        }
        this.loading = false
        // }
      },
      // 上传物流信息
      upLoadLogistics() {
        this.$linkToEasy(`/pagesEngineer/LogisticsInfo/UpLoadLogistics?id=${this.info.id}`)
      },
      // 查看物流信息
      viewLogistics() {
        this.$linkToEasy(`/pagesRecovery/SellOrder/ReceiveAddress/LogisticsInfo?id=${this.info.id}`)
      },
      // 打开第三方导航
      goToMap() {
        console.log('我要跳转了')
        // 打开第三方导航  参数均为目的地参数  参数1：经度；参数2：纬度
        console.log(this.info)
        if (!this.info.garageInfo.latitude) {
          this.$u.toast('无修理厂位置信息')
          return
        }
        openGpsAppFn(this.info.garageInfo?.latitude, this.info.garageInfo?.longitude, this.info.garageInfo?.storeName)
      },
      /**
       * 跳转到指定链接
       * @param url 链接地址
       */
      goToUrl(url) {
        this.$linkToEasy(`${url}`)
      },
      /**
       * 联系售后、客服
       */
      operationFn() {
        goOnlineCustomerFn(2)
        // this.$emit('helpAction')
      },
      /**
       * 到聊天界面
       * @param info
       */
      goImUrl(info) {
        const data = {
          targetId: info.garageInfo.userId,
          type: 0,
          note: info.garageInfo.storeName,
          platformCode: 'garage',
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 拨打电话
       */
      callPhone(phone) {
        cellPhone(String(phone))
      },
    },
  }
</script>
<style lang="scss" scoped>
  .order {
    width: 100vw;
    padding: 28rpx 32rpx;
    background: #fff;
    box-sizing: border-box;
    &-state {
      padding-bottom: 24rpx;
      border-bottom: 1px solid #f7f7f8;
    }
    &-state-sign {
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
    &-info {
      .icon-img {
        width: 64rpx;
        height: 64rpx;
        margin-right: 16rpx;
        border-radius: 50%;
      }
      &__detail {
        max-width: 440rpx;
      }
      &__detail-title {
        max-width: 440rpx;
      }
      .icon-map {
        padding: 0 16rpx 0 12rpx;
        color: #0d66ff;
        border: 1px solid #0d66ff;
        border-radius: 20rpx;
      }
    }
    .btn {
      padding: 10rpx 32rpx;
      border: 2rpx solid #d3d4db;
      border-radius: 64rpx;
      font-size: 24rpx;
      color: rgba(0, 0, 0, 0.85);
      &.act {
        color: #ff5319;
        border-color: #ff5319;
      }
    }
  }
</style>
