<template>
  <view class="container">
    <VoNav is-fixed is-have-more title="适配车型" />
    <scroll-view
      v-if="treeList.length"
      :refresher-threshold="0"
      :refresher-triggered="triggered"
      class="flex1 overflow-y"
      :scroll-top="scrollTop"
      scroll-with-animation
      scroll-y
      @scroll="scrollHandler"
    >
      <VoTree :dataList="treeList" @btnFn="btnFn" btn-text="移除" />
    </scroll-view>
    <VoNoData v-else no-data-tips="暂无适配车型" />
    <view class="bg-white btn">
      <view class="flex flex-vertical-c flex-justify-between">
        <EraButton size="small" circle themeType="default" text="确定" @click="$backFn" />
        <EraButton
          size="small"
          circle
          text="添加更多车型"
          @click="$linkToEasy('/pagesProduct/ApplicationCar/ApplicationCarNew')"
        />
      </view>
      <VoSafetyArea :is-fixed="false" />
    </view>
    <view v-if="showTop" class="toTop" @click="scrollTop = 0">
      <VoIcon name="open-close" size="20" />
    </view>
  </view>
</template>
<script>
import VoTree from "@/components/VoTree/VoTree.vue";

export default {
    name: 'ApplicableModel',
    components: {
      VoTree,
    },
    data() {
      return {
        showTop: false,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        total: 0,
        treeList: [],
        modelId: 0,
        vehicles: [],
      }
    },
    methods: {
      // 树形结构按钮事件
      btnFn(item) {
        this.vehicles = []
        let index
        if (item.levelid) {
          let brand = this.treeList.find((it) => it.id === item.brandId)
          let series = brand.list.find((it) => it.name === item.series)
          index = series.list.findIndex((it) => it.name === item.series)
          series.list.splice(index, 1)
          if (!series.list.length) {
            brand.list.splice(index, 1)
            if (!brand.list.length) {
              this.treeList = this.treeList.filter((it) => it.list && it.list.length)
            }
          }
        } else if (item.isParent) {
          index = this.treeList.findIndex((it) => it.id === item.id)
          this.treeList.splice(index, 1)
        } else {
          let brandId = item.list[0].brandId
          let brand = this.treeList.find((it) => it.id === brandId)
          index = brand.list.findIndex((it) => it.name === item.name)
          brand.list.splice(index, 1)
          if (!brand.list.length) {
            this.treeList = this.treeList.filter((it) => it.list && it.list.length)
          }
        }
        console.log(this.treeList);
        if (this.treeList.length) {
          this.treeList.forEach((item) => {
            if (item.list && item.list.length) {
              this.fomatterCarModelStatus(item.list)
            }
          })
          let obj = {
            list: this.treeList,
            vehicles: this.vehicles,
          }
          this.$storage.set('carModelList', obj)
        } else {
          this.$storage.remove('carModelList')
        }
      },
      // 滑动触发判断是否固定
      scrollHandler({ detail: { scrollTop } }) {
        this.showTop = scrollTop >= 200
        uni.$u.debounce(() => {
          this.scrollTop = scrollTop
        }, 500)
      },
      getList() {
        this.vehicles = []
        this.$VoHttp.apiBusinessVehicleQueryBindVehicle({ modelId: this.modelId }).then((res) => {
          console.log(res)
          if (res.data && res.data.length) {
            res.data.forEach((item) => {
              item.isParent = true
              this.fomatterCarModelStatus(item.list)
            })
            let obj = {
              list: res.data,
              vehicles: Array.from(new Set(this.vehicles)),
            }
            this.$storage.set('carModelList', obj)
          } else {
            uni.redirectTo({
              url: '/pagesProduct/ApplicationCar/ApplicationCarNew',
            })
          }
        })
      },
      // 格式化适配车型数据
      fomatterCarModelStatus(data) {
        data.forEach((item) => {
          if (item.list && item.list.length) {
            this.fomatterCarModelStatus(item.list)
          } else {
            this.vehicles.push(...item.levelIds)
          }
        })
      },
    },
    //生命周期 - 页面加载（可以访问当前this实例）
    onLoad(option) {
      this.modelId = option.modelId
    },
    //生命周期 - 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {
      this.vehicles = []
      if (this.$storage.get('carModelList')) {
        this.treeList = this.$vocenApi._.cloneDeep(this.$storage.get('carModelList').list)
        if (this.treeList.length) {
          this.treeList.forEach((item) => {
            this.fomatterCarModelStatus(item.list)
          })
          this.treeList[0].isShow = true
          let obj = {
            list: this.treeList,
            vehicles: Array.from(new Set(this.vehicles)),
          }
          this.$storage.set('carModelList', obj)
        } else {
          this.getList()
        }
      } else {
        this.getList()
      }
    },
    //生命周期 - 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //生命周期 - 监听页面隐藏
    onHide() {
      console.log("zxc");
    },
    //生命周期 - 监听页面卸载
    onUnload() {
      console.log("asd");
      this.$emit('addCarModel', true)
    },
    //生命周期 - 监听窗口尺寸变化
    onResize() {},
    //生命周期 - 监听用户下拉动作，一般用于下拉刷新
    onPullDownRefresh() {},
    //生命周期 - 页面滚动到底部的事件
    onReachBottom() {},
  }
</script>
<style scoped lang="scss">
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .toTop {
    width: 72rpx;
    height: 72rpx;
    background: #ffffff;
    box-shadow: 0 4rpx 16rpx rgba(34, 40, 75, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 32rpx;
    bottom: 15vh;
  }

  .btn {
    padding: 24rpx 32rpx;
  }
</style>
