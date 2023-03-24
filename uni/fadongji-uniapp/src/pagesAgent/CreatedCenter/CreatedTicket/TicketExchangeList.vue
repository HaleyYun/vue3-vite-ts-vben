<template>
  <view class="ticket-list">
    <view class="self-tabs">
      <view
        class="self-tabs__item"
        :class="item.choosed ? 'choosed' : ''"
        v-for="(item, index) in tabs"
        :key="item.value"
        @click="tabChange(item)"
      >
        {{ item.name }}
      </view>
    </view>
    <view class="ticket-list__list" v-show="pageType === '1'">
      <TicketItem :data-obj="item" v-for="item in infoList" :key="item.id">
        <view slot="line">
          数量：1
          <span class="s-icon" v-show="item.status">{{ item.status }}</span>
        </view>
        <view v-if="item.applyer">
          <view>申请人：{{ item.applyer }} &nbsp;&nbsp;申请时间：{{ item.applyTime }}</view>
          <view>操作人：{{ item.operator }}&nbsp;&nbsp;操作时间：{{ item.operateTime }}</view>
        </view>
        <view class="flex-line" v-else>
          <view>申请时间：2022-11-12 00:00:00</view>
          <view class="btns">
            <view class="btn-item left" @click="showModal = true"> 拒绝交换 </view>
            <view class="btn-item"> 同意交换 </view>
          </view>
        </view>
      </TicketItem>
    </view>
    <view class="ticket-list__list" v-show="pageType === '2'">
      <TicketItem :data-obj="item" v-for="item in infoList" :key="item.id">
        <view slot="line">
          数量：1
          <span class="s-icon" v-show="item.status">{{ item.status }}</span>
        </view>
        <view v-if="item.applyer">
          <view>申请人：{{ item.applyer }} &nbsp;&nbsp;申请时间：{{ item.applyTime }}</view>
          <view>操作人：{{ item.operator }}&nbsp;&nbsp;操作时间：{{ item.operateTime }}</view>
        </view>
        <view class="flex-line" v-else>
          <view>申请时间：2022-11-12 00:00:00</view>
          <view class="btns">
            <view class="btn-item left" @click="showModal = true"> 取消交换 </view>
          </view>
        </view>
      </TicketItem>
    </view>
    <u-modal
      :show="showModal"
      :content="pageType === '1' ? '确定要拒绝交换吗？' : '确定要取消交换吗？'"
      showCancelButton
      @cancel="showModal = false"
      @confirm="confirm"
    />
  </view>
</template>

<script>
  import TicketItem from '../Components/TicketItem.vue'
  export default {
    name: 'TicketPage',
    components: {
      TicketItem,
    },
    props: {},
    data() {
      return {
        tabsValue: '0',
        tabs: [],
        infoList: [
          {
            id: 1,
            account: 1000,
            con1: '满12000元可用',
            con2: '限购[河南xxx汽配服务有限公司]商品',
            con3: '仅可购买xx品类的商品',
            con4: '可叠加',
            date: '有效期2022.3.25 16:00-2023.3.25 16:20',
          },
          {
            id: 2,
            account: 1101,
            con1: '满12000元可用',
            con2: '限购[河南xxx汽配服务有限公司]商品',
            con3: '仅可购买xx品类的商品',
            con4: '可叠加',
            date: '有效期2022.3.25 16:00-2023.3.25 16:20',
            applyer: 'xxxxx',
            applyTime: '2022.3.25 16:00:00',
            operator: 'xxxxxxx',
            operateTime: '2022.3.25 16:00:00',
            status: '已同意',
          },
          {
            id: 3,
            account: 1101,
            con1: '满12000元可用',
            con2: '限购[河南xxx汽配服务有限公司]商品',
            con3: '仅可购买xx品类的商品',
            con4: '可叠加',
            date: '有效期2022.3.25 16:00-2023.3.25 16:20',
            applyer: 'xxxxx',
            applyTime: '2022.3.25 16:00:00',
            operator: 'xxxxxxx',
            operateTime: '2022.3.25 16:00:00',
            status: '交换成功',
          },
        ],
        searchValue: '',

        showModal: false,
        pageType: '',
      }
    },
    onLoad(options) {
      if (options.type) {
        this.pageType = options.type
        if (this.pageType === '1') {
          this.tabs = [
            {
              name: '待处理',
              value: '0',
              choosed: true,
            },
            {
              name: '已同意',
              value: '1',
              choosed: false,
            },
            {
              name: '已拒绝',
              value: '2',
              choosed: false,
            },
          ]
        } else {
          this.tabs = [
            {
              name: '已申请',
              value: '3',
              choosed: true,
            },
            {
              name: '交换成功',
              value: '4',
              choosed: false,
            },
            {
              name: '交换失败',
              value: '5',
              choosed: false,
            },
          ]
        }
      }
    },
    created() {},
    methods: {
      toPage(name) {
        this.$linkToEasy('/pagesAgent/CreatedCenter/CreatedTicket/' + name)
      },
      tabChange(tab) {
        this.tabsValue = tab.value
        this.tabs.forEach((item) => {
          if (item.value === tab.value) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
      },
      confirm() {
        this.showModal = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ticket-list {
    width: 750rpx;
    height: 100%;
    position: relative;

    &__list {
      .s-icon {
        margin-left: 10px;
        background-color: #eee;
      }
      .flex-line {
        display: flex;
        .btns {
          flex: 1;
          display: flex;
          justify-content: flex-end;

          .btn-item {
            padding: 5px 10px;
            text-align: center;
            background-color: #eee;
            border-radius: 5px;
            &.left {
              margin-right: 10px;
            }
          }
        }
      }
    }

    .self-tabs {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #eee;
      font-size: 14px;

      &__item {
        text-align: center;
        line-height: 26px;
        width: 33.33%;
        &.choosed {
          border-bottom: 1px solid #999;
        }
      }
    }
  }
</style>
