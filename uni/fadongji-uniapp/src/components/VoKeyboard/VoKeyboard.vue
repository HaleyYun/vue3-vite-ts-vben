<template>

  <u-popup :overlay="false" :show="show" duration="300">
    <view class="keyword p-b-safe-area" >

      <view class="keyword-content">
        <view class="row">
          <view :class="{'press-down':selectVal===row}" class="row-word" v-for="(row,rowIndex) of rowOne" :key="rowIndex" @click="rowClickFn(row)">
            {{row}}
          </view>
        </view>
        <view class="row">
          <view :class="{'press-down':selectVal===row}" class="row-word" v-for="(row,rowIndex) of rowTwo" :key="rowIndex" @click="rowClickFn(row)">
            {{row}}
          </view>
        </view>
        <view class="row p-l-32">
          <view :class="{'press-down':selectVal===row}" class="row-word" v-for="(row,rowIndex) of rowThree" :key="rowIndex" @click="rowClickFn(row)">
            {{row}}
          </view>
        </view>
        <view class="row p-l-32">
          <view :class="{'press-down':selectVal===row}" class="row-word" v-for="(row,rowIndex) of rowFour" :key="rowIndex" @click="rowClickFn(row)">
            {{row}}
          </view>
          <view class="row-close" @click="rowClickFn(-1)">
            <VoIcon size="32" name="close-keyboard"></VoIcon>
          </view>
        </view>
      </view>

    </view>
  </u-popup>

</template>

<script>
export default {
  name: 'VoKeyboard',
  props: {

  },
  data() {
    return {
      selectVal:'',
      show:false,
      rowOne:[1,2,3,4,5,6,7,8,9,0],
      rowTwo:['Q','W','E','R','T','Y','U','I','O','P'],
      rowThree:['A','S','D','F','G','H','J','K','L'],
      rowFour:['Z','X','C','V','B','N','M'],
    }
  },
  methods: {
    showFn(){
      this.selectVal=''
      this.show=true
    },
    closeFn(){
      this.show=false
    },
    // 选中某个字母
    rowClickFn(row){
      this.selectVal=row
      this.$emit('chooseFn',this.selectVal)
        this.closeFn()
    }

  },
}
</script>

<style lang="scss" scoped>
.keyword{
  width: 750rpx;
  background-color: #e6e7eb;
  position: fixed;
  left: 0rpx;
  bottom: 0rpx;
  z-index: 10;
  padding-top: 26rpx;
  padding-left: 12rpx;
  box-sizing: border-box;
  overflow-x: hidden;
  &-content{
    height: 392rpx;
  }
  .row{
      height: 78rpx;
      margin-bottom: 12rpx;
      display: flex;
      align-items: center;
      &-word{
        width: 64rpx;
        height: 78rpx;
        border-radius: 8rpx;
        background-color: #FFFFFF;
        color: rgba(0, 0, 0, 0.85);
        font-size: 36rpx;
        line-height: 78rpx;
        text-align: center;
        margin-right: 10rpx;
      }
  }
  .row-close{
    width: 138rpx;
    height: 78rpx;
    border-radius: 8rpx;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .press-down{
    background: #D5D8DF !important;
    color: #FFFFFF!important;
  }

}

</style>
