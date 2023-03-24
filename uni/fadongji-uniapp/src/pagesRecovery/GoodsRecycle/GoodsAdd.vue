<template>
  <view class="new color-block fz-28 flex flex-column">
    <VoNav :title="id ? '修改商品' : '发布回收商品'" is-fixed is-have-more />
    <view class="flex1 overflow-y">
      <view class="padding-box fz-32 font-weight-500 m-t-16 bg-white">回收信息</view>
      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="new-form"
        labelPosition="left"
        labelWidth="180"
      >
        <EraFormItem
          class="new-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="发动机型号"
          prop="typeName"
          required
          @click="toChooseSize"
        >
          <block slot="label">
            <view class="flex fz-32 bg-white">
              <text class="color-red">*</text>
              <text class="clock-block">发动机型号</text>
            </view>
          </block>
          <u-input
            v-model.trim="formData.typeName"
            border="none"
            class="item-input"
            color="rgba(0, 0, 0, 0.85)"
            fontSize="16px"
            inputAlign="right"
            placeholder="请选择"
            placeholderClass="apply-form__placeholder color-block-25"
            readonly
            type="text"
          />
          <VoIcon v-if="!id" :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
        </EraFormItem>
        <EraFormItem
          class="new-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="回收价格"
          prop="price"
          required
        >
          <block slot="label">
            <view class="flex fz-32 bg-white">
              <text class="color-red">*</text>
              <text class="clock-block">回收价格</text>
              <VoTooltip
                class="fz-0"
                color="rgba(17, 17, 17)"
                :arrowStyleSelf="{ left: 0 }"
                placement="right"
              >
                <view slot="content" class="fz-24">
                  <view>回收价格=商品回收价格+平台</view>
                  <view>服务费+技术工服务费</view>
                </view>
                <view>
                  <VoIcon
                    :opacity="0.45"
                    :size="16"
                    class="m-l-8"
                    color="#000000"
                    name="question-line"
                  />
                </view>
              </VoTooltip>
            </view>
          </block>
          <u-input
            maxlength="6"
            v-model.number="formData.price"
            border="none"
            class="item-input"
            color="rgba(0, 0, 0, 0.85)"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="apply-form__placeholder color-block-25"
            type="text"
            @blur="validatePrice"
          />
        </EraFormItem>
        <view v-if="showPrice" class="text-right fz-28 bg-white p-r-32 msg">回收价格过低</view>
        <EraFormItem
          v-if="!id"
          class="new-form__item m-t-16 m-b-16"
          color="rgba(0, 0, 0, 0.85)"
          label="配置同型号商品销售信息"
          labelWidth="200"
          prop="isPublishResale"
          required
        >
          <block slot="label">
            <view class="flex fz-32 bg-white">
              <text class="color-red">*</text>
              <text class="clock-block">配置同型号商品销售信息</text>
            </view>
          </block>
          <view class="flex1 flex flex-justify-r">
            <EraSwitch
              v-model="formData.isPublishResale"
              :activeValue="1"
              :inactiveValue="0"
              activeColor="#07C160"
              inactiveColor="rgba(0, 0, 0, 0.15)"
              size="26"
              @change="changeIsResale"
            />
          </view>
        </EraFormItem>
        <block v-if="formData.isPublishResale && !id">
          <view class="padding-box fz-32 font-weight-500 bg-white">销售信息</view>
          <EraFormItem
            class="new-form__item m-b-16"
            color="rgba(0, 0, 0, 0.85)"
            label="商品名称"
            prop="name"
            required
          >
            <block slot="label">
              <view class="flex fz-32 bg-white">
                <text class="color-red">*</text>
                <text class="clock-block">商品名称</text>
              </view>
            </block>
            <u-input
              v-model.trim="formData.name"
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              maxlength="20"
              placeholder="请输入"
              placeholderClass="apply-form__placeholder color-block-25"
              type="text"
            />
          </EraFormItem>
          <view class="padding-box fz-32 font-weight-500 bg-white border-bottom p-b-24">
            <text class="color-red">*</text>
            销售价格
          </view>
          <template v-for="(item, index) in priceTips">
            <EraFormItem
              :key="index"
              :prop="item.props"
              class="new-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label=""
            >
              <text class="fz-32 color-block"> {{ item.name }}</text>
              <text class="fz-24 color-block-45">（{{ item.desc }}）</text>
              <u-input
                v-if="index === 0"
                v-model.number="formData.priceA"
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                maxlength="6"
                inputAlign="right"
                placeholder="请输入"
                placeholderClass="apply-form__placeholder color-block-25"
                type="text"
                @blur="validatePrice(index)"
              />
              <u-input
                v-else-if="index === 1"
                v-model.number="formData.priceB"
                border="none"
                maxlength="6"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入"
                placeholderClass="apply-form__placeholder color-block-25"
                type="text"
                @blur="validatePrice(index)"
              />
              <u-input
                v-else-if="index === 2"
                v-model.number="formData.priceC"
                border="none"
                maxlength="6"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入"
                placeholderClass="apply-form__placeholder color-block-25"
                type="text"
                @blur="validatePrice(index)"
              />
            </EraFormItem>
            <view
              v-if="priceTips[index].content"
              :key="'a' + index"
              class="text-right fz-28 bg-white p-r-32 msg"
            >
              {{ priceTips[index].content }}
            </view>
          </template>

          <view
            v-if="!formData.priceA && !formData.priceB && !formData.priceC"
            class="text-right fz-28 bg-white p-r-32 msg"
          >
            请至少填写1个成色价格信息
          </view>
          <EraFormItem
            class="new-form__item m-b-16 m-t-16"
            color="rgba(0, 0, 0, 0.85)"
            label="运费"
            prop="shippingType"
            required
          >
            <block slot="label">
              <view class="flex fz-32 bg-white">
                <text class="color-red">*</text>
                <text class="clock-block">运费</text>
              </view>
            </block>
            <view class="flex1 flex flex-vertical-c">
              <EraRadioGroup
                v-model="formData.shippingType"
                class="flex1 flex-justify-r"
                color="#22284B"
                @change="changeShippingType"
              >
                <EraRadio :name="2" label="到付" />
                <EraRadio :name="1" label="包邮" />
              </EraRadioGroup>
            </view>
          </EraFormItem>
          <view class="padding-box bg-white">
            <view class="flex flex-justify-between">
              <view>
                <text class="color-red">*</text>
                <text class="fz-32 color-block"> 商品主图</text>
              </view>
              <view class="color-block-25 p-r-20 flex flex-vertical-c">
                {{ mainImg.length }}/6
              </view>
            </view>
            <view class="fz-24 color-block-25 m-r-12">
              建议800*800px，JPG/JPEG/mp4格式，第1张是首图。
            </view>
          </view>
          <EraFormItem
            class="new-form__item m-b-16"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            prop="set"
          >
            <view class="flex1">
              <VoFormUpload
                :limit="6"
                :source.sync="mainImg"
                :video-limit="6"
                btnText="上传图片/视频"
              />
            </view>
          </EraFormItem>
          <EraFormItem
            class="new-form__item m-b-16"
            color="rgba(0, 0, 0, 0.85)"
            label="审核通过后立即发布"
            labelWidth="200"
            prop="isAvailable"
            required
          >
            <block slot="label">
              <view class="flex fz-32 bg-white">
                <text class="color-red">*</text>
                <text class="clock-block">审核后立即发布</text>
              </view>
            </block>
            <view class="flex1 flex flex-justify-r">
              <EraSwitch
                v-model="formData.isAvailable"
                :activeValue="1"
                :inactiveValue="0"
                activeColor="#07C160"
                inactiveColor="rgba(0, 0, 0, 0.15)"
                size="26"
              />
            </view>
          </EraFormItem>
        </block>
      </EraForm>
    </view>

    <view class="new-bottom p-b-safe-area">
      <EraButton :disabled="showPrice" circle text="提交" @click="complete" />
      <!-- <EraButton circle text="提交" disabled fontColor="rgba(255, 255, 255, 0.85)" v-else /> -->
      <view class="p-b-safe-area" />
    </view>
  </view>
</template>

<script>
  import { decimalSubFn, formatterHandle, hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'GoodsAdd',
    data() {
      return {
        id: null,
        price: '',
        // 验证提示
        priceTips: [
          {
            content: '',
            name: 'A类',
            props: 'priceA',
            desc: '成色上等商品',
          },
          {
            content: '',
            name: 'B类',
            props: 'priceB',
            desc: '成色中等商品',
          },
          {
            content: '',
            name: 'C类',
            props: 'priceC',
            desc: '成色下等商品',
          },
        ],
        showPrice: false, // 回收价格验证提示
        optionsId: '',
        isLoading: false,
        mainImg: [],
        formData: {
          typeName: '',

          modelId: '', // *发动机型号ID
          price: '', // *回收价格
          isPublishResale: 0,
          name: '', //*商品名称
          priceA: '',
          priceB: '',
          priceC: '',
          shippingType: 1, //运费
          isAvailable: 1, //审核通过后立即发布
          resaleLevels: [],
          picture: [], // 图片列表
        },
        rules: {
          typeName: {
            type: 'string',
            required: true,
            message: '发动机型号不可为空',
            trigger: ['blur'],
          },
          name: {
            type: 'string',
            required: true,
            message: '商品名称不可为空',
            trigger: ['blur'],
          },
          price: [
            {
              type: 'number',
              required: true,
              message: '回收价格不可为空',
              trigger: ['blur'],
            },
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                return this.$vocenApi.Pattern.isMoney(value)
              },
              message: '格式错误',
              trigger: ['blur'],
            },
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                let bool = Number(value) <= 0 ? false : true
                return bool
              },
              message: '回收价格过低',
              trigger: ['blur'],
            },
          ],
          priceA: [
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
              trigger: ['blur'],
            },
            {
              // 自定义验证函数 价格过低校验
              validator: (rule, value, callback) => {
                let bool = value && Number(value) <= 0 ? false : true
                return bool
              },
              message: '回收价格过低',
              trigger: ['blur'],
            },
          ],
          priceB: [
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
              trigger: ['blur'],
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
          priceC: [
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
              trigger: ['blur'],
            },
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                let bool = value && Number(value) <= 0 ? false : true
                return bool
              },
              message: '回收价格过低',
              trigger: ['blur'],
            },
          ],
          shippingType: {
            type: 'number',
            required: true,
            message: '运费必选',
            trigger: ['change'],
          },
        },
        formatterMoney: (value) => formatterHandle(value, 'money'),

        model: {},
        // 图片类型列表
        typeArr: 'png,jpg,jpeg,gif,webp',
        platformPrice: 0,
      }
    },
    watch: {
      mainImg: {
        deep: true,
        handler() {
          // val:{src:'',type:1,name:'asd'}
          this.formData.picture = []
          this.mainImg.forEach((item) => {
            this.formData.picture.push(item.src)
          })
        },
      },
    },
    onLoad(options) {
      const t = this.$storage.get('goodsAddInfo')
      console.log(t)
      if (t) {
        const { id, model, price, modelId } = t
        this.id = id
        this.formData.typeName = model
        this.formData.price = price
        this.price = price
        this.formData.modelId = modelId
      }
      uni.$off('select')
      //筛选品牌
      uni.$on('select', async (row) => {
        console.log(row)
        this.formData.typeName = row.model
        this.formData.modelId = row.id
        this.model = row
        if (row.recyclePrice) {
          this.formData.price = row.recyclePrice
        } else {
          await this.getModelInfo(this.model.id)
        }
        if (this.formData.isPublishResale) {
          await this.changeIsResale(1)
        }
      })
    },
    onShow() {},
    methods: {
      changeShippingType(e) {
        this.formData.shippingType = +e
      },
      getModelInfo(modelId) {
        this.$VoHttp
          .apiGoodsRecycleModelQueryByModelId({ modelId })
          .then((res) => {
            console.log(res)
            if (res.data) {
              this.model = res.data
              this.formData.price = res.data.price
            }
          })
          .catch((err) => {
            console.log(err)
            this.$u.toast(err.message || '网络错误')
          })
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
      /**
       * 配置同型号商品销售信息
       */
      async changeIsResale(e) {
        // apiGoodsRecycleModelView // 回收商品详情
        // const { modelId, price, isPublishResale } = this.formData
        // if (isPublishResale) {
        //   let resaleLevels = [
        //     { level: 'A', price: this.formData.priceA || '' },
        //     { level: 'B', price: this.formData.priceB || '' },
        //     { level: 'C', price: this.formData.priceC || '' },
        //   ]
        //   const { isAvailable, name, picture, shippingType } = this.formData
        //   param = {
        //     modelId,
        //     price,
        //     isPublishResale,
        //     recycleModelResaleBO: {
        //       isAvailable,
        //       name,
        //       picture,
        //       shippingType,
        //       resaleLevels,
        //     },
        //   }
        if (e === 1) {
          console.log(this.model)
          // 旧机再回收商品详情
          if (this.model && +this.model.isResalePublished === 1) {
            if (!this.formData.name) {
              showLoading()
              try {
                const { data } = await this.$VoHttp.apiGoodsRecycleResaleQueryInfo({
                  id: this.model.resaleId,
                })
                console.log(data)
                this.infos = data
                this.formData.name = data.name
                this.formData.picture = data.picture
                this.formData.shippingType = data.shippingType
                this.platformPrice = data.platformPrice
                this.formData.priceA = data.levelInfoVOS[0].price || 0
                this.formData.priceB = data.levelInfoVOS[1].price || 0
                this.formData.priceC = data.levelInfoVOS[2].price || 0
                this.priceTips.forEach((item, index) => {
                  this.validatePrice(index)
                })
                console.log(this.priceTips)
                this.fomatterData()
              } catch (e) {
                console.log(e)
                uni.$u.toast(e.message || '请求失败')
              }
              hideLoading()
            }
            console.log(e)
          }
        }
      },
      // 商品类型价格判断
      validatePrice(i) {
        if (this.formData.price && this.platformPrice > 0) {
          switch (i) {
            case 0:
              if (this.formData.priceA) {
                const curPrice = this.formData.priceA // 当前输入价格
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
                this.formData.priceA = val
                this.priceTips[i].content = `预计收益${decimalSubFn(
                  decimalSubFn(this.formData.priceA, this.formData.price),
                  this.platformPrice,
                )}元`
                // if (this.formData.priceA <= this.formData.price) {
                //   this.priceTips[i].content = '价格过低'
                // } else {
                //   this.priceTips[i].content = `预计收益${decimalSubFn(
                //     decimalSubFn(this.formData.priceA, this.formData.price),
                //     this.platformPrice,
                //   )}元`
                // }
              }
              break
            case 1:
              if (this.formData.priceB) {
                const curPrice = this.formData.priceB // 当前输入价格
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
                this.formData.priceB = val
                this.priceTips[i].content = `预计收益${decimalSubFn(
                  decimalSubFn(this.formData.priceB, this.formData.price),
                  this.platformPrice,
                )}元`
                // if (this.formData.priceB <= this.formData.price) {
                //   this.priceTips[i].content = '价格过低'
                // } else {
                //   this.priceTips[i].content = `预计收益${decimalSubFn(
                //     decimalSubFn(this.formData.priceB, this.formData.price),
                //     this.platformPrice,
                //   )}元`
                // }
              }
              break
            case 2:
              if (this.formData.priceC) {
                const curPrice = this.formData.priceC // 当前输入价格
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
                this.formData.priceC = val
                this.priceTips[i].content = `预计收益${decimalSubFn(
                  decimalSubFn(this.formData.priceC, this.formData.price),
                  this.platformPrice,
                )}元`
                // if (this.formData.priceC <= this.formData.price) {
                //   this.priceTips[i].content = '价格过低'
                // } else {
                //   this.priceTips[i].content = `预计收益${decimalSubFn(
                //     decimalSubFn(this.formData.priceC, this.formData.price),
                //     this.platformPrice,
                //   )}元`
                // }
              }
              break
            default: // 当前输入价格
              const curPrice = this.formData.price
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
              this.formData.price = val
              if (this.formData.isPublishResale) {
                this.priceTips.forEach((item, index) => {
                  this.validatePrice(index)
                })
              }
              if (this.formData.modelId) {
                this.checkPrice()
              }
              break
          }
        }
      },
      // 回收价格校验
      async checkPrice() {
        const { modelId, price } = this.formData
        if (!price) {
          return
        }
        try {
          const { data } = await this.$VoHttp.apiGoodsRecycleModelCheckPrice({ modelId, price })
          this.showPrice = !data
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      //选择型号
      toChooseSize() {
        if (this.id) {
          return
        }
        this.$linkToEasy('/pagesRecovery/GoodsRecycle/DeviceSize?origin=1')
      },
      // 验证
      complete() {
        if (this.showPrice) {
          return
        }
        if (this.formData.isPublishResale) {
          // let item = this.priceTips.find((it) => it.content === '价格过低')
          // if (item) {
          //   uni.$u.toast(`${item.props}价格设置不合法，请重新设置`)
          //   return
          // }
          if (this.formData.picture.length === 0) {
            uni.$u.toast(`请上传商品主图`)
            return
          }
        }
        console.log(this.formData)
        this.$refs.form.validate().then((res) => {
          console.log(res)
          // uni.$u.toast('校验成功')
          if (this.isLoading) return
          this.isLoading = true
          if (this.id) {
            this.update()
          } else {
            this.submitInfo()
          }
          // showLoading()
        })
      },
      async update() {
        if (this.price === this.formData.price) {
          uni.$u.toast(`请先修改价格`)
          return
        }
        showLoading()
        const { modelId, price } = this.formData
        try {
          const data = await this.$VoHttp.apiGoodsRecycleModelUpdatePrice({
            modelId: modelId,
            price: price,
            id: this.id,
          })
          if (+data.data === 1) {
            this.$toast('商品修改成功', 'success', '/static/icons/success_icon.png')
            setTimeout(() => {
              this.$backFn()
            }, 1500)
          } else {
            this.$u.toast(data.message || '网络错误')
          }
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
        hideLoading()
        this.isLoading = false
        console.log(data)
      },
      // 提交
      submitInfo() {
        let param = {}
        const { modelId, price, isPublishResale } = this.formData
        if (isPublishResale) {
          let resaleLevels = [
            {
              level: 'A',
              price: this.formData.priceA || 0,
              id: this.priceTips[0].id ? this.priceTips[0].id : null,
            },
            {
              level: 'B',
              price: this.formData.priceB || 0,
              id: this.priceTips[1].id ? this.priceTips[1].id : null,
            },
            {
              level: 'C',
              price: this.formData.priceC || 0,
              id: this.priceTips[2].id ? this.priceTips[2].id : null,
            },
          ]
          const { isAvailable, name, picture, shippingType } = this.formData
          param = {
            modelId,
            price,
            isPublishResale,
            recycleModelResaleBO: {
              isAvailable,
              name,
              picture,
              shippingType,
              resaleLevels,
            },
          }
        } else {
          param = {
            modelId,
            price,
            isPublishResale,
          }
        }
        console.log(param)
        this.$VoHttp
          .apiGoodsRecycleModelSave(param)
          .then((res) => {
            console.log(res)
            this.$toast('商品提交成功', 'success', '/static/icons/success_icon.png')
            setTimeout(() => {
              this.$backFn()
            }, 1500)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
          .finally(() => {
            this.isLoading = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .new {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;

    .padding-box {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }

    .msg {
      color: #f56c6c;
    }

    &-form {
      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        padding: 0 32rpx 10rpx 32rpx;
        box-sizing: border-box;
        background: #ffffff;

        .item-code {
          margin-left: 24rpx;
        }

        .item-textarea {
          padding: 4rpx;
        }
      }

      &__time {
        width: 168rpx;
        height: 64rpx;
        background: $v-bg-light;
        border-radius: 8rpx;
        font-size: 26rpx;
        line-height: 64rpx;
        text-align: center;
        color: $v-c0-65;
      }

      &__to {
        width: 24rpx;
        height: 2rpx;
        background: $v-text-disabled;
        margin: 0 12rpx;
      }

      &__box {
        font-size: 32rpx;
        color: $v-c0-65;
        line-height: 150%;
      }

      &__word {
        font-size: 32rpx;
        color: $v-c0-85;
      }

      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
      }

      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
        font-size: 32rpx !important;
      }
    }

    &-delete {
      width: 750rpx;
      height: 96rpx;
      line-height: 96rpx;
      background: #ffffff;
      margin-top: 24rpx;
      text-align: center;
      font-size: 32rpx;
      color: $v-c0-45;
    }

    &-bottom {
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }

  .color-gray {
    color: rgba(0, 0, 0, 0.25) !important;
  }

  .flex-end {
    justify-content: flex-end;
  }
</style>
