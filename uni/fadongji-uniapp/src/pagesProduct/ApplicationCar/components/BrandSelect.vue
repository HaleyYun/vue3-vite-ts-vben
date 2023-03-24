<template>
  <view>
    <view class="flex flex-column overflow-hidden p-b-safe-area" style="height: calc(100vh - 44px)">
      <view v-if="false" class="search-box p-20 bg-white">
        <!-- <u-search
          v-model="searchValue"
          :actionStyle="actionStyle"
          :actionText="actionText"
          :show-action="true"
          bgColor="#F7F7F8"
          clearabled
          placeholder="请输入关键字搜索"
          placeholderColor="rgba(0, 0 ,0 ,0.25)"
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
      <view v-if="brandObj" class="brand flex flex-vertical-c">
        <view class="toggle-brand flex-vertical-c flex">
          <VoIcon :size="16" class="icon" name="switch" />
          <view class="switch-text" @click="changeBrand">切换品牌</view>
        </view>
        <view class="brand-name text-28 m-l-15">已选： {{ brandObj.name }}</view>
      </view>
      <view class="tab-list">
        <view
          v-for="(t, i) in tabList"
          :key="i"
          :class="{ active: i === tabIndex }"
          class="tab-item"
          @click="chooseTab(i)"
        >
          <view class="tab-name">{{ t }}</view>
          <view class="tab-icon fz-0 m-l-10">
            <VoIcon
              :color="i === tabIndex ? '#FF5319' : '#AFB2BA'"
              :size="20"
              name="arrow-bottom-line"
            />
          </view>
        </view>
        <view v-if="false" class="tab-item filter">
          <view class="tab-name">筛选</view>
          <view class="tab-icon fz-0 m-l-10">
            <VoIcon :size="24" color="#FF5319" name="filter" />
          </view>
        </view>
        <u-transition :show="tabIndex === 0" mode="fade-up">
          <view v-if="tabIndex === 0" class="tab-content">
            <TabOneSelect :series="series" @change="tabOneChangeHandler" />
          </view>
        </u-transition>
        <u-transition :show="tabIndex === 1" mode="fade-up">
          <view class="tab-content">
            <TabSelect :list="year" @change="yearChange" />
          </view>
        </u-transition>
        <u-transition :show="tabIndex === 2" mode="fade-up">
          <view class="tab-content">
            <TabSelect :list="displacement_induction" @change="displacementChange" />
          </view>
        </u-transition>
        <u-transition :show="tabIndex === 3" mode="fade-up">
          <view class="tab-content">
            <TabSelect :list="transmission" @change="transmissionChange" />
          </view>
        </u-transition>
      </view>
      <scroll-view class="tab-content bg-white p-b-40" style="height: calc(100vh - 230px)" scroll-y>
        <BrandContent
          ref="brandContent"
          :init-data="defaultChooseBrandData"
          :query="queryForm"
          @toggleBrand="toggleBrandHandler"
        />
      </scroll-view>
      <view class="put-operate-save border-box bg-white px-32">
        <view class="py-24 flex">
          <view class="p-r-15 flex1">
            <u-button
              :plain="true"
              :text="`已关联适配车型（${relationNum}）`"
              color="rgba(0, 0, 0, 0.85)"
              customStyle="border: 1px solid rgba(0, 0, 0, 0.25);"
              shape="circle"
              size="large"
              type="primary"
              @click="show = !show"
            />
          </view>
          <view class="p-l-15 flex1">
            <u-button
              color="#FF5319"
              shape="circle"
              size="large"
              text="确定"
              type="primary"
              @click="confirmHandler"
            />
          </view>
        </view>
      </view>
    </view>

    <u-popup :show="show" mode="bottom" @close="show = false">
      <view class="py-28 car-info flex flex-justify-between">
        <view class="all-relation">已关联适配车型</view>
        <view class="flex flex-vertical-c">
          <VoIcon :size="20" name="delete" />
          <view class="clear-all p-l-5" @click.stop="removeAllChooseData">清空</view>
        </view>
      </view>
      <scroll-view scroll-y class="car-list flex flex-column overflow-y">
        <view v-for="(b, i) in chooseBrandData" v-show="b.list.length" :key="i" class="px-20 flex1">
          <view class="brand-list--block pt-20">
            <view class="brand-logo">
              <image :src="b.logo" class="brand-logo-img" mode="aspectFit" />
            </view>
            <view class="brand-text">{{ b.name }}</view>
          </view>
          <view class="car-inner">
            <view v-for="(c, iv) in b.list" :key="iv" class="car-item flex">
              <view class="car-name flex1">{{ c.name }}</view>
              <view class="remove-btn" @click.stop="removeChooseData(b, iv, c)">移除</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
  import TabOneSelect from './TabOneSelect'
  import TabSelect from './TabSelect'
  import BrandContent from './BrandContent'
  import Bus from '@/common/Bus'

  export default {
    name: 'BrandSelect',
    components: { TabOneSelect, TabSelect, BrandContent },
    inject: ['brand', 'selectData'],
    props: {
      origin: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        actionText: '搜索',
        actionStyle: {
          fontSize: '32rpx',
          color: '#22284B',
        },
        searchValue: '',
        show: false,
        tabList: ['车系', '年款', '排量', '变速箱'],
        tabIndex: -1,
        // 年款
        year: [],
        displacement: [],
        induction: [],
        transmission: [],
        series: [],
        displacement_induction: [],
        queryForm: {
          brandIds: '', // 品牌列表
          year: '', // 年款搜索
          displacementInduction: '', // 排量进气形式列表
          transmissionDescription: '', // 变速箱列表
          orderType: 'ASC', // 排序
        },
        chooseBrandData: [],
        chooseBrandMap: new Map(),
        defaultChooseBrandData: [],
        isLoad: false,
      }
    },
    computed: {
      brandObj() {
        return this.brand()
      },
      relationNum() {
        let total = 0
        this.chooseBrandData.forEach((item) => {
          total += item.list.length
        })
        return total
      },
    },
    mounted() {
      this.initParams()
      if (this.origin === 'editProduct') {
        if (uni?.$VoEditProductForm && !this.isLoad) {
          this.isLoad = true
          this.chooseBrandData = uni['$VoEditProductForm'].vehiclesObj || []
          console.log(this.chooseBrandData, 'ssssssssssss')
          uni.$emit('storeChooseBrandData', this.chooseBrandData)
          console.log(uni['$VoEditProductForm'].vehicles, "uni['$VoPutProductForm'].vehicles")
        }
      } else {
        if (uni?.$VoPutProductForm && !this.isLoad) {
          this.isLoad = true
          // 回显选择的车型 暂时隐藏
          // const res = uni['$VoPutProductForm'].vehicles
          // this.chooseBrandMap.set(this.brandObj.id, {
          //   ...this.brandObj,
          //   list: res,
          // })
          // const ret = []
          // this.chooseBrandMap.forEach((item) => {
          //   ret.push(item)
          // })
          // this.chooseBrandData = ret
          // this.defaultChooseBrandData = res.map((item) => item.carModels)
          this.chooseBrandData = uni['$VoPutProductForm'].vehiclesObj || []
          uni.$emit('storeChooseBrandData', this.chooseBrandData)
          console.log(uni['$VoPutProductForm'].vehicles, "uni['$VoPutProductForm'].vehicles")
        }
      }
      // 页面来回切换时，储存到多显示
      this.chooseBrandData = this.selectData()
      console.log(this.chooseBrandData, 'xx111')
      this.defaultChooseBrandData = this.chooseBrandData.length
        ? this.chooseBrandData.map((item) => item.list)[0].map((item) => item.carModels)
        : []
      this.chooseBrandData.forEach((item) => {
        this.chooseBrandMap.set(item.id, {
          ...item,
        })
      })
      Bus.$off('CarTypeChoose')
      Bus.$on('CarTypeChoose', (res) => {
        console.log(this.chooseBrandMap, 'lslslslsl')
        console.log(res)
        // 给当前选中的结果集补充
        this.chooseBrandMap.set(this.brandObj.id, {
          ...this.brandObj,
          list: res,
        })
        const ret = []
        this.chooseBrandMap.forEach((item) => {
          ret.push(item)
        })
        this.chooseBrandData = ret
        this.defaultChooseBrandData = res.map((item) => item.carModels)
        uni.$emit('storeChooseBrandData', this.chooseBrandData)
      })
    },
    methods: {
      // 切换品牌
      changeBrand() {
        Bus.$emit('toggleBrand')
        this.confirmHandler(false)
      },
      searchHandler() {},
      confirmHandler($isBack = true) {
        let ret = []
        this.chooseBrandData.forEach((item) => {
          item.list.map((i) => ret.push(i))
        })
        console.log(ret, 'ret')

        console.log(this.chooseBrandData, 'xx')
        console.log(this.origin, 'xx')

        if (this.origin === 'editProduct') {
          if (uni?.$VoEditProductForm) {
            console.log(ret.length ? ret : [], '原始数据')
            uni['$VoEditProductForm'].vehicles = ret.length ? ret : []
            uni['$VoEditProductForm'].vehiclesObj = this.chooseBrandData
            if ($isBack) {
              this.$backFn()
            }
          }
        } else {
          if (uni?.$VoPutProductForm) {
            uni['$VoPutProductForm'].vehicles = ret.length ? ret : []
            uni['$VoPutProductForm'].vehiclesObj = this.chooseBrandData
            if ($isBack) {
              this.$backFn()
            }
          }
        }
      },
      // 清空一选择的内容
      removeAllChooseData() {
        this.chooseBrandData = []
        this.defaultChooseBrandData = []
        this.chooseBrandMap.clear()
        this.$refs.brandContent.clearAll()
      },
      // 删除已关联的内容
      removeChooseData(b, iv, item) {
        console.log(item)
        const ret = []
        const bList = this.chooseBrandMap.get(b.id)
        bList.list.splice(iv, 1)
        this.chooseBrandMap.set(b.id, bList)
        this.chooseBrandMap.forEach((item) => {
          ret.push(item)
        })
        this.chooseBrandData = ret
        this.$refs.brandContent.clearCheck(item.carModels, item.pid)
      },
      // 查看已关联的车型
      checkRelationCarHandler() {
        this.show = true
      },
      // 切换品牌触发
      toggleBrandHandler() {
        this.tabIndex = -1
        this.queryForm.year = ''
        this.queryForm.brandIds = ''
        this.queryForm.displacementInduction = ''
        this.queryForm.transmissionDescription = ''
      },
      // 变速箱变化搜索
      transmissionChange(res) {
        this.queryForm.transmissionDescription = res.join(',')
        this.tabIndex = -1
      },
      // 排量变化
      displacementChange(res) {
        this.queryForm.displacementInduction = res.join(',')
        this.tabIndex = -1
      },
      // 年款搜索变化
      yearChange(res) {
        this.queryForm.year = res.join(',')
        this.tabIndex = -1
      },
      // 车系搜索变换
      tabOneChangeHandler(res) {
        this.queryForm.brandIds = res.join(',')
        this.tabIndex = -1
      },
      chooseTab(index) {
        this.tabIndex = this.tabIndex === index ? -1 : index
      },
      async initParams() {
        const { data, code } = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectParameters({
          brandid: this.brandObj.id,
        })
        if (+code === 20001) {
          this.series = [{ subbrand: '全部', type: -1, value: '全部' }].concat(data.series)

          const tmpYear = data.year.map((item) => {
            return {
              ...item,
              value: item.value + '年',
              order: +item.value,
            }
          })

          this.year = this.$vocenApi._.orderBy(tmpYear, ['order'], ['desc'])
          this.transmission = data.transmission
          this.displacement_induction = data.displacement_induction
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .brand {
    padding: 16rpx 32rpx;

    .brand-name {
      @include black-size-color(24, 0.45);
    }

    .toggle-brand {
      padding: 10rpx 20rpx;
      color: $v-c0-85;
      font-size: 0;
      border: 1px solid $v-c0-25;
      border-radius: 16px;

      .icon {
        position: relative;
        top: 1px;
      }

      .switch-text {
        font-size: 24rpx;
        line-height: 1.5;
      }
    }
  }

  .car-inner {
    padding-top: 20rpx;

    .car-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20rpx;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .remove-btn {
      width: 104rpx;
      height: 48rpx;
      justify-content: center;
      align-items: center;
      display: flex;
      font-size: 24rpx;
      color: #ff5319;
      border: 1px solid #ff5319;
      border-radius: 100px;
    }

    .car-name {
      @include black-size-color(26, 0.85);
    }
  }

  .all-relation {
    @include black-size-color(30, 0.85);
  }

  .clear-all {
    color: #828282;
    font-size: 28rpx;
  }

  .brand-list--block {
    display: flex;
    align-items: center;
    padding-top: 20rpx;

    .brand-logo {
      width: 48rpx;
      height: 48rpx;
      font-size: 0;
      margin-right: 16rpx;

      .brand-logo-img {
        width: 48rpx;
        height: 48rpx;
      }
    }

    .brand-text {
      color: black;
      font-weight: bold;
      line-height: 1.5;
      font-size: 34rpx;

      .brand-list--num {
        font-size: 20rpx;
        margin-left: 15rpx;
      }
    }
  }

  .car-info {
    padding: 20rpx 30rpx;
  }

  .car-list {
    width: 100vw;
    height: 760rpx;
    overflow-y: scroll;
    position: relative;
    padding: 0 10px 20px;
    box-sizing: border-box;
  }

  .tab-list {
    display: flex;
    background-color: white;
    position: relative;

    .tab-content {
      box-sizing: border-box;
      border-top: 1px solid #f7f7f8;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      z-index: 5;
      transform: translate(0, 100%);

      &.scroll-view {
        height: calc(100vh - 130px);
        z-index: 4;
      }
    }

    .tab-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80rpx;

      &.filter {
        border-left: 1px solid #f7f7f8;

        .tab-name {
          @include black-size-color(26, 0.45);
        }
      }

      .tab-name {
        font-size: 26rpx;
        @include black-color(0.85);
        line-height: 1.5;
      }

      .tab-icon {
        transition: all 0.3s;
      }

      &.active {
        .tab-icon {
          transform: rotate(180deg);
        }

        .tab-name {
          color: #ff5319;
        }
      }
    }
  }

  .put-operate-save {
    z-index: 1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
