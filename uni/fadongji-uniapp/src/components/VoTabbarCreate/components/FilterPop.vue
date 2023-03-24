<template>
  <u-overlay
    v-if="filterVisible"
    :class="isTop ? 'top' : ''"
    :opacity="0.45"
    :show="true"
    class="overlay-wrap"
    @click="close"
  >
    <!--     :style="{ marginTop: marginTop }" -->
    <view :style="filterStyle" class="fliter" @tap.stop>
      <!-- <view class="fliter-btn" @click.stop="showColl" :style="btnStyle">
        <slot name="btn"></slot>
      </view> -->
      <view class="fliter-main">
        <slot name="content">
          <view class="fliter-item">
            <view class="item-title">按类目</view>
            <view class="item-tag">
              <view
                v-for="item in tagList1"
                :key="item.id"
                :class="item.choosed ? 'choosed' : ''"
                class="item-tag__item"
                @click.stop="tagClick(item, 'tagList1')"
              >
                {{ item.name }}
              </view>
            </view>
          </view>
          <!-- <view class="fliter-item">
            <view class="item-title">按品类</view>
            <view class="item-tag">
              <view
                class="item-tag__item"
                :class="item.choosed ? 'choosed' : ''"
                v-for="item in tagList2"
                :key="item.id"
                @click.stop="tagClick(item, 'tagList2')"
              >
                {{ item.name }}
              </view>
            </view>
          </view> -->
        </slot>
      </view>

      <view class="btns">
        <view class="btns-item" @click.stop="reset()">重置</view>
        <view class="btns-item color" @click.stop="confirm()">筛选</view>
      </view>
    </view>
  </u-overlay>
</template>

<script>
  export default {
    components: {},
    props: {
      btnStyle: {
        type: String,
        default: '',
      },
      marginTop: {
        type: String,
        default: '288rpx',
      },
      filterStyle: {
        type: String,
      },
      //位置，top上方
      isTop: {
        type: Boolean,
        default: true,
      },
      businessType: {
        type: Number,
        default: 0,
      },
      // filterVisible: {
      //   type: Boolean,
      //   default: false,
      // },
    },
    data() {
      return {
        valArr:[[],[],[]],
        selectList: [], //回显已选中
        filterVisible: false,
        timeValue: '近三个月',
        tagList1: [],
        tagList2: [
          // {
          //   name: '火花塞',
          //   choosed: false,
          // },
          // {
          //   name: '机油',
          //   choosed: false,
          // },
          // {
          //   name: '离合器',
          //   choosed: false,
          // },
          // {
          //   name: '发动机',
          //   choosed: false,
          // },
          // {
          //   name: '发动机2',
          //   choosed: false,
          // },
        ],
      }
    },
    async  created() {
     await this.$VoHttp.apiCreateColumnList({ businessType: 0 }).then(res=>{
        this.valArr[0]=res.data
      })
      await this.$VoHttp.apiCreateColumnList({ businessType: 2 }).then(res=>{
        this.valArr[2]=res.data
      })
    },
    methods: {
      async show(selectList) {
        let arr = selectList || []
        let columnList = this.valArr[this.businessType]
        this.tagList1 = columnList.map((item) => {
          return {
            name: item.columnName,
            choosed: arr.length && item.id === arr[0].id ? true : false,
            id: item.id,
          }
        })
        this.filterVisible = true
      },
      btnClick(item) {
        this.btns.forEach((item1) => {
          if (item1.value === item.value) {
            item1.choosed = !item.choosed
          } else {
            item1.choosed = false
          }
        })
      },
      confirm() {
        // let arr = this.tagList1.concat(this.tagList2)
        let obj = {}
        obj.selectList1 = this.tagList1.filter((item) => item.choosed === true)
        obj.selectList2 = this.tagList2.filter((item) => item.choosed === true)
        // let selectValue2 = selectValue.map((item) => {
        //   return item.name
        // })
        console.log('obj', obj)
        this.$emit('confirm', obj)
      },
      reset() {
        this.$emit('reset')
        this.tagList1.forEach((item) => {
          item.choosed = false
        })
      },
      tagClick(item, list) {
        this[list].forEach((tag) => {
          tag.choosed = item.id === tag.id ? true : false
        })
      },
      close() {
        this.filterVisible = false
        this.$emit('close')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .overlay-wrap {
    // margin-top: 288rpx;
    height: 100vh;
    &.top {
      position: absolute !important;
      top: 100rpx !important;
    }
    &.bottom {
    }
  }
  .fliter {
    width: 750rpx;
    background: #fff;
    position: absolute;
    // top: 96rpx;
    z-index: 10071;
    display: flex;
    flex-direction: column;
    &-main {
      flex: 1;
      overflow-y: auto;
    }

    &-item {
      .item-title {
        font-weight: bold;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.85);
        padding: 24rpx 32rpx;
      }
      .item-tag {
        padding-left: 32rpx;
        display: flex;
        background: #fff;
        align-items: center;
        flex-wrap: wrap;
        &__item {
          width: 152rpx;
          height: 64rpx;
          line-height: 64rpx;
          text-align: center;
          box-sizing: border-box;
          display: inline-block;
          background-color: #f7f7f8;
          border: 2rpx solid #f7f7f8;
          //padding: 8rpx 16rpx;
          margin: 0 24rpx 24rpx 0;
          border-radius: 100px;
          font-size: 24rpx;
          color: $v-c0-85;
          &.choosed {
            background: $v-tags-btn-disabled;
            border: 2rpx solid $v-tags-one;
            color: $color-primary-yellow;
          }
        }
      }
    }

    &-btn {
      font-size: 13px;
      line-height: 1;
      padding: 5px 15px;
      display: inline-block;
    }
    .btns {
      margin-top: 90rpx;
      padding: 20rpx 32rpx;
      display: flex;
      border-top: 1px solid rgba(24, 34, 65, 0.08);
      &-item {
        flex: 1;
        padding: 22rpx 0;
        margin-right: 36rpx;
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
        color: $v-c0-85;
        border: 1px solid #d3d4db;
        border-radius: 45px;
        &.color {
          margin-right: 0;
          background: #ff5319;
          border: 1px solid #ff5319;
          color: #fff;
        }
      }
    }
  }
</style>
