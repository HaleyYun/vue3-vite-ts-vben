<template>
  <view v-if="showMap" class="container">
    <VoNav is-fixed is-have-more title="修理厂地图" @operationFn="$backFn">

      <block slot="operation">
        <view class="listBtn fz-28 m-r-28">列表</view>
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
    ></map>
    <!-- 标点对应状态说明 -->
    <view class="fixed check">
      <view v-for="item in tabList" :key="item.id" class="check-item" @click="changeType(item)">
        <block v-if="item.checkStatus === 0">
          <image class="check-item-icon" src="/static/common/map/map_icon_0.png" />
        </block>
        <block v-else-if="item.checkStatus === 1">
          <image class="check-item-icon" src="/static/common/map/map_icon_1.png" />
        </block>
        <block v-else-if="item.checkStatus === 4">
          <image class="check-item-icon" src="/static/common/map/map_icon_2.png" />
        </block>
        <view>{{ item.checkStatusStr }}</view>
      </view>
    </view>
    <!-- 底部悬浮区域 -->
    <view class="fixed bottom-box">
      <!-- 地区内修理厂数据 -->
      <view v-if="showBtn" class="census flex flex-justify-between">
        <view class="census-content">
          <view>所在修理厂总数：{{ areaData.total }}</view>
          <view>已绑定：{{ areaData.bindNum }}</view>
          <view>未绑定：{{ areaData.unbindNum }}</view>
        </view>
      </view>
      <!-- 底部悬浮按钮 -->
      <view v-if="showBtn" class="bottom-box__btn-bar bg-white">
        <view class="btn" @click="goTo('./InviteGarage')">邀请修理厂注册</view>
        <!-- TODO 权限不同，跳转页面不同，目前暂时为同一个页面 -->
        <view class="btn act" @click="goTo('/pagesChannelManager/GarageModule/CreateGarage')">
          新增修理厂
        </view>
        <!--        <block v-if="userInfo.roleCode === 'agent'">-->
        <!--          -->
        <!--        </block>-->
        <!--        <block v-else-if="userInfo.roleCode === 'channelManager'">-->
        <!--          <view class="btn act" @click="goTo('/pagesChannelManager/GarageModule/CreateGarage')"-->
        <!--            >新增修理厂</view-->
        <!--          >-->
        <!--        </block>-->
        <!--        <block v-else>-->
        <!--          <view class="btn act" @click="goTo('/pagesChannelManager/GarageModule/CreateGarage')"-->
        <!--            >新增修理厂</view-->
        <!--          >-->
        <!--        </block>-->
      </view>

      <u-transition v-else :show="show" mode="slide-up" @afterLeave="showBtn = true">
        <view class="transition">
          <view class="census flex flex-justify-between">
            <view class="census-content">
              <view>所在修理厂总数：{{ areaData.total }}</view>
              <view>已绑定：{{ areaData.bindNum }}</view>
              <view>未绑定：{{ areaData.unbindNum }}</view>
            </view>
          </view>
          <!-- 详情弹出层 -->
          <view class="detail bg-white">
            <view class="close flex flex-justify-between" @click="hideDetail">
              <view />
              <VoIcon :opacity="1" color="#373A4E" name="close-x" size="14" />
            </view>

            <view class="detail-title">
              <image
                :src="curData.storeUrl || '/static/default_avatar.png'"
                class="shrink icon-face"
              />
              <view class="name">{{ curData.storeName }}</view>
              <view class="shrink state-icon">
                <view v-if="curData.checkStatus === 1" class="state orange">
                  <VoIcon color="#FF9B05" name="success-fill" size="12" />
                  <view class="status-text2">待审核</view>
                </view>
                <view v-else-if="curData.checkStatus === 4" class="state green">
                  <VoIcon color="#26BF26" name="success-fill" size="12" />
                  <view class="status-text3">已认证</view>
                </view>
                <view v-else class="state grey">
                  <VoIcon :opacity="0.25" color="#000000" name="success-fill" size="12" />
                  <view>未认证</view>
                </view>
              </view>
            </view>

            <view class="fz-24 color-block-45 overTwoEllipsis m-t-24 m-b-8">
              {{ curData.areaCodeStr + curData.address }}
            </view>

            <view
              class="detail-contact fz-24 color-block-45 flex flex-vertical-c flex-justify-between p-b-32"
            >
              <view class="user-info" @click="callPhone">
                <view>{{ curData.contractName }}</view>
                <view class="flex flex-vertical-c">
                  <text class="m-r-28">{{ encryptPhone(curData.userName) }}</text>
                  <VoIcon :opacity="1" color="#155BD4" name="mobile-new" size="15" />
                </view>
              </view>
              <view v-if="curData.status === 0" class="btn" @click="goTo('./InviteGarage')"
                >去点亮</view
              >
              <view
                v-else-if="curData.checkStatus === 4"
                class="btn"
                @click="goTo('/pagesAgent/SubstituteOrder/SubstituteOrder?type=1')"
                >代客下单</view
              >
            </view>

            <view class="sign-bar">
              <view
                v-for="(item, index) in signList"
                :key="index"
                :class="{ act: curData.labelType.indexOf(item.val) != -1 }"
                class="sign"
                @click="changeSign(index)"
              >
                {{ item.name }}
              </view>
            </view>
          </view>
        </view>
      </u-transition>
      <!-- 底部安全区 -->
      <view class="safearea-box bg-white" />
    </view>
  </view>
</template>
<script>
  import util from '@/common/MapCoordinate'

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
        },
        // 区域内修理厂数据
        areaData: {
          total: 100, // 总数
          bindNum: 45, // 已认证
          unbindNum: 55, // 未认证
        },
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
        },
        sys: {},
        map: {},
        showMap: false,
      }
    },
    onLoad(options) {
      const res = uni.getSystemInfoSync()
      this.sys = res
      this.requestParams.licenseId = options.licenseId
      this.requestParams.inviterId = options.inviterId
      uni.getLocation({
        type: 'wgs84',
        success: async (res) => {
          console.log(res, '成功了')
          const { latitude, longitude } = res
          const result = util.transformFromWGSToGCJ(latitude, longitude)
          this.requestParams.latitude = result.latitude.toFixed(6)
          this.requestParams.longitude = result.longitude.toFixed(6)
          this.options.longitude = result.longitude.toFixed(6)
          this.options.latitude = result.latitude.toFixed(6)
          await this.getTabs()
          await this.getData()
          await this.getList()
        },
        fail: (ret) => {
          uni.showModal({
            title: '提示',
            content: '需要您开启定位授权，获取您的位置信息！',
            cancelText: '暂不开启',
            confirmText: '去开启',
            success: ({ confirm, cancel }) => {
              if (confirm) {
                // android平台
                if (uni.getSystemInfoSync().platform == 'android') {
                  var Intent = plus.android.importClass('android.content.Intent')
                  var Settings = plus.android.importClass('android.provider.Settings')
                  var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
                  var main = plus.android.runtimeMainActivity()
                  main.startActivity(intent) // 打开系统设置GPS服务页面
                }
                // ios平台
                if (uni.getSystemInfoSync().platform == 'ios') {
                  var UIApplication = plus.ios.import('UIApplication')
                  var application2 = UIApplication.sharedApplication()
                  var NSURL2 = plus.ios.import('NSURL')
                  var setting2 = NSURL2.URLWithString('App-Prefs:root=Privacy&path=LOCATION')
                  application2.openURL(setting2)
                  plus.ios.deleteObject(setting2)
                  plus.ios.deleteObject(NSURL2)
                  plus.ios.deleteObject(application2)
                }
              }
              // 用户取消前往开启定位服务
              if (cancel) {
                // do sth...
                uni.navigateBack()
              }
            },
          })
        },
      })
    },
    methods: {
      // 拨打电话
      encryptPhone(phone) {
        return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
      },
      // 获取数据统计
      async getData() {
        const { latitude, longitude, licenseId, inviterId } = this.requestParams
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGarageMapStatistical(
            {
              latitude,
              longitude,
              licenseId,
              inviterId,
            },
            { noLoading: true },
          )
          if (!data || !data.data) return
          console.log(data)
          if (+data.code === 20001) {
            this.areaData = data.data
          } else {
            uni.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      // 获取tabs
      async getTabs() {
        const { latitude, longitude, licenseId, inviterId } = this.requestParams
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGarageMapTab(
            {
              latitude,
              longitude,
              licenseId,
              inviterId,
            },
            { noLoading: true },
          )
          if (!data || !data.data) return
          if (+data.code === 20001) {
            this.tabList = data.data
          } else {
            uni.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      // 获取修理厂详情
      async getDetail(id) {
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGarageMapDetails({ id: id })
          console.log(data)
          if (!data || !data.data) return
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
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      // 获取修理厂marker列表
      async getList() {
        this.showMap = false
        const { latitude, longitude, licenseId, inviterId, checkStatus } = this.requestParams
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGarageMapList({
            latitude,
            longitude,
            licenseId,
            inviterId,
            checkStatus,
          })
          if (!data || !data.data) return
          console.log(data)
          if (+data.code === 20001) {
            let arr = []
            if (data.data.length > 0) {
              data.data.forEach((item, index) => {
                const { checkStatus, companyId, latitude, longitude } = item
                let iconPath = '/static/common/map/map_icon_0.png'
                if (checkStatus === 1) {
                  iconPath = '/static/common/map/map_icon_1.png'
                } else if (checkStatus === 4) {
                  iconPath = '/static/common/map/map_icon_2.png'
                }
                const obj = {
                  id: index,
                  companyId,
                  checkStatus,
                  latitude,
                  longitude,
                  iconPath,
                  rotate: 0, // 旋转度数
                  width: 20, //宽
                  height: 20, //高
                  alpha: 1, //透明度
                }
                // this.options.marker.concat(obj)
                arr.push(obj)
              })
              this.options.marker = [...arr]
              this.showMap = true
              this.$forceUpdate()
            } else {
              this.options.marker = []
              this.showMap = true
            }
          } else {
            uni.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
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
      /**
       * 点击地图标点事件
       * @param e 当前点击参数
       */
      async clickMarker(e) {
        const cur = e.detail.markerId
        let companyId = ''
        this.options.marker.forEach((item) => {
          if (item.id === cur) {
            item.width = item.height = 42
            companyId = item.companyId
          } else {
            item.width = item.height = 20
          }
        })
        await this.getDetail(companyId)
        const list = this.options.marker
        this.options.marker = []
        setTimeout(() => {
          this.options.marker = list
          this.show = true
          this.showBtn = false
        }, 100)
      },

      /**
       * 隐藏详情后
       */
      hideDetail() {
        this.show = false
        this.options.marker.forEach((item) => {
          item.width = item.height = 20
        })
        const list = this.options.marker
        this.options.marker = []
        setTimeout(() => {
          console.log('zxc')
          this.options.marker = list
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
        this.$linkToEasy(url)
      },
      /**
       * 切换地图标点类型
       */
      changeType(item) {
        this.requestParams.type = item.checkStatus
        this.getData()
      },
      /**
       * 拨打电话
       */
      callPhone() {
        const phone = this.curData.userName
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
  //标点对应状态说明
  .check {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 96rpx;
    top: 126rpx;
    right: 32rpx;
    padding-top: 22rpx;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 8rpx;
    box-shadow: 0 4rpx 16rpx rgba(34, 40, 75, 0.15);
    backdrop-filter: blur(8rpx);
    &-item {
      font-weight: 500;
      font-size: 24rpx;
      text-align: center;
      margin-bottom: 16rpx;
      &-icon {
        width: 40rpx;
        height: 40rpx;
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
        margin-right: 14rpx;
        margin-bottom: 30rpx;
      }

      .icon-face {
        width: 48rpx;
        height: 48rpx;
        border-radius: 8rpx;
      }

      &-title {
        display: flex;
        align-item: center;
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
            color: $v-success;
            background-color: $v-success-btn-disabled;
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
