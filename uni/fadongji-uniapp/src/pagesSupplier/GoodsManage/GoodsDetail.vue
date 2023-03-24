<template>
  <view v-if="info" id="detail" class="goods">
    <VoNav v-if="old.scrollTop > 490" is-fixed is-have-more>
      <view slot="title" class="nav-mid">
        <EraTabs
          :current="current"
          :list="tabs"
          activeStyle="font-size: 32rpx;font-weight: bold;color: #FF5319;"
          inactiveStyle="font-size: 28rpx;font-weight: 400;color: rgba(0, 0, 0, 0.45)"
          itemStyle="flex:1;padding:20rpx;"
          @change="tabChange"
        />
      </view>
    </VoNav>
    <VoAlert
      v-if="info.status === 2"
      :showTitle="false"
      description="商品正在审核中、请耐心等待"
      icon-position="right"
    />
    <VoAlert
      v-if="info.status === 3"
      :description="info.reason"
      :showIcon="false"
      title="审核未通过原因："
    />
    <scroll-view
      v-if="info"
      :scroll-into-view="scrollIntoView"
      class="flex1 overflow-hidden relative"
      scroll-anchoring
      scroll-with-animation
      scroll-y
      @scroll="scrollHandler"
    >
      <u-gap :height="$systemInfo.statusBarHeight" />
      <view
        :style="{ top: $systemInfo.statusBarHeight + 'px' }"
        class="top-nav flex flex-justify-between"
      >
        <image class="icon-img" src="/static/icons/back_pray.png" @click="$backFn()" />
        <image class="icon-img" src="/static/icons/more_pray.png" @click="showDirect = true" />
      </view>
      <view id="goods" />
      <GoodsInfo v-if="info && info.name" :info="info" :preview="preview" />
      <!-- 商品信息 -->
      <CellInfo :info="info" />
      <view id="install" />
      <!-- 安装教程 -->
      <InstallGuide v-if="info.guideVideo" :info="info" />
      <!-- 店铺名片 -->
      <view v-if="info.goodsGoodsShopInfoVO" class="goods-shop">
        <image :src="info.goodsGoodsShopInfoVO.storeUrl" class="left" />
        <view class="right">
          <view class="right-title">{{ info.goodsGoodsShopInfoVO.name }}</view>
          <view class="right-text">
            <text class="right-text__label">商品</text>
            <text class="right-text__value"
              >{{ info.goodsGoodsShopInfoVO.goodsScore || '--' }}
            </text>
            <text class="right-text__label">服务</text>
            <text class="right-text__value"
              >{{ info.goodsGoodsShopInfoVO.serviceScore || '--' }}
            </text>
            <text class="right-text__label"> 物流</text>
            <text class="right-text__value"
              >{{ info.goodsGoodsShopInfoVO.logisticsScore || '--' }}
            </text>
          </view>
        </view>
      </view>
      <!-- 大咖说 -->
      <MasterTalk v-if="info.id" :info="info" />
      <!-- 商品评价 -->
      <GoodsEvaluate v-if="info.id" :info="info" />
      <view id="goods-detail" />
      <!-- 产品详情 -->
      <view v-if="info.desc" class="goods-detail">
        <view class="goods-detail__title">产品详情</view>
        <view class="goods-detail__desc">
          <view v-for="(desc, descIndex) of info.desc" :key="descIndex">
            <view v-if="isVideo(desc)" class="relative" @click="playVideo(desc)">
              <image :src="desc + '&type=3'" class="video-poster2" mode="widthFix" />
              <image class="play" src="/static/created/circle/circle_video_play.png" />
            </view>
            <image
              v-else
              :src="desc"
              class="goods-detail__image"
              mode="widthFix"
              @click="previewDesc(info.desc, descIndex)"
            />
          </view>
        </view>
      </view>
      <!-- 兼容服务商 -->
      <view v-if="userInfo.platformCode === 'agent'" class="fixed-violation bg-white p-b-safe-area">
        <VoAlert
          v-if="info.violationReason"
          :description="info.violationReason"
          :showIcon="false"
          title="违规原因："
        />
        <view class="m-t-20 m-b-20">
          <view>
            <EraButton
              v-if="info.violationStatus === 1"
              circle
              disabled
              text="申请上架"
              @click="applySale"
            />
          </view>
          <EraButton
            v-if="info.violationStatus != 1 && (info.status === 4 || info.status === 3)"
            circle
            text="上架"
            @click="grounding"
          />
        </view>
      </view>
    </scroll-view>
    <view v-show="fixBtn" class="fix-btn">
      <image class="order-icon" src="/static/icons/to_top.png" @click="toTop()" />
    </view>

    <!-- 安全区域 -->
    <!--    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />-->

    <!-- <swiper class="swiper" :current="current" @change="swiperChange">
      <swiper-item class="swiper-item">
        <GoodsInfo />
      </swiper-item>
    </swiper> -->
    <!--   修改弹窗组件   -->
    <ModifyPopup
      ref="modifyPopup"
      :show.sync="showModify"
      operationType="up"
      @editSuccess="editSuccess"
    />
    <EraPreviewVideo
      ref="EraPreviewVideo"
      :poster="previewVideoSrc + '&type=3'"
      :videoSrc="previewVideoSrc"
    />
    <VoQuick :show.sync="showDirect" />
  </view>
</template>
<script>
  // #ifdef APP-PLUS
  var vocenStatistics = uni.requireNativePlugin('vocen-statistics')
  // #endif

  import GoodsInfo from './components/GoodsDetail/GoodsInfo.vue'
  import CellInfo from './components/GoodsDetail/CellInfo.vue'
  import InstallGuide from './components/GoodsDetail/InstallGuide.vue'
  import MasterTalk from './components/GoodsDetail/MasterTalk.vue'
  import GoodsEvaluate from './components/GoodsDetail/GoodsEvaluate.vue'

  import ModifyPopup from './components/GoodsDetail/ModifyPopup.vue'

  export default {
    name: 'GoodsDetail',
    components: { GoodsInfo, CellInfo, InstallGuide, MasterTalk, GoodsEvaluate, ModifyPopup },
    data() {
      return {
        fixBtn: false, // 悬浮球显隐
        scrollIntoView: '',
        old: {
          scrollTop: 0,
        },
        scrollTop: 0,
        installScroll: 0, // 安装指导dom高度
        detailScroll: 0, // 详情dom高度
        preview: 0, //1 是买家视角    0是其他视角
        current: 0,
        tabs: [
          {
            name: '产品',
            value: '0',
            index: 0,
            id: 'goods',
          },
          {
            name: '安装指导',
            value: '1',
            index: 1,
            id: 'install',
          },
          {
            name: '详情',
            value: '2',
            index: 2,
            id: 'goods-detail',
          },
        ],
        info: {
          serviceConfig: {},
          goodsGoodsShopInfoVO: '',
        },
        showModify: false,
        previewVideoSrc: '',
        showDirect: false,
      }
    },
    onLoad(options) {
      if (options.id) {
        this.getDetail(options.id)
      }
      if (options.preview) {
        this.preview = options.preview
      }
    },
    onShow() {
      // #ifdef APP-PLUS
      vocenStatistics.voUMengPageBeginLogPageView(
        {
          pageName: 'pagesSupplier-GoodsDetail',
        },
        (res) => {},
      )
      // #endif
    },
    onHide() {
      // #ifdef APP-PLUS
      vocenStatistics.voUMengPageEndLogPageView(
        {
          pageName: 'pagesSupplier-GoodsDetail',
        },
        (res) => {},
      )
      // #endif
    },
    onBackPress() {
      // #ifdef APP-PLUS
      vocenStatistics.voUMengPageEndLogPageView(
        {
          pageName: 'pagesSupplier-GoodsDetail',
        },
        (res) => {},
      )
      // #endif
    },
    methods: {
      playVideo(src) {
        this.previewVideoSrc = src
        this.$refs.EraPreviewVideo.show(src)
      },
      isVideo(url) {
        console.log(url)
        if (this.$vocenApi.Pattern.isVideoUrl(url.toLocaleLowerCase())) {
          return true
        } else {
          return false
        }
      },
      // 滑动处理
      scrollHandler({ detail }) {
        this.old.scrollTop = detail.scrollTop
        this.scrollIntoView = ''
        if (detail.scrollTop <= this.installScroll) {
          this.current = 0
        } else if (detail.scrollTop >= this.installScroll && detail.scrollTop < this.detailScroll) {
          this.current = 1
        } else if (detail.scrollTop >= this.detailScroll) {
          this.current = 2
        }

        this.fixBtn = detail.scrollTop > 250
      },
      //回到顶部
      toTop() {
        this.current = 0
        this.scrollIntoView = 'goods'
        console.log('scrollIntoView', this.scrollIntoView)
      },
      //申请上架
      applySale() {
        this.showModify = true
        this.$refs.modifyPopup.init(this.info)
      },
      //直接上架
      grounding() {
        const params = {
          ids: [this.info.id],
          status: 1,
          violationStatus: this.info.violationStatus,
        }
        this.$VoHttp
          .apiGoodsStatusUpdate(params)
          .then((res) => {
            setTimeout(() => {
              uni.$u.toast('上架成功')
            }, 1000)
            this.$backFn()
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      editSuccess() {
        this.$backFn()
      },
      toToast() {
        this.$u.toast('上游供应商正在整改该商品，违规解除后，此商品将自动恢复正常')
      },
      previewDesc(urls, current) {
        uni.previewImage({
          urls,
          current,
        })
      },
      async getDetail(id) {
        await this.$VoHttp.apiGoodsDetail({ id: id }).then((res) => {
          if (res.data) {
            this.info = res.data
            // helpUtil.regroupFileData(this.info, 'guideVideo')
          }
        })
        await this.toAnchor()
      },
      scrollFn(val) {
        var timer = setTimeout(() => {
          uni.pageScrollTo({
            duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
            scrollTop: val, //滚动到目标位置
            success: function () {
              // console, log('成功了')
            },
          })
        })
        clearTimeout(timer)
      },
      //tab点击
      tabChange(tab) {
        this.scrollIntoView = ''
        this.scrollIntoView = tab.id
        //锚点跳转
        // if (tab.index === 0) {
        //   setTimeout(() => {
        //     uni.pageScrollTo({
        //       duration: 500,
        //       scrollTop: 0,
        //     })
        //   }, 50)
        // } else if (tab.index === 1) {
        //   uni.pageScrollTo({
        //     duration: 500,
        //     scrollTop: this.installScroll,
        //   })
        //   this.toAnchor('#install', 1)
        // } else if (tab.index === 2) {
        //   uni.pageScrollTo({
        //     duration: 500,
        //     scrollTop: this.detailScroll,
        //   })
        // }
      },
      //锚点跳转
      toAnchor() {
        uni
          .createSelectorQuery()
          .select('#install')
          .boundingClientRect((data) => {
            uni
              .createSelectorQuery()
              .select('#detail')
              .boundingClientRect((res) => {
                this.installScroll = data.top - 50 - res.top
              })
              .exec()
          })
          .exec()
        uni
          .createSelectorQuery()
          .select('#goods-detail')
          .boundingClientRect((data) => {
            uni
              .createSelectorQuery()
              .select('#detail')
              .boundingClientRect((res) => {
                this.detailScroll = data.top - 50 - res.top
              })
              .exec()

            // console.log('data', data)
          })
          .exec()
      },
    },
    // onPageScroll(e) {
    //   const scrollTop = e.scrollTop
    //   if (scrollTop >= 0 && scrollTop < this.installScroll) {
    //     this.current = 0
    //   } else if (scrollTop >= this.installScroll && scrollTop < this.detailScroll) {
    //     this.current = 1
    //   } else {
    //     this.current = 2
    //   }
    // },
  }
</script>
<style lang="scss" scoped>
  .goods {
    height: 100vh;
    // background: #fff;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    &-shop {
      display: flex;
      padding: 32rpx;
      box-sizing: border-box;
      background: #fff;
      .left {
        width: 96rpx;
        height: 96rpx;
        margin-right: 24rpx;
        border-radius: 8rpx;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 1.5;
        &-title {
          font-weight: 500;
          font-size: 30rpx;
          color: $v-c0-85;
        }
        &-text {
          &__label {
            font-size: 24rpx;
            color: $v-c0-65;
            margin-right: 6rpx;
          }
          &__value {
            font-size: 24rpx;
            color: $color-primary-red;
            margin-right: 30rpx;
          }
        }
      }
    }
    &-detail {
      background: #fff;
      box-sizing: border-box;
      margin-top: 16rpx;
      &__title {
        padding: 24rpx 32rpx;
        font-size: 30rpx;
        line-height: 1.5;
        color: $v-c0-85;
        font-weight: 500;
      }
      &__desc {
        font-size: 0;
        .video-poster2 {
          width: 750rpx;
          height: 464rpx !important;
        }
        .play {
          width: 120rpx;
          height: 120rpx;
          position: absolute;
          top: 132rpx;
          left: 280rpx;
          z-index: 99;
        }
      }
      &__image {
        width: 750rpx;
      }
    }

    .swiper {
      flex: 1;
      &-item {
        height: 100%;
      }
    }
    .fixed-violation {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
    }
  }
  .top-nav {
    width: 750rpx;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    z-index: 99;
    .icon-img {
      width: 48rpx;
      height: 48rpx;
    }
  }
  .fix-btn {
    width: 72rpx;
    // height: 72rpx;
    position: fixed;
    z-index: 10;
    bottom: 240rpx;
    right: 32rpx;
    .order-icon {
      width: 96rpx;
      height: 96rpx;
    }
  }
</style>
