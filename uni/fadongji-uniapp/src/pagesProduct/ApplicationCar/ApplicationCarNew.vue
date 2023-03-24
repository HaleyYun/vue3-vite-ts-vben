<template>
  <view class="brand flex flex-column overflow-hidden">
    <VoNav id="nav" is-fixed is-have-more title="选择品牌" />
    <!--  品牌列表：start	-->
    <scroll-view
      :scroll-into-view="anchor"
      :scroll-with-animation="animation"
      class="bg-white flex1 overflow-y"
      scroll-y
      @scroll="scrollHandler"
    >
      <view class="brand-list p-b-safe-area">
        <view v-for="(l, i) in list" :id="l.initials" :key="i" class="brand-list--item">
          <!--	 #ifdef APP-->
          <u-sticky :offset-top="0">
            <view class="brand-list--title">{{ l.initials }}</view>
          </u-sticky>
          <!--	#endif-->
          <!--	#ifdef H5-->
          <u-sticky :offset-top="-44">
            <view class="brand-list--title">{{ l.initials }}</view>
          </u-sticky>
          <!--	 #endif-->

          <view class="brand-list-content">
            <view class="hot-list">
              <view
                v-for="(b, iv) in l.list"
                :key="iv"
                class="hot-item"
                @click="chooseBrandHandler(b)"
              >
                <view class="hot-logo">
                  <image :src="b.logo" class="hot-logo-img" mode="aspectFit" />
                </view>
                <view class="hot-text m-t-16 text-nowrap fz-b">
                  {{ b.name }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <!--  品牌列表：end	-->
    <!--  字母的选择：start	-->
    <view
      ref="brand-index"
      :style="{ top: $u.addUnit(letterInfo.top || 100), opacity: loadingIndex ? 0 : 1 }"
      class="brand-index fz-0"
      @touchstart="touchStart"
      @touchmove.stop.prevent="touchMove"
      @touchend.stop.prevent="touchEnd"
      @touchcancel.stop.prevent="touchEnd"
    >
      {{ anchorIndex }}
      <view
        v-for="(l, i) in indexListData"
        :key="i"
        :class="{ active: anchorIndex === i }"
        class="brand-index--item"
      >
        {{ l.key }}
        <view v-if="touching" class="anchor-scale">{{ l.key }}</view>
      </view>
    </view>
    <!--  字母的选择：end	-->
  </view>
</template>

<script>
  // 当前文件为历史文件-此页面以及功能已迁移至 pageCommon/CarTypeSearch 目录中
  // #ifdef APP-NVUE
  // 由于weex为阿里的KPI业绩考核的产物，所以不支持百分比单位，这里需要通过dom查询组件的宽度
  const dom = uni.requireNativePlugin('dom')
  // #endif
  export default {
    name: 'ApplicationCarNew',
    data() {
      return {
        customIndex: [],
        loading: false,
        animation: true,
        anchor: 'hot',
        anchorIndex: 0,
        indexListData: [],
        touching: false,
        // 索引字母的信息
        letterInfo: {
          height: 0,
          itemHeight: 0,
          top: 0,
        },
        customNavHeight: 0,
        list: [],
        hotList: [],
        filterList: [],
        // 来源： 1、供应商上货； 2、供应商修改货品； 3、修理厂首页； 4、修理厂买货列表； 5、修理厂买货店铺主页； 6、服务商首页； 7、服务商进货到店列表；
        // 8、服务商进货店铺项目列表； 9、服务商代客下单买货列表；
        origin: 1,
        scrollTopList: [],
        navHeight: 0,
        loadingIndex: true,
      }
    },
    watch: {
      // 监听字母索引的变化，重新设置尺寸
      indexListData: {
        immediate: true,
        handler(val) {
          if (!val.length) return
          this.$nextTick(() => {
            setTimeout(() => {
              uni.$u.sleep().then(() => {
                this.setIndexListLetterInfo()
              })
            }, 100)
          })
        },
      },
    },
    onLoad(options) {
      this.origin = +options.origin || 1
    },
    mounted() {
      this.initCarTypeList()
      this.initNavHeight()
    },
    methods: {
      initNavHeight() {
        let query = uni.createSelectorQuery().in(this)
        //需要给黄色区域设置一个id标识，在这里是demo
        query
          .select('#nav')
          .boundingClientRect((data) => {
            this.navHeight = data.height
          })
          .exec()
      },
      scrollHandler({ detail }) {
        const { scrollTop } = detail
        const length = this.indexListData.length
        this.indexListData
          .filter((item) => {
            return item.id !== 'brand-index'
          })
          .forEach((item, index) => {
            if (index > 0 && index < length - 1) {
              const refScrollTopList = this.scrollTopList[index] - this.navHeight
              const dis = refScrollTopList - scrollTop
              if (dis <= 0) {
                this.anchorIndex = index
              }
            }
          })
      },
      // 选择品牌
      chooseBrandHandler(item) {
        let url = ''
        switch (+this.origin) {
          case 1: // 供应商上货
            url = `/pagesProduct/ApplicableModel/AddCarModel?id=${item.id}`
            break
          case 2: // 供应商修改货品
            url = `/pagesProduct/ApplicableModel/AddCarModel?id=${item.id}`
            break
          case 3: // 修理厂首页
          case 4: // 修理厂买货列表
          case 5: // 修理厂买货店铺主页
            // 跳转到选择车系
            let targetUrl = ''
            if (+this.origin === 5) {
              targetUrl = '/pagesGarage/GlobalSearch/QueryApplicationResult'
            }
            if (+this.origin === 4) {
              targetUrl = '/pagesAgent/GlobalSearch/QueryApplicationResult'
            }
            if (+this.origin === 3) {
              targetUrl = '/pagesAgent/VinTell/VinApplicationTell'
            }
            const target = {
              url: targetUrl, // 根据来源则判断路由最终跳转地址
              from: '/pagesProduct/ApplicationCar/ApplicationCarNew?origin=' + this.origin,
              navData: {
                name: item.name,
                logo: item.logo,
              },
              // 搜索参数
              queryParams: {
                brandId: item.id,
              },
              routeInfoList: [
                {
                  name: '所有品牌',
                  query: {},
                },
                {
                  name: item.name,
                  query: {
                    brandId: item.id,
                  },
                },
              ],
            }
            this.$storage.set('CarTypeChooseProgress', target)
            this.$linkToEasy('/pagesCommon/CarTypeSearch/ChooseCarSeries')
            return
            break
          case 6: // 服务商首页
            url = ''
            break
          case 7: // 服务商进货到店列表
            url = ''
            break
          case 8: // 服务商进货店铺项目列表
            url = ''
            break
          case 9: // 服务商代客下单买货列表
            url = ''
            break
        }
        if (!url) return
        this.$linkToEasy(url)
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
        if (this.timer) clearTimeout(this.time)
        this.timer = setTimeout(() => {
          this.anchor = this.indexListData[currentIndex].id
          this.anchorIndex = currentIndex
        }, 100)
      },
      touchMove(e) {
        // 获取触摸点信息
        let touchMove = e.changedTouches[0]
        if (!touchMove) return

        // 滑动结束后迅速开始第二次滑动时候 touching 为 false 造成不显示 indicator 问题
        if (!this.touching) {
          this.touching = true
        }
        this.animation = false
        const { pageY } = touchMove
        const currentIndex = this.getIndexListLetter(pageY)
        this.anchorIndex = currentIndex
        this.setValueForTouch(currentIndex)
      },
      touchEnd() {
        // 延时一定时间后再隐藏指示器，为了让用户看的更直观，同时也是为了消除快速切换u-transition的show带来的影响
        uni.$u.sleep(300).then(() => {
          this.touching = false
          this.animation = true
        })
      },
      setIndexListLetterInfo() {
        this.getIndexListLetterRect().then((size) => {
          const { height } = size
          const sys = uni.$u.sys()
          const windowHeight = sys.windowHeight
          this.letterInfo = {
            height,
            // 为了让字母列表对屏幕绝对居中，让其对导航栏进行修正，也即往上偏移导航栏的一半高度
            top: (windowHeight - height) / 2,
            itemHeight: Math.floor(height / this.indexListData.length),
          }
          this.loadingIndex = false
        })
      },
      // 处理每个渲染节点的高度存储起来
      calcRefScrollItemTop() {
        this.scrollTopList.length = 0
        this.indexListData
          .filter((item) => {
            return item.id !== 'brand-index'
          })
          .forEach((item) => {
            let query = uni.createSelectorQuery().in(this)
            //需要给黄色区域设置一个id标识，在这里是demo
            query
              .select('#' + item.id)
              .boundingClientRect((data) => {
                this.scrollTopList.push(data.top)
              })
              .exec()
          })
      },
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
      // 初始化车型品牌列表
      async initCarTypeList() {
        try {
          this.loading = true
          const { data, code } = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectOne()
          this.loading = false
          if (+code === 20001) {
            this.hotList = data.hotList
            this.list = this.$vocenApi._.orderBy(data.detail, 'initials')
            this.filterList = this.$vocenApi._.cloneDeep(this.list)
            // console.log('222222222222222', this.list)
            // 处理索引并处理渲染数据
            const lList = this.hotList.length
              ? this.customIndex.concat(
                  this.list.map((item) => {
                    return {
                      id: item.initials,
                      key: item.initials,
                    }
                  }),
                )
              : this.list.map((item) => {
                  return {
                    id: item.initials,
                    key: item.initials,
                  }
                })
            this.indexListData = [...lList]
            this.anchor = this.indexListData[0].id
            this.anchorIndex = 0
            this.$nextTick(() => {
              setTimeout(() => {
                this.calcRefScrollItemTop()
              }, 100)
            })
            // 临时缓存，防止频繁请求
            // this.$storage.set('BrandHotList', this.hotList)
            // this.$storage.set('BrandList', this.list)
            // this.$storage.set('indexListData', this.indexListData)
          }
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .brand {
    width: 100vw;
    height: 100vh;
  }
  .brand-list--block {
    display: flex;
    align-items: center;
    padding: 24rpx 32rpx;

    .brand-logo {
      width: 48rpx;
      height: 48rpx;
      font-size: 0;
      margin-right: 24rpx;

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
  }

  .hot-logo {
    font-size: 0;

    .hot-logo-img {
      width: 72rpx;
      height: 72rpx;
    }
  }

  .hot-text {
    @include black-color(0.85);
    padding-top: 5rpx;
    font-size: 24rpx;
  }

  .hot-list {
    display: flex;
    flex-wrap: wrap;
    padding: 24rpx 36rpx;

    .hot-item {
      width: 20%;
      text-align: center;
      margin-bottom: 40rpx;
    }
  }

  .brand-list {
    &--item {
    }

    &--title {
      color: rgba(0, 0, 0, 0.45);
      font-size: 24rpx;
      padding: 12rpx 26rpx;
      background-color: #f7f7f8;
    }

    &--content {
    }
  }

  .brand {
    position: relative;
  }

  .brand-index {
    position: fixed;
    right: 0;
    padding: 0 12rpx;
    z-index: 100000;
    padding-left: 24rpx;

    &--item {
      height: 32rpx;
      width: 32rpx;
      line-height: 32rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.65);
      font-size: 20rpx;
      margin: 12rpx 0;
      .anchor-scale {
        position: absolute;
        transform: translate(-115%, -18rpx);
        top: 0;
        width: 66rpx;
        height: 66rpx;
        right: 12rpx;
        line-height: 66rpx;
        text-align: center;
        background-color: #fff;
        border-radius: 50%;
        font-weight: bold;
        box-shadow: 0px 4rpx 16rpx rgba(34, 40, 75, 0.15);
        color: $color-primary-yellow;
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
