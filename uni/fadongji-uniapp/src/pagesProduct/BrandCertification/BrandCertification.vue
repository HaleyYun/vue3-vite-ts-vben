<template>
  <view class="vh-full bg-white">
    <VoNav :left-width="240" :right-width="240" is-fixed is-have-more>
      <template #title>认证品牌</template>
    </VoNav>
    <view class="p-t-10">
      <view class="bg-white cell-list">
        <u-cell-group :border="false">
          <u-cell>
            <view slot="title" class="u-slot-title">
              <text class="c-required">*</text>
              <text class="u-cell-text">品牌名称</text>
            </view>
            <view slot="value" class="p-r-20">
              <view class="cell-placeholder flex flex-vertical-c">
                <u-input
                  v-model="brandForm.name"
                  :maxlength="50"
                  :readonly="disabled"
                  border="none"
                  class="cell-input-value"
                  input-align="right"
                  placeholder="请输入品牌名称"
                  placeholder-class="cell-placeholder"
                  @blur="checkBrand"
                  @focus="subFlag = true"
                />
              </view>
            </view>
          </u-cell>
          <u-cell>
            <view slot="title" class="u-slot-title">
              <text class="u-cell-text">品牌LOGO</text>
            </view>
            <view slot="label">
              <view class="label-text">支持png、jpg、jpeg格式</view>
              <view class="cell-upload">
                <VoFormUpload
                  :limit="1"
                  :preview="disabled"
                  :readonly="disabled"
                  :source.sync="uploadImg"
                  btn-text="上传图片"
                />
              </view>
            </view>
          </u-cell>
          <u-cell>
            <view slot="label" class="p-t-20">
              <view class="cell-placeholder flex flex-vertical-c">
                <u--textarea
                  v-model="brandForm.applyReason"
                  :maxlength="200"
                  border="none"
                  confirmType="确定"
                  count
                  placeholder="请输入申请理由"
                />
              </view>
            </view>
          </u-cell>
        </u-cell-group>
      </view>
      <view class="bg-white operate px-32">
        <u-button
          :disabled="subFlag"
          :loading="loading"
          color="#FF5319"
          shape="circle"
          size="large"
          text="提交"
          type="primary"
          @click="submitHandler"
        />
      </view>
    </view>
  </view>
</template>

<script>
  import VoFormUpload from '@/components/VoFormUpload/VoFormUpload'

  export default {
    name: 'BranchCertification',
    components: { VoFormUpload },
    data() {
      return {
        subFlag: false,
        uploadImg: [],
        disabled: false,
        brandForm: {
          logoUrl: '',
          name: '',
          applyReason: '',
          brandId: '',
          source: '',
        },
        loading: false,
      }
    },
    watch: {
      uploadImg: {
        deep: true,
        handler(newVal) {
          if (newVal.length) {
            this.brandForm.logoUrl = newVal[0].src
          }
        },
      },
    },
    created() {},
    methods: {
      async checkBrand(e) {
        if (!e) return
        const { code, data } = await this.$VoHttp.GOODS.apiGoodsBrandQueryApplyCheck({ name: e })
        if (+code === 20001) {
          const flag = data.flag
          // flag:
          // 0/null 不存在可以提交认证使用
          // 1 已申请可以直接使用
          // 2 未申请可以提交认证使用
          if (!flag) {
            this.subFlag = false
          }
          if (flag === 1) {
            this.subFlag = true
            this.$u.toast('该品牌已在认证中')
            if (this.brandForm.source === 1) {
              setTimeout(() => {
                uni.$VoPutProductForm.brandId = data.brandId
                uni.$VoPutProductForm.brandName = data.name
                this.loading = false
                uni.$u.route('/pagesProduct/PutProduct/PutProduct')
              }, 1000)
            }

            // 跳转逻辑待约人
          }
          if (flag === 2) {
            // 品牌库有 可以直接复写品牌库的信息
            console.log(data, 'xx')
            this.brandForm.brandId = data.brandId
            this.brandForm.logoUrl = data.logoUrl
            this.brandForm.name = data.name
            this.uploadImg = [
              {
                type: 1,
                name: data.name,
                src: data.logoUrl,
              },
            ]
            this.disabled = true
            this.subFlag = false
          }
        }
      },
      // 提交认证
      async submitHandler() {
        if (!this.brandForm.name) {
          return this.$u.toast('品牌名称不能为空')
        }
        try {
          this.loading = true
          const { code, data } = await this.$VoHttp.GOODS.apiGoodsBrandQueryApplySave(
            this.brandForm,
          )
          if (+code === 20001) {
            this.$u.toast('提交成功')
            if (this.brandForm.source === 1) {
              // 返回上货页面并带回品牌信息
              uni.$VoPutProductForm.brandId = data
              uni.$VoPutProductForm.brandName = this.brandForm.name
              setTimeout(() => {
                this.loading = false
                uni.navigateBack({
                  delta: 2,
                })
                // uni.$u.route('/pagesProduct/PutProduct/PutProduct')
              }, 1000)
            } else if (this.brandForm.source === 2) {
              setTimeout(() => {
                this.loading = false
                uni.$u.route('/pagesCommon/StoreInfo/OperateBrand')
              }, 1000)
            } else {
              setTimeout(() => {
                this.loading = false
                uni.$u.route('/pagesLeaseManager/WorkingTable/OperateBrand')
              }, 1000)
            }
          }
        } catch (e) {
          console.log(e.message)
          this.loading = false
          this.$u.toast(e.message)
        }
      },
    },
    onLoad(options) {
      // 从上货进来的 source 是 1  从个人中心进来的 是 2 必填 从招商经理进来的是3
      if (options.hasOwnProperty('source')) {
        this.brandForm.source = +options.source
      } else {
        this.$u.toast('缺少认证类型')
      }
      if (options.hasOwnProperty('name') && options.name) {
        this.disabled = true
        this.brandForm.name = options.name
        this.brandForm.logoUrl = options.logo
        this.brandForm.brandId = options.id
        this.uploadImg = this.brandForm.logoUrl
          ? [
              {
                type: 1,
                name: 'logo',
                src: this.brandForm.logoUrl,
              },
            ]
          : []
        this.disabled = !!this.brandForm.logoUrl
      }
    },
  }
</script>

<style lang="scss" scoped>
  .operate {
    margin-top: 150rpx;
  }

  .cell-list {
    padding-left: 32rpx;

    ::v-deep .u-cell__body {
      padding-left: 0 !important;
      padding-right: 16rpx;
    }

    ::v-deep .u-input__content__subfix-icon {
      line-height: 1;
    }

    ::v-deep .u-line {
      border-color: #f7f7f8 !important;
      background-color: #fff;
    }

    .cell-upload {
      margin-top: 20rpx;
    }

    .label-text {
      padding-top: 12rpx;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.25);
    }
  }

  .brand-color {
    background: #f6f7f8 !important;
    border: transparent;
    color: rgba(0, 0, 0, 0.25) !important;
  }
</style>
