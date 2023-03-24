<template>
  <view class="search">



    <VoNav is-fixed is-have-more title="查询结果" />
    <view v-if="code" class="code">
      <view class="fz-36 color-block-85 fz-b"
      >VIN码：<text v-for="(item, index) of codeArr" :key="index" class="m-r-2">{{
          item
        }}</text></view
      >
      <view class="code-btn" @click="openEdit">修改</view>
    </view>




    <!--  筛选栏  -->
    <!-- @scrolltolower="loadMore" -->

    <scroll-view
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        class="flex1 overflow-y"
        refresher-background="#F7F7F8"
        refresher-default-style="none"
        refresher-enabled="true"
        scroll-top="0"
        scroll-y
        @refresherabort="onAbort"
        @refresherpulling="onPulling"
        @refresherrefresh="onRefresh"
        @refresherrestore="onRestore"
        @scrolltolower="scrolltolower"
    >
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />

      <view class="p-l-32 p-r-32 bg-white p-b-32">
        <image
            v-if="imageInfoVO"
            :src="imageInfoVO"
            class="w-full block"
            mode="widthFix"
            @click="previewFn"
        ></image>
      </view>
      <view v-if="modelCar && modelCar.length" class="search-result">
        <block   v-for="(item, index) in modelCar"
                 :key="index">
          <view

              class=" flex "
          >
            <image v-if="item.brandLogo" :src="item.brandLogo" class="search-result__photo m-t-6 m-r-24" />
            <view class="flex1 color-block-85">
              <view class="fz-b fz-28 lh150 ">
                <text v-if="item.brandName" class="m-r-8">{{ item.brandName }}</text>
                <text v-if="item.model" class="m-r-8">{{ item.model }}</text>
                <text v-if="item.year" class="m-r-8">{{ item.year }}年</text>
                <text v-if="item.displacement" class="m-r-8">{{ item.displacement }}</text>
                <text v-if="item.transmissionType" class="m-r-8">{{ item.transmissionType }}</text>
                <text v-if="item.emissionStandard" class="m-r-8">{{ item.emissionStandard }}</text>
                <text v-if="item.driveModel" class="m-r-8">{{ item.driveModel }}</text>
              </view>
              <view v-if="item.engineModel" class="m-t-4 fz-28 lh150"
              >发动机型号：{{ item.engineModel }}</view
              >
            </view>
            <view class="search-result__again m-t-18" @click="goDetailFn(item)">查看详情</view>
          </view>

          <view class="remarks" v-if="item.remark">
            备注：{{ item.remark }}
          </view>
        </block>


      </view>


      <block  >
        <view class="divider_c">
          <u-divider text="匹配商品" textSize="10" />
        </view>

      </block>
      <!--  左右可滑动区域  -->
      <view class="shop-slide" >

       <view class="tab-nav">
         <EraTabs
             :current="current"
             :list="tabsList"
             activeStyle="color:#FF5319; fontWeight: bold;font-size: 32rpx"
             inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 32rpx"
             :scrollable="false"
             @change="changeTabs"
         />
       </view>
        <block  >
          <view class="shop-slide__type m-t-32">
            <view class="type-tips">品牌</view>
            <scroll-view class="flex1 type-scroll" scroll-x>
              <view class="flex flex-vertical-c">
                <view
                    v-for="info in brandList"
                    :key="info.id"
                    :class="info.choosed ? 'choosed' : ''"
                    class="type-block"
                    @click="brandChoosed(info)"
                >
                  {{ info.name }}
                </view>
                <view class="flex flex-vertical-c shop-slide__more2" @click="toMore('brand')">
                  <view>查看更多</view>
                  <VoIcon :size="12" name="left-right-arrow" />
                </view>
              </view>
            </scroll-view>
          </view>
          <view class="shop-slide__type m-t-42">
            <view class="type-tips">类型</view>
            <scroll-view class="flex1 type-scroll" scroll-x>
              <view v-if="typeList && typeList.length" class="flex flex-vertical-c">
                <view
                    v-for="info in typeList"
                    v-show="info.name"
                    :key="info.id"
                    :class="info.choosed ? 'choosed' : ''"
                    class="type-block"
                    @click="typeChoosed(info)"
                >
                  {{ info.name }}
                </view>
              </view>
            </scroll-view>
          </view>
        </block>



      </view>
      <!--  商品信息列表区域  -->
      <block v-if="shopListData.length">
        <InvestmentGoodsInfo
            v-for="(info,infoIndex) of shopListData"
            :key="infoIndex"
            :dataObj="info"
            @addShop="showInvestmentPop('加入备货车', info)"
            @buyShop="showInvestmentPop('订购', info)"
        />
        <VoLoadingText :has-more="hasMore" :loading="loading" />
      </block>
      <block v-else-if="isOverLoading">
        <VoNoData :no-data-tips="['暂无匹配项目']" :paddingTop="0">
          <block slot="default">
            <EraButton class="m-t-46" size="small" theme-type="Wire" @click="goConcatFn">{{
                '联系平台客服'
              }}</EraButton>
          </block>
        </VoNoData>
      </block>
    </scroll-view>
    <view class="position-f">


      <!--修改code弹窗-->
      <VoModal
          :show="showHandle"
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
              ref="scanForm"
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
      <!-- 加购弹框 -->
      <u-popup :round="8" :show="showInvestment" mode="bottom" @close="showInvestment = false">
        <InvestmentPopup
            :btnText="btnText"
            :info="dataObj"
            :is-my-self-goods="true"
            :queryType="dataObj.queryType"
            @closeFn="InvestmentPopupClose()"
        />
      </u-popup>
    </view>



    <view class="fixed-icon" @click="goCartFn">
      <image class="fixed-icon__img" src="/static/icons/contract_icon.png" />
      <VoBadge v-if="cartNum" :value="cartNum" class="badge_number" max="99" />
    </view>

  </view>
</template>

<script>

import VoModal from '@/components/VoModal/VoModal'
import {error, goOnlineCustomerFn, hideLoading, showLoading} from '@/common/helper'
import EraButton from '@/uni_modules/era-ui/components/EraButton/EraButton'
import InvestmentGoodsInfo from '../InvestmentList/components/InvestmentGoodsInfo'
import InvestmentPopup from '../InvestmentList/components/InvestmentPopup'
export default {
  name: 'QueryResult',
  components: {EraButton, VoModal,InvestmentGoodsInfo,InvestmentPopup },
  data() {
    return {
      cartNum: 0,
      showInvestment: false, // 弹出层
      dataObj:{},
      btnText:'',
      isLoad:false,
      current: 0, // 横向tabs默认
      tabsList: [
        {
          name: '进货到店',
        },
        {
          name: '全国投放',
        },
      ],
      isOverLoading: false,
      codeArr: [],
      imageInfoVO: '', // imageInfoVO
      type: '', // scan 拍照 相册     handInput 手动输入
      hasMore: true,
      loading: false,
      pageQuery: {
        pageNo: 1,
        pageSize: 10
      },
      modelCar: [],
      shopListData: [],
      brandList: [], //热门品牌
      typeList: [], //商品类型

      brandChoose: [], //选中品牌
      typeChoose: [], //选中类型


      triggered: false,
      scrollTop: 0,
      loadingStatus: false,
      refresh: false,
      total: 0,
      code: '',

      showHandle: false,
      formData: {
        content: '',
      },
      rules: {
        content: [
          {
            type: 'string',
            required: true,
            message: '不可为空',
            trigger: ['blur'],
          },
          {
            type: 'string',
            len: 17,
            required: true,
            message: 'VIN码长度需为17位',
            trigger: ['blur'],
          },
        ],
      },
    }
  },
  onLoad(options) {
    // 页面参考shopList
    this.code = options.code || null
    if (this.code) {
      this.codeArr = this.code.split('')
    }
    this.type = options.type || 'scan'
    this.imageInfoVO = options.imageInfoVO
    // 初始化头部数据
    this.initData()
    //   this.queryListData(true)
    uni.$off('select')
    uni.$off('selectVehicle')
    uni.$on('select', (row) => {
      console.log('brandChooseonLoad', row)
      let obj = {}
      let result = row.reduce((item, next) => {
        obj[next.id] ? '' : (obj[next.id] = true && item.push(next))
        return item
      }, [])
      this.brandChoose = result
      this.queryListData(true)
    })

  },
  onShow(){
    this.getCartNumRequest()
  },
  methods: {
    // 去备货车
    goCartFn() {
      this.$linkToEasy('/pagesAgent/InvestmentList/InvestmentCheckList')
    },
    //订购弹框关闭
    InvestmentPopupClose() {
      this.showInvestment = false
      this.getCartNumRequest()
    },
    // 获取备货车数量
    getCartNumRequest() {
      this.$VoHttp.apiCartBasisQueryNum({},{noLoading:true}).then((res) => {
        if (res.data || +res.data === 0) {
          this.cartNum = +res.data
        }
      })
    },
    /**
     * 打开弹出层
     */
    async showInvestmentPop(text, data) {
      showLoading('加载中')
      let res = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentBuyerPreview({
        id: data.id,
        companyId: this.userInfo.companyId,
      })
      if (!res || !res.data) return
      if (res.data) {
        this.dataObj = res.data
        this.dataObj.queryType = data.queryType

        if (
            this.dataObj.totalInvestment - this.dataObj.alreadyInvestedNum <
            this.dataObj.startNumber
        ) {
          // 这个商品总的可投达不到起投
          uni.$u.toast('剩余可批量不足，联系客服再开放些余量吧~')
          return
        }

        if (
            this.dataObj.investmentLimit - this.dataObj.myAlreadyInvestedNum <
            this.dataObj.startNumber
        ) {
          //个人可投达不到起投
          if (this.dataObj.investmentLimit - this.dataObj.myAlreadyInvestedNum <= 0) {
            uni.$u.toast(
                '超出限投量，项目限投' +
                this.dataObj.investmentLimit +
                ',您已投资' +
                this.dataObj.myAlreadyInvestedNum,
            )
            return
          } else {
            uni.$u.toast(
                '该项目您已批发' +
                this.dataObj.myAlreadyInvestedNum +
                '，剩余可批发量' +
                (this.dataObj.investmentLimit - this.dataObj.myAlreadyInvestedNum) +
                '小于项目起批量' +
                this.dataObj.startNumber,
            )

            return
          }
        }

        if (this.dataObj.isbuy === 1) {
          this.$u.toast('当前区域不支持投资，去看看其他项目吧')
          return
        }
        if (Number(this.dataObj.status) != 1) {
          this.$u.toast('商品已经抢光了，下次早点来哦')
          return
        }
        if (Number(this.dataObj.remainingAvailable) < 1) {
          this.$u.toast('库存不足，暂不支持参与')
          return
        }
        if (
            this.dataObj.alreadyInvestedNum >= this.dataObj.totalInvestment ||
            this.dataObj.remainingAvailable < this.dataObj.startNumber
        ) {
          this.$u.toast('库存不足')
          return
        }
        if (this.dataObj.remainingAvailable < 1) {
          uni.$u.toast('库存不足')
          return
        }
        if (this.dataObj.totalInvestment <= this.dataObj.alreadyInvestedNum) {
          uni.$u.toast('购买数量已经达到上限')
          return
        }
      }
      hideLoading()

      this.btnText = text
      //全国投资
      if (this.dataObj.queryType === 'A') {
        this.$storage.set('projectData', this.dataObj)
        this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrdersCountry')
        return
      }
      this.showInvestment = true
    },

    changeTabs(e) {
      this.current = e.index
      this.queryListData(true)
    },
    goDetailFn(item) {
      this.$linkToEasy('/pagesGarage/GlobalSearch/VehicleDetail?levelId=' + item.levelId)
    },
    previewFn() {
      uni.previewImage({
        urls: [this.imageInfoVO],
      })
    },
    goConcatFn() {

        goOnlineCustomerFn()
    },
    openEdit() {
      // this.formData.content = this.code
      // this.showHandle = true
      //新业务 跳转去新页面修改
      this.$linkToEasy(
          '/pagesAgent/VinTell/UpdateVin?imageInfoVO=' +
          this.imageInfoVO +
          '&code=' +
          this.code,
      )
    },
    /**
     * 确认事件
     */
    async handleInput() {
      if (this.showHandle) {
        let res
        try {
          res = await this.$refs.scanForm.validate()
        } catch (e) {
          console.log(e)
        }
        console.log(res)
        if (!res) return
      }
      this.code = JSON.parse(JSON.stringify(this.formData.content))
      this.queryListData(true)
    },
    /**
     * 关闭弹窗
     */
    closeHandler() {
      this.formData.content = ''
      this.showHandle = false
    },
    // 初始化头部数据
    async initData() {
      showLoading()
      //热门品牌
      let brandRes = await this.$VoHttp.GOODS.apiGoodsBrandQueryListHot({}, { noLoading: true })
      if (!brandRes || !brandRes.data) return
      this.brandList = brandRes.data.map((item) => {
        return {
          ...item,
          choosed: false,
        }
      })
      //商品类型 修改2022-10-09 13:28:43 林宗宗让 0 改成 1000000001
      let typeRes = await this.$VoHttp.GOODS.apiGoodsTypeQueryList(
          { categoryId: 1000000001 },
          { noLoading: true },
      )
      if (!typeRes || !typeRes.data) return
      const typeList = typeRes.data.map((item, index) => {
        return {
          id: index,
          name: item,
          choosed: false,
        }
      })
      typeList.map((item) => {
        if (item.name) {
          this.typeList.push(item)
        }
      })
      await this.queryListData(true,true)
    },
    toMore(name) {
      let path = ''
      if (name === 'vehicle') {
        let arr = []
        path = `/pagesGarage/ShopList/VehicleType`
        if (this.vehicleChoose.length) {
          this.vehicleChoose.forEach((item) => {
            console.log(item)
            const { id, initials } = item
            arr.push({ id, initials })
          })
          path = `/pagesGarage/ShopList/VehicleType?brandId=${JSON.stringify(arr)}`
        }
      } else {
        this.brandList.forEach((item) => {
          item.choosed = false
        })
        path = '/pagesGarage/ShopList/BrandList'
      }
      this.$linkToEasy(path)
    },

    //品牌选择
    brandChoosed(info) {
      this.brandList.forEach((item) => {
        if (item.id === info.id) {
          item.choosed = !item.choosed
        }
      })
      this.brandChoose = this.brandList.filter((item) => item.choosed)
      this.queryListData(true)
    },
    //类型选择
    typeChoosed(info) {
      this.typeList.forEach((item) => {
        if (item.id === info.id) {
          item.choosed = !item.choosed
        }
      })
      this.typeChoose = this.typeList.filter((item) => item.choosed)
      this.queryListData(true)
    },
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.pageQuery.pageNo += 1
        this.queryListData()
      }
    },
    // 加载商品列表数据
    async queryListData(init,first) {
      if (this.loading) return
      this.loading = true
      try {
        if (init) {
          this.pageQuery.pageNo = 1
        }
        let brandIds = this.brandChoose.length ? this.brandChoose.map((item) => item.id) : []
        let categoryTypes = this.typeChoose.length ? this.typeChoose.map((item) => item.name) : []
        let params = {
          vin: this.code,
          brandIds: brandIds,
          categoryTypes: categoryTypes,
          queryType: this.current === 1 ? 'A' : 'L',
          isGoods:false


        }
        console.log(params)
        if(first){
          this.isLoad=true
        }else{
          this.isLoad=false
        }

        // GOODS.apiGoodsProjectInvestmentSpList

        const res = await this.$VoHttp.apiBusinessVehicleScanGetgoodsbyvin({
          ...this.pageQuery,
          ...params,
        }).catch(e=>{
          error(e.message||'暂无数据')
          this.isOverLoading = true
        })

        this.isOverLoading = true

        console.log(res, '接口返回数据')

        if (!res || !res.data) {
          this.loading = false
          this.triggered = false
          this.refresh = false
          this.loadingStatus = false
          this.closeHandler()
          return
        }
        const { data } = res
        console.log(data)
        this.total = data.total || 0

        if (init) {
          this.shopListData = []
        }
        data.projectInvestVOList.forEach((item) => {
          item.queryType = this.current === 1 ? 'A' : 'L'
        })


        this.shopListData = this.shopListData.concat(data.projectInvestVOList||[])
        this.modelCar = data.vehicleModelVOList
        // console.log('this.shopListData22222222', this.shopListData)
        this.hasMore = this.shopListData.length < data.total
        this.$forceUpdate()
      } catch (e) {
        console.warn(e, 'TargetFile=>>ShopList')
        this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
      }
      this.loading = false
      this.triggered = false
      this.refresh = false
      this.loadingStatus = false
      if (init) {
        this.scrollTop = 0
      }
      this.closeHandler()
    },
    //自定义下拉刷新控件被下拉
    onPulling(e) {
      // console.log('onpulling')
      if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
      this.loadingStatus = true
      setTimeout(() => {
        this.loadingStatus = false
      }, 2000)
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
        this.queryListData(1)
        // this.initData()
        // this.initData()
        // setTimeout(() => {
        //   this.triggered = false
        //   this.refresh = false
        //   this.loadingStatus = false
        // }, 500)
      }
      // console.log('this.triggered', this.triggered)
    },
    //滚到底部加载
    scrolltolower() {
      // uni.$u.throttle(() => {
      // }, 2000)
      console.log('底部加载')
      this.refresh = false
      if (this.shopListData.length >= this.total) {
        return
      }
      this.pageQuery.pageNo += 1
      this.queryListData()
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
    close() {
      this.showBuyNow = false
      // console.log('close');
    },
  },
}
</script>

<style lang="scss" scoped>
.position-f {
  position: fixed;
}
.search {
  box-sizing: border-box;
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  &-result {
    background: #fff;
    padding: 28rpx 32rpx;
    margin: 16rpx 0 0rpx;
    &__photo {
      width: 80rpx;
      height: 80rpx;
    }
    &__again {
      width: 160rpx;
      height: 56rpx;
      line-height: 52rpx;
      text-align: center;
      box-sizing: border-box;
      font-size: 24rpx;
      color: #22284b;
      border: 2rpx solid #d3d4db;
      border-radius: 200rpx;
      color: rgba(0, 0, 0, 0.85);
      margin-left: 24rpx;
    }
  }
}
.code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 32rpx 32rpx 24rpx 32rpx;
  color: rgba(0, 0, 0, 0.85);
  font-size: 32rpx;
  &-btn {
    color: #0d66ff;
    font-size: 28rpx;
  }
}
.divider_c {
  width: 360rpx;
  margin: 0 auto;
}
.shop {
  width: 750rpx;
  //height: 100vh;
  overflow-x: hidden;

  &-search {
    padding: 12rpx 32rpx;
    box-sizing: border-box;
    background: #fff;
  }

  &-slide {
    padding: 16rpx 0 16rpx 32rpx;
    box-sizing: border-box;
    background: #fff;
    //overflow-x: scroll;
    &__img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      overflow: hidden;
    }

    &__name {
      line-height: 28rpx;
      font-size: 24rpx;
      margin-top: 4rpx;
      white-space: nowrap;
      color: $v-c0-65;
    }

    &__more {
      width: 80rpx;
      //height: 112rpx;
      font-size: 24rpx;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      align-items: center;
      //justify-content: center;
      padding-right: 32rpx;
      box-sizing: border-box;
    }

    &__more2 {
      font-size: 24rpx;
      white-space: nowrap;
      padding-right: 24rpx;
    }

    &__type {
      display: flex;
      align-items: center;
      white-space: nowrap;
      //margin-top: 32rpx;
      .type-tips {
        font-size: 28rpx;
        color: $v-c0-85;
        margin-right: 40rpx;
      }

      .type-delete {
        width: 128rpx;
        height: 64rpx;
        font-size: 28rpx;
        color: $v-c0-45;
      }

      .type-selected {
        height: 36rpx;
        color: #e50012;
        font-size: 24rpx;
        background: #feecee;
        border: 2rpx solid #f7909c;
        border-radius: 16px;
        margin-right: 24rpx;
        padding: 0 6rpx 0 16rpx;
      }

      .type-scroll {
        overflow-x: auto;
      }

      .type-block {
        height: 32rpx;
        line-height: 32rpx;
        background: #f6f7f8;
        border: 2rpx solid #f6f7f8;
        border-radius: 80rpx;
        margin-right: 16rpx;
        padding: 6rpx 24rpx;
        font-size: 24rpx;
        color: $v-c0-85;
        &.choosed {
          background: #feecee;
          border: 2rpx solid #f7909c;
          color: #e50012;
        }
      }
    }

    &__sift {
      padding: 6rpx 32rpx;
      border-radius: 80rpx;
      margin-right: 16rpx;
      white-space: nowrap;

      &.select {
        background: #feecee;
        border: 2rpx solid #e50012;
      }

      &.no-select {
        background: #f6f7f8;
        border: 2rpx solid transparent;
      }
    }
  }
}
.no_data {
  height: 400rpx;
}
.block {
  display: block;
}
.remarks{
  background: #F7F7F8;
  font-size: 28rpx;
  line-height: 150%;
  color: rgba(0, 0, 0, 0.65);
  border-radius: 4rpx;
  padding: 16rpx 28rpx;
  box-sizing: border-box;
  margin-top: 32rpx;
}
.tab-nav{
  width: 750rpx;padding: 0rpx 180rpx;box-sizing: border-box
}
.fixed-icon {
  width: 104rpx;
  height: 104rpx;
  position: fixed;
  bottom: 240rpx;
  right: 32rpx;
  border-radius: 50%;
  // overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &__img {
    width: 104rpx;
    height: 104rpx;
  }
}
.badge {
  &_number {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
  }
}
.divider_c ::v-deep .u-divider{
  margin: 24rpx auto 24rpx;
}
</style>
