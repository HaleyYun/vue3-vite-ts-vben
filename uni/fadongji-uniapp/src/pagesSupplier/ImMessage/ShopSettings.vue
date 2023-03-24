<template>
  <view class="set">
    <VoNav is-fixed :title="title" is-have-more>
    </VoNav>
    <view class="set-head flex flex-vertical-c">
      <u-avatar class="set-head__img"  default-url="/static/icons/defaultHead.png" :src="useSetting.storeUrl" shape="square" :size="48"  />

      <view class="set-head__info flex1">
        <view class="info-up">{{useSetting.storeName}}</view>
        <view class="info-down" v-if="useSetting.collectNum">{{useSetting.collectNum}}人收藏</view>
      </view>
    </view>
    <view class="set-notice">
      <view class="flex flex-vertical-c set-notice-evaluation">
        <view >商品评价：</view>
        <view v-if="useSetting.goodsScore" class="flex">
          <u-rate count="5" :value="useSetting.goodsScore" readonly></u-rate>
          <view class="m-l-8">{{useSetting.goodsScore?useSetting.goodsScore:'--'}} 分</view>
        </view>
        <view v-else>暂无</view>
      </view>
      <view class="flex flex-vertical-c set-notice-evaluation">
        <view >店家服务：</view>
        <view class="flex" v-if="useSetting.storeScore" >
          <u-rate count="5" :value="useSetting.storeScore" readonly></u-rate>
          <view class="m-l-8">{{useSetting.storeScore?useSetting.storeScore:'--'}} 分</view>
        </view>
        <view v-else>暂无</view>

      </view>
      <view class="flex flex-vertical-c set-notice-evaluation">
        <view >物流履约：</view>
        <view v-if="useSetting.logisticsScore" class="flex">
          <u-rate count="5" :value="useSetting.logisticsScore" readonly></u-rate>
          <view class="m-l-8">{{useSetting.logisticsScore?useSetting.logisticsScore:'--'}} 分</view>
        </view>
        <view v-else>暂无</view>
      </view>

    </view>

    <view class="set-attention m-b-16"  @click="goShop">进入店铺</view>
    <view class="set-attention flex flex-vertical-c flex-justify-c"  @click="sendMessage">
      <view class="m-l-4">联系客服</view>
    </view>
    <VoModal
            :show="showModalCancel"
            :content="content"
            :showCancelButton="true"
            :closeOnClickOverlay="true"
            @confirm="confirm"
            @cancel="close"
    />
  </view>
</template>

<script>
  export default {
    name: 'FriendSettings',
    data() {
      return {
        title:'',
        loading:false,
        blacklistValue: true, // 加入黑名单开关选择器
        isStranger: true, // 是否为陌生人,
        useSetting:{},
        useInfo:{},
        showModalCancel: false, // 删除模态框
        content: '',

      }
    },
    onLoad(options){
     this.useInfo = options;
     console.log(this.useInfo)
     this.getUserInfo(options)
    },
    methods: {

      async getUserInfo(info){
        try{
          let params = { platformCode: info.platformCode, userId: info.friendId};
          const {code,data} = await this.$VoHttp.IM.apiCompanyInfoImStore(params);
          if(code == '20001'){
            this.useSetting = data;
            this.title = '店铺详情'
          }

        }catch(e){
          uni.$u.toast(e.message)
          setTimeout(()=>{
            this.$backFn()
          },2000)
        }
      },
      // 发消息
      sendMessage(){
        const info = {
          targetId: this.useInfo.friendId,
          type: 0,
          note: this.useSetting.storeName,
          platformCode: this.userInfo.platformCode,
        };
        this.$storage.set('temp_im_room_info', info);
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')

      },
      goShop() {
        if (this.userInfo.roleCode === 'garage') {
          // 看对方角色，跳转店铺详情 假如是汽修厂看的是普通商品详情，是服务商看的是项目详情
          this.$linkToEasy('/pagesGarage/ShopList/ShopGoodsList?shopId='+ this.useSetting.companyId)
        } else if (this.userInfo.roleCode === 'oldMachine' && this.useInfo.platformCode === 'recycling') {
          // 旧机买家，跳转首页
          uni.reLaunch({
            url: '/pages/OldBuyerCenter/OldBuyerTabbar'
          })
        } else {
          // 看对方角色，跳转店铺详情 假如是汽修厂看的是普通商品详情，是服务商看的是项目详情
          this.$linkToEasy('/pagesAgent/InvestmentList/InvestmentShop?shopId='+ this.useSetting.companyId)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .set {
    width: 750rpx;
    height: 100vh;
    &-head {
      width: 750rpx;
      background: #ffffff;
      padding:  24rpx 32rpx;
      box-sizing: border-box;
      margin-top: 16rpx;
      &__img {
        width: 96rpx;
        height: 96rpx;
        display: block;
      }
      &__info {
        margin-left: 24rpx;
        .info-up {
          height: 48rpx;
          font-weight: bold;
          font-size: 28rpx;
          line-height: 48rpx;
          color: $v-c0-85;
        }
        .info-down {
          margin-top: 8rpx;
          font-weight: 400;
          font-size: 24rpx;
          line-height: 42rpx;
          color: $v-c0-65;
        }
      }
    }
    &-notice {
      background: #ffffff;
      margin-top: 16rpx;
      margin-bottom: 40rpx;
      padding: 24rpx 32rpx;
      font-weight: 400;
      font-size: 28rpx;
      .set-notice-evaluation {
        padding-bottom: 24rpx;

      }
    }
    .evaluation-text{
      margin-right: 28rpx;
    }
    &-fun {
      background: #ffffff;
      margin-top: 8rpx;
      margin-bottom: 40rpx;
      &__switch {
        padding: 16rpx 32rpx 16rpx 0;
        margin-left: 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
      }
    }
    &-attention {
      width: 750rpx;
      height: 112rpx;
      line-height: 112rpx;
      background: #ffffff;
      text-align: center;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
    }
    &-tips {
      margin-top: 16rpx;
      color: $v-c0-45;
      font-size: 28rpx;
      text-align: center;
      height: 42rpx;
      line-height: 42rpx;
    }
  }
</style>
