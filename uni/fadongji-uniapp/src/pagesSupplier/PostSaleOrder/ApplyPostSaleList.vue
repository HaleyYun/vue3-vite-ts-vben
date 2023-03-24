<template>
  <view class="page" @click="showRightBtn = true">
    <view class="header">
      <VoNav :is-fixed="false" is-have-more title="售后专区" />
      <view class="tab">
        <view>
          <u-tabs
            :activeStyle="{
              color: '#FF5319',
              fontWeight: 'bold',
              transform: 'scale(1.05)',
            }"
            :current="currentTab"
            :list="list1"
            lineColor="#FF5319"
            @change="tabTap"
          />
        </view>
        <view @click="overlayShow = true">
          <text>筛选</text>
          <VoIcon :opacity="0.45" class="vo_icon m-l-4" color="#000" name="select" size="20" />
          <u-badge
            v-if="currentFilterIndex"
            :offset="[-5, -5]"
            absolute
            bg-color="#F20014"
            max="99"
            value="1"
          />
        </view>
      </view>
    </view>
    <view class="content">
      <swiper :autoplay="false" :current="currentTab" class="swiper" @change="changeSwiper">
        <block v-for="(value, key) of list1">
          <swiper-item :key="key">
            <scroll-view class="order-scroll flex1" scroll-y @scrolltolower="lowerRefash(key)">
                <block v-for="(item, index) of dataList">
                  <ApplyPostSaleItem :key="index" :dataItem="item" @sure="cancelModel" />
                </block>
                <VoNoData v-if="dataList.length<=0&&isOverLoading" no-data-tips="暂无数据" />
            </scroll-view>
          </swiper-item>
        </block>
      </swiper>
      <u-modal
        :show="sureCancel"
        cancel-text="取消"
        confirm-text="确定"
        confirmColor="#22284B"
        show-cancel-button
        @cancel="cancelFn"
        @confirm="confirmHandler"
      >
        <view class="info-content">确定取消售后申请吗？</view>
      </u-modal>
      <u-overlay :show="overlayShow" @click="overlayShow = false">
        <view class="u-overlay" @click.stop>
          <view class="header">
            <VoNav :is-fixed="false" is-have-more title="售后专区" />
            <view class="tab">
              <view>
                <u-tabs
                  :activeStyle="{
                    color: '#FF5319',
                    fontWeight: 'bold',
                    transform: 'scale(1.05)',
                  }"
                  :current="currentTab"
                  :list="list1"
                  lineColor="#FF5319"
                  @click="tabTap"
                />
              </view>
              <view @click="overlayShow = false">
                <text>筛选</text>
                <VoIcon class="vo_icon m-l-4" color="#8C8C8C" name="select" size="20" />
                <u-badge
                  v-if="currentFilterIndex"
                  :offset="[-5, -5]"
                  absolute
                  bg-color="#F20014"
                  max="99"
                  value="1"
                />
              </view>
            </view>
          </view>
          <view class="overly_content">
            <view class="overly_title">发起售后时间</view>
            <view class="overly_btns">
              <view
                v-for="(item, index) in searchEnum"
                :key="index"
                :class="{ isActive: index === currentFilterIndex }"
                class="content_item"
                @click="tapFilterItem(index)"
                >{{ item }}</view
              >
            </view>
          </view>
          <view class="overly_btm">
            <view
              ><u-button class="custom-style" shape="circle" text="重置" @click="resetOverlay"
            /></view>
            <view
              ><u-button
                class="custom-style"
                color="#FF5319"
                shape="circle"
                text="筛选"
                @click="setTime"
            /></view>
          </view>
        </view>
      </u-overlay>
    </view>
  </view>
</template>

<script>
  import ApplyPostSaleItem from './components/ApplyPostSaleItem.vue'

  export default {
    components: {
      ApplyPostSaleItem,
    },
    data() {
      return {
        isOverLoading:false,
        id: '',
        sureCancel: false,
        overlayShow: false,
        isLowerRefresh: true,
        currentFilterIndex: '',
        currentTab: 0,
        dataList: [],
        list1: [
          {
            name: '全部',
            value: '',
            index: 0,
          },
          {
            name: '进行中',
            value: 'handle',
            index: 1,
          },
          {
            name: '已完成',
            value: 'complete',
            index: 2,
          },
        ],
        search: {
          pageNo: 1,
          pageSize: 5,
          searchWord: '',
          orderStatus: '', //	处理中 handle  已完成 complete ,其余不传
          orderStartTime: '',
          orderEndTime: '',
        },
        total:0,
        statusEnum: {
          0: '',
          1: 'handle',
          2: 'complete',
        },
        searchEnum: {
          all: '全部',
          '1m': '1个月内',
          '3m': '1-3个月内',
          '6m': '半年以内',
          '12m': '一年以内',
          other: '一年以上',
        },
        isLoading:false
      }
    },
    onLoad() {
      this.resetReqList()
      uni.$off('refresh')
      uni.$on('refresh', (res) => {
        this.resetReqList()
      })
    },
    mounted() {
      this.getOrderStatusEnum()
    },
    methods: {
      cancelModel(val) {
        this.$linkToEasy('/pagesSupplier/PostSaleOrder/ApplyPostSaleDetail?id=' + val)
        // console.log(val)
        // this.sureCancel = true
        // this.id = val
      },
      cancelFn() {
        this.sureCancel = false
      },
      async confirmHandler() {
        try {
          const res = await this.$VoHttp.apiOrderAfterSaleCancel({
            req: { orderId: this.id, cancelReason: '...' },
          })
          if (res.success) {
            uni.$u.toast(res.message)
            this.sureCancel = false
            this.resetReqList()
          }
        } catch (err) {
          uni.$u.toast(err.message)
        } finally {
          this.sureCancel = false
        }
      },
      changeSwiper(val) {
        this.currentTab = val.detail.current
        this.reqList(true)
      },
      tabTap(e) {
        this.currentTab=e.index
      },
      resetReqList() {
        this.reqList(true)
      },
      tapFilterItem(val) {
        this.currentFilterIndex = val
        console.log(val)
      },
      async reqList(refresh) {
        console.log(1,"2222222222222")
        if(refresh){
          this.dataList=[]
          this.search.pageNo=1
        }
        if(this.isLoading)return
         await this.$VoHttp.apiOrderAfterSaleQueryList({
          ...this.search,
          orderStatus: this.statusEnum[this.currentTab],
        }).then(res=>{

          this.total=res.data.total
           if (res.data.records &&res.data.records.length){
             this.dataList= this.dataList.concat(res.data.records)
           }


         })
        this.isOverLoading=true
        this.isLoading=false

      },
      async getOrderStatusEnum() {
        const res = await this.$VoHttp.apiOrderAfterSaleEnumStatus()
        console.log(res)
      },
      resetOverlay() {
        this.currentFilterIndex = ''
      },
      lowerRefash(index) {
          if(this.dataList.length<this.total){
            this.search.pageNo++
            this.reqList()
          }

      },
      setTime() {
        switch (this.currentFilterIndex) {
          case '1m':
            this.search.orderStartTime = this.$vocenApi
              .dayjs()
              .subtract(1, 'month')
              .format('YYYY-MM-DD HH:mm:ss')
            this.search.orderEndTime = ''
            console.log(this.search.orderStartTime, this.search.orderEndTime)
            break
          case '3m':
            this.search.orderStartTime = this.$vocenApi
              .dayjs()
              .subtract(3, 'month')
              .format('YYYY-MM-DD HH:mm:ss')
            this.search.orderEndTime = this.$vocenApi
              .dayjs()
              .subtract(1, 'month')
              .format('YYYY-MM-DD HH:mm:ss')
            break
          case '6m':
            this.search.orderStartTime = this.$vocenApi
              .dayjs()
              .subtract(3, 'month')
              .format('YYYY-MM-DD HH:mm:ss')
            this.search.orderEndTime = this.$vocenApi
              .dayjs()
              .subtract(6, 'month')
              .format('YYYY-MM-DD HH:mm:ss')
            break
          case '12m':
            this.search.orderStartTime = this.$vocenApi
              .dayjs()
              .subtract(1, 'year')
              .format('YYYY-MM-DD HH:mm:ss')
            this.search.orderEndTime = this.$vocenApi
              .dayjs()
              .subtract(6, 'month')
              .format('YYYY-MM-DD HH:mm:ss')
            break
          case 'other':
            this.search.orderStartTime = ''
            this.search.orderEndTime = this.$vocenApi
              .dayjs()
              .subtract(1, 'year')
              .format('YYYY-MM-DD HH:mm:ss')
            break
          default:
            this.search.orderStartTime = ''
            this.search.orderEndTime = ''
            break
        }
        this.overlayShow = false
        this.resetReqList()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .header {
      background-color: #fff;
      .tab {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
        padding-right: 28rpx;
        > :nth-child(2) {
          //   display: flex;
          //   align-items: center;
          position: relative;
          color: rgba(0, 0, 0, 0.85);
          .vo_icon {
            vertical-align: middle;
          }
        }
      }
    }
    .content {
      flex-grow: 1;
      overflow: auto;
    }
    .u-overlay {
      width: 750rpx;
      height: 132rpx;
      position: relative;
      .overly_content {
        background-color: #fff;
        padding: 24rpx 32rpx;
        .overly_title {
          font-size: 32rpx;
          font-weight: bold;
          padding-bottom: 16rpx;
          border-bottom: 1rpx solid #f7f7f8;
        }
        .overly_btns {
          margin: 24rpx 0 80rpx 0;
          .content_item {
            width: 200rpx;
            height: 64rpx;
            box-sizing: border-box;
            display: inline-block;
            font-size: 24rpx;
            border-radius: 80rpx;
            margin-bottom: 32rpx;
            color: rgba(0, 0, 0, 0.85);
            background-color: #f7f7f8;
            border: 1px solid #f7f7f8;
            text-align: center;
            line-height: 64rpx;
          }
          > :nth-child(3n-1) {
            margin: 0 38rpx;
          }
          .isActive {
            color: #ff5319;
            border: 1px solid #ff5319;
            background-color: #ffece5;
          }
        }
      }
      .overly_btm {
        position: absolute;
        left: 0;
        transform: translateY(-100%);
        width: 100%;
        height: 132rpx;
        display: flex;
        justify-content: space-between;
        > :nth-child(n) {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          .custom-style {
            width: 325rpx;
            height: 80rpx;
          }
        }
      }
    }
    .swiper {
      height: 100%;
    }
    .order-scroll {
      height: 100%;
    }
  }
</style>
