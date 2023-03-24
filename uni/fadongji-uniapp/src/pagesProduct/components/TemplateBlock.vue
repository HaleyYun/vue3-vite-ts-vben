<template>
  <view class="mould" v-bind="$attrs" v-on="$listeners">
    <view class="mould-top flex" @click="$emit('click')">
      <image class="mould-top__img" :src="templateBlock.imageTop" />
      <view class="flex1">
        <view class="mould-top__name">{{ templateBlock.name }}</view>
        <view class="mould-top__item">
          <text v-for="(item, index) in templateBlock.skuPropertys" :key="index" class="m-r-10">
            {{ item.value }}
          </text>
        </view>
      </view>
    </view>
    <view class="mould-bottom flex">
      <view class="mould-bottom__choose flex1" @click.stop="previewTemplate(templateBlock.id)">
        预览模板
      </view>
      <view class="mould-bottom__choose flex1" @click.stop="priceTemplate()"> 价格指导</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'TemplateBlock',
    props: {
      /**
       * templateName 商品类型
       * templateItem 商品规格
       */
      templateBlock: {
        type: Object,
        default: {},
      },
    },
    methods: {
      previewTemplate(id) {
        console.log(id)
        this.$linkToEasy('/pagesProduct/ChooseTemplate/TemplateDetail?templateId=' + id)
      },
      priceTemplate() {
        this.$linkToEasy('/pagesProduct/PriceGuide/PriceGuide?name=' + this.templateBlock.name)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .mould {
    background: #ffffff;

    &-top {
      margin: 0 32rpx;
      padding: 24rpx 0;
      border-bottom: 2rpx solid $v-bg-light;

      &__img {
        width: 128rpx;
        height: 128rpx;
        margin-right: 16rpx;
      }

      &__name {
        font-weight: bold;
        font-size: 32rpx;
        color: $v-c0-85;
        line-height: 150%;
        margin-bottom: 8rpx;
      }

      &__item {
        font-size: 28rpx;
        line-height: 150%;
        color: $v-c0-45;
      }
    }

    &-bottom {
      &__choose {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 26rpx;
        color: #22284b;

        &:first-child {
          border-right: 2rpx solid $v-bg-light;
        }
      }
    }
  }
</style>
