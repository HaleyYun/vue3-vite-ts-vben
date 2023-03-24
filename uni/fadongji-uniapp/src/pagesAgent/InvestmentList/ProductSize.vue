<template>
  <view class="model flex flex-column">
    <VoNav is-fixed is-have-more title="型号">

    </VoNav>
    <view class="model-search flex flex-vertical-c">
      <VoSearch
        v-model="keyword"
        placeholder="请输入搜索"
        @custom="searchHandler"
        @search="searchHandler"
      />
    </view>
    <!--    <view v-if="skuProperties.length > 0" class="model-list">-->
    <!--      <view-->
    <!--          v-for="(info, index) of skuProperties"-->
    <!--          :key="index"-->
    <!--          class="model-list__block flex flex-vertical-c"-->
    <!--      >-->
    <!--        <view class="block-con m-r-8 flex1">{{ info.value || info.model }}</view>-->
    <!--        <image-->
    <!--            class="block-icon"-->
    <!--            src="/static/created/product/delete.png"-->
    <!--            @click="tagDelete(info, index)"-->
    <!--        />-->
    <!--      </view>-->
    <!--      -->
    <!--    </view>-->
    <view class="model-middle flex1">
      <NewModelList
        ref="toClear"
        :model-list="modelList"
        :selectValue="modelSelect"
        :tips-type="true"
        :type-list="typeList"
        @goodsModel="getModelId"
      />
      <TypeList
        v-for="(item, index) of skuPropertiesList"
        :key="index"
        :ref="item.id"
        :model-list="skuProperties"
        :tips-type="tipsType"
        :type-list="item"
        @goodsModel="goodsModel"
      />
    </view>
    <view class="p-b-safe-area">
      <view class="model-bottom flex">
        <u-button
          :plain="true"
          customStyle="width: 326rpx;height: 92rpx;color: rgba(0, 0, 0, 0.85);"
          shape="circle"
          size="large"
          text="重置"
          @click="resetHandler"
        />
        <u-button
          :text="sureNum > 0 ? '确定 (' + sureNum + ')' : '确定'"
          color="#FF5319"
          customStyle="width: 326rpx;height: 92rpx;margin-left: 32rpx;"
          shape="circle"
          size="large"
          @click="confirmHandler"
        />
      </view>
    </view>
  </view>
</template>

<script>
  import TypeList from './components/TypeList'
  import NewModelList from '@/pagesAgent/InvestmentList/components/NewModelList'

  export default {
    name: 'ProductSize',
    components: { NewModelList, TypeList },
    data() {
      return {
        keyword: '',
        sureNum: 0,
        tipsType: true,
        modelList: [],
        typeList: [],
        skuProperties: [],
        skuPropertiesList: [],
        categoryId: '',
        modelSelect: [], // 选中型号
      }
    },
    onShow() {
      this.skuProperties = uni?.$VoPutProductForm?.skuProperty || []
      this.initData()
    },
    onLoad(option) {
      this.categoryId = option.id
      this.modelSelect = option.modelList ? JSON.parse(option.modelList) : []
      console.log(this.modelSelect, 'xx')
    },
    methods: {
      // 搜索操作
      searchHandler() {
        this.skuPropertiesList = []
        this.initData()
      },
      // 重置操作
      resetHandler() {
        this.skuPropertiesList.forEach((item, index) => {
          console.log(item, 'clear')
          this.$refs[item.id][index].clear()
        })
        this.skuProperties = []
        this.$refs.toClear.clear()
        this.modelList = []
        this.modelSelect = []
        this.sureNum = 0
      },
      // 初始化商品型号数据
      async initData() {
        const data = await this.$VoHttp.apiGoodsModelSaleList({
          // categoryId: this.categoryId,
          categoryId: '1000000001',
          keyword: this.keyword,
        })
        const ret = await this.$VoHttp.GOODS.apiGoodsSkuQueryApplyList({
          categoryId: '1000000001',
          keyword: this.keyword,
        })
        this.skuPropertiesList = ret.data
        this.typeList = data.data
        console.log(this.typeList, 8888888888)
      },
      goodsModel(e) {
        const index = this.skuProperties.findIndex((item) => item.value === e.value)
        if (index > -1) {
          this.skuProperties.splice(index, 1)
          this.sureNum--
        } else {
          this.skuProperties.push(e.value)
          this.sureNum++
        }
        this.$forceUpdate()
      },
      getModelId(e) {
        const index = this.modelList.findIndex((item) => item.id === e.id)
        if (index > -1) {
          this.modelList.splice(index, 1)
          this.sureNum--
        } else {
          this.modelList.push(e.id)
          this.modelSelect.push(e)
          this.sureNum++
        }
        this.$forceUpdate()
      },
      tagDelete(info, index) {
        this.skuProperties.splice(index, 1)
        this.$refs[info.key][0].clear()
      },
      /**
       * 确定
       */
      confirmHandler() {
        let obj = { skuProperties: [], modelList: [] }
        if (this.skuProperties && this.skuProperties.length) {
          obj.skuProperties = this.skuProperties
        }
        if (this.modelList && this.modelList.length) {
          obj.modelList = this.modelList
        }
        uni.$emit('obj', obj)
        console.log('this.modelSelect', this.modelSelect)
        uni.$emit('selectModel', this.modelSelect)
        // uni['$VoPutProductForm'].skuProperty = this.skuProperties
        // uni['$VoPutProductForm'].skuPropertyName = this.skuProperties.map((item) => item.value).join('')
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
        background: $v-error-btn-disabled;
        border: 2rpx solid $v-error-light-two;
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
          color: #e50012;
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
