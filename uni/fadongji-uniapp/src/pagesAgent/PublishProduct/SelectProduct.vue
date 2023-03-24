<template>
  <view class="data">
    <!-- title -->
    <VoNav :leftWidth="240" :rightWidth="240" is-fixed is-have-more title="选择商品">
      <block slot="operation">
        <view v-if="batchRelease" class="data-release" @click="batchPublish">批量发布</view>
        <view v-else class="data-cancel" @click="cancelFn">取消</view>
      </block>
    </VoNav>
    <view class="data-search">
      <VoSearch v-model="keyword" height="34" placeholder="请输入搜索" @custom="goResult" @search="goResult">
        <block slot="suffix">
          <VoIcon
            :opacity="0.65"
            class="m-r-4"
            color="#000"
            name="voice-search"
            size="20"
            @click="upspringFn"
          ></VoIcon>
        </block>
      </VoSearch>
    </view>
    <view>
      <view class="data-screen relative">
        <view class="data-screen__block" @click="goBrandList">
          <view class="fz-28 color-block">品牌</view>
          <VoIcon :opacity="0.45" color="#000" name="triangular" />
        </view>
        <view class="data-screen__block flex1 flex-justify-c" @click="goVehicleType">
          <view class="fz-28 color-block">型号</view>
          <VoIcon :opacity="0.45" color="#000" name="triangular" />
        </view>
        <view>
          <view class="data-screen__block" @click="goodsType">
            <view class="fz-28 color-block">商品类型</view>
            <VoIcon :opacity="0.45" color="#000" name="triangular" />
          </view>
          <FliterPop
            ref="fliterPop"
            :list="typeList"
            :visible="fliterVisible"
            @close="fliterVisible = false"
            @confirm="filterConfirm"
            @reset="categoryTypes = ''"
          />
        </view>
      </view>
      <view v-if="labelItem && labelItem.length" class="data-label flex flex-vertical-c">
        <scroll-view class="data-label__scroll" scroll-x>
          <view class="flex flex-vertical-c">
            <view
              v-for="(item, index) of labelItem"
              :key="index"
              class="data-label__sift flex flex-vertical-c"
            >
              <view class="fz-24 m-r-8 color-block-yellow">{{ item.name }}</view>
              <VoIcon
                :opacity="0.25"
                :size="12"
                color="#000"
                name="close-c"
                @click="deleteFn(item, index)"
              />
            </view>
          </view>
        </scroll-view>
        <view class="data-label__delete flex flex-vertical-c" @click="removeFn">
          <view class="fz-26 color-block m-r-8">清除</view>
          <VoIcon :opacity="0.45" color="#000" name="delete" size="16" />
        </view>
      </view>
    </view>
    <scroll-view
      v-if="dataList.length > 0"
      :refresher-enabled="!fliterVisible"
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      :scroll-y="!fliterVisible"
      class="scroll-view overflow-y flex1"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
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
      <SelectProductItem
        ref="SelectProductItem"
        :info.sync="dataList"
        :showChoice="showChoice"
        @arr="arrFn"
        @isSelectAll="isSelectAll"
      />
    </scroll-view>
    <VoNoData v-else no-data-tips="暂无数据" />
    <view v-show="showBottom" class="data-bottom">
      <view class="flex flex-vertical-c" @click="clickSelectAll">
        <!-- <VoIcon name="address_select" /> -->
        <VoIcon :name="selectAll ? 'select-right' : 'address_select'" color="#FF5319" />
        <view class="fz-26 color-block-45 m-l-6">全选</view>
      </view>
      <view class="flex flex-vertical-c">
        <view>
          <text class="fz-24 color-block-85 m-r-8">共选中</text>
          <text class="fz-28 fz-b color-block-85">{{ chooseArr.length || 0 }}个商品</text>
        </view>
        <view v-if="chooseArr.length > 0" class="data-bottom__button orange" @click="grounding"
          >上架
        </view>
        <view v-else class="data-bottom__button grey">上架</view>
      </view>
    </view>
    <!-- 录音展示 -->
    <view v-show="recording" class="position-f">
      <RecordingPanel ref="recordingPanel" @confirm="confirmFn" @close="recording = false" />
      <view class="safearea-box" />
    </view>
    <VoSafetyArea :is-fixed="false" />
  </view>
</template>

<script>
  import SelectProductItem from './components/SelectProductItem'
  import FliterPop from './components/FliterPop'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import helper from '@/common/helper'
  import permission from "@/common/permission";

  export default {
    name: 'SelectProduct',
    components: { SelectProductItem, FliterPop, RecordingPanel },
    data() {
      return {
        recording: false, // 录音功能展示
        voiceLoading: false,
        batchRelease: true, // 显示批量发布按钮
        showBottom: false, // 是否显示底部固定
        showChoice: false, // 是否显示批量发布选择按钮
        selectAll: false, // 是否全选
        keyword: '', // 搜索双向绑定
        triggered: false, // 设置当前下拉刷新状态，true下拉刷新已经被触发，false下拉刷新未被触发
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1, // 页数，默认值 1
        pageSize: 10, // 每页条数，默认值 10
        total: 0,
        fliterVisible: false,
        selectList: [], // 品牌
        modelList: [], //型号集合
        typeList: [], // 商品类型弹窗列表数据
        // 品牌、型号、商品类型总数组
        labelItem: [],
        // 商品列表
        dataList: [],
        chooseArr: [], // 选中的数量
      }
    },
    onLoad(options) {
      this.getData(true)
      //获取选择品牌
      uni.$on('select', (row) => {
        this.selectList = row.map((item) => {
          return {
            id: item.id,
            name: item.name,
            type: 1,
          }
        })
        if (!this.selectList.length) {
          this.labelItem = this.labelItem.filter((item) => item !== 1)
        } else {
          this.labelItem = this.labelItem.concat(this.selectList)
          this.labelItem = this.unique(this.labelItem)
        }
        this.labelItem = this.unique(this.labelItem)
        this.getData(true)
      })
      //获取选择型号集合
      uni.$on('selectModel', (row) => {
        console.log(row, 212121221212)
        // let skus = row.skuProperties.map((item) => {
        //   return item
        // })
        this.modelList = row.map((item) => {
          return {
            ...item,
            type: 2,
          }
        })
        if (!this.modelList.length) {
          this.labelItem = this.labelItem.filter((item) => item !== 2)
        } else {
          this.labelItem = this.labelItem.concat(this.modelList)
          this.labelItem = this.unique(this.labelItem)
        }
        this.getData(true)
      })
    },
    methods: {
      /**
       * 搜索事件
       */
      goResult() {
        this.getData(true)
      },
      /**
       * 语音转文字
       * @returns {Promise<void>}
       * @constructor
       */
      async RecordAudioText(mp3) {
        console.log('语音转文字')
        uni.showLoading({
          title: '识别中...',
        })
        try {
          const { data } = await this.$VoHttp.IM.apiMessageRecordAudioToTextFromUrl(
            {
              filePath: mp3,
            },
            { noLoading: true },
          )
          console.log(data, '识别数据')
          this.keyword = data.join('')
          this.getData(true)
        } catch (e) {
          uni.hideLoading()
          console.log('语音转文字失败', e)
          uni.$u.toast(e.message || '暂未匹配到相关数据~~')
        }
      },
      /**
       * 上传语音文件
       * @param path
       * @param duration
       */
      confirmFn(path, duration) {
        console.log('duration', duration)
        if (this.voiceLoading) return
        if (Math.trunc(duration) < 1) {
          uni.$u.toast('录入语音时长过短~~')
          return
        }
        this.voiceLoading = true

        helper
          .uploadMp3({ url: path, name: 'audio.mp3', isPath: true, tip: '上传中' })
          .then((res) => {
            console.log('语音path', res.fileNameUrl)
            this.RecordAudioText(res.fileNameUrl)
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
          .finally(() => {
            this.voiceLoading = false
            this.recording = false
          })
      },
      // 弹起录音
      async upspringFn() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        let a
        if (uni.getSystemInfoSync().platform == 'ios') {
          // console.log(permissionStatus)
          console.log(a)
          var avaudiosession = plus.ios.import('AVAudioSession')
          var avaudio = avaudiosession.sharedInstance()
          await avaudio.requestRecordPermission((res) => {
            console.log('回调完成', res)
            const status = avaudio.recordPermission()
            if (+status !== 1684369017 && +status !== 1970168948) {
              console.log(this.recording)
              if (!this.recording && this.$refs.recordingPanel) {
                this.$refs.recordingPanel.reset()
              }
              this.recording = !this.recording
            }
          })
          a = await permission.judgeIosPermission('record')
          if (!a) {
            return
          } else {
            console.log(this.recording)
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
        } else {
          a = await permission.requestAndroidPermission('android.permission.RECORD_AUDIO')
          console.log(a)
          if (!a) {
            return
          } else if (a === -1) {
            uni.showModal({
              title: '提示',
              content: '请去设置打开麦克风权限',
              success: function (res) {
                if (res.confirm) {
                  permission.gotoAppPermissionSetting()
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              },
            })
          } else {
            console.log(this.recording)
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
        }
      },
      /**
       * 数组去重
       */
      unique(arr) {
        const res = new Map()
        return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
      },
      /**
       * 点击批量发布
       */
      batchPublish() {
        this.showChoice = true
        this.showBottom = true
        this.batchRelease = false
      },
      /**
       * 点击取消批量发布
       */
      cancelFn() {
        this.showChoice = false
        this.showBottom = false
        this.batchRelease = true
      },
      /**
       * 上架
       */
      grounding() {
        let arr = this.chooseArr.map((item) => item.id).join()
        console.log(arr, 'arr')
        this.$VoHttp.GOODS.apiGoodsShelfBulk({
          goodsId: arr,
        })
          .then((res) => {
            console.log(res, 'res')
            uni.$u.toast('商品发布成功，记得设置价格和库存哦')
            setTimeout(() => {
              this.$linkToEasy('/pagesAgent/GoodsManage/MyGoods?type=all')
            }, 1000)
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      arrFn(e) {
        this.chooseArr = e
      },
      isSelectAll(bool) {
        this.selectAll = bool
      },
      /**
       * 点击全选
       */
      clickSelectAll() {
        this.selectAll = !this.selectAll
        this.$refs.SelectProductItem.selectAll(this.selectAll)
      },
      /**
       *  去品牌页面
       */
      goBrandList() {
        this.fliterVisible = false
        this.$linkToEasy('/pagesAgent/InvestmentList/BrandList')
      },
      /**
       *  去型号页面
       */
      goVehicleType() {
        this.fliterVisible = false
        this.$linkToEasy(
          `/pagesAgent/InvestmentList/ProductSize?modelList=${JSON.stringify(this.modelList)}`,
        )
      },
      /**
       * 点击商品类型
       */
      goodsType() {
        this.fliterVisible = true
      },
      //商品类型筛选确认
      filterConfirm(data) {
        console.log('filterConfirm', data)
        this.typeList = data.map((item) => {
          return {
            ...item,
            type: 3,
          }
        })
        if (!this.typeList.length) {
          this.labelItem = this.labelItem.filter((item) => item.type !== 3)
        } else {
          this.labelItem = this.labelItem.concat(this.typeList)
          this.labelItem = this.unique(this.labelItem) // 去
        }
        this.fliterVisible = false
        this.getData(true)
      },
      /**
       * 删除单个标签
       */
      deleteFn(e) {
        this.labelItem.forEach((info, i) => {
          if (e.id === info.id) {
            this.labelItem.splice(i, 1)
          }
        })
        this.selectList.forEach((info, i) => {
          if (e.id === info.id) {
            this.selectList.splice(i, 1)
          }
        })
        this.modelList.forEach((info, i) => {
          if (e.id === info.id) {
            this.modelList.splice(i, 1)
          }
        })
        this.typeList.forEach((info, i) => {
          if (e.id === info.id) {
            this.typeList.splice(i, 1)
          }
        })
        this.getData(true)
      },
      /**
       * 清除全部
       */
      removeFn() {
        this.labelItem = []
        this.selectList = []
        this.modelList = []
        this.typeList = []
        this.getData(true)
      },
      /**
       * 获取列表数据
       * @param refresh 是否刷新
       * @param list 选择筛选的数组
       */
      getData(refresh, list) {
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.dataList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        // brands:品牌id数组
        if (this.selectList && this.selectList.length) {
          params.brands = list = this.selectList.map((item) => item.id)
        }
        // brands:型号id数组
        if (this.modelList && this.modelList.length) {
          params.modelList = list = this.modelList.map((item) => item.id)
        }
        // brands:类型name数组
        if (this.typeList && this.typeList.length) {
          params.categoryTypes = this.typeList.map((item) => item.name)
        }
        // 搜索
        if (this.keyword) {
          params['keyword'] = this.keyword
        }
        if (this.current === 1 && this.chooseWareData.areaCode) {
          params.salesArea = this.chooseWareData.areaCode || ''
        }

        this.$VoHttp
          .apiGoodsQueryAgentGoodsList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              this.total = res.data.total
              console.log('data', data)

              data.forEach((item) => {
                item.choose = false
              })
              this.dataList.push(...data)
              this.selectAll = false // 重置全选
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.loading = !this.loading
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          })
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
          this.getData(true)
          console.log(this.dataList, 'this.dataList')
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.dataList.length >= this.total) {
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
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .data {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    &-release {
      margin-right: 24rpx;
      height: 56rpx;
      line-height: 56rpx;
      box-sizing: border-box;
      padding: 0 24rpx;
      border: 2rpx solid $v-tags;
      border-radius: 32rpx;
      font-size: 24rpx;
      color: $v-tags;
    }

    &-cancel {
      font-size: 28rpx;
      margin-right: 24rpx;
      color: $v-c0-65;
    }

    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }

    &-screen {
      padding: 0 32rpx;
      background: #fff;
      display: flex;
      align-items: center;

      &__block {
        display: flex;
        align-items: center;
        height: 94rpx;
      }
    }

    &-label {
      background: #fff;
      // padding-bottom: 24rpx;
      &__scroll {
        width: 606rpx;
      }

      &__delete {
        flex: 1;
        justify-content: center;
        border-left: 2rpx solid $v-bg-light;
        height: 64rpx;
      }

      &__sift {
        padding: 0 8rpx 0 16rpx;
        height: 36rpx;
        box-sizing: border-box;
        border: 2rpx solid $v-tags;
        border-radius: 32rpx;
        background: $v-tags-btn-disabled;
        margin-right: 24rpx;
        white-space: nowrap;

        &:first-child {
          margin-left: 32rpx;
        }

        &:last-child {
          margin-right: 32rpx !important;
        }
      }
    }

    &-bottom {
      padding: 24rpx 32rpx;
      background: #fff;
      border-top: 2rpx solid $v-bg-light;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__button {
        width: 208rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 48rpx;
        font-size: 32rpx;
        margin-left: 24rpx;

        &.orange {
          background: $color-primary-yellow;
          color: #fff;
        }

        &.grey {
          background: $v-btn-disabled;
          color: $v-c0-25;
        }
      }
    }

    .scroll-view {
      height: 100%;
    }
  }
</style>
