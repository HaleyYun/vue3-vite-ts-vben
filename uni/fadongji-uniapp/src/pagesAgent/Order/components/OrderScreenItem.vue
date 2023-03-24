<template>
  <view class="screeItem">
    <view class="screeItem-title"> {{ title }} </view>
    <view class="screeItem-line" />
    <view class="screeItem-center" :class="{ justifyContent: radio }">
      <block v-for="(item, index) in typeList">
        <view
          :class="item.selected ? 'screeItem-center__selected' : 'screeItem-center__item'"
          :key="index"
          @click="typeItem(item)"
        >
          <view class="title">{{ item.name }}</view>
        </view>
      </block>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'OrderScreenItem',
    props: {
      /*
       * id tagId
       * selected 是否点击
       * name 标题
       * */
      typeList: {
        type: Array,
        default: [],
      },
      //radio 是否单选 默认true是单选
      radio: {
        type: Boolean,
        default: true,
      },
      //title 标题
      title: {
        type: String,
        default: '标题',
      },
      //type 类型 orderTime下单时间 mySelf 自由仓库 platform 平台仓库
      type: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        selectData: [],
      }
    },
    methods: {
      typeItem(item) {
        this.selectData = []
        //单选
        if (this.radio) {
          this.typeList.forEach((typeItem) => {
            if (item.id === typeItem.id) {
              if (typeItem.selected === false) {
                typeItem.selected = true
                this.selectData.push(typeItem)
              } else {
                typeItem.selected = false
                this.selectData.slice(typeItem, 1)
              }
            } else {
              typeItem.selected = false
            }
          })
          this.$emit('OrderScreen', { type: this.type, data: this.selectData })
          this.$forceUpdate()
          return
        }
        //多选
        item.selected = !item.selected

        //全部的就是全选
        if (item.name === '全部') {
          if (item.selected) {
            this.typeList.forEach((selecteItem) => {
              selecteItem.selected = true
              this.selectData.push(selecteItem)
            })
          } else {
            this.typeList.forEach((selecteItem) => {
              selecteItem.selected = false
            })
          }
        } else {
          this.typeList.forEach((selecteItem) => {
            if (selecteItem.selected) {
              this.selectData.push(selecteItem)
            } else {
              this.typeList.find((value) => {
                return value.name == '全部'
              }).selected = false
            }
          })
          //   if (this.typeList[0].selected) {
          //     if (this.selectData.length === this.typeList.length - 2) {
          //       this.typeList[0].selected = true
          //     } else {
          //       this.typeList[0].selected = false
          //     }
          //   } else {
          //     if (this.selectData.length === this.typeList.length - 1) {
          //       this.typeList[0].selected = true
          //     } else {
          //       this.typeList[0].selected = false
          //     }
          //   }
        }

        this.selectData.forEach((item, index) => {
          if (!item.selected) {
            this.selectData.splice(index, 1)
          }
        })
        this.$emit('OrderScreen', { type: this.type, data: this.selectData })
        this.$forceUpdate()
      },
      reset() {
        this.typeList.forEach((item) => {
          item.selected = false
        })
      },
      showType(selectList) {
        this.initialization(selectList)
      },
      // 初始化
      initialization(selectList) {
        //如果selectList有值证明是复选状态
        if (selectList.length > 0) {
          this.typeList.forEach((item) => {
            try {
              //forEach遍历数组
              selectList.forEach((seletedItem) => {
                if (item.id === seletedItem.id) {
                  item.selected = true
                  throw new Error('end')
                }
              })
            } catch (e) {
              if (e.message == 'end') {
                return
              }
            }
            item.selected = false
          })
          this.showAlert = true
          return
        }
        //如果selectList无值则证明是默认状态  单选默认选中第一个 多选默认都不选中
        this.typeList.forEach((item, index) => {
          //单选
          if (this.radio) {
            if (index === 0) {
              item.selected = true
            } else {
              item.selected = false
            }
            return
          }
          //多选
          item.selected = false
        })
        this.showAlert = true
      },
    },
  }
</script>

<style lang="scss" scoped>
  .screeItem {
    padding: 24rpx 32rpx;
    background-color: #ffffff;

    &-title {
      font-size: 28rpx;
      color: $v-c0-85;
      font-weight: bold;
    }

    &-line {
      background-color: $v-bg-light;
      margin-top: 8rpx;
      height: 2rpx;
      width: 100%;
    }
    &-center {
      margin-top: 24rpx;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      &__item {
        flex-shrink: 0;
        min-height: 20rpx;
        padding: 15rpx 40rpx;
        margin: 20rpx 20rpx;
        background-color: $v-bg-light;
        border-radius: 32rpx;
        border: 1px solid $v-bg-light;

        .title {
          font-size: 24rpx;
          text-align: center;
          color: $v-c0-85;
        }
      }

      &__selected {
        flex-shrink: 0;
        min-height: 20rpx;
        padding: 15rpx 40rpx;
        margin: 20rpx 20rpx;
        border-radius: 32rpx;
        background-color: $v-tags-btn-disabled;
        border: 1px solid $color-primary-yellow;

        .title {
          font-size: 24rpx;
          text-align: center;
          color: $color-primary-yellow;
        }
      }
    }
  }
  .justifyContent {
    justify-content: space-between !important;
  }
</style>
