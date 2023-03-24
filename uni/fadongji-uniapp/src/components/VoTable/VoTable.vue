<template>
  <view class="table">

    <view class="tr">
        <view class="tr-title w-216" >
          车系
        </view>
        <view class="tr-title w-172" >
          发动机型号
        </view>
        <view class="tr-title flex1" >
          排量（L）
        </view>
        <view class="tr-title flex1" >
          功率
        </view>
    </view>

    <block v-for="(item,index) of tableVal" :key="index">
      <view class="td"  v-if="(limit>0&&index<limit)||limit<=0">
        <view class="td-text w-216" >
          {{item.brand}}{{ item.model }}
        </view>
        <view class="td-text w-172" >
          {{ item.engineModel }}
        </view>
        <view class="td-text flex1" >
          {{ item.displacement }}
        </view>
        <view class="td-text flex1" >
          {{ item.powerKw }}{{item.powerKw?'KW':''}}
        </view>
      </view>
    </block>

  </view>
</template>

<script>
export default {
  name: 'VoTable',
  props: {
      limit:{
        type:Number,
        default:0
      },
      tableVal:{
        type:Array,
        default:()=>[]
      }
  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.table{
  background-color: #FFFFFF;
  width: 100%;
  .tr{
    display: flex;
    align-items: center;
    color: #000000;
    font-size: 24rpx;
    height: 88rpx;
    border-top: 2rpx solid rgba(0, 0, 0, 0.08);
    border-bottom: 2rpx solid rgba(0, 0, 0, 0.08);
    border-right: 2rpx solid rgba(0, 0, 0, 0.08);
    &-title{
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      background: #F7F7F8;
      border-left: 2rpx solid rgba(0, 0, 0, 0.08);


    }
  }
  .td{
    display: flex;
    //align-items: center;
    color: #000000;
    font-size: 24rpx;
    min-height: 88rpx;
    border-bottom: 2rpx solid rgba(0, 0, 0, 0.08);
    border-right: 2rpx solid rgba(0, 0, 0, 0.08);
    &-text{
      min-height: 88rpx;
      padding: 24rpx  10rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 2rpx solid rgba(0, 0, 0, 0.08);
      text-align: center;
      word-break: break-all;
      word-wrap: break-word;
    }

  }
  .w-216{
    width: 216rpx;
  }
  .w-172{
    width: 172rpx;
  }


}

</style>
