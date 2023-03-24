<template>
  <view v-on="$listeners">
    <view class="template flex overflow-hidden vh-full flex-column">
      <VoNav is-fixed is-have-more title="选模板" />

      <view class="template-search flex flex-vertical-c">
        <VoSearch
          v-model="keyword"
          class="flex1"
          height="34"
          placeholder="请输入搜索"
          @change="searchHandler"
        />
        <view class="m-l-24 fz-28 lh150 color-block" @click="toFilter">筛选</view>
        <view class="relative h40">
          <VoIcon :opacity="0.25" :size="20" name="filter" @click="toFilter" />
          <view class="bagde" v-if="bagdeNum">{{ bagdeNum }}</view>
        </view>
      </view>
      <scroll-view
        :refresher-triggered="refresherTriggered"
        class="flex1 overflow-hidden"
        enable-back-to-top
        refresher-enabled
        scroll-y
        style="height: 100%"
        @refresherrefresh="refresherrefresh"
        @scrolltolower="scrolltolower"
      >
        <view style="height: 100%">
          <view v-if="templateBlockList.length > 0">
            <TemplateBlock
              v-for="(item, index) in templateBlockList"
              :key="index"
              v-show="item.skuPropertys && item.skuPropertys.length"
              :template-block="item"
              class="m-t-24"
              @click="chooseTemplate(item.id)"
            />
          </view>
          <VoNoData v-else />
          <view v-if="loading" class="text-center fz-25 py-20 color-gray">
            <text>数据加载中</text>
          </view>

          <!--          <view v-else class="text-center fz-25 py-20 color-gray">-->
          <!--            <text v-if="hasMore">加载更多</text>-->
          <!--            <text v-else>暂无更多数据</text>-->
          <!--          </view>-->
        </view>
      </scroll-view>
    </view>
    <u-popup :show="showTemplateType" mode="right" @close="close" @open="open">
      <TemplateTypePopup
        ref="templateTypePopup"
        :category-list="analyzerNames"
        @determine="determine"
        :selectData="selectList"
      />
    </u-popup>
    <!--  修改分类后提示清空信息：start	-->
    <VoModal
      :show="showProductType"
      close-on-click-overlay
      content="使用模板后，所填商品信息将会被清空。确认要修改吗？"
      show-cancel-button
      @cancel="cancel"
      @confirm="confirm"
    />
    <!--  修改分类后提示清空信息：end	-->
  </view>
</template>

<script>
  import TemplateBlock from '../components/TemplateBlock'
  import TemplateTypePopup from '../components/TemplateTypePopup'

  export default {
    name: 'ChooseTemplate',
    components: { TemplateBlock, TemplateTypePopup },
    data() {
      return {
        indexList: [],
        urls: [],
        hasMore: true,
        loading: false,
        refresherTriggered: false,
        pageQuery: {
          pageNo: 1,
          pageSize: 20,
        },
        showProductType: false,
        keyword: '', // 搜索双向绑定
        showTemplateType: false, // 模板类型弹出层
        templateBlockList: [],
        categoryList: [
          // {
          //   id: 1,
          //   name: '平台模板',
          //   selected: true,
          // },
          // {
          //   id: 2,
          //   name: '自建模板',
          //   selected: false,
          // },
        ],
        selectId: '',
        analyzerNames: [],
        modelIds: [],
        bagdeNum: 0,
        selectList: [], //回显筛选值
      }
    },
    onLoad() {
      this.queryData()
    },
    created() {},
    methods: {
      searchHandler(res) {
        this.pageQuery.pageNo = 1
        this.templateBlockList.length = 0
        this.queryData()
      },
      // 自定义下拉刷新
      refresherrefresh() {
        this.pageQuery.pageNo = 1
        this.pageQuery.pageSize = 20
        this.hasMore = true
        this.templateBlockList = []
        this.refresherTriggered = true
        this.queryData()
      },
      // 选择目标
      chooseTemplate(id) {
        this.selectId = id
        const isEdit = this.$storage.get('isEdit')
        if (isEdit) {
          this.showProductType = true
        } else {
          uni.$u.route({
            url: '/pagesProduct/PutProduct/PutProduct',
            params: {
              tid: this.selectId,
            },
          })
        }
      },
      // 滑动到底部后，进行加载更多判断
      scrolltolower() {
        // 加载更多
        console.log(this.hasMore)
        if (this.hasMore && !this.loading) {
          this.pageQuery.pageNo += 1
          this.queryData()
        }
      },
      // 取消选择模板
      cancel() {
        this.showProductType = false
      },
      // 确认选择模板
      confirm() {
        // 确认选择模板后，进行抛出然后通知到
        this.showProductType = false
        this.showTemplateType = false
        uni.$u.route({
          url: '/pagesProduct/PutProduct/PutProduct',
          params: {
            tid: this.selectId,
          },
        })
      },
      /**
       * 打开模板类型弹出层
       */
      toFilter() {
        this.showTemplateType = true
        this.$nextTick(() => {
          this.$refs.templateTypePopup.initData()
        })
      },
      open() {
        // console.log('open');
      },
      /**
       * 关闭模板类型弹出层
       */
      close() {
        this.showTemplateType = false
        // console.log('close');
      },
      /**
       * 点击模板类型确定按钮
       */
      determine(val) {
        this.selectList = val
        let modelIds = []
        let analyzerNames = []
        val.map((item) => {
          if (item.type === 'goodType' || item.type === 'skuType') {
            analyzerNames.push(item.name)
          } else if (item.type === 'modelType') {
            modelIds.push(item.id)
          }
        })
        this.modelIds = modelIds
        this.analyzerNames = analyzerNames
        let num = val.length
        if (num <= 30) {
          this.bagdeNum = num
        } else if (num > 30 && num < 40) {
          this.bagdeNum = '30+'
        } else if (num >= 40 && num < 50) {
          this.bagdeNum = '40+'
        } else if (num >= 50 && num < 60) {
          this.bagdeNum = '50+'
        } else if (num >= 70 && num < 80) {
          this.bagdeNum = '60+'
        } else if (num >= 90 && num < 100) {
          this.bagdeNum = '90+'
        } else if (num >= 100) {
          this.bagdeNum = '99+'
        }
        this.showTemplateType = false
        this.templateBlockList = []
        this.pageQuery.pageNo = 1
        this.queryData()
      },
      // 获取数据
      async queryData() {
        this.loading = true

        try {
          const ret = await this.$VoHttp.GOODS.apiGoodsTemplateQueryList({
            ...this.pageQuery,
            name: this.keyword,
            analyzerNames: this.analyzerNames, //商品类型和sku
            modelIds: this.modelIds, //型号
          })
          this.templateBlockList = this.templateBlockList.concat(ret.data.records)
          this.hasMore = this.templateBlockList.length < ret.data.total
          this.loading = false
          this.refresherTriggered = false
        } catch (e) {
          this.loading = false
          this.refresherTriggered = false
          console.warn(e, 'ChooseTemplate')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .template {
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

      &__icon {
        width: 48rpx;
        height: 48rpx;
      }
    }

    .bagde {
      text-align: center;
      font-size: 20rpx;
      color: #ffffff;
      background: #f20014;
      border-radius: 8px;
      position: absolute;
      width: 32rpx;
      height: 32rpx;
      right: -16rpx;
      top: -16rpx;
    }
  }
</style>
