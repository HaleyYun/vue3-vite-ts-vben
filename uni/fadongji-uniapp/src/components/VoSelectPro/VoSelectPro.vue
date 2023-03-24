<template>
  <view class="select-pro">
    <view class="select-pro__nav">
      <VoNav title="选择商品" :is-fixed="false" is-have-more></VoNav>
      <VoSearch v-model="goodsName" @custom="initFn"  @search="initFn" class="select-pro__search"></VoSearch>
    </view>
    <VoBatteryBar bg-color="#f7f7f8"></VoBatteryBar>
    <block v-if="list.length === 0">
      <VoNoData
        class="noData"
        no-data-tips="暂无商品"
      />
    </block>
    <block v-else>
      <view class="select-pro__item" v-for="(item,index) of list" :key="index">
        <view class="fz-26 color-gray m-b-22 h40 lh40">商品编号：{{item.goodsCode}}</view>
        <view class="item-content">
          <image :src="item.pic?item.pic[0]+'&type=1':''" class="item-content__left"></image>
          <view class="item-content__right">
            <view class="fz-28 overTwoEllipsis color-block font-weight-500 lh150" >
              <text v-show="item.categoryType" class="good-tips m-r-8">{{item.categoryType}}</text>
              {{ item.goodsName }}
            </view>

            <view class="fz-26 color-block-65">在库数量：{{ item.number }}</view>
          </view>
        </view>
        <view class="m-t-32 flex flex-justify-r">
          <view class="select-btn"  @click="selectFn(item)">选择</view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: 'VoSelectPro',
  props: {
    list:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      goodsName:''
    }
  },
  methods: {
    initFn(){
      this.$emit('initFn',this.goodsName)
    },
    selectFn(item){
      uni.$emit('selectFn',item)
      this.$backFn()
    }
  },
}
</script>

<style lang="scss" scoped>
.select-pro{
  width: 750rpx;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f7f7f8;
  padding-top: 176rpx;
  &__nav{
    width: 750rpx;
    background-color: #FFFFFF;
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    z-index: 2;
  }
  &__search{
    background-color: #FFFFFF;
    padding: 0rpx 32rpx;
    height: 88rpx;
  }
  &__item{
    width: 750rpx;
    background-color: #FFFFFF;
    padding: 32rpx;
    box-sizing: border-box;
    margin-top: 24rpx;
    .item-content{
      width: 100%;
      display: flex;
      overflow-x: hidden;
      height: 164rpx;
      &__left{
        width: 164rpx;
        height: 164rpx;
        border-radius: 8rpx;
        overflow: hidden;
        margin-right: 14rpx;
      }
      &__right{
        padding-bottom: 8rpx;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
      }

    }


  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
  .lh150{
    line-height: 150%;
  }
  .noData {
    width: 750rpx;
    height: 100vh;
  }
}
.select-btn{
  width: 160rpx;
  height: 56rpx;
  border: 2rpx solid #FF5319;
  border-radius: 30rpx;
  box-sizing: border-box;
  text-align: center;
  color: #FF5319;
  font-size: 24rpx;
  line-height: 52rpx;
}

</style>
