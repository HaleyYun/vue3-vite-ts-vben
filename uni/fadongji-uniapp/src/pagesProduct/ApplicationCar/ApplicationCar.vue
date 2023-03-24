<template>
  <view class="application-car">
    <VoNav is-fixed :left-width="240" :right-width="240" is-have-more title="适配车型" />

    <!--  车型搜索结果页面：start	-->
    <view v-if="!chooseCarType" class="brand-content">
      <BrandList :height="branchScrollHeight" @change="chooseBrandHandler" />
    </view>
    <!--  车型搜索结果页面：end	-->

    <!--  车型筛选：start	-->
    <view v-else class="brand-select">
      <BrandSelect :origin="origin" :brand="brandTarget" />
    </view>
    <!--  车型筛选：end	-->
  </view>
</template>

<script>
  import BrandList from './components/List'
  import BrandSelect from './components/BrandSelect'
  import Bus from '@/common/Bus'

  export default {
    name: 'ApplicationCar',
    components: { BrandList, BrandSelect },
    provide() {
      return {
        brand: () => this.brandTarget,
        selectData: () => this.selectData,
      }
    },
    data() {
      return {
        chooseCarType: false,
        searchValue: '',
        showDirect: false,
        actionText: '搜索',
        actionStyle: {
          fontSize: '32rpx',
          color: '#22284B',
        },
        branchScrollHeight: 'calc(100vh - 90px)',
        brandTarget: {},
        selectData: [],
        origin: '',
      }
    },
    onLoad(options) {
      this.origin = options.origin
    },
    mounted() {
      Bus.$on('toggleBrand', () => {
        this.brandTarget = false
        this.chooseCarType = false
      })
      uni.$on('storeChooseBrandData', (res) => {
        console.log(res, 'xx11')
        this.selectData = res
      })
      let chooseObj = []
      if (this.origin === 'editProduct') {
        if (uni?.$VoEditProductForm) {
          chooseObj = uni['$VoEditProductForm'].vehiclesObj || []
        }
      } else {
        if (uni?.$VoPutProductForm) {
          chooseObj = uni['$VoPutProductForm'].vehiclesObj || []
        }
      }
      if (chooseObj.length) {
        this.chooseBrandHandler(chooseObj[0])
      }
    },
    methods: {
      // 选择品牌的回调
      chooseBrandHandler(brand) {
        this.brandTarget = brand
        this.chooseCarType = true
      },
    },
  }
</script>

<style scoped lang="scss">
  .brand-content {
    min-height: calc(100vh - 90px);
  }

  .put-operate {
    justify-content: flex-end;
  }

  .search-box {
    padding: 12rpx 32rpx;
    background-color: #fff;
  }
</style>
