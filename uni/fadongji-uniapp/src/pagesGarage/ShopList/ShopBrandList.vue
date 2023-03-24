<template>
  <view>
    <view class="brand flex flex-column vh-full">
      <VoNav :left-width="240" :right-width="240" is-fixed is-have-more title="品牌" />
      <view class="brand-main overflow-hidden">
        <scroll-view
          :scroll-into-view="anchor"
          :scroll-with-animation="scrollWithAnimation"
          class="scroll-list"
          scroll-y
          @scroll="onScroll"
        >
          <view class="brand-list">
            <view
              :ref="item.initials"
              v-for="(item, index) in list"
              :id="item.initials"
              :key="index"
              class="brand-list--item"
            >
              <view v-if="item.list && item.list.length" class="brand-list--title">
                {{ item.initials }}
              </view>
              <view class="brand-list-content">
                <view
                  v-for="(b, i) in item.list"
                  :key="i"
                  :class="b.selected ? 'select' : ''"
                  class="brand-list--block"
                  @click="chooseBrand(b)"
                >
                  <view class="brand-logo">
                    <image :src="b.logoUrl" class="brand-logo-img" mode="aspectFit" />
                  </view>
                  <view class="brand-text">{{ b.name }}</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="btns">
        <view class="btns-item" @click.stop="reset()">重置</view>
        <view class="btns-item color" @click.stop="confirm()"
          >确定({{ selectList.length > 99 ? '99+' : selectList.length }})</view
        >
      </view>
    </view>
    <!--  索引：start	-->
    <view
      ref="brand-index"
      :style="{ top: $u.addUnit(letterInfo.top || 100) }"
      class="brand-index fz-0"
      @touchstart="touchStart"
      @touchmove.stop.prevent="touchMove"
      @touchend.stop.prevent="touchEnd"
      @touchcancel.stop.prevent="touchEnd"
    >
      <view
        v-for="(l, i) in indexListData"
        :key="i"
        :class="{ active: anchor === l.id }"
        class="brand-index--item"
      >
        {{ l.key }}
        <view v-if="touching" class="anchor-scale">{{ l.key }}</view>
      </view>
    </view>
    <!--  索引：end	-->
  </view>
</template>

<script>
  // 生成字母
  export default {
    name: 'Brand',
    props: {
      height: {
        type: String,
        default: 'calc(100vh - 88px)',
      },
    },
    data() {
      return {
        keyword: '',
        authFlag: false,
        show: false,
        scrollIntoView: '',
        scrollWithAnimation: true,
        showDirect: false,
        indicatorHeight: 40,
        anchor: 'A',
        indexListData: [],
        touching: false,
        // 索引字母的信息
        letterInfo: {
          height: 0,
          itemHeight: 0,
          top: 0,
        },
        customNavHeight: 0,
        myBrandCertifyDone: [],
        myBrandCertifyDoing: [],
        list: [],
        currentRow: null,
        checkboxValue: [],
        cheackAll: [],
        seriesList: [],
        showSeries: false,
        selectData: [], //存放选中id
        sureNum: 0,
        shopId: '',
        selectList: [],
        shopBrandChoosed: [],
      }
    },
    watch: {
      // 监听字母索引的变化，重新设置尺寸
      indexListData: {
        immediate: true,
        handler() {
          uni.$u.sleep().then(() => {
            this.setIndexListLetterInfo()
          })
        },
      },
      //监听列表
      // list: {
      //   handler(newValue, oldValue) {
      //     console.log('newValue', newValue)
      //     this.selectList = []
      //     if (newValue.length) {
      //       newValue.forEach((i) => {
      //         i.list.forEach((j) => {
      //           if (j.selected) {
      //             this.selectList.push(j)
      //           }
      //         })
      //       })
      //     }
      //     console.log('selectList', this.selectList)
      //   },
      //   deep: true,
      // },
    },
    onShow() {},
    mounted() {
      this.initData()
      //如果外部已选择车品牌,默认选中该品牌下所有车系
      // if (options.brandId && options.brandId != 'undefined') {
      //   this.list.forEach((a) => {
      //     a.list.forEach((b) => {
      //       if (b.id === options.brandId) {
      //         b.selected = true
      //       } else {
      //         b.selected = false
      //       }
      //     })
      //   })
      // }
    },
    onLoad(options) {
      this.shopId = options.shopId || ''
      this.setIndexListLetterInfo()
    },
    methods: {
      //回显已选中品牌
      setBrand() {
        let shopBrandChoosed = this.$storage.get('shopBrandChoosed')
        this.shopBrandChoosed = shopBrandChoosed ? shopBrandChoosed : []
        if (!this.shopBrandChoosed.length) {
          return
        }
        this.list.forEach((a) => {
          a.list.forEach((b) => {
            this.shopBrandChoosed.forEach((c) => {
              if (b.id === c.id) {
                b.selected = true
              }
            })
          })
        })
        this.$forceUpdate()
        this.setSelectList()
      },
      onScroll({ detail }) {
        // console.log(111, e.detail)
        // this.scrollTop = detail.scrollTop
        const { scrollTop } = detail
        const length = this.indexListData.length
        this.indexListData.forEach((item, index) => {
          if (index >= 0 && index <= length - 1) {
            const refScrollTopList = this.$refs[this.indexListData[index].id][0].$el.offsetTop
            const dis = refScrollTopList - scrollTop
            if (dis <= 0) {
              // this.anchorIndex = index
              this.anchor = item.id
            }
          }
        })
      },
      //搜索
      searchFn() {
        if (this.keyword) {
          this.list.forEach((item) => {
            item.list = item.list.filter((item) => item.name.indexOf(this.keyword) > -1)
          })
        } else {
          this.initData()
        }
      },
      // 选择品牌
      chooseBrand(item) {
        console.log('item', item.id)
        this.list.forEach((a) => {
          a.list.forEach((b) => {
            if (b.id === item.id) {
              b.selected = !b.selected
            }
          })
        })
        this.$forceUpdate()
        this.setSelectList()
      },
      //已选中
      setSelectList() {
        this.selectList = []
        this.list.forEach((i) => {
          i.list.forEach((j) => {
            if (j.selected) {
              this.selectList.push(j)
            }
          })
        })
        console.log('selectList', this.selectList)
      },
      //重置
      reset() {
        this.selectList = []
        this.list.forEach((i) => {
          i.list.forEach((j) => {
            j.selected = false
          })
        })
      },
      //确认
      confirm() {
        console.log('selectList', this.selectList)
        uni.$emit('select', this.selectList)
        // uni.$u.route('/pagesGarage/ShopList/ShopList?isSelectBack=1')
        this.$backFn()
      },
      // 初始化模板数据
      async initData() {
        try {
          let res = await this.$VoHttp.apiGoodsqueryBrandList({ shopId: this.shopId })
          let data = res.data
          if (+res.code === 20001) {
            console.log(data)
            this.list = this.$vocenApi._.orderBy(data, 'initials')
            this.list.forEach((i) => {
              i.list.forEach((j) => {
                j.selected = false
              })
            })
            this.setBrand()
            console.log('list', this.list)
            // 处理索引并处理渲染数据
            this.indexListData = this.list.map((item) => {
              return {
                id: item.initials,
                key: item.initials,
              }
            })
            this.anchor = this.indexListData[0].id
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.data.message)
        }
      },
      touchStart(e) {
        // 获取触摸点信息
        const touchStart = e.changedTouches[0]
        if (!touchStart) return
        this.touching = true
        const { pageY } = touchStart
        // 根据当前触摸点的坐标，获取当前触摸的为第几个字母
        const currentIndex = this.getIndexListLetter(pageY)
        this.setValueForTouch(currentIndex)
      },
      // 设置各项由触摸而导致变化的值
      setValueForTouch(currentIndex) {
        // 如果偏移量太小，前后得出的会是同一个索引字母，为了防抖，进行返回
        if (this.anchor === this.indexListData[currentIndex]) return
        this.anchor = this.indexListData[currentIndex].id
        this.scrollIntoView = this.anchor
      },
      touchMove(e) {
        // 获取触摸点信息
        let touchMove = e.changedTouches[0]
        if (!touchMove) return

        // 滑动结束后迅速开始第二次滑动时候 touching 为 false 造成不显示 indicator 问题
        if (!this.touching) {
          this.touching = true
        }
        this.scrollWithAnimation = false
        const { pageY } = touchMove
        const currentIndex = this.getIndexListLetter(pageY)
        this.setValueForTouch(currentIndex)
      },
      touchEnd() {
        // 延时一定时间后再隐藏指示器，为了让用户看的更直观，同时也是为了消除快速切换u-transition的show带来的影响
        uni.$u.sleep(300).then(() => {
          this.touching = false
          this.scrollWithAnimation = true
        })
      },
      // 获取索引信息
      setIndexListLetterInfo() {
        console.log(this.indexListData.length)
        this.getIndexListLetterRect().then((size) => {
          const { height } = size
          const sys = uni.$u.sys()
          const windowHeight = sys.windowHeight
          let customNavHeight = 0
          // 消除各端导航栏非原生和原生导致的差异，让索引列表字母对屏幕垂直居中
          if (this.customNavHeight == 0) {
            // #ifdef H5
            customNavHeight = sys.windowTop
            // #endif
            // #ifndef H5
            // 在非H5中，为原生导航栏，其高度不算在windowHeight内，这里设置为负值，后面相加时变成减去其高度的一半
            customNavHeight = -(sys.statusBarHeight + 44)
            // #endif
          } else {
            customNavHeight = uni.$u.getPx(this.customNavHeight)
          }
          this.letterInfo = {
            height,
            // 为了让字母列表对屏幕绝对居中，让其对导航栏进行修正，也即往上偏移导航栏的一半高度
            top: (windowHeight - height) / 2 + customNavHeight / 2 + 30,
            itemHeight: Math.floor(height / this.indexListData.length),
          }
        })
      },
      // 获取索引列表的尺寸以及单个字符的尺寸信息
      getIndexListLetterRect() {
        return new Promise((resolve) => {
          // 延时一定时间，以获取dom尺寸
          // #ifndef APP-NVUE
          this.$uGetRect('.brand-index').then((size) => {
            resolve(size)
          })
          // #endif

          // #ifdef APP-NVUE
          const ref = this.$refs['brand-index']
          dom.getComponentRect(ref, (res) => {
            resolve(res.size)
          })
          // #endif
        })
      },
      getIndexListLetter(pageY) {
        const { top, height, itemHeight } = this.letterInfo
        // 对H5的pageY进行修正，这是由于uni-app自作多情在H5中将触摸点的坐标跟H5的导航栏结合导致的问题
        // #ifdef H5
        pageY += uni.$u.sys().windowTop
        // #endif
        // 对第一和最后一个字母做边界处理，因为用户可能在字母列表上触摸到两端的尽头后依然继续滑动
        if (pageY < top) {
          return 0
        } else if (pageY >= top + height) {
          // 如果超出了，取最后一个字母
          return this.indexListData.length - 1
        } else {
          // 将触摸点的Y轴偏移值，减去索引字母的top值，除以每个字母的高度，即可得到当前触摸点落在哪个字母上
          return Math.floor((pageY - top) / itemHeight)
        }
      },
      // 锚点跳转
      anchorHandler(l) {
        this.anchor = l.id
        console.log(123123)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search-wrap {
    background: #fff;
    padding: 12rpx 32rpx;
    box-sizing: border-box;
  }
  .tab-fixed {
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 2;
  }
  .brand-main {
    position: relative;
    flex: 1;
    .scroll-list {
      height: 100%;
    }
    .series {
      position: absolute;
      right: 0;
      top: 0;
      width: 460rpx;
      height: 100%;
      z-index: 100;
    }
    .check-item {
      padding: 18rpx 24rpx;
      box-sizing: border-box;
    }
  }
  .btns {
    padding: 20rpx 32rpx;
    display: flex;
    background-color: #ffffff;
    border-top: 2rpx solid $v-bg-light;
    box-sizing: border-box;
    &-item {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      margin-right: 36rpx;
      font-size: 32rpx;
      box-sizing: border-box;
      text-align: center;
      color: $v-c0-85;
      border: 2rpx solid #d3d4db;
      border-radius: 100rpx;
      &.color {
        margin-right: 0;
        background: $color-primary-yellow;
        border: 2rpx solid $color-primary-yellow;
        color: #fff;
      }
    }
  }

  .brand-list--block {
    display: flex;
    align-items: center;
    padding: 24rpx 32rpx;
    background: #f7f7f8;
    // box-shadow: inset 0px -1px 0px #f1f1f3;
    &.select {
      background: #fff;
      .brand-text {
        color: $color-primary-yellow;
        font-weight: 500;
      }
    }

    .brand-logo {
      width: 48rpx;
      height: 48rpx;
      font-size: 0;
      margin-right: 24rpx;
      border-radius: 50%;
      overflow: hidden;

      .brand-logo-img {
        width: 48rpx;
        height: 48rpx;
      }
    }

    .brand-text {
      @include black-color(0.85);
      font-size: 28rpx;
      line-height: 1;
    }

    .brand-status {
      font-size: 0;
      margin-left: 24rpx;

      .brand-img {
        width: 106rpx;
        height: 36rpx;
      }
    }
  }

  .hot-logo {
    font-size: 0;

    .hot-logo-img {
      width: 82rpx;
      height: 82rpx;
    }
  }

  .hot-text {
    @include black-color(0.85);
    padding-top: 5rpx;
    font-size: 26rpx;
    line-height: 1.5;
  }

  .hot-list {
    display: flex;
    flex-wrap: wrap;
    padding: 24rpx 36rpx;

    .hot-item {
      width: 20%;
      text-align: center;
      margin-bottom: 20rpx;
    }
  }

  .brand-list {
    .brand-block {
      height: 120rpx;
    }

    &--item {
    }

    &--title {
      color: rgba(0, 0, 0, 0.45);
      font-size: 24rpx;
      padding: 12rpx 26rpx;
      background: linear-gradient(0deg, #ffffff, #ffffff), #fafbff;
    }

    &--content {
      .content-title {
        padding: 32rpx 32rpx 0 32rpx;
        @include black-size-color(28, 0.85);
        line-height: 1.5;
        font-weight: bold;

        &.all {
          padding: 32rpx;
        }
      }
    }
  }

  .brand {
    position: relative;
  }

  .brand-index {
    position: fixed;
    right: 0;
    padding: 0 12rpx;
    z-index: 102;

    &--item {
      height: 32rpx;
      width: 32rpx;
      line-height: 32rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20rpx;
      position: relative;

      .anchor-scale {
        position: absolute;
        transform: translate(-115%, -18rpx);
        top: 0;
        width: 66rpx;
        height: 66rpx;
        line-height: 66rpx;
        text-align: center;
        background-color: #fff;
        border-radius: 50%;
        font-weight: bold;
        box-shadow: 0px 4rpx 16rpx rgba(34, 40, 75, 0.15);
        background-color: $color-primary-yellow;
        display: none;
      }

      &.active {
        color: #ffffff;
        background-color: $color-primary-yellow;
        border-radius: 50%;
        position: relative;

        .anchor-scale {
          display: block;
        }
      }
    }
  }
</style>
