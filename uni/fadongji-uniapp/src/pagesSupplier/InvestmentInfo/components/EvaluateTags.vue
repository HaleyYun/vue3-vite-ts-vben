<template>
  <view>
    <view v-if="tagArr && tagArr.length" class="evaluateTags border-box flex flex-wrap">
      <block v-for="(item, index) of tagArr" :key="index">
        <view
          v-show="index < 6 || openCode"
          :class="item.choose ? 'select' : 'un-select'"
          class="evaluateTags-tag"
          @click="chooseFn(item, index)"
        >
          <view class="flex flex-vertical-c flex-justify-c">
            <view class="title"> {{ item.keyword }} </view>
            <view class="number">({{ item.keywordNum }})</view>
          </view>
        </view>
      </block>
    </view>
    <view v-if="tagArr.length && tagArr.length > 6" class="con-open">
      <view v-if="openCode" class="flex flex-vertical-c flex-justify-c" @click="openCode = false">
        <view class="color-block-45 m-r-8">收起</view>
        <VoIcon :opacity="0.25" color="#000" name="arrow-top-line" size="20" />
      </view>
      <view v-else class="flex flex-vertical-c flex-justify-c" @click="openCode = true">
        <view class="color-block-45 m-r-8">展开</view>
        <VoIcon :opacity="0.25" color="#000" name="arrow-bottom-line" size="20" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'EvaluateTags',
    props: {
      tags: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        allIndex: 0, // 全部按钮的下标，和当前点击的下标做对比用来判断是否点击全部
        tagArr: [], // 评价标签列表，等于tags
        isSelectAll: false, // 暂存全部按钮的状态
        openCode: false, // 展开收起
        chooseList: [], // 选中的列表
      }
    },
    // Vue 规定：组件中封装的自定义属性是只读的，开发人员不能直接修改 props 的值
    // 要想修改 props 的值，可以把 props 的值转存到 data 中，因为 data 中的数据都是可读可写的。
    watch: {
      tags: {
        deep: true, // 深度监听
        immediate: true, // 第一次绑定值进而触发
        handler(val) {
          this.tagArr = val
          this.tagArr.map((item, index) => {
            if (item.keyword === '全部') {
              // 全部按钮不在第一个位置的情况下，存一下全部按钮的下标
              this.allIndex = index
            }
          })
        },
      },
    },
    methods: {
      chooseFn(item, index) {
        // 当索引等于0点击的是全部按钮
        if (+index === +this.allIndex) {
          // 点了 全部
          if (this.isSelectAll) {
            // 取消全选
            // 当全部的状态为选中状态，点击全部，则全部状态和评价列表的所有按钮状态都变为false
            this.tagArr.map((item) => {
              item.choose = false
            })
            this.isSelectAll = false
          } else {
            // 全选
            // 否则当全部的状态为未选中状态，点击全部，则全部状态和评价列表的所有按钮状态都变为true
            this.tagArr.map((item) => {
              item.choose = true
            })
            this.isSelectAll = true
          }
        } else {
          // 点了单个
          this.tagArr[index].choose = !this.tagArr[index].choose

          let selectNum = 0
          this.tagArr.map((item, mapIndex) => {
            // 当前点击的下标为true 并且 当前点击的下标不等于全部按钮的下标 则 selectNum循环每次为true的数量加1
            item.choose && +mapIndex !== +this.allIndex && selectNum++
          })

          console.log(selectNum, 'selectNumselectNum', +selectNum === this.tagArr.length - 1)
          // 如果选中的数量等于除了全部按钮的数量 则全选状态和全选按钮为true
          if (+selectNum === this.tagArr.length - 1) {
            this.isSelectAll = true
            this.tagArr[this.allIndex].choose = true
          } else {
            // 选中的数量不等于除了全部按钮的数量 则全选状态和全选按钮为false
            this.isSelectAll = false
            this.tagArr[this.allIndex].choose = false
          }
        }

        this.chooseList = []
        // 全选不传
        if (!this.isSelectAll) {
          this.tagArr.forEach((it) => {
            if (it.choose) {
              this.chooseList.push(it.keyword)
            }
          })
        }

        this.$emit('chooseFn', this.chooseList)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .evaluateTags {
    padding: 32rpx 0 10rpx 32rpx;
    //margin: 32rpx 0rpx 10rpx;
    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
    // grid-row-gap: 22rpx;
    // grid-column-gap: 36rpx;

    &-tag {
      margin: 0 36rpx 22rpx 0;
      border-radius: 32rpx;
      height: 48rpx;
      line-height: 46rpx;
      padding: 0 16rpx;
      box-sizing: border-box;
      font-size: 24rpx;
    }
    .un-select {
      background-color: #ffece5;
      border: 2rpx solid #ff5319;
      color: #ff5319;
    }
    .select {
      color: #fff;
      background: #ff5319;
      border: 2rpx solid #ff5319;
    }
  }
  .con-open {
    font-size: 24rpx;
    padding-bottom: 40rpx;
  }
</style>
