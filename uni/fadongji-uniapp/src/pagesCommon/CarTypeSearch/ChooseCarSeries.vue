<template>
  <view class="flex flex-column vh-full overflow-hidden">
    <CarBreadCrumb />
    <scroll-view scroll-y class="flex1 bg-white overflow-hidden">
      <view v-if="serialList.length && loaded">
        <view v-for="(s, i) in serialList" :key="i">
          <view class="bg-F7F7F8 px-26">
            <view class="py-12 fz-24 color-block-45">{{ s.manufactor }}</view>
          </view>
          <view>
            <view
              v-for="(item, index) in s.series"
              :key="index"
              class="p-l-32 bg-white"
              @click="toNextHandler(item, `${s.manufactor} ${item}`)"
            >
              <view class="p-r-42 border-bottom">
                <view class="py-24 flex flex-vertical-c flex-justify-between">
                  <view class="color-block-85 fz-28 lh150 font-weight-500">{{ item }}</view>
                  <VoIcon name="arrow-right" size="18" color="#000" opacity="0.45" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <VoNoData
        v-if="!serialList.length && loaded"
        :no-data-tips="['暂无匹配信息']"
        :paddingTop="0"
      />
    </scroll-view>
  </view>
</template>

<script>
  import CarBreadCrumb from './components/CarBreadCrumb'
  export default {
    name: 'ChooseCarSeries',
    components: {
      CarBreadCrumb,
    },
    data() {
      return {
        queryParams: {
          filterType: 1,
        },
        serialList: [],
        previewData: null,
        loaded: false,
      }
    },
    onShow() {
      // 获取上一级选择数据
      const previewData = this.$storage.get('CarTypeChooseProgress')
      if (previewData) {
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
        const { data } = await this.$VoHttp.apiBusinessVehicleFilter(this.queryParams)
        this.serialList = data.serialList || []
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
      toChooseBrand() {
        uni.navigateBack({
          delta: this.delta,
        })
      },
      toNextHandler(item, name) {
        const { queryParams, routeInfoList } = this.previewData
        const newQueryParams = {
          ...queryParams,
          series: item,
        }
        const newRouteInfoList = [
          ...routeInfoList,
          {
            name: name,
            query: {
              series: item,
            },
          },
        ]
        this.previewData.queryParams = newQueryParams
        this.previewData.delta = 2
        this.previewData.routeInfoList = newRouteInfoList
        this.$storage.set('CarTypeChooseProgress', this.previewData)
        uni.navigateTo({
          url: '/pagesCommon/CarTypeSearch/ChooseCardDisplacement',
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
