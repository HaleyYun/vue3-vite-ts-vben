<template>
  <view class="type flex p-t-90 flex-column">
    <u-gap :height="$systemInfo.statusBarHeight" />
    <scroll-view :scroll-y="true" class="type-flex1 flex1">
      <view v-for="(item, index) of typeList" :key="index" class="type-template">
        <view class="flex flex-justify-between flex-vertical-c p-r-32 p-b-24 border-box">
          <view class="type-template__type">{{ item.name }}</view>
          <view @click="showAll(item)">
            <view v-if="!item.isShowAll" class="tips-title__right flex flex-vertical-c">
              <view class="right-margin">展开</view>
              <VoIcon :size="16" name="arrow-bottom-line" />
            </view>
            <view v-else class="tips-title__right flex flex-vertical-c">
              <view class="right-margin">收起</view>
              <VoIcon :size="16" name="arrow-top-line" />
            </view>
          </view>
        </view>

        <view
          v-if="item.value && item.value.length && item.isShowAll"
          class="type-template__choose"
        >
          <view
            v-for="(info, i) of item.value"
            :key="i"
            :class="info.selected ? 'select' : 'no-select'"
            class="choose-list overEllipsis"
            @click="chooseFn(info)"
            >{{ info.name }}
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="type-bottom flex">
      <u-button
        :plain="true"
        color="rgba(0, 0, 0, 0.85)"
        customStyle="width: 280rpx;height: 92rpx;border: 1px solid rgba(0, 0, 0, 0.25);"
        shape="circle"
        size="large"
        text="重置"
        @click="reset()"
      />
      <u-button
        :text="btnText"
        color="#FF5319"
        customStyle="width: 280rpx;height: 92rpx;margin-left: 30rpx;"
        shape="circle"
        size="large"
        @click="determine"
      />
    </view>
    <VoSafetyArea :is-fixed="false" />
  </view>
</template>

<script>
  export default {
    name: 'TemplateTypePopup',
    props: {
      categoryList: {
        type: Array,
        default() {
          return []
        },
      },
      //回显已选值
      selectData: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        typeList: [],
        selectList: [],
        btnText: '确定',
        categoryId: '',
      }
    },
    watch: {
      typeList: {
        deep: true,
        handler(newValue) {
          let arr = []
          newValue.forEach((item) => {
            if (item.value && item.value.length) {
              item.value.forEach((val) => {
                if (val.selected) {
                  arr.push(val)
                }
              })
            }
          })
          this.selectList = arr
          let num = arr.length
          let bagdeNum = 0
          if (num <= 30) {
            bagdeNum = num
          } else if (num > 30 && num < 40) {
            bagdeNum = '30+'
          } else if (num >= 40 && num < 50) {
            bagdeNum = '40+'
          } else if (num >= 50 && num < 60) {
            bagdeNum = '50+'
          } else if (num >= 70 && num < 80) {
            bagdeNum = '60+'
          } else if (num >= 90 && num < 100) {
            bagdeNum = '90+'
          } else if (num >= 100) {
            bagdeNum = '99+'
          }
          this.btnText = arr.length ? `确定(${bagdeNum})` : `确定`
          console.log('this.selectList', this.selectList)
        },
      },
    },
    created() {
      // this.initData()
    },
    methods: {
      async initData() {
        try {
          //商品类别
          const ret = await this.$VoHttp.apiGoodsCategoryApplyCertificationList({ name: '' })

          let certificationCategorys = ret.data.certificationCategorys

          let result = new Map()
          certificationCategorys.map((item) => {
            item.fullName = item.name
            item.firstName = item.name.split('-')[0]
            item.name = item.name.split('-')[1]
            item.selected = this.categoryList.includes(item.name)
            item.type = 'goodType' //数据是商品类别
            if (result.get(item.firstName)) {
              let timeResult = result.get(item.firstName) || []
              timeResult.push(item)
              result.set(item.firstName, timeResult)
            } else {
              result.set(item.firstName, [item])
            }
          })
          result.forEach((val, key) => {
            this.typeList.push({
              key: 'category',
              isShowAll: true,
              name: key,
              value: val,
            })
          })
          console.log('this.typeList ', this.typeList, this.selectData)
          if (this.selectData.length) {
            let val = this.selectData.filter((item) => item.type === 'goodType')
            if (val && val.length) {
              this.setValue()
              this.getModelList(val[0].id)
            }
          }
        } catch (e) {
          console.log(e)
          // this.$u.toast(JSON.stringify(e))
        }
      },
      //回显选中数据
      setValue() {
        if (this.selectData.length) {
          this.typeList.forEach((item) => {
            if (item.value && item.value.length) {
              item.value.forEach((val) => {
                this.selectData.forEach((ele) => {
                  if (val.id === ele.id) {
                    item.selected = true
                    val.selected = true
                  }
                })
              })
            }
          })
        }
      },
      async getModelList(categoryId) {
        this.typeList = this.typeList.filter((item) => item.key === 'category')
        //型号
        const retSku = await this.$VoHttp.GOODS.apiGoodsSkuQueryApplyList({
          isEnable: 1,
          categoryId: categoryId,
        })
        let retSkuValue = retSku.data
        retSkuValue.forEach((item) => {
          item.isShowAll = true
          item.key = 'sku'
          item.value = item.value.map((val) => {
            return {
              // id: val,
              id: item.id,
              name: val,
              selected: false,
              type: 'skuType',
            }
          })
        })
        //型号
        const resultData = await this.$VoHttp.apiGoodsModelSaleList({
          isEnable: 1,
          categoryId: categoryId,
        })
        let modelList = resultData.data.map((item) => {
          return {
            name: item.model,
            id: item.id,
            selected: false,
            type: 'modelType', //型号
          }
        })
        this.typeList.push({
          isShowAll: true,
          name: '型号',
          key: 'model',
          value: modelList,
        })
        this.typeList = this.typeList.concat(retSkuValue)
        console.log('this.typeList99999', this.typeList)
        this.setValue()
      },
      chooseFn(e) {
        this.typeList.forEach((info) => {
          info.value.forEach((val) => {
            if (e.type === 'goodType') {
              if (val.type === 'goodType') {
                if (e.id === val.id) {
                  val.selected = true
                } else {
                  val.selected = false
                }
              }
            } else {
              if (e.id === val.id) {
                val.selected = !val.selected
              }
            }
          })
        })
        //选择商品类别，获取型号
        if (e.type === 'goodType') {
          this.getModelList(e.id)
        }
      },
      //展开
      showAll(val) {
        this.typeList.forEach((item) => {
          if (item.name === val.name) {
            item.isShowAll = !item.isShowAll
          }
        })
      },
      /**
       * 点击确定
       */
      determine() {
        this.$emit('determine', this.selectList)
      },
      //重置
      reset() {
        this.typeList.forEach((info) => {
          info.value.forEach((val) => {
            val.selected = false
          })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .type {
    width: 670rpx;
    height: 100vh;
    box-sizing: border-box;

    &-flex1 {
      overflow-y: scroll;
    }

    &-template {
      padding-left: 32rpx;
      padding-top: 24rpx;
      // border-bottom: 2rpx solid $v-bg-light;
      &__type {
        height: 46rpx;
        line-height: 46rpx;
        font-weight: 500;
        font-size: 30rpx;
        color: $v-c0-85;
      }

      &__choose {
        //display: grid;
        //grid-template-columns: repeat(auto-fill, 76px);
        //grid-column-gap: 44rpx;
        display: flex;
        flex-wrap: wrap;
        .choose-list {
          //width: 152rpx;
          //height: 64rpx;
          font-size: 24rpx;
          border-radius: 80rpx;
          //line-height: 64rpx;
          text-align: center;
          margin-bottom: 24rpx;
          margin-right: 48rpx;
          padding: 14rpx 24rpx;
          box-sizing: border-box;
        }
      }
    }

    &-bottom {
      width: 670rpx;
      background: #ffffff;
      padding: 32rpx 40rpx;
      box-sizing: border-box;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
    }
  }

  .no-select {
    color: $v-c0-85;
    background: $v-bg-light !important;
    border: 2rpx solid $v-bg-light;
    box-sizing: border-box;
  }

  .select {
    color: $color-primary-yellow;
    background: $v-tags-btn-disabled;
    border: 2rpx solid $color-primary-yellow;
    box-sizing: border-box;
  }

  .tips-title__right {
    height: 18rpx;
    line-height: 18rpx;
    font-size: 24rpx;
    color: $v-c0-45;

    .right-margin {
      margin-right: 4rpx;
    }
  }
</style>
