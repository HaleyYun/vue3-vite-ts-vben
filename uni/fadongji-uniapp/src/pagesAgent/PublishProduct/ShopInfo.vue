<template>
  <view class="invest flex flex-column">
    <!-- 搜索 -->
    <VoNav :is-fixed="false" :leftWidth="80" :rightWidth="80" is-have-more>
      <block slot="title">
        <view>
          <VoSearch
            v-model="keyword"
            height="34"
            placeholder="请输入搜索"
            @custom="getData(true)"
            @search="getData(true)"
          >
            <block slot="suffix">
              <view                     @click="upspringFn"
              >
                <VoIcon
                    :opacity="0.65"
                    class="m-r-4"
                    color="#000"
                    name="voice-search"
                    size="20"
                ></VoIcon>
              </view>
            </block>
          </VoSearch>
        </view>
      </block>
    </VoNav>
    <!-- 店铺信息 -->
    <view class="invest-shop flex flex-vertical-c border-box m-t-16 bg-white">
      <image :src="storeInfo.goodsGoodsShopInfoVO.storeUrl" class="invest-shop__img" />
      <view class="flex-justify-c flex1 m-l-16">
        <view class="flex flex-row flex-vertical-c">
          <VoIcon name="smile-s" @click.native="toIm" />
          <view class="invest-shop__name">{{ storeInfo.goodsGoodsShopInfoVO.name }}</view>
        </view>
        <view
          class="invest-shop__collection m-t-6 m-l-8 flex flex-vertical-c"
          @click="goStoreDetail(storeInfo.goodsGoodsShopInfoVO.shopId)"
        >
          <view class="flex align-vertical m-r-4">店铺详情</view>
          <VoIcon :opacity="0.45" color="#000" name="arrow-right" size="12" />
        </view>
      </view>
    </view>
    <!-- 筛选条件 -->
    <view class="m-t-16">
      <view class="invest-screen relative">
        <view class="invest-screen__block" @click="goBrandList">
          <view class="fz-28 color-block">品牌</view>
          <VoIcon :opacity="0.45" color="#000" name="triangular" />
        </view>
        <view class="invest-screen__block flex1 flex-justify-c" @click="goVehicleType">
          <view class="fz-28 color-block">型号</view>
          <VoIcon :opacity="0.45" color="#000" name="triangular" />
        </view>
        <view>
          <view class="invest-screen__block" @click="fliterVisible = true">
            <view class="fz-28 color-block">商品类型</view>
            <VoIcon :opacity="0.45" color="#000" name="triangular" />
          </view>
          <FliterPop
            ref="fliterPop"
            :list="typeList"
            :visible="fliterVisible"
            @close="fliterVisible = false"
            @confirm="filterConfirm"
            @reset="categoryType = ''"
          />
        </view>
      </view>
      <view v-if="labelItem && labelItem.length" class="invest-label flex flex-vertical-c">
        <scroll-view class="invest-label__scroll" scroll-x>
          <view class="flex flex-vertical-c">
            <view
              v-for="(item, index) of labelItem"
              :key="index"
              class="invest-label__sift flex flex-vertical-c"
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
        <view class="invest-label__delete flex flex-vertical-c" @click="removeFn">
          <view class="fz-26 color-block m-r-8">清除</view>
          <VoIcon :opacity="0.45" color="#000" name="delete" size="16" />
        </view>
      </view>
    </view>
    <!-- 滑动区域 -->
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="flex1 overflow-y"
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
      <!--      <block v-if="dataList.length > 0">-->
      <!--        <VoLoadingText :has-more="dataList.length < total" :loading="loading" />-->
      <!--      </block>-->
      <!--      <VoNoData v-else />-->
      <block v-if="dataList.length > 0">
        <SelectProductItem
          ref="SelectProductItem"
          :info.sync="dataList"
          @buttonShelf="buttonShelf"
        />
        <VoLoadingText :has-more="dataList.length < total" :loading="loading" />
      </block>
      <VoNoData v-else />
    </scroll-view>
    <!-- 录音展示 -->
    <view v-show="recording" class="position-f">
      <RecordingPanel ref="recordingPanel" @confirm="confirmFn" @close="recording = false" />
      <view class="safearea-box" />
    </view>
  </view>
</template>
<script>
  import SelectProductItem from './components/SelectProductItem'
  import FliterPop from './components/FliterPop'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import permission from "@/common/permission";

  export default {
    name: 'ShopInfo',
    components: { SelectProductItem, FliterPop, RecordingPanel },
    data() {
      return {
        recording: false, // 录音功能展示
        // 关键字搜索
        keyword: '',
        // scroll-view
        triggered: false, // 设置当前下拉刷新状态，true下拉刷新已经被触发，false下拉刷新未被触发
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        // 加载状态
        loading: false,
        // 分页数据
        pageNo: 1,
        pageSize: 10,
        total: 0,
        id: '',
        shopId: '', // 店铺id
        // 店铺信息
        storeInfo: {
          serviceConfig: {},
          goodsGoodsShopInfoVO: '', // 店铺详情
        },
        fliterVisible: false,
        selectList: [], // 品牌
        modelList: [], //型号集合
        typeList: [], // 商品类型弹窗列表数据
        // 品牌、型号、商品类型回显
        labelItem: [],
        // 商品列表
        dataList: [],
      }
    },
    onLoad(options) {
      if (options) {
        console.log(options, 55555555555)
        // this.storeInfo = JSON.parse(options.storeInfo)
        // this.shopId = this.storeInfo.shopId
        this.id = options.id
        this.shopId = options.shopId
        console.log(this.shopId, 999999999999)
      }
      this.getDetail()
      this.getData(true)
      //获取选择品牌
      uni.$on('select', (row) => {
        this.selectList = row.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        })
        this.labelItem = this.labelItem.concat(this.selectList)
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
          this.goResult(data.join(''))
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
        if (this.loading) return
        if (Math.trunc(duration) < 1) {
          uni.$u.toast('录入语音时长过短~~')
          return
        }
        this.loading = true

        uploadMp3({ url: path, name: 'audio.mp3', isPath: true, tip: '上传中' })
          .then((res) => {
            console.log('语音path', res.fileNameUrl)
            this.RecordAudioText(res.fileNameUrl)
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
          .finally(() => {
            this.loading = false
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
      // 跳转店铺详情
      goStoreDetail(id) {
        this.$linkToEasy('/pagesAgent/InvestmentList/ShopDetails?companyId=' + id)
      },
      //获取店铺详情数据
      // getStoreDetailRequest() {
      //   this.storeInfo = {
      //     storeUrl: '/static/logo-2.png',
      //     name: '测试店铺名称',
      //   }
      //   let params = {
      //     companyId: this.shopId,
      //   }
      //   // 下面走接口赋值
      // },
      // 商品详情
      getDetail() {
        this.$VoHttp.apiGoodsDetail({ id: this.id }).then((res) => {
          if (res.data) {
            this.storeInfo = res.data
            // helpUtil.regroupFileData(this.info, 'guideVideo')
            console.log(this.storeInfo, 333333333333333)
          }
        })
      },
      /**
       * 获取数据
       * @param refresh  是否刷新
       * @param list 选择筛选的数组
       */
      getData(refresh, list) {
        this.loading = true
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.dataList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          shopId: this.shopId,
          // keyword: this.keyword || null,
        }
        console.log(params, 44444444444444444)
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
        if (this.keyword) {
          params['keyword'] = this.keyword
        }
        // 下面走接口赋值
        this.$VoHttp
          .apiGoodsQueryAgentGoodsList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              this.total = res.data.total
              this.dataList.push(...data)
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
      // 跳转到客服聊天界面
      toIm() {
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        // goodsGoodsShopInfoVO
        console.log(this.storeInfo, 55555555555555555555)
        const info = {
          targetId: this.storeInfo.userId,
          type: 0,
          note: this.storeInfo.goodsGoodsShopInfoVO.name,
          platformCode: this.storeInfo.role == 1 ? 'supplier' : 'agent', // 1供应商  2服务商
          isProject: true,
          projectId: this.storeInfo.id,
          investType: this.queryType,
          isShop: true, //是否是店铺聊天
          goods: {
            name: this.storeInfo.goodsName,
            pic: this.storeInfo.pic[0],
            id: this.storeInfo.id,
            cashPrice: this.storeInfo.cashPrice,
            accountPrice: this.storeInfo.accountPrice,
            accountPeriodDays: this.storeInfo.accountPeriodDays,
          },
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
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
        this.labelItem = ''
        this.selectList = []
        this.modelList = []
        this.typeList = []
        this.getData(true)
      },
      /**
       * 一键上架
       */
      buttonShelf() {
        this.$u.toast('一键上架')
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
          this.getData()
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
        // if (this.scrollTop >= 205 && !this.fixedTop) {
        //   this.fixedTop = true
        // }
        // if (this.scrollTop < 205 && this.fixedTop) {
        //   this.fixedTop = false
        // }
      },
    },
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {},
    //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //监听页面隐藏
    onHide() {},
    //监听页面卸载
    onUnload() {},
    //监听用户下拉动作，一般用于下拉刷新
    onPullDownRefresh() {},
    //页面滚动到底部的事件（不是scroll-view滚到底）
    onReachBottom() {},
  }
</script>
<style lang="scss" scoped>
  .invest {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-shop {
      padding: 24rpx 48rpx 24rpx 32rpx;
      &__name {
        margin-left: 8rpx;
        font-size: 28rpx;
        line-height: 42rpx;
        color: rgba(0, 0, 0, 0.85);
      }
      &__collection {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.65);
        line-height: 36rpx;
        align-items: center;
      }
      &__img {
        width: 96rpx;
        height: 96rpx;
        border-radius: 8rpx;
      }
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
  }
</style>
