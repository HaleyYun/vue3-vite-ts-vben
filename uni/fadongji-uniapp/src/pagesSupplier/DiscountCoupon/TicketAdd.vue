<template>
  <view>
    <view class="form flex flex-column bg-white">
      <VoNav :is-fixed="false" :title="navTitle" is-have-more />
      <scroll-view class="flex1 overflow-y" scroll-y="true">
        <EraForm ref="form" :model="formData" :rules="rules" class="form-main" labelWidth="128">
          <view class="form-main__title">基础信息</view>
          <EraFormItem
            class="form-main__item bottom-line"
            :label-style="labelStyle"
            label="优惠券名称"
            prop="name"
            required
          >
            <u--input
              v-model="formData.name"
              border="none"
              class="form-main__input"
              inputAlign="right"
              maxlength="15"
              placeholder="最多输入15个字"
              placeholderStyle="color: rgba(0, 0, 0, 0.25);"
            />
          </EraFormItem>
          <view class="input-title fz-28 color-block-45">优惠类型</view>
          <EraFormItem class="form-main__item" label="" label-width="0">
            <EraCheckboxGroup v-model="formData.ticketA" placement="column">
              <view>
                <EraCheckbox name="A" shape="circle">
                  <view slot="label" class="flex flex-vertical-c">
                    <view class="lh44">
                      <text class="c-required fz-20">*</text>
                      <text>品类券（适用于指定品类）</text>
                    </view>
                  </view>
                </EraCheckbox>
              </view>
            </EraCheckboxGroup>
            <view class="flex flex-vertical-c w260" @click.stop="chooseCategory()">
              <u--input
                v-model="formData.typeNum"
                border="none"
                class="form-main__input"
                inputAlign="right"
                placeholder="请选择"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);"
                type="number"
                readonly
              />
              <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
            </view>
          </EraFormItem>
          <view class="title-box fz-24 color-block-45">
            该优惠券可针对您代理的某个品类下的所有商品进行优惠
          </view>
          <EraFormItem class="form-main__item" label="" label-width="0">
            <EraCheckboxGroup v-model="formData.ticketC" placement="column">
              <view>
                <EraCheckbox name="B" shape="circle">
                  <view slot="label" class="flex flex-vertical-c">
                    <view class="lh44">
                      <text class="c-required">*</text>
                      <text>单品券（适用于单个商品）</text>
                    </view>
                  </view>
                </EraCheckbox>
              </view>
            </EraCheckboxGroup>

            <view class="flex flex-vertical-c w260" @click.stop="toShopList()">
              <u--input
                v-model="formData.GoodsNum"
                border="none"
                class="form-main__input"
                inputAlign="right"
                placeholder="请选择"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);"
                type="number"
                readonly
              />
              <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
            </view>
          </EraFormItem>
          <view class="title-box fz-24 color-block-45"> 该优惠券进针对某个商品进行优惠 </view>
          <EraFormItem class="form-main__item" label="" label-width="0">
            <EraCheckboxGroup v-model="formData.ticketC" placement="column">
              <view>
                <EraCheckbox name="C" shape="circle">
                  <view slot="label" class="flex flex-vertical-c">
                    <view class="lh44">
                      <text class="c-required">*</text>
                      <text>品牌券（适用于单个品牌）</text>
                    </view>
                  </view>
                </EraCheckbox>
              </view>
            </EraCheckboxGroup>
            <view
              class="flex flex-vertical-c w260"
              @click.stop="$linkToEasy('/pagesSupplier/DiscountCoupon/BrandList?origin=ticket')"
            >
              <u--input
                v-model="formData.brandNum"
                border="none"
                class="form-main__input flex1"
                inputAlign="right"
                placeholder="请选择"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);"
                readonly
              />
              <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
            </view>
          </EraFormItem>
          <view class="title-box fz-24 color-block-45">
            该优惠券可针对您代理的品牌全部商品进行优惠
          </view>
          <EraFormItem class="form-main__item" label="" prop="ticketAll" label-width="0">
            <view>
              <EraCheckboxGroup v-model="formData.ticketAll" placement="column">
                <view>
                  <EraCheckbox name="1" shape="circle">
                    <block slot="label">
                      <text class="c-required">*</text>
                      <text>通用券</text>
                    </block>
                  </EraCheckbox>
                </view>
              </EraCheckboxGroup>
            </view>
          </EraFormItem>
          <view class="title-box fz-24 color-block-45">
            该优惠券可针对您代理的全部商品进行优惠
          </view>
          <EraFormItem
            class="form-main__item"
            :label-style="labelStyle"
            label="优惠信息"
            prop="disInfo"
            label-width="400rpx"
            required
          >
            <view class="flex">
              <text class="fz-32 color-block-65 p-r-8">满</text>
              <u-input
                v-model="formData.disAccount"
                border="none"
                class="little-input"
                inputAlign="center"
                placeholder="请输入"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);"
              />
              <text class="fz-32 color-block-65 p-l-8">元，减</text>
              <u-input
                v-model="formData.disNum"
                border="none"
                class="little-input"
                inputAlign="center"
                placeholder="请输入"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);"
              />
              <text class="fz-32 color-block-65 p-l-8">元</text>
            </view>
          </EraFormItem>
          <EraFormItem
            class="form-main__item"
            :label-style="labelStyle"
            label="发放量（张）"
            prop="setNum"
            required
          >
            <u--input
              v-model="formData.setNum"
              border="none"
              class="form-main__input"
              inputAlign="right"
              :max="500000"
              placeholder="不超过50万"
              placeholderStyle="color: rgba(0, 0, 0, 0.25);"
              type="number"
            />
          </EraFormItem>
          <EraFormItem
            class="form-main__item"
            :label-style="labelStyle"
            label="领券时间"
            required
          />
          <view class="flex flex-vertical-c">
            <EraFormItem
              class="form-main__item flex1"
              label=""
              prop="getSatrt"
              label-width="0"
              @click="showDatePicker('getSatrt')"
            >
              <u--input
                v-model="formData.getSatrt"
                border="none"
                class="input-box flex1"
                inputAlign="right"
                placeholder="请输入"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);text-align:center"
                readonly
              />
            </EraFormItem>
            <view class="s-line">-</view>
            <EraFormItem
              class="form-main__item flex1"
              label=""
              prop="getEnd"
              label-width="0"
              @click="showDatePicker('getEnd')"
            >
              <u--input
                v-model="formData.getEnd"
                border="none"
                class="input-box flex1"
                inputAlign="right"
                placeholder="请输入"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);text-align:center"
                readonly
              />
            </EraFormItem>
          </view>
          <EraFormItem class="form-main__item" :label-style="labelStyle" label="券有效期" />
          <view class="flex flex-vertical-c">
            <EraFormItem
              class="form-main__item flex1"
              label=""
              prop="limitStart"
              label-width="0"
              @click="showDatePicker('limitStart')"
            >
              <u--input
                v-model="formData.limitStart"
                border="none"
                class="input-box flex1"
                inputAlign="right"
                placeholder="请输入"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);text-align:center"
                readonly
              />
            </EraFormItem>
            <view class="s-line">-</view>
            <EraFormItem
              class="form-main__item flex1"
              label=""
              prop="limitEnd"
              label-width="0"
              @click="showDatePicker('limitEnd')"
            >
              <u--input
                v-model="formData.limitEnd"
                border="none"
                class="input-box flex1"
                inputAlign="right"
                placeholder="请输入"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);text-align:center"
                readonly
              />
            </EraFormItem>
          </view>
          <view class="flex p-l-32 p-r-32 p-b-32">
            <text class="fz-32 color-block-65 p-r-8">从领取之日起</text>
            <u--input
              v-model="formData.limitDays"
              border="none"
              class="little-input"
              inputAlign="center"
              placeholder="请输入"
              placeholderStyle="color: rgba(0, 0, 0, 0.25);text-align: center"
            />
            <text class="fz-32 color-block-65 p-l-8">天内有效</text>
          </view>
          <view class="h24 bg-pray" />
          <EraFormItem class="form-main__item flex1" label="定向人群" prop="group" required>
            <EraRadioGroup
              v-model="formData.personGroup"
              class="flex1 flex flex-justify-r"
              @change="personGroupChange"
            >
              <EraRadio class="m-r-40" name="1" shape="circle" label="修理厂" />
              <EraRadio name="2" shape="circle" label="服务商" />
            </EraRadioGroup>
          </EraFormItem>
          <view class="h16 bg-pray" />
          <EraFormItem
            class="form-main__item"
            :label-style="labelStyle"
            label="细分人群"
            required
          />
          <EraRadioGroup v-model="formData.groupDetail" @change="groupDetailChange">
            <view class="flex flex-column">
              <EraRadio class="padding-box" name="1" shape="circle" label="所有用户" />
              <view class="w750 flex flex-vertical-c p-r-32 border-box">
                <EraRadio class="padding-box" name="2" shape="circle" label="指定用户" />
                <view class="flex flex1 flex-justify-r" @click="toAssignUser()">
                  <text
                    class="color-block-45 fz-32"
                    v-if="formData.assignUsers && formData.assignUsers.length"
                  >
                    已选择{{ formData.assignUsers.length }}个用户
                  </text>
                  <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
                </view>
              </view>
              <view class="w750 flex flex-vertical-c">
                <EraRadio class="padding-box" name="3" shape="circle" label="新注册用户" />
                <view class="flex flex1 flex-justify-r p-r-32 border-box" @click="chooseNewUser">
                  <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
                </view>
              </view>

              <EraRadio class="padding-box" name="4" shape="circle" label="已收藏未购买" />
              <EraRadio class="padding-box" name="5" shape="circle" label="已加购物车未购买" />
              <view class="w750 flex flex-vertical-c">
                <EraRadio class="padding-box" name="6" shape="circle" label="指定时间段购买用户" />
                <view class="flex flex1 flex-justify-r p-r-32 border-box">
                  <text
                    class="color-block-45 fz-32"
                    v-if="formData.assignUsers && formData.assignUsers.length"
                  >
                    已选择{{ formData.assignUsers.length }}个用户
                  </text>
                  <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
                </view>
              </view>
            </view>
          </EraRadioGroup>
          <view class="text-right rule-text p-r-32" v-if="showRule">请选择细分人群</view>
          <EraFormItem
            class="form-main__item"
            :label-style="labelStyle"
            label="区域设置"
            prop="area"
            label-width="400rpx"
            required
            @click="toAera()"
          >
            <u--input
              v-model="formData.areaName"
              border="none"
              class="form-main__input"
              inputAlign="right"
              placeholder="指定区域用户"
              placeholderStyle="color: rgba(0, 0, 0, 0.25);"
              readonly
            />
            <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
          </EraFormItem>
          <view class="h24 bg-pray" />
          <view class="form-main__title">基础信息</view>
          <EraFormItem
            class="form-main__item"
            :label-style="labelStyle"
            label="领取张数"
            prop="getNum"
            required
          >
            <view class="flex">
              <text class="fz-32 color-block-65 p-r-8">每人限领张数</text>
              <u--input
                v-model="formData.getNum"
                border="none"
                class="little-input"
                inputAlign="right"
                placeholder="请输入"
                placeholderStyle="color: rgba(0, 0, 0, 0.25);text-align: center"
              />
              <text class="fz-32 color-block-65 p-l-8">张</text>
            </view>
          </EraFormItem>
          <EraFormItem class="form-main__item" label="使用限制" prop="useLimit">
            <EraRadioGroup class="flex1 flex flex-justify-r" v-model="formData.useLimit">
              <EraRadio name="1" shape="circle" label="全部可用" />
              <EraRadio name="2" shape="circle" label="仅限于现金" />
            </EraRadioGroup>
          </EraFormItem>
          <view class="title-box fz-24 color-block-45"> 支付方式限制 </view>
          <EraFormItem
            v-if="origin === '1' && formData.personGroup === '1'"
            class="form-main__item"
            label="是否允许适用于服务商的进货商品"
            labelWidth="540rpx"
            prop="isOverlay"
          >
            <view class="flex1 flex flex-justify-r">
              <EraSwitch
                v-model="formData.isAllow"
                :activeValue="1"
                :inactiveValue="0"
                activeColor="#00B359"
              />
            </view>
          </EraFormItem>
          <EraFormItem class="form-main__item" label="是否叠加使用" prop="isOverlay">
            <view class="flex1 flex flex-justify-r">
              <EraSwitch
                v-model="formData.isOverlay"
                :activeValue="1"
                :inactiveValue="0"
                activeColor="#00B359"
              />
            </view>
          </EraFormItem>
          <EraFormItem class="form-main__item" label="是否公开" prop="isOverlay">
            <view class="flex1 flex flex-justify-r">
              <EraSwitch
                v-model="formData.isPublic"
                :activeValue="1"
                :inactiveValue="0"
                activeColor="#00B359"
              />
            </view>
          </EraFormItem>
          <view class="title-box fz-24 color-block-45"> 在购物车、商品页、领券中心展示 </view>
          <view class="h56 bg-pray" />
        </EraForm>
      </scroll-view>
      <view class="p-t-22 p-b-12">
        <EraButton circle text="提交" @click="submit()" />
      </view>
      <view class="safearea-box" />
    </view>
    <VoCategorySelect ref="VoCategorySelect" title="选择品类" @typeData="typeData" />
    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="startShow"
      :value="nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="datetime"
      title="选择时间"
      @cancel="startShow = false"
      @confirm="confirmStart"
    />
    <NewUserChoose ref="newUserChoose" />
  </view>
</template>

<script>
  import NewUserChoose from './components/NewUserChoose.vue'
  export default {
    name: 'AddTicket',
    components: { NewUserChoose },
    data() {
      return {
        navTitle: '新建商品券',
        startShow: false,
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:00'),
        formData: {
          name: '', //优惠券名称
          ticketType: '',
          ticketA: [], //*品类券（适用于指定品类）
          ticketB: [], //优惠券名称
          ticketC: [], //优惠券名称
          ticketAll: [], //*通用券
          disAccount: '',
          disNum: '',
          setNum: '', //发放量（张）
          getSatrt: '', //领券时间
          getEnd: '', //领券时间
          limitStart: '',
          limitEnd: '',
          limitDays: '', //天内有效
          group: '', //*定向人群
          groupDetail: '', //细分人群
          areaCode: [], //区域
          areaName: '', //区域名称回显
          useLimit: '', //使用限制
          isOverlay: 0, //是否叠加使用
          isPublic: 1, //是否公开
          isAllow: 0, //是否允许适用于服务商的进货商品

          categorySelectList: [],
          goodSelectList: [],
          brandChoose: [],
          brandNum: '',
          personGroup: '', //*定向人群
          assignUsers: [], //指定用户
          typeNum: '',
          GoodsNum: '',
        },
        rules: {
          name: [
            {
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          ticketA: [
            {
              type: 'number',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          ticketB: [
            {
              type: 'number',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          ticketC: [
            {
              type: 'number',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          ticketAll: [
            {
              type: 'string',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          disInfo: [
            {
              // 自定义验证函数，见上说明
              validator: (rule, value, callback) => {
                let bol = false
                if (this.formData.disAccount && this.formData.disNum) {
                  bol = true
                } else {
                  bol = false
                }
                return bol
              },
              message: '请完善优惠信息',
              trigger: ['change', 'blur'],
            },
          ],
          setNum: [
            {
              type: 'number',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          getSatrt: [
            {
              type: 'string',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          getEnd: [
            {
              type: 'string',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          limitSatrt: [
            {
              type: 'string',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          limitEnd: [
            {
              type: 'string',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          group: [
            {
              validator: () => {
                let bol = false
                if (this.formData.personGroup) {
                  bol = true
                } else {
                  bol = false
                }
                return bol
              },
              message: '请选择',
              trigger: ['change', 'blur'],
            },
          ],
          area: [
            {
              validator: () => {
                let bol = false
                if (this.formData.areaName) {
                  bol = true
                } else {
                  bol = false
                }
                return bol
              },
              message: '请选择',
              trigger: ['change', 'blur'],
            },
          ],
          getNum: [
            {
              type: 'number',
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
        },
        labelStyle: {
          color: 'rgba(0, 0, 0, 0.85)',
        },
        showRule: false,
        pickerKey: '',
        origin: '1', //1新建商品券2新建服务券
      }
    },
    watch: {
      productForm: {
        deep: true,
        handler(newForm) {
          uni.$VoTicketAddForm = newForm
        },
      },
    },
    onShow() {
      const flag = uni?.$VoTicketAddForm // 判断是否存在已编辑的历史
      if (flag) {
        this.formData = uni.$VoTicketAddForm
      } else {
        uni.$VoTicketAddForm = this.formData
      }
      //选择商品
      uni.$off('selectGoods')
      uni.$on('selectGoods', (res) => {
        console.log('selectGoods', res)
        this.formData.goodSelectList = res
        this.formData.GoodsNum = res.length
      })
      //选择品牌
      uni.$off('select')
      uni.$on('select', (row) => {
        let obj = {}
        let result = row.reduce((item, next) => {
          obj[next.id] ? '' : (obj[next.id] = true && item.push(next))
          return item
        }, [])
        this.formData.brandChoose = result
        this.formData.brandNum = result.length
        console.log('brandChooseonLoad', result)
      })
      //选择用户
      uni.$off('selectAssignUser')
      uni.$on('selectAssignUser', (data) => {
        this.formData.assignUsers = data
      })
      //选择区域
      uni.$on('addressFn', (res) => {
        console.log(res, 'addressFn')
        this.formData.areaCode = res
      })
      uni.$on('addressNames', (res) => {
        this.formData.areaName = res.join(',')
      })
    },
    onLoad(options) {
      //1新建商品券2新建服务券
      this.origin = options.origin || '1'
      this.navTitle = this.origin === '1' ? '新建商品券' : '新建服务券'
    },
    methods: {
      //选择品类
      chooseCategory() {
        this.$refs.VoCategorySelect.showType(this.formData.categorySelectList)
      },
      //选择品类回显
      typeData(itemData) {
        console.log('itemData', itemData)
        let itemList = itemData.data
        this.formData.typeNum = itemList.length
        this.formData.categorySelectList = itemList
      },
      //选择新注册用户
      chooseNewUser() {
        this.$refs.newUserChoose.show()
      },
      //选择商品页
      toShopList() {
        this.$linkToEasy(`/pagesSupplier/DiscountCoupon/ShopList`)
      },
      //选择区域
      toAera() {
        this.$storage.set('defaultArea', this.formData.areaCode)
        console.log(this.formData.areaCode, 'saleArea')
        this.$linkToEasy('/pagesProduct/SaleArea/SaleArea?title=区域设置&type=2')
      },
      personGroupChange(e) {
        console.log('eee', e)
      },
      groupDetailChange(e) {
        console.log('eee', e)
        if (e) {
          this.showRule = false
        } else {
          this.showRule = true
        }
      },
      submit() {
        console.log('formData', this.formData)

        this.$refs.form
          .validate()
          .then((res) => {
            if (!this.formData.groupDetail) {
              this.showRule = true
              return
            }
            if (
              !this.formData.ticketA.length &&
              !this.formData.ticketB.length &&
              !this.formData.ticketC.length &&
              !this.formData.ticketAll.length
            ) {
              uni.$u.toast('请选择优惠类型')
              return
            }
            uni.$u.toast('校验通过')
          })
          .catch((errors) => {
            console.log(errors)
            uni.$u.toast('校验失败')
          })
      },
      /**
       * confirm  选择开始时间
       * @param e
       */
      confirmStart(e) {
        this.isChooseTime = true
        this.startShow = false
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')

        this.formData[this.pickerKey] = date
        console.log('sss', date)
      },
      //选择开始时间
      showDatePicker(key) {
        this.pickerKey = key
        this.startShow = true
      },
      //指定用户
      toAssignUser() {
        this.$linkToEasy(`/pagesSupplier/DiscountCoupon/AssignUser?origin=${this.origin}`)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .form {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    &-main {
      &__title {
        font-weight: 500;
        font-size: 32rpx;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.85);
        padding: 22rpx 32rpx 18rpx 32rpx;
        box-sizing: border-box;
      }
      &__item {
        padding: 0 32rpx;
        box-sizing: border-box;
        text-align: right;
      }
      .input-title {
        padding: 20rpx 32rpx;
      }
      .title-box {
        padding: 8rpx 40rpx;
        background: #f7f7f8;
      }
      .input-box {
        background: #f7f7f8;
        border-radius: 4px;
        text-align: center;
        height: 64rpx;
      }
      .s-line {
        color: #d3d4db;
      }
      .little-input {
        background: #f7f7f8;
        border-radius: 4px;
        width: 142rpx;
        text-align: center;
      }
    }
    .bottom-line {
      border-bottom: 8rpx solid #f7f7f8;
    }
    .bg-pray {
      background: #f7f7f8;
    }
    .padding-box {
      padding: 24rpx 32rpx;
    }
    .rule-text {
      font-size: 28rpx;
      line-height: 42rpx;
      color: #f20014;
    }
    .form-required {
      color: #f56c6c;
      font-size: 40rpx;
    }
  }
</style>
