<template>
  <view>
    <view class="brand flex flex-column vh-full">
      <view id="nav">
        <VoNav :left-width="240" :right-width="240" is-fixed is-have-more title="商品品牌" />
        <view class="bg-white">
          <u-tabs
            :activeStyle="activeStyle"
            :current="current"
            :list="tabList"
            lineColor="#FF5319"
            @click="tabClick"
          />
        </view>
      </view>
      <scroll-view
        :scroll-into-view="scrollIntoView"
        :scroll-with-animation="scrollWithAnimation"
        class="bg-white flex1 overflow-hidden"
        scroll-y
        @scroll="onScroll"
      >
        <view class="brand-list">
          <view id="done" class="brand-list--item">
            <view class="brand-list--title" />
            <view class="brand-list--content">
              <view class="content-title">
                已认证品牌
                <text class="content-title-desc">(最多展示10个)</text>
              </view>
              <view v-if="myBrandCertifyDone.length" class="hot-list">
                <view
                  v-for="(item, index) in myBrandCertifyDone"
                  v-show="index < 10"
                  :key="index"
                  class="hot-item"
                  @click="chooseBrand(item, true)"
                >
                  <view class="hot-logo">
                    <view v-if="item.logoUrl">
                      <image
                        :src="item.logoUrl + '&type=1'"
                        class="hot-logo-img"
                        mode="aspectFit"
                      />
                    </view>
                    <VoIcon v-else :size="36" class="radio" name="fadongji-logo" />
                  </view>
                  <view class="hot-text overEllipsis">{{ item.name }}</view>
                </view>
              </view>
              <view v-else class="hot-list fz-25">无</view>
            </view>
          </view>
          <view id="doing" class="brand-list--item">
            <view class="brand-list--title" />
            <view class="brand-list--content">
              <view class="content-title">认证中品牌</view>
              <view v-if="myBrandCertifyDoing.length" class="hot-list">
                <view
                  v-for="(item, index) in myBrandCertifyDoing"
                  :key="index"
                  class="hot-item"
                  @click="chooseBrand(item, true)"
                >
                  <view class="hot-logo">
                    <image
                      v-if="item.logoUrl"
                      :src="item.logoUrl + '&type=1'"
                      class="hot-logo-img"
                      mode="aspectFit"
                    />
                    <VoIcon v-else :size="36" class="radio" name="fadongji-logo" />
                  </view>
                  <view class="hot-text overEllipsis">{{ item.name }}</view>
                </view>
              </view>
              <view v-else class="hot-list fz-25">无</view>
            </view>
          </view>
          <view id="all" class="brand-list--item">
            <view class="brand-list--title" />
            <view class="brand-list--content">
              <view class="content-title all">全部品牌</view>
            </view>
          </view>
          <view
            v-for="(item, index) in list"
            :id="item.name === '#' ? 'ac' : item.name"
            :ref="item.name"
            :key="index"
            class="brand-list--item"
          >
            <!--	 #ifdef APP-->
            <u-sticky :offset-top="0">
              <view class="brand-list--title">{{ item.name }}</view>
            </u-sticky>
            <!--	#endif-->
            <!--	#ifdef H5-->
            <u-sticky :offset-top="-44">
              <view class="brand-list--title">{{ item.name }}</view>
            </u-sticky>
            <!--	 #endif-->
            <view class="brand-list-content">
              <view
                v-for="(b, i) in item.list"
                :key="i"
                class="brand-list--block"
                @click="chooseBrand(b)"
              >
                <view class="brand-logo">
                  <image v-if="b.logoUrl" :src="b.logoUrl + '&type=1'" class="brand-logo-img" mode="aspectFit" />
                  <VoIcon v-else :size="24" class="radio" name="fadongji-logo" />
                </view>
                <view class="brand-text">{{ b.name }}</view>
                <view v-if="b.applyStatus" class="brand-status">
                  <image
                    v-if="b.applyStatus === 1"
                    class="brand-img"
                    src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-06-23/cd5ed7cc1fc4cb02e1b2f9bda29337be.png"
                  />
                  <image
                    v-else
                    class="brand-img"
                    src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-06-08/27d43c8824d7e94cd7d64412fb293d93.png"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <!--  申请操作：start	-->
<!--     首屏就显示  v-if="scrollTop >= 500"-->
      <view  class="border-box box-shadow p-b-safe-area bg-white px-32">
        <view class="py-12">
          <view>
            <u-button
              :plain="true"
              color="#FF5319"
              shape="circle"
              size="large"
              text="没有我要找的品牌，申请新品牌"
              type="primary"
              @click="show = true"
            />
          </view>
        </view>
      </view>
      <!--  申请操作：end	-->
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
    <!--  索引：end	-->

    <!--  认证确认：start	-->

    <u-modal
      :show="show"
      cancel-text="取消"
      confirm-text="去认证"
      confirmColor="#22284B"
      content="申请新品牌，需要进行认证。认证通过后，平台会为您创建此品牌供使用。"
      show-cancel-button
      @cancel="show = false"
      @confirm="confirmHandler"
    />

    <u-modal
      :show="authFlag"
      cancel-text="取消"
      confirm-text="去认证"
      confirmColor="#22284B"
      content="未认证的品牌，认证通过后才能使用哦"
      show-cancel-button
      @cancel="authFlag = false"
      @confirm="authHandler"
    />
    <!--  认证确认：end	-->
  </view>
</template>

<script>
  // #ifdef APP-NVUE
  // 由于weex为阿里的KPI业绩考核的产物，所以不支持百分比单位，这里需要通过dom查询组件的宽度
  const dom = uni.requireNativePlugin('dom')
  // #endif
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
        scrollTop: 0,
        isShow: false,
        authFlag: false,
        show: false,
        scrollIntoView: '',
        scrollWithAnimation: true,
        activeStyle: {
          color: '#FF5319',
          flex: 1,
          fontWeight: 'bold',
        },
        tabList: [
          {
            name: '已认证品牌',
            id: 'done',
          },
          {
            name: '认证中品牌',
            id: 'doing',
          },
          {
            name: '全部品牌',
            id: 'all',
          },
        ],
        current: 0,
        showDirect: false,
        indicatorHeight: 40,
        anchor: 'A',
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
        myBrandCertifyDone: [],
        myBrandCertifyDoing: [],
        list: [],
        currentRow: null,
        chartKey: '',
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
    onShow() {
      this.initData()
    },
    onLoad(option) {
      this.chartKey = option.chartKey ? option.chartKey : ''
    },
    created() {},
    mounted() {
      this.setIndexListLetterInfo()
      this.initNavHeight()
    },
    methods: {
      initNavHeight() {
        let query = uni.createSelectorQuery().in(this)
        //需要给黄色区域设置一个id标识，在这里是demo
        query
          .select('#nav')
          .boundingClientRect((data) => {
            this.navHeight = +data.height
          })
          .exec()
      },
      onScroll({ detail }) {
        this.scrollTop = detail.scrollTop
        const { scrollTop } = detail
        const length = this.indexListData.length
        let arr = this.indexListData.filter((item) => {
          return item.id !== 'brand-index' || 'hot'
        })

        arr.forEach((item, index) => {
          if (index > 0 && index < length - 1) {
            const refScrollTopList = this.scrollTopList[index] - this.navHeight
            const dis = refScrollTopList - scrollTop
            if (dis <= 0) {
              console.log(index);
              this.anchorIndex = index
              this.anchor = item.id
            }
          }
        })
        // this.indexListData
        //   .filter((item) => {
        //     return item.id !== 'brand-index'
        //   })
        //   .forEach((item, index) => {
        //     if (index > 0 && index < length - 1) {
        //       const refScrollTopList = this.scrollTopList[index] - this.navHeight
        //       const dis = refScrollTopList - scrollTop
        //       if (dis <= 0) {
        //         this.anchorIndex = index
        //       }
        //     }
        //   })
      },
      authHandler() {
        this.authFlag = false
        uni.$u.route({
          url: '/pagesProduct/BrandCertification/BrandCertification',
          params: {
            name: this.currentRow.name,
            logo: this.currentRow.logoUrl,
            id: this.currentRow.id,
            source: 1,
          },
        })
      },
      // 选择品牌
      chooseBrand(item, used = false) {
        // 认证中 和 已认证的品牌可以进行选择
        if (used || item.applyStatus === 1 || item.applyStatus === 2) {
          //上货和修改商品区分开
          if (this.chartKey === '$VoEditProductForm') {
            uni.$VoEditProductForm.brandId = item.id
            uni.$VoEditProductForm.brandName = item.name
            uni.$VoEditProductForm.isChangeName = true
          } else {
            uni.$VoPutProductForm.brandId = item.id
            uni.$VoPutProductForm.brandName = item.name
          }

          // uni.$u.route('/pagesProduct/PutProduct/PutProduct')
          this.$backFn()
          return
        }
        this.currentRow = item
        if (!item.applyStatus) {
          this.authFlag = true
        }
      },
      // 初始化模板数据
      async initData() {
        try {
          const { code, data } = await this.$VoHttp.GOODS.apiGoodsBrandQueryApplyList()
          if (+code === 20001) {
            const { myBrands, brands } = data
            const tmpDoing = myBrands.find((item) => item.status === 1)
            const tmpDone = myBrands.find((item) => item.status === 2)
            this.myBrandCertifyDoing = tmpDoing ? tmpDoing.voList : []
            this.myBrandCertifyDone = tmpDone ? tmpDone.voList : []
            // 处理索引并处理渲染数据
            const listData = []
            const keyIndex = []
            if (brands && brands.length) {
              brands.forEach((item) => {
                const $key = Object.keys(item)[0]
                keyIndex.push({
                  id: $key === '#' ? 'ac' : $key,
                  key: $key,
                })
                const tmp = {
                  name: $key,
                  list: item[$key],
                }
                listData.push(tmp)
              })
            }
            console.log(keyIndex);
            console.log(listData);
            this.indexListData = keyIndex
            this.list = listData
            this.anchor = this.indexListData[0].id
            this.anchorIndex = 0
            this.$nextTick(() => {
              setTimeout(() => {
                this.calcRefScrollItemTop()
              }, 100)
            })
            console.log('list', this.list)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.data.message)
        }
      },
      // 确认认证
      confirmHandler() {
        this.show = false
        uni.$u.route({
          url: '/pagesProduct/BrandCertification/BrandCertification',
          params: {
            source: 1,
          },
        })
      },
      // 快捷跳转
      tabClick(name) {
        this.scrollIntoView = ''
        this.scrollIntoView = name.id
        console.log('scrollIntoView', this.scrollIntoView)
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
          this.scrollIntoView = this.anchor
        }, 100)
        console.log('scrollIntoView333', this.scrollIntoView)
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
          this.scrollWithAnimation = true
          this.animation = true
        })
      },
      // 获取索引信息
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
            console.log(item);
            let query = uni.createSelectorQuery().in(this)
            //需要给黄色区域设置一个id标识，在这里是demo
            query
              .select('#' + item.id)
              .boundingClientRect((data) => {
                console.log(data);
                this.scrollTopList.push(data.top)
              })
              .exec()
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
  .tab-fixed {
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 2;
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
        border-radius: 48rpx;
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
      width: 72rpx;
      height: 72rpx;
      border-radius: 72rpx;
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
      background-color: #f7f7f8;
    }

    &--content {
      .content-title {
        display: flex;
        align-items: center;

        .content-title-desc {
          color: #b9b6b6;
          font-size: 20rpx;
          font-weight: 400;
          margin-left: 5rpx;
        }

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
    z-index: 100000;
    padding-left: 24rpx;
    &--item {
      height: 32rpx;
      width: 32rpx;
      line-height: 32rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20rpx;
      position: relative;
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
        color: #ff5319;
        display: none;
      }

      &.active {
        color: #ffffff;
        background-color: #ff5319;
        border-radius: 50%;
        position: relative;

        .anchor-scale {
          display: block;
        }
      }
    }
  }
</style>
