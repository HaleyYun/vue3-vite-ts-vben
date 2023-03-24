<template>
  <view v-if="showMap" class="container">
    <VoNav is-fixed is-have-more title="点亮修理厂">
      <block slot="operation">
        <view class="listBtn fz-28 m-r-28" @click="goList">列表</view>
      </block>
    </VoNav>
    <view :style="{ 'z-index': show ? 1000 : -1 }" class="mark" @click="hideDetail" />
    <map
      id="map"
      ref="map"
      :latitude="options.latitude"
      :longitude="options.longitude"
      :markers="options.marker"
      :scale="options.scale"
      class="map"
      style="width: 100%; height: 100%"
      @markertap="clickMarker"
      @updated="updated"
    ></map>
    <!-- 标点对应状态说明 -->
    <view class="fixed check">
      <view
        class="fz-28 color-block font-weight-500 flex m-b-16"
        @click="$linkToEasy('/pagesCommon/LightUp/ChooseArea')"
      >
        当前城市：{{ requestParams.districtName }}
        <view class="arrow" />
      </view>
      <view class="fz-28 color-block font-weight-500">
        {{ areaData[0].registerStatusStr }}：{{ areaData[0].count }}
      </view>
      <view class="check-item fz-24">
        <view class="flex flex-vertical-c">
          <view class="circle blue" />
          <view> {{ areaData[2].registerStatusStr }}：{{ areaData[2].count }} </view>
        </view>
        <view class="flex flex-vertical-c">
          <view class="circle yellow" />
          <view> {{ areaData[3].registerStatusStr }}：{{ areaData[3].count }} </view>
        </view>
        <view class="flex flex-vertical-c">
          <view class="circle gray" />
          <view> {{ areaData[1].registerStatusStr }}：{{ areaData[1].count }} </view>
        </view>
      </view>
    </view>
    <!-- 底部悬浮区域 -->
    <view class="fixed bottom-box">
      <!-- 地区内修理厂数据 -->
      <!--      <view v-if="showBtn" class="census flex flex-justify-between">-->
      <!--        <view class="census-content">-->
      <!--          <view v-for="(item, index) of areaData" :key="index"-->
      <!--            >{{ item.registerStatusStr }}：{{ item.count }}</view-->
      <!--          >-->
      <!--        </view>-->
      <!--      </view>-->
      <u-transition :show="show" mode="slide-up" @afterLeave="showBtn = true">
        <view class="transition p-b-safe-area bg-white">
          <view class="detail">
            <view class="close flex flex-justify-between" @click="hideDetail">
              <view />
              <VoIcon :opacity="1" color="#373A4E" name="close-x" size="14" />
            </view>
            <view class="detail-title">
              <image
                :src="curData.storeUrl || '/static/default_avatar.png'"
                class="shrink icon-face"
              />
              <view class="name">{{ curData.companyName }}</view>
              <view class="shrink state-icon">
                <view v-if="+curData.registerStatus === 0" class="state grey">
                  <VoIcon :opacity="0.25" color="#000000" name="success-fill" size="12" />
                  <view>未点亮</view>
                </view>
                <view v-else class="state green">
                  <VoIcon color="#26BF26" name="success-fill" size="12" />
                  <view class="status-text3">已点亮</view>
                </view>
              </view>
            </view>
            <view class="fz-24 color-block-45 overTwoEllipsis m-t-24 m-b-8">
              <text v-if="curData.distance">
                <block v-if="+curData.distance < 1000">{{ curData.distance }}m丨</block>
                <block v-else>{{ (curData.distance / 1000).toFixed(2) }}km丨</block>
              </text>
              <text>{{ curData.province + curData.city + curData.area + curData.address }}</text>
            </view>
            <view
              class="detail-contact fz-24 color-block-45 flex flex-vertical-c flex-justify-between p-b-32 m-t-32"
            >
              <view class="user-info">
                <view class="fz-28 color-block">{{ curData.contractName }}</view>
                <view
                  v-if="curData.registerStatus && curData.phoneNumber"
                  class="flex flex-vertical-c"
                  @click="callPhone"
                >
                  <text class="m-r-28">{{ curData.phoneNumber }}</text>
                  <image class="icon-56" src="/static/common/map/mobile.png" />
                </view>
              </view>
              <view
                v-if="
                  userinfo.platformCode === 'agent' &&
                  +curData.registerStatus === 1 &&
                  curData.isBuy
                "
                class="btn"
                @click="
                  goTo(
                    `/pagesAgent/GoodsList/GoodsList?companyId=${curData.companyId}&salesArea=${curData.areaCode}`,
                  )
                "
              >
                代客下单
              </view>
              <view v-else class="btn" @click="openGps">去导航</view>
            </view>
            <view v-if="+curData.registerStatus === 1" class="sign-bar">
              <block v-for="(item, index) in signList">
                <view
                  v-if="curData.labelType && curData.labelType.length"
                  :key="index"
                  :class="{ act: curData.labelType.indexOf(item.val) != -1 }"
                  class="sign"
                  @click="changeSign(index)"
                >
                  {{ item.name }}
                </view>
                <view v-else :key="index" class="sign" @click="changeSign(index)">
                  {{ item.name }}
                </view>
              </block>
            </view>
          </view>
        </view>
      </u-transition>
    </view>
  </view>
</template>
<script>
import {hideLoading, showLoading, getLocation, openGpsAppFn} from '@/common/helper'
  import store from '@/store'

  export default {
    name: 'Demo',
    data() {
      return {
        // 展示详情抽屉
        show: false,
        // 展示底部按钮
        showBtn: true,
        requestParams: {
          checkStatus: null, // 认证状态
          companyId: null, // 地图标点id， 获取详情时使用
          licenseId: '',
          inviterId: '',
          cityCode: '',
          cityName: '',
          districtName: '',
          districtCode: '',
        },
        // 区域内修理厂数据
        areaData: [],
        // 当前选中修理厂数据
        curData: {},
        tabList: [], // 状态筛选按钮
        curTab: 0, // 当前选中状态
        // 标签按钮
        signList: [
          {
            name: '目标客户',
            val: 1,
            selected: false,
          },
          {
            name: '汽车美容',
            val: 2,
            selected: false,
          },
          {
            name: '补胎',
            val: 3,
            selected: false,
          },
        ],
        curSign: 0, // 当前选中标签
        options: {
          // 地图属性参数
          latitude: 39.908692, //纬度
          longitude: 116.397477, //经度
          scale: 13, //缩放级别
          // 标记点属性
          marker: [],
          iconPath: '/static/common/map/location.png', //显示的图标
          rotate: 0, // 旋转度数
          width: 36, //宽
          height: 75, //高
          //  title:'我在这里',//标注点名
          alpha: 1, //透明度
          label: {
            //为标记点旁边增加标签   //因背景颜色H5不支持
            color: 'red', //文本颜色
          },
          callout: {
            //自定义标记点上方的气泡窗口 点击有效
            content: '广州塔', //文本
            color: '#ffffff', //文字颜色
            fontSize: 14, //文本大小
            borderRadius: 15, //边框圆角
            borderWidth: '10',
            bgColor: '#e51860', //背景颜色
            display: 'ALWAYS', //常显
          },
        },
        sys: {},
        map: {},
        showMap: false,
        userinfo: {},
      }
    },
    async onLoad(options) {
      this.sys = uni.getSystemInfoSync()
      this.userinfo = (await this.$store.getters['user/getUserInfo']()) || {}
      console.log(this.userinfo)
      this.requestParams.licenseId = options.licenseId
      this.requestParams.inviterId = options.inviterId
      try {
        let res = await getLocation()
        if (!res || res === '取消了') {
          this.$backFn()
          return
        }
        const rec = await this.$VoHttp.apiAreaProvinceSub({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        console.log(rec)
        this.requestParams = Object.assign(this.requestParams, rec.data)
        uni.$off('addressFn')
        uni.$on('addressFn', (res) => {
          console.log(res)
          this.requestParams.districtName = res.name
          this.requestParams.districtCode = res.code
          this.codeGetMarker(res.code)
          this.getData()
        })
        showLoading('页面加载中')
        const { longitude, latitude } = res
        this.requestParams.latitude = latitude
        this.requestParams.longitude = longitude
        this.options.latitude = latitude
        this.options.longitude = longitude
        await this.getData()
        await this.getList()
      } catch (e) {
        console.log(e)
        this.$backFn()
      }
      hideLoading()
    },
    methods: {
      codeGetMarker(areaCode) {
        showLoading()
        this.$VoHttp
          .apiImportGarageMapByAreaCode({ areaCode })
          .then((res) => {
            console.log(res)
            const { data, latitude, longitude } = res.data
            this.updateMarker(data)
            this.options.latitude = latitude
            this.options.longitude = longitude
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络连接出错')
          })
          .finally(() => {
            hideLoading()
          })
      },
      // 返回列表
      goList() {
        let url = '/pagesEngineer/Spread/SpreadList?redirectTo=1'
        if (this.userInfo.platformCode === 'agent') {
          url = '/pagesAgent/TokerDistrict/MyGarage'
        }
        this.$linkToEasy(url)
      },
      // 拨打电话
      encryptPhone(phone) {
        return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
      },
      // 获取数据统计
      async getData() {
        const { latitude, longitude, licenseId, inviterId } = this.requestParams
        try {
          const data = await this.$VoHttp.apiImportGarageMapTab(
            {
              latitude,
              longitude,
              licenseId,
              inviterId,
              areaCode: this.requestParams.districtCode || null,
            },
            { noLoading: true },
          )
          console.log(data, '==========')
          if (!data || !data.data) {
            uni.navigateBack()
            return
          }
          if (+data.code === 20001) {
            console.log(data, '999999999999')
            this.areaData = data.data
          } else {
            uni.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
          uni.navigateBack()
        }
      },
      // 获取tabs
      // async getTabs() {
      //   const { latitude, longitude, licenseId, inviterId } = this.requestParams
      //   try {
      //     const data = await this.$VoHttp.apiImportGarageMap({
      //       latitude,
      //       longitude
      //     },{noLoading:true})
      //     if (+data.code === 20001) {
      //       this.tabList = data.data
      //     } else {
      //       uni.$u.toast(data.message)
      //     }
      //   } catch (e) {
      //     console.log(e)
      //     this.$u.toast(e.message || '网络请求失败')
      //   }
      // },
      // 获取修理厂详情
      async getDetail(id) {
        try {
          const { latitude, longitude } = this.requestParams
          const data = await this.$VoHttp.apiImportGarageDetail(
            { id, latitude, longitude },
            { noLoading: true },
          )
          console.log(data)
          if (!data || !data.data) {
            uni.navigateBack()
            return
          }
          if (+data.code === 20001) {
            this.curData = data.data
            if (data.data.labelType) {
              let selectSign = data.data.labelType.split(',')
              selectSign.forEach((item) => {
                this.signList[Number(item) - 1].selected = true
              })
            }
          } else {
            uni.$u.toast(data.message)
            uni.navigateBack()
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
          uni.navigateBack()
        }
      },
      // 获取修理厂marker列表
      async getList() {
        this.showMap = false
        const { latitude, longitude, licenseId, inviterId, checkStatus } = this.requestParams
        try {
          const data = await this.$VoHttp.apiImportGarageMap(
            {
              latitude,
              longitude,
              licenseId,
              inviterId,
              checkStatus,
            },
            { noLoading: true },
          )
          if (!data || !data.data) {
            uni.navigateBack()
            return
          }
          console.log(data)
          if (+data.code === 20001) {
            if (data.data.length > 0) {
              this.updateMarker(data.data)
            } else {
              this.options.marker = []
              this.showMap = true
            }
          } else {
            uni.$u.toast(data.message)
            uni.navigateBack()
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
          uni.navigateBack()
        }
        // const map = uni.createMapContext('map', this)
        // this.map = map
        // map.moveToLocation({
        //   latitude: this.requestParams.latitude,
        //   longitude: this.requestParams.longitude,
        //   success: () => {
        //     console.log("渲染完毕");
        //     arr.forEach(item => {
        //       map.addMarkers(item)
        //     })
        //   }
        // })
        // console.log(arr);
        // this.$forceUpdate()
      },
      updateMarker(data) {
        let arr = []
        const { checkStatus } = this.requestParams
        this.options.marker = []
        let objs = {
          id: 'center',
          longitude: this.requestParams.longitude,
          latitude: this.requestParams.latitude,
          iconPath: '/static/common/map/location.png', //显示的图标
          rotate: 0, // 旋转度数
          width: 36, //宽
          height: 75, //高
          // title:'我在这里',//标注点名
          // label: {
          //   //为标记点旁边增加标签   //因背景颜色H5不支持
          //   color: 'red', //文本颜色
          // },
          // alpha: 0.5, // 透明度
          callout: {
            //自定义标记点上方的气泡窗口 点击有效
            content: '我的位置', //文本
            color: '#262626', //文字颜色
            fontSize: 14, //文本大小
            borderRadius: 15, //边框圆角
            borderWidth: '10',
            bgColor: '#ffffff', //背景颜色
            display: 'ALWAYS', //常显
          },
        }
        arr.push(objs)
        setTimeout(() => {
          data.forEach((item, index) => {
            const { registerStatus, companyId, latitude, longitude } = item
            let iconPath = '/static/common/map/lightUp_1.png'
            if (+registerStatus === 1) {
              iconPath = '/static/common/map/lightUp_2.png'
            } else if (+registerStatus === 0) {
              iconPath = '/static/common/map/lightUp_0.png'
            }
            const obj = {
              id: item.id,
              companyId,
              checkStatus,
              latitude,
              longitude,
              iconPath,
              rotate: 0, // 旋转度数
              width: 36, //宽
              height: 36, //高
              alpha: 1, //透明度
            }
            // this.options.marker.concat(obj)
            arr.push(obj)
          })
          this.options.marker = [...arr]
          this.showMap = true
          this.$forceUpdate()
        }, 100)
      },
      /**
       * 点击地图标点事件
       * @param e 当前点击参数
       */
      async clickMarker(e) {
        console.log(e)
        showLoading()
        const cur = e.detail.markerId
        let companyId = ''
        this.options.marker.forEach((item) => {
          if (item.id == cur) {
            console.log(item.id, '8888888888', cur)
            item.width = item.height = 50
            companyId = item.id
          } else {
            if (item.id === 'center') return
            item.width = item.height = 36
          }
        })
        if (!companyId) {
          hideLoading()
          return
        }
        await this.getDetail(companyId)
        const list = this.options.marker
        this.options.marker = []
        setTimeout(() => {
          this.options.marker = list
          this.show = true
          this.showBtn = false
          hideLoading()
        }, 100)
      },
      updated() {
        console.log('地图更新了')
      },
      /**
       * 隐藏详情后
       */
      hideDetail() {
        this.show = false
        uni.showLoading({ title: '加载中' })
        this.options.marker.forEach((item) => {
          if (item.id === 'center') return
          item.width = item.height = 36
        })
        const list = this.options.marker
        this.options.marker = []

        setTimeout(async () => {
          console.log('zxc')
          this.options.marker = list
          uni.hideLoading()
        }, 100)
      },
      /**
       * 切换标签
       */
      async changeSign(index) {
        let arr = []
        let val = this.signList[index].val + ''
        if (this.curData.labelType) {
          arr = this.curData.labelType.split(',')
          if (arr.indexOf(val) != -1) {
            let i = arr.indexOf(val)
            arr.splice(i, 1)
          } else {
            arr.push(val)
          }
        } else {
          arr.push(val)
        }
        let param = {
          companyId: this.curData.companyId,
          licenseId: this.requestParams.licenseId,
          operator: this.requestParams.inviterId,
          labelType: arr.length ? arr.join(',') : '',
        }
        console.log(param)
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGarageLabelSave(param)
          if (!data || !data.data) return
          this.curData.labelType = arr.length ? arr.join(',') : ''
        } catch (e) {
          console.log(e)
        }
      },
      /**
       * 底部跳转按钮
       */
      goTo(url) {
        this.$storage.set('garageArea', this.curData.areaCode || '')
        this.$linkToEasy(url)
      },
      openGps() {
        openGpsAppFn(Number(this.curData.latitude),Number(this.curData.longitude),this.curData.companyName)

      },
      /**
       * 切换地图标点类型
       */
      changeType(item) {
        return
        this.requestParams.type = item.checkStatus
        this.getData()
      },
      /**
       * 拨打电话
       */
      callPhone() {
        const phone = this.curData.phoneNumber
        this.$cellPhone(String(phone))
      },
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    color: rgba(0, 0, 0, 0.85);
  }
  .mark {
    position: fixed;
    width: 100vw;
    height: 70vh;
    left: 0;
    top: 0;
  }
  // 列表按钮样式
  .listBtn {
    color: $v-c0-65;
    line-height: 48rpx;
  }
  .map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
  // 固定定位
  .fixed {
    position: fixed;
  }
  .icon-56 {
    width: 56rpx;
    height: 56rpx;
  }
  //标点对应状态说明
  .check {
    display: flex;
    flex-direction: column;
    width: 686rpx;
    top: 106rpx;
    left: 32rpx;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 8rpx;
    box-shadow: 0 4rpx 16rpx rgba(34, 40, 75, 0.15);
    backdrop-filter: blur(8rpx);
    padding: 22rpx 16rpx;
    .arrow {
      width: 0;
      height: 0;
      border: 10rpx solid transparent;
      border-top-color: #373a4e;
      margin-bottom: 4rpx;
      margin-left: 16rpx;
      align-self: flex-end;
    }
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 16rpx;
      //padding: 16rpx 0;
      padding-right: 24rpx;
      box-sizing: border-box;
      font-weight: 400;
      font-size: 24rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      .circle {
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        margin-right: 8rpx;
        &.blue {
          background: #0d66ff;
        }
        &.yellow {
          background: #ff9b05;
        }
        &.gray {
          background: #8c8c8c;
        }
      }
    }
  }
  // 底部信息区
  .bottom-box {
    width: 100%;
    left: 0;
    bottom: 0;
    //地区内修理厂数据
    .census {
      width: 100%;
      font-weight: 400;
      font-size: 28rpx;
      margin-bottom: 32rpx;
      &-content {
        padding: 24rpx 16rpx;
        margin-right: 32rpx;
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 8rpx;
        box-shadow: 0 4rpx 16rpx rgba(34, 40, 75, 0.15);
        backdrop-filter: blur(8rpx);
      }
    }
    .census::before {
      content: '';
      display: block;
      width: 2rpx;
      height: 2rpx;
    }
    // 底部按钮
    &__btn-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 32rpx;
      text-align: center;
      color: #ff5319;
      font-weight: 400;
      font-size: 32rpx;
      .btn {
        width: 325rpx;
        height: 92rpx;
        box-sizing: border-box;
        line-height: 92rpx;
        border: 1px solid #ff7a4d;
        border-radius: 48rpx;
        align-self: flex-end;
      }
      .btn.act {
        color: #fff;
        background-color: #ff5319;
        border-color: #ff5319;
      }
    }
    // 底部详情弹窗
    .detail {
      padding: 20rpx 32rpx;
      .close {
        margin-bottom: 30rpx;
      }

      .icon-face {
        width: 48rpx;
        height: 48rpx;
        border-radius: 8rpx;
      }

      &-title {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 32rpx;
        .shrink {
          flex-shrink: 0;
        }
        .name {
          margin-left: 16rpx;
          margin-right: 8rpx;
        }
        .state {
          height: 36rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 6rpx;
          padding-right: 16rpx;
          font-size: 20rpx;
          border-radius: 200rpx;
          &.grey {
            background-color: #f7f7f8;
            color: rgba(0, 0, 0, 0.25);
          }
          &.orange {
            color: #ff9b05;
            background-color: #fff5e5;
          }
          &.green {
            color: #00b359;
            background-color: #d9faea;
          }
          &.red {
            color: #f45f70;
            background: #feecee;
          }
        }
      }

      &-contact {
        border-bottom: 2rpx solid #f7f7f8;
        .user-info {
          line-height: 150%;
        }
        .btn {
          width: 160rpx;
          height: 56rpx;
          line-height: 56rpx;
          font-size: 24rpx;
          text-align: center;
          color: #ff5319;
          border: 1px solid #ff7a4d;
          border-radius: 30px;
        }
      }

      .sign-bar {
        padding: 24rpx 0rpx;
        display: flex;
        align-items: center;
        overflow: scroll;
        .sign {
          padding: 0 16rpx;
          flex-shrink: 0;
          font-size: 24rpx;
          color: rgba(0, 0, 0, 0.45);
          background-color: #f7f7f8;
          border-radius: 24rpx;
          margin-right: 16rpx;
          &.act {
            background-color: #e50012;
            color: #fff;
          }
        }
        .sign:nth-last-of-type(1) {
          margin-right: 0;
        }
      }
    }
  }
</style>
