<template>
  <view class="par flex flex-column">
    <VoNav title="商品参数" is-have-more />
    <scroll-view class="flex1 scroll-over" scroll-y>
      <view class="m-t-24">
        <view v-for="(item, index) in typeList" :key="index" class="par-middle">
          <view v-if="item.entryMethod === 1" class="par-middle__type">
            <view class="type-title p-t-24 p-b-24">
              <text v-if="item.isRequired === 1" class="type-title__red">*</text>
              {{ item.name }}
            </view>
            <view class="type-template">
              <block v-for="value of item.value">
                <view
                  v-if="item.value.length > 10"
                  :key="value"
                  :class="selectMap.get(item.id) === value ? 'select' : 'no-select'"
                  class="type-template__choose"
                  @click="chooseFn(item.id, value)"
                >
                  {{ value }}{{ item.unit }}
                </view>
                <view
                  v-else
                  :key="value"
                  :class="selectMap.get(item.id) === value ? 'select' : 'no-select'"
                  class="type-template__choose"
                  @click="chooseFn(item.id, value)"
                >
                  {{ value }}{{ item.unit }}
                </view>
              </block>
            </view>
          </view>
          <view v-else class="par-middle__type line flex flex-justify-between flex-vertical-c">
            <view class="type-title">
              <text v-if="item.isRequired === 1" class="type-title__red">*</text>
              {{ item.name }}
            </view>
            <view class="p-r-30">
              <u-input
                v-model="item.val"
                :type="item.entryMethod === 2 ? 'text' : item.type === 1 ? 'text' : 'digit'"
                border="none"
                clearable
                input-align="right"
                maxlength="50"
                placeholder="请输入"
                @change="inputChange($event, item.id)"
              >
                <view slot="suffix"> {{ item.unit }}</view>
              </u-input>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="par-bottom flex">
      <u-button
        :plain="true"
        color="rgba(0, 0, 0, 0.85)"
        customStyle="width: 334rpx;height: 92rpx;border: 2rpx solid rgba(0, 0, 0, 0.25);"
        shape="circle"
        size="large"
        text="重置"
        @click="resetHandler"
      />
      <u-button
        color="#FF5319"
        customStyle="width: 334rpx;height: 92rpx;margin-left: 36rpx;"
        shape="circle"
        size="large"
        text="确定"
        @click="determine"
      />
    </view>
    <VoSafetyArea :is-fixed="false" />
  </view>
</template>

<script>
  export default {
    name: 'CommodityParameter',
    components: {},
    data() {
      return {
        showGoodsType: false, // 商品类型弹出层
        typeList: [],
        selectKey: [],
        selectMap: new Map(),
        origin: '',
      }
    },
    onShow() {},
    onLoad(option) {
      this.origin = option.origin || ''
      let originSkuProperty = []
      if (this.origin === 'editProduct') {
        originSkuProperty = uni?.$VoEditProductForm?.paramsProperty || []
      } else {
        originSkuProperty = uni?.$VoPutProductForm?.paramsProperty || []
      }
      if (originSkuProperty.length) {
        originSkuProperty.forEach((item) => {
          this.selectMap.set(item.key, item.value)
        })
      }
      this.$forceUpdate()
      this.initData(option.id)
    },
    watch: {
      selectMap: {
        deep: true,
        handler(newVal) {
          console.log(newVal, 'ss')
        },
      },
    },
    methods: {
      inputChange(e, id) {
        this.selectMap.set(id, e)
        this.$forceUpdate()
      },
      // 重置
      resetHandler() {
        this.selectMap.clear()
        this.$forceUpdate()
      },
      // 初始化数据
      async initData(categoryId) {
        const { code, data } = await this.$VoHttp.GOODS.apiGoodsParamsPropertyQueryApplyList({
          categoryId,
        })
        if (+code === 20001) {
          this.typeList = data.records.map((item) => {
            return {
              ...item,
              val: this.selectMap.get(item.id) || '',
            }
          })
        }
        this.$forceUpdate()
      },
      // 选择条目
      chooseFn(key, value) {
        if (value === this.selectMap.get(key)) {
          this.selectMap.delete(key)
        } else {
          this.selectMap.set(key, value)
        }
        this.$forceUpdate()
      },
      /**
       * 打开商品类型弹出层
       */
      openType() {},
      /**
       * 关闭商品类型弹出层
       */
      closeType() {
        this.showGoodsType = false
      },
      /**
       * 点击商品类型确定按钮
       */
      determine() {
        // 检测必选的参数是否都已经选择
        const result = this.typeList.every((item) => {
          if (item.isRequired === 1) {
            return this.selectMap.get(item.id)
          } else {
            return true
          }
        })
        if (!result) {
          return this.$u.toast('请完善商品参数必填信息')
        }

        const paramsProperty = []
        this.selectMap.forEach(($value, $key) => {
          paramsProperty.push({
            key: $key,
            value: $value,
          })
        })
        if (this.origin === 'editProduct') {
          uni['$VoEditProductForm']['paramsProperty'] = paramsProperty
        } else {
          uni['$VoPutProductForm']['paramsProperty'] = paramsProperty
        }
        this.resetHandler()
        this.$backFn()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .par {
    height: 100vh;
    background-color: #f6f7f8;
    overflow: hidden;

    &-operate {
      display: flex;
      align-items: center;

      &__icon {
        margin-left: 28rpx;
      }
    }

    &-middle {
      width: 750rpx;
      padding-left: 32rpx;
      box-sizing: border-box;
      background: #ffffff;

      &__type {
        padding: 24rpx 0;

        .type-title {
          font-size: 30rpx;
          color: $v-c0-85;
          // height: 46rpx;
          line-height: 46rpx;
          word-break: break-all;

          &__red {
            color: $v-error;
          }
        }

        .type-right {
          padding-right: 32rpx;
          height: 46rpx;
          line-height: 46rpx;
          font-size: 30rpx;
          color: $v-c0-65;
        }

        .type-template {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-left: 42rpx;

          &__choose {
            box-sizing: border-box;
            padding: 14rpx 32rpx;
            // height: 64rpx;
            font-size: 24rpx;
            border-radius: 80rpx;
            line-height: 1.5;
            // text-align: center;
            margin-bottom: 24rpx;
            margin-right: 48rpx;
            // white-space: nowrap;
          }

          &__choose1 {
            box-sizing: border-box;
            padding: 14rpx 32rpx;
            //height: 64rpx;
            font-size: 24rpx;
            border-radius: 80rpx;
            line-height: 1.5;
            //text-align: center;
            margin-bottom: 24rpx;
            margin-right: 48rpx;
            //white-space: nowrap;
          }
        }
      }
    }

    &-bottom {
      width: 750rpx;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
    }
  }

  .no-select {
    color: $v-c0-85;
    background: $v-bg-light !important;
    border: 2rpx solid transparent;
  }

  .select {
    color: $color-primary-yellow;
    background: $v-tags-btn-disabled;
    border: 2rpx solid $color-primary-yellow;
    box-sizing: border-box;
    //line-height: 60rpx;
  }

  .line {
    border-bottom: 2rpx solid $v-bg-light;
  }

  .scroll-over {
    height: 100%;
    overflow-y: scroll;
  }
</style>
