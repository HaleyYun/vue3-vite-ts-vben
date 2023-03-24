<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="good flex flex-column"
  >
    <VoNav is-fixed is-have-more title="销售商品">

    </VoNav>
    <view class="flex flex-justify-between good-search">
      <VoSearch
        v-model.trim="keyword"
        :actionStyle="{ color: '#fff' }"
        :showInsideAction="true"
        bgColor="#fff"
        borderColor="#FF5319"
        height="34"
        placeholder="请输入商品名称"
        @change="searchFn"
      />
      <!-- <view
        class="m-l-32 good-top__btn"
        @click="goTo('/pagesRecovery/SellGood/ReleaseSellGood/ReleaseSellGood')"
      >
        发布销售商品
      </view> -->
    </view>
    <!--   修改弹窗组件   -->
    <ModifyPopup
      ref="modifyPopup"
      :operationType="operationType"
      :show.sync="showModify"
      @editSuccess="getData(true)"
    />
    <view class="good-tabs">
      <EraTabs
        :current="current"
        :lineBottom="0"
        :list="tabs"
        activeStyle="color: #FF5319;font-size: 16px;font-weight: bold;padding-bottom:16px;padding-top:9px;"
        class="tabs"
        inactiveStyle="font-size: 14px;font-weight: 400;padding-bottom:16px;padding-top:9px;color:rgba(0, 0, 0, 0.45)"
        itemStyle="height: 48px;"
        @change="tabChange"
      />
    </view>
    <view v-if="current === 1" class="fliter-tags">
      <!--      <view class="tags">-->
      <!--        <view-->
      <!--          v-for="(item, index) in tagList"-->
      <!--          v-show="current === 1"-->
      <!--          :key="item.name"-->
      <!--          :class="item.choosed ? 'choosed' : ''"-->
      <!--          class="tag-item"-->
      <!--          @click="tagClick(item)"-->
      <!--        >-->
      <!--          {{ item.name }}-->
      <!--        </view>-->
      <!--        <view-->
      <!--          v-for="item in tagListOut"-->
      <!--          v-show="current === 2"-->
      <!--          :key="item.value"-->
      <!--          :class="item.choosed ? 'choosed' : ''"-->
      <!--          class="tag-item"-->
      <!--          @click="tagRuleClick(item)"-->
      <!--        >-->
      <!--          {{ item.name }}-->
      <!--        </view>-->
      <!--      </view>-->
      <EraSubsection
        :current="curNow"
        :list="tagList"
        activeColor="#8C8C8C"
        class="subsection"
        customStyle="background-color: #f7f7f8"
        inactiveColor="#262626"
        @change="sectionChange"
      />
    </view>
    <view>
      <!--    <GoodsPop ref="goodsPop" @confirm="batchEnd()" />-->
      <BottomOperation
        ref="bottomOperation"
        :status="current"
        @deleteFn="deleteFn"
        @select="selectAll"
        @selectAllCancel="selectAllCancel"
        @soldOut="soldOut"
        @soldUp="soldOut('up')"
      />
      <SuccessPop ref="successPop" />
      <ReasonModal ref="reasonModal" title="审核未通过原因" />
      <VoModal
        v-if="showStock"
        :show="showStock"
        showCancelButton
        @cancel="showStock = false"
        @confirm="editStock"
      >
        <view class="modal-content color-block">
          <view class="font-weight-500 p-b-48 text-center fz-32">
            {{ showStockInfo.name }}{{ showStockInfo.model }}
          </view>
          <block v-for="(item, index) in editStockInfo" :key="index">
            <view class="modal-content__row">
              <view class="flex">
                <view class="font-weight-500 m-r-48 fz-32 flex flex-vertical-c">
                  {{ showStockInfo.list[index].level }}类
                  <view
                    v-if="showStockInfo.list[index].availableNumber === 0"
                    class="color-red fz-24 lh150 m-l-8"
                    >无货
                  </view>
                </view>
                <u--input
                  v-model.number="item.changeNumber"
                  border="none"
                  color="rgba(0, 0, 0, 0.85)"
                  fontSize="16px"
                  inputAlign="right"
                  maxlength="10"
                  placeholder="请输入"
                  placeholderClass="create-form__placeholder"
                  type="number"
                  @change="checkedVal"
                />
              </view>
              <view class="text-right fz-28">
                库存：
                <text :class="{ tip: +showStockInfo.list[index].availableNumber === 0 }">
                  {{ showStockInfo.list[index].availableNumber }}
                </text>
              </view>
            </view>
          </block>
          <!--          <view-->
          <!--            v-if="-->
          <!--              !editStockInfo[0].changeNumber &&-->
          <!--              !editStockInfo[1].changeNumber &&-->
          <!--              !editStockInfo[2].changeNumber-->
          <!--            "-->
          <!--            class="fz-28 tip"-->
          <!--            >请至少填写一个成色商品库存数量</view-->
          <!--          >-->
        </view>
      </VoModal>
    </view>
    <swiper :current="current" class="swiper" @change="swiperChange">
      <swiper-item v-for="(item, index) in tabs" :key="index" class="swiper-item">
        <scroll-view
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          :scroll-y="true"
          class="scroll-list"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          refresher-enabled="true"
          scroll-top="0"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @scroll="onScroll"
          @scrolltolower="scrolltolower"
        >
          <!-- 下拉刷新组件 -->
          <VoListFresh :show="loadingStatus" />
          <GoodsItem
            v-for="listItem in infoList"
            :key="index + listItem.id"
            ref="goodsItem"
            :current="current"
            :dataObj="listItem"
            :selectAll="isSelectAll"
            :selectAllCancel="isSelectAllCancel"
            @addGoods="addGoods"
            @applySale="applySale"
            @click="toDetail(listItem)"
            @select="select"
            @selectCancel="selectCancel"
            @soldOutSuccess="soldOutGoods"
            @toEdit="goodsEdit"
            @viewReason="viewReason"
          />
          <VoLoadMore v-if="infoList.length" :show="noMore" />
          <VoNoData
            v-if="!infoList.length && !refresh"
            img-url="/static/noData/searchGoods.png"
            no-data-tips="暂无销售的商品"
          />
        </scroll-view>
      </swiper-item>
    </swiper>
    <view class="uploaded-footer p-b-safe-area">
      <EraButton
        circle
        text="发布销售商品"
        @click="goTo('/pagesRecovery/SellGood/ReleaseSellGood/ReleaseSellGood')"
      />
      <view class="p-b-safe-area"></view>
    </view>
  </view>
</template>
<script>
  import GoodsItem from '../components/GoodsItem.vue'
  import GoodsPop from '../components/GoodsPop.vue'
  import BottomOperation from '../components/BottomOperation.vue'
  import SuccessPop from '../components/SuccessPop.vue'
  import ReasonModal from '../components/ReasonModal.vue'
  import { formatterHandle, hideLoading, showLoading } from '@/common/helper'
  import ModifyPopup from '../components/ModifyPopup.vue'

  export default {
    name: 'MyGoods',
    // eslint-disable-next-line vue/no-unused-components
    components: { GoodsItem, GoodsPop, BottomOperation, SuccessPop, ReasonModal, ModifyPopup },
    data() {
      return {
        showStock: false,
        showModify: false,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        noMore: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        formatterInt: (value) => formatterHandle(value, 'int', 6, true),
        isLoading: false,
        keyword: '',
        current: 0,
        tabs: [],
        curNow: 0,
        operationType: '',
        tagList: [
          {
            name: '全部商品',
            choosed: true,
          },
          {
            name: '审核中',
            choosed: false,
            value: 1,
          },
          {
            name: '审核未通过',
            choosed: false,
            value: 2,
          },
        ],
        // tagListOut: [
        //   {
        //     name: '全部商品',
        //     choosed: true,
        //   },
        //   {
        //     name: '待整改',
        //     choosed: true,
        //     value: 3,
        //   },
        //   {
        //     name: '审核中',
        //     choosed: false,
        //     value: 4,
        //   },
        //   {
        //     name: '审核未通过',
        //     choosed: false,
        //     value: 5,
        //   },
        // ],
        infoList: [],
        selectList: [],
        isSelectAll: false,
        isSelectAllCancel: false,
        goodApprovalStatus: '',
        postData: {},
        goodStatus: 1,
        editStockInfo: [],
        showStockInfo: {
          list: [],
          model: '',
          name: '',
        },
      }
    },
    watch: {
      selectList(val) {
        //如果没有选择，隐藏全选弹层
        if (val.length === 0) {
          this.$refs.bottomOperation.close()
        }
      },
    },
    mounted() {
      let list = getCurrentPages().map((item) => {
        return item.currentPagePath
      })
      console.log(list)
      if (
        list.includes('pagesRecovery/RecycleOrders/RecycleOrders') ||
        list.includes('pagesRecovery/RecycleOrders/TypeRecordDetail')
      ) {
        this.current = 1
      }
    },
    onShow() {
      this.getData(true)
    },
    methods: {
      checkedVal() {
        this.editStockInfo.forEach((item) => {
          console.log(item)
          if (item.changeNumber && +item.changeNumber > 0) {
            let val = item.changeNumber.toString().replace(/[^\d^\.]+/g, '')
            val = val.replace(/\b(0+)/gi, '')
            item.changeNumber = parseInt(val)
          }
        })
      },
      sectionChange(index) {
        this.curNow = index
        this.getData(true)
      },
      searchFn(e) {
        this.keyword = e
        this.getData(true)
      },
      // 页面跳转方法
      goTo(url) {
        this.$linkToEasy(url)
      },
      //补货后刷新数据
      batchEnd() {
        this.getData(true)
      },
      toDetail(item) {
        this.$linkToEasy(`../ReleaseSellGood/ReleaseSellGood?id=${item.id}&type=${item.status}`)
      },
      //选择事件
      select(data) {
        this.isSelectAllCancel = false
        this.selectList.push(data)
        console.log('this.selectList', this.selectList)
        this.$refs.bottomOperation.show()
      },
      //选择取消
      selectCancel(data) {
        this.selectList.forEach((item, index) => {
          if (item.id === data.id) {
            this.selectList.splice(index, 1)
          }
        })
        console.log('this.selectListdel', this.selectList)
      },
      //选择全部
      selectAll() {
        this.isSelectAllCancel = false
        this.isSelectAll = true
        this.selectList = this.infoList
      },
      selectAllCancel() {
        this.isSelectAll = false
        this.selectReset()
      },
      //重置
      selectReset() {
        this.selectList = []
        this.$refs.bottomOperation.close()
        this.isSelectAll = false
        this.isSelectAllCancel = true
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        // this.getData(true)
        // this.selectReset()
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
        this.getData(true)
        this.selectReset()
      },
      //获取列表数据
      getData(refresh) {
        // return
        showLoading()
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          queryStatus: this.current + 1,
          keyword: this.keyword || '',
          orderProperty: 'update_time',
          orderType: 'DESC',
        }
        if (this.current === 1) {
          console.log(this.curNow)
          params.status = this.curNow || null
        }
        this.$VoHttp
          .apiGoodsRecycleResaleMyGoodsList(params)
          .then((res) => {
            if (+res.code === 20001) {
              console.log(res)
              let data = res.data.pageResult.records || []
              this.total = res.data.pageResult.total
              let arr = []
              res.data.statistics.forEach((item) => {
                let obj = {
                  name: item.statisticName,
                  count: item.statisticCount,
                }
                arr.push(obj)
              })
              this.tabs = arr
              this.infoList = this.infoList.concat(data)
              this.noMore = this.infoList.length >= this.total
              console.log('this.infoList', this.infoList)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              hideLoading()
            } else {
              uni.$u.toast(res.message)
              hideLoading()
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
            hideLoading()
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        // if (this.loadingStatus) return
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData()
        }
      },
      //滚到底部加载
      scrolltolower() {
        if (this.loadingStatus) return
        this.loadingStatus = true
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.infoList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.getData()
        }, 2000)
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
      //显示弹框
      showPopup() {},
      //补货
      addGoods(data) {
        console.log(data)
        this.editStockInfo = []
        this.showStockInfo.list = []
        data.levelVOS.forEach((item) => {
          console.log(item)
          if (item.id) {
            let objShow = {
              availableNumber: item.availableNumber,
              level: item.level,
            }
            let objData = {
              goodsId: item.id,
              changeNumber: '',
            }
            this.editStockInfo.push(objData)
            this.showStockInfo.list.push(objShow)
          }
        })
        this.showStockInfo.model = data.model
        this.showStockInfo.name = data.name
        this.showStock = true
      },
      // 修改库存
      async editStock() {
        if (
          !this.editStockInfo[0].changeNumber &&
          !this.editStockInfo[1].changeNumber &&
          !this.editStockInfo[2].changeNumber
        ) {
          this.showStock = false
          return
        }
        try {
          this.editStockInfo.forEach((item) => {
            item.changeNumber = item.changeNumber === '' ? null : item.changeNumber
          })
          const data = await this.$VoHttp.apiWarehouseOperRecyclingSelfModifyBatch({
            boList: this.editStockInfo,
          })
          if (+data.code === 20001) {
            this.showStock = false
            this.$refs.successPop.show()
            setTimeout(() => {
              this.$refs.successPop.close()
            }, 1000)
            this.getData(true)
          }
        } catch (e) {
          uni.$u.toast(e.message || '请求失败')
        }
      },
      //删除
      deleteFn() {
        this.$refs.successPop.show()
        setTimeout(() => {
          this.$refs.successPop.close()
        }, 1000)
      },
      //批量上、下架
      soldOut(key) {
        let ids = this.selectList.map((item) => {
          return item.id
        })
        let params = {}
        if (key === 'up') {
          params = {
            status: 1,
            violationStatus: 3,
            ids: ids,
          }
        } else {
          params = {
            status: 4,
            violationStatus: 3,
            ids: ids,
          }
        }
        this.$VoHttp
          .apiGoodsStatusUpdate(params)
          .then((res) => {
            this.soldOutGoods()
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      //审核状态筛选事件
      tagClick(detail) {
        console.log('detail', detail)
        this.tagList.forEach((tag) => {
          tag.choosed = detail.name === tag.name ? true : false
        })
        this.goodApprovalStatus = detail.value || ''
        this.getData(true)
      },
      //违规状态筛选事件
      // tagRuleClick(detail) {
      //   this.tagListOut.forEach((tag) => {
      //     tag.choosed = detail.name === tag.name ? true : false
      //   })
      //   this.goodApprovalStatus = detail.value || ''
      //   this.getData(true)
      // },
      //查看原因
      viewReason(detail) {
        this.$refs.reasonModal.show(detail.result)
      },
      //下架
      soldOutGoods() {
        this.$refs.successPop.show()
        setTimeout(() => {
          this.$refs.successPop.close()
        }, 1000)
        this.getData(true)
      },
      /**
       * 去修改商品页
       */
      goodsEdit(item) {
        // this.operationType = 'edit'
        // this.showModify = true
        // this.$refs.modifyPopup.init(data)
        this.$linkToEasy(`../ReleaseSellGood/ReleaseSellGood?id=${item.id}&type=${item.status}`)
      },
      //申请上架
      applySale(data) {
        this.operationType = 'up'
        this.showModify = true
        this.$refs.modifyPopup.init(data)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .good {
    height: 100vh;
    // background: #fff;
    overflow-x: hidden;
    // padding: 40rpx 32rpx;
    // box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .nav-right {
      display: flex;
      width: auto;

      &__btn {
        background: #22284b;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: #ffffff;
        padding: 14rpx 36rpx;
        text-align: center;
        margin-right: 24rpx;
      }
    }

    &-search {
      background: #fff;
      padding: 10rpx 16rpx;

      &__btn {
        width: 176rpx;
      }
    }

    &-tabs {
      background-color: #ffffff;
    }

    .swiper {
      flex-grow: 1;

      &-item,
      .scroll-list {
        height: 100%;
      }
    }

    .fliter-tags {
      //width: 100%;
      //height: 100rpx;
      //display: flex;
      //background: #fff;
      //align-items: center;
      //// border-top: 1px solid $v-c0-08;
      //box-shadow: inset 0px 1px 0px #f7f7f8;
      height: 100rpx;
      padding-left: 32rpx;
      padding-right: 32rpx;
      background: #fff;

      .subsection {
        margin-top: 20rpx;
      }

      .tags {
        flex: 1;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
      }

      .tag-item {
        display: inline-block;
        font-size: 10px;
        background-color: #f7f7f8;
        padding: 8rpx 16rpx;
        text-align: center;
        margin: 22rpx 0 22rpx 32rpx;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: $v-c0-85;

        &.choosed {
          background: $v-error-btn-disabled;
          border: 1px solid $v-error-light-two;
          color: #e50012;
        }
      }
    }
    .uploaded-footer {
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }

  .modal-content {
    // padding: 40rpx 64rpx;
    box-sizing: border-box;

    &__row {
      padding-bottom: 48rpx;
    }

    .tip {
      color: #ee0a24;
    }
  }

  .good-top__btn {
    padding: 0rpx 16rpx;
    border-radius: 64rpx;
    background: #ff5319;
    font-size: 24rpx;
    line-height: 56rpx;
    height: 56rpx;
    color: white;
  }
</style>
