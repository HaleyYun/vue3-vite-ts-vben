<template>
  <view class="item swiper-action-box">
    <u-swipe-action>
      <u-swipe-action-item :options="options" @click="optionsClick">
        <view class="item-goods flex flex-row" @click.stop="goGoodsDetail">
          <view v-show="showIcon" class="flex flex-row flex-vertical-c" @click.stop="setSelected()">
            <VoIcon
              :color="selected ? '#FF5319' : '#22284B'"
              :name="selected ? 'select-right' : 'circle'"
              :opacity="selected ? 1 : 0.15"
              :size="24"
            />
          </view>
          <image
            v-if="info.pic.split('.').pop() === 'mp4'"
            :src="info.pic + '&type=3'"
            class="item-goods__img"
            @error="imgErr"
          />
          <image v-else :src="info.pic + '&type=2'" class="item-goods__img" @error="imgErr" />
          <view class="relative m-l-16 flex flex-column flex1">
            <view class="item-goods__title">
              <text v-if="info.categoryType" class="title-label">{{ info.categoryType }}</text>
              <text>{{ info.name }}</text>
            </view>
            <view class="flex flex-row flex-vertical-c m-t-8">
              <view class="item-goods__cash">现金价</view>
              <VoPointPrice
                :leftSize="14"
                :price="info.cashPrice"
                :showUnit="true"
                class="lh42 h42 m-l-8"
                color="#E50012"
              />
            </view>
            <view class="arrow-time">
              <text class="m-r-16">{{ info.deliveryAreaName }}发货</text>
              <text> 预计{{ formateTime(info.arrivalTime) }}送达</text>
            </view>
          </view>
          <image v-show="!showIcon" class="item-goods__icon" src="/static/garage/user/more.png" />
        </view>
      </u-swipe-action-item>
    </u-swipe-action>
  </view>
</template>

<script>
  export default {
    name: 'GoodsItem',
    props: {
      //是否展示图标
      showIcon: {
        type: Boolean,
        default: false,
      },
      index: {
        type: Number,
        default: 0,
      },
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        selected: false,
        title: '江陵动力发动机-B15-黑色江陵动力发动机-B15-黑色OCV',
        address: '合肥',
        role: '8种规格',
        order: '20台起订',
        cashMoney: '33600.00',
        guiMoney: '4300.00元',
        discount: '4300.00',
        accounMoney: '1000.00',
        cancelled: '9.1万件',
        stock: '90件',
        options: [
          {
            text: '商铺',
            icon: '/static/icons/shop_icon.png',
            iconSize: '24',
            style: {
              paddingLeft: '0',
              paddingRight: '0',
              width: '112rpx',
              backgroundColor: '#6794E3',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '24rpx',
              lineHeight: '36rpx',
            },
          },
          {
            text: '分享',
            icon: '/static/icons/share_icon.png',
            iconSize: '24',
            style: {
              paddingLeft: '0',
              paddingRight: '0',
              width: '112rpx',
              backgroundColor: '#FDA202',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '24rpx',
              lineHeight: '36rpx',
            },
          },
          {
            text: '取消收藏',
            icon: '/static/icons/colloct_icon.png',
            iconSize: '24',
            style: {
              paddingLeft: '0',
              paddingRight: '0',
              width: '112rpx',
              backgroundColor: '#FA5919',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '24rpx',
              lineHeight: '36rpx',
            },
          },
        ],
      }
    },
    watch: {
      info: {
        deep: true,
        handler(newValue, oldValue) {
          this.selected = newValue.select
        },
      },
    },
    methods: {
      formateTime(day) {
        let val = day * 24
        if (val <= 12) {
          return '12小时内'
        } else if (val <= 24) {
          return '24小时内'
        } else if (val <= 36) {
          return '36小时内'
        } else if (val <= 48) {
          return '48小时内'
        } else {
          return this.$vocenApi.dayjs().add(parseInt(day), 'day').format('MM月DD日')
        }
      },
      optionsClick(e) {
        console.log(e)
        switch (+e.index) {
          case 0:
            console.log(this.info)
            this.goShopDetails()
            break
          case 1:
            this.$emit('showShare', this.info)
            break
          case 2:
            this.$VoHttp.GOODS.apiGoodsCollectionCancelBatch([this.info.goodsId])
              .then((res) => {
                this.$toast('操作成功', 'success', '/static/icons/success_icon.png')
                setTimeout(() => {
                  this.$emit('cancel')
                }, 1500)
              })
              .catch((err) => {
                uni.$u.toast(err.message || '网络错误')
              })
            break
        }
      },
      /**
       * 去商品详情页
       */
      goGoodsDetail() {
        this.$linkToEasy(
          `/pagesGarage/ShopList/GoodsDetail?id=${this.info.goodsId}&wid=${this.info.warehouseId}`,
        )
      },
      /**
       * 去店铺详情页
       */
      goShopDetails() {
        this.$linkToEasy('/pagesGarage/ShopList/ShopGoodsList?shopId=' + this.info.shopId)
      },
      setSelected() {
        this.selected = !this.selected
        this.$emit('setSelectList', this.info)
      },
      // 图片加载失败处理
      imgErr() {
        // eslint-disable-next-line vue/no-mutating-props
        this.info.pic = '/static/demo/rectangle.png'
      },
    },
  }
</script>
<style lang="scss">
  .swiper-action-box {
    ::v-deep {
      .u-swipe-action-item__right__button__wrapper__text {
        margin-top: 12rpx;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .item {
    margin-top: 16rpx;
    &-goods {
      position: relative;
      padding: 24rpx 32rpx 34rpx 32rpx;
      width: 750rpx;
      box-sizing: border-box;
      &__img {
        margin-left: 16rpx;
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
      }
      &__title {
        font-weight: bold;
        font-size: 32rpx;
        line-height: 48rpx;
        color: $v-c0-85;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        .title-label {
          background: #ffece5;
          border-radius: 24rpx;
          color: #ff5319;
          font-size: 24rpx;
          padding: 0 12rpx;
          margin-right: 8rpx;
        }
      }
      &__address {
        font-size: 24rpx;
        line-height: 36rpx;
        height: 36rpx;
        color: $v-c0-65;
      }
      &__line {
        height: 16rpx;
        margin-left: 16rpx;
        margin-right: 16rpx;
        border: 1rpx solid rgba(0, 0, 0, 0.25);
      }
      &__icon {
        position: absolute;
        right: 24rpx;
        bottom: 52rpx;
        width: 48rpx;
        height: 48rpx;
        display: block;
      }
      &__voicon {
        border-radius: 100rpx;
        background: #f7f7f8;
      }
      &__cash {
        font-size: 24rpx;
        line-height: 28rpx;
        color: #fa3243;
        box-sizing: border-box;
        padding: 2rpx 4rpx;
        background: #ffe6e8;
        border: 2rpx solid #fa3243;
        border-radius: 4rpx;
      }
      &__guimoney {
        font-size: 24rpx;
        line-height: 36rpx;
        color: $v-c0-65;
        text-align: center;
      }
      &__gui {
        font-size: 24rpx;
        line-height: 28rpx;
        color: $v-c0-65;
        box-sizing: border-box;
        padding: 2rpx 4rpx;
        border: 1.6rpx solid #d3d4db;
        border-radius: 4rpx;
        background: #f6f7f8;
      }
      &__cancelled {
        font-size: 24rpx;
        line-height: 36rpx;
        color: $v-c0-45;
        text-align: center;
      }
      &__cancellnum {
        font-size: 24rpx;
        line-height: 36rpx;
        color: $v-c0-65;
        text-align: center;
      }
    }
  }
  .arrow-time {
    line-height: 36rpx;
    margin-top: 8rpx;
    font-size: 24rpx;
    color: $v-c0-45;
  }
</style>
