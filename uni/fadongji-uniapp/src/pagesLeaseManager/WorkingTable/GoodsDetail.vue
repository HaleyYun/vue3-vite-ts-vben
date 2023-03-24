<template>
  <view class="goods" id="detail">
    <VoNav is-fixed is-have-more>
      <view class="nav-mid" slot="title">
        <EraTabs
          class="tabs"
          :list="tabs"
          @change="tabChange"
          :current="current"
          itemStyle="flex:1;padding:20rpx;"
          inactiveStyle="font-size: 32rpx;font-weight: 400;"
          activeStyle="font-size: 32rpx;font-weight: 500;"
        />
      </view>
    </VoNav>
    <!-- 顶部商品信息 -->
    <GoodsInfo v-if="info" :info="info" />
    <!-- 商品信息 -->
    <CellInfo v-if="info" :info="info" />
    <view id="install" />
    <!-- 安装教程 -->
    <InstallGuide v-if="info" :info="info" />
    <!-- 店铺名片 -->
    <view class="goods-shop">
      <image class="left" src="/static/logo-2.png" />
      <view class="right" v-if="info.goodsGoodsShopInfoVO">
        <view class="right-title">{{ info.goodsGoodsShopInfoVO.name || '' }}</view>
        <view class="right-text">
          <text class="right-text__label">商品</text>
          <text class="right-text__value">{{ info.goodsGoodsShopInfoVO.goodsScore || '--' }} </text>
          <text class="right-text__label">服务</text>
          <text class="right-text__value">{{ info.goodsGoodsShopInfoVO.serviceScore || '--' }} </text>
          <text class="right-text__label"> 物流</text>
          <text class="right-text__value">{{ info.goodsGoodsShopInfoVO.logisticsScore || '--' }} </text>
        </view>
      </view>
    </view>
    <!-- 大咖说 -->
    <MasterTalk v-if="info" :info="info" />
    <!-- 商品评价 -->
    <GoodsEvaluate v-if="info" :info="info" :companyId="companyId" />
    <view id="goods-detail" />
    <!-- 产品详情 -->
    <view class="goods-detail" v-if="info.desc">
      <view class="goods-detail__title">产品详情</view>
<!--      <image class="goods-detail__image" :src="$getDomain(info.desc)" mode="widthFix" />-->
      <image
        v-for="(src, index) in info.desc"
        v-show="!(src.indexOf('.mp4') > -1)"
        :key="index"
        :src="src"
        class="goods-detail__image"
        mode="widthFix"
      />
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
  import GoodsInfo from './components/GoodsInfo.vue'
  import CellInfo from './components/CellInfo.vue'
  import InstallGuide from './components/InstallGuide.vue'
  import MasterTalk from './components/MasterTalk.vue'
  import GoodsEvaluate from './components/GoodsEvaluate.vue'
  import helpUtil from '@/common/helper'
  export default {
    name: 'GoodsDetail',
    components: { GoodsInfo, CellInfo, InstallGuide, MasterTalk, GoodsEvaluate },
    data() {
      return {
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
        info: '',
        companyId: '',
      }
    },
    onLoad(options) {
      if (options.id) {
        this.getDetail(options.id)
        this.companyId = options.companyId
      }
    },
    methods: {
      getDetail(id) {
        // http://10.0.2.42:11122/project/49/interface/api/16907
        this.$VoHttp.apiGoodsDetail({ id: id }).then((res) => {
          this.info = res.data
          // helpUtil.regroupFileData(this.info, 'guideVideo')
        }).catch((e) => {
          console.log(e);
          this.$u.toast(e.message || '网络请求失败')
        })
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        //锚点跳转
        if (tab.index === 0) {
          uni.pageScrollTo({
            scrollTop: 0,
          })
        }
        if (tab.index === 1) {
          this.toAnchor('#install')
        }
        if (tab.index === 2) {
          this.toAnchor('#goods-detail')
        }
      },
      //锚点跳转
      toAnchor(anchor) {
        uni
          .createSelectorQuery()
          .select(anchor)
          .boundingClientRect((data) => {
            uni
              .createSelectorQuery()
              .select('#detail')
              .boundingClientRect((res) => {
                console.log('res', res)
                uni.pageScrollTo({
                  duration: 100,
                  scrollTop: data.top - 50 - res.top, //到达距离顶部的top值
                })
              })
              .exec()

            console.log('data', data)
          })
          .exec()
      },
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
      padding: 0 32rpx;
      box-sizing: border-box;
      margin-top: 16rpx;
      &__title {
        padding: 24rpx 0;
        font-size: 30rpx;
        line-height: 1.5;
        color: $v-c0-85;
        font-weight: 500;
      }
      &__image {
        width: 100%;
      }
    }

    .swiper {
      flex: 1;
      &-item {
        height: 100%;
      }
    }
  }
</style>
