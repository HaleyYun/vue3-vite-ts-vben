<template>
  <view class="notice">
    <view class="notice-bg">
      <view class="notice-bg__title flex flex-vertical-c" @click="void 0">
        <image class="title-img" src="/static/supplier/home/announcement.png" />
        <view class="title-line" />
        <view class="flex1 lh36 fz-28 color-block m-l-16">热烈庆祝发动集app今日正式上线！</view>
      </view>
      <!--   服务商   -->
      <view v-if="typeOf === 'agent'" class="notice-bg__agent">
        <u-line class="agent-line" color="#F7F7F8" length="319" />
        <view class="agent-padding flex flex-justify-between">
          <view class="flex flex-column" @click="goAccountBillFn">
            <view class="lh48 fz-b fz-32 color-block m-b-32">仓储区</view>
            <view class="text-left">
              <view class="lh36 fz-b fz-40 color-block">{{ info.warehouseRevenue || '0' }}</view>
              <view class="m-t-8 lh36 fz-24 color-block-45">查看明细</view>
            </view>
          </view>
          <view class="flex flex-column">
            <view class="flex flex-justify-between flex-vertical-c">
              <view class="agent-padding__whole" @click="vin"> 扫码补货 </view>
              <view class="agent-padding__whole" @click="scanOutbound"> 扫码出库 </view>
            </view>

            <view class="flex flex-justify-between flex-vertical-c m-t-38">
              <view class="agent-padding__whole" @click="goUrl('/pagesAgent/StoreDetail/MyGoods')">
                库存明细
              </view>
              <view
                class="agent-padding__whole"
                @click="goUrl('/pagesAgent/WarehouseCost/WarehouseCost')"
              >
                费用明细
              </view>
            </view>
          </view>
        </view>
      </view>
      <!--   供应商   -->
      <view v-else class="notice-bg__bottom">
        <u-line color="#F7F7F8" length="319" />
        <view class="bottom-swiper m-t-28 p-b-22">
          <view class="bottom-scroll">
            <block v-for="(item, index) in functionList" :key="index">
              <view
                v-if="item.show"
                class="bottom-scroll__item flex flex-column flex-vertical-c flex-justify-between"
                @click="nextPage(item)"
              >
                <image :src="item.srcIcon" class="bottom-scroll__img" />
                <view class="lh36 fz-24 color-block white-space__nowrap">{{ item.funName }}</view>
              </view>
            </block>
          </view>
        </view>
        <!--        <swiper :current="current" class="bottom-swiper m-t-28 p-b-22" @change="changeCurrent">-->
        <!--          <swiper-item>-->
        <!--            <view class="bottom-scroll" scroll-x="true">-->
        <!--              <block v-for="(item, index) in functionList" :key="index">-->
        <!--                <view-->
        <!--                  v-if="item.show"-->
        <!--                  class="flex flex-column flex-vertical-c flex-justify-between"-->
        <!--                  @click="nextPage(item)"-->
        <!--                >-->
        <!--                  <image :src="item.srcIcon" class="bottom-scroll__img" />-->
        <!--                  <view class="lh36 fz-24 color-block white-space__nowrap">{{ item.funName }}</view>-->
        <!--                </view>-->
        <!--              </block>-->
        <!--            </view>-->
        <!--          </swiper-item>-->
        <!--          <swiper-item>-->
        <!--            <view class="bottom-scroll" scroll-x="true">-->
        <!--              <view-->
        <!--                v-for="(item, index) in functionList"-->
        <!--                :key="index"-->
        <!--                class="flex flex-column flex-vertical-c flex-justify-between"-->
        <!--                @click="nextPage(item)"-->
        <!--              >-->
        <!--                <image :src="item.srcIcon" class="bottom-scroll__img" />-->
        <!--                <view class="lh36 fz-24 color-block">{{ item.funName }}</view>-->
        <!--              </view>-->
        <!--            </view>-->
        <!--          </swiper-item>-->
        <!--        </swiper>-->
        <!--        <view class="bottom-indicator flex">-->
        <!--          <view v-if="current === 0" class="bottom-indicator__slider" />-->
        <!--          <view v-else-if="current === 1" class="bottom-indicator__slider m-l-16" />-->
        <!--        </view>-->
      </view>
    </view>
    <VoModal
      :closeOnClickOverlay="true"
      :content="content"
      :show="showModalCancel"
      :showCancelButton="true"
      confirmText="继续识别"
      @cancel="showModalCancel = false"
      @confirm="vin"
    />
  </view>
</template>

<script>
  import {
    checkIsApproveFn,
    chooseImageOcrByPromise,
    vocenOutboundScanCodeFn,
    vocenOutboundScanCodeMessageFn,
    vocenOutboundScanCodeKeepMessageFn,
    vocenScanCodeFn,
  } from '@/common/helper'

  export default {
    name: 'NoticeItem',
    props: {
      menuList: {
        type: Array,
        default: () => [],
      },
      info: {
        type: Object,
        default() {
          return {
            warehouseRevenue: '',
          }
        },
      },
      isSelf: {
        type: Boolean,
        default: false,
      },
      typeOf: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        // 编辑内容
        formData: {
          content: '',
        },
        current: 0,
        content: '',
        showModalCancel: false,
        functionList: [
          {
            srcIcon: '/static/supplier/home/menu_icon1.png',
            funName: '上货',
            path: '/pagesProduct/PutProduct/PutProduct',
            show: true,
          },
          {
            srcIcon: '/static/supplier/home/menu_icon2.png',
            funName: '补货',
            path: '/pagesSupplier/Warehouse/RepairProduct/ReplenishGoodsList',
            show: true,
          },
          {
            srcIcon: '/static/supplier/home/menu_icon3.png',
            funName: '订单',
            path: '/pagesSupplier/Order/OrderList/OrderList',
            show: true,
          },
          {
            srcIcon: '/static/supplier/home/menu_icon4.png',
            funName: '仓储',
            path: '/pagesSupplier/Warehouse/WarehouseList/WarehouseList',
            show: true,
          },
          {
            srcIcon: '/static/supplier/home/menu_icon9.png',
            funName: '商家大学',
            path: '/pagesSupplier/BusinessUniversity/BusinessUniversity',
            show: true,
          },
          // {
          //   srcIcon: '/static/supplier/home/menu_icon5.png',
          //   funName: '找运营',
          //   path: '',
          // },
          {
            srcIcon: '/static/supplier/home/menu_icon6.png',
            funName: '商品管理',
            path: '/pagesSupplier/GoodsManage/MyGoods',
            show: true,
          },
          {
            srcIcon: '/static/supplier/home/menu_icon11.png',
            funName: '退货/退款',
            path: '/pagesSupplier/Order/ReturnExchange/ReturnExchange',
            show: true,
          },
          // {
          //   srcIcon: '/static/supplier/home/menu_icon7.png',
          //   funName: '直播',
          //   path: '',
          // },
          {
            srcIcon: '/static/supplier/home/menu_icon8.png',
            funName: '售后专区',
            path: '/pagesSupplier/PostSaleOrder/ApplyPostSaleList',
            show: true,
          },
          {
            srcIcon: '/static/supplier/home/menu_icon12.png',
            funName: '寄售订单',
            path: '/pagesSupplier/Order/DistributionOrder/DistributionOrderList',
            show: false,
          },
          // {
          //   srcIcon: '/static/supplier/home/menu_icon10.png',
          //   funName: '优惠券',
          //   path: '',
          // },
        ],
      }
    },
    created() {
      this.initFn()

      let that = this
      uni.$on('handleInput', function (data) {
        that.handleInput(data.content)
      })
    },
    methods: {
      closeHandler() {
        this.$emit('updateshowHandle', false)
      },
      scanOutbound() {
        // #ifdef APP-PLUS
        let that = this
        vocenOutboundScanCodeFn(10, '1')
          .then((res) => {
            if (res.code == 200) {
              that.checkExistence(res.data.vinCode)
            } else if (res.code == 100) {
              that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
            }
          })
          .catch((e) => {
            console.log(e, 123)
            that.$u.toast('未识别到内容，请重新扫描')
          })
          this.keepCode()
        // #endif
        // #ifdef H5
          this.$u.toast('请用手机扫码')
        // #endif
      },
      keepCode() {
          let that = this
          vocenOutboundScanCodeKeepMessageFn().then((res) => {
            console.log('res --------->', res)
            if (res.code == 200) {
              that.checkExistence(res.data.vinCode)
            } else if (res.code == 100) {
              that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
            }
          })
          .catch((e) => {
            console.log(e, 123)
            that.$u.toast('未识别到内容，请重新扫描')
          })
      },
      /**
       * 检验商品识别码是否存在
       */
      checkExistence(vinCode) {
        console.log(vinCode)
        try {
          this.$VoHttp.WAREHOUSE.apiWarehouseOperFacilitatorSelfRefillCheck({
            goodsVin: vinCode,
          }).then((res) => {
            this.keepCode()
            console.log('res ------>', res)
            if (res.code === '20001') {
              console.log('vinCode ------>', vinCode)
              this.sendGoodsMessage(vinCode)
            }
          })
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      sendGoodsMessage(vinCode) {
        let that = this
        vocenOutboundScanCodeMessageFn({ code: '100', vinCode: vinCode ? vinCode : '' }).then(
          (res) => {
            console.log(res)
            if (res.code == 200) {
              console.log('res ------>', res)
              that.goodsOutbound(res.data.vinCode)
            } else if (res.code == 100) {
              that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
            }
          },
        )
      },
      //商品出库
      goodsOutbound(goodsVin) {
        this.$VoHttp.WAREHOUSE.apiWarehouseOperFacilitatorSelfOutBatch({
          goodsVin: goodsVin,
        })
          .then((res) => {
            console.log(res, 'res')
            let that = this
            // 都在库，校验通过
            if (res.data.code === 0) {
              vocenOutboundScanCodeMessageFn({
                code: '200',
                vinCode: goodsVin ? goodsVin : '',
              }).then((resVin) => {
                console.log(resVin)
                if (resVin.code == 200) {
                  console.log('res ------>', resVin)
                }
              })
            } else if (res.data.code === 1) {
              vocenOutboundScanCodeMessageFn({
                code: '300',
                vinCode: goodsVin ? goodsVin : '',
              }).then((resVin) => {
                console.log(resVin)
                if (resVin.code == 100) {
                  that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
                }
              })
            } else if (res.data.code === 2) {
              vocenOutboundScanCodeMessageFn({
                code: '300',
                vinCode: goodsVin ? goodsVin : '',
              }).then((resVin) => {
                console.log(resVin)
                if (resVin.code == 100) {
                  that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
                }
              })
            }
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      async vin() {
        this.showModalCancel = false
        if (!this.$checkIsApproveFn()) {
          this.$emit('updateApprove')
          return
        }
        let res = null
        // #ifdef APP-PLUS
        let that = this
        vocenScanCodeFn(20)
          .then((res) => {
            console.log(res)
            if (res.code == 100) {
              that.formData.content = ''
              this.$emit('updateshowHandle', true)
              return
            }
            let data = res.result
            if (data.indexOf('http') > -1) {
              if (data.split('=') && data.split('=').length && data.split('=')[1]) {
                // this.code = data.data.split('=')[1]
                that.formData.content = data.split('=')[1]
                that.handleInput()
              } else {
                that.$u.toast('未识别到内容，请重新扫描')
                that.code = ''
              }
            } else {
              // this.code = data.data
              that.formData.content = data
              that.handleInput()
            }
          })
          .catch((e) => {
            console.log(e, 123)
            that.$u.toast('未识别到内容，请重新扫描')
          })

        // #endif
        // #ifdef H5
        res = await chooseImageOcrByPromise({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album'],
          tip: '正在识别',
          apiUrl: '/v1/api/business/vehicle/scanningcode/warehousing',
        })
        if (!res || !res.data) return
        let data = JSON.parse(res.data)
        if (+data.code === 20001) {
          this.content = data.message
          this.showModalCancel = true
          // this.$u.toast('录入成功')
        } else if (+data.code === 20002) {
          // 20001  条形码对应商品已入库到【商品名称】库存中，不再重复入库。
          // 20002  识别码信息不全，请手动输入
          // 20003  未找到该条形码对应商品，请重新识别
          // 20004  服务商商品未发布，返回商品id
          this.$u.toast(data.message)
          this.formData.content = ''

          this.$emit('updateshowHandle', true)
        } else if (+data.code === 20003 || +data.code === 20005) {
          this.content = data.message
          this.showModalCancel = true
        } else if (+data.code === 20004) {
          this.$linkToEasy(
            `/pagesAgent/PublishProduct/ScanResult?id=${data.data.goodsId}&code=${data.data.goodsVin}`,
          )
        } else {
          this.$u.toast('当前网络不可用，请检查您的网络设置')
        }
        // #endif
      },
      // 手动上传
      async handleInput(content) {
        if (content) {
          this.formData.content = content
        }

        try {
          // this.formData.content = 'B02902'
          let data = await this.$VoHttp.apiBusinessVehicleHandloseWarehousing({
            goodsVin: this.formData.content,
          })
          console.log(data)
          if (!data || !data.data) return
          // 20001  条形码对应商品已入库到【商品名称】库存中，不再重复入库。
          this.$u.toast('录入成功')
          setTimeout(() => {
            this.closeHandler()
          }, 1500)
        } catch (e) {
          console.log(e)
          setTimeout(() => {
            this.closeHandler()
          }, 1500)
          if (+e.code === 20002) {
            // 20002  识别码信息不全，请手动输入
            // 20003  未找到该条形码对应商品，请重新识别
            // 20004  服务商商品未发布，返回商品id
            this.$u.toast(e.message)
            this.formData.content = ''
            this.$emit('updateshowHandle', true)
          } else if (+e.code === 20003 || +e.code === 20005) {
            this.content = e.message
            this.showModalCancel = true
          } else if (+e.code === 20004) {
            this.$linkToEasy(
              `/pagesAgent/PublishProduct/ScanResult?id=${e.data.goodsId}&code=${e.data.goodsVin}`,
            )
          } else {
            this.$u.toast(e.message || '识别失败')
          }
        }
      },
      goAccountBillFn() {
        let ids = JSON.stringify([5])
        this.$linkToEasy(`/pagesSupplier/UserCenter/Invoice/AccountBill?ids=${ids}`)
      },
      initFn() {
        let newVal = this.menuList.join(',')
        if (newVal.indexOf('功能区-上货') < 0) {
          this.functionList[0].show = false
        }
        if (newVal.indexOf('功能区-补货') < 0) {
          this.functionList[1].show = false
        }
        if (newVal.indexOf('功能区-订单') < 0) {
          this.functionList[2].show = false
        }
        if (newVal.indexOf('功能区-仓储') < 0) {
          this.functionList[3].show = false
        }
        if (newVal.indexOf('功能区-商品管理') < 0) {
          this.functionList[5].show = false
        }
        console.log('this.isSelf ------ ', this.isSelf)
        if (this.isSelf) {
          this.functionList[8].show = true
        }
      },
      goUrl(url) {
        if (!checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        this.$linkToEasy(url)
      },
      /**
       * 切换swiper
       */
      changeCurrent(e) {
        this.current = e.detail.current
      },
      nextPage(item) {
        if (!checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        delete uni['$VoPutProductForm']
        this.$linkToEasy(item.path)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .notice {
    width: 100%;
    padding-bottom: 32rpx;
    box-sizing: border-box;

    &-bg {
      border-radius: 16rpx;
      overflow: hidden;
      background: #fff;

      &__title {
        width: 100%;
        padding: 24rpx 18rpx;
        box-sizing: border-box;

        .title-img {
          width: 78rpx;
          height: 32rpx;
          margin-right: 10rpx;
        }

        .title-line {
          width: 2rpx;
          height: 24rpx;
          background: rgba(0, 0, 0, 0.08);
        }
      }

      &__agent {
        .agent-line {
          margin: auto !important;
        }

        .agent-padding {
          padding: 32rpx 24rpx;
          box-sizing: border-box;

          &__whole {
            width: 168rpx;
            height: 60rpx;
            margin-left: 20rpx;
            line-height: 60rpx;
            text-align: center;
            background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
            mix-blend-mode: normal;
            border-radius: 200rpx;
            color: #ffffff;
            font-size: 28rpx;
          }
        }
      }

      &__bottom {
        //height: 398rpx;
        padding: 0rpx 0 10rpx 24rpx;
        box-sizing: border-box;

        .bottom-swiper {
          height: 296rpx;
        }

        .bottom-scroll {
          height: 100%;
          //display: grid;
          //grid-template-columns: 96rpx 108rpx 96rpx 96rpx 96rpx;
          //grid-template-rows: 132rpx 132rpx;
          //grid-column-gap: 36rpx;
          //grid-row-gap: 32rpx;
          display: flex;
          flex-wrap: wrap;
          &__item {
            width: 96rpx;
            height: 132rpx;
            margin-right: 40rpx;
            margin-bottom: 32rpx;
            &:nth-child(5) {
              margin-right: 0;
            }
            &:nth-child(6) {
              margin-bottom: 0;
            }
            &:nth-child(7) {
              margin-bottom: 0;
            }
            &:nth-child(8) {
              margin-bottom: 0;
            }
            &:nth-child(9) {
              margin-bottom: 0;
            }
            &:nth-child(10) {
              margin-bottom: 0;
            }
          }

          &__img {
            width: 88rpx;
            height: 88rpx;
          }
        }

        .bottom-indicator {
          width: 32rpx;
          height: 6rpx;
          background: rgba(0, 0, 0, 0.15);
          border-radius: 20rpx;
          overflow: hidden;
          margin: 24rpx auto;

          &__slider {
            width: 16rpx;
            height: 6rpx;
            background: #ff5c26;
            border-radius: 20rpx;
            overflow: hidden;
          }
        }
      }
    }
  }

  .white-space__nowrap {
    white-space: nowrap;
  }
</style>
