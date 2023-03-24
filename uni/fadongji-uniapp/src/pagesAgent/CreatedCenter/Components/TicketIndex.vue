<template>
  <scroll-view scroll-top="0" scroll-y="true" class="ticket-page">
    <view class="link-title" @click="ticketPopVisible = true">
      系统根据您的需求匹配到了4张相似的优惠券，点击查看 >
    </view>
    <view class="info-list">
      <TicketItem :data-obj="item" v-for="item in infoList" :key="item.id">
        <view class="btns" slot="btns">
          <view class="btn-item"> 申请交换 </view>
        </view>
      </TicketItem>
    </view>
    <view class="btm-wrap">
      <view class="btm-wrap-item" @click="toPage('ticketSetting')"> 优惠券交换设置 </view>
      <view class="btm-wrap-item" @click="toPage('ticketExchangeList', '1')"> 请求交换的 </view>
      <view class="btm-wrap-item last" @click="toPage('ticketExchangeList', '2')">
        我申请交换的
      </view>
    </view>
    <u-popup :show="ticketPopVisible" mode="bottom" closeable @close="ticketPopVisible = false">
      <view class="popup-content">
        <TicketItem :data-obj="item" v-for="item in infoList" :key="item.id">
          <view class="btns" slot="btns">
            <view class="btn-item"> 申请交换 </view>
          </view>
        </TicketItem>
      </view>
    </u-popup>
  </scroll-view>
</template>

<script>
  import TicketItem from './TicketItem.vue'
  export default {
    name: 'ticketPage',
    props: {},
    components: {
      TicketItem,
    },
    data() {
      return {
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
            account: 1000,
            con1: '满12000元可用',
            con2: '限购[河南xxx汽配服务有限公司]商品',
            con3: '仅可购买xx品类的商品',
            con4: '可叠加',
            date: '有效期2022.3.25 16:00-2023.3.25 16:20',
          },
        ],
        ticketPopVisible: false,
      }
    },

    methods: {
      toPage(name, type) {
        if (type) {
          this.$linkToEasy('/pages/agent/home/creat/' + name + '?type=' + type)
        } else {
          this.$linkToEasy('/pages/agent/home/creat/' + name)
        }
      },
    },
    created() {},
  }
</script>

<style lang="scss" scoped>
  .ticket-page {
    width: 750rpx;
    height: 100%;
    position: relative;

    .link-title {
      text-align: center;
      line-height: 40px;
      background-color: #eee;
    }

    .btns {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .btn-item {
        padding: 5px 10px;
        text-align: center;
        background-color: #eee;
        border-radius: 5px;
      }
    }

    .btm-wrap {
      width: 100%;
      padding: 10px 0;
      display: flex;
      background-color: #eee;
      position: absolute;
      bottom: 0;

      .btm-wrap-item {
        width: 33.33%;
        text-align: center;
        border-right: 1px solid #666;

        &.last {
          border-right: 0;
        }
      }
    }

    .popup-content {
      padding-top: 30px;
    }
  }
</style>
