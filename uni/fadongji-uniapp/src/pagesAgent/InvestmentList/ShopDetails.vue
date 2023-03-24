<template>
  <view class="details">
    <VoNav :is-fixed="false" :left-width="200" :right-width="200" isHaveMore title="店铺详情">
      <view slot="operation">
        <view class="m-r-20 fz-28" @click="showRule = true">评分规则</view>
      </view>
    </VoNav>
    <!--  店铺信息  -->
    <view class="details-store flex flex-vertical-c">
      <image
        :src="storeDetail.storeUrl"
        class="details-store__img"
        @click="lookPreviewImage(storeDetail.storeUrl)"
      />
      <view class="flex1">
        <view class="flex flex-vertical-c">
          <VoIcon name="smile-m" @click.native="toIm()" />
          <view class="lh42 fz-b fz-28 color-block m-l-8">{{ storeDetail.storeName }}</view>
          <!--          <VoIcon :opacity="0.25" :size="16" color="#000" name="right-arrow" />-->
        </view>
        <view class="details-store__text m-t-10">{{ storeDetail.collectNum || '0' }}人收藏</view>
      </view>
      <view
        :class="storeDetail.isCollect ? 'un-selected' : 'selected'"
        class="details-store__collection"
        @click="collectFn"
        >{{ storeDetail.isCollect ? '已收藏' : '收藏' }}</view
      >
    </view>
    <!--  评分  -->
    <view class="details-score">
      <view class="flex flex-vertical-c">
        <view class="lh42 fz-28 color-block">商品评价：</view>
        <view>
          <u-rate
            :value="storeDetail.goodsScore"
            activeColor="#E50012"
            allowHalf
            gutter="12"
            readonly
            size="25"
          />
        </view>

        <view v-if="storeDetail.goodsScore" class="fz-24 lh36 m-l-4"
          >{{ storeDetail.goodsScore }}分</view
        >
        <view class="fz-24 lh36 m-l-4" />
      </view>
      <view class="flex flex-vertical-c m-t-24 m-b-24">
        <view class="lh42 fz-28 color-block">店家服务：</view>
        <view>
          <u-rate
            :value="storeDetail.storeScore"
            activeColor="#E50012"
            allowHalf
            gutter="12"
            readonly
            size="25"
          />
        </view>

        <view v-if="storeDetail.storeScore" class="fz-24 lh36 m-l-4"
          >{{ storeDetail.storeScore }}分</view
        >

        <view class="fz-24 lh36 m-l-4" />
      </view>
      <view class="flex flex-vertical-c">
        <view class="lh42 fz-28 color-block">物流履约：</view>
        <u-rate
          :value="storeDetail.logisticsScore"
          activeColor="#E50012"
          allowHalf
          gutter="12"
          readonly
          size="25"
        />
        <view v-if="storeDetail.logisticsScore" class="fz-24 lh36 m-l-4"
          >{{ storeDetail.logisticsScore }}分</view
        >
        <view class="fz-24 lh36 m-l-4" />
      </view>
    </view>
    <!--  营业执照  -->
    <view class="details-license">
      <view class="details-license__title">营业执照</view>
      <image
        :src="storeDetail.businessLicenseUrl"
        class="details-license__img"
        @click="lookPreviewImage(storeDetail.businessLicenseUrl)"
      />
    </view>
    <GradingRule :show.sync="showRule" />
  </view>
</template>

<script>
  import GradingRule from './components/GradingRule'
  import {error, getStoreImUserIdFn} from "@/common/helper";

  export default {
    name: 'ShopDetails',
    components: { GradingRule },
    data() {
      return {
        showRule: false, // 评分规则弹窗
        storeDetail: {},
        companyId: '',
      }
    },
    onLoad(option) {
      console.log(option)
      this.companyId = option.companyId ? option.companyId : this.userInfo.companyId
      this.getStoreDetailRequest()
    },
    methods: {
      // 跳转到客服聊天界面
      toIm() {

        getStoreImUserIdFn({
          companyId:this.storeDetail.companyId
        }).then(res=>{
          const info = {
            targetId: res,
            type: 0,
            note: this.storeDetail.shopName,
            platformCode: this.storeDetail.role == 1 ? 'supplier' : 'agent', // 1供应商  2服务商
            isProject: true,
            goods: {
              name: this.storeDetail.goodsName,
              pic: this.storeDetail.storeUrl,
              id: this.storeDetail.id,
              cashPrice: this.storeDetail.cashPrice,
              accountPrice: this.storeDetail.accountPrice,
              accountPeriodDays: this.storeDetail.accountPeriodDays,
            },
          }
          this.$storage.set('temp_im_room_info', info)
          this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
        }).catch(e=>{
          error(e.message||"未找到店铺客服")
        })

      },
      collectFn() {
        // 收藏
        if (!this.storeDetail.isCollect) {
          console.log('收藏')
          let params = {
            contentId: this.companyId,
            collectionType: 3,
          }
          this.$VoHttp.GOODS.apiGoodsCollectionCollectionStore(params)
            .then((res) => {
              if (+res.code === 20001) {
                this.$toast('收藏成功', 'success', '/static/icons/success_icon.png')
                this.storeDetail.isCollect = true
                setTimeout(()=>{
                  this.getStoreDetailRequest()
                },1500)
                uni.$emit('shopCollect', { isCollect: this.storeDetail.isCollect })
              }
              this.isLoading = false
            })
            .catch((err) => {
              console.log('err', err)
              uni.$u.toast(err.message || '收藏失败')
              this.isLoading = false
            })
        } else if (this.storeDetail.isCollect) {
          // 取消收藏
          this.$VoHttp.GOODS.apiGoodsCollectionCancelStore$Id({ id: this.companyId })
            .then((res) => {
              console.log(res.data)
              this.storeDetail.isCollect = false
              uni.$u.toast('已取消收藏')
              setTimeout(()=>{
                this.getStoreDetailRequest()
              },1500)
              uni.$emit('shopCollect', { isCollect: this.storeDetail.isCollect })
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
            })
        }
      },
      //获取店铺详情数据
      getStoreDetailRequest() {
        let params = {
          companyId: this.companyId,
        }
        this.$VoHttp
          .apiCompanyInfoStore(params)
          .then((res) => {
            console.log(res)
            this.storeDetail = res.data
          })
          .catch((err) => {
            this.$u.toast(err.message || '店铺详情获取失败')
          })
      },
      lookPreviewImage(data) {
        // 预览图片
        uni.previewImage({
          urls: [data],
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .details {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-store {
      background: #fff;
      margin-top: 16rpx;
      padding: 24rpx 36rpx 24rpx 32rpx;
      &__img {
        width: 96rpx;
        height: 96rpx;
        margin-right: 24rpx;
        border-radius: 16rpx;
      }
      &__text {
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-65;
      }
      &__collection {
        height: 36rpx;
        line-height: 36rpx;
        padding: 10rpx 44rpx;
        border-radius: 30rpx;
        font-size: 24rpx;
      }
    }
    &-score {
      margin-top: 16rpx;
      background: #fff;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    &-license {
      margin-top: 16rpx;
      background: #fff;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      &__title {
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $v-c0-85;
      }
      &__img {
        width: 366rpx;
        height: 250rpx;
        margin-top: 16rpx;
        border-radius: 16rpx;
      }
    }
  }
  .selected {
    color: $color-primary-yellow;
    border: 2rpx solid $color-primary-yellow;
  }
  .un-selected {
    background: $v-btn-disabled;
    color: $v-c0-25;
    border: 2rpx solid $v-btn-disabled;
  }
</style>
