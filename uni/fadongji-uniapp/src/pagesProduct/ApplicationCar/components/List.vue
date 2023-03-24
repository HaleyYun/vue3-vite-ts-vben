<template>
  <view class="brand">
    <view class="page-full flex flex-column">
      <view class="search-box p-20 bg-white">
        <!-- <u-search
          v-model="searchValue"
          :actionStyle="actionStyle"
          :actionText="actionText"
          :show-action="true"
          bgColor="#F7F7F8"
          clearabled
          placeholder="请输入关键字搜索"
          placeholderColor="rgba(0, 0 ,0 ,0.25)"
          @clear="resetSearch"
          @custom="searchHandler"
        /> -->
          <VoSearch
            v-model="searchValue"
            height="34"
            placeholder="请输入关键字搜索"
            @custom="searchFn"
            @search="searchHandler"
          >
          </VoSearch>
      </view>
      <!--  品牌列表：start	-->
      <scroll-view
        :scroll-into-view="anchor"
        :scroll-with-animation="animation"
        :style="scrollViewStyle"
        class="bg-white flex1 scroll-height"
        scroll-y
        @scroll="scrollHandler"
      >
        <view class="brand-list">
          <view ref="hot" v-if="hotList.length" id="hot" class="brand-list--item">
            <view class="brand-list--title">热门品牌</view>
            <view class="brand-list--content">
              <view class="hot-list">
                <view
                  v-for="(h, i) in hotList"
                  :key="i"
                  class="hot-item"
                  @click="chooseBrandHandler(h)"
                >
                  <view class="hot-logo">
                    <image :src="h.logo" class="hot-logo-img" mode="aspectFit" />
                  </view>
                  <view class="hot-text m-t-16 text-nowrap">{{ h.name }}</view>
                </view>
              </view>
            </view>
          </view>
          <view v-for="(l, i) in list" :id="l.initials" :key="i" class="brand-list--item">
            <view :ref="l.initials" class="brand-list--title">{{ l.initials }}</view>
            <view class="brand-list-content">
              <view
                v-for="(b, iv) in l.list"
                :key="iv"
                class="brand-list--block"
                @click="chooseBrandHandler(b)"
              >
                <view class="brand-logo">
                  <image :src="b.logo" class="brand-logo-img" mode="aspectFit" />
                </view>
                <view class="brand-text">
                  {{ b.name }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <!--  品牌列表：end	-->
    </view>

    <!--  字母的选择：start	-->
    <view
      v-if="!loading"
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
        :class="{ active: anchorIndex === i }"
        class="brand-index--item"
      >
        {{ l.key }}
        <view v-if="touching" class="anchor-scale">{{ l.key }}</view>
      </view>
    </view>
    <!--  字母的选择：end	-->

    <!--	页面加载动画，避免造成空白：start	-->
    <u-loading-page v-if="false" :loading="loading" loading-text="loading..." />
    <!--	页面加载动画，避免造成空白：end	-->
  </view>
</template>

<script>
  // 生成字母
  // const indexList = () => {
  //   const indexList = []
  //   const charCodeOfA = 'A'.charCodeAt(0)
  //   for (let i = 0; i < 26; i++) {
  //     indexList.push({
  //       id: String.fromCharCode(charCodeOfA + i),
  //       key: String.fromCharCode(charCodeOfA + i),
  //     })
  //   }
  //   return indexList
  // }
  export default {
    name: 'BranList',
    props: {
      height: {
        type: String,
        default: '100vh',
      },
    },
    data() {
      return {
        customIndex: [
          {
            id: 'hot',
            key: '热',
          },
        ],
        actionText: '搜索',
        actionStyle: {
          fontSize: '32rpx',
          color: '#22284B',
        },
        searchValue: '',
        loading: false,
        animation: true,
        indicatorHeight: 40,
        anchor: 'hot',
        anchorIndex: 0,
        indexListData: [],
        scrollViewStyle: {
          height: this.height,
        },
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
    },
    mounted() {
      this.initCarTypeList()
      this.setIndexListLetterInfo()
    },
    methods: {
      scrollHandler({ detail }) {
        const { scrollTop } = detail
        const length = this.indexListData.length
        this.indexListData
          .filter((item) => {
            return item.id !== 'brand-index' || 'hot'
          })
          .forEach((item, index) => {
            if (index > 0 && index < length - 1) {
              const refScrollTopList = this.$refs[this.indexListData[index].id][0].$el.offsetTop
              const dis = refScrollTopList - scrollTop
              if (dis <= 0) {
                this.anchorIndex = index
              }
            }
          })
      },
      // 重置搜索
      resetSearch() {
        this.list = this.$vocenApi._.cloneDeep(this.filterList)
      },
      // 搜索触发
      searchHandler(res) {
        this.list = this.fuzzyQuery(res)
      },
      chooseBrandHandler(item) {
        this.$emit('change', item)
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
      fuzzyQuery(keyWord) {
        const list = this.$vocenApi._.cloneDeep(this.filterList)

        const reg = new RegExp(keyWord)
        return list
          .map((item) => {
            item.list = item.list.filter((t) => reg.test(t.name))
            return item
          })
          .filter((item) => item.list.length)
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
      anchorHandler(l) {
        this.anchor = l.id
        this.anchorIndex = this.indexListData.findIndex((item) => item.id === l.id)
      },
      // 初始化车型品牌列表
      async initCarTypeList() {
        // if (this.$storage.get('BrandList')) {
        //   this.list = this.$storage.get('BrandList')
        //   this.filterList = this.$vocenApi._.cloneDeep(this.list)
        //   this.hotList = this.$storage.get('BrandHotList')
        //   this.indexListData = this.$storage.get('indexListData')
        //   this.anchor = this.indexListData[0].id
        //   this.anchorIndex = 0
        //   return
        // }
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
            this.indexListData = this.hotList.length
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
            this.anchor = this.indexListData[0].id
            this.anchorIndex = 0
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
      margin-bottom: 20rpx;
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
    z-index: 10;

    &--item {
      height: 32rpx;
      width: 32rpx;
      line-height: 32rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20rpx;

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
