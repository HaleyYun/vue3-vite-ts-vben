<template>
  <view>
    <view class="good">
      <VoNav :leftWidth="240" :rightWidth="240" is-fixed is-have-more title="商品管理">
        <!--        <block slot="operation">-->
        <!--          <view class="good-release" @click="goRelease">发布商品</view>-->
        <!--        </block>-->
      </VoNav>
      <view class="top-search">
        <view class="top-search__left">
          <VoSearch
            v-model="keyword"
            :showInsideAction="true"
            bgColor="#fff"
            borderColor="#FF5319"
            height="34"
            placeholder="请输入关键字搜索"
            @custom="getData(true)"
            @search="getData(true)"
          >
          </VoSearch>
        </view>
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
          :list="tabs"
          :scrollable="false"
          activeStyle="font-size: 32rpx;color: #FF5319;font-weight: bold"
          class="tabs"
          inactiveStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.45)"
          itemStyle="padding: 24rpx 24rpx 30rpx 24rpx;"
          @change="tabChange"
        />
      </view>
      <!--      <view class="fliter-tags" v-if="current === 1 || current === 2">-->
      <view v-if="tabs[current].name == '违规'" class="fliter-tags">
        <view class="tags">
          <!-- <view
			v-for="(item, index) in tagList"
			v-show="current === 1"
			:key="item.name"
			:class="item.choosed ? 'choosed' : ''"
			class="tag-item"
			@click="tagClick(item)"
		  >
			{{ item.name }}
          </view> -->
          <view
            v-for="item in tagListOut"
            v-show="tabs[current].name == '违规'"
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
              v-for="(listItem, listItemIndex) of infoList"
              :key="listItemIndex"
              ref="goodsItem"
              :current="current"
              :dataObj="listItem"
              @addGoods="addGoods"
              @applySale="applySale"
              @click="toDetail(listItem)"
              @select="select"
              @selectCancel="selectCancel"
              @soldOutSuccess="soldOutGoods"
              @toEdit="goodsEdit"
              @viewReason="viewReason"
            />
            <VoNoData v-if="!infoList.length && !refresh" no-data-tips="暂无数据" />
          </scroll-view>
        </swiper-item>
      </swiper>
      <view v-if="showBtn && current !== 3" class="btnBar p-b-safe-area">
        <view class="flex flex-vertical-c flex-justify-between m-t-22">
          <EraButton circle size="small" text="服务商扫码发布" @click="showAction = true" />
          <EraButton circle size="small" text="发布商品" @click="goRelease" />
        </view>
        <view class="flex flex-vertical-c color-block-45 fz-24 my-24">
          <!--          <VoIcon :opacity="0.6" :size="18" color="#000000" name="question-line" />-->
          扫码发布仅限江陵动力、引爆点、巴韦德、智选品牌商品
        </view>
        <view class="p-b-safe-area"></view>
      </view>
    </view>
    <!-- 录音展示 -->
    <view v-show="recording" class="position-f">
      <RecordingPanel ref="recordingPanel" @close="recording = false" @confirm="confirmFn" />
      <view class="safearea-box" />
    </view>
    <BottomOperation
      ref="bottomOperation"
      :isSelectAll="isSelectAll"
      :selectCount="selectList.length"
      :status="current"
      @deleteFn="deleteFn"
      @select="selectAll"
      @selectAllCancel="selectReset"
      @soldOut="soldOut"
      @soldUp="soldOut('up')"
    />
    <SuccessPop ref="successPop" />
    <ReasonModal ref="reasonModal" />
    <GoodsPop ref="goodsPop" @confirm="batchEnd()" />
    <VoActionSheet
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      class="action-sheet"
      @close="close"
      @select="actionSelect"
    />
    <VoActionSheet
      v-show="showSelect"
      :actions="actionsSelect"
      :show="showSelect"
      cancelText="取消"
      class="action-sheet"
      @close="close"
      @select="selectSelect"
    />
    <VoModal
      :show="showHandle"
      class="position-f"
      closeOnClickOverlay
      confirmColor="#000000"
      confirmText="确定"
      showCancelButton
      title="输入发动机识别码"
      @cancel="closeHandler"
      @close="closeHandler"
      @confirm="handleInput"
    >
      <view class="slot-content w-full">
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="modify-form"
          labelPosition="left"
          labelWidth="0"
        >
          <EraFormItem
            class="modify-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            prop="content"
          >
            <u-input v-model.trim="formData.content" clearable />
          </EraFormItem>
        </EraForm>
      </view>
    </VoModal>
    <VoModal
      :closeOnClickOverlay="true"
      :confirmText="chooseType === 'camera' ? '继续识别' : '继续'"
      :content="content"
      :show="showModalCancel"
      :showCancelButton="true"
      @cancel="showModalCancel = false"
      @confirm="againClick"
    />
  </view>
</template>
<script>
  import GoodsItem from './components/GoodsItem.vue'
  import GoodsPop from './components/GoodsPop.vue'
  import BottomOperation from './components/BottomOperation.vue'
  import SuccessPop from './components/SuccessPop.vue'
  import ReasonModal from './components/ReasonModal.vue'
  import helper, { chooseImageOcrByPromise, vocenScanCodeFn } from '@/common/helper'
  import ModifyPopup from './components/ModifyPopup.vue'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import EraButton from '@/uni_modules/era-ui/components/EraButton/EraButton.vue'
  import permission from '@/common/permission'

  export default {
    name: 'MyGoods',
    components: {
      EraButton,
      GoodsItem,
      GoodsPop,
      BottomOperation,
      SuccessPop,
      ReasonModal,
      ModifyPopup,
      RecordingPanel,
    },
    data() {
      return {
        // 选择发布方式下拉框
        showAction: false,
        // 筛选寄售弹出层
        showSelect: false,
        // 是否展示底部按钮
        showBtn: true,
        content: '',
        showModalCancel: false,
        actions: [
          // #ifdef APP-PLUS
          {
            type: 'camera',
            name: '扫码识别',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          // #endif
          {
            type: 'album',
            name: '相册上传',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            type: 'handle',
            name: '手动输入',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        actionsSelect: [
          {
            type: 1,
            name: '寄售商品',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            type: 2,
            name: '非寄售商品',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            type: 0,
            name: '全部商品',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        distributionStatus: 0, // 铺货寄售状态
        // 手动输入弹出框
        showHandle: false,
        // 编辑内容
        formData: {
          content: '',
        },
        // 表单验证
        rules: {
          content: [
            {
              type: 'string',
              required: true,
              message: '请输入识别码',
              trigger: ['blur'],
            },
            {
              type: 'string',
              min: 4,
              required: true,
              message: '识别码长度不可少于4位',
              trigger: ['blur'],
            },
          ],
        },
        recording: false, // 录音功能展示
        voiceLoading: false,
        selectCount: 0,
        showModify: false,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1, // 页数，默认值 1
        pageSize: 10, // 每页条数，默认值 10
        total: 0,

        isLoading: false,
        keyword: '',
        current: 0,
        tabs: [
          {
            name: '在售',
            num: '',
            value: 1,
            count: 0,
            index: 0,
          },
          // {
          //   name: '待审核',
          //   num: '',
          //   value: 2,
          //   index: 1,
          // },
          {
            name: '待售',
            num: '',
            value: 3,
            count: 0,
            index: 1,
          },
          {
            name: '违规',
            num: '',
            value: 4,
            count: 0,
            index: 2,
          },
          {
            name: '寄售',
            num: '',
            value: 5,
            count: 0,
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
          //   {
          //     name: '全部商品',
          //     choosed: true,
          //   },
          {
            name: '待整改',
            choosed: true,
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
        infoList: [],
        selectList: [],
        isSelectAll: false,
        isSelectAllCancel: false,
        goodApprovalStatus: '',
        postData: {},
        goodStatus: 1,
        operationType: 'edit',
        chooseType: '',
      }
    },
    watch: {
      infoList: {
        deep: true,
        handler(val) {
          if (val.length) {
            this.selectList = val.filter((item) => item.isSelect)
            if (!this.selectList.length) {
              this.showBtn = true
              this.$refs.bottomOperation?.close()
            }
            if (this.selectList.length === this.total) {
              this.showBtn = false
              this.$refs.bottomOperation.select()
            }
            console.log('this.selectList', this.selectList)
          }
        },
      },
    },
    onLoad(options) {
      if (options.type && options.type === 'all') {
        this.current = 1
        this.goodStatus = 3
      }
      console.log(this.current, 454555555555)
      // uni.$off('scanReasult1')
      // uni.$on('scanReasult1', (data) => {
      //   console.log('扫描结果', data)
      //   if (data && data.length) {
      //     if (data === '超时') {
      //       this.showHandle = true
      //       return
      //     }
      //     if (data.indexOf('http') > -1) {
      //       if (data.split('=') && data.split('=').length && data.split('=')[1]) {
      //         // this.code = data.data.split('=')[1]
      //         this.formData.content = data.split('=')[1]
      //         this.handleInput()
      //       } else {
      //         this.$u.toast('未识别到内容，请重新扫描')
      //         this.code = ''
      //       }
      //     } else {
      //       // this.code = data.data
      //       this.formData.content = data
      //       this.handleInput()
      //     }
      //   }
      // })
    },
    onShow() {
      this.getData(true)
      if (this.$refs.goodsPop) {
        this.$refs.goodsPop.close()
      }
    },
    methods: {
      /**
       * @description app扫码识别
       **/
      appScanFn() {
        let that = this
        vocenScanCodeFn(20)
          .then((res) => {
            if (res.code == 100) {
              this.formData.content = ''
              this.showHandle = true
              return
            }
            let data = res.result
            if (data.indexOf('http') > -1) {
              if (data.split('=') && data.split('=').length && data.split('=')[1]) {
                // this.code = data.data.split('=')[1]
                that.formData.content = data.split('=')[1]
                that.handleInput()
              } else {
                that.$u.toast('未识别到内容，请重新扫描')
                that.code = ''
              }
            } else {
              // this.code = data.data
              that.formData.content = data
              that.handleInput()
            }
          })
          .catch((e) => {
            console.log(e, 123)
            that.$u.toast('未识别到内容，请重新扫描')
          })
      },
      // 扫码上传
      async vin() {
        let sourceType
        if (this.chooseType === 'camera') {
          sourceType = ['camera']

          this.appScanFn()
          // uni.navigateTo({
          //   url: '/pages/CommonLogin/VoScanCode?origin=2',
          //   animationType: 'slide-in-bottom',
          // })
          return
        } else {
          sourceType = ['album']
        }
        // #ifdef H5
        sourceType = ['album']
        // #endif
        this.showHandle = false
        try {
          const res = await chooseImageOcrByPromise({
            count: 1,
            sizeType: ['compressed'],
            sourceType,
            tip: '正在识别',
            apiUrl: '/v1/api/business/vehicle/scanningcode/warehousing',
          })
          console.log(res)
          if (!res || !res.data) return
          let data = JSON.parse(res.data)
          if (+data.code === 20001) {
            // this.$u.toast('录入成功')
            this.content = data.message
            this.showModalCancel = true
          } else if (+data.code === 20002) {
            // 20001  录入成功
            // 20002  识别码信息不全，请手动输入
            // 20003||20005  未找到该条形码对应商品，请重新识别||条形码对应商品已入库到【商品名称】库存中，不再重复入库。
            // 20004  服务商商品未发布，返回商品id
            this.$u.toast(data.message)
            this.formData.content = ''
            this.showHandle = true
          } else if (+data.code === 20003 || +data.code === 20005) {
            this.content = data.message
            // this.chooseType = 'handle'
            this.showModalCancel = true
          } else if (+data.code === 20004) {
            this.$linkToEasy(
              `/pagesAgent/PublishProduct/ScanResult?id=${data.data.goodsId}&code=${data.data.goodsVin}`,
            )
          } else {
            this.$u.toast('当前网络不可用，请检查网络，或录入的识别码有误')
          }
        } catch (e) {
          console.log(e)
          this.$u.toast('当前网络不可用，请检查您的网络设置')
        }
      },
      // 手动上传
      async handleInput() {
        try {
          if (!this.formData.content) {
            this.$u.toast('请输入有效号码')
            return
          }
          if (this.showHandle) {
            let res = await this.$refs.form.validate()
            console.log(res)
            if (!res) return
          }
          // this.formData.content = 'B02902'
          let data = await this.$VoHttp.apiBusinessVehicleHandloseWarehousing({
            goodsVin: this.formData.content,
          })
          if (!data || !data.data) return
          console.log(data)
          this.closeHandler()
          this.$u.toast('入库成功')
        } catch (e) {
          console.log(e)
          this.closeHandler()
          if (+e.code === 20002) {
            // 20001  条形码对应商品已入库到【商品名称】库存中，不再重复入库。
            // 20002  识别码信息不全，请手动输入
            // 20003  未找到该条形码对应商品，请重新识别
            // 20004  服务商商品未发布，返回商品id
            this.$u.toast(e.message)
            this.formData.content = ''
            this.showHandle = true
          } else if (+e.code === 20003 || +e.code === 20005) {
            this.content = e.message
            this.showModalCancel = true
          } else if (+e.code === 20004) {
            this.$linkToEasy(
              `/pagesAgent/PublishProduct/ScanResult?id=${e.data.goodsId}&code=${e.data.goodsVin}`,
            )
          } else {
            this.$u.toast('当前网络不可用，请检查您的网络设置')
          }
        }
      },
      // 再次上传
      againClick() {
        this.showModalCancel = false
        if (this.chooseType !== 'handle') {
          this.vin()
        } else {
          this.formData.content = ''
          this.showHandle = true
        }
      },
      // 确认选择
      actionSelect(e) {
        this.chooseType = e.type
        if (e.type !== 'handle') {
          this.vin()
        } else {
          this.formData.content = ''
          this.showHandle = true
        }
      },
      // 关闭下拉框
      close() {
        console.log('关闭了')
        this.showAction = false
        this.showSelect = false
      },
      closeHandler() {
        this.formData.content = ''
        this.showHandle = false
      },
      // 弹起录音
      async upspringFn() {
        console.log(this.recording)
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
          } else {
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
          // 永久拒绝
          if (a === -1) {
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
            return
          }
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
          const res = await this.$VoHttp.IM.apiMessageRecordAudioToTextFromUrl(
            {
              filePath: mp3,
            },
            { noLoading: true },
          )
          if (!res || !res.data) return
          console.log('识别数据', res.data)
          this.keyword = res.data.join('')
          this.getData(true)
        } catch (e) {
          uni.hideLoading()
          console.log('语音转文字失败', e)
          uni.$u.toast(e.message || '暂未匹配到相关数据~~')
        }
      },
      /**
       * 去发布商品页
       */
      goRelease() {
        this.$linkToEasy('/pagesAgent/PublishProduct/SelectProduct')
      },
      //补货后刷新数据
      batchEnd() {
        this.getData(true)
        this.$refs.goodsPop.close()
      },
      toDetail(item) {
        this.$linkToEasy('/pagesSupplier/GoodsManage/GoodsDetail?id=' + item.id)
        // this.$linkToEasy('/pagesAgent/PublishProduct/GoodsDetail?id=' + item.id)
      },
      //选择事件
      select(data) {
        //违规商品不允许操作
        if (this.current === 2) {
          return
        }
        // this.initCheckAll()
        this.infoList.forEach((item) => {
          if (item.id === data.id) {
            item.isSelect = true
          }
        })
        this.$refs.bottomOperation.show()
        this.showBtn = false
      },
      //选择取消
      selectCancel(data) {
        this.infoList.forEach((item, index) => {
          if (item.id === data.id) {
            item.isSelect = false
          }
        })
      },
      initCheckAll() {
        let count = 0
        this.infoList.map((item) => {
          item.isSelect && count++
        })

        this.selectCount = count
        if (count === this.infoList.length) {
          this.isSelectAll = true
        } else {
          this.isSelectAll = false
          this.$refs.bottomOperation?.close()
          this.showBtn = true
        }
        if (count > 0) {
          this.showBtn = false
          this.$refs.bottomOperation.show()
        }
      },
      //选择全部
      selectAll() {
        // if (this.isSelectAll) {
        //   this.isSelectAll = false
        // } else {
        //   this.isSelectAll = true
        // }
        // this.infoList.map((item) => {
        //   item.isSelect = this.isSelectAll
        // })
        // this.initCheckAll()
        // this.$forceUpdate()

        // console.log(this.infoList, 'sss')
        this.infoList.forEach((item) => {
          item.isSelect = true
        })
      },
      //重置
      selectReset() {
        this.selectList = []
        this.showBtn = true
        this.$refs.bottomOperation?.close()
        this.infoList.forEach((item) => {
          item.isSelect = false
        })
      },
      //tab点击
      tabChange(tab) {
        console.log('tab --------->', tab)
        this.current = tab.index
        if(this.current == 3) {
           this.distributionStatus = 1
        }else{
          this.distributionStatus = 0
        }
        this.goodStatus = tab.value
        this.goodApprovalStatus = ''
        // this.getData(true)
        this.selectReset()
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
        if (this.current === 2) {
          this.goodApprovalStatus = 3
        } else {
          this.goodApprovalStatus = ''
        }
        this.getData(true)
        this.selectReset()
      },
      selectSelect(e) {
        this.distributionStatus = e.type
        this.getData(true)
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
          name: this.keyword ? this.keyword.trim() : '',
          distributionStatus: this.distributionStatus,
        }
        params['goodStatus'] = this.goodStatus
        if (this.goodApprovalStatus) {
          params['goodApprovalStatus'] = this.goodApprovalStatus
        }
        console.log('params -------> ', params)
        this.$VoHttp
          .apiGoodsQueryMyGoods(params)
          .then((res) => {
            if (res.code === '20001') {
              let data = res.data.pageResult.records || []
              this.total = res.data.pageResult.total

              this.tabs.forEach((item) => {
                ;(res.data?.statistics || []).forEach((sta) => {
                  if(this.distributionStatus == 1) {
                    if (item.value === sta.order && item.name === "寄售") {
                      item.name = sta.statisticName
                      item.count = sta.statisticCount
                    }
                  }else{
                      if (item.value === sta.order) {
                      item.name = sta.statisticName
                      item.count = sta.statisticCount
                    }
                  }
                  
                })
              })
              data.forEach((item) => {
                item.isSelect = false
              })
              this.infoList = this.infoList.concat(data)
              console.log('this.infoList', this.infoList)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              helper.hideLoading()
              this.initCheckAll()
            } else {
              uni.$u.toast(res.message)
              helper.hideLoading()
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
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
        let ids = []
        this.infoList.map((item) => {
          if (item.isSelect) {
            ids.push(item.id)
          }
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
        }, 1000)
        this.getData(true)
      },
      //编辑
      goodsEdit(data) {
        this.operationType = 'edit'
        this.showModify = true
        this.$refs.modifyPopup.init(data)
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
    .btnBar {
      padding: 0 32rpx;
      background: #ffffff;
    }
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

    .nav-right {
      display: flex;
      width: auto;

      &__btn {
        background: #ff5319;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: #ffffff;
        padding: 14rpx 36rpx;
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
        display: inline-block;
        background-color: #f7f7f8;
        //padding: 8rpx 16rpx;
        width: 72px;
        height: 48rpx;
        line-height: 46rpx;
        text-align: center;
        box-sizing: border-box;
        margin: 22rpx 0 22rpx 32rpx;
        border-radius: 100rpx;
        font-size: 24rpx;
        color: $v-c0-85;
        border: 2rpx solid #f7f7f8;

        &.choosed {
          background: $v-tags-btn-disabled;
          border: 2rpx solid $v-tags;
          color: $v-tags;
        }
      }
    }
  }
  .position-f {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
</style>
