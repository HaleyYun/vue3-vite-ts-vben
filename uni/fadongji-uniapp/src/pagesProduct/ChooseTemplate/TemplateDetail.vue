<template>
  <view v-if="info" id="detail" class="goods">
    <VoNav is-fixed is-have-more>

      <view slot="title" class="nav-mid">
        <EraTabs
          :current="current"
          :list="tabs"
          activeStyle="font-size: 32rpx;font-weight: bold;color:#FF5319;"
          class="tabs"
          inactiveStyle="font-size: 28rpx;font-weight: 400;"
          itemStyle="flex:1;padding:20rpx;"
          @change="tabChange"
        />
      </view>
    </VoNav>
    <!-- 顶部商品信息 -->
    <GoodsInfo v-if="info && info.name" :info="info" />
    <!-- 商品信息 -->
    <CellInfo :info="info" />
    <view id="install" />
    <!-- 安装教程 -->
    <InstallGuide v-if="info.serviceConfiguration" :info="info" />
    <view id="goods-detail" />
    <!-- 产品详情 -->
    <view v-if="info.desc" class="goods-detail">
      <view class="goods-detail__title">产品详情</view>
      <view class="goods-detail__desc">
        <image
          v-for="(desc, descIndex) of info.desc"
          :key="descIndex"
          :src="desc"
          class="goods-detail__image"
          mode="widthFix"
          @click="previewDesc(info.desc, descIndex)"
        />
      </view>
    </view>
    <view class="bottom">
      <view class="bottom-btn" @click="backFn">返回</view>
    </view>
    <!-- 安全区域 -->
    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />

    <!-- <swiper class="swiper" :current="current" @change="swiperChange">
      <swiper-item class="swiper-item">
        <GoodsInfo />
      </swiper-item>
    </swiper> -->
  </view>
</template>
<script>
  // #ifdef APP-PLUS
  var vocenStatistics = uni.requireNativePlugin('vocen-statistics')
  // #endif
  import {backFunc} from "@/common/helper";

  import GoodsInfo from './components/GoodsInfo.vue'
  import CellInfo from './components/CellInfo.vue'
  import InstallGuide from './components/InstallGuide.vue'

  export default {
    name: 'TemplateDetail',
    components: { GoodsInfo, CellInfo, InstallGuide },
    data() {
      return {
        installScroll: 0, // 安装指导dom高度
        detailScroll: 0, // 详情dom高度
        preview: 0, //1 是买家视角    0是其他视角，2模板预览
        current: 0,
        tabs: [
          {
            name: '产品',
            value: '0',
            index: 0,
          },
          {
            name: '安装指导',
            value: '1',
            index: 1,
          },
          {
            name: '详情',
            value: '2',
            index: 2,
          },
        ],
        info: {
          serviceConfig: {},
          goodsGoodsShopInfoVO: '',
        },
        templateId: '', //模板id
      }
    },
    onLoad(options) {
      //模板id
      if (options.templateId) {
        this.templateId = options.templateId
        this.getTemplateDetail()
      }
    },
    onShow() {
      console.log('111111')
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
      console.log('222222')
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
      console.log('33333')
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
      backFn(){
        backFunc()
      },
      previewDesc(urls, current) {
        uni.previewImage({
          urls,
          current,
        })
      },
      async getTemplateDetail() {
        await this.$VoHttp.apiGoodsTemplateDetail({ id: this.templateId }).then((res) => {
          if (res.data) {
            this.info = res.data
            // helpUtil.regroupFileData(this.info, 'guideVideo')
          }
        })
        await this.toAnchor()
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        //锚点跳转
        if (tab.index === 0) {
          uni.pageScrollTo({
            duration: 500,
            scrollTop: 0,
          })
        } else if (tab.index === 1) {
          uni.pageScrollTo({
            duration: 500,
            scrollTop: this.installScroll,
          })
          this.toAnchor('#install', 1)
        } else if (tab.index === 2) {
          uni.pageScrollTo({
            duration: 500,
            scrollTop: this.detailScroll,
          })
        }
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

            console.log('data', data)
          })
          .exec()
      },
    },
    onPageScroll(e) {
      const scrollTop = e.scrollTop
      if (scrollTop >= 0 && scrollTop < this.installScroll) {
        this.current = 0
      } else if (scrollTop >= this.installScroll && scrollTop < this.detailScroll) {
        this.current = 1
      } else {
        this.current = 2
      }
    },
  }
</script>
<style lang="scss" scoped>
  .goods {
    min-height: 100vh;
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
  }
  .bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 24rpx 0rpx;
    background-color: #fff;
    border-top: 2rpx solid $v-bg-light;
    &-btn {
      margin: 0 32rpx;
      text-align: center;
      padding: 16rpx 0;
      color: #fff;
      background-color: #ff5319;
      font-size: 32rpx;
      line-height: 1.5;
      border-radius: 48rpx;
    }
  }
</style>
