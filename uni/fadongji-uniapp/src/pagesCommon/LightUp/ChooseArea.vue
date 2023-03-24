<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="brand flex flex-column"
  >
    <VoNav :is-fixed="false" is-have-more title="选择城市" />
    <view class="border-bold">
      <view class="setting-title flex flex-justify-between">
        <view class="flex flex-vertical-c">
          <VoIcon class="m-r-8" :opacity="0.85" :size="16" color="#000000" name="address" />
          {{ currentCity }}
        </view>
        <view class="color-block-45 flex flex-vertical-c" @click="getLocation">
          重新获取
          <VoIcon class="m-l-8" :opacity="0.85" :size="16" color="#000000" name="refresh-new" />
        </view>
      </view>
    </view>
    <view class="color-block border-bold fz-30 p-l-32 py-24">更多区域</view>
    <view class="brand-content flex1 overflow-hidden">
      <scroll-view
        :scroll-into-view="currentLetter"
        :scroll-y="true"
        class="brand-content__left"
        @scroll="scrolling"
      >
        <view v-for="(p, i) in list" :key="p.id">
          <block v-if="currentCityCode">
            <view v-if="!i" id="_1" :key="i" class="sortCode"> # </view>
            <view
              class="sortCode"
              :id="p.sortCode"
              v-else-if="list[i - 1] && list[i].sortCode !== list[i - 1].sortCode"
            >
              {{ p.sortCode }}
            </view>
          </block>
          <block v-else>
            <view
              :id="p.sortCode"
              class="sortCode"
              v-if="!i || (list[i - 1] && list[i].sortCode !== list[i - 1].sortCode)"
            >
              {{ p.sortCode }}
            </view>
          </block>
          <view :class="{ 'left-active': i === tabOneIndex }" class="left-item">
            <view class="flex flex-vertical-c">
              <!-- <template v-if="selectKey.includes(p.code)"> -->
              <!--              <VoIcon-->
              <!--                v-if="p.selectStatus == 'all'"-->
              <!--                :size="28"-->
              <!--                color="#FF5319"-->
              <!--                name="select-right"-->
              <!--                @click="cancelTreeDataAll(p, true)"-->
              <!--              />-->
              <!--              <VoIcon-->
              <!--                v-else-if="p.selectStatus == 'half'"-->
              <!--                :size="28"-->
              <!--                color="#FF5319"-->
              <!--                name="half-check"-->
              <!--                @click="tabOneCheckHandler(p, i)"-->
              <!--              />-->
              <!--              <VoIcon-->
              <!--                v-else-->
              <!--                :size="28"-->
              <!--                color="#D9D9D9"-->
              <!--                name="circle"-->
              <!--                @click="tabOneCheckHandler(p, i)"-->
              <!--              />-->
              <view
                v-if="selectKey.includes('1')"
                class="m-l-5 active"
                @click="chooseTabOneHandler(p, i)"
              >
                {{ p.name }}
              </view>
              <view v-else class="m-l-5 w-120" @click="chooseTabOneHandler(p, i)">
                {{ p.name }}
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <scroll-view
        :scroll-into-view="scrollIntoView"
        :scroll-top="scrollTop"
        :scroll-y="true"
        class="brand-content__right"
        scroll-with-animation
      >
        <view id="collapse">
          <view class="u-collapse-content fz-0 p-l-24 p-r-24 border-box">
            <!--            <view class="color-block-yellow fz-26 m-b-30 p-l-10">已选中{{ selectKey.length }}</view>-->
            <!--            <view class="flex flex-vertical-c m-b-20" @click.stop>-->
            <!--              &lt;!&ndash; <template v-if="selectKey.includes(cityChoose.code)"> &ndash;&gt;-->
            <!--              <VoIcon-->
            <!--                v-if="currentSelect.selectStatus == 'all'"-->
            <!--                :size="28"-->
            <!--                color="#FF5319"-->
            <!--                name="select-right"-->
            <!--                @click="cancelTreeDataAll(currentSelect)"-->
            <!--              />-->
            <!--              <VoIcon-->
            <!--                v-else-if="currentSelect.selectStatus == 'half'"-->
            <!--                :size="28"-->
            <!--                color="#FF5319"-->
            <!--                name="half-check"-->
            <!--                @click="tabOneCheckHandler(currentSelect)"-->
            <!--              />-->
            <!--              <VoIcon-->
            <!--                v-else-->
            <!--                :size="28"-->
            <!--                color="#D9D9D9"-->
            <!--                name="circle"-->
            <!--                @click="tabOneCheckHandler(currentSelect)"-->
            <!--              />-->
            <!--              <view class="fz-30 color-block"> 全选</view>-->
            <!--            </view>-->
            <view
              class="flex right-list flex-wrap"
              v-if="currentSelect && Object.keys(currentSelect)"
            >
              <view
                v-for="(t, s) in currentSelect.children"
                :key="s"
                :class="{ active: selectKey.includes(t.code) }"
                class="right-item"
                @click="selectAreaHandler(t, currentSelect)"
              >
                <view class="right-item--inner">{{ t.name }}</view>
              </view>
            </view>
          </view>
          <view v-if="letter && letter.length" class="fixed_letter">
            <block v-for="(item, index) in letter">
              <view
                :key="item"
                :class="{
                  letterActive: item == currentLetter || (!index && currentLetter == '_1'),
                }"
                @click="scrollToId(item, index)"
                >{{ item }}
              </view>
            </block>
          </view>
        </view>
      </scroll-view>
    </view>

    <view v-if="!preview" class="p-b-safe-area">
      <view class="flex py-20 flex-vertical-c flex-justify-between">
        <EraButton
          class="brand-fixed__button m-l-32"
          size="large"
          text="重置"
          themeType="Default"
          @click="resetHandler"
        />
        <u-button
          class="brand-fixed__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="确定"
          @click="confirmHandler"
        />
      </view>
    </view>
    <view v-else class="p-b-safe-area">
      <view class="flex py-20 flex-vertical-c flex-justify-between">
        <u-button
          class="brand-fixed__button"
          color="#22284b"
          hoverStartTime="999999"
          hoverStayTime="0"
          plain
          shape="circle"
          size="large"
          text="返回"
          @click="$backFn"
        />
      </view>
    </view>
  </view>
</template>

<script>
  import helpUtil from '@/common/helper'

  export default {
    name: 'SaleArea',
    data() {
      return {
        currentSelect: {},
        currentCity: '',
        currentCityId: '',
        currentCityCode: '',
        title: '',
        scrollIntoView: '',
        scrollTop: 0,
        selectKey: [],
        tabOneSelectKey: [],
        tabTwoSelectKey: [],
        collapseValue: [],
        list: [],
        tabOneIndex: -1,
        tabOneOldIndex: -1,
        tabOneId: '',
        // tabTwoList: [],
        tabTwoIndex: -1,
        checkMap: null,
        leafTreeMap: null,
        leafData: [],
        allDataChecked: [],
        preview: false,
        currentLetter: 'A',
        btnGroup: [
          {
            label: '全部区域',
            value: '',
          },
          {
            label: '10公里',
            value: 10,
          },
          {
            label: '20公里',
            value: 20,
          },
          {
            label: '50公里内',
            value: 50,
          },
          {
            label: '50公里外',
            value: 9999,
          },
        ],
        currentTag: {
          label: '全部区域',
          value: '',
        },
      }
    },
    computed: {
      letter() {
        let arr = [
          ...new Set(
            this.list.map((item) => {
              return item.sortCode
            }),
          ),
        ]
        if (this.currentCityCode) {
          arr.sort((a, b) => {
            if (a > b) return 1
            else return -1
          })
          arr.unshift('#')
        }
        return arr
      },
    },
    watch: {
      selectKey(newValue, oldValue) {
        if (newValue && newValue.length) {
          this.currentTag = ''
        }
      },
    },
    onShow() {},
    methods: {
      getLocation() {
        helpUtil
          .getLocation()
          .then((res) => {
            this.getAddressArea({ latitude: res.latitude, longitude: res.longitude })
          })
          .catch(() => {
            this.getAddressArea()
            this.currentCity = '当前未开启定位'
          })
      },
      scrollToId(item, index) {
        if (!index && this.currentCityCode) {
          this.currentLetter = '_1'
        } else {
          this.currentLetter = item
        }
      },
      scrolling(val) {
        console.log(val)
      },
      //选择当前位置
      locChoose(item) {
        this.currentTag = item
        this.selectKey = []
        this.list.forEach((item) => {
          item.selectStatus = 'empty'
        })
      },
      //重置
      resetHandler() {
        this.selectKey = []
        this.currentTag = ''
        this.list.forEach((item) => {
          item.selectStatus = 'empty'
        })
      },
      confirmHandler() {
        const leafData = this.transferLeafData()
        // console.log(leafData);
        if (!leafData.length) {
          this.$u.toast('请选择城市')
          return
        }
        // let obj = {
        //   areaData: this.selectKey.includes('1') ? ['1'] : leafData,
        //   locData: this.currentTag,
        // }
        uni.$emit('addressFn', leafData[0])
        this.$backFn()
      },
      // 获取叶子节点
      transferLeafData() {
        const list = []
        this.$vocenApi.VoUtils.treeMap(this.list, {
          children: 'children',
          conversion: (item) => {
            if (!item.children) {
              // 非子节点
              const flag = this.selectKey.includes(item.code)
              if (flag) {
                list.push({
                  name: item.name,
                  code: item.code,
                })
              }
            }
          },
        })
        return list
      },
      // 取消全部和本省
      cancelTreeDataAll(item) {
        if (this.selectKey.includes(item.code)) {
          this.selectKey.splice(
            this.selectKey.findIndex((child) => child == item.code),
            1,
          )
        }
        item.children.forEach((child) => {
          if (this.selectKey.includes(child.code)) {
            this.selectKey.splice(
              this.selectKey.findIndex((it) => it == child.code),
              1,
            )
          }
        })
        item.selectStatus = 'empty'
      },

      tabOneCheckHandler(item, index) {
        if (!this.selectKey.includes(item.code)) this.selectKey.push(item.code)
        item.children.forEach((child) => {
          if (!this.selectKey.includes(child.code)) {
            this.selectKey.push(child.code)
          }
        })
        item.selectStatus = 'all'
      },

      // 区域的选择
      selectAreaHandler(item, two) {
        if (this.preview) return
        // if (this.selectKey.includes(item.code)) {
        //   const index = this.selectKey.findIndex((i) => i === item.code)
        //   this.selectKey.splice(index, 1)
        //   const isSome = two.children.some((i) => {
        //     return this.selectKey.includes(i.code)
        //   })
        //   if (isSome) two.selectStatus = 'half'
        //   else {
        //     this.selectKey.splice(
        //       this.selectKey.findIndex((j) => j == two.code),
        //       1,
        //     )
        //     two.selectStatus = 'empty'
        //   }
        // } else {
        //   const isEvery = two.children.every((i) => {
        //     return this.selectKey.includes(i.code)
        //   })
        //   if (isEvery) {
        //     if (!this.selectKey.includes(two.code)) {
        //       this.selectKey.push(two.code)
        //     }
        //     two.selectStatus = 'all'
        //   } else {
        //     this.selectKey.splice(
        //       this.selectKey.findIndex((j) => j == two.code),
        //       1,
        //     )
        //     two.selectStatus = 'half'
        //   }
        //
        //   if (!this.selectKey.includes(two.code)) {
        //     this.selectKey.push(two.code)
        //   }
        //
        //   this.selectKey.push(item.code)
        // }
        this.selectKey = [item.code]
      },
      // 一级区域的选择
      chooseTabOneHandler(data, index) {
        if (this.tabOneIndex === index) return
        this.tabOneIndex = index
        let isSome = data.children.some((item) => {
          return this.selectKey.includes(item.code)
        })
        let isEvery = data.children.every((item) => {
          return this.selectKey.includes(item.code)
        })
        // if (isSome && !isEvery) {
        //   this.currentStatus = 'half'
        // } else if (isEvery) {
        //   this.currentStatus = 'all'
        // } else {
        //   this.currentStatus = 'empty'
        // }
        this.currentSelect = data
        console.log(this.currentSelect, '------------')
      },
      async getAddressArea(val) {
        if (val) {
          const res = await this.$VoHttp.apiAreaProvinceSub({
            latitude: val.latitude,
            longitude: val.longitude,
          })
          console.log(res)
          this.currentCity = res.data.districtName
          this.currentCityId = res.data.districtCode
          this.currentCityCode = res.data.cityCode
        }
        const cityList = await this.$VoHttp.apiAreaProvinceTree()
        this.list = []
        cityList.data.forEach((item) => {
          this.list.push(...item.children)
        })

        this.list.sort((a, b) => {
          if (a.sortCode > b.sortCode) {
            return 1
          } else {
            return -1
          }
        })
        if (this.currentCityCode) {
          const index = this.list.findIndex((item) => item.code == this.currentCityCode)
          this.list.unshift(...this.list.splice(index, 1))
        }
        this.list.forEach((item) => {
          if (
            item?.children?.every((info) => {
              return this.selectKey.includes(info.code)
            })
          ) {
            item.selectStatus = 'all'
          } else if (
            item.children?.some((info) => {
              return this.selectKey.includes(info.code)
            })
          ) {
            item.selectStatus = 'half'
          } else {
            item.selectStatus = 'empty'
          }
        })
        this.currentSelect = this.list[0]
        this.tabOneIndex = 0
      },
    },
    onLoad(options) {
      this.preview = !!options.preview
      //   const engineerArea = this.$storage.get('engineerArea')
      //   if (engineerArea.areaData && engineerArea.areaData.length) {
      //     this.selectKey = engineerArea.areaData.map((item) => {
      //       return item.code
      //     })
      //   }
      //   if (engineerArea.locData) {
      //     this.currentTag = engineerArea.locData
      //   } else {
      //     this.currentTag.value = ''
      //   }
      this.getLocation()
    },
  }
</script>

<style lang="scss" scoped>
  .brand {
    .global-area {
      background-color: #f6f7f8;
      position: relative;

      &.active {
        background-color: #fff;

        &:after {
          content: '';
          width: 6rpx;
          height: 100rpx;
          position: absolute;
          left: 0rpx;
          top: 0rpx;
          background-color: $color-primary-yellow;
        }
      }
    }

    .right-list {
      margin: 0 -10rpx;
    }

    .close-icon {
      color: rgba(0, 0, 0, 0.45);
      font-size: 24rpx;
    }

    width: 750rpx;
    background: #ffffff;
    overflow: hidden;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &-content {
      flex: 1;
      width: 750rpx;
      display: flex;

      &__left {
        width: 200rpx;
        height: 100%;
        background-color: #f6f7f8;

        .left-item {
          box-sizing: border-box;
          width: 100%;
          text-align: center;
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.85);
          white-space: nowrap;
          overflow-x: hidden;
          text-overflow: ellipsis;
          padding: 24rpx 10rpx;
          position: relative;
          display: flex;
          justify-content: flex-start;
        }

        .left-active {
          background-color: #ffffff !important;
          color: $color-primary-yellow;
        }

        .active {
          color: $color-primary-yellow;
        }

        .left-active:after {
          content: '';
          width: 6rpx;
          height: 100%;
          position: absolute;
          left: 0rpx;
          top: 0rpx;
          background-color: $color-primary-yellow;
        }
      }

      &__right {
        flex: 1;
        padding: 0;

        .right-item {
          width: 220rpx;
          padding: 0rpx 10rpx;
          box-sizing: border-box;
          margin-bottom: 24rpx;
          overflow-x: hidden;

          &.active {
            .right-item--inner {
              background: #ffece5 !important;
              border: 2rpx solid #ff6633 !important;
              line-height: 60rpx !important;
              color: #ff5319 !important;
            }
          }

          &--inner {
            border: 2rpx solid transparent;
            height: 64rpx;
            line-height: 60rpx !important;
            text-align: center;
            background: #f7f7f8;
            border-radius: 64rpx;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.85);
            white-space: nowrap;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .right-active {
          background: #feecee !important;
          border: 2rpx solid #f7909c !important;
          line-height: 60rpx !important;
          color: #e50012 !important;
        }
      }
    }

    &-fixed {
      width: 750rpx;
      padding: 20rpx 32rpx;
      border-top: 2rpx solid #f7f7f8;
      box-sizing: border-box;
      background-color: #fff;
      z-index: 99;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;

      &__button {
        width: 326rpx;
        height: 92rpx;
      }

      &__color {
        opacity: 1 !important;
        background-color: #f6f7f8 !important;
        color: rgba(0, 0, 0, 0.25) !important;
      }
    }

    .setting-title {
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
      padding: 32rpx;
      box-sizing: border-box;
    }

    .border-bold {
      border-top: 16rpx solid #f6f7f8;
    }
  }

  .sortCode {
    font-size: 24rpx;
    color: rgba(0, 0, 0, 0.45);
    background: #f7f7f8;
    height: 64rpx;
    line-height: 64rpx;
    padding-left: 32rpx;
  }

  .fixed_letter {
    position: fixed;
    top: 488rpx;
    right: 22rpx;
    font-size: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    > :nth-child(n) {
      width: 32rpx;
      height: 32rpx;
      margin-bottom: 5rpx;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      line-height: 32rpx;
    }

    .letterActive {
      background: #ff5319;
      border-radius: 50%;
      color: #fff;
    }
  }

  .w-120 {
    white-space: normal;
    width: 120rpx;
  }
</style>
