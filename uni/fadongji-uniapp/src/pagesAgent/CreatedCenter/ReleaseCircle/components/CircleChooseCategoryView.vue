<template>
  <u-popup v-if="showAlert" :show="showAlert" mode="bottom" @close="cancle">
    <view class="type">
      <view class="type-top flex flex-justify-c">
        <view class="type-top__cancel" @click="cancle">取消</view>
        <view class="type-top__title flex1">{{ title }}</view>
        <view class="type-top__confirm" @click="confirm">确定</view>
      </view>
      <view class="type-line" />
      <view class="type-center">
        <view v-for="(item, index) in typeList" :key="index" @click="typeItem(item)">
          <view :class="item.selected ? 'type-center__selected' : 'type-center__item'">
            <view class="title">{{ item.name }}</view>
          </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'CircleChooseCategoryView',
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
      //type 类型 column:栏目 category:品类
      type: {
        type: String,
        default: '',
      },
      //title 标题
      title: {
        type: String,
        default: '标题',
      },
    },
    data() {
      return {
        showAlert: false,
        selectedArray: [],
        typeList: [],
      }
    },
    created() {

      this.categoryList()
    },
    methods: {
      typeItem(item) {
        //单选
        if (this.radio) {
          this.typeList.forEach((typeItem) => {
            if (item.id === typeItem.id) {
              if (typeItem.selected === false) {
                typeItem.selected = true
              }
            } else {
              typeItem.selected = false
            }
          })
          console.log(this.typeList[0] + '111111')
          this.$forceUpdate()
          return
        }
        //多选
        item.selected = !item.selected
        this.$forceUpdate()
      },
      showType(selectList) {
        this.initialization(selectList)
      },
      // 初始化
      initialization(selectList) {
        //如果selectList有值证明是复选状态
        if (selectList.length > 0) {
          console.log(this.typeList, selectList, 6666666)
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
        console.log(this.typeList, 5555555555555)
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
      cancle() {
        this.showAlert = false
      },
      confirm() {
        this.selectedArray = []
        this.typeList.forEach((item) => {
          if (item.selected === true) {
            item.type = this.type
            this.selectedArray.push(item)
          }
        })
        if (this.selectedArray.length === 0) {
          this.$u.toast('请选择商品')
          return
        }
        this.$emit('typeData', { data: this.selectedArray }, this.type)
        this.cancle()
      },
      // 选择品类初始化列表
      categoryList() {
        this.$VoHttp.apiGoodsCategoryQueryCategoryList({ name: 'null' }).then((res) => {
          this.typeList = res.data
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .type {
    &-top {
      font-size: 32rpx;
      height: 88rpx;
      line-height: 88rpx;
      width: 750rpx;
      text-align: center;
      color: $v-c0-85;

      &__cancel {
        padding-left: 32rpx;
        padding-right: 20rpx;
        width: 80rpx;
        color: $v-c0-45;
      }
      &__title {
        font-weight: bold;
      }
      &__confirm {
        padding-left: 20rpx;
        padding-right: 32rpx;
        width: 80rpx;
        color: $color-primary-yellow;
      }
    }

    &-line {
      width: 750rpx;
      height: 1px;
      background: $v-bg-light;
    }

    &-center {
      margin: 16rpx 32rpx;
      display: grid;
      grid-row-gap: 24rpx;
      grid-column-gap: 26rpx;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      &__item {
        height: 64rpx;
        line-height: 64rpx;
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
        background-color: $v-error-btn-disabled;
        border: 1px solid $v-error-light-two;

        .title {
          font-size: 24rpx;
          text-align: center;
          color: $color-primary-red;
        }
      }
    }

    &-bottom__line {
      width: 750rpx;
      height: 16rpx;
      background: $v-bg-light;
    }

    &-cancel {
      width: 100%;
      height: 96rpx;
      line-height: 96rpx;
      text-align: center;
      font-size: 28rpx;
      color: $v-c0-85;
    }
  }
</style>
