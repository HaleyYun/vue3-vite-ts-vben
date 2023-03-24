<template>
  <view class="w-full h-full flex flex-column overflow-hidden">
    <view class="scan">
      <view v-if="typeIndex === 1" class="scan-btn">
        <view class="flex flex-vertical-c flex-justify-between">
          <view class="flex flex-vertical-c flex-justify-c flex1 scan-manual" @click="vin">
            <VoIcon :size="20" class="m-l-10" color="#000" name="scan-not-vin" opacity="0.85" />
            <view class="m-l-20">扫码识别</view>
          </view>
          <view class="flex1 scan-manual m-l-36" @click="showHandle">手动输入</view>
        </view>
      </view>
      <view v-else-if="typeIndex === 2" class="scan-btn">
        <view class="flex flex-vertical-c flex-justify-c flex1 scan-manual" @click="scanOutbound">
          <VoIcon :size="20" class="m-l-10" color="#000" name="scan-not-vin" opacity="0.85" />
          <view class="m-l-20">扫描出库码</view>
        </view>
      </view>
      <view v-else class="flex flex-vertical-c flex-justify-between scan-btn">
        <!-- <view class="flex1 fz-32 color-block-65">选择出库码</view> -->
        <view class="flex flex-vertical-c flex-justify-c flex1 scan-manual" @click="vin">
          <VoIcon :size="20" class="m-l-10" color="#000" name="scan-not-vin" opacity="0.85" />
          <view class="m-l-20">扫码识别</view>
        </view>
        <view class="flex1 scan-manual m-l-36" @click="showHandle">手动输入</view>
      </view>

      <view v-if="typeIndex === 1" class="scan-note">注：通过录入发动机识别码补充库存</view>
      <view v-else-if="typeIndex === 2" class="scan-info">选择出库码</view>
      <view v-else class="scan-note">注：通过录入发动机识别码补充库存</view>
      <view v-if="typeIndex != 2" class="scan-line" />
    </view>
    <view class="list flex1 overflow-y border-box">
      <view v-if="typeIndex === 2" class="fz-b m-b-24">已选：{{ selectCount }}个</view>
      <view v-else class="fz-b m-b-24">已录入：{{ totalCount }}</view>
      <view v-if="typeIndex === 2">
        <view v-for="(item, index) in codeList" :key="index" class="list-item">
          <view
            :class="{ danger: item.select }"
            class="list-item-box"
            @click="codeListSelect(item)"
          >
            <view>{{ item.value }}</view>
          </view>
        </view>
      </view>
      <view v-else>
        <view v-for="(item, index) in list" :key="index" class="list-item">
          <view :class="{ danger: item.tips }" class="list-item-box" @click="editThis(index)">
            <view>{{ item.value }}</view>
            <VoIcon
              name="close-c"
              opacity="0.45"
              size="16"
              @click.native.stop="deleteThis(index)"
            />
          </view>
          <view v-if="item.tips" class="list-item-tips">{{ item.tips }}</view>
        </view>
      </view>
    </view>
    <!--  手动输入识别码弹窗  -->
    <VoModal
      :show="showManual"
      class="position-f"
      closeOnClickOverlay
      confirmColor="#000000"
      confirmText="确定"
      showCancelButton
      @cancel="close"
      @close="close"
      @confirm="editManual"
    >
      <view class="slot-content w-full">
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="modify-form"
          labelPosition="left"
          labelWidth="0"
        >
          <EraFormItem
            class="modify-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            prop="contentManual"
          >
            <u-input
              v-model.trim="formData.contentManual"
              border="bottom"
              clearable
              fontSize="18px"
              placeholder="请输入发动机识别码"
              placeholderStyle="font-size: 16px;color: rgba(0, 0, 0, 0.25);"
            />
          </EraFormItem>
        </EraForm>
      </view>
    </VoModal>
    <!--  编辑发动机识别码弹窗  -->
    <VoModal
      :show="show"
      class="position-f"
      closeOnClickOverlay
      confirmColor="#000000"
      confirmText="确定"
      showCancelButton
      @cancel="close"
      @close="close"
      @confirm="edit"
    >
      <view class="slot-content w-full">
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="modify-form"
          labelPosition="left"
          labelWidth="0"
        >
          <EraFormItem
            class="modify-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            prop="content"
          >
            <u-input
              v-model.trim="formData.content"
              border="bottom"
              clearablefontSize="18px"
              placeholder="请编辑发动机识别码"
              placeholderStyle="font-size: 16px;color: rgba(0, 0, 0, 0.25);"
            />
          </EraFormItem>
        </EraForm>
      </view>
    </VoModal>
    <u-toast ref="uToast" />
  </view>
</template>
<script>
  import {
    chooseImageOcrByPromise,
    vocenOutboundScanCodeFn,
    vocenOutboundScanCodeKeepMessageFn,
    vocenOutboundScanCodeMessageFn,
    vocenScanCodeFn,
  } from '@/common/helper'

  export default {
    name: 'ScanList',
    props: {
      // 识别码列表
      list: {
        type: Array,
        default: () => [],
      },
      totalCount: {
        type: [Number, String],
        default: '',
      },
      typeIndex: {
        type: Number,
        default: 1, // 类型：1.商家仓扫码补货 2.商家仓手动出库 3.一件上架
      },
      mGoodsId: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        // 手动输入的识别码
        code: '',
        // 编辑弹窗
        show: false,
        showManual: false,
        // 编辑内容
        formData: {
          contentManual: '', // 手动输入识别码
          content: '',
        },
        // 表单验证
        rules: {
          contentManual: {
            type: 'string',
            required: true,
            message: '识别码不可为空',
            trigger: ['blur'],
          },
          content: {
            type: 'string',
            required: true,
            message: '识别码不可为空',
            trigger: ['blur'],
          },
        },
        // isLoading: false,
        // 当前点击修改对象
        cur: null,
        title: '编辑发动机识别码',
        codeList: [], // 识别码列表
        codeSelectList: [], // 选中识别码列表
        selectCount: 0, //选中个数
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      uni.$off('scanReasult')
      uni.$on('scanReasult', (data) => {
        console.log('扫描结果', data)
        if (data === '超时') {
          this.title = '输入发动机识别码'
          this.show = true
          return
        }
        if (data.indexOf('http') > -1) {
          if (data.split('=') && data.split('=').length && data.split('=')[1]) {
            // this.code = data.data.split('=')[1]
            this.autoSure(data.split('=')[1])
          } else {
            this.$u.toast('未识别到内容，请重新扫描')
            this.code = ''
          }
        } else {
          // this.code = data.data
          this.autoSure(data)
        }
      })
    },
    onLoad() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      this.getWareInfo()
    },
    //生命周期 - 创建之前
    beforeCreate() {},
    //生命周期 - 挂载之前
    beforeMount() {},
    //生命周期 - 更新之前
    beforeUpdate() {},
    //生命周期 - 更新之后
    updated() {},
    //生命周期 - 销毁之前
    beforeUnmount() {},
    //生命周期 - 销毁完成
    unmounted() {},
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {},
    onShow() {},
    methods: {
      /**
       * 点击手动输入
       */
      showHandle() {
        this.cur = null
        this.showManual = true
      },
      // 确定
      async sure() {
        console.log('this.typeIndex', this.typeIndex)
        // let arr = this.list.map((item) => item.value)
        // if (arr.indexOf(this.code) > -1) {
        //   this.list.forEach((item) => {
        //     if (item.value === this.code) {
        //       item.tips = '「该识别码与已有发动机识别码重复」,请清除。'
        //     }
        //   })
        // }
        //过滤空格
        let valueNew = this.code.replace(/(^\s*)|(\s*$)/g, '')
        if (!valueNew) {
          this.$u.toast('识别码不能为空')
          return
        }
        this.code = valueNew
        let arr = this.list.map((item) => item.value)
        if (arr.indexOf(this.code) > -1) {
          uni.$u.toast('录入失败,与已有发动机识别码重复')
          this.code = ''
          return
        }
        // 判断是否已入库
        let bool = await this.checkExistence(valueNew)
        console.log('bool==', bool)
        // 如果已入库(补货)
        if (bool.code && this.typeIndex === 1) return
        // 未入库(出库)
        if (!bool.code && this.typeIndex === 2) {
          this.$u.toast('该识别码未入库')
          this.code = ''
          return
        }
        // 如果已入库(设置商品信息)
        if (bool.code && this.typeIndex === 3) return
        this.list.unshift({ value: this.code, tips: '' })
        this.code = ''
        uni.$u.toast('录入成功')
        this.$emit('update:list', this.list)
      },
      // 扫码确定
      async autoSure(code) {
        //过滤空格
        let valueNew = code.replace(/(^\s*)|(\s*$)/g, '')
        if (!valueNew) {
          this.$u.toast('识别码不能为空')
          return
        }
        let arr = this.list.map((item) => item.value)
        if (arr.indexOf(valueNew) > -1) {
          this.$refs.uToast.show({
            message: '录入失败,与已有发动机识别码重复',
          })
          // uni.$u.toast('录入失败,与已有发动机识别码重复')
          return
        }
        // 判断是否已入库
        let bool = await this.checkExistence(valueNew)
        console.log('bool==', bool)
        // 如果已入库(补货)
        if (bool.code && this.typeIndex === 1) return
        // 未入库(出库)
        if (!bool.code && this.typeIndex === 2) {
          this.$u.toast('该识别码未入库')
          return
        }
        // 如果已入库(设置商品信息)
        if (bool.code && this.typeIndex === 3) return
        this.list.unshift({ value: valueNew, tips: '' })
        uni.$u.toast('录入成功')
        this.$emit('update:list', this.list)
      },
      /**
       * 检验商品识别码是否存在
       * @param value  需要检查的数据
       * @returns {Promise<*>}
       */
      async checkExistence(value) {
        if (!value && value !== 0) {
          this.$u.toast('识别码不能为空！')
          this.show = false
          this.showManual = false
          return
        }
        console.log(value)
        try {
          const res = await this.$VoHttp.WAREHOUSE.apiWarehouseOperFacilitatorSelfRefillCheck({
            goodsVin: value,
          })
          if (!res || !res.data) return
          const { data } = res
          console.log('data===', data, this.typeIndex)
          // 此处的data，为.then写法中的res.data
          if (this.typeIndex === 1 || this.typeIndex === 3) {
            // 已入库
            if (data.code === 1 || data.code === 2) {
              uni.$u.toast(data.message)
            }
          }
          return data
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      // 删除或编辑
      deleteThis(index) {
        this.list.splice(index, 1)
        this.$emit('update:list', this.list)
      },
      editThis(index) {
        this.formData.content = this.list[index].value
        this.title = '编辑发动机识别码'
        this.show = true
        this.cur = index
      },
      codeListSelect(item) {
        item.select = !item.select

        this.codeSelectList = this.codeList.filter((item) => item.select)
        this.selectCount = this.codeSelectList.length
        this.$emit('update:list', this.codeSelectList)
      },
      // 手动输入弹窗确定事件
      async editManual() {
        let arr = this.list.map((item) => item.value)
        if (arr.indexOf(this.formData.contentManual) > -1) {
          uni.$u.toast('录入失败,与已有发动机识别码重复')
          return
        }

        if (this.cur === null) {
          await this.autoSure(this.formData.contentManual)
          this.close()
          return
        }
        console.log('单击确定 ------->')
        console.log('确认')
        // 判断是否已入库
        let bool = await this.checkExistence(this.formData.contentManual)
        console.log(2222, bool)
        console.log('this.typeIndex', this.typeIndex)
        // 如果已入库
        if (bool.code && this.typeIndex === 1) return
        // 未入库
        if (!bool.code && this.typeIndex === 2) {
          this.$u.toast('该识别码未入库')
          this.code = ''
          return
        }

        if (bool.code && this.typeIndex === 3) return
        console.log(3333, bool)
        this.$refs.form.validate().then((res) => {
          console.log(res, 1111111111111111111)
          this.list[this.cur].value = this.formData.contentManual
          this.list[this.cur].tips = null
          this.$emit('update:list', this.list)
          this.close()
        })
      },
      // 确认修改
      async edit() {
        let arr = this.list.map((item) => item.value)
        if (arr.indexOf(this.formData.content) > -1) {
          uni.$u.toast('录入失败,与已有发动机识别码重复')
          this.formData.content = ''
          this.show = false
          return
        }
        if (this.cur === null) {
          await this.autoSure(this.formData.content)
          this.close()
          return
        }
        console.log('确认修改')
        // 判断是否已入库
        let bool = await this.checkExistence(this.formData.content)
        console.log(2222, bool)
        console.log('this.typeIndex', this.typeIndex)
        // 如果已入库
        if (bool.code && this.typeIndex === 1) return
        // 未入库
        if (!bool.code && this.typeIndex === 2) {
          this.$u.toast('该识别码未入库')
          this.code = ''
          return
        }
        if (bool.code && this.typeIndex === 3) return
        console.log(3333, bool)
        this.$refs.form.validate().then((res) => {
          console.log(res, 1111111111111111111)
          this.list[this.cur].value = this.formData.content
          this.list[this.cur].tips = null
          this.$emit('update:list', this.list)
          this.close()
        })
      },
      // 关闭弹窗
      close() {
        this.show = false
        this.showManual = false
        this.formData.content = ''
        this.formData.contentManual = ''
      },
      scanOutbound() {
        // #ifdef APP-PLUS
        let that = this
        vocenOutboundScanCodeFn(10, '0')
          .then((res) => {
            console.log('res scanOutbound--------->', res)
            if (res.code == 200) {
              that.checkExistenceVIN(res.data.vinCode)
            } else if (res.code == 100) {
              that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
            }
          })
          .catch((e) => {
            console.log(e, 123)
            that.$u.toast('未识别到内容，请重新扫描')
          })
        this.keepCode()
        // #endif
        // #ifdef H5
        this.$u.toast('请用手机扫码')
        // #endif
      },
      keepCode() {
        let ishas = false
        vocenOutboundScanCodeKeepMessageFn()
          .then((res) => {
            console.log('res keepCode--------->', res)
            if (res.code == 200) {
              this.codeList.map((item) => {
                if (item.value == res.data.vinCode) {
                  ishas = true
                  this.keepCode()
                  if (item.select) {
                    vocenOutboundScanCodeMessageFn({
                      code: '400',
                      vinCode: res.data.vinCode ? res.data.vinCode : '',
                    }).then((resVin) => {
                      console.log(resVin)
                      if (resVin.code == 200) {
                        console.log('res 400------>', resVin)
                      }
                    })
                  } else {
                    vocenOutboundScanCodeMessageFn({
                      code: '500',
                      vinCode: res.data.vinCode ? res.data.vinCode : '',
                    }).then((resVin) => {
                      console.log(resVin)
                      if (resVin.code == 200) {
                        if (resVin.data.select == '1') {
                          this.codeList.map((item) => {
                            if (item.value == resVin.data.vinCode) {
                              item.select = !item.select
                            }
                          })
                          this.codeSelectList = this.codeList.filter((item) => item.select)
                          this.selectCount = this.codeSelectList.length
                          this.$emit('update:list', this.codeSelectList)
                        }
                      }
                    })
                  }
                }
              })
              if (!ishas) {
                this.checkExistenceVIN(res.data.vinCode)
              }
            } else if (res.code == 100) {
              that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
            }
          })
          .catch((e) => {
            console.log(e, 123)
            that.$u.toast('未识别到内容，请重新扫描')
          })
      },
      /**
       * 检验商品识别码是否存在
       */
      checkExistenceVIN(vinCode) {
        console.log('vinCode --->' + vinCode + 'this.mGoodsId ----->' + this.mGoodsId)
        let that = this
        try {
          this.$VoHttp.WAREHOUSE.apiWarehouseOperFacilitatorSelfRefillCheck({
            goodsVin: vinCode,
            goodsId: this.mGoodsId,
          }).then((res) => {
            console.log('res checkExistenceVIN------>', res)
            this.keepCode()
            if (res.code === '20001') {
              if (res.data.code == 0) {
                vocenOutboundScanCodeMessageFn({
                  code: '600',
                  vinCode: vinCode ? vinCode : '',
                }).then((res) => {
                  console.log(res)
                  if (res.code == 200) {
                    console.log('res sendGoodsMessage------>', res)
                  } else if (res.code == 100) {
                    that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
                  }
                })
              } else if (res.data.code == 1 || res.data.code == 2) {
                vocenOutboundScanCodeMessageFn({
                  code: '700',
                  vinCode: vinCode ? vinCode : '',
                }).then((res) => {
                  console.log(res)
                  if (res.code == 200) {
                    console.log('res sendGoodsMessage------>', res)
                  } else if (res.code == 100) {
                    that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
                  }
                })
              }
              console.log('vinCode checkExistenceVIN------>', vinCode)
            }
          })
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      sendGoodsMessage(vinCode) {
        let that = this
        vocenOutboundScanCodeMessageFn({ code: '100', vinCode: vinCode ? vinCode : '' }).then(
          (res) => {
            console.log(res)
            if (res.code == 200) {
              console.log('res sendGoodsMessage------>', res)
              that.goodsOutbound(res.data.vinCode)
            } else if (res.code == 100) {
              that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
            }
          },
        )
      },
      //商品出库
      goodsOutbound(goodsVin) {
        this.$VoHttp.WAREHOUSE.apiWarehouseOperFacilitatorSelfOutBatch({
          goodsVin: goodsVin,
        })
          .then((res) => {
            console.log(res, 'res')
            let that = this
            // 都在库，校验通过
            if (res.data.code === 0) {
              vocenOutboundScanCodeMessageFn({
                code: '200',
                vinCode: goodsVin ? goodsVin : '',
              }).then((resVin) => {
                console.log(resVin)
                if (resVin.code == 200) {
                  console.log('res ------>', resVin)
                }
              })
            } else if (res.data.code === 1) {
              vocenOutboundScanCodeMessageFn({
                code: '300',
                vinCode: goodsVin ? goodsVin : '',
              }).then((resVin) => {
                console.log(resVin)
                if (resVin.code == 100) {
                  that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
                }
              })
            } else if (res.data.code === 2) {
              vocenOutboundScanCodeMessageFn({
                code: '300',
                vinCode: goodsVin ? goodsVin : '',
              }).then((resVin) => {
                console.log(resVin)
                if (resVin.code == 100) {
                  that.$linkToEasy(`/pagesAgent/StoreDetail/MyGoods`)
                }
              })
            }
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      // 扫一扫
      vin() {
        // #ifdef APP-PLUS
        let that = this
        vocenScanCodeFn(20)
          .then((res) => {
            if (res.code == 100) {
              that.title = '输入发动机识别码'
              that.show = true
              return
            }
            let data = res.result

            if (data.indexOf('http') > -1) {
              if (data.split('=') && data.split('=').length && data.split('=')[1]) {
                // this.code = data.data.split('=')[1]
                that.autoSure(data.split('=')[1])
              } else {
                that.$u.toast('未识别到内容，请重新扫描')
                that.code = ''
              }
            } else {
              that.autoSure(data)
            }
          })
          .catch((e) => {
            console.log(e, 123)
            that.$u.toast('未识别到内容，请重新扫描')
          })
        // #endif

        // #ifdef H5

        chooseImageOcrByPromise({
          count: 1,
          sourceType: ['camera'],
          sizeType: ['compressed'],
          tip: '正在识别',
          apiUrl: '/v1/api/business/vehicle/brand/ocr',
          formData: {
            type: 'qrcode',
          },
        })
          .then((res) => {
            const data = JSON.parse(res.data)
            if (+data.code === 20001) {
              console.log('data.data', data.data)
              if (data.data && data.data.length) {
                if (data.data.indexOf('http') > -1) {
                  if (
                    data.data.split('=') &&
                    data.data.split('=').length &&
                    data.data.split('=')[1]
                  ) {
                    // this.code = data.data.split('=')[1]
                    this.autoSure(data.data.split('=')[1])
                  } else {
                    this.$u.toast('未识别到内容，请重新扫描')
                    this.code = ''
                  }
                } else {
                  // this.code = data.data
                  this.autoSure(data.data)
                }
                console.log('this.code', this.code)
                // this.goResult()
              }
            } else {
              this.$u.toast(data.message || '网络错误')
            }
          })
          .catch((err) => {
            console.log('err===', res)
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
          .finally((ff) => {
            console.log('finally===', ff)
            // this.isLoading = !this.isLoading
          })
        // #endif
      },
      //获取仓库信息
      async getWareInfo() {
        let params = {
          pageNo: 1,
          pageSize: 10,
        }
        ;(params.goodsId = this.mGoodsId),
          await this.$VoHttp.WAREHOUSE.apiWarehouseOperAgentGoodsVinPage(params)
            .then((res) => {
              if (res.data) {
                this.codeList = res.data.sortGoodsVin.map((item) => {
                  return {
                    select: false,
                    value: item,
                  }
                })
                console.log('codeList ------->', this.codeList)
              }
            })
            .catch((err) => {
              console.log('err', err)
              uni.$u.toast(err.message || '请检查网络')
            })
            .finally(() => {
              this.loading = !this.loading
              this.loadingStatus = false
            })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .scan {
    box-sizing: border-box;
    padding: 32rpx 0 24rpx;
    background-color: #fff;
    &-btn {
      padding: 0 32rpx;
    }
    &-line {
      width: 100%;
      height: 20rpx;
      background-color: #f7f7f8;
    }
    &-vin {
      height: 80rpx;
      line-height: 80rpx;
      background: #ff5319;
      border-radius: 48rpx;
      font-size: 32rpx;
      color: #fff;
      border: 2rpx solid #ff5319;
      box-sizing: border-box;
    }
    &-manual {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 32rpx;
      border: 2rpx solid #d3d4db;
      border-radius: 24px;
      box-sizing: border-box;
    }
    &-note {
      padding: 0 32rpx;
      margin-top: 16rpx;
      font-size: 24rpx;
      color: $v-c0-45;
      height: 68rpx;
      line-height: 68rpx;
    }
    &-info {
      padding: 0 32rpx;
      margin-top: 32rpx;
      width: 100%;
      height: 68rpx;
      line-height: 68rpx;
      background-color: #f7f7f8;
      font-size: 24rpx;
      color: $v-c0-45;
    }
    &-title {
      display: flex;
      align-items: baseline;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.85);
      &__scan {
        border: 2rpx solid $v-btn-disabled;
        border-radius: 64rpx;
        height: 58rpx;
        padding: 0 24rpx;
        box-sizing: border-box;
      }
    }
    &-input {
      display: flex;
      align-items: center;
      margin-top: 24rpx;
      .input {
        width: 480rpx;
        height: 96rpx;
        box-sizing: border-box;
        padding: 24rpx;
        color: rgba(0, 0, 0, 0.85);
        background: #f6f7f8;
        border-radius: 16rpx;
        margin-right: 30rpx;
      }
      .btn {
        width: 176rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        color: rgba(0, 0, 0, 0.25);
        background: #f6f7f8;
        border-radius: 64rpx;
        &.canSubmit {
          background: #ff5319;
          color: #ffffff;
        }
      }
    }
    &-tips {
      height: 42rpx;
      font-size: 28rpx;
      color: #f20014;
    }
  }
  .list {
    padding: 16rpx 32rpx;
    background-color: #fff;
    font-size: 36rpx;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    &-item {
      margin-bottom: 16rpx;
      &-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16rpx 24rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.08);
        border-radius: 16rpx;
        margin-bottom: 16rpx;
        background: #f7f7f8;
        &.danger {
          border-color: #f20014;
          color: #f20014;
        }
      }
      &-tips {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
  .position-f {
    position: fixed;
    z-index: 10;
  }
</style>
