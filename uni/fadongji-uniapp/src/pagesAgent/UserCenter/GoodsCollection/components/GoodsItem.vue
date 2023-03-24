<template>
  <view class="item swiper-action-box">
    <u-swipe-action>
      <u-swipe-action-item :options="options">

        <view class="item-goods flex flex-row" >
          <view class="flex flex-row flex-vertical-c" @click="setSelected()"
                v-show="showIcon">
            <VoIcon
                :name="selected?'success-fill':'circle'"
                :size="24"
                :color="selected?'#000':'#22284B'"
                :opacity="selected?1:0.15"
            />
          </view>
          <image class="item-goods__img" src="/static/demo/rectangle.png" />
          <view class="m-l-16 flex flex-column">
            <view class="item-goods__title">{{title}}</view>
            <view class="flex flex-row flex-vertical-c">
              <view class="item-goods__address">{{address}}</view>
              <view class="item-goods__line"/>
              <view class="item-goods__address">{{role}}</view>
              <view class="item-goods__line"/>
              <view class="item-goods__address">{{order}}</view>
            </view>
            <view class="flex flex-row flex-vertical-c m-t-16">
              <view class="item-goods__cash">现金</view>
              <view class="item-goods__cashmoney m-l-8">{{cashMoney}}</view>
              <view class="item-goods__gui m-l-16">销售指导价</view>
              <view class="item-goods__guimoney m-l-8">{{guiMoney}}</view>
            </view>
            <view class="flex flex-row flex-vertical-c m-t-10">
              <view class="item-goods__gui">减满</view>
              <view class="item-goods__guimoney m-l-8">{{discount}}</view>
              <view class="item-goods__gui m-l-16">30天账期</view>
              <view class="item-goods__guimoney m-l-8">{{accounMoney}}</view>
            </view>
            <view class="flex flex-row flex-vertical-c m-t-12">
              <view class="item-goods__cancelled">已销</view>
              <view class="item-goods__cancellnum m-l-8">{{ cancelled }}</view>
              <view class="item-goods__cancelled m-l-16">库存</view>
              <view class="item-goods__cancellnum m-l-8">{{ stock }}</view>
            </view>
          </view>
          <view class="item-goods__icon flex flex-row flex-vertical-c" v-show="!showIcon" >
            <VoIcon class="item-goods__voicon" name="comment-more" size="16.67" color="#000000" :opacity="0.45"/>
          </view>

        </view>
      </u-swipe-action-item>
    </u-swipe-action>
  </view>
</template>

<script>
  export default {
    name: 'GoodsItem',
    props:{
      //是否展示图标
      showIcon: {
        type: Boolean,
        default: false,
      },
      index: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        selected: false,
        title:'江陵动力发动机-B15-黑色江陵动力发动机-B15-黑色OCV',
        address:'合肥',
        role:'8种规格',
        order:'20台起订',
        cashMoney:'33600.00元',
        guiMoney:'4300.00元',
        discount:'满5万减2000',
        accounMoney:'1000.00元',
        cancelled:'9.1万件',
        stock:'90件',
        options: [
          {
            text: '商铺',
            icon:'/static/icons/shop_icon.png',
            iconSize:'24',
            style: {
              paddingLeft:'0',
              paddingRight:'0',
              width:'112rpx',
              backgroundColor: '#6794E3',
              display: 'flex',
              flexDirection: 'column',
              fontSize:'24rpx',
              lineHeight:'36rpx',
            },
          },
          {
            text: '分享',
            icon:'/static/icons/share_icon.png',
            iconSize:'24',
            style: {
              paddingLeft:'0',
              paddingRight:'0',
              width:'112rpx',
              backgroundColor: '#FDA202',
              display: 'flex',
              flexDirection: 'column',
              fontSize:'24rpx',
              lineHeight:'36rpx',
            },
          },
          {
            text: '收藏',
            icon:'/static/icons/colloct_icon.png',
            iconSize:'24',
            style: {
              paddingLeft:'0',
              paddingRight:'0',
              width:'112rpx',
              backgroundColor: '#FA5919',
              display: 'flex',
              flexDirection: 'column',
              fontSize:'24rpx',
              lineHeight:'36rpx',
            },
          },
        ],
      }
    },
    methods:{
      setSelected(){
        this.selected = !this.selected
        this.$emit('setSelectList',this.selected, this.index)
      },
    }
  }
</script>
<style lang="scss">
.swiper-action-box {
  ::v-deep{
    .u-swipe-action-item__right__button__wrapper__text {
      margin-top: 12rpx;
    }
  }
}
</style>
<style lang="scss" scoped>
  .item {
    margin-top: 16rpx;
    &-goods{
      padding: 24rpx 16rpx;
      width: 750rpx;
      &__img{
        margin-left: 16rpx;
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
      }
      &__title{
        font-size: 32rpx;
        line-height: 48rpx;
        width: 480rpx;
        color: $v-c0-85;
      }
      &__address{
        font-size: 24rpx;
        line-height: 36rpx;
        height: 36rpx;
        color: $v-c0-65;
      }
      &__line{
        height: 16rpx;
        margin-left: 16rpx;
        margin-right: 16rpx;
        border: 1rpx solid rgba(0, 0, 0, 0.25);
      }
      &__icon{
        padding: 0 3.34rpx 0 33.34rpx;
      }
      &__voicon{
        border-radius: 100rpx;
        background: #F7F7F8;
      }
      &__cash{
        font-size: 24rpx;
        line-height: 28rpx;
        color: #EC404D;
        box-sizing: border-box;
        padding: 2rpx 4rpx;
        border: 1.6rpx solid #EC404D;
        border-radius: 4rpx;
      }
      &__cashmoney{
        font-size: 24rpx;
        line-height: 36rpx;
        color: #E50012;
        text-align: center;
      }
      &__cash{
        font-size: 24rpx;
        line-height: 28rpx;
        color: #EC404D;
        box-sizing: border-box;
        padding: 2rpx 4rpx;
        border: 1.6rpx solid #EC404D;
        border-radius: 4rpx;
      }
      &__guimoney{
        font-size: 24rpx;
        line-height: 36rpx;
        color: $v-c0-65;
        text-align: center;
      }
      &__gui{
        font-size: 24rpx;
        line-height: 28rpx;
        color: $v-c0-65;
        box-sizing: border-box;
        padding: 2rpx 4rpx;
        border: 1.6rpx solid #D3D4DB;
        border-radius: 4rpx;
        background: #F6F7F8;
      }
      &__cancelled{
        font-size: 24rpx;
        line-height: 36rpx;
        color: $v-c0-45;
        text-align: center;
      }
      &__cancellnum{
        font-size: 24rpx;
        line-height: 36rpx;
        color: $v-c0-65;
        text-align: center;
      }
    }
  }
</style>
