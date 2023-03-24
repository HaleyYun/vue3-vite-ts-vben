<template>
  <view class="ticket-list">
    <view class="ticket-list__search">
      <u-search
        v-model="searchValue"
        :clearabled="true"
        shape="square"
        placeholder="请输入您想搜索的内容"
        @clear="searchClear"
        @change="searchChange"
        bgColor="#fff"
      />
    </view>
    <view class="ticket-list__list">
      <TicketItem :data-obj="item" v-for="item in infoList" :key="item.id">
        <view class="btns" slot="btns">
          <view class="btn-item" @click="choose(item)"> 选择 </view>
        </view>
      </TicketItem>
    </view>
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
          },
        ],
        searchValue: '',
      }
    },
    created() {},

    methods: {
      toPage(name) {
        this.$linkToEasy('/pagesAgent/CreatedCenter/CreatedTicket/' + name)
      },
      searchClear() {
        this.searchValue = ''
      },
      searchChange() {
        console.log(this.searchValue)
      },
      choose(item) {
        uni.setStorageSync('exchange_ticket', item)
        uni.navigateBack()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ticket-list {
    width: 750rpx;
    height: 100%;
    position: relative;

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
  }
</style>
