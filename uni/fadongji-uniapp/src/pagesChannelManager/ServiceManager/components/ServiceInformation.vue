<template>
  <view class="basic">
    <!--  营业执照  -->
    <view class="basic-outlets">
      <view class="basic-outlets__title">营业执照</view>
      <image
        :src="information.businessLicenseUrl"
        class="basic-outlets__img"
        @click="previewImg(information.businessLicenseUrl)"
      />
    </view>
    <view class="basic-list lh48 fz-32 color-block">
      <view class="basic-list__item">
        <view>营业执照名称</view>
        <view class="color-block-65">{{ information.fullName }}</view>
      </view>
      <view class="basic-list__item">
        <view>统一信用代码</view>
        <view class="color-block-65">{{ information.organizationCode }}</view>
      </view>
      <view class="basic-list__item">
        <view>法人姓名</view>
        <view class="color-block-65">{{ information.legalName }}</view>
      </view>
      <view class="basic-list__item">
        <view>营业执照有效期</view>
        <view class="color-block-65">
          {{ information.businessLicenseStartDate }} 至 {{ information.businessLicenseEndDate }}
        </view>
      </view>
    </view>
    <!--  法人身份信息  -->
    <view class="basic-outlets m-t-16">
      <view class="basic-outlets__title">法人身份信息</view>
      <view class="flex flex-justify-between">
        <image
          :src="information.legalIdCardFront"
          class="basic-outlets__img2"
          @click="previewImg(information.legalIdCardFront)"
        />
        <image
          :src="information.legalIdCardBack"
          class="basic-outlets__img2"
          @click="previewImg(information.legalIdCardBack)"
        />
      </view>
    </view>
    <view class="basic-list lh48 fz-32 color-block">
      <view class="basic-list__item">
        <view>姓名</view>
        <view class="color-block-65">{{ information.legalName }}</view>
      </view>
      <view class="basic-list__item">
        <view>身份证号</view>
        <view class="color-block-65">{{ information.legalId }}</view>
      </view>
      <view class="basic-list__item">
        <view>身份证有效期</view>
        <view class="color-block-65">
          {{ information.legalStartDate }} 至 {{ information.legalEndDate }}
        </view>
      </view>
    </view>
    <!--  对公账户信息  -->
    <block v-if="information.parenBankName && information.bankName && information.accountNo">
      <view class="basic-outlets m-t-16">
        <view class="basic-outlets__title">对公账户信息</view>
      </view>
      <view class="basic-list lh48 fz-32 color-block">
        <view class="basic-list__item">
          <view class="flex-shark-0 m-r-20">开户银行</view>
          <view class="color-block-65">{{ information.parenBankName }}</view>
        </view>
        <view class="basic-list__item">
          <view class="flex-shark-0 m-r-20">开户支行</view>
          <view class="color-block-65">{{ information.bankName }}</view>
        </view>
        <view class="basic-list__item">
          <view class="flex-shark-0 m-r-20">银行账号</view>
          <view class="color-block-65">{{ information.accountNo }}</view>
        </view>
      </view>
    </block>
    <!--  经营品类  -->
    <block
      v-if="information.certificationCategory && information.certificationCategory.length > 0"
    >
      <view class="basic-outlets m-t-16">
        <view class="basic-outlets__title">经营品类</view>
      </view>
      <view
        v-for="item in information.certificationCategory"
        :key="item.id"
        class="basic-list lh48 fz-32 color-block"
      >
        <view class="basic-list__item">
          {{ item.name }}
        </view>
      </view>
    </block>
    <!--  经营品牌  -->
    <block v-if="information.certificationBrand && information.certificationBrand.length > 0">
      <view class="basic-outlets m-t-16">
        <view class="basic-outlets__title">经营品牌</view>
      </view>
      <view
        v-for="item in information.certificationBrand"
        :key="item.id"
        class="basic-list lh48 fz-32 color-block"
      >
        <view class="basic-list__item">
          <image class="item-icon" :src="item.logoUrl || '/static/logo-2.png'" />
          <view>{{ item.name }}</view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  export default {
    name: 'BasicInformation',
    props: {
      information: {
        type: Object,
        default: function () {
          return {}
        },
      },
    },
    data() {
      return {}
    },
    created() {
      console.log(this.information)
    },
    methods: {
      /**
       * 预览图片
       * @param url 图片链接
       */
      previewImg(url) {
        uni.previewImage({
          urls: [url],
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .basic {
    width: 750rpx;
    //height: 100%;
    box-sizing: border-box;
    &-outlets {
      padding: 24rpx 32rpx;
      background: #fff;
      &__title {
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__img {
        width: 218rpx;
        height: 218rpx;
        display: block;
        border-radius: 8rpx;
        overflow: hidden;
        margin-top: 32rpx;
      }
      &__img2 {
        width: 334rpx;
        height: 228rpx;
        display: block;
        border-radius: 8rpx;
        overflow: hidden;
        margin-top: 32rpx;
      }
    }
    &-list {
      background: #fff;
      &__item {
        padding: 24rpx 32rpx 24rpx 0;
        box-sizing: border-box;
        margin-left: 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item-icon {
          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
          margin-right: 16rpx;
        }
      }
    }
  }
</style>
