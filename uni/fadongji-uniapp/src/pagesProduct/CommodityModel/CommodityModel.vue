<template>
  <view class="model flex flex-column">
    <VoNav is-fixed is-have-more title="商品型号">

    </VoNav>
    <view class="model-search flex flex-vertical-c">
      <VoSearch v-model="keyword" height="34" placeholder="请输入关键字进行搜索" @custom="searchHandler" />
    </view>
    <view v-if="modelList.length > 0" class="model-list">
      <view
        v-for="(info, index) of modelList"
        :key="index"
        class="model-list__block flex flex-vertical-c"
      >
        <view class="block-con m-r-8 flex1">{{ info.value }}</view>
        <image
          class="block-icon"
          src="/static/created/product/delete.png"
          @click="tagDelete(info, index)"
        />
      </view>
    </view>
    <view class="model-middle flex1">
      <ModelList
        ref="modelRef"
        :model-list="modelList"
        :result-data="resultData"
        @goodsModel="goodsModelFn"
      />
      <TypeList
        v-for="(item, index) of typeList"
        :key="index"
        :ref="item.id"
        :model-list="modelList"
        :tips-type="tipsType"
        :type-list="item"
        @goodsModel="goodsModel"
      />
    </view>
    <view class="p-b-safe-area">
      <view class="model-bottom flex">
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
          @click="confirmHandler"
        />
      </view>
    </view>
  </view>
</template>

<script>
  import TypeList from '../components/TypeList'
  import ModelList from '../components/ModelList'

  export default {
    name: 'CommodityModel',
    components: { TypeList, ModelList },
    data() {
      return {
        modelName: '',
        modelId: '',
        resultData: [],
        keyword: '',
        tipsType: true,
        modelList: [],
        typeList: [],
        categoryId: '',
        chartKey: '',
      }
    },
    onShow() {
      this.modelList = uni?.$VoPutProductForm?.skuProperty || []
      this.initData()
    },
    onLoad(option) {
      this.categoryId = option.id
      this.chartKey = option.chartKey ? option.chartKey : ''
    },
    methods: {
      // 搜索操作
      searchHandler() {
        this.typeList = []
        this.initData()
      },
      // 重置操作
      resetHandler() {
        this.modelList.forEach((item) => {
          this.$refs[item.key][0].clear()
        })
        this.modelList = []
      },
      // 初始化商品型号数据
      async initData() {
        // apiGoodsModelSaleList
        // GOODS.apiGoodsSkuQueryApplyList
        const ret = await this.$VoHttp.GOODS.apiGoodsSkuQueryApplyList({
          categoryId: this.categoryId,
          isEnable: 1,
          name: this.keyword,
        })
        const resultData = await this.$VoHttp.apiGoodsModelSaleList({
          categoryId: this.categoryId,
          isEnable: 1,
          keyword: this.keyword,
        })
        this.typeList = ret.data
        console.log('this.typeList ', this.typeList)
        this.resultData = resultData.data
      },
      goodsModel(e) {
        const index = this.modelList.findIndex((item) => item.key === e.key)
        if (index > -1) {
          this.modelList[index] = e
        } else {
          this.modelList.push(e)
        }
        this.$forceUpdate()
      },
      goodsModelFn(e) {
        this.modelId = e.value.id
        this.modelName = e.value.model

        const index = this.modelList.findIndex((item) => item.id === 'model')

        if (index > -1) {
          this.modelList[index] = { value: e.value.model, key: e.value.id, id: 'model' }
        } else {
          this.modelList.push({ value: e.value.model, key: e.value.id, id: 'model' })
        }
        this.$forceUpdate()
      },
      tagDelete(info, index) {
        this.modelList.splice(index, 1)
        if (info.id) {
          this.$refs.modelRef.clear()
          this.modelId = ''
          this.modelName = ''
        } else {
          this.$refs[info.key][0].clear()
        }
      },
      confirmHandler() {
        if (this.modelId === '') {
          this.$u.toast('请先选择商品型号')
          return
        }
        //上货和修改商品区分开
        if (this.chartKey === '$VoEditProductForm') {
          uni['$VoEditProductForm'].skuProperty = this.modelList
          if (uni['$VoEditProductForm'].modelId) {
            uni['$VoEditProductForm'].isChangeModel =
              uni['$VoEditProductForm'].modelId !== this.modelId
          } else {
            uni['$VoEditProductForm'].isChangeModel = true
          }
          uni['$VoEditProductForm'].modelId = this.modelId
          uni['$VoEditProductForm'].skuPropertyName =
            this.modelName +
            this.modelList.map((item) => (item.id === 'model' ? '' : item.value)).join('')
          uni['$VoEditProductForm'].isChangeName = true
        } else {
          uni['$VoPutProductForm'].skuProperty = this.modelList
          if (uni['$VoPutProductForm'].modelId) {
            uni['$VoPutProductForm'].isChangeModel =
              uni['$VoPutProductForm'].modelId !== this.modelId
          } else {
            uni['$VoPutProductForm'].isChangeModel = true
          }
          uni['$VoPutProductForm'].modelId = this.modelId
          uni['$VoPutProductForm'].skuPropertyName =
            this.modelName +
            this.modelList.map((item) => (item.id === 'model' ? '' : item.value)).join('')
        }
        this.$backFn()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .model {
    height: 100vh;
    background-color: #f6f7f8;

    &-operate {
      display: flex;
      align-items: center;

      &__icon {
        margin-left: 28rpx;
      }
    }

    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      margin-bottom: 16rpx;
    }

    &-list {
      width: 750rpx;
      overflow-x: scroll;
      display: flex;
      flex-wrap: nowrap;
      padding: 8rpx 32rpx 24rpx;
      box-sizing: border-box;

      &__block {
        height: 36rpx;
        background: $v-tags-btn-disabled;
        border: 2rpx solid $color-primary-yellow;
        border-radius: 32rpx;
        box-sizing: border-box;
        padding: 0 8rpx 0 16rpx;
        margin-right: 24rpx;
        white-space: nowrap;

        &:last-child {
          margin-right: 0;
        }

        .block-con {
          font-size: 24rpx;
          color: $color-primary-yellow;
          background-color: $v-tags-btn-disabled;
          border-top: 2rpx solid $color-primary-yellow;
          border-bottom: 2rpx solid $color-primary-yellow;
          height: 32rpx;
          line-height: 32rpx;
        }

        .block-icon {
          width: 24rpx;
          height: 24rpx;
        }
      }
    }

    &-middle {
      height: 100%;
      background: #fff;
      overflow-y: scroll;
    }

    &-bottom {
      width: 750rpx;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
    }
  }

  .p-b-safe-area {
    background: #ffffff !important;
  }
</style>
