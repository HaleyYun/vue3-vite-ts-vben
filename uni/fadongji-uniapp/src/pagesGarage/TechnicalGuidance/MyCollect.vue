<template>
  <view>
    <view class="list flex flex-column">
      <VoNav is-fixed title="我的收藏" ref="voNav">

        <view slot="operation" class="operation">
          <span v-if="editOpen" class="edit" @click="openEditMode">编辑</span>
          <span v-else class="done" @click="editDone">完成</span>
          <!--<VoIcon name="category" color="#22284B" />-->
          <VoIcon @click="$refs.voNav.iconFn()" :opacity="0.45" color="#000000" name="more" />
        </view>
      </VoNav>
      <view class="list-search flex">
        <VoSearch
          v-model="keyWord"
          placeholder="请输入关键字搜索"
          height="34"
          @custom="handlerCourseSearch"
          @search="handlerCourseSearch"
        />
        <!--        <view class="flex flex-vertical-c" @click="modelPopup = true">-->
        <!--          <text class="fz-32 color-block-65">筛选</text>-->
        <!--          <image class="scree-icon" src="/static/created/product/screening_grey.png" />-->
        <!--        </view>-->
      </view>
      <VoNoData v-if="!dataList.length" no-data-tips="暂无收藏数据~" />
      <block v-else>
        <scroll-view
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          class="scroll-list flex1 overflow-y"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          refresher-enabled="true"
          scroll-top="0"
          scroll-y="true"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @scroll="onScroll"
          @scrolltolower="scrolltolower"
        >
          <!-- 下拉刷新组件 -->
          <VoListFresh :show="loadingStatus" />
          <view class="h20 line-bg" />
          <view
            v-for="(item, index) in dataList"
            :key="index"
            class="scroll-list__item flex flex-vertical-c"
            @click="handlerRowClick(item, index)"
          >
            <view v-if="editShow === true" class="m-r-8">
              <VoIcon v-if="item.check" :opacity="1" color="#FF5319" name="select-right" />
              <VoIcon v-else :opacity="0.15" color="#000000" name="circle" />
            </view>
            <ListItem :data-obj="item" :disabled="true" class="item-collect" />
          </view>
          <VoLoadingText :has-more="dataList.length < total" :loading="isLoading" />
          <VoSafetyArea v-if="editShow === false" :is-fixed="false" />
        </scroll-view>
      </block>
      <view v-if="editShow === true" class="scroll-bottom">
        <view class="flex flex-vertical-c flex-justify-between">
          <view class="flex flex-vertical-c">
            <VoIcon
              v-if="allCheck"
              :opacity="1"
              color="#FF5319"
              name="select-right"
              @click="checkAllCancel"
            />
            <VoIcon v-else :opacity="0.15" color="#000000" name="circle" @click="checkAll" />
            <view class="m-l-8 lh48 fz-32 color-block-45">全选</view>
          </view>
          <view v-if="ids.length > 99" class="scroll-bottom__button" @click="deleteFn"
            >删除(99+)</view
          >
          <view v-else class="scroll-bottom__button" @click="deleteFn">
            删除({{ ids.length || 0 }})
          </view>
        </view>
        <VoSafetyArea :is-fixed="false" />
      </view>
    </view>
    <u-popup :safeAreaInsetTop="true" :show="modelPopup" closeOnClickOverlay mode="right">
      <view class="flex flex-column modelPopup">
        <view class="p-t-30 p-l-32 p-r-32 flex border-box flex-vertical-c">
          <VoSearch
            v-model.lazy="modelName"
            actionText="搜索"
            placeholder="请输入搜索"
            height="34"
            @custom="modelSearch"
          />
          <text class="fz-32 color-block-65 lh45" @click="modelPopup = false">取消</text>
        </view>
        <scroll-view class="pop-content" scroll-y>
          <block v-for="(item, index) in modelList" :key="index">
            <view :key="item.initials" class="p-l-56 fz-24">{{ item.initials }}</view>
            <view
              v-for="val in item.modelVOS"
              :key="val.id + item.initials"
              :class="{ 'pop-content-select': currentModelId == val.id }"
              class="pop-content-item"
              @click="selectModelId(val.id)"
              >{{ val.model }}</view
            >
          </block>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>
<script>
  import ListItem from './components/ListItem'
  import helpUtil from '@/common/helper'
  import { hideLoading, toast } from '../../common/helper'

  export default {
    name: 'MyCollect',
    components: { ListItem },
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        isLoading: false,
        editOpen: true, // 是否显示编辑
        triggered: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        dataList: [],
        editShow: false, // 点击编辑时图标显示
        ids: [], // 收藏id集合
        allCheck: false, // 全选
        keyWord: '',
        modelPopup: false,
        modelList: [],
        modelName: '',
        currentModelId: '',
        type: 1,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
      }
    },
    watch: {
      dataList: {
        deep: true,
        handler(newValue, oldValue) {
          let ids = newValue.map((item) => item.collectionId)
          let arr = newValue.filter((item) => item.check)
          this.ids = arr.map((item) => item.collectionId)
          console.log(this.ids)
          console.log(ids)
          if (
            this.ids.length == ids.length &&
            this.ids.every(function (v, i) {
              return v === ids[i]
            })
          ) {
            this.allCheck = true
          } else {
            this.allCheck = false
          }
        },
      },
      modelName(newValue, oldValue) {
        this.getModelList()
      },
    },
    onShow() {
      this.getModelList()
      this._init_func(true)
    },
    methods: {
      async getModelList() {
        try {
          const res = await this.$VoHttp.apiGoodsModelContentModelList({ keyword: this.modelName })
          console.log(res)
          this.modelList = res.data
        } catch (err) {
          console.log(err)
        }
      },
      selectModelId(val) {
        this.currentModelId == val ? (this.currentModelId = '') : (this.currentModelId = val)
        this.modelPopup = false
        // this._init_func()
        this.$linkToEasy(
          `/pagesGarage/TechnicalGuidance/CourseList?currentModelId=${this.currentModelId}`,
        )
      },
      handlerRowClick(row, index) {
        if (this.editOpen) {
          this.$linkToEasy(`/pagesGarage/TechnicalGuidance/CourseDetail?id=${row.id}`)
        } else {
          this.$set(row, 'check', !row.check)
        }
      },
      handlerCourseSearch() {
        if (!this.keyWord) {
          helper.error('请输入搜索关键词')
          return
        }
        this.$linkToEasy(
          `/pagesGarage/TechnicalGuidance/CourseList?keyWord=${this.keyWord}&type=${this.type}`,
        )
      },
      /**
       * 完成
       */
      editDone() {
        this.editShow = false
        this.editOpen = true
        this.dataList.forEach((item) => {
          item.check = false
        })
      },
      /**
       * 编辑
       */
      openEditMode() {
        if (!this.dataList.length) {
          return
        }
        this.editShow = true
        this.editOpen = false
      },
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem) {
        this.$linkToEasy('/pagesGarage/TechnicalGuidance/CourseDetail')
      },
      _init_func(refresh) {
        if (this.isLoading) return
        this.isLoading = true
        let param = {
          // keyword: this.keyWord,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.dataList = []
          param.pageNo = 1
          this.curLength = 0
        }
        this.$VoHttp
          .apiContentTechnicalGuidanceMyCollection(param)
          .then((res) => {
            if (res && res.data) {
              // return res.data.records.map((item) => ({ ...item, check: false }))
              let records = res.data.records
              records.forEach((item) => {
                item.check = false
                helpUtil.regroupFileData(item, 'fileUrl', ',')
              })
              this.total = res.data.total
              this.dataList.push(...records)
            } else {
              return []
            }
          })
          .catch((err) => {
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            this.isLoading = false
            hideLoading()
          })
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this._init_func(true)
        }
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
      },
      //滚到底部加载
      scrolltolower() {
        console.log('底部加载this.loadingStatus', this.loadingStatus)
        if (this.loadingStatus) return
        this.loadingStatus = true
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.dataList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this._init_func()
        }, 2000)
      },
      /**
       * 全选
       */
      checkAll() {
        this.allCheck = true
        this.dataList.forEach((item) => {
          item.check = true
        })
      },
      /**
       * 取消全选
       */
      checkAllCancel() {
        this.allCheck = false
        this.dataList.forEach((item) => {
          item.check = false
        })
      },
      /**
       * 删除
       */
      deleteFn() {
        if (this.ids.length <= 0) {
          toast('请选择删除收藏的店铺', 'none')
          return
        }
        let param = {
          ids: this.ids,
        }
        this.$VoHttp
          .apiContentTechnicalGuidanceBatchDelete(param)
          .then((res) => {
            console.log(res)
            if (res && res.data) {
              uni.$u.toast('删除成功！')
              this._init_func()
            }
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .operation {
    display: flex;
    align-items: center;
  }
  .done {
    color: #22284b;
    font-size: 32rpx;

    margin-right: 36rpx;
  }
  .edit {
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.65);
    margin-right: 36rpx;
  }
  .list {
    overflow-x: hidden;
    height: 100vh;
    &-search {
      padding: 8rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    .scroll-list {
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
      background: #fff;
      &__item {
        margin-bottom: 24rpx;
        padding: 32rpx 0;
        margin-left: 32rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #f7f7f8;
        display: flex;
        .item-collect {
          flex: 1;
        }
      }
    }
    .scroll-bottom {
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      &__button {
        width: 240rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background: $color-primary-yellow;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: #ffffff;
      }
    }
  }
  .modelPopup {
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }
  .pop-content {
    flex: 1;
    overflow-y: scroll;
    padding: 0 32rpx 0 32rpx;
    border-bottom: 2rpx solid #f7f7f8;
    &-item {
      box-sizing: border-box;
      width: 606rpx;
      height: 64rpx;
      margin: 24rpx auto;
      text-align: center;
      line-height: 64rpx;
      font-size: 24rpx;
      border-radius: 64rpx;
      border: 2rpx solid #f6f7f8;
      background: #f6f7f8;
      color: rgba(0, 0, 0, 0.85);
    }
    &-select {
      background: #ffece5;
      border: 2rpx solid #ff6633;
      color: #ff6633;
    }
  }
  .scree-icon {
    flex-shrink: 1;
    width: 40rpx;
    height: 40rpx;
  }
  .scree-badge {
    position: absolute;
    top: -10rpx;
    right: -20rpx;
  }
</style>
