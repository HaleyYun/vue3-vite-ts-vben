<template>
  <view>
    <view class="brand flex flex-column vh-full">
      <view id="nav">
        <VoNav is-fixed is-have-more title="型号列表">
          <block slot="operation">
            <image class="record-icon" src="/static/icons/apply_record.png" @click="toRecord" />
          </block>
        </VoNav>
        <view class="bg-white flex p-l-32 p-r-32 p-b-12 p-t-12">
          <VoSearch
            v-model.trim="keyword"
            height="34"
            placeholder="输入型号名称"
            placeholderColor="rgba(0, 0, 0, 0.25)"
            @blur="searchFn"
            @clear="searchFn"
          />
        </view>
      </view>
      <scroll-view
        :scroll-into-view="anchor"
        :scroll-with-animation="animation"
        class="bg-white flex1 overflow-hidden"
        scroll-y
        @scroll="scrollHandler"
      >
        <view class="brand-list">
          <view v-for="(item, index) in list" :id="item.name === '#' ? 'ac' : item.name" :key="index" class="brand-list--item">
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
                :class="b.choosed ? 'choosed' : ''"
                class="brand-list--block"
                @click="chooseBrand(b)"
              >
                <view class="brand-text">
                  {{ b.model }}
                  <block v-if="origin === 1">
                    <block v-if="b.isRecyclePublished">
                      <text class="fz-24 color-block-45">
                        （已发布回收商品，选择后会修改原商品信息）
                      </text>
                    </block>
                  </block>
                  <block v-else-if="origin === 2">
                    <block v-if="b.isResalePublished">
                      <text class="fz-24 color-block-45">
                        （已发布销售商品，选择后会修改原商品信息）
                      </text>
                    </block>
                  </block>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <!-- <view class="btns">
        <view class="btns-item" @click.stop="reset()">重置</view>
        <view class="btns-item color" @click.stop="confirm()">确定</view>
      </view> -->
      <!--  申请操作：start	-->
      <view class="border-box box-shadow p-b-safe-area bg-white px-32">
        <view class="py-12">
          <view>
            <u-button
              color="#FF5319"
              shape="circle"
              size="large"
              text="没找到我要的，申请新型号"
              type="primary"
              @click="$linkToEasy(`/pagesRecovery/GoodsRecycle/TypeApply?origin=${origin}`)"
            />
          </view>
        </view>
      </view>
      <!--  申请操作：end	-->
    </view>
    <!--  索引：start	-->
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
    <!--  索引：end	-->
  </view>
</template>

<script>
  // #ifdef APP-NVUE
  // 由于weex为阿里的KPI业绩考核的产物，所以不支持百分比单位，这里需要通过dom查询组件的宽度
  const dom = uni.requireNativePlugin('dom')
  // #endif
  export default {
    name: 'DeviceSize',
    props: {
      height: {
        type: String,
        default: 'calc(100vh - 88px)',
      },
    },
    data() {
      return {
        authFlag: false,
        show: false,
        anchor: 'A',
        animation: true,
        anchorIndex: 0,
        activeStyle: {
          color: '#22284B',
          flex: 1,
          fontWeight: 'bold',
        },
        current: 0,
        showDirect: false,
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
        selectList: [], //选中
        keyword: '',
        origin: 1, // 来源: 1:新增商品;2:新增旧机再售商品
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
      //监听列表
      list: {
        handler(newValue, oldValue) {
          this.selectList = []
          if (newValue.length) {
            newValue.forEach((i) => {
              i.list.forEach((j) => {
                if (j.choosed) {
                  this.selectList.push(j)
                }
              })
            })
          }
          console.log('selectList', this.selectList)
        },
        deep: true,
      },
    },
    onLoad(options) {
      if (options.origin) {
        this.origin = +options.origin || 1
      }
    },
    onShow() {
      this.initData()
    },
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
      //申请记录
      toRecord() {
        this.$linkToEasy(`./TypeRecord`)
      },
      //搜索
      searchFn(e) {
        // console.log(e);
        this.keyword = e
        this.initData()
        // console.log(this.list)
        // this.list.forEach((item, index) => {
        //   item.list.forEach((it) => {
        //     if (it.model.indexOf(e) !== -1) {
        //       console.log(index);
        //       this.setValueForTouch(index)
        //     }
        //   })
        // })
      },
      // 选择品牌
      async chooseBrand(item, used = false) {
        this.list.forEach((i) => {
          i.list.forEach((j) => {
            if (j.id === item.id) {
              j.choosed = true
            } else {
              j.choosed = false
            }
          })
        })

        this.currentRow = item
        // let infos = {
        //   model: item.model,
        //   modelId: item.id,
        // }
        // console.log(item);
        // if (item.isResalePublished) {
        //   showLoading()
        //   const { data } = await this.$VoHttp.apiGoodsRecycleResaleQueryInfo({ id: item.id })
        //   hideLoading()
        //   console.log(data)
        //   infos = Object.assign(infos, data)
        // }
        uni.$emit('select', item)
        this.$backFn()
        // if (!item.applyStatus) {
        //   this.authFlag = true
        // }
      },
      //重置
      reset() {
        this.selectList = []
        this.list.forEach((i) => {
          i.list.forEach((j) => {
            j.choosed = false
          })
        })
      },
      //确认
      confirm() {
        uni.$emit('select', this.selectList)
        this.$backFn()
      },
      // 初始化模板数据
      async initData() {
        try {
          // const { code, data } = await this.$VoHttp.GOODS.apiGoodsBrandQueryApplyList()
          const { code, data } = await this.$VoHttp.apiGoodsModelList({
            keyword: this.keyword,
            queryType: this.origin,
          })
          if (+code === 20001) {
            console.log(data, 'initData')
            let brands = [...data]
            // 处理索引并处理渲染数据
            const listData = []
            const keyIndex = []
            if (brands && brands.length) {
              brands.forEach((item) => {
                keyIndex.push({
                  id: item.initials === '#' ? 'ac' : item.initials,
                  key: item.initials,
                })
                const tmp = {
                  name: item.initials,
                  list: item.modelVOS,
                }
                listData.push(tmp)
              })
            }
            this.indexListData = keyIndex
            this.anchor = this.indexListData[0].id
            this.anchorIndex = 0
            this.$nextTick(() => {
              setTimeout(() => {
                this.calcRefScrollItemTop()
              }, 100)
            })
            // listData.forEach((i) => {
            //   i.list.forEach((j) => {
            //     j.choosed = false
            //   })
            // })
            this.list = listData
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
    border-bottom: 8rpx solid #f7f7f8;
    &.choosed {
      .brand-text {
        color: #e50012;
        font-weight: 500;
        font-size: 30rpx;
      }
    }

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
      background-color: #f7f7f8;
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
        box-shadow: 0 4rpx 16rpx rgba(34, 40, 75, 0.15);
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
  .btns {
    padding: 20rpx 32rpx;
    display: flex;
    background: #ffffff;
    &-item {
      flex: 1;
      padding: 22rpx 0;
      margin-right: 36rpx;
      font-size: 16px;
      line-height: 1.5;
      text-align: center;
      color: #22284b;
      border: 1px solid #22284b;
      border-radius: 45px;
      &.color {
        margin-right: 0;
        background: #22284b;
        color: #fff;
      }
    }
  }
  .record-icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 32rpx;
  }
</style>
