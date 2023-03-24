<template>
  <!--  <view class="wrap" :style="{ overflow: bottom === 0 ? 'hidden' : 'auto' }">-->
  <view :style="{ overflow: 'hidden' }" class="wrap">
    <VoNav is-fixed is-have-more>
      <template #title>
        <view class="flex flex-vertical-c flex-justify-c">
          <VoIcon v-if="!hideIcon" :size="28" name="clock-new" />
          <view class="m-l-8">{{ title }}</view>
        </view>
      </template>
    </VoNav>
    <map
      :latitude="options.latitude"
      :longitude="options.longitude"
      :markers="options.marker"
      class="wrap-map"
      @markertap="clickMarker"
    >
    </map>
    <view
      id="drag_card"
      :class="isAnimate ? 'transition' : ''"
      :style="'bottom:' + bottom + 'px;'"
      class="card"
      @touchend="cardMoveEndFn"
      @touchstart="cardMoveStartFn"
      @touchmove.stop.prevent="cardMoveFn"
    >
      <view class="card-content">
        <view class="card-title flex flex-vertical-c flex-justify-between m-b-16">
          <view class="fz-32 font-weight-500">{{ cardInfo.storeName }}</view>
          <view class="icon-map flex flex-vertical-c fz-24" @click="openGPSApp">
            <VoIcon :size="14" class="m-r-6 m-t-2" color="#0D66FF" name="plane" />
            <text>导航</text>
          </view>
        </view>
        <view class="fz-24 color-block-65 overTwoEllipsis">{{ cardInfo.address }}</view>
        <view class="fun-btn-bar m-t-24 flex text-center fz-24 color-block-65">
          <view
            class="fun-btn-bar-item border-r flex1 flex flex-vertical-c flex-justify-c"
            @click="callPhone"
          >
            <VoIcon :size="18" class="m-r-6" color="#595959" name="mobile-new" />
            <text>拨打电话</text>
          </view>
          <view class="fun-btn-bar-item flex1 flex flex-vertical-c flex-justify-c" @click="goImUrl">
            <VoIcon :size="18" class="m-r-6" color="#595959" name="smile-m" />
            <text>发消息</text>
          </view>
        </view>
      </view>
    </view>

    <view
      id="drag_content"
      :class="isAnimate ? 'transition' : ''"
      :style="{
        top: dragContentParam.top + 'px',
        opacity: bottom / 150,
      }"
      class="drag-content"
    >
      <!--    <view-->
      <!--      id="drag_content"-->
      <!--      :class="isAnimate ? 'transition' : ''"-->
      <!--      :style="{-->
      <!--        bottom: bottom - fixedTitleParams.titleH + 'px',-->
      <!--        opacity: bottom / 150,-->
      <!--      }"-->
      <!--      class="drag-content"-->
      <!--    >-->
      <view :style="{ height: dragContentParam.height + 'px' }" class="drag-content-box">
        <!-- 服务项目 -->
        <view v-if="contentInfo.serviceInfo.type" class="drag-content-item">
          <view class="font-weight-500 color-block fz-32 m-b-24">服务项目</view>
          <view class="flex flex-vertical-c">
            <text v-if="contentInfo.serviceInfo.type === 1" class="word-sign m-r-18 fz-24">
              安装
            </text>
            <text
              v-else-if="contentInfo.serviceInfo.type === 2"
              class="word-sign green m-r-18 fz-24"
            >
              回收
            </text>
            <text
              v-else-if="contentInfo.serviceInfo.type === 3"
              class="word-sign yellow m-r-18 fz-24"
            >
              售后
            </text>
            <text class="fz-28 font-weight-500 color-block">
              {{ contentInfo.serviceInfo.name }}
            </text>
          </view>
          <view class="cell">
            <text>服务金额：</text>
            <view class="cell-box">
              <text style="color: #ee0a24">{{ contentInfo.serviceInfo.price }}元</text>
            </view>
          </view>
          <view class="cell">
            <text>上门时间：</text>
            <view class="cell-box">
              <text>{{ contentInfo.serviceInfo.time }}</text>
              <text class="m-l-16 color-block">修改</text>
            </view>
          </view>
          <view v-if="contentInfo.serviceInfo.type === 3" class="cell">
            <text>上门指导：</text>
            <view class="cell-box">
              <text>{{ contentInfo.serviceInfo.tips }}</text>
            </view>
          </view>
        </view>

        <!-- 旧机信息 -->
        <view v-if="contentInfo.oldInfo.length" class="drag-content-item">
          <view class="font-weight-500 color-block fz-32 m-b-24">旧机信息</view>
          <view class="big-img image-box" @click="choseImg(0, contentInfo.oldInfo[0])">
            <image :src="contentInfo.oldInfo[0]" class="img-item" />
            <text>发动机识别号</text>
          </view>
          <view class="image-box">
            <view class="image-box-item" @click="choseImg(1, [contentInfo.oldInfo[1]])">
              <image :src="contentInfo.oldInfo[1]" class="img-item" />
              <text>进气端</text>
            </view>
            <view class="image-box-item" @click="choseImg(2, [contentInfo.oldInfo[2]])">
              <image :src="contentInfo.oldInfo[2]" class="img-item" />
              <text>排气端</text>
            </view>
            <view class="image-box-item" @click="choseImg(3, [contentInfo.oldInfo[3]])">
              <image :src="contentInfo.oldInfo[3]" class="img-item" />
              <text>正时端</text>
            </view>
            <view class="image-box-item" @click="choseImg(4, [contentInfo.oldInfo[4]])">
              <image :src="contentInfo.oldInfo[4]" class="img-item" />
              <text>曲后端</text>
            </view>
          </view>
        </view>

        <!-- 故障信息 -->
        <view v-if="contentInfo.brokenInfo.picList.length" class="drag-content-item">
          <view class="font-weight-500 color-block fz-32 m-b-24">故障信息</view>
          <view v-if="contentInfo.brokenInfo.descVioce.audio" class="fz-14 color-block">
            <view>故障描述：</view>
            <VoAudioVoice :info="contentInfo.brokenInfo.descVioce" />
          </view>
          <view v-else class="fz-14 color-block">
            <view>故障描述：</view>
            <view>{{ contentInfo.brokenInfo.desc }}</view>
          </view>
          <view>
            <view class="fz-14 color-block">故障图片：</view>
            <view class="image-box">
              <view
                v-for="(item, index) in contentInfo.brokenInfo.picList"
                :key="index + '1'"
                class="image-box-item m-t-16"
                @click="choseImg(index, contentInfo.brokenInfo.picList)"
              >
                <image :src="item" class="img-item" />
              </view>
              <view
                v-for="(item, index) in contentInfo.brokenInfo.videoList"
                :key="index + '2'"
                class="image-box-item m-t-16 video-box"
                @click="choseVideo(item)"
              >
                <image class="play" src="/static/common/play.png" />
                <image :src="item.poster" class="img-item" />
              </view>
            </view>
          </view>
        </view>

        <!-- 订单信息 -->
        <view v-if="contentInfo.orderInfo.orderNo" class="drag-content-item">
          <view class="">订单信息</view>
          <view class="cell">
            <text>订单编号：</text>
            <view class="cell-box">
              <text>{{ contentInfo.orderInfo.orderNo }}</text>
              <text
                class="m-l-16"
                style="color: #0d66ff"
                @click="copyThis(contentInfo.orderInfo.orderNo)"
              >
                复制
              </text>
            </view>
          </view>
          <view class="cell">
            <text>下单时间：</text>
            <view class="cell-box">
              <text>{{ contentInfo.orderInfo.createTime }}</text>
            </view>
          </view>
          <view class="cell">
            <text>接单时间：</text>
            <view class="cell-box">
              <text>{{ contentInfo.orderInfo.uodateTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view id="footer" class="footer">
      <template v-if="origin === 1">
        <view class="footer-btn-bar">
          <view class="footer-btn m-r-32">取消接单</view>
          <view class="footer-btn act">开始安装</view>
        </view>
      </template>
      <template v-else-if="origin === 2">
        <view class="footer-btn-bar">
          <view class="footer-btn">取消接单</view>
        </view>
      </template>
      <template v-else-if="origin === 3">
        <view class="footer-btn-bar">
          <view class="footer-btn m-r-32">取消接单</view>
          <view class="footer-btn act">提交上门结果</view>
        </view>
      </template>
      <view class="safearea-box" />
    </view>
    <EraPreviewVideo ref="EraPreviewVideo" :poster="poster" :videoSrc="videoSrc" />
  </view>
</template>

<script>
  export default {
    name: 'DemoMap',
    components: {},

    data() {
      return {
        title: '',
        hideIcon: false, // 是否隐藏title的icon
        origin: 1, // 来源 安装订单；回收订单；售后订单；位置轨迹
        sys: {}, //系统参数
        bottom: 0, // 定位参数
        dragCardParams: {
          // 可拖拽卡片区域参数
          offsetHeight: 0,
          height: 0,
        },
        dragContentParam: {
          // 拖拽展示内容参数
          top: 0,
          start: 0,
          height: 0,
          offsetHeight: 0,
        },
        fixedTitleParams: {
          // 底部按钮区域参数
          titleH: 45,
        },
        // 地图参数
        options: {
          // 地图属性参数
          latitude: 23.106574, //纬度
          longitude: 113.324587, //经度
          scale: 13, //缩放级别
          // 标记点属性
          marker: [
            {
              state: 1,
              id: 0,
              latitude: 23.13065, //纬度
              longitude: 113.3274, //经度
              iconPath: '/static/common/map/map_icon_0.png', //显示的图标
              rotate: 0, // 旋转度数
              width: 20, //宽
              height: 20, //高
              alpha: 1, //透明度
            },
            {
              id: 1234597,
              latitude: 23.106574, //纬度
              longitude: 113.324587, //经度
              iconPath: '/static/common/map/map_icon_1.png', //显示的图标
              rotate: 0, // 旋转度数
              width: 20, //宽
              height: 20, //高
              //  title:'我在这里',//标注点名
              alpha: 1, //透明度
              //      label:{//为标记点旁边增加标签   //因背景颜色H5不支持
              //   color:'red',//文本颜色
              //      },
              // callout: {//自定义标记点上方的气泡窗口 点击有效
              //   content: '广州塔',//文本
              //   color: '#ffffff',//文字颜色
              //   fontSize: 14,//文本大小
              //   borderRadius: 15,//边框圆角
              //   borderWidth: '10',
              //   bgColor: '#e51860',//背景颜色
              //   display: 'ALWAYS',//常显
              // },
            },
            {
              id: 2,
              latitude: 23.1338, //纬度
              longitude: 113.33052, //经度
              iconPath: '/static/common/map/map_icon_2.png', //显示的图标
              rotate: 0, // 旋转度数
              width: 20, //宽
              height: 20, //高
              alpha: 1, //透明度
            },
          ],
        },
        start: 0, // 拖拽起始位置
        isAnimate: false, // 是否动画
        footerH: 0, // 底部按钮区高度
        videoSrc: '', // 视频链接
        poster: '/static/demo/IMG_3839.JPG', // 视频海报
        // 拖拽卡片数据
        cardInfo: {
          storeName: '汽修厂名字',
          phone: 110, // 汽修厂电话,
          imData: {
            // 聊天室数据
            shopUserId: '',
            type: 0,
            note: 'shopName',
            platformCode: 'platformCode',
          },
          address:
            '郑州市-金水区-龙子湖街道正商木华广场A座正商木华3号楼A座7楼郑州市-金水区-龙子湖街道正商木华广场A座正商木华3号楼A座7楼',
        },
        // 拖拽显示内容数据
        contentInfo: {
          // 服务项目
          serviceInfo: {
            type: 1, //服务类型 暗转、回收、售后
            price: 100, // 服务金额
            time: '2022-06-10  09:00-12:00', // 上门时间
            tips: '需要上传发动机、水泵图片', // 上门指导
            name: '江陵动力发动机-B15售后', // 服务名称
          },
          // 故障信息
          brokenInfo: {
            desc: '发动机漏水，打不着火了发动机漏水，打不着火了发动机漏水，打不着火了发动机漏水，打不着火了发动机漏水，打不着火了', // 故障描述
            descVioce: {
              // 语音信息
              duration: 120,
              audio: [
                'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
              ],
            },
            // 故障图片
            picList: [
              '/static/demo/IMG_3839.JPG',
              '/static/demo/IMG_3839.JPG',
              '/static/demo/IMG_3839.JPG',
            ],
            // 故障视频
            videoList: [
              {
                type: 'video',
                src: 'https://www.runoob.com/try/demo_source/movie.mp4',
                poster: '/static/demo/IMG_3839.JPG',
              },
            ],
          },
          // 旧机信息
          oldInfo: [
            '/static/demo/IMG_3839.JPG',
            '/static/demo/IMG_3839.JPG',
            '/static/demo/IMG_3839.JPG',
            '/static/demo/IMG_3839.JPG',
            '/static/demo/IMG_3839.JPG',
          ],
          // 订单信息
          orderInfo: {
            orderNo: '20221243455666666777', // 订单编号
            createTime: '2022-06-09  18:00:00', // 下单时间
            uodateTime: '2022-06-09  18:00:00', // 接单时间
          },
        },
      }
    },
    mounted() {
      uni.getLocation({
        type: 'gcj02',
        isHighAccuracy: true, //高精度
        geocode: true, //将位置解析成地址
        success: function (res) {
          // _this.options.latitude = res.latitude
          // _this.options.longitude = res.longitude
          console.log(res)
        },
        fail: function (res) {
          reject(res)
        },
      })
      const sys = uni.getSystemInfoSync()
      this.sys = sys
      console.log(sys)
      const query = uni.createSelectorQuery().in(this)
      query
        .select('#drag_card')
        .boundingClientRect((data) => {
          this.dragCardParams.height = data.height
          this.dragCardParams.offsetHeight = data.height / 2
        })
        .exec()
      // query // 固定
      //   .select('#drag_content')
      //   .boundingClientRect((data) => {
      //     this.fixedTitleParams.titleH = data.height
      //   })
      //   .exec()
      query
        .select('#footer')
        .boundingClientRect((data) => {
          // 安卓和ios差量
          this.footerH = data.height + this.sys.safeAreaInsets.top
          this.bottom = data.height + this.sys.safeAreaInsets.top
          let height =
            this.sys.windowHeight -
            this.dragCardParams.height -
            data.height -
            data.height -
            this.sys.safeAreaInsets.bottom -
            this.sys.safeAreaInsets.top -
            12
          if (this.sys.osName === 'ios') {
            height = height - 12 + data.height / 2
          }
          this.dragContentParam.height = height
          this.dragContentParam.top = this.sys.windowHeight
          console.log(this.dragContentParam.top)
        })
        .exec()
      // query
      //   .select('#borderBox')
      //   .boundingClientRect((data) => {
      //     this.borderH = data.height
      //   })
      //   .exec()
    },
    methods: {
      /**
       * 复制
       */
      copyThis(data) {
        uni.setClipboardData({
          data: data,
        })
      },
      // 打开第三方导航
      openGPSApp() {
        uni.openLocation({
          latitude: 23.1338, //纬度
          longitude: 113.33052, //经度
          success: (res) => {
            console.log(res)
          },
        })
      },
      // 跳转聊天页面
      goImUrl() {
        const info = {
          targetId: this.cardInfo.imData.shopUserId,
          type: 0,
          note: this.cardInfo.imData.shopName,
          platformCode: this.cardInfo.imData.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 拨打电话
       */
      callPhone() {
        const phone = this.cardInfo.phone
        this.$cellPhone(String(phone))
      },
      /**
       * 预览图片
       */
      choseImg(index, list) {
        uni.previewImage({
          current: index,
          urls: list,
          indicator: 'none',
        })
      },
      /**
       * 预览视频
       */
      choseVideo(data) {
        this.videoSrc = data.src
        this.poster = data.poster
        this.$refs.EraPreviewVideo.show(data.src)
      },
      clickMarker(e) {
        console.log(e, 'eeeeeeeeeeeeeeeeeee')
      },
      // 记录卡片触摸Y轴位置
      cardMoveStartFn() {
        this.isAnimate = false
        this.start = this.bottom
      },
      /**
       * 卡片触摸时事件
       * @param e 事件对象
       * @returns {boolean}
       */
      cardMoveFn(e) {
        // 单指触摸
        if (e.touches.length !== 1) {
          return false
        }
        const clientY =
          this.sys.windowHeight -
          e.touches[0].clientY -
          this.dragCardParams.offsetHeight -
          this.sys.safeAreaInsets.bottom
        const edgeBottom = this.sys.windowHeight - this.dragCardParams.height - this.footerH
        // const edgeBottom = // 固定
        //   this.sys.windowHeight -
        //   this.dragCardParams.height -
        //   this.fixedTitleParams.titleH +
        //   this.footerH
        // 上下触及边界
        // console.log(clientY, this.footerH);
        if (clientY < this.footerH) {
          this.bottom = this.footerH
        } else if (clientY > edgeBottom) {
          this.bottom = edgeBottom
        } else {
          this.bottom = clientY
        }
        this.dragContentParam.top = this.sys.windowHeight - this.bottom
      },
      // 卡片触摸结束判断
      cardMoveEndFn() {
        const edgeBottom = this.sys.windowHeight - this.dragCardParams.height - this.footerH
        // const edgeBottom = // 固定
        //   this.sys.windowHeight -
        //   this.dragCardParams.height -
        //   this.fixedTitleParams.titleH +
        //   this.footerH
        if (this.start === this.footerH) {
          if (this.bottom - this.start > 100) {
            this.bottom = edgeBottom
          } else {
            this.bottom = this.footerH
          }
        } else {
          if (this.bottom - this.start < -100) {
            this.bottom = this.footerH
          } else {
            this.bottom = edgeBottom
          }
        }
        this.dragContentParam.top = this.sys.windowHeight - this.bottom
        this.isAnimate = true
      },
    },
    onLoad(options) {
      this.title = options.title
      this.hideIcon = options.hideIcon || false
      this.origin = options.origin
    },
  }
</script>
<style lang="scss" scoped>
  .wrap {
    //padding-top: 100rpx;
    width: 750rpx;
    height: 100vh;
    position: relative;
    &-map {
      width: 100vw;
      height: 100vh;
    }
  }
  .videoWarp {
    position: absolute;
    left: 0;
    top: 450rpx;
    width: 100vw;
    .video {
      width: 100vw;
    }
  }
  .card {
    position: fixed;
    z-index: 99;
    width: 100%;
    padding: 16rpx;
    box-sizing: border-box;
    &-content {
      background: #fff;
      padding: 24rpx;
      box-shadow: 4rpx 8rpx 32rpx rgba(170, 182, 200, 0.25);
      border-radius: 16rpx;
    }
    .icon-map {
      padding: 0rpx 16rpx;
      color: #0d66ff;
      border: 1px solid #0d66ff;
      border-radius: 20rpx;
    }
    .fun-btn-bar {
      border-top: 2rpx solid #f7f7f8;
      padding: 28rpx;
      padding-bottom: 0;
      .border-r {
        border-right: 2rpx solid #f7f7f8;
      }
    }
  }
  .drag-content {
    position: absolute;
    width: 100%;
    left: 0;
    padding: 16rpx;
    box-sizing: border-box;
    padding-top: 0;
    &-box {
      background: #fff;
      padding: 0 24rpx;
      box-shadow: 4rpx 8rpx 32rpx rgba(170, 182, 200, 0.25);
      border-radius: 16rpx;
      //max-height: 560rpx; //固定
      overflow-y: scroll;
    }
    &-item {
      padding: 24rpx 0;
      border-bottom: 2rpx solid #f7f7f8;
    }
    .word-sign {
      font-size: 24rpx;
      padding: 4rpx 16rpx;
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
    .cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      font-weight: 500;
      margin-top: 20rpx;
      &-box {
        display: flex;
        align-items: center;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .image-box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      &-item {
        margin-top: 24rpx;
      }
      .img-item {
        left: 0;
        top: 0;
        width: 216rpx;
        height: 216rpx;
      }
      .m-t-16 {
        margin-top: 16rpx;
      }
      .video-box {
        width: 216rpx;
        height: 216rpx;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .img-item {
          position: absolute;
          left: 0;
          top: 0;
        }
        .play {
          width: 120rpx;
          height: 120rpx;
          z-index: 1;
        }
      }
    }
    .big-img {
      display: block;
      width: 440rpx;
      .img-item {
        width: 440rpx;
        height: 440rpx;
      }
    }
  }
  .transition {
    transition: all 0.5s ease;
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 24rpx;
    background: #fff;
    box-sizing: border-box;
    z-index: 10;
    &-btn-bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 32rpx;
    }
    &-btn {
      border: 1px solid rgba(0, 0, 0, 0.25);
      border-radius: 126rpx;
      margin: 24rpx 0rpx;
      padding: 22rpx 32rpx;
      &.act {
        color: #ff5319;
        border-color: #ff5319;
      }
    }
  }
</style>
