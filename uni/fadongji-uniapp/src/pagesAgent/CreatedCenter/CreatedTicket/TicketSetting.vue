<template>
  <view class="ticket-set">
    <view class="ticket-set__title"> 以下是您可用于交换的优惠券 </view>
    <view class="ticket-set__list">
      <radio-group @change="radioChange">
        <view class="radio-wrap" v-for="(item, index) in infoList" :key="item.id">
          <radio :value="item.id" :checked="index === current" />
          <TicketItem :data-obj="item">
            <view class="btns" slot="btns">
              <view class="btn-item" @click="toPage(item)"> 申请交换 </view>
            </view>
          </TicketItem>
        </view>
      </radio-group>
    </view>
  </view>
</template>

<script>
  import TicketItem from '../Components/TicketItem.vue'
  export default {
    name: 'TicketSetPage',
    components: {
      TicketItem,
    },
    props: {},
    data() {
      return {
        infoList: [
          {
            id: '1',
            account: 1000,
            con1: '满12000元可用',
            con2: '限购[河南xxx汽配服务有限公司]商品',
            con3: '仅可购买xx品类的商品',
            con4: '可叠加',
            date: '有效期2022.3.25 16:00-2023.3.25 16:20',
          },
          {
            id: '2',
            account: 1000,
            con1: '满12000元可用',
            con2: '限购[河南xxx汽配服务有限公司]商品',
            con3: '仅可购买xx品类的商品',
            con4: '可叠加',
            date: '有效期2022.3.25 16:00-2023.3.25 16:20',
          },
        ],
        ticketPopVisible: false,
        current: -1,
        chooseData: '',
      }
    },
    created() {},

    methods: {
      toPage(item) {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/CreatedTicket/TicketExchange?data=' + JSON.stringify(item),
        )
      },
      radioChange(evt) {
        console.log(evt.detail)
        for (let i = 0; i < this.infoList.length; i++) {
          if (this.infoList[i].id === evt.detail.value) {
            this.current = i
            this.chooseData = this.infoList[i]
            break
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ticket-set {
    width: 750rpx;
    height: 100%;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    &__title {
      padding: 10px 0;
    }
    .radio-wrap {
      display: flex;
      align-items: center;
      padding-left: 10px;
      border: 1px solid rgba(215, 215, 215, 1);
      background: #fff;
      margin-bottom: 10px;
    }
    .ticket-item-wrap {
      border: 0;
      flex: 1;
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

    .popup-content {
      padding-top: 30px;
    }
  }
</style>
