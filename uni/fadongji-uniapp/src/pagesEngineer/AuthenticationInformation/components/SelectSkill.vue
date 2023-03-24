<template>
  <u-popup :show="show" :round="10" mode="bottom">
    <view class="popup">
      <view class="popup-nav">
        <view class="popup-nav__cancel" @click="cancelFn">取消</view>
        <view class="popup-nav__title">技能专长</view>
        <view class="popup-nav__sure" @click="sureFn">确定</view>
      </view>
      <view class="popup-content">
        <view :class="{'active':selectArr.indexOf(item.value)!==-1}" @click="selectItemFn(item)" class="popup-content__item " v-for="(item, index) of list" :key="index">
          {{item.label}}
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'SelectSkill',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        selectArr:[],
        selectName:[],
        list: [
          {
            label: '电路',
            value: 1,
          },
          {
            label: '变速箱',
            value: 2,
          },
          {
            label: '发动机',
            value: 3,
          },
          {
            label: '车身底盘',
            value: 4,
          },
          {
            label: '油路',
            value: 5,
          },
        ],
      }
    },
    methods: {
      sureFn(){
        this.$emit('sureFn',{
          value:this.selectArr,
          name:this.selectName
        })
      },
      selectItemFn(item){
        const  index=this.selectArr.indexOf(item.value)
        if(index===-1){
            this.selectArr.push(item.value)
            this.selectName.push(item.label)
        }else{
          this.selectArr.splice(index,1)
          this.selectName.splice(index,1)
        }
      },
      cancelFn(){
        this.$emit('update:show',false)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .popup {
    width: 750rpx;
    height: 684rpx;
    background-color: #ffffff;
    &-nav {
      width: 750rpx;
      height: 88rpx;
      padding: 0rpx 32rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      line-height: 88rpx;
      &__cancel {
        font-size: 32rpx;
        color: rgba(0, 0, 0, 0.45);
        height: 88rpx;
        line-height: 88rpx;
      }
      &__title {
        flex: 1;
        text-align: center;
        font-size: 32rpx;
        color: rgba(0, 0, 0, 0.85);
        height: 88rpx;
        line-height: 88rpx;
        font-weight: bold;
      }
      &__sure {
        font-size: 32rpx;
        color: #22284b;
        height: 88rpx;
        line-height: 88rpx;
      }
    }
    &-content {
      width: 750rpx;
      padding: 16rpx 0rpx 0rpx 32rpx;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      &__item {
        box-sizing: border-box;
        width: 152rpx;
        height: 64rpx;
        background-color: #f7f7f8;
        border-radius: 32rpx;
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.85);
        line-height: 64rpx;
        text-align: center;
        margin-right: 26rpx;
        margin-bottom: 24rpx;
      }
      .active {
        background: #ffece5 !important;
        border: 2rpx solid #ff6633;
        line-height: 60rpx;
        color: #ff5319;
      }
    }
  }
</style>
