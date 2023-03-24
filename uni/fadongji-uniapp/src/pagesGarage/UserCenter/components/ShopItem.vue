<template>
  <view class="item swiper-action-box">
    <u-swipe-action>
      <u-swipe-action-item :options="options" @click="optionsClick">
        <view class="item-goods flex" @click.native="goShopDetails">
          <view v-show="showIcon" class="flex flex-row flex-vertical-c" @click.stop="setSelected()">
            <VoIcon
              :color="selected ? '#FF5319' : '#22284B'"
              :name="selected ? 'select-right' : 'circle'"
              :opacity="selected ? 1 : 0.15"
              :size="24"
            />
          </view>
          <image :src="info.storeUrl + '&type=2'" class="item-goods__img" @error="imgErr" />
          <view class="m-l-16 flex flex1 flex-column">
            <view class="item-goods__title">{{ info.storeName }}</view>
            <view class="flex flex-row flex-vertical-c m-t-4">
              <VoIcon color="#22284B" name="address" size="12" />
              <view class="item-goods__address">{{ info.provinceName }}-{{ info.cityName }}</view>
            </view>
            <!--            <view class="flex flex-row flex-vertical-c m-t-16">-->
            <!--              <u-rate-->
            <!--                :value="productEvaluation"-->
            <!--                activeIcon="/static/created/evaluate/score_activate.png"-->
            <!--                gutter="8"-->
            <!--                inactiveIcon="/static/created/evaluate/score_not_active.png"-->
            <!--                readonly-->
            <!--                size="10"-->
            <!--              />-->
            <!--            </view>-->
          </view>
          <image v-show="!showIcon" class="item-goods__icon" src="/static/garage/user/more.png" />
        </view>
      </u-swipe-action-item>
    </u-swipe-action>
  </view>
</template>

<script>
  export default {
    name: 'ShopItem',
    props: {
      //是否展示图标
      showIcon: {
        type: Boolean,
        default: false,
      },
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        productEvaluation: 5, //商品评价默认5颗星
        selected: false,
        isShow: false,
        options: [
          {
            text: '商铺',
            icon: '/static/icons/shop_icon.png',
            iconSize: '20',
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
            iconSize: '20',
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
            iconSize: '20',
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
      optionsClick(e) {
        console.log(e)
        switch (+e.index) {
          case 0:
            this.goShopDetails()
            break
          case 1:
            this.$emit('showShare', this.info)
            break
          case 2:
            console.log(this.info.companyId);
            this.$VoHttp.GOODS.apiGoodsCollectionCancelStore$Id({id: this.info.companyId})
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
       * 去店铺详情页
       */
      goShopDetails() {
        this.$linkToEasy('/pagesGarage/ShopList/ShopGoodsList?shopId=' + this.info.companyId)
      },
      setSelected() {
        this.selected = !this.selected
        console.log(this.info, 222222222222222)
        this.$emit('setSelectList', this.info)
      },
      // 图片加载失败处理
      imgErr() {
        // eslint-disable-next-line vue/no-mutating-props
        this.info.storeUrl = '/static/demo/rectangle.png'
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
      padding: 24rpx 32rpx;
      width: 750rpx;
      box-sizing: border-box;
      &__img {
        width: 96rpx;
        height: 96rpx;
        border-radius: 8rpx;
        margin-left: 16rpx;
      }
      &__title {
        font-size: 28rpx;
        line-height: 42rpx;
        width: 480rpx;
        color: $v-c0-85;
      }
      &__address {
        font-size: 24rpx;
        line-height: 36rpx;
        height: 36rpx;
        color: $v-c0-45;
      }
      &__line {
        height: 16rpx;
        margin-left: 16rpx;
        margin-right: 16rpx;
        border: 1rpx solid rgba(0, 0, 0, 0.25);
      }
      &__icon {
        width: 48rpx;
        height: 48rpx;
        display: block;
        margin-top: 40rpx;
        margin-right: 8rpx;
      }
      &__voicon {
        border-radius: 100rpx;
        background: #f7f7f8;
      }
      &__cash {
        font-size: 24rpx;
        line-height: 28rpx;
        color: #ec404d;
        box-sizing: border-box;
        padding: 2rpx 4rpx;
        border: 1.6rpx solid #ec404d;
        border-radius: 4rpx;
      }
      &__cashmoney {
        font-size: 24rpx;
        line-height: 36rpx;
        color: #e50012;
        text-align: center;
      }
      &__cash {
        font-size: 24rpx;
        line-height: 28rpx;
        color: #ec404d;
        box-sizing: border-box;
        padding: 2rpx 4rpx;
        border: 1.6rpx solid #ec404d;
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
</style>
