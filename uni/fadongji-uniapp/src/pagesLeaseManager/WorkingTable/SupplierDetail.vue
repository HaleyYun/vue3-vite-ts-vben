<template>
  <view class="container flex flex-column overflow-hidden">
    <VoNav :is-fixed="false" isHaveMore title="供应商详情" />
    <ServiceInfo :info="baseInfo" />
    <u-sticky offsetTop="0">
      <view class="tabBar">
        <EraTabs
          :current="current"
          :list="tabList"
          activeStyle="font-weight: bold;color: #FF5319;font-size:16px"
          class="detail-tab"
          inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size:14px"
          line-color="#FF5319"
          @click="changeTabFn"
        />
        <!-- 账款信息Tab下内容 -->
        <block v-if="current === 1 && accountInfo.list.length > 0 && baseInfo.checkStatus === 4">
          <!--   账款商品滑动固定   -->
          <view class="detail-receivable flex flex-vertical-c">
            <view class="fz-28 color-block-45 m-r-16">应收账款</view>
            <VoPointPrice
              :leftSize="20"
              :price="accountInfo.surplusReceivableAmount"
              :showUnit="true"
              color="#F20014"
            />
          </view>
        </block>
        <!--   销售商品滑动固定   -->
        <block v-if="current === 2 && baseInfo.checkStatus === 4">
          <SalesFixed :tab-list="salesGoodsInfo.tabList" @change="changeSaleType" />
        </block>
        <!--   投资商品滑动固定   -->
        <block v-if="current === 3 && baseInfo.checkStatus === 4">
          <SalesFixed :tab-list="goodsInfo.tabList" @change="changeGoodsType" />
        </block>
        <!-- 售后信息Tab下按钮组 -->
        <block v-else-if="current === 5 && baseInfo.checkStatus === 4">
          <SaleAfterFixed @SaleAfterFixed="getSaleAfterScreen" />
        </block>
      </view>
    </u-sticky>
    <scroll-view
      :refresher-enabled="false"
      :refresher-threshold="10"
      :scroll-y="true"
      class="flex1 detail overflow-y"
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
      <!-- 未认证 -->
      <block
        v-if="
          baseInfo.checkStatus === 0 || baseInfo.checkStatus === 3 || baseInfo.checkStatus === 5
        "
      >
        <!-- 基本信息: 未认证展示提示提交注册 -->
        <ServiceRegiste v-if="current === 0 && baseInfo.checkStatus === 0" :info="baseInfo" />
        <!-- 其余tab展示空状态 -->
        <VoNoData v-else :no-data-tips="['该供应商未完成信息认证，', '暂无该模块数据']" />
      </block>
      <!-- 待审核 -->
      <block v-else-if="baseInfo.checkStatus === 2 || baseInfo.checkStatus === 1">
        <!-- 基本信息: 待审核可展示基本信息 -->
        <BasicInformation v-if="current === 0" :information="baseInfo" />
        <!-- 其余tab展示空状态 -->
        <VoNoData v-else :no-data-tips="['该供应商未完成信息认证，', '暂无该模块数据']" />
        <view
          v-if="current === 0 && baseInfo.checkStatus === 2 && baseInfo.isBindMobile"
          class="detail-bottom"
        >
          <!--          <view class="flex flex-justify-between flex-vertical-c">-->
          <!--            <view class="detail-bottom__button line" @click="showFail = true">审核不通过</view>-->
          <!--            <view class="detail-bottom__button fill" @click="pass">审核通过</view>-->
          <!--          </view>-->
          <view class="detail-bottom__button fill" @click="pass">审核通过</view>
          <VoSafetyArea :is-fixed="false" />
        </view>
      </block>
      <!-- 已认证 -->
      <block v-else-if="baseInfo.checkStatus === 4">
        <!-- 基本信息 -->
        <block v-if="current === 0">
          <!--    未完成信息认证时     -->
          <VoNoData
            v-if="baseInfo.checkStatus === 0"
            :no-data-tips="['该供应商未完成信息认证，', '暂无该模块数据']"
          />
          <BasicInformation v-else :information="baseInfo" />
        </block>
        <!-- 账款信息 -->
        <block v-if="current === 1">
          <!-- 如果无账款信息展示空状态 -->
          <block v-if="accountInfo.list.length > 0">
            <AccountInformation :account-info="accountInfo.list" />
            <VoLoadingText :has-more="accountInfo.hasMore" :loading="accountInfo.loading" />
          </block>
          <VoNoData v-else />
        </block>
        <!-- 销售信息 -->
        <block v-if="current === 2">
          <!-- 如果无商品信息展示空状态 -->
          <block v-if="salesGoodsInfo.list.length > 0">
            <SalesGoods :sales-goods-list="salesGoodsInfo.list" :companyId="baseInfo.companyId" :type="1" />
            <VoLoadingText :has-more="salesGoodsInfo.hasMore" :loading="salesGoodsInfo.loading" />
          </block>
          <VoNoData v-else />
        </block>
        <!-- 投资信息 -->
        <block v-if="current === 3">
          <!-- 如果无订单信息展示空状态 -->
          <block v-if="goodsInfo.list.length > 0">
            <SalesGoods :sales-goods-list="goodsInfo.list" :type="2" />
            <VoLoadingText :has-more="goodsInfo.hasMore" :loading="goodsInfo.loading" />
          </block>
          <VoNoData v-else />
        </block>
        <!-- 订单信息 -->
        <block v-if="current === 4">
          <block v-if="orderInfo.list.length > 0">
            <ServiceOrder :info-list="orderInfo.list" />
            <VoLoadingText :has-more="orderInfo.hasMore" :loading="orderInfo.loading" />
          </block>
          <VoNoData v-else />
        </block>
        <!--售后信息 -->
        <block v-if="current === 5">
          <block v-if="afterSaleInfo.list.length > 0">
            <ServiceAfterSales ref="getSaleAfterMethods" :sales-list="afterSaleInfo.list" />
            <VoLoadingText :has-more="afterSaleInfo.hasMore" :loading="afterSaleInfo.loading" />
          </block>
          <VoNoData v-else />
        </block>
      </block>
      <!--      &lt;!&ndash;   售后信息   &ndash;&gt;-->
      <!--      <view v-if="current === 5" class="detail-swiper">-->
      <!--        &lt;!&ndash;    未完成信息认证时     &ndash;&gt;-->
      <!--        <VoNoData-->
      <!--          v-if="baseInfo.checkStatus === 0 || afterSalesList.length === 0"-->
      <!--          :no-data-tips="['该供应商未完成信息认证，', '暂无该模块数据']"-->
      <!--        />-->
      <!--      </view>-->
      <VoSafetyArea :is-fixed="false" bg-color="#f8f8f8" />
    </scroll-view>
    <NotApprovedPopup
      v-if="showFail"
      :show.sync="showFail"
      @cancel="showFail = false"
      @sure="notPass"
    />
  </view>
</template>

<script>
  import { hideLoading, showLoading } from '@/common/helper'
  import ServiceInfo from './components/ServiceInfo'
  import BasicInformation from './components/BasicInformation'
  import NotApprovedPopup from './components/NotApprovedPopup'
  import AccountInformation from './components/AccountInformation'
  import ServiceOrder from './components/ServiceOrder'
  import ServiceAfterSales from './components/ServiceAfterSales'
  import SalesFixed from './components/SalesFixed'
  import SalesGoods from './components/SalesGoods'
  import RepairFixed from './components/RepairFixed'
  import SaleAfterFixed from './components/SaleAfterFixed'
  import ServiceRegiste from './components/ServiceRegiste'

  export default {
    name: 'SupplierDetail',
    components: {
      ServiceInfo,
      BasicInformation,
      NotApprovedPopup,
      AccountInformation,
      ServiceOrder,
      ServiceAfterSales,
      SalesFixed,
      SalesGoods,
      RepairFixed,
      SaleAfterFixed,
      ServiceRegiste,
    },
    data() {
      return {
        // 修理厂待审核角标数量
        repairCount: 0,
        // 修理厂列表类型筛选 0全部 1未认证 2待审核 3已认证 4审核拒绝
        repairType: 0,
        triggered: false,
        refresh: false,
        loadingStatus: false,
        scrollTop: 0,
        id: '',
        current: 0, // 横向tabs默认
        showFail: false, // 审核不通过弹窗
        tabList: [
          {
            name: '基本信息',
          },
          {
            name: '账款信息',
          },
          {
            name: '销售商品',
          },
          {
            name: '投资商品',
          },
          {
            name: '订单信息',
          },
          // {
          //   name: '修理厂信息',
          // },
          {
            name: '售后信息',
          },
        ],
        // 基本信息
        baseInfo: {
          // checkStatus: 4, //认证状态（0-未认证；1-通联审核中；2-待审核；3-通联审核失败；4-已认证；5-认证失败）
          // accountNo: '1232132132', //企业对公账户账号
          // address: '1江苏省徐州市贾汪区1', //详细地址
          // areaCode: '320305', //区域code
          // areaCodeStr: '江苏省徐州市贾汪区', //区域信息 例：河南省-郑州市-金水区
          // bankName: '中国建设银行股份有限公司洛阳龙门大道支行', //开户行支行名称
          // bindStatus: 0, //是否为永久绑定关系（0-否；1-是）
          // businessLicenseEndDate: '2022-04-06', //营业执照有效期 结束时间
          // businessLicenseStartDate: '2022-04-06', //营业执照有效期 开始时间
          // businessLicenseUrl:
          //   'http://devgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getImage?fileName=20220803/user/license/c0689e1c6b4440f5ba14e06870de0012.jpg', //营业执照证图片地址
          // certificationBrand: null, //经营品牌
          // certificationCategory: null, //经营品类
          // checkStatusStr: '三方认证失败', //认证状态描述
          // companyId: '155342874391740416', //企业ID
          // fullName: '服务商拓客2测试', //企业名称
          // isBindMobile: false, // 是否绑定手机号（true：是；false：否）
          // isBlacklist: false, // 是否拉黑（true：拉黑，false：未拉黑）
          // latitude: null, //纬度
          // legalEndDate: '2022-04-06', //法人身份有效期 结束时间
          // legalId: '155342874391740416', //法人证件号
          // legalIdCardBack:
          //   'http://devgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getImage?fileName=20220803/user/license/c0689e1c6b4440f5ba14e06870de0012.jpg', //法人身份证反面
          // legalIdCardFront:
          //   'http://devgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getImage?fileName=20220803/user/license/c0689e1c6b4440f5ba14e06870de0012.jpg', //法人身份证正面
          // legalName: '张三2测试', //法人姓名
          // legalStartDate: '2022-04-06', //法人身份有效期 开始时间
          // longitude: null, //经度
          // organizationCode: '', //组织机构代码
          // parenBankName: '中国建设银行', //开户银行名称
          // photoUrl: '', //用户头像
          // platformCode: 'agent', //平台身份code
          // storeName: '232323cesi2', //店铺名称
          // userId: '155342873510936576', //用户ID
          // userName: '15789342324', //手机号（注册手机号）
        },
        // 账款信息
        accountInfo: {
          list: [
            // {
            //   orderNumber: '订单号-E2022010110001',
            //   type: '已逾期',
            //   orderMoney: '11180.00',
            //   received: '00.00',
            //   date: '2022-01-01 12:00:00',
            // },
          ],
          surplusReceivableAmount: '', // 应收账款
          pageNo: 1,
          pageSize: 10,
          total: 0,
          hasMore: true,
          loading: false,
        },
        // 销售商品
        salesGoodsInfo: {
          //商品列表
          list: [
            // {
            //   id: 6,
            //   orderNum: '商品编号：202293841884',
            //   title: '江铃动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
            //   head: '/static/demo/rectangle.png',
            //   warning: 0, //0正常 1缺货 2无货
            //   status: 2, //0在售 1待售 2违规
            //   breakRule: 2, //0待整改 1审核中 2审核未通过
            //   cash: 99990, //现金
            //   stages: 99990, //45天账期
            //   estimateH: 2790.56, //预计收益 高阈值
            //   estimateL: 2655.45, //预计收益 低阈值
            // },
          ],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          tabList: [
            // { id: 1, name: '在售', selected: true },
            // { id: 2, name: '待审核', selected: false },
            // { id: 3, name: '待售', selected: false },
            // {
            //   id: 4,
            //   name: '违规',
            //   children: [
            //     { id: 3, name: '待整改', selected: false },
            //     { id: 4, name: '审核中', selected: false },
            //     { id: 5, name: '审核未通过', selected: false },
            //   ],
            // },
          ],
          cur: [0],
          hasMore: true,
          loading: false,
        },
        // 投资商品
        goodsInfo: {
          //商品列表
          list: [],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          tabList: [],
          cur: [0],
          hasMore: true,
          loading: false,
        },
        // 订单信息
        orderInfo: {
          // 订单列表
          list: [],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          hasMore: true,
          loading: false,
        },
        // 售后信息
        afterSaleInfo: {
          list: [
            // {
            //   id: 1, //id
            //   time: '2022-03-22 18:01:12', //时间
            //   title: '江陵动力B15发动机江陵动力B15发动机江陵动力B15发动机江陵动力B15发动机', //标题
            //   orderNum: 'BU88998YHH89', //订单号
            //   type: '质量问题', //类型
            //   price: 170, //价格
            //   code: 'A014092510101041010', //识别码
            //   thing: '水泵', //故障件
            //   states: 0, //0运输损坏、1更换零部件、2换机
            //   pos: 3, //0'待审核', 1'待补偿', 2'已完成', 3'待签收'
            //   img: '/static/demo/rectangle.png',
            //   desc: '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家的有钱大家的有钱。',
            //   result: '运输损坏申请提交成功  等待平台审核', //状态描述
            // },
          ],
          pageNo: 1,
          pageSize: 10,
          orderStatus: null,
          total: 0,
          hasMore: true,
          loading: false,
        },
        companyId: '',
        inviterId: '',
      }
    },
    methods: {
      /**
       * 获取售后筛选信息
       */
      getSaleAfterScreen(status) {
        // this.$refs.getSaleAfterMethods.setType({ pos: res.pos })
        this.afterSaleInfo.orderStatus = status || null
        this.afterSaleInfo.list = []
        this.afterSaleInfo.pageNo = 1
        this.getAfterSaleList()
      },
      /**
       * 获取修理厂筛选信息
       */
      getRepairScreen(res) {
        console.log(222)
        this.$refs.getRepairMethods.setType({ pos: res.pos })
      },
      // 审核通过
      async pass() {
        showLoading()
        let params = {
          id: this.companyId,
          status: 4,
        }
        await this.$VoHttp
          .apiCompanyInfoAudit(params)
          .then((rea) => {
            this.$u.toast('success')
            this.getBaseData()
            this.showFail = false
          })
          .catch((e) => {
            this.$u.toast(e.message || '操作失败')
          })
        hideLoading()
      },
      // 审核不通过
      async notPass(result) {
        showLoading()
        let params = {
          id: this.companyId,
          status: 5,
          result,
        }
        const data = await this.$VoHttp
          .apiCompanyInfoAudit(params)
          .then((res) => {
            this.$u.toast('success')
            this.getBaseData()
            this.showFail = false
          })
          .catch((e) => {
            this.$u.toast(e.message || '操作失败')
          })
        hideLoading()
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
        console.log(this.scrollTop)
        if (this.scrollTop === 0) {
          if (this.refresh) return
          if (this.currentTab > 0 && this.baseInfo.checkStatus !== 4) {
            return
          }
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          switch (this.current) {
            case 0:
              this.getData()
              break
            case 1:
              this.accountInfo.pageNo = 1
              this.accountInfo.list = []
              this.getAccountList()
              break
            case 2:
              this.salesGoodsInfo.pageNo = 1
              this.salesGoodsInfo.list = []
              this.getSalesGoods()
              break
            case 3:
              this.goodsInfo.pageNo = 1
              this.goodsInfo.list = []
              this.getGoodsList()
              break
            case 4:
              this.orderInfo.pageNo = 1
              this.orderInfo.list = []
              this.getOrderList()
              break
            case 5:
              this.afterSaleInfo.pageNo = 1
              this.afterSaleInfo.list = []
              this.getAfterSaleList()
              break
          }
          setTimeout(() => {
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          }, 500)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        console.log('底部加载')
        uni.$u.throttle(() => {
          if (this.currentTab > 0 && this.baseInfo.checkStatus !== 4) {
            return
          }
          this.refresh = false
          switch (this.current) {
            case 0:
              break
            case 1:
              if (this.getAccountList.list.length >= this.salesGoodsInfo.total) {
                uni.$u.toast('没有更多了')
                return false
              }
              this.getAccountList.pageNo++
              this.getAccountList()
              break
            case 2:
              if (this.salesGoodsInfo.list.length >= this.salesGoodsInfo.total) {
                uni.$u.toast('没有更多了')
                return false
              }
              this.salesGoodsInfo.pageNo++
              this.getSalesGoods()
              break
            case 3:
              if (this.goodsInfo.list.length >= this.goodsInfo.total) {
                uni.$u.toast('没有更多了')
                return false
              }
              this.goodsInfo.pageNo++
              this.getGoodsList()
              break
            case 4:
              if (this.orderInfo.list.length >= this.orderInfo.total) {
                uni.$u.toast('没有更多了')
                return false
              }
              this.orderInfo.pageNo++
              this.getOrderList()
              break
            case 5:
              if (this.afterSaleInfo.list.length >= this.afterSaleInfo.total) {
                uni.$u.toast('没有更多了')
                return false
              }
              this.afterSaleInfo.pageNo++
              this.getAfterSaleList()
              break
          }
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
      },
      // 切换Tab
      changeTabFn(e) {
        this.current = e.index
        if (this.currentTab > 0 && this.baseInfo.checkStatus !== 4) {
          return
        }
        switch (this.current) {
          case 0:
            break
          case 1:
            if (this.accountInfo.list === null || this.accountInfo.list.length > 0) {
              return
            }
            this.getAccountList()
            break
          case 2:
            if (this.salesGoodsInfo.list === null || this.salesGoodsInfo.list.length > 0) {
              return
            }
            this.getSalesGoods()
            break
          case 3:
            if (this.goodsInfo.list.length > 0) {
              return
            }
            this.getGoodsList()
            break
          case 4:
            if (this.orderInfo.list.length > 0) {
              return
            }
            this.getOrderList()
            break
          case 5:
            if (this.afterSaleInfo.list.length > 0) {
              return
            }
            this.getAfterSaleList()
            break
        }
      },
      /**
       * 获取账款列表
       */
      async getAccountList() {
        if (this.accountInfo.loading) return
        this.accountInfo.loading = true
        showLoading()
        try {
          let param = {
            shopId: this.companyId,
            pageNo: this.accountInfo.pageNo,
            pageSize: this.accountInfo.pageSize,
            selectFromClient: 1,
          }
          const data = await this.$VoHttp.apiAccountperiodList(param)
          console.log(data)
          if (+data.code === 20001) {
            this.accountInfo.surplusReceivableAmount = data.data.surplusReceivableAmount
            this.accountInfo.list.push(...data.data.accountPeriodListSubOrderVO.records)
            this.accountInfo.total = data.data.accountPeriodListSubOrderVO.total
            this.accountInfo.hasMore = this.accountInfo.list.length < this.accountInfo.total
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        this.accountInfo.loading = false
        hideLoading()
      },
      /**
       * 获取售后单列表
       */
      async getAfterSaleList() {
        if (this.afterSaleInfo.loading) return
        this.afterSaleInfo.loading = true
        showLoading()
        try {
          let param = {
            shopId: this.companyId,
            pageNo: this.afterSaleInfo.pageNo,
            pageSize: this.afterSaleInfo.pageSize,
          }
          param.orderStatus = this.afterSaleInfo.orderStatus || null
          const data = await this.$VoHttp.apiOrderAfterSaleQueryListSupplier(param)
          console.log(data)
          if (+data.code === 20001) {
            this.afterSaleInfo.list.push(...data.data.records)
            this.afterSaleInfo.total = data.data.total
            if (this.afterSaleInfo.list.length >= data.data.total) {
              this.afterSaleInfo.hasMore = false
            } else {
              this.afterSaleInfo.hasMore = true
            }
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        this.orderInfo.loading = false
        hideLoading()
      },
      /**
       * 获取订单列表
       * @returns {Promise<void>}
       */
      async getOrderList() {
        if (this.orderInfo.loading) return
        this.orderInfo.loading = true
        showLoading()
        try {
          let param = {
            shopId: this.companyId,
            pageNo: this.orderInfo.pageNo,
            pageSize: this.orderInfo.pageSize,
          }
          const data = await this.$VoHttp.apiOrderSellQueryListGarage(param)
          console.log(data)
          if (+data.code === 20001) {
            // this.orderInfo.list.concat(data.data.records)
            this.orderInfo.list.push(...data.data.records)
            this.orderInfo.total = data.data.total
            if (this.orderInfo.list.length >= data.data.total) {
              this.orderInfo.hasMore = false
            } else {
              this.orderInfo.hasMore = true
            }
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        this.orderInfo.loading = false
        hideLoading()
      },
      /**
       * 销售商品下切换tab
       * @param indexs 下标数组
       */
      changeSaleType(indexs) {
        this.salesGoodsInfo.tabList.forEach((item) => {
          item.selected = false
          if (item.children) {
            if (indexs.length > 1) {
              if (item.children) {
                item.children.forEach((it) => {
                  it.selected = false
                })
              }
            }
          }
        })
        if (indexs.length > 1) {
          this.salesGoodsInfo.tabList[indexs[0]].selected = true
          this.salesGoodsInfo.tabList[indexs[0]].children[indexs[1]].selected = true
        } else {
          this.salesGoodsInfo.tabList[indexs[0]].selected = true
          if (this.salesGoodsInfo.tabList[indexs[0]].id === 4) {
            return
          }
        }
        this.salesGoodsInfo.cur = indexs
        this.salesGoodsInfo.pageNo = 1
        this.salesGoodsInfo.list = []
        this.getSalesGoods()
      },
      /**
       * 投资商品下切换tab
       * @param indexs 下标数组
       */
      changeGoodsType(indexs) {
        this.goodsInfo.tabList.forEach((item) => {
          item.selected = false
          if (item.children) {
            if (indexs.length > 1) {
              if (item.children) {
                item.children.forEach((it) => {
                  it.selected = false
                })
              }
            }
          }
        })
        if (indexs.length > 1) {
          this.goodsInfo.tabList[indexs[0]].selected = true
          this.goodsInfo.tabList[indexs[0]].children[indexs[1]].selected = true
        } else {
          this.goodsInfo.tabList[indexs[0]].selected = true
          if (this.goodsInfo.tabList[indexs[0]].id === 4) {
            return
          }
        }
        this.goodsInfo.cur = indexs
        this.goodsInfo.pageNo = 1
        this.goodsInfo.list = []
        this.getGoodsList()
      },
      /**
       * 获取销售商品列表
       */
      async getSalesGoods() {
        if (this.salesGoodsInfo.loading === true) return
        this.salesGoodsInfo.loading = true
        showLoading()
        const selected = this.salesGoodsInfo.tabList[this.salesGoodsInfo.cur[0]]
        let param = {
          goodStatus: selected ? selected.id : 1,
          pageNo: this.salesGoodsInfo.pageNo,
          pageSize: this.salesGoodsInfo.pageSize,
          shopId: this.baseInfo.companyId,
        }
        if (selected && selected.children) {
          if (this.salesGoodsInfo.cur.length > 1) {
            param.goodApprovalStatus = selected.children[this.salesGoodsInfo.cur[1]].id
          } else {
            this.salesGoodsInfo.loading = false
            hideLoading()
            return
          }
        }
        let data
        try {
          data = await this.$VoHttp.apiGoodsQueryMyGoods(param)
          if (+data.code === 20001) {
            // this.$toast('success')
            let arr = []
            // 操作按钮格式化渲染
            data.data.statistics.forEach((item, index) => {
              let obj = {
                id: item.statisticCode,
                name: `${item.statisticName}(${item.statisticCount})`,
                selected: false,
              }
              if (index === this.salesGoodsInfo.cur[0]) {
                obj.selected = true
              }
              if (item.statisticName === '违规') {
                obj.children = [
                  { id: 3, name: '待整改', selected: false },
                  { id: 4, name: '审核中', selected: false },
                  { id: 5, name: '审核未通过', selected: false },
                ]
                if (this.salesGoodsInfo.cur.length > 1) {
                  obj.children[this.salesGoodsInfo.cur[1]].selected = true
                }
              }
              arr.push(obj)
            })
            this.salesGoodsInfo.tabList = arr
            if (data.data.pageResult.records.length > 0) {
              this.salesGoodsInfo.list.push(...data.data.pageResult.records)
            }
            console.log(this.salesGoodsInfo.list)
            this.salesGoodsInfo.total = data.data.total
            this.salesGoodsInfo.hasMore = this.salesGoodsInfo.list.length < data.data.total
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        this.salesGoodsInfo.loading = false
        hideLoading()
      },
      /**
       * 获取投资商品列表
       */
      async getGoodsList() {
        if (this.goodsInfo.loading === true) return
        this.goodsInfo.loading = true
        showLoading()
        const selected = this.goodsInfo.tabList[this.goodsInfo.cur[0]]
        let param = {
          projectStatus: selected ? selected.id : 1,
          pageNo: this.goodsInfo.pageNo,
          pageSize: this.goodsInfo.pageSize,
          shopId: this.baseInfo.companyId,
        }
        if (selected && selected.children) {
          if (this.goodsInfo.cur.length > 1) {
            param.proApprovalStatus = selected.children[this.goodsInfo.cur[1]].id
          } else {
            this.goodsInfo.loading = false
            hideLoading()
            return
          }
        }
        let data
        try {
          data = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentList(param)
          if (+data.code === 20001) {
            // this.$toast('success')
            let arr = []
            // 操作按钮格式化渲染
            data.data.statistics.forEach((item, index) => {
              let obj = {
                id: item.statisticCode,
                name: `${item.statisticName}(${item.statisticCount})`,
                selected: false,
              }
              if (index === this.goodsInfo.cur[0]) {
                obj.selected = true
              }
              if (item.statisticName === '违规') {
                obj.children = [
                  { id: 3, name: '待整改', selected: false },
                  { id: 4, name: '审核中', selected: false },
                  { id: 5, name: '审核未通过', selected: false },
                ]
                if (this.goodsInfo.cur.length > 1) {
                  obj.children[this.goodsInfo.cur[1]].selected = true
                }
              }
              arr.push(obj)
            })
            console.log(data.data)
            this.goodsInfo.tabList = arr
            console.log(this.goodsInfo.tabList)
            data.data.pageResult.records.forEach((item) => {
              item.pic = item.desc
            })
            this.goodsInfo.list.push(...data.data.pageResult.records)
            console.log(this.goodsInfo.list)
            this.goodsInfo.total = data.data.total
            this.goodsInfo.hasMore = this.goodsInfo.list.length < data.data.total
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
        this.goodsInfo.loading = false
      },
      /**
       * 获取基本信息数据
       */
      async getBaseData() {
        showLoading()
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerInfo({
            inviterId: this.inviterId,
            companyId: this.companyId,
          })
          if (+data.code === 20001) {
            console.log(data)
            this.baseInfo = data.data
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      async init() {
        // 基本信息
        await this.getBaseData()
        // 账款信息
        // await this.getAccountList()
        // 销售商品
        // await this.getSalesGoods()
        // 投资商品
        // await this.getGoodsList()
        // 订单
        // await this.getOrderList()
        // 售后单
        // await this.getAfterSaleList()
      },
    },

    onLoad(options) {
      console.log(options)
      const { companyId, inviterId } = options
      this.inviterId = inviterId
      this.companyId = companyId
      this.init()
    },
    onPullDownRefresh() {
      console.log('asd')
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
  }
  .detail {
    width: 750rpx;
    //height: 100vh;
    background-color: #f7f7f8;
    &-tab {
      width: 750rpx;
      background-color: #ffffff;
      z-index: 2;
      border-bottom: 2rpx solid $v-bg-light;
    }
    ::v-deep .uni-scroll-view-content {
      display: flex;
      flex-direction: column;
    }
    .content {
      width: 100vw;
      height: 100%;
    }
    &-bottom {
      width: 750rpx;
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      &__button {
        //width: 320rpx;
        height: 88rpx;
        text-align: center;
        line-height: 88rpx;
        font-size: 32rpx;
        border-radius: 48rpx;
        &.line {
          border: 2rpx solid #ff5319;
          color: #ff5319;
        }
        &.fill {
          background: #ff5319;
          border: 2rpx solid #ff5319;
          color: #fff;
        }
      }
    }
    &-receivable {
      padding: 16rpx 32rpx;
      line-height: 60rpx;
      background: #fff;
    }
  }
  .public-selected {
    border: 2rpx solid #ffb299;
    background: #feecee;
    color: #ff5319;
  }
  .public-unSelected {
    border: 2rpx solid #f7f7f8;
    background: #f7f7f8;
    color: $v-c0-85;
  }
  .shopinfo {
    background-color: #f7f7f8;
    width: 750rpx;
    &-view4 {
      position: relative;
      z-index: 5;
    }
    &-view5 {
      position: fixed;
      z-index: 999;
    }
  }
</style>
