<template>
  <view>
    <view v-for="(item, index) in info" :key="index" class="select" @click="goDetail(item)">
      <view v-if="showChoice" class="m-r-16" @click.stop="clickChoose(item)">
        <VoIcon :name="item.choose ? 'select-right' : 'address_select'" color="#FF5319" />
      </view>
      <view class="select-right">
        <view class="select-right__title overTwoEllipsis">
          <text v-if="item.categoryType" class="title-label">{{ item.categoryType }}</text>
          <text class="title-name">{{ item.name }}</text>
        </view>
        <view class="flex flex-justify-between">
          <view>
            <view class="flex flex-vertical-c m-t-16">
              <view class="select-right__tips">现金参考价</view>
              <VoPointPrice
                :leftSize="14"
                :price="item.cashPrice || 0"
                class="lh42"
                color="rgba(0, 0, 0, 0.85)"
                display="inline-block"
              />
            </view>
            <view class="flex flex-vertical-c m-t-16">
              <view class="select-right__tips">账期参考价</view>
              <div v-if="item.accountPrice">
                <VoPointPrice
                  :leftSize="14"
                  :price="item.accountPrice || 0"
                  class="lh42"
                  color="rgba(0, 0, 0, 0.85)"
                  display="inline-block"
                />
                <text class="fz-28 color-block">/{{ item.accountPeriodDays }}天</text>
              </div>
              <div v-else>--</div>
            </view>
          </view>
          <view class="select-right__button" @click.stop="buttonShelf(item)">一键上架</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SelectProductItem',
    props: {
      // 是否展示选择按钮
      showChoice: {
        type: Boolean,
        default: false,
      },
      // 商品信息
      info: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 选择商品
       */
      clickChoose(e) {
        e.choose = !e.choose
        this.$emit('update:info', this.info)
        let arr = this.info.filter((item) => item.choose)
        this.$emit('arr', arr)
        // 向父组件传递手动全选的判断结果
        this.$emit('isSelectAll', arr.length >= this.info.length)
        this.$forceUpdate()
      },
      /**
       * 接收父页面全选功能
       * @param bool 接收父页面传递数据（是否全选）
       */
      selectAll(bool) {
        this.info.forEach((item) => {
          item.choose = bool
        })
        let arr = this.info.filter((item) => item.choose)
        this.$emit('arr', arr)
        this.$emit('update:info', this.info)
        this.$forceUpdate()
      },
      /**
       * 点击一键上架去设置商品信息页
       */
      buttonShelf(e) {
        // this.$emit('buttonShelf')
        // this.$VoHttp.GOODS.apiGoodsShelves({
        //   cashPrice: e.cashPrice,
        //   // engineIdentificationCode: e.,
        //   id: e.id,
        // })
        //   .then((res) => {
        //     this.$emit('soldOutSuccess', this.dataObj)
        //   })
        //   .catch((err) => {
        //     uni.$u.toast('操作失败')
        //   })
        uni.redirectTo({
          url: `/pagesAgent/PublishProduct/SetGoodsInfo?id=${e.id}`,
        })

        // this.$linkToEasy(`/pagesAgent/PublishProduct/SetGoodsInfo?id=${e.id}`)
      },
      goDetail(item) {
        this.$linkToEasy('/pagesAgent/PublishProduct/GoodsDetail?id=' + item.id)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .select {
    background: #fff;
    padding: 24rpx 32rpx;
    display: flex;
    align-items: center;
    margin-top: 16rpx;

    &-right {
      flex: 1;

      &__title {
        .title-label {
          font-size: 24rpx;
          height: 36rpx;
          line-height: 36rpx;
          padding: 2rpx 12rpx;
          background: $v-tags;
          box-sizing: border-box;
          border-radius: 24rpx;
          color: #fff;
          font-weight: normal;
          margin-right: 12rpx;
        }

        .title-name {
          font-size: 32rpx;
          line-height: 1.5;
          font-weight: bold;
          color: $v-c0-85;
          padding-bottom: 22rpx;
        }
      }

      &__tips {
        height: 36rpx;
        line-height: 36rpx;
        background: #f6f7f8;
        padding: 0 4rpx;
        box-sizing: border-box;
        font-size: 24rpx;
        color: $v-c0-65;
        border: 2rpx solid #d3d4db;
        border-radius: 4rpx;
        margin-right: 8rpx;
      }

      &__button {
        height: 56rpx;
        line-height: 56rpx;
        padding: 0 32rpx;
        box-sizing: border-box;
        font-size: 24rpx;
        color: #fff;
        background: $v-tags;
        border-radius: 30rpx;
        margin-top: 38rpx;
      }
    }
  }
</style>
