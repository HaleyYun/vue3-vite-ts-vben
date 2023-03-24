<template>
  <view class="classify">
    <u-popup :show="show" mode="right" @close="closeHandler">
      <view class="type flex flex-column">
        <VoBatteryBar />
        <view class="type-flex1 flex1">
          <view class="type-nav flex flex-vertical-c">
            <view class="fz-36 lh150 fz-b color-block flex1">商品分类</view>
            <VoIcon :size="20" class="type-nav__absolute" name="close" @click="closeHandler" />
          </view>
          <view v-for="(item, index) of classifyList" :key="index" class="tips">
            <view class="tips-title">{{ item.name }}</view>
            <view class="tips-template">
              <block v-for="info of item.children" v-show="item.children.length">
                <text
                  v-if="info.secondName.length < 6"
                  :key="info.id"
                  :class="selectKeys.includes(info.id) ? 'select' : 'no-select'"
                  class="tips-template__choose1"
                  space="ensp"
                  @click="chooseFn(info)"
                >
                  {{ info.secondName }} </text
                ><text
                  v-else-if="info.secondName.length >= 6 && info.secondName.length < 14"
                  :key="info.id"
                  :class="selectKeys.includes(info.id) ? 'select' : 'no-select'"
                  class="tips-template__choose2"
                  space="ensp"
                  @click="chooseFn(info)"
                >
                  {{ info.secondName }} </text
                ><text
                  v-else
                  :key="info.id"
                  :class="selectKeys.includes(info.id) ? 'select' : 'no-select'"
                  class="tips-template__choose3"
                  space="ensp"
                  @click="chooseFn(info)"
                >
                  {{ info.secondName }}
                </text>
              </block>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name: 'TemplateTypePopup',
    props: {
      certificationCategorys:{
        type: Array,
        default: ()=>[],
      },
      show: {
        type: Boolean,
        default: false,
      },
      checkBox: {
        type: Boolean,
        default: false,
      },
      categoryId: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        showProductType: false,
        classifyList: [],
        selectKeys: [],
        selectRows: [],
      }
    },
    watch: {
      show(newVal) {
        if (newVal) {
          // 获取最新的内容
          this.initData()
        }
      },
    },
    methods: {
      async initData() {
        try {

          let ret=null
          let certificationCategorys=null



          if(this.certificationCategorys.length<=0){
            ret = await this.$VoHttp.apiGoodsCategoryApplyCertificationList({ name: '' })
            certificationCategorys = ret.data.certificationCategorys
          }else{
            certificationCategorys=this.certificationCategorys
          }




          let result = new Map()
          certificationCategorys.map((item) => {
            item.firstName = item.name.split('-')[0]
            item.secondName = item.name.split('-')[1]
            if (result.get(item.firstName)) {
              let timeResult = result.get(item.firstName) || []
              timeResult.push(item)
              result.set(item.firstName, timeResult)
            } else {
              result.set(item.firstName, [item])
            }
          })
          this.classifyList = []
          result.forEach((val, key) => {
            this.classifyList.push({
              name: key,
              children: val,
            })
          })

          if (this.categoryId) {
            const tmpArr = []
            this.classifyList.forEach(
              (item) => item.children.length && item.children.forEach((v) => tmpArr.push(v)),
            )
            const classifyChildren = tmpArr.find((item) => item.id === this.categoryId)
            this.selectKeys = [this.categoryId]
            this.selectRows = [classifyChildren]
          }
        } catch (e) {
          console.log(e)
          // this.$u.toast(JSON.stringify(e))
        }
      },
      // 关闭操作
      closeHandler() {
        this.$emit('update:show', false)
      },
      // 选择条目
      chooseFn(item) {
        if (!this.selectKeys.includes(item.id)) {
          if (this.checkBox) {
            this.selectKeys.push(item.id)
            this.selectRows.push(item)
          } else {
            this.selectKeys.length = 0
            this.selectRows.length = 0
            this.selectKeys.push(item.id)
            this.selectRows.push(item)
          }
        } else {
          if (this.checkBox) {
            const index = this.selectKeys.findIndex((r) => r === item.id)
            this.selectKeys.splice(index, 1)
            this.selectRows.splice(index, 1)
          }
        }
        if (this.selectKeys.length) {
          const value = this.checkBox ? this.selectRows : this.selectRows[0]
          this.$emit('confirm', value)
          this.closeHandler()
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .classify {
  }

  .type {
    width: 670rpx;
    height: 100vh;
    box-sizing: border-box;

    &-flex1 {
      overflow-y: scroll;
    }

    &-nav {
      width: 670rpx;
      height: 80rpx;
      line-height: 54rpx;
      text-align: center;
      position: relative;

      &__absolute {
        position: absolute;
        right: 32rpx;
        top: 20rpx;
      }
    }

    .tips {
      padding-left: 32rpx;

      &-title {
        padding: 40rpx 32rpx 24rpx 0;
        font-size: 30rpx;
        height: 46rpx;
        line-height: 46rpx;
        color: $v-c0-85;
      }

      &-template {
        display: flex;
        align-items: center;
        &__choose1 {
          width: 168rpx;
          font-size: 24rpx;
          border-radius: 80rpx;
          padding: 14rpx 0rpx;
          margin-bottom: 24rpx;
          margin-right: 48rpx;
          text-align: center;
        }
        &__choose2 {
          width: 384rpx;
          font-size: 24rpx;
          border-radius: 80rpx;
          padding: 14rpx 0rpx;
          margin-bottom: 24rpx;
          margin-right: 48rpx;
          text-align: center;
        }
        &__choose3 {
          width: 600rpx;
          font-size: 24rpx;
          border-radius: 80rpx;
          padding: 14rpx 30rpx;
          margin-bottom: 24rpx;
          margin-right: 48rpx;
          text-align: center;
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
  }

  .select {
    color: $color-primary-yellow;
    background: $v-tags-btn-disabled;
    border: 2rpx solid $color-primary-yellow;
    box-sizing: border-box;
  }
</style>
