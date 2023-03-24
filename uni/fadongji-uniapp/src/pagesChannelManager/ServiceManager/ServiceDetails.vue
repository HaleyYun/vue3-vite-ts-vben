<template>
  <view class="container flex flex-column">
    <!-- 页面标题 -->
    <VoNav :is-fixed="false" isHaveMore title="服务商详情" />
    <!-- 详情头部信息卡片 -->
    <ServiceInfo :info="baseInfo" />
    <u-sticky>
      <view class="tabBar">
        <EraTabs
          :current="currentTab"
          :list="tabsList"
          activeStyle="font-weight: bold;color: #FF5319"
          class="detail-tab"
          inactiveStyle="color: rgba(0, 0, 0, 0.45)"
          line-color="#FF5319"
          @click="changeTabs"
        />
        <!-- 账款信息Tab下内容 -->
        <block v-if="currentTab === 1 && baseInfo.checkStatus === 4">
          <view class="flex flex-row w-full bg-white accounts-placeholder">
            <view class="accounts-view1" @click="setScreenAccount(1)">
              <view class="fz-28 lh150 color-block-45">应收账款</view>
              <VoPointPrice
                :left-size="20"
                :price="accountsInfo.surplusReceivableAmount || 0"
                :right-size="12"
                :show-unit="true"
                class="m-t-8"
                color="#FF5319"
                display="inline-block"
              />
            </view>
            <view class="accounts-view1" @click="setScreenAccount(2)">
              <view class="fz-28 lh150 color-block-45">应付账款</view>
              <VoPointPrice
                :left-size="20"
                :price="accountsInfo.notRepayAmount || 0"
                :right-size="12"
                :show-unit="true"
                class="m-t-8"
                color="#FF5319"
                display="inline-block"
              />
            </view>
            <!--              <view class="flex1" />-->
            <!--              <view class="flex flex-row m-r-40 m-t-32" @click="setScreenAccount">-->
            <!--                <view class="fz-26 lh150 color-block-45">筛选</view>-->
            <!--                <VoIcon name="filter" size="20" />-->
            <!--              </view>-->
          </view>
        </block>
        <!-- 商品信息Tab下按钮组 -->
        <block v-else-if="currentTab === 2 && baseInfo.checkStatus === 4">
          <SalesFixed @change="changeSaleType" :tab-list="salesGoodsInfo.tabList" />
        </block>
        <!-- 修理厂信息Tab下按钮组 -->
        <block v-else-if="currentTab === 4 && baseInfo.checkStatus === 4">
          <RepairFixed
            :tab-list="repairInfo.repairTabs"
            @ChangeRepairStatus="ChangeRepairStatus"
          />
        </block>
      </view>
    </u-sticky>
    <scroll-view
      :refresher-enabled="false"
      :refresher-threshold="10"
      :scroll-y="true"
      class="detail flex1 overflow-y"
      :refresher-triggered="triggered"
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
        <ServiceRegiste :info="baseInfo" v-if="currentTab === 0 && baseInfo.checkStatus === 0" />
        <!-- 其余tab展示空状态 -->
        <VoNoData v-else :no-data-tips="['该服务商未完成信息认证，', '暂无该模块数据']" />
      </block>
      <!-- 待审核 -->
      <block v-else-if="baseInfo.checkStatus === 2 || baseInfo.checkStatus === 1">
        <!-- 基本信息: 待审核可展示基本信息 -->
        <ServiceInformation v-if="currentTab === 0" :information="baseInfo" />
        <!-- 其余tab展示空状态 -->
        <VoNoData v-else :no-data-tips="['该服务商未完成信息认证，', '暂无该模块数据']" />
        <view
          v-if="currentTab === 0 && baseInfo.checkStatus === 2 && baseInfo.isBindMobile"
          class="detail-bottom"
        >
<!--          <view class="flex flex-justify-between flex-vertical-c">-->
<!--            <view class="detail-bottom__button line" @click="showFail = true">审核不通过</view>-->
<!--            <view class="detail-bottom__button fill" @click="pass">审核通过</view>-->
<!--          </view>-->
          <view class="detail-bottom__button fill" @click="pass">审核通过</view>
        </view>
      </block>
      <!-- 已认证 -->
      <block v-else-if="baseInfo.checkStatus === 4">
        <!-- 基本信息 -->
        <block v-if="currentTab === 0">
          <ServiceInformation :information="baseInfo" />
        </block>
        <!-- 账款信息 -->
        <block v-if="currentTab === 1">
          <!-- 如果无账款信息展示空状态 -->
          <block v-if="accountsList.list.length > 0">
            <ServiceAccounts ref="ServiceAccounts" :accounts-list="accountsList.list" :type="accountsInfo.type" />
            <VoLoadingText :loading="accountsList.loading" :has-more="accountsList.hasMore" />
          </block>
          <VoNoData v-else />
        </block>
        <!-- 商品信息 -->
        <block v-if="currentTab === 2">
          <!-- 如果无商品信息展示空状态 -->
          <block v-if="salesGoodsInfo.list.length > 0">
            <ServiceShopInfo :shop-info-list="salesGoodsInfo.list" />
            <VoLoadingText :loading="salesGoodsInfo.loading" :has-more="salesGoodsInfo.hasMore" />
          </block>
          <VoNoData v-else />
        </block>
        <!-- 订单信息 -->
        <block v-if="currentTab === 3">
          <!-- 如果无订单信息展示空状态 -->
          <block v-if="orderInfo.list.length > 0">
            <ServiceOrder v-if="orderInfo.list.length > 0" :order-list="orderInfo.list" />
            <VoLoadingText :loading="orderInfo.loading" :has-more="orderInfo.hasMore" />
          </block>
          <VoNoData v-else />
        </block>
        <!-- 修理厂信息 -->
        <block v-if="currentTab === 4">
          <!-- 如果无修理厂信息展示空状态 -->
          <block v-if="repairInfo.repairList.length > 0">
            <ServiceRepair ref="getRepairMethods" :repair-list="repairInfo.repairList" />
            <VoLoadingText :loading="repairInfo.loading" :has-more="repairInfo.hasMore" />
          </block>
          <VoNoData v-else />
        </block>
      </block>
      <VoSafetyArea :is-fixed="false" />
    </scroll-view>
    <NotApprovedPopup v-if="showFail" :show.sync="showFail" @cancel="showFail = false" @sure="notPass" />
  </view>
</template>

<script>
  import { hideLoading, showLoading } from '@/common/helper'
  // 头部卡片信息
  import ServiceInfo from './components/ServiceInfo'
  // 基本信息
  import ServiceInformation from './components/ServiceInformation'
  // 账款信息
  import ServiceAccounts from './components/ServiceAccounts'
  // 商品信息
  import ServiceShopInfo from './components/ServiceShopInfo'
  // 订单信息
  import ServiceOrder from './components/ServiceOrder'
  // 修理厂信息
  import ServiceRepair from './components/ServiceRepair'
  // 售后信息
  // import ServiceAfterSales from './components/ServiceAfterSales'
  // 状态菜单
  import SalesFixed from './components/SalesFixed'
  // 已认证状态
  import ServiceRegiste from './components/ServiceRegiste'
  // 审核弹窗
  import NotApprovedPopup from './components/NotApprovedPopup'
  // 修理厂筛选
  import RepairFixed from './components/RepairFixed'
  // import SaleAfterFixed from './components/SaleAfterFixed'

  export default {
    name: 'ServiceDetails',
    components: {
      // ServiceAfterSale,
      ServiceInfo,
      ServiceInformation,
      ServiceAccounts,
      ServiceShopInfo,
      ServiceOrder,
      ServiceRepair,
      // ServiceAfterSales,
      SalesFixed,
      ServiceRegiste,
      NotApprovedPopup,
      RepairFixed,
      // SaleAfterFixed,
    },
    data() {
      return {
        triggered: false, // 下拉刷新判断布尔值
        refresh: false, // 下拉刷新判断布尔值
        loadingStatus: false, // 下拉刷新防抖
        showFail: false, // 审核不通过弹窗
        scrollTop: 0, // 滑动距离顶部距离
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
        // 账款基本信息
        accountsInfo: {
          surplusReceivableAmount: null, //总收款
          notRepayAmount: null, //总付款
          type: 1, //0全部 1应收款 2应付款
        },
        // 账款信息列表
        accountsList: {
          list: [
            // {
            //   id: 0,
            //   orderNum: 'E2022010110001', //订单号
            //   state: 1, //0不显示 1已逾期 2部分还款
            //   orderMoney: 11180, //订单金额
            //   received: 100, //已收款
            //   time: '2022-01-01 12:00:00', //还款日
            //   type: 1, //1应收 2应付
            // },
          ],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          loading: false,
          hasMore: true,
        },
        // 商品信息列表
        salesGoodsInfo: {
          //商品列表
          list: [],
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
          loading: false,
          hasMore: true,
        },
        // 订单信息列表
        orderInfo: {
          list: [],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          loading: false,
          hasMore: true,
        },
        // 修理厂信息
        repairInfo: {
          // 修理厂信息列表
          repairList: [],
          // 修理厂列表类型筛选 0全部 1未认证 2待审核 3已认证 4审核拒绝
          repairType: null,
          // 修理厂待审核数量
          repairCount: 0,
          // 修理厂tab
          repairTabs: [],
          // 修理厂分页
          pageNo: 1,
          pageSize: 20,
          loading: false,
          hasMore: true,
          total: 0,
        },
        tabsList: [
          {
            name: '基本信息',
          },
          {
            name: '账款信息',
          },
          {
            name: '商品信息',
          },
          {
            name: '订单信息',
          },
          {
            name: '修理厂信息',
          },
          // {
          //   name: '售后信息',
          // },
        ], // 按钮列表
        currentTab: 0, // 当前选中tab下标
        // 商品筛选信息
        salesScreen: [],
        companyId: '', // 企业ID
        inviterId: '', // 邀请人ID
      }
    },
    methods: {
      // 审核通过
      async pass() {
        showLoading()
        let params = {
          id: this.companyId,
          status: 4,
        }
        try {
          const data = await this.$VoHttp.apiCompanyInfoAudit(params)
          if (+data.code === 20001) {
            this.$toast('审核成功', 'success', '/static/icons/success_icon.png')
            await this.getBaseData()
            this.showFail = false
          }
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
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
        try {
          const data = await this.$VoHttp.apiCompanyInfoAudit(params)
          if (+data.code === 20001) {
            this.$toast('审核成功', 'success', '/static/icons/success_icon.png')
            await this.getBaseData()
            this.showFail = false
          }
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      async changeTabs(e) {
        // console.log(e.index, 1111111111111)
        this.currentTab = e.index
        if (this.currentTab > 0 && this.baseInfo.checkStatus !== 4) {
          return
        }
        switch (this.currentTab) {
          case 0:
            break
          case 1:
            if (this.accountsList.list.length > 0) {
              return
            }
            this.accountsInfo.type = 2
            await this.getAccountList()
            this.accountsInfo.type = 1
            await this.getAccountList()
            break
          case 2:
            if (this.salesGoodsInfo.list.length > 0) {
              return
            }
            this.getSalesGoods()
            break
          case 3:
            if (this.orderInfo.list.length > 0) {
              return
            }
            this.getOrderList()
            break
          case 4:
            if (this.repairInfo.repairList.length > 0) {
              return
            }
            this.getRepairTabs()
            this.getRepairList()
            break
        }
      },
      // 账款筛选
      setScreenAccount(tp) {
        //0全部 1应收款 2应付款
        this.accountsInfo.type = tp
        this.accountsList.list = []
        this.accountsList.pageNo = 1
        this.getAccountList()
        // this.accountsInfo.type = (this.accountsInfo.type + 1) % 3
        // this.$refs.ServiceAccounts.setScreen(this.accountsInfo.type)
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
      async onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        console.log(this.scrollTop)
        if (this.scrollTop === 0) {
          if (this.currentTab > 0 && this.baseInfo.checkStatus !== 4) {
            return
          }
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          switch (this.currentTab) {
            case 0:
              break
            case 1:
              this.accountsList.pageNo = 1
              this.accountsList.list = []
              this.getAccountList()
              break
            case 2:
              this.salesGoodsInfo.pageNo = 1
              this.salesGoodsInfo.list = []
              this.getSalesGoods()
              break
            case 3:
              this.orderInfo.pageNo = 1
              this.orderInfo.list = []
              this.getOrderList()
              break
            case 4: // 修理厂信息
              if (this.repairInfo.repairTabs.length <= 0) {
                await this.getRepairTabs()
              }
              this.repairInfo.pageNo = 1
              this.repairInfo.repairList = []
              await this.getRepairList()
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
        if (this.currentTab > 0 && this.baseInfo.checkStatus !== 4) {
          return
        }
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          switch (this.currentTab) {
            case 0:
              break
            case 1:
              if (this.accountsList.list.length >= this.accountsList.total) {
                uni.$u.toast('没有更多了')
                return false
              }
              this.accountsList.pageNo++
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
              if (this.orderInfo.list.length >= this.orderInfo.total) {
                uni.$u.toast('没有更多了')
                break
              }
              this.orderInfo.pageNo++
              this.getOrderList()
              break
            case 4: // 修理厂信息
              if (this.repairInfo.repairList.length >= this.repairInfo.total) {
                uni.$u.toast('没有更多了')
                break
              }
              this.repairInfo.pageNo++
              this.getRepairList()
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
          console.log(data)
          if (+data.code === 20001) {
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
      // 获取修理厂tabs
      async getRepairTabs() {
        showLoading()
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGarageTab({
            platformCode: 'agent',
            companyId: this.baseInfo.companyId,
          })
          console.log(data);
          if (+data.code === 20001) {
            let that = this
            let arr = []
            data.data.forEach((item) => {
              let obj = {}
              if (item.checkStatus === 1) {
                that.repairInfo.repairCount = item.count
              }
              obj.name = item.checkStatusStr
              obj.status = item.checkStatus
              obj.count = item.count
              arr.push(obj)
            })
            console.log(arr)
            this.repairInfo.repairTabs = arr
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e);
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      // 获取修理厂列表
      async getRepairList() {
        if (this.repairInfo.loading) return
        this.repairInfo.loading = true
        const { pageNo, pageSize } = this.repairInfo
        let params = {
          bindingType: 2,
          platformCode: 'garage',
          inviterId: this.baseInfo.companyId,
          pageNo,
          pageSize,
        }
        params.checkStatus = this.repairInfo.repairType
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGaragePage(params)
          console.log(data)
          if (+data.code === 20001) {
            this.repairInfo.total = data.data.total
            this.repairInfo.repairList = [...this.repairInfo.repairList, ...data.data.records]
            this.repairInfo.hasMore = this.repairInfo.repairList.length < data.data.total
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
        this.repairInfo.loading = false
      },
      /**
       * 修理厂状态筛选
       */
      ChangeRepairStatus(status) {
        console.log(222)
        this.repairInfo.repairList = []
        this.repairInfo.pageNo = 1
        this.repairInfo.repairType = status
        this.getRepairList()
      },
      /**
       * 获取销售商品列表
       */
      async getSalesGoods() {
        if (this.salesGoodsInfo.loading) return
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
        try {
          const data = await this.$VoHttp.apiGoodsQueryMyGoods(param)
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
            this.salesGoodsInfo.total = data.data.total
            this.salesGoodsInfo.list.push(...data.data.pageResult.records)
            this.salesGoodsInfo.hasMore = this.salesGoodsInfo.list.length < data.data.total;
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e);
          this.$u.toast(e.message || '网络请求失败')
        }
        this.salesGoodsInfo.loading = false
        hideLoading()
      },
      /**
       * 销售商品下切换tab
       * @param indexs 下标数组
       */
      changeSaleType(indexs) {
        this.salesGoodsInfo.tabList.forEach((item) => {
          item.selected = false
          if (indexs.length > 1) {
            if (item.children) {
              item.children.forEach((it) => {
                it.selected = false
              })
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
       * 获取订单列表
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
          const data = await this.$VoHttp.apiOrderInvestQueryListAgent(param)
          if (+data.code === 20001) {
            console.log(data);
            this.orderInfo.list.push(...data.data.records)
            this.orderInfo.total = data.data.total
            this.orderInfo.hasMore = this.orderInfo.list.length < data.data.total;
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
       * 获取账款列表
       */
      async getAccountList() {
        if (this.accountsList.loading) return
        this.accountsList.loading = true
        showLoading()
        try {
          let param = {
            pageNo: this.accountsList.pageNo,
            pageSize: this.accountsList.pageSize,
          }
          if (this.accountsInfo.type === 1) {
            // 卖家
            param.shopId = this.companyId
            param.buyerId = null
          } else {
            // 买家
            param.buyerId = this.companyId
            param.shopId = null
          }
          const data = await this.$VoHttp.apiAccountperiodList(param)
          console.log(data)
          if (+data.code === 20001) {
            if (this.accountsInfo.type === 1) {
              // 卖家
              this.accountsInfo.surplusReceivableAmount = data.data.surplusReceivableAmount
            } else {
              // 买家
              this.accountsInfo.notRepayAmount = data.data.notRepayAmount
            }
            this.accountsList.list.push(...data.data.accountPeriodListSubOrderVO.records)
            this.accountsList.total = data.data.accountPeriodListSubOrderVO.total
            this.accountsList.hasMore = this.accountsList.list.length < this.accountsList.total
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        this.accountsList.loading = false
        hideLoading()
      },
      async init() {
        // 获取基本信息
        await this.getBaseData()
        // // 获取修理厂tabs
        // await this.getRepairTabs()
        // // 获取修理厂列表
        // await this.getRepairList()
        // // 获取商品列表
        // await this.getSalesGoods()
        // // 获取订单列表
        // await this.getOrderList()
        // // 获取账款列表
        // await this.getAccountList()
      },
    },
    onLoad(options) {
      console.log(options)
      const { companyId, inviterId } = options
      this.inviterId = inviterId
      this.companyId = companyId
      this.init()
    },
  }
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
  .detail-popup__input {
    padding: 17rpx 24rpx !important;
  }
  .detail-popup__holder {
    color: $v-c0-25;
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
    .btnBar {
      width: 750rpx;
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      .bottom-button {
        width: 320rpx;
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
  }
  .accounts {
    width: 750rpx;
    background-color: #f7f7f8;
    &-placeholder {
      border-top: 4rpx solid #f7f7f8;
    }
    &-view1 {
      margin-left: 44rpx;
      padding: 16rpx 32rpx;
    }
  }
  .shopinfo {
    background-color: #f7f7f8;
    width: 750rpx;
    &-view1 {
      height: 96rpx;
      justify-content: space-around;
      padding: 18rpx 46rpx 14rpx;
      box-sizing: border-box;
    }
    &-view2 {
      height: 16rpx;
      background-color: #f7f7f8;
    }
    &-view3 {
      flex-wrap: wrap;
      padding: 18rpx 46rpx 14rpx;
      box-sizing: border-box;
      border-top: 16rpx solid #f7f7f8;
    }
    &-view4 {
      position: relative;
      z-index: 5;
    }
    &-view5 {
      position: fixed;
      z-index: 999;
    }
    &-screen {
      padding: 14rpx 48rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #ff5319;
      background-color: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 200rpx;
    }
    &-screen1 {
      padding: 14rpx 48rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: $v-c0-85;
      background-color: #f7f7f8;
      border: 2rpx solid #f7f7f8;
      border-radius: 200rpx;
    }
    &-screen2 {
      padding: 14rpx 48rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #e50012;
      background-color: #feecee;
      border-radius: 200rpx;
      border: 2rpx solid #e50012;
    }
  }
  .repair {
    width: 750 rpx;
    background-color: #f7f7f8;
    &-view1 {
      overflow-x: scroll;
      width: 750rpx;
      height: 96rpx;
      padding: 18rpx 32rpx 14rpx;
      box-sizing: border-box;
    }
    &-tips {
      position: absolute;
      border-radius: 16rpx;
      right: 0rpx;
      top: -8rpx;
    }
    &-screen {
      position: relative;
      padding: 14rpx 32rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #ff5319;
      background-color: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 200rpx;
    }
    &-screen1 {
      position: relative;
      padding: 14rpx 32rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: $v-c0-85;
      background-color: #f7f7f8;
      border: 2rpx solid #f7f7f8;
      border-radius: 200rpx;
    }
  }
  .sales {
    &-screen {
      position: relative;
      padding: 14rpx 64rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #ff5319;
      background-color: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 200rpx;
    }
    &-screen1 {
      position: relative;
      padding: 14rpx 64rpx;
      font-size: 24rpx;
      line-height: 36rpx;
      color: $v-c0-85;
      background-color: #f7f7f8;
      border: 2rpx solid #f7f7f8;
      border-radius: 200rpx;
    }
  }
</style>
