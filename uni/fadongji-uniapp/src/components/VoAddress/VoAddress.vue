<template>
  <u-popup :show="show" mode="bottom" @close="close">
    <view
      class="address flex flex-column"
      @touchmove.stop.prevent="
        () => {
          return
        }
      "
    >
      <view class="address-title color-block"> 选择所在的地区 </view>
      <view class="address-area">
        <view
          v-if="selectCodeArr[0]"
          class="address-area__item flex flex-vertical-c"
          @click="clickChangeCurrent(0)"
        >
          <view class="item-left flex">
            <view class="flex1 item-line" />
            <VoIcon :size="20" class="m-l-auto" color="#ff5319" name="address_no_yellow" />
            <!--                <VoIcon :size="20" color="#bfbfbf" class="m-l-auto" name="address_select"></VoIcon>-->
            <view class="flex1 item-line line-bottom" />
          </view>
          <view
            :class="{ 'color-block-weight': true }"
            class="item-content fz-28 flex1 fz-b overEllipsis color-block-45"
          >
            {{ selectCodeArr[0].name }}
          </view>
          <VoIcon :size="20" class="m-l-auto" color="#bfbfbf" name="right-arrow" />
        </view>

        <view
          v-if="selectCodeArr[0]"
          class="address-area__item flex flex-vertical-c"
          @click="clickChangeCurrent(1)"
        >
          <view class="item-left flex">
            <view class="flex1 item-line line-top" />
            <VoIcon
              v-if="selectCodeArr[1]"
              :size="20"
              class="m-l-auto"
              color="#ff5319"
              name="address_no_yellow"
            />
            <VoIcon v-else :size="20" class="m-l-auto" color="#bfbfbf" name="address_select" />
            <view v-if="selectCodeArr[1]" class="flex1 item-line line-bottom" />
            <view v-else class="flex1 item-line" />
          </view>
          <view
            :class="{ 'color-block-weight': selectCodeArr[1] }"
            class="item-content fz-28 flex1 fz-b overEllipsis color-block-45"
          >
            {{ selectCodeArr[1] ? selectCodeArr[1].name : '选择城市' }}
          </view>
          <VoIcon :size="20" class="m-l-auto" color="#bfbfbf" name="right-arrow" />
        </view>

        <view
          v-if="selectCodeArr[1]"
          class="address-area__item flex flex-vertical-c"
          @click="clickChangeCurrent(2)"
        >
          <view class="item-left flex">
            <view class="flex1 item-line line-top" />
            <VoIcon
              v-if="selectCodeArr[2]"
              :size="20"
              class="m-l-auto"
              color="#ff5319"
              name="address_no_yellow"
            />
            <VoIcon v-else :size="20" class="m-l-auto" color="#bfbfbf" name="address_select" />
            <view class="flex1 item-line" />
          </view>

          <view
            :class="{ 'color-block-weight': selectCodeArr[2] }"
            class="item-content fz-28 flex1 fz-b overEllipsis color-block-45"
          >
            {{ selectCodeArr[2] ? selectCodeArr[2].name : '选择区/县' }}
          </view>
          <VoIcon :size="20" class="m-l-auto" color="#bfbfbf" name="right-arrow" />
        </view>

        <view class="address-area__title">
          {{ getShowName() }}
        </view>
      </view>

      <swiper :current="current" class="flex1" @change="changeCurrent">
        <swiper-item>
          <scroll-view
            :scroll-into-view="scrollProId"
            :scroll-y="true"
            class="address-area__scroll"
          >
            <VoLetter
              ref="provinceRef"
              :indexListData="indexListData[0]"
              @sure="sureProvinceFn($event, 0)"
            />
            <block v-for="(list, listIndex) of addressArr[0]" :key="listIndex">
              <view :id="list.key" class="scroll-title">
                {{ list.key }}
              </view>
              <view
                v-for="(it, itIndex) of list.value"
                :key="itIndex"
                class="scroll-item"
                @click="selectArea(0, it)"
              >
                {{ it.name }}
              </view>
            </block>
          </scroll-view>
        </swiper-item>

        <swiper-item>
          <scroll-view
            :scroll-into-view="scrollCityId"
            :scroll-y="true"
            class="address-area__scroll"
          >
            <VoLetter
              ref="provinceRef"
              :indexListData="indexListData[1]"
              @sure="sureProvinceFn($event, 1)"
            />
            <block v-for="(list, listIndex) of addressArr[1]" :key="listIndex">
              <view :id="list.key" class="scroll-title">
                {{ list.key }}
              </view>
              <view
                v-for="(it, itIndex) of list.value"
                :key="itIndex"
                class="scroll-item"
                @click="selectArea(1, it)"
              >
                {{ it.name }}
              </view>
            </block>
          </scroll-view>
        </swiper-item>

        <swiper-item>
          <scroll-view
            :scroll-into-view="scrollAreaId"
            :scroll-y="true"
            class="address-area__scroll"
          >
            <VoLetter
              ref="provinceRef"
              :indexListData="indexListData[2]"
              @sure="sureProvinceFn($event, 2)"
            />
            <block v-for="(list, listIndex) of addressArr[2]" :key="listIndex">
              <view :id="list.key" class="scroll-title">
                {{ list.key }}
              </view>
              <view
                v-for="(it, itIndex) of list.value"
                :key="itIndex"
                class="scroll-item"
                @click="selectArea(2, it)"
              >
                {{ it.name }}
              </view>
            </block>
          </scroll-view> </swiper-item
        >s
      </swiper>
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'VoAddress',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // 字母数据
        indexListData: [[], [], [], []],
        scrollProId: '',
        scrollCityId: '',
        scrollAreaId: '',
        // 滑动下标
        current: 0,
        // 数据数组
        addressArr: [],
        // 选择的code数组
        selectCodeArr: [],
      }
    },
    created() {
      this.initFn()
    },
    methods: {
      getShowName() {
        let str = ''
        switch (this.current) {
          case 0:
            str = '选择省份'
            break
          case 1:
            str = '选择城市'
            break
          case 2:
            str = '选择区/县'
            break
        }

        return str
      },
      /**
       * 选择区域
       */
      selectArea(index, it) {
        this.selectCodeArr[index] = it

        if (this.current < 2) {
          if (this.current == 0) {
            this.selectCodeArr = []
            this.selectCodeArr[0] = it
          } else if (this.current == 1) {
            const pro = this.selectCodeArr[0]
            this.selectCodeArr = []
            this.selectCodeArr[0] = pro
            this.selectCodeArr[1] = it
          }
          this.current++
          this.initFn()
        } else {
          this.$emit('update:show', false)

          this.$emit('sureFn', this.selectCodeArr)
        }

        this.$forceUpdate()
      },
      /**
       * @param list  要操作的数组
       * @param name  根据name重组数组
       */
      transFrom(list, name) {
        let result = new Map()
        let resultArr = []
        list.forEach((item) => {
          let key = result.get(item[name]) || []
          key.push(item)
          result.set(item[name], key)
        })

        result.forEach((item, index) => {
          resultArr.push({
            key: index,
            value: item,
          })
        })

        return resultArr
      },
      /**
       * 字母排序
       */
      alphabeticalOrderFn(list) {
        return list.sort(function (s1, s2) {
          const x1 = s1.key.toUpperCase()
          const x2 = s2.key.toUpperCase()
          if (x1 < x2) {
            return -1
          }
          if (x1 > x2) {
            return 1
          }
          return 0
        })
      },
      /**
       * 初始化数据
       */
      initFn() {
        let parentCode = '86'
        if (this.selectCodeArr.length > 0) {
          parentCode = this.selectCodeArr[this.current - 1].code
        }

        this.$VoHttp.apiSixhotAreaSub({ parentCode }).then((res) => {
          console.log({
            apiSixhotAreaSub: res,
          })
          const addressResult = this.transFrom(res.data, 'sortCode')

          this.addressArr[this.current] = this.alphabeticalOrderFn(addressResult)

          let resultData = []

          this.addressArr[this.current].map((item) => {
            resultData.push({ key: item.key, id: item.key })
          })

          this.indexListData[this.current] = this.alphabeticalOrderFn(resultData)
          this.$forceUpdate()
        })
      },
      /**
       * 点击
       */
      sureProvinceFn(e, index) {
        if (index == 0) {
          this.scrollProId = e
        } else if (index == 1) {
          this.scrollCityId = e
        } else if (index == 2) {
          this.scrollAreaId = e
        }
      },
      /**
       * 点击省市区 切换
       */
      clickChangeCurrent(index) {
        this.current = index
      },
      /*
       * 切换swiper
       */
      changeCurrent(e) {
        this.current = e.detail.current
      },
      close() {
        this.$emit('update:show', false)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .address {
    height: 70vh;
    display: flex;
    flex-direction: column;
    &-title {
      width: 750rpx;
      height: 88rpx;
      text-align: center;
      line-height: 88rpx;
      font-size: 32rpx;
      font-weight: bold;
    }
    &-area {
      &__item {
        width: 100%;
        height: 96rpx;
        box-sizing: border-box;
        padding: 0rpx 38rpx 0rpx 32rpx;
        .item-left {
          height: 96rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          .item-line {
            width: 6rpx;
          }
          .line-top {
            background-color: $v-tags-btn-disabled;
            border-bottom-left-radius: 22rpx;
            border-bottom-right-radius: 22rpx;
          }
          .line-bottom {
            background-color: $v-tags-btn-disabled;
            border-top-left-radius: 22rpx;
            border-top-right-radius: 22rpx;
          }
        }
        .item-content {
          height: 96rpx;
          line-height: 96rpx;
          margin-left: 50rpx;
          margin-right: 20rpx;
        }
      }
      &__title {
        padding: 40rpx 32rpx 16rpx;
        font-size: 28rpx;
        color: #000000;
        line-height: 150%;
        font-weight: bold;
      }
      &__scroll {
        height: 100%;
        overflow-y: scroll;
        position: relative;
        padding: 0rpx 0rpx 0rpx 32rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.85);
        .scroll-title {
          width: 100%;
          height: 72rpx;
          line-height: 72rpx;
          padding: 0rpx 8rpx;
        }
        .scroll-item {
          line-height: 96rpx;
          height: 96rpx;
          width: 100%;
          padding: 0rpx 8rpx;
        }
      }
    }

    .color-block-weight {
      color: rgba(0, 0, 0, 0.85) !important;
    }
  }
</style>
