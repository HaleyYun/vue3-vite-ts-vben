<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="release flex flex-column"
  >
    <VoNav is-fixed is-have-more title="">
      <block slot="title">
        <view>
          <block v-if="type === 1">审核中</block>
          <block v-else-if="type === 2">审核未通过</block>
          <block v-else-if="type === 3 || type === 4">修改商品</block>
          <block v-else>发布销售商品</block>
        </view>
      </block>
    </VoNav>
    <view>
      <view class="line-bg h16" />
      <view v-if="type === 1 || type === 2" class="release-top bg-white m-b-16 flex">
        <view class="flex1">
          <view class="fz-32 font-weight-500 m-b-24">
            <block v-if="type === 1">审核中，请耐心等待...</block>
            <block v-else-if="type === 2">审核不通过原因</block>
          </view>
          <!-- 审核通过 -->
          <view v-if="infos.result && type === 2" class="m-b-10 color-block fz-28">
            {{ infos.result }}
          </view>
          <view v-if="type === 1 || type === 2 || type === 3" class="color-block-65 fz-28">
            {{ infos.updateTime }}
          </view>
        </view>
        <!-- 审核中 -->
        <image v-if="type === 1" class="sys-img" src="/static/icons/sys1.png" />
        <!-- 审核不通过 -->
        <image v-else-if="type === 2" class="sys-img" src="/static/icons/sys3.png" />
      </view>
      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="release-form"
        labelPosition="left"
        labelWidth="163"
      >
        <view class="release-form__title">
          <block v-if="optionsId">回收信息</block>
          <block v-else>商品信息</block>
        </view>
        <!-- 发动机型号 -->
        <!-- ENG-6316调换商品名称与发动机型号位置 -->
        <EraFormItem
          class="release-form__item m-b-16"
          label="发动机型号"
          prop="modelId"
          required
          @click="toChooseSize"
        >
          <u--input
            v-model="typeName"
            border="none"
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请选择"
            placeholderClass="release-form__placeholder"
            readonly
          />
          <VoIcon
            v-if="!optionsId"
            :opacity="0.45"
            :size="20"
            class="m-l-8"
            color="#000000"
            name="right-arrow"
          />
        </EraFormItem>
        <!-- 商品名称 -->
        <EraFormItem class="release-form__item" label="商品名称" prop="name" required>
          <u--input
            v-model.trim="formData.name"
            :readonly="+type === 1"
            border="none"
            disabledColor="#ffffff"
            inputAlign="right"
            maxlength="20"
            placeholder="请输入"
            placeholderClass="release-form__placeholder"
          />
        </EraFormItem>
        <EraFormItem
          ref="item1"
          class="release-form__item"
          label="销售价格"
          prop="salesPrice"
          required
        />
        <!-- 成色价格 -->
        <view class="m-b-16 bg-white">
          <template v-for="(item, index) in formData.resaleLevels">
            <EraFormItem
              :key="index"
              :class="{ 'm-b-16': index === 2 }"
              :label="`${resaleLevelsList[index].level}类（${resaleLevelsList[index].desc}）`"
              class="release-form__item"
              color="rgba(0, 0, 0, 0.85)"
            >
              <u--input
                v-model.number="item.price"
                :readonly="+type === 1"
                border="none"
                disabledColor="#ffffff"
                fontSize="16px"
                inputAlign="right"
                maxlength="6"
                placeholder="请输入"
                placeholderClass="release-form__placeholder"
                @change="validatePrice(index)"
              />
            </EraFormItem>
            <!-- 提示语 -->
            <view
              v-if="resaleLevelsList[index].content"
              :key="'a' + index"
              class="release-form__rules"
            >
              {{ resaleLevelsList[index].content }}
            </view>
          </template>
          <view
            v-if="
              !formData.resaleLevels[0].price &&
              !formData.resaleLevels[1].price &&
              !formData.resaleLevels[2].price
            "
            class="release-form__rules"
          >
            请至少填写1个成色价格信息
          </view>
        </view>
        <!-- 运费 -->
        <EraFormItem
          class="release-form__item m-b-16"
          color="rgba(0, 0, 0, 0.85)"
          label="运费"
          prop="shippingType"
          required
        >
          <view class="flex1 flex flex-vertical-c">
            <EraRadioGroup
              v-model="formData.shippingType"
              :disabled="+type === 1"
              class="flex1 flex-justify-r"
              color="#22284B"
            >
              <EraRadio :name="2" label="到付" />
              <EraRadio :name="1" label="包邮" />
            </EraRadioGroup>
          </view>
        </EraFormItem>
        <!-- 主图 -->
        <view class="m-b-16 bg-white">
          <EraFormItem
            class="release-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="商品主图"
            prop=""
            required
          >
            <view class="fz-28 color-block-25 text-right flex1"
              >{{ formData.picture.length }}/6</view
            >
          </EraFormItem>
          <view class="release-form__advice">建议800*800px，JPG/JPEG/mp4格式，第1张是首图。</view>
          <VoFormUpload
            :limit="6"
            :readonly="+type === 1"
            :source.sync="mainImg"
            :video-limit="6"
            btnText="上传图片/视频"
            class="p-l-32 p-r-32 p-b-24"
          />
          <view v-if="formData.picture.length < 1" class="release-form__rules">请添加商品主图</view>
        </view>
        <!-- 是否立即发布 -->
        <EraFormItem
          class="release-form__item m-b-16"
          label="审核通过后立即发布"
          prop="isAvailable"
        >
          <view class="flex1 flex flex-justify-r">
            <EraSwitch
              v-model="formData.isAvailable"
              :activeValue="true"
              :disabled="+type === 1"
              :inactiveValue="false"
              activeColor="#07C160"
            />
          </view>
        </EraFormItem>
        <!-- 预售活动 -->
        <template v-if="!optionsId">
          <view class="release-form__title">预售活动</view>
          <EraFormItem class="release-form__item" label="同时创建预售活动" prop="isPublishPreSale">
            <view class="flex1 flex flex-justify-r">
              <EraSwitch
                v-model="formData.isPublishPreSale"
                :activeValue="1"
                :inactiveValue="0"
                activeColor="#07C160"
              />
            </view>
          </EraFormItem>
        </template>
        <!-- 预售表单项 -->
        <block v-if="formData.isPublishPreSale">
          <EraFormItem
            class="release-form__item m-b-16"
            color="rgba(0, 0, 0, 0.85)"
            label="配置预售活动"
            @click="goDeployPreSell"
          >
            <view class="item-deploy flex1 text-right">
              <template v-if="formData.preSaleBO.startTime">已配置</template>
              <template v-else>未配置</template>
            </view>
            <VoIcon :opacity="0.45" :size="20" class="m-l-8" color="#000000" name="right-arrow" />
          </EraFormItem>
        </block>
      </EraForm>
    </view>
    <!-- 修改商品按钮 -->
    <!-- type : 1审核中;2未通过;3=4修改; -->
    <view v-if="+type === 1" class="release-footer flex p-b-safe-area">
      <u-button
        class="release-footer__button"
        color="#FF5319"
        shape="circle"
        text="预览商品"
        @click="goPreviewGoods"
      />
    </view>
    <view v-else-if="+type === 2" class="release-footer flex flex-justify-between p-b-safe-area">
      <view class="flex1 release-footer__left" @click="goPreviewGoods">预览商品</view>
      <u-button
        v-if="
          formData.modelId &&
          formData.name &&
          (formData.resaleLevels[0].price ||
            formData.resaleLevels[1].price ||
            formData.resaleLevels[2].price) &&
          formData.picture.length > 0
        "
        class="flex1 release-footer__right m-l-36"
        color="#FF5319"
        shape="circle"
        text="提交审核"
        @click="validateForm"
      />
      <view v-else class="flex1 release-footer__right m-l-36">提交审核</view>
    </view>
    <view
      v-else-if="type === 3 || type === 4"
      class="release-footer flex flex-justify-between p-b-safe-area"
    >
      <view class="flex1 release-footer__left" @click="goPreviewGoods">预览商品</view>
      <u-button
        v-if="
          formData.modelId &&
          formData.name &&
          (formData.resaleLevels[0].price ||
            formData.resaleLevels[1].price ||
            formData.resaleLevels[2].price) &&
          formData.picture.length > 0
        "
        class="flex1 release-footer__right m-l-36"
        color="#FF5319"
        shape="circle"
        text="保存"
        @click="validateForm"
      />
      <view v-else class="flex1 release-footer__right m-l-36">保存</view>
    </view>
    <!-- 发布商品按钮 -->
    <view v-else class="release-footer flex p-b-safe-area">
      <u-button
        v-if="
          formData.modelId &&
          formData.name &&
          (formData.resaleLevels[0].price ||
            formData.resaleLevels[1].price ||
            formData.resaleLevels[2].price) &&
          formData.picture.length > 0
        "
        class="release-footer__button"
        color="#FF5319"
        shape="circle"
        text="提交审核"
        @click="validateForm"
      />
      <view v-else class="release-footer__disabled">提交审核</view>
    </view>
  </view>
</template>

<script>
  import { decimalSubFn, formatterHandle, hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'ReleaseSellGood',
    data() {
      return {
        typeName: '',
        optionsId: null,
        rulesPrice: false, // 成色价格信息校验提醒
        imageSrc: '',
        resaleLevelsList: [
          { level: 'A', price: '', desc: '成色上等商品' },
          { level: 'B', price: '', desc: '成色中等商品' },
          { level: 'C', price: '', desc: '成色下等商品' },
        ],
        mainImg: [],
        formData: {
          // 商品回收预售活动添加传参
          preSaleBO: {
            deliveryTime: '', // 预计发货时间
            endTime: '', // 活动结束时间
            id: '', //编辑用id
            resaleId: '', // 旧机在销售商品id
            isAvailable: 1, // 审核后立即发布
            shippingType: '', // 快递类型 1包邮 2到付
            startTime: '', // 活动开始时间
            // 成色
            levelBOS: [
              {
                level: 'A', // 成色
                price: '', // 价格
                id: '', // 主键,修改必传
                count: 0, // 数量
              },
              {
                level: 'B', // 成色
                price: '', // 价格
                id: '', // 主键,修改必传
                count: 0, // 数量
              },
              {
                level: 'C', // 成色
                price: '', // 价格
                id: '', // 主键,修改必传
                count: 0, // 数量
              },
            ],
          },
          // 销售价格信息
          resaleLevels: [
            { level: 'A', price: '', desc: '成色上等商品' },
            { level: 'B', price: '', desc: '成色中等商品' },
            { level: 'C', price: '', desc: '成色下等商品' },
          ],
          picture: [], // 商品主图
          modelId: '', // 发动机型号 modelId
          shippingType: '', // 快递类型 1包邮 2到付
          name: '', // 商品名称
          isAvailable: true, // 审核后立即发布
          isPublishPreSale: 0, // 同时创建预售活动
        },
        rules: {
          modelId: {
            required: true,
            message: '不可为空',
            trigger: ['blur'],
          },
          name: {
            required: true,
            message: '不可为空',
            trigger: ['blur'],
          },
        },
        // 格式化金额
        formatterMoney: (value) => formatterHandle(value, 'money'),
        // 型号携带参数
        infos: {},
        // 图片类型列表
        typeArr: 'png,jpg,jpeg,gif,webp',
        type: 0, // 0新增；1、审核中；2、审核拒绝；3、审核通过修改商品
        recyclePrice: 0,
      }
    },
    watch: {
      mainImg(newVal) {
        // val:{src:'',type:1,name:'asd'}
        let arr = []
        if (newVal.length) {
          newVal.forEach((item) => {
            arr.push(item.src)
          })
        }
        this.formData.picture = arr
      },
    },
    /**
     * 接收发动机型号
     * @param options
     */
    onLoad(options) {
      this.optionsId = options.id || null
      uni.$off('settingPreSale')
      // 预售信息
      uni.$on('settingPreSale', (data) => {
        this.formData.preSaleBO = data
      })
      uni.$off('select')
      //筛选品牌
      uni.$on('select', async (row) => {
        console.log('select', row)
        this.formData = {
          // 商品回收预售活动添加传参
          preSaleBO: {
            deliveryTime: '', // 预计发货时间
            endTime: '', // 活动结束时间
            id: '', //编辑用id
            resaleId: '', // 旧机在销售商品id
            isAvailable: 1, // 审核后立即发布
            shippingType: '', // 快递类型 1包邮 2到付
            startTime: '', // 活动开始时间
            // 成色
            levelBOS: [
              {
                level: 'A', // 成色
                price: '', // 价格
                id: '', // 主键,修改必传
                count: 0, // 数量
              },
              {
                level: 'B', // 成色
                price: '', // 价格
                id: '', // 主键,修改必传
                count: 0, // 数量
              },
              {
                level: 'C', // 成色
                price: '', // 价格
                id: '', // 主键,修改必传
                count: 0, // 数量
              },
            ],
          },
          // 销售价格信息
          resaleLevels: [
            { level: 'A', price: '', desc: '成色上等商品' },
            { level: 'B', price: '', desc: '成色中等商品' },
            { level: 'C', price: '', desc: '成色下等商品' },
          ],
          picture: [], // 商品主图
          modelId: '', // 发动机型号 modelId
          shippingType: '', // 快递类型 1包邮 2到付
          name: this.formData.name ? this.formData.name : '', // 商品名称
          isAvailable: true, // 审核后立即发布
          isPublishPreSale: 0, // 同时创建预售活动
        }
        this.mainImg = []
        this.typeName = row.model
        this.formData.modelId = row.id
        console.log(this.formData, 'formData...')
        // 是否传递商品信息来
        if (row.isResalePublished) {
          // 旧机再销售id
          await this.getData(row.resaleId)
        }
        this.$forceUpdate()
      })
      if (options.id) {
        // 修改用id
        this.optionsId = options.id
        console.log(this.optionsId, 1111111111)
        this.getData(this.optionsId)
        this.type = options.type * 1
      }
    },
    methods: {
      async getData(id) {
        showLoading()
        try {
          const { data } = await this.$VoHttp.apiGoodsRecycleResaleQueryInfo({ id })
          console.log(data, 'getData')
          this.infos = data
          this.formData = Object.assign(this.formData, data)
          this.formData.resaleLevels = data.levelInfoVOS
          this.typeName = data.model
          this.recyclePrice = data.recyclePrice
          this.fomatterData()
          // #ifdef APP-PLUS
          this.formData.levelInfoVOS.forEach((item, index) => {
            this.validatePrice(index)
          })
          // #endif
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
        hideLoading()
      },
      // 格式化返回的商品数据
      fomatterData() {
        // 格式化商品主图
        this.formData.picture.forEach((item) => {
          let exe = item.split('.').pop()
          let obj = {}
          obj.src = item
          obj.name = item
          if (this.typeArr.indexOf(exe.toLowerCase()) === -1) {
            obj.type = 2
            obj.poster = item + '&type=3'
          } else {
            obj.type = 1
          }
          this.mainImg.push(obj)
        })
        this.$forceUpdate()
      },
      // 商品类型价格判断
      validatePrice(i) {
        console.log(this.infos)
        console.log(this.recyclePrice)
        if (this.infos.platformPrice && this.recyclePrice) {
          const change = this.infos.platformPrice || 0 // 平台服务费
          console.log(this.formData.resaleLevels[i].price)
          console.log(i)
          if (this.formData.resaleLevels[i].price) {
            const curPrice = this.formData.resaleLevels[i].price // 当前输入价格
            let val = curPrice.toString().replace(/[^\d^\.]+/g, '')
            let checked = ''
            if (val.indexOf('.') !== -1) {
              checked = parseInt(val)
            } else {
              checked = val
            }
            console.log(checked)
            console.log(val)
            // 保留两位小数
            if (val.indexOf('.') > -1 && val.split('.')[1].length > 2) {
              val = Number(val).toFixed(2)
            }
            this.formData.resaleLevels[i].price = val
            const income = decimalSubFn(decimalSubFn(curPrice, change), this.recyclePrice)
            this.resaleLevelsList[i].content = `预计收益${income}元`
          }
        }
      },
      // 提交商品信息
      validateForm() {
        if (this.formData.isPublishPreSale && !this.formData.preSaleBO.startTime) {
          uni.$u.toast('您还没有配置预售信息')
          return
        }
        this.$refs.form
          .validate()
          .then((res) => {
            // console.log(res)
            // uni.$u.toast('校验成功')
            if (this.isLoading) return
            this.isLoading = true
            this.submitInfo()
            // showLoading()
          })
          .catch((err) => {
            this.$u.toast(err.message || '校验失败')
          })
      },
      async submitInfo() {
        console.log('2')
        if (this.formData.picture.length === 0) {
          uni.$u.toast(`请上传商品主图`)
          return
        }
        if (!this.formData.shippingType) {
          uni.$u.toast(`请选择运费方式`)
          return
        }
        showLoading()
        console.log(this.formData)
        let data
        if (this.optionsId) {
          // 修改
          const { isAvailable, modelId, name, picture, resaleLevels, shippingType } = this.formData
          this.formData.id = this.optionsId
          await this.$VoHttp
            .apiGoodsRecycleResaleUpdate({
              status: 1,
              id: this.optionsId,
              isAvailable,
              modelId,
              name,
              picture,
              resaleLevels,
              shippingType,
            })
            .then((res) => {
              this.$toast('商品提交成功', 'success', '/static/icons/success_icon.png')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
            })
            .catch((err) => {
              this.$u.toast(err.message || '商品提交失败')
            })
            .finally(() => {
              hideLoading()
              this.isLoading = false
            })
        } else {
          let param = {}
          param = this.formData
          if (!this.isPublishPreSale) {
            param.preSaleBO = ''
          }
          await this.$VoHttp
            .apiGoodsRecycleResalePublish(param)
            .then((res) => {
              this.$toast('商品提交成功', 'success', '/static/icons/success_icon.png')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
            })
            .catch((err) => {
              this.$u.toast(err.message || '商品提交失败')
            })
            .finally(() => {
              hideLoading()
              this.isLoading = false
            })
        }
      },
      /**
       * 去选择型号页
       */
      toChooseSize() {
        if (this.optionsId) {
          return
        }
        this.$linkToEasy('/pagesRecovery/GoodsRecycle/DeviceSize?origin=2')
      },
      /**
       * 去配置预售活动页
       */
      goDeployPreSell() {
        if (+this.type === 1) return
        let url = `../DeployPreSell/DeployPreSell?data=${JSON.stringify(
          this.formData.resaleLevels,
        )}`
        if (this.formData.preSaleBO.startTime) {
          url += `&preSaleBO=${JSON.stringify(this.formData.preSaleBO)}`
        }
        this.$linkToEasy(url)
      },
      /**
       * 去商品预览页
       */
      goPreviewGoods() {
        this.$linkToEasy(`/pagesRecovery/SellGood/PreviewGoods/PreviewGoods?id=${this.optionsId}`)
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
    &-top {
      padding: 40rpx 32rpx;
      box-sizing: border-box;
      position: relative;
      .sys-img {
        width: 176rpx;
        height: 176rpx;
        position: absolute;
        right: 32rpx;
        top: 0;
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
