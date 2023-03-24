<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="release flex flex-column"
  >
    <VoNav is-fixed is-have-more title="">
      <template #title>
        <view v-if="state === 1">审核未通过</view>
        <view v-else-if="state === 2">审核中</view>
      </template>
    </VoNav>
    <view>
      <!--   审核不通过原因：   -->
      <view v-if="state === 1" class="release-audit flex flex-justify-between">
        <view class="release-audit__left">
          <view class="lh48 fz-b fz-32">审核不通过原因：</view>
          <view class="lh42 fz-28 m-t-24"
            >上传的图片尺寸过小，图片模糊，请按照规定的尺寸重新上传。</view
          >
          <view class="lh42 fz-28 m-t-8 color-block-65">2020-06-18 15:32:56</view>
        </view>
        <image
          class="release-audit__right"
          src="/static/created/personalCenter/not_through.png"
        ></image>
      </view>
      <!--   审核中...   -->
      <view v-else-if="state === 2" class="release-audit flex flex-justify-between">
        <view class="release-audit__left">
          <view class="lh48 fz-b fz-32">审核中...</view>
          <view class="lh42 fz-28 m-t-24 color-block-65">2020-06-18 15:32:56</view>
        </view>
        <image
          class="release-audit__right"
          src="/static/created/personalCenter/under_review.png"
        ></image>
      </view>
      <view class="line-bg h16" />
      <u--form
        ref="form"
        :model="formData"
        :rules="rules"
        class="release-form"
        labelPosition="left"
        labelWidth="163"
      >
        <view class="release-form__title">商品信息</view>
        <u-form-item
          class="release-form__item m-b-16"
          label="发动机型号"
          prop="engineModel"
          required
          @click="toChooseSize"
        >
          <u--input
            v-model="formData.engineModel"
            border="none"
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请选择"
            placeholderClass="release-form__placeholder"
          />
          <VoIcon
            :opacity="0.45"
            :size="20"
            class="m-l-8"
            color="#000000"
            name="right-arrow"
          ></VoIcon>
        </u-form-item>
        <view class="release-form__title">销售信息</view>
        <u-form-item class="release-form__item m-b-16" label="商品名称" prop="goodsName" required>
          <u--input
            v-model.trim="formData.goodsName"
            border="none"
            disabledColor="#ffffff"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="release-form__placeholder"
          />
        </u-form-item>
        <u-form-item
          ref="item1"
          class="release-form__item"
          label="销售价格"
          prop="salesPrice"
          required
        />
        <u-form-item
          class="release-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="A类（成色上等商品）"
          prop="fine"
        >
          <u--input
            v-model="formData.fine"
            border="none"
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="release-form__placeholder"
            @blur="commercialGrade"
          />
        </u-form-item>
        <u-form-item
          class="release-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="B类（成色中等商品）"
          prop="medium"
        >
          <u--input
            v-model="formData.medium"
            :maxlength="6"
            border="none"
            class="item-input m-r-6"
            color="rgba(0, 0, 0, 0.85)"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="placeholder"
            type="number"
            @blur="commercialGrade"
          />
        </u-form-item>

        <view class="m-b-16">
          <u-form-item
            class="release-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="C类（成色下等商品）"
            prop="lower"
          >
            <u--input
              v-model="formData.lower"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="release-form__placeholder"
              @blur="commercialGrade"
            />
          </u-form-item>
          <view v-show="rulesPrice" class="release-form__rules">请至少填写1个成色价格信息</view>
        </view>

        <u-form-item
          class="release-form__item m-b-16"
          color="rgba(0, 0, 0, 0.85)"
          label="运费"
          prop="freight"
          required
        >
          <template #right>
            <u-radio-group v-model="formData.freight" placement="row">
              <u-radio
                v-for="(item, index) in radiolist1"
                :key="index"
                :class="{ 'm-l-60': index == 1 }"
                :label="item.name"
                :name="item.name"
                labelColor="#000"
              />
            </u-radio-group>
          </template>
        </u-form-item>
        <view class="m-b-16 bg-white">
          <u-form-item
            class="release-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="商品主图"
            prop=""
            required
          >
            <view class="fz-28 color-block-25 text-right flex1">{{ fileList.length }}/6</view>
          </u-form-item>
          <view class="release-form__advice">建议800*800px，JPG/JPEG/mp4格式，第1张是首图。</view>
          <VoFormUpload
            :limit="6"
            :source.sync="fileList"
            :video-limit="6"
            btnText="上传图片/视频"
            class="p-l-32 p-r-32 p-b-24"
            @change="uploadSuccess"
          />
          <view v-if="fileList.length < 1" class="release-form__rules">请添加商品主图</view>
        </view>
        <u-form-item class="release-form__item m-b-16" label="审核通过后立即发布" prop="release">
          <template #right>
            <u-switch v-model="formData.release" activeColor="#07C160" />
          </template>
        </u-form-item>
      </u--form>
      <VoAddress />
      <u-picker />
    </view>
    <view v-if="state === 1" class="release-footer flex flex-justify-between p-b-safe-area">
      <view class="flex1 release-footer__left" @click="goPreviewGoods">预览商品</view>
      <view class="flex1 release-footer__right m-l-36">保存</view>
    </view>
    <view v-else-if="state === 2" class="release-footer flex p-b-safe-area">
      <u-button
        class="release-footer__button"
        color="#FF5319"
        shape="circle"
        text="预览商品"
        @click="goPreviewGoods"
      />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AuditPage',
    data() {
      return {
        state: 2, // 1：审核未通过，2：审核中
        radiolist1: [
          {
            name: '到付',
            disabled: false,
          },
          {
            name: '包邮',
            disabled: false,
          },
        ],
        rulesPrice: false, // 成色价格信息校验提醒
        imageSrc: '',
        fileList: [],
        formData: {
          engineModel: '', // 发动机型号
          goodsName: '', // 商品名称
          fine: '', // 销售价格A类
          medium: '', // 销售价格B类
          lower: '', // 销售价格C类
          release: true, // 审核后立即发布
          preSale: false, // 同时创建预售活动
        },
        rules: {
          engineModel: {
            required: true,
            message: '不可为空',
            trigger: ['blur', 'change'],
          },
          goodsName: {
            required: true,
            message: '不可为空',
            trigger: ['blur'],
          },
          fine: [
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                let bool = true
                if (!value || this.$vocenApi.Pattern.isMoney(value)) {
                  bool = true
                } else {
                  bool = false
                }
                return bool
              },
              message: '格式错误',
              trigger: ['change', 'blur'],
            },
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                let bool = value && Number(value) <= 0 ? false : true
                return bool
              },
              message: '回收价格过低',
              trigger: ['change', 'blur'],
            },
          ],
          medium: [
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                let bool = true
                if (!value || this.$vocenApi.Pattern.isMoney(value)) {
                  bool = true
                } else {
                  bool = false
                }
                return bool
              },
              message: '格式错误',
              trigger: ['change', 'blur'],
            },
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                let bool = value && Number(value) <= 0 ? false : true
                return bool
              },
              message: '价格过低',
              trigger: ['change', 'blur'],
            },
          ],
          lower: [
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                let bool = true
                if (!value || this.$vocenApi.Pattern.isMoney(value)) {
                  bool = true
                } else {
                  bool = false
                }
                return bool
              },
              message: '格式错误',
              trigger: ['change', 'blur'],
            },
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                let bool = value && Number(value) <= 0 ? false : true
                return bool
              },
              message: '价格过低',
              trigger: ['change', 'blur'],
            },
          ],
        },
      }
    },
    /**
     * 接收发动机型号
     * @param options
     */
    onLoad(options) {
      if (options.typeName) {
        this.formData.engineModel = options.typeName
      }
      uni.$off('select')
      //筛选品牌
      uni.$on('select', (row) => {
        console.log('select', row)
        this.formData.engineModel = row.name
      })
    },
    methods: {
      /**
       * 成色价格信息校验提示
       */
      commercialGrade() {
        this.rulesPrice = !this.formData.fine && !this.formData.medium && !this.formData.lower
      },
      // 上传主图回调确认
      uploadSuccess(res) {
        this.imageSrc = res
      },
      /**
       * 去选择型号页
       */
      toChooseSize() {
        this.$linkToEasy('/pagesRecovery/GoodsRecycle/DeviceSize')
      },
      /**
       * 去配置预售活动页
       */
      goDeployPreSell() {
        this.$linkToEasy('/pagesRecovery/SellGood/DeployPreSell/DeployPreSell')
      },
      /**
       * 去商品预览页
       */
      goPreviewGoods() {
        this.$linkToEasy('/pagesRecovery/SellGood/PreviewGoods/PreviewGoods')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .release {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    > :nth-child(2) {
      flex-grow: 1;
      overflow: auto;
    }
    &-audit {
      background: #fff;
      padding: 0 32rpx;
      margin-top: 16rpx;
      &__left {
        padding: 40rpx 0;
        width: 478rpx;
      }
      &__right {
        width: 176rpx;
        height: 176rpx;
        display: block;
        padding-top: 8rpx;
      }
    }
    &-form {
      &__title {
        padding: 24rpx 32rpx;
        background: #fff;
        font-weight: bold;
        font-size: 32rpx;
      }
      &__item {
        padding: 0rpx 32rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        background: $v-bg-white;
        .item-deploy {
          color: #ff5319;
        }
      }
      &__advice {
        padding: 12rpx 32rpx 24rpx;
        font-size: 24rpx;
        color: $v-c0-25;
      }
      &__img {
        width: 218rpx;
        height: 218rpx;
        display: block;
        padding-bottom: 24rpx;
      }
      &__rules {
        line-height: 42rpx;
        background: #fff;
        text-align: right;
        font-size: 28rpx;
        color: #ee0a24;
        padding: 2rpx 32rpx 8rpx;
      }

      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
      }
      .text {
        color: rgba(0, 0, 0, 0.45);
      }
    }

    &-footer {
      //   position: fixed;
      //   left: 0;
      //   bottom: 0;
      //   z-index: 3;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      line-height: 132rpx;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      width: 100%;
      background: $v-bg-white;

      &__button {
        width: 656rpx;
        height: 80rpx;
        margin: auto;
      }
      &__disabled {
        width: 656rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        margin: auto;
        color: $v-c0-25;
        background: #f6f7f8;
        border-radius: 48rpx;
        font-size: 32rpx;
      }
      &__left {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border: 2rpx solid #d3d4db;
        border-radius: 48rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__right {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: #ff5319;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: #fff;
      }
    }
  }
</style>
