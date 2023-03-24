<template>
  <view class="screeItem">
    <view class="screeItem-title"> {{ title }} </view>
    <view class="screeItem-center">
      <block v-if="userInfo.roleCode === 'agent'">
        <view v-for="(item, index) in typeListAgent" :key="index" @click="typeItem(item)">
          <view :class="item.selected ? 'screeItem-center__selected' : 'screeItem-center__item'">
            <view class="title">{{ item.name }}</view>
          </view>
        </view>
      </block>
      <block v-else-if="userInfo.roleCode === 'garage'">
        <view v-for="(item, index) in typeListGarage" :key="index" @click="typeItem(item)">
          <view :class="item.selected ? 'screeItem-center__selected' : 'screeItem-center__item'">
            <view class="title">{{ item.name }}</view>
          </view>
        </view>
      </block>
      <block v-else>
        <view v-for="(item, index) in typeList" :key="index" @click="typeItem(item)">
          <view :class="item.selected ? 'screeItem-center__selected' : 'screeItem-center__item'">
            <view class="title">{{ item.name }}</view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'AccountAlertItem',
    props: {
      /*
       * id tagId
       * selected 是否点击
       * name 标题
       * */
      // typeList: {
      //   type: Array,
      //   default: [],
      // },
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
      //已选中数据
      selectInfo: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        selectData: [],
        typeListGarage: [
          // { name: '未知', selected: false, id: 0 },
          { name: '提现', selected: false, id: 1 },
          { name: '货款', selected: false, id: 2 },
          // { name: '批发收益', selected: false, id: 3 },
          // { name: '拓客收益', selected: false, id: 4 },
          // { name: '仓储费用', selected: false, id: 5 },
          // { name: '提现失败退回', selected: false, id: 6 },
        ],
        typeList: [
          // { name: '未知', selected: false, id: 0 },
          { name: '提现', selected: false, id: 1 },
          { name: '货款', selected: false, id: 2 },
          // { name: '批发收益', selected: false, id: 3 },
          // { name: '拓客收益', selected: false, id: 4 },
          // { name: '仓储费用', selected: false, id: 5 },
          // { name: '提现失败退回', selected: false, id: 6 },
        ],
        typeListAgent: [
          // { name: '未知', selected: false, id: 0 },
          { name: '提现', selected: false, id: 1 },
          { name: '货款', selected: false, id: 2 },
          { name: '批发收益', selected: false, id: 3 },
          { name: '拓客收益', selected: false, id: 4 },
          { name: '仓储费用', selected: false, id: 5 },
          { name: '提现失败退回', selected: false, id: 6 },
        ],
      }
    },
    methods: {
      //回显数据
      setValue(data) {
        // console.log('333333333333', data)
        if (data && data.length) {
          let arr
          if (this.userInfo.roleCode === 'agent') {
            arr = this.typeListAgent
          } else {
            arr = this.typeList
          }
          arr.forEach((item) => {
            data.forEach((ele) => {
              if (item.id === ele) {
                item.selected = true
                this.selectData.push(item.id)
                this.$emit('OrderScreen', { data: this.selectData })
              }
            })
          })
        }
      },
      typeItem(item) {
        this.selectData = []
        let arr
        if (this.userInfo.roleCode === 'agent') {
          arr = this.typeListAgent
        } else if (this.userInfo.roleCode === 'garage') {
          arr = this.typeListGarage
        } else {
          arr = this.typeList
        }
        //单选
        if (this.radio) {
          arr.forEach((typeItem) => {
            if (item.id === typeItem.id) {
              if (typeItem.selected === false) {
                typeItem.selected = true
                this.selectData.push(typeItem)
              }
            } else {
              typeItem.selected = false
            }
          })

          this.$emit('OrderScreen', { data: this.selectData })
          this.$forceUpdate()
          return
        } else {
          //多选
          item.selected = !item.selected

          //全部的就是全选
          if (item.name === '全部') {
            if (item.selected) {
              arr.forEach((selecteItem) => {
                selecteItem.selected = true
                this.selectData.push(selecteItem)
              })
            } else {
              arr.forEach((selecteItem) => {
                selecteItem.selected = false
              })
            }
          } else {
            this.selectData = []
            arr.forEach((selecteItem) => {
              if (selecteItem.selected) {
                this.selectData.push(selecteItem.id)
              }
            })
          }
          console.log('selectData===', this.selectData)
          this.$emit('OrderScreen', { data: this.selectData })
          this.$forceUpdate()
        }
      },
      reset() {
        this.selectData = []
        let arr
        if (this.userInfo.roleCode === 'agent') {
          arr = this.typeListAgent
        } else if(this.userInfo.roleCode === 'garage'){
          arr = this.typeListGarage
        } else{
          arr = this.typeList
        }
        arr.forEach((item) => {
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
    padding: 48rpx 32rpx 0rpx;
    background-color: #ffffff;

    &-title {
      font-size: 28rpx;
      color: $v-c0-85;
      font-weight: bold;
    }

    &-line {
      background-color: $v-bg-light;
      margin-top: 80rpx;
      height: 2rpx;
      width: 100%;
    }
    &-center {
      margin-top: 24rpx;
      display: grid;
      grid-row-gap: 24rpx;
      grid-column-gap: 48rpx;
      grid-template-columns: 1fr 1fr 1fr;

      &__item {
        min-height: 20rpx;
        padding-top: 15rpx;
        padding-bottom: 15rpx;
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
        height: 64rpx;
        line-height: 64rpx;
        border-radius: 32rpx;
        background-color: $v-tags-btn-disabled;
        border: 1px solid $v-tags-one;
        box-sizing: border-box;

        .title {
          font-size: 24rpx;
          text-align: center;
          color: $color-primary-yellow;
        }
      }
    }
  }
</style>
