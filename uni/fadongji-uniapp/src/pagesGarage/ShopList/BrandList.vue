<template>
  <view>
    <view class="brand flex flex-column vh-full">
      <VoNav :left-width="240" :right-width="240" is-fixed is-have-more>
        <block slot="title">品牌</block>
      </VoNav>
      <scroll-view
        :scroll-into-view="scrollIntoView"
        :scroll-with-animation="scrollWithAnimation"
        class="bg-white flex1 overflow-hidden"
        scroll-y
      >
        <view class="brand-list">
          <block v-for="(item, index) in list" :key="index">
            <view v-if="item.name === 'hot'">
              <view class="brand-list--title">热门品牌</view>
              <view class="brand-list-content--hot">
                <view
                  v-for="(b, i) in item.list"
                  :key="i"
                  :class="b.choosed ? 'choosed' : ''"
                  class="brand-list--block border-box bg-white overflow-hidden"
                  @click="chooseBrand(b)"
                >
                  <view class="brand-logo flex">
                    <image :src="b.logoUrl" class="brand-logo-img" mode="aspectFit" />
                  </view>
                  <view class="brand-text m-t-10 text-nowrap" style="width: 100%">
                    {{ b.name }}
                  </view>
                </view>
              </view>
            </view>
            <view v-else :id="item.name" :key="index" class="brand-list--item">
              <view class="brand-list--title">{{ item.name }}</view>
              <view class="brand-list-content">
                <view
                  v-for="(b, i) in item.list"
                  :key="i"
                  :class="b.choosed ? 'choosed' : ''"
                  class="brand-list--block bg-white"
                  @click="chooseBrand(b)"
                >
                  <view class="brand-logo">
                    <image :src="b.logoUrl" class="brand-logo-img" mode="aspectFit" />
                  </view>
                  <view class="brand-text">{{ b.name }}</view>
                  <!-- <view v-if="b.applyStatus" class="brand-status">
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
                </view> -->
                </view>
              </view>
            </view>
          </block>
        </view>
      </scroll-view>
      <!--  申请操作：start	-->
      <!-- <view class="border-box box-shadow p-b-safe-area bg-white px-32">
        <view class="py-12">
          <view>
            <u-button
              size="large"
              color="#22284B"
              type="primary"
              shape="circle"
              :plain="true"
              text="没有找到相应品牌，请申请认证"
              @click="show = true"
            />
          </view>
        </view>
      </view> -->
      <!--  申请操作：end	-->
      <view class="btns">
        <view class="btns-item" @click.stop="reset()">重置</view>
        <view class="btns-item color" @click.stop="confirm()">确定</view>
      </view>
    </view>
    <!--  索引：start	-->
    <view
      ref="brand-index"
      :style="{ top: $u.addUnit(letterInfo.top || 100) }"
      class="brand-index fz-0"
    >
      <view
        v-for="(l, i) in indexListData"
        :key="i"
        :class="{ active: anchor === l.id }"
        class="brand-index--item"
        @click="selectFn(l)"
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
      confirmColor="#FF5319"
      content="申请新品牌，需要进行认证。认证通过后，平台会为您创建此品牌供使用。"
      show-cancel-button
      @cancel="show = false"
      @confirm="confirmHandler"
    />

    <u-modal
      :show="authFlag"
      cancel-text="取消"
      confirm-text="去认证"
      confirmColor="#FF5319"
      content="未认证的品牌，认证通过后才能使用哦"
      show-cancel-button
      @cancel="authFlag = false"
      @confirm="authHandler"
    />
    <!--  认证确认：end	-->
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
        authFlag: false,
        show: false,
        scrollIntoView: '',
        scrollWithAnimation: true,
        current: 0,
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
        selectList: [], //选中
        hotList: [],
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
    onShow() {
      this.initData()
    },
    onLoad(options) {
      this.shopId = options.shopId || ''
    },
    mounted() {
      this.setIndexListLetterInfo()
    },
    methods: {
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
        this.list.forEach((i) => {
          i.list.forEach((j) => {
            if (j.id === item.id) {
              j.choosed = !j.choosed
            }
          })
        })

        this.currentRow = item
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
        // uni.$u.route('/pagesGarage/ShopList/ShopList?isSelectBack=1')
        this.$backFn()
      },
      async getHotList() {},
      // 初始化模板数据
      async initData() {
        try {
          //热门品牌
          let brandRes = await this.$VoHttp.GOODS.apiGoodsBrandQueryListHot()
          this.hotList = brandRes.data.map((item) => {
            return {
              ...item,
              choosed: false,
            }
          })

          let res = await this.$VoHttp.GOODS.apiGoodsBrandQueryApplyList()
          let data = res.data
          if (+res.code === 20001) {
            const { myBrands, brands } = data
            // const tmpDoing = myBrands.find((item) => item.status === 1)
            // const tmpDone = myBrands.find((item) => item.status === 2)
            // this.myBrandCertifyDoing = tmpDoing ? tmpDoing.voList : []
            // this.myBrandCertifyDone = tmpDone ? tmpDone.voList : []
            // 处理索引并处理渲染数据
            const listData = []
            const keyIndex = []
            if (brands && brands.length) {
              brands.forEach((item) => {
                const $key = Object.keys(item)[0]
                keyIndex.push({
                  id: $key,
                  key: $key,
                })
                const tmp = {
                  name: $key,
                  list: item[$key],
                }
                // if ($key === '#') {
                //   listData.unshift(tmp)
                // } else {
                //   listData.push(tmp)
                // }
                listData.push(tmp)
              })
            }
            this.indexListData = keyIndex
            listData.forEach((i) => {
              i.list.forEach((j) => {
                j.choosed = false
              })
            })
            listData.unshift({
              name: 'hot',
              list: this.hotList,
            })
            this.list = listData
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
      },
      selectFn(item){
        this.anchor = item.id
        this.scrollIntoView = item.id
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
  .tab-fixed {
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 2;
  }

  .brand-list--block {
    background-color: #f7f7f8;
    display: flex;
    align-items: center;
    padding: 24rpx 32rpx;
    &.bg-white {
      background-color: #ffffff;
    }
    &.choosed {
      .brand-text {
        color: #FF5319;
        font-weight: 500;
        font-size: 30rpx;
      }
    }

    .brand-logo {
      width: 48rpx;
      height: 48rpx;
      border-radius: 50%;
      overflow: hidden;
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
      &.bg-white {
        background-color: #ffffff;
      }
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
    .brand-list-content--hot {
      display: flex;
      flex-wrap: wrap;
      > :nth-child(n) {
        flex-direction: column;
        align-items: start;
        .brand-logo {
          width: 72rpx;
          height: 72rpx;
          font-size: 0;
          .brand-logo-img {
            width: 72rpx;
            height: 72rpx;
          }
        }
      }
      .content-title {
        padding: 32rpx 32rpx 0 32rpx;
        @include black-size-color(28, 0.85);
        line-height: 1.5;
        font-weight: bold;

        &.all {
          padding: 32rpx;
        }
      }
      .brand-list--block {
        width: 150rpx;
        align-items: center;
        overflow: hidden;
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
    z-index: 99;

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
      color: $v-c0-85;
      border: 1px solid $v-c0-25;
      border-radius: 45px;
      &.color {
        margin-right: 0;
        background: $color-primary-yellow;
        border: 1px solid $color-primary-yellow;
        color: #fff;
      }
    }
  }
</style>
