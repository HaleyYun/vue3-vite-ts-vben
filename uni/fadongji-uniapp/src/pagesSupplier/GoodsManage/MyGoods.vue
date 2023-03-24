<template>
  <view>
    <view class="good">
      <VoNav :left-width="230" :right-width="230" is-fixed is-have-more title="商品管理">

        <view slot="operation" class="nav-right" @click="toSale">
          <view class="nav-right__btn">上货</view>
        </view>
      </VoNav>
      <view class="top-search">
        <VoSearch
          v-model="keyword"
          :showInsideAction="true"
          bgColor="#fff"
          borderColor="#FF5319"
          height="34"
          placeholder="搜索商品名称"
          @custom="searchFn"
          @search="searchFn"
        />
      </view>
      <view class="good-tabs">
        <EraTabs
          :current="current"
          :list="tabs"
          activeStyle="font-size: 32rpx;color: #FF5319;font-weight: bold;"
          class="tabs"
          inactiveStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.45);"
          itemStyle="padding: 24rpx 24rpx 30rpx 24rpx;"
          @change="tabChange"
        />
      </view>
      <view v-if="current === 1 || current === 3" class="fliter-tags">
        <view class="tags">
          <view
            v-for="(item, index) in tagList"
            v-show="current === 1"
            :key="item.name"
            :class="item.choosed ? 'choosed' : ''"
            class="tag-item"
            @click="tagClick(item)"
          >
            {{ item.name }}
          </view>
          <view
            v-for="item in tagListOut"
            v-show="current === 3"
            :key="item.value"
            :class="item.choosed ? 'choosed' : ''"
            class="tag-item"
            @click="tagRuleClick(item)"
          >
            {{ item.name }}
          </view>
        </view>
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
              :key="listItem.id"
              ref="goodsItem"
              :current="current"
              :dataObj="listItem"
              @addGoods="addGoods"
              @click="toDetail(listItem)"
              @select="select"
              @selectCancel="selectCancel"
              @soldOutSuccess="soldOutGoods"
              @viewReason="viewReason"
            />
            <VoNoData v-if="!infoList.length && !refresh" />
          </scroll-view>
        </swiper-item>
      </swiper>
      <GoodsPop ref="goodsPop" @confirm="batchEnd()" />
    </view>
    <BottomOperation
      ref="bottomOperation"
      :status="current"
      :total="selectList.length"
      @deleteFn="deleteFn"
      @select="selectAll"
      @selectAllCancel="selectAllCancel"
      @soldOut="soldOut"
      @soldUp="soldOut('up')"
    />
    <SuccessPop ref="successPop" />
    <ReasonModal ref="reasonModal" />
  </view>
</template>
<script>
  import GoodsItem from './components/GoodsItem.vue'
  import GoodsPop from './components/GoodsPop.vue'
  import BottomOperation from './components/BottomOperation.vue'
  import SuccessPop from './components/SuccessPop.vue'
  import ReasonModal from './components/ReasonModal.vue'
  import helper from '@/common/helper'

  export default {
    name: 'MyGoods',
    components: { GoodsItem, GoodsPop, BottomOperation, SuccessPop, ReasonModal },
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,

        isLoading: false,
        keyword: '',
        current: 0,
        tabs: [
          {
            name: '在售',
            num: '',
            value: 1,
            index: 0,
          },
          {
            name: '待审核',
            num: '',
            value: 2,
            index: 1,
          },
          {
            name: '待售',
            num: '',
            value: 3,
            index: 2,
          },
          {
            name: '违规',
            num: '',
            value: 4,
            index: 3,
          },
        ],
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
        tagListOut: [
          {
            name: '全部商品',
            choosed: true,
          },
          {
            name: '待整改',
            choosed: false,
            value: 3,
          },
          {
            name: '审核中',
            choosed: false,
            value: 4,
          },
          {
            name: '审核未通过',
            choosed: false,
            value: 5,
          },
        ],
        infoList: [
          // {
          //   id: '11',
          //   status: 1,
          // },
          // {
          //   id: '22',
          //   status: 2,
          // },
          // {
          //   id: '33',
          //   status: 3,
          // },
          // {
          //   id: '44',
          //   status: 4,
          // },
        ],
        selectList: [],
        goodApprovalStatus: '',
      }
    },
    watch: {
      infoList: {
        deep: true,
        handler(val) {
          if (val.length) {
            this.selectList = val.filter((item) => item.select)
            if (!this.selectList.length) {
              this.$refs.bottomOperation.close()
            }
            if (this.selectList.length === this.total) {
              this.$refs.bottomOperation.select()
            }
            console.log('this.selectList', this.selectList)
          }
        },
      },
    },
    onLoad(options) {
      uni.$on('allowanceSuccess', (res) => {
        this.batchEnd()
      })
      this.getData(true)
    },
    methods: {
      toSale() {
        helper.showLoading()
        delete uni['$VoPutProductForm']
        this.$linkToEasy('/pagesProduct/PutProduct/PutProduct')
        helper.hideLoading()
      },
      //补货后刷新数据
      batchEnd() {
        this.getData(true)
        this.$refs.goodsPop.close()
      },
      //搜索商品
      searchFn() {
        this.getData(true)
      },
      toDetail(item) {
        console.log(item, '999999999')
        //只有待审核状态不允许编辑
        let isView = 0
        if (
          (this.current === 3 && this.goodApprovalStatus === 4) ||
          (this.current === 1 && this.goodApprovalStatus === 1)
        ) {
          isView = 1
        }
        this.$linkToEasy(`/pagesProduct/PutProduct/EditProduct?id=${item.id}&isView=${isView}`)
        // if (+item.status === 1 || +item.status === 4) {
        //   this.$linkToEasy('/pagesProduct/PutProduct/EditProduct?id=' + item.id)
        // } else if (+item.status === 2 && +item.violationStatus === 2) {
        //   this.$linkToEasy('/pagesProduct/PutProduct/EditProduct?id=' + item.id + '&violations=1')
        // } else {
        //   this.$linkToEasy('/pagesSupplier/GoodsManage/GoodsDetail?preview=1&id=' + item.id)
        // }
      },
      //选择事件
      select(data) {
        //待审核和违规商品不允许操作
        if (this.current === 1 || this.current === 3) {
          return
        }
        this.infoList.forEach((item) => {
          if (item.id === data.id) {
            item.select = true
          }
        })
        this.$refs.bottomOperation.show()
      },
      //选择取消
      selectCancel(data) {
        this.infoList.forEach((item, index) => {
          if (item.id === data.id) {
            item.select = false
          }
        })
      },
      //选择全部
      selectAll() {
        this.infoList.forEach((item, index) => {
          item.select = true
        })
      },
      selectAllCancel() {
        this.selectReset()
      },
      //重置
      selectReset() {
        this.selectList = []
        this.$refs.bottomOperation.close()
        this.infoList.forEach((item, index) => {
          item.select = false
        })
        this.tagList.forEach((tag) => {
          if (tag.name.indexOf('全部') > -1) {
            tag.choosed = true
          } else {
            tag.choosed = false
          }
        })
        this.tagListOut.forEach((tag) => {
          if (tag.name.indexOf('全部') > -1) {
            tag.choosed = true
          } else {
            tag.choosed = false
          }
        })
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        this.goodApprovalStatus = ''
        // this.getData(true)
        this.selectReset()
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
        this.goodApprovalStatus = ''
        this.getData(true)
        this.selectReset()
      },
      //获取列表数据
      getData(refresh) {
        helper.showLoading()
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        params['goodStatus'] = this.current + 1
        if (this.goodApprovalStatus) {
          params['goodApprovalStatus'] = this.goodApprovalStatus
        }
        if (this.keyword) {
          params['name'] = this.keyword
        }
        this.$VoHttp
          .apiGoodsQueryMyGoods(params)
          .then((res) => {
            if (res.code === '20001') {
              let data = res.data.pageResult.records || []
              this.total = res.data.pageResult.total
              if (res.data.statistics && res.data.statistics.length) {
                let arr = []
                res.data.statistics.forEach((item, index) => {
                  let obj = {
                    count: item.statisticCount,
                    name: item.statisticName,
                    value: item.order,
                    index,
                  }
                  if(item.statisticCode<5){
                    arr.push(obj)
                  }
                })
                this.tabs = arr
              }
              // this.tabs.forEach((item) => {
              //   console.log(item, '===============');
              //   console.log(res.data?.statistics);
              //   ;(res.data?.statistics || []).forEach((sta) => {
              //     if (item.value === sta.order) {
              //       item.count = sta.statisticCount
              //       item.name = item.name.split('(')[0]
              //       item.name = item.name + '(' + sta.statisticCount + ')'
              //     }
              //   })
              // })

              data.forEach((item) => {
                item.select = false
                if (item.pic) {
                  let str = item.pic.split('.').pop()
                  console.log('11111111111', str)
                  if (str === 'mp4') {
                    item.pic = item.pic + '&type=3'
                  }
                }
                // if (item.businessType === 3) {
                //   this.transferHtml(item)
                //   item.title = item.communityContentVO.title
                //   let str = JSON.parse(item.fileUrl).json
                //   item.content = this.getText(str)
                //   //提取图片
                //   item.image = []
                //   str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
                //     item.image.push(capture)
                //   })
                // } else {
                //   helpUtil.regroupFileData(item)
                // }
                // item.datetime = this.$vocenApi.VoUtils.timeTransfer(item.createTime)
              })
              this.infoList = this.infoList.concat(data)
              console.log('this.infoList', this.infoList)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
            helper.hideLoading()
          })
          .finally(() => {
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            helper.hideLoading()
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
        this.$refs.goodsPop.show(data)
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
      tagRuleClick(detail) {
        this.tagListOut.forEach((tag) => {
          tag.choosed = detail.name === tag.name ? true : false
        })
        this.goodApprovalStatus = detail.value || ''
        this.getData(true)
      },
      //查看原因
      viewReason(detail, status) {
        this.$VoHttp
          .apiGoodsQueryReason({
            id: detail.id,
            status: status,
          })
          .then((res) => {
            this.$refs.reasonModal.show(res.data)
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      //下架
      soldOutGoods() {
        this.$refs.successPop.show()

        setTimeout(() => {
          this.$refs.successPop.close()
          if (this.current == 2) {
            this.getData(true)
          } else {
            this.current = 2
          }
        }, 1000)
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
        background: #ffffff;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: $color-primary-yellow;
        border: 2rpx solid $color-primary-yellow;
        padding: 8rpx 48rpx;
        box-sizing: border-box;
        text-align: center;
        margin-right: 24rpx;
      }
    }

    &-tabs {
      background-color: #ffffff;
    }

    .top-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }

    .swiper {
      flex: 1;

      &-item,
      .scroll-list {
        height: 100%;
      }
    }

    .fliter-tags {
      width: 100%;
      height: 100rpx;
      display: flex;
      background: #fff;
      align-items: center;
      // border-top: 1px solid $v-c0-08;
      box-shadow: inset 0px 1px 0px #f7f7f8;

      .tags {
        flex: 1;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
      }

      .tag-item {
        height: 48rpx;
        line-height: 48rpx;
        display: inline-block;
        background-color: #f6f7f8;
        padding: 0 24rpx;
        text-align: center;
        margin: 22rpx 0 22rpx 32rpx;
        box-sizing: border-box;
        border-radius: 100px;
        font-size: 24rpx;
        color: $v-c0-85;
        border: 2rpx solid #f6f7f8;

        &.choosed {
          background: $v-tags-btn-disabled;
          border: 2rpx solid $v-tags-one;
          color: $v-tags;
        }
      }
    }
  }
</style>
