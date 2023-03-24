<template>
  <view class="flex flex-column vh-full overflow-hidden">
    <CarBreadCrumb />
    <view class="bg-white px-32">
      <view class="p-b-32">
        <VoSearch
          v-model="keyword"
          :height="34"
          :actionStyle="{ color: 'rgba(0, 0, 0, 0.85)' }"
          placeholder="在结果中搜索"
          @search="initData"
          @custom="initData"
        />
      </view>
    </view>
    <scroll-view scroll-y class="flex1 bg-white overflow-hidden">
      <view v-if="paramList.length && loaded">
        <view v-for="(item, index) in paramList" :key="index">
          <view>
            <view class="p-l-32 bg-white" @click="toNextHandler(item)">
              <view class="p-r-42 border-bottom">
                <view class="py-24 flex flex-vertical-c flex-justify-between">
                  <view class="fz-28 lh150 font-weight-500">
                    <view class="color-block-85 fz-32 lh150">
                      {{ item.transName }}
                    </view>
                    <view class="color-block-65 fz-28 m-t-8">
                      {{ item.transDesc }}
                    </view>
                  </view>
                  <VoIcon name="arrow-right" size="18" color="#000" opacity="0.45" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <VoNoData
        v-if="!paramList.length && loaded"
        :no-data-tips="['暂无匹配信息']"
        :paddingTop="0"
      />
    </scroll-view>
  </view>
</template>

<script>
  import CarBreadCrumb from './components/CarBreadCrumb'
  export default {
    name: 'ChooseCarResult',
    components: {
      CarBreadCrumb,
    },
    data() {
      return {
        queryParams: {
          filterType: 5,
        },
        previewData: null,
        paramList: [],
        keyword: '',
        targetResultUrl: '',
        loaded: false,
      }
    },
    onShow() {
      // 获取上一级选择数据
      const previewData = this.$storage.get('CarTypeChooseProgress')
      console.log(previewData, 'xx')
      if (previewData) {
        this.targetResultUrl = previewData.url
        this.previewData = previewData
        this.queryParams = {
          ...this.queryParams,
          ...previewData.queryParams,
        }
        this.initData()
      }
    },
    methods: {
      async initData() {
        const { data } = await this.$VoHttp.apiBusinessVehicleFilter({
          ...this.queryParams,
          paramSearch: this.keyword,
        })
        this.paramList.length = 0
        this.paramList = data.paramList
          ? data.paramList.map((item) => {
              return {
                ...item,
                transName: `${item.model} ${item.displacement}${
                  item.displacement === '电动' ? '' : 'T'
                } ${item.transmissionDescription} ${item.year}款`,
                transDesc: ` ${item.engineModel} ${item.powerKw}${item.powerKw ? 'KW' : ''} ${item.emissionStandard}`,
              }
            })
          : []
        this.loaded = true
      },
      backHandler(item, flag) {
        if (flag) {
          const delta = item.delta
          uni.navigateBack({
            delta,
          })
        }
      },
      toNextHandler(item) {
        this.$storage.set('ApplicationResultGoodsIdList', item.goodsIdList || [])
        this.$storage.set('ApplicationResultGoodBrandInfo', {
          ...item,
          brandInfo: this.previewData.navData,
        })
        uni.navigateTo({
          url: this.targetResultUrl,
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .title {
    @include black-size-color(32, 0.85);
  }
</style>
