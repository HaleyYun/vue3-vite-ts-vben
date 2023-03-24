<template>
  <view>
    <view class="eva flex flex-column">
      <VoNav :is-back="false" is-fixed is-have-more title="评价" @backFn="reBack">

      </VoNav>
      <view class="flex1 overflow-y">
        <!--  商品评价  -->
        <view class="eva-evaluate">
          <view class="eva-evaluate__title">商品评价</view>
          <view class="flex flex-vertical-c m-t-16">
            <view class="lh42 fz-28 color-block">星级：</view>
            <u-rate
              :size="20"
              :value="selectNum"
              activeIcon="/static/created/evaluate/score_activate.png"
              gutter="12"
              inactiveIcon="/static/created/evaluate/score_not_active.png"
              @change="selectedQuantity"
            />
            <view class="fz-24 lh36 m-l-4">{{ levelText[selectNum] }}</view>
          </view>
          <view v-if="pageType != 'order'" class="flex flex-wrap m-t-50">
            <view
              v-for="info of optionItem"
              :key="info.id"
              :class="{ select: info.selected === true, uncheck: info.selected === false }"
              class="eva-evaluate__option"
              @click="chooseFn(info)"
            >
              {{ info.name }}
            </view>
          </view>
        </view>
        <!--  内容和图片上传  -->
        <view class="eva-content">
          <view class="eva-content__title">内容</view>
          <view class="eva-content__textarea">
            <EraTextarea
              v-model="content"
              border="none"
              class="textarea-area"
              maxlength="200"
              placeholder="请输入评价内容"
              placeholder-style="color: rgba(0, 0, 0, 0.25);font-size: 28rpx;"
              style="background: #f7f7f8; height: 268rpx"
            />
            <view class="textarea-num">{{ content.length }}/200</view>
          </view>
          <view class="eva-content__upload">
            <view class="upload-name flex flex-justify-between flex-vertical-c">
              <view class="upload-name__left">图片/视频上传</view>
              <view class="upload-name__right">{{ fileList1.length }}/6</view>
            </view>
            <view class="upload-pictures">
              <VoFormUpload :limit="6" :source.sync="fileList1" :video-limit="1" btnText="" />
            </view>
          </view>
        </view>
        <!--  其他服务评价  -->
        <view v-if="pageType != 'order'" class="eva-evaluate m-b-16">
          <view class="eva-evaluate__title">其他服务评价</view>
          <view class="flex flex-vertical-c m-t-16">
            <view class="lh42 fz-28 color-block">店家服务：</view>
            <u-rate
              :value="storeService"
              activeIcon="/static/created/evaluate/score_activate.png"
              gutter="12"
              inactiveIcon="/static/created/evaluate/score_not_active.png"
              @change="storeServiceChange"
            />
            <view class="fz-24 lh36 m-l-4">{{ levelText[storeService] }}</view>
            <!-- <view class="fz-24 lh36 m-l-4" v-else-if="storeService === 4">好</view> -->
          </view>
          <view class="flex flex-vertical-c m-t-38 p-b-4">
            <view class="lh42 fz-28 color-block">物流时效履约：</view>
            <u-rate
              :value="logisticsAging"
              activeIcon="/static/created/evaluate/score_activate.png"
              gutter="12"
              inactiveIcon="/static/created/evaluate/score_not_active.png"
              @change="logisticsAgingChange"
            />
            <view class="fz-24 lh36 m-l-4">{{ levelText[logisticsAging] }}</view>
            <!-- <view class="fz-24 lh36 m-l-4" v-else-if="logisticsAging === 4">好</view> -->
          </view>
        </view>
      </view>
      <view class="fixed">
        <view class="eva-bottom" @click="confirmClick">
          <EraButton circle />
        </view>
        <VoSafetyArea :is-fixed="false" />
      </view>
    </view>
    <VoModal
      :closeOnClickOverlay="true"
      :content="contentModal"
      :show="showModalCancel"
      :showCancelButton="true"
      cancelText="继续评价"
      confirmText="退出评价"
      @cancel="cancelExit"
      @confirm="confirmExit"
    />
  </view>
</template>

<script>
  export default {
    name: 'SendEvaluation',
    data() {
      return {
        selectNum: 0, // 星级别默认0颗星
        storeService: 0, // 店家服务默认0颗星
        logisticsAging: 0, // 物流时效履约默认0颗星
        optionItem: [
          // {
          //   id: 1,
          //   name: '服务周到',
          //   selected: false,
          // },
          // {
          //   id: 2,
          //   name: '省油',
          //   selected: false,
          // },
          // {
          //   id: 3,
          //   name: '大品牌',
          //   selected: false,
          // },
          // {
          //   id: 4,
          //   name: '服务特别好',
          //   selected: false,
          // },
          // {
          //   id: 5,
          //   name: '服务好周到',
          //   selected: false,
          // },
        ],
        content: '', // 输入框双向绑定
        fileList1: [],
        videoSrc: '',
        showModalCancel: false, // 返回弹框
        contentModal: '确定退出评价吗？',
        evaluateData: {},
        orderData: {},
        sourceType: '',
        //评价来源 0.订单评价跳转 1.我的评价-待评价跳转
        evaluateType: '',
        levelText: { 1: '非常差', 2: '差', 3: '一般', 4: '好', 5: '非常好' },
        pageType: '',
        optionsId: '',
        isLoading: false,
      }
    },
    onLoad(option) {
      //页面来源，order安装订单
      this.pageType = option.type || ''
      this.optionsId = option.id || ''
      if (option.evaluateType && option.data) {
        let data = JSON.parse(option.data)
        this.evaluateType = option.evaluateType
        if (option.evaluateType == 0) {
          this.orderData = data
          this.sourceType = option.sourceType
        } else if (option.evaluateType == 1) {
          this.evaluateData = data
        }
      }
      //安装订单评价不需要展示标签
      if (this.orderData.goodsDetail?.[0].goodsId) {
        this.getKeyWordRequest(this.orderData.goodsDetail?.[0].goodsId)
      }
    },
    methods: {
      //评价关键字接口
      getKeyWordRequest(goodsId) {
        this.$VoHttp
          .apiGoodsKeywordQueryGetKeyWord({ goodsId })
          .then((res) => {
            this.optionItem = []
            res.data.map((item, index) => {
              this.optionItem.push({
                name: item,
                id: index,
                selected: false,
              })
            })
          })
          .catch((err) => {
            uni.$u.toast(err.message || '评价失败')
          })
      },
      selectedQuantity(e) {
        this.selectNum = e
        console.log(e)
      },
      storeServiceChange(e) {
        this.storeService = e
      },
      logisticsAgingChange(e) {
        this.logisticsAging = e
      },
      /**
       *  打开
       */
      open() {
        this.showModalCancel = true
      },
      /**
       * 关闭
       */
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      confirmExit() {
        this.close()
        if (this.evaluateType === 0) {
          this.$linkToEasy('/pagesGarage/MyEvaluation/MyEvaluation')
          return
        }
        this.$backFn()
      },
      /**
       * 模态框点击取消按钮时触发
       */
      cancelExit() {
        this.close()
      },
      /**
       * 退出
       */
      reBack() {
        this.showModalCancel = true
      },
      chooseFn(e) {
        this.optionItem.forEach((info) => {
          if (e.id === info.id) {
            info.selected = !info.selected
          }
        })
      },
      confirmClick() {
        if (this.isLoading) {
          return
        }
        if (this.selectNum < 1) {
          this.$u.toast('请给服务打分')
          return
        }
        // if (this.content.length < 1) {
        //   this.$u.toast('请输入评价内容')
        //   return
        // }
        // if (this.fileList1.length < 1) {
        //   this.$u.toast('请上传图片/视频')
        //   return
        // }
        let content = {
          content: this.content,
          pic: JSON.stringify(this.fileList1),
        }

        this.isLoading = true
        //安装订单评价
        if (this.pageType === 'order') {
          let paramInstall = {
            id: this.optionsId,
            starMark: this.selectNum * 2,
            content: JSON.stringify(content),
          }
          console.log('paramInstall', paramInstall)
          this.toSubmit(paramInstall)
          return
        }

        //其他评价
        if (this.storeService < 1) {
          this.isLoading = false
          this.$u.toast('请给各项服务打分')
          return
        }
        if (this.logisticsAging < 1) {
          this.isLoading = false
          this.$u.toast('请给各项服务打分')
          return
        }
        let param = {
          starMark: this.selectNum * 2,
          logisticsTimeliness: this.logisticsAging,
          hotelService: this.storeService,
        }
        console.log(this.evaluateData.shopPlatformCode)
        if (this.evaluateType == 0) {
          param.orderId = this.orderData.id
          // param.platformCode = this.orderData.platformCode
          param.platformCode = this.userInfo.platformCode
          param.companyId = this.userInfo.companyId
          param.sourceId = this.orderData.goodsDetail?.[0].goodsId
          param.sourceType = this.sourceType
          param.bePlatformCode = this.orderData.shopPlatformCode
          param.beCompanyId = this.orderData.shopId
        } else if (this.evaluateType == 1) {
          param.orderId = this.evaluateData.orderId
          // param.platformCode = this.evaluateData.shopPlatformCode
          param.sourceId = this.evaluateData.goodsId
          param.sourceType = this.evaluateData.sourceType
          param.platformCode = this.userInfo.platformCode
          param.companyId = this.userInfo.companyId
          param.bePlatformCode = this.evaluateData.shopPlatformCode
          param.beCompanyId = this.evaluateData.shopId
        }

        let keywordArr = []
        this.optionItem.forEach((item) => {
          if (item.selected) {
            keywordArr.push(item.name)
          }
        })
        let keyword = keywordArr.toString()
        param.keyword = keyword
        param.content = JSON.stringify(content)
        this.evaluateRequest(param)
      },
      //发送安装订单评价
      toSubmit(param) {
        this.$VoHttp
          .apiOrderInstallEvaluation(param)
          .then((res) => {
            uni.$u.toast('评价成功')
            setTimeout(() => {
              uni.$emit('updateOrderList')
              this.$backFn()
            }, 1500)
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '评价失败')
          })
      },
      //发送评价接口
      evaluateRequest(param) {
        this.$VoHttp
          .apiContentEvaluateSave(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('评价成功')
              setTimeout(() => {
                this.$backFn()
                uni.$emit('updateOrderList')
              }, 1500)
            } else {
              uni.$u.toast(res.message || '评价失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('评价失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .eva {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-evaluate {
      padding: 0 32rpx 20rpx;
      box-sizing: border-box;
      margin-top: 16rpx;
      background: #ffffff;
      &__title {
        line-height: 48rpx;
        font-size: 32rpx;
        padding: 24rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid $v-bg-light;
      }
      &__option {
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        text-align: center;
        padding: 6rpx 24rpx;
        margin-right: 32rpx;
        margin-bottom: 32rpx;
        border-radius: 80rpx;
      }
    }
    &-content {
      background: #fff;
      &__title {
        padding: 24rpx 0;
        margin: 0 32rpx;
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
      }
      &__textarea {
        margin: 16rpx 32rpx 8rpx;
        background: $v-bg-light;
        padding: 0 0 20rpx 0;
        box-sizing: border-box;
        font-size: 28rpx;
        .textarea-area {
          background: $v-bg-light;
          height: 200rpx;
          box-sizing: border-box;
          overflow: auto;
        }
        .textarea-num {
          text-align: right;
          margin-top: 16rpx;
          padding: 0 32rpx;
        }
      }
      &__upload {
        .upload-name {
          width: 686rpx;
          height: 48rpx;
          line-height: 48rpx;
          margin: 40rpx 32rpx 0 32rpx;
          &__left {
            font-weight: bold;
            font-size: 32rpx;
            color: $v-c0-85;
          }
          &__right {
            font-size: 28rpx;
            color: $v-c0-85;
          }
        }
        .upload-pictures {
          padding: 32rpx 16rpx 24rpx 32rpx;
          box-sizing: border-box;
          &__img {
            width: 218rpx;
            height: 218rpx;
          }
        }
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
  }
  .select {
    color: $color-primary-red;
    background: $v-error-btn-disabled;
    border: 2rpx solid $color-primary-red;
  }
  .uncheck {
    color: $v-c0-85;
    background: $v-btn-disabled;
    border: 2rpx solid transparent;
  }
  ::v-deep {
    .u-textarea__field {
      height: 100% !important;
    }
  }
</style>
