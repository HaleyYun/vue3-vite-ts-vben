<template>
  <view>
    <view class="brand flex flex-column vh-full">
      <VoNav :left-width="240" :right-width="240" is-fixed is-have-more title="车系" />
      <!--      <view class="search-wrap">-->
      <!--        <VoSearch-->
      <!--          v-model="keyword"-->
      <!--          class="p-r-24"-->
      <!--          placeholder="请输入关键字搜索"-->
      <!--          @custom="searchFn"-->
      <!--          @search="searchFn"-->
      <!--        />-->
      <!--      </view>-->
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
                  @click="chooseBrand(b, index, i)"
                >
                  <view class="brand-logo">
                    <image :src="b.logo || b.url" class="brand-logo-img" mode="aspectFit" />
                  </view>
                  <view class="brand-text">{{ b.name }}</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <!-- 右侧车系 -->
        <scroll-view
          v-if="showSeries"
          :scroll-with-animation="scrollWithAnimation"
          class="series bg-white overflow-hidden"
          scroll-y
        >
          <view class="series-list">
            <EraCheckboxGroup v-model="cheackAll" placement="column" @change="checkboxAllChange">
              <view class="check-item">
                <EraCheckbox :name="true" activeColor="#FF5319" label="全选" shape="circle" />
              </view>
            </EraCheckboxGroup>
            <EraCheckboxGroup v-model="checkboxValue" placement="column" @change="checkboxChange">
              <view v-for="(item, index) in seriesList" :key="index" class="check-item">
                <EraCheckbox
                  :label="item.name"
                  :name="item.id"
                  activeColor="#FF5319"
                  shape="circle"
                  :checked="checkboxValue.indexOf(item.id) !== -1"
                />
              </view>
            </EraCheckboxGroup>
          </view>
        </scroll-view>
      </view>
      <view class="btns">
        <view class="btns-item" @click.stop="reset()">重置</view>
        <view class="btns-item color" @click.stop="confirm()"
          >确定({{ checkTotal > 99 ? '99+' : checkTotal }})</view
        >
      </view>

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
    </view>
    <!--  索引：start	-->
    <view
      ref="brand-index"
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
        <view  v-if="touching" class="anchor-scale">{{ l.key }}</view>
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
        checkboxValue: [], // 当前父项选中的值列表
        parentIndex: null, // 单选中父级的父级下标
        currentIndex: null, // 单选中父级的下标
        cheackAll: [], // 全选
        seriesList: [], // 展示子列表
        showSeries: false,
        selectData: [], //存放选中id
        sureNum: 0,
        origin: '', //shop店铺
        shopId: '',
        checkTotal: 0, // 被选中的总数
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
      // cheackAll(val) {
      //   this.checkboxValue = val.length && val[0] ? this.seriesList.map((item) => item.id) : []
      // },
    },
    onShow() {},
    async onLoad(options) {
      this.origin = options.origin || ''
      this.shopId = options.shopId || ''
      await this.initData()
      //如果外部已选择车品牌,默认选中该品牌下所有车系
      if (options.brandId && options.brandId != 'undefined') {
        // this.list.forEach((a) => {
        //   a.list.forEach((b) => {
        //     if (b.id === options.brandId) {
        //       b.selected = true
        //     } else {
        //       b.selected = false
        //     }
        //   })
        // })
        // this.showSeries = true
        let arr = JSON.parse(options.brandId)
        arr.forEach((item) => {
          this.$VoHttp.BUSINESS.businessVehicleBrandSelectSeries({ brandid: item.id }).then(
            (res) => {

              // this.seriesList = res.data
              // this.cheackAll = [true]
              this.list.forEach(it1 => {
                if (it1.initials === item.initials) {
                  it1.list.forEach(it2 => {
                    if (it2.id === item.id) {
                      it2.child = res.data
                      this.checkTotal = this.checkTotal + res.data.length
                    }
                  })
                }
              })
            },
          )
        })
      }
    },
    mounted() {
      this.setIndexListLetterInfo()
    },
    methods: {
      selectFn(item){
        this.anchor = item.id
      },
      onScroll({ detail }) {

        // this.scrollTop = detail.scrollTop
        const { scrollTop } = detail
        const length = this.indexListData.length
        this.indexListData
          .filter((item) => {
            return item.id !== 'brand-index' || 'hot'
          })
          .forEach((item, index) => {
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
      // chooseBrand(item, used = false) {
      chooseBrand(item, indexP, index) {
        // 认证中 和 已认证的品牌可以进行选择
        // if (used || item.applyStatus === 1 || item.applyStatus === 2) {
        //   uni.$emit('select', item)
        //   uni.$u.route('/pagesAgent/InvestmentList/InvestmentList?isSelectBack=1')
        //   return
        // }
        this.list.forEach((a) => {
          a.list.forEach((b) => {
            if (b.id === item.id) {
              b.selected = true
            } else {
              b.selected = false
            }
          })
        })
        this.checkboxValue = []
        this.cheackAll = []
        this.currentIndex = index
        this.parentIndex = indexP
        this.currentRow = item
        this.getSeries(item)
        this.showSeries = true
        this.$forceUpdate()
        // if (!item.applyStatus) {
        //   this.authFlag = true
        // }
      },
      //获取车系列表
      getSeries(info) {

        // this.selectData = this.checkboxValue
        this.$VoHttp.BUSINESS.businessVehicleBrandSelectSeries({ brandid: info.id }).then((res) => {
          if (res.data && res.data.length) {
            this.seriesList = res.data
            this.seriesList.forEach((item) => {
              item.parentName = info.name
            })
            // 判断当前选中类型是否有被选中的数据
            if (this.list[this.parentIndex].list[this.currentIndex].child) {
              this.formatterSelect()
            }
            // let ids = res.data.map((item) => {
            //   return item.id
            // })
            // if (
            //   this.selectedData &&
            //   this.selectedData.length &&
            //   ids.length &&
            //   this.selectedData === ids
            // ) {
            //   this.cheackAll = [true]
            // }
          }
        })
      },
      // 格式化渲染已经被选中的数据展示
      formatterSelect() {
        this.list[this.parentIndex].list[this.currentIndex].child.forEach((item) => {
          this.checkboxValue.push(item.id)
        })
        if (this.checkboxValue.length === this.seriesList.length) {
          this.cheackAll = [true]
        }
        this.$forceUpdate()
      },
      //选择车系
      checkboxChange(n) {

        this.cheackAll = [false]
        // 全选判断
        if (n.length === this.seriesList.length) {
          this.cheackAll = [true]
          this.list[this.parentIndex].list[this.currentIndex].child = this.seriesList
        } else {
          let arr = []
          this.seriesList.forEach((item) => {
            if (n.indexOf(item.id) !== -1) {
              arr.push(item)
            }
            // n.forEach((value) => {
            //   if (item.id === value) {
            //     this.selectData
            //   } else {
            //     item.checked = false
            //   }
            // })
          })
          // 将选中数据存储在父级中
          this.list[this.parentIndex].list[this.currentIndex].child = arr
        }

        this.calcCount()
      },
      // 全选判断
      checkboxAllChange(v) {
        if (v[0]) {
          this.list[this.parentIndex].list[this.currentIndex].child = this.seriesList
          this.checkboxValue = this.seriesList.map((item) => item.id)
        } else {
          this.list[this.parentIndex].list[this.currentIndex].child = null
          this.checkboxValue = []
        }
        this.calcCount()
      },
      // 计算总数
      calcCount() {
        let count = 0
        this.list.forEach((item) => {
          item.list.forEach((it) => {
            if (it.child) {
              count = count + it.child.length
            }
          })
        })
        this.checkTotal = count
        this.$forceUpdate()
      },
      //重置
      reset() {
        this.checkboxValue = []
        this.cheackAll = []
        this.checkTotal = 0
        this.list.forEach((item) => {
          item.list.forEach((it) => {
            it.child = null
          })
        })
      },
      //确认
      confirm() {
        let selectList = []
        // this.checkboxValue.forEach((check) => {
        //   this.seriesList.forEach((item) => {
        //     if (item.id === check) {
        //       selectList.push(item)
        //     }
        //   })
        // })
        this.list.forEach((item) => {
          item.list.forEach((it) => {
            if (it.child) {
              selectList.push(it)
            }
          })
        })
        if (!selectList.length) {
          // selectList.push(this.currentRow)
          this.$u.toast('请选择车系~~')
          return
        }

        uni.$emit('selectVehicle', selectList)
        // uni.$u.route('/pagesGarage/ShopList/ShopList?isSelectBack=1')
        this.$backFn()
      },
      // 初始化模板数据
      async initData() {
        try {
          // if (this.$storage.get('indexListData')) {
          //   this.indexListData = this.$storage.get('indexListData')
          //   this.list = this.$storage.get('list')
          //   console.log(this.list)
          //   return
          // }
          let data = ''
          let code = ''
          if (this.origin === 'shop') {
            let res = await this.$VoHttp.apiGoodsqueryVehicleModelList({ shopId: this.shopId })
            data = res.data
            code = res.code
          } else {
            let res = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectOne()
            data = res.data.detail
            code = res.code
          }
          if (+code === 20001) {

            // const brands = data.detail
            // 处理索引并处理渲染数据
            // const listData = []
            // const keyIndex = []
            // if (brands && brands.length) {
            //   brands.forEach((item) => {
            //     const $key = item.initials
            //     keyIndex.push({
            //       id: $key,
            //       key: $key,
            //     })
            //     const tmp = {
            //       name: $key,
            //       list: item.list,
            //     }
            //     listData.push(tmp)
            //   })
            // }
            // this.list = listData
            this.list = this.$vocenApi._.orderBy(data, 'initials')

            // 处理索引并处理渲染数据
            this.indexListData = this.list.map((item) => {
              return {
                id: item.initials,
                key: item.initials,
              }
            })
            this.anchor = this.indexListData[0].id
            this.$storage.set('indexListData', this.indexListData)
            this.$storage.set('list', this.list)
          }
        } catch (e) {

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
        return
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

          console.log(this.letterInfo,"letterInfoletterInfoletterInfo")
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
    box-shadow: inset 0px -1px 0px #f1f1f3;
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
    height: 100vh;
    top: 0rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
