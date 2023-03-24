<template>
  <view class="container">
    <VoNav is-fixed is-have-more title="添加车型" />
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
      <VoTree
        class="bg-white"
        :dataList="treeList"
        @btnFn="btnFn"
        btn-text="添加"
        cancen-btn-text="取消添加"
        :can-select="true"
        btn-width="152"
      />
    </scroll-view>
    <VoNoData v-else-if="!isLoading && !treeList.length" no-data-tips="暂无适配车型" />
    <view class="bg-white btn" v-if="!isLoading">
      <EraButton circle text="保存" @click="saveCarModel" />
      <VoSafetyArea :is-fixed="false" />
    </view>
    <view v-if="showTop" class="toTop" @click="scrollTop = 0">
      <VoIcon name="open-close" size="20" />
    </view>
  </view>
</template>
<script>
  import VoTree from '@/components/VoTree/VoTree.vue'
  export default {
    name: 'AddCarModel',
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
        vehicles: [],
        isLoading: false,
      }
    },
    methods: {
      /**
       * 获取数据列表
       * @param id  品牌id
       */
      getTreeList(id) {
        this.$VoHttp
          .apiBusinessVehicleQueryBindVehicle({ brandId: id })
          .then((res) => {
            if (res.data && res.data.length) {
              res.data[0].isParent = true
              res.data[0].disableHide = true
              res.data[0].isShow = true
              let brandList = this.$storage.get('carModelList').list
              if (!brandList) {
                this.treeList = res.data
                return
              }
              let brand = brandList.find((item) => item.name === res.data[0].name)
              this.fomatterCarModelStatus(res.data[0], brand)
              console.log(brand);
              this.vehicles = []
              brandList.forEach((item) => {
                this.fomatterIds(item)
              })
              let obj = {
                list: brandList,
                vehicles: Array.from(new Set(this.vehicles)),
              }
              this.$storage.set('carModelList', obj)
              this.treeList = res.data
            }
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络连接错误')
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      /**
       * 格式化适配车型数据  更新选中状态
       * @param data  被格式化数据
       * @param brand  相同品牌数据
       */
      fomatterCarModelStatus(data, brand) {
        if (brand) {
          data.list.forEach((item) => {
            let series = brand.list.findIndex((it) => it.name === item.name)
            if (series !== -1) {
              let len = 0
              item.list.forEach((ite) => {
                let index = brand.list[series].list.findIndex((it) => it.name === ite.name)
                if (index !== -1) {
                  ite.isSelected = true
                  console.log(brand.list[series].list[index]);
                  brand.list[series].list[index] = ite
                  len++
                }
              })
              if (item.list.length === len) {
                item.isSelected = true
              }
            }
          })
        }
        // let arr = this.$storage.get('carModelList').vehicles
        // let len = 0
        // if (!arr) return
        // data.list.forEach((item) => {
        //   if (item.list && item.list.length > 0) {
        //     this.fomatterCarModelStatus(item)
        //   } else {
        //     if (arr.indexOf(item.levelid) !== -1) {
        //       item.isSelected = true
        //       len++
        //     }
        //     if (data.list.length === len) {
        //       data.isSelected = true
        //     }
        //   }
        // })
      },
      // 保存
      saveCarModel() {
        this.vehicles = []
        let origin = this.$storage.get('carModelList')
        if (!origin || !origin.list.length) {
          this.treeList[0].list.forEach((item) => {
            this.fomatterIds(item)
          })
          let obj = {
            list: [
              {
                name: this.treeList[0].name,
                id: this.treeList[0].id,
                list: this.fomatterSaveTree(),
                isParent: true,
              },
            ],
            vehicles: Array.from(new Set(this.vehicles)),
          }
          this.$storage.set('carModelList', obj)
        } else {
          this.mergeSelectData()
        }
        uni.$emit('addCarModel', true)
        this.$backFn(2)
      },
      // 合并选中数据（更新本地缓存）
      mergeSelectData() {
        let origin = this.$storage.get('carModelList')
        let index = origin.list.findIndex((item) => item.id === this.treeList[0].id)
        // 品牌相同
        if (index !== -1) {
          let brandEqual = origin.list.find((item) => item.id === this.treeList[0].id)
          this.isSeriesEqual(brandEqual, origin.vehicles)
          origin.list[index] = brandEqual
        } else {
          origin.list.push({
            name: this.treeList[0].name,
            id: this.treeList[0].id,
            list: this.fomatterSaveTree(),
            isParent: true,
          })
        }
        console.log(origin);
        origin.list.forEach((item) => {
          this.fomatterIds(item)
        })
        console.log(this.vehicles);
        origin.vehicles = Array.from(new Set(this.vehicles))
        this.$storage.set('carModelList', origin)
      },
      /**
       * 格式化页面缓存id
       * @param item
       */
      fomatterIds(item) {
        if (item.list && item.list.length) {
          item.list.forEach((it) => {
            this.fomatterIds(it)
          })
        } else {
          console.log(item);
          if (item.levelIds && item.isSelected) {
            this.vehicles.push(...item.levelIds)
          }
        }
      },
      /**
       * 格式化并筛选出被选中的车型，并组成车系
       * @returns {*[]} 组装好的车系列表
       */
      fomatterSaveTree() {
        let arr = []
        let seriesArr = this.treeList[0].list
        seriesArr.forEach((item) => {
          let selectedArr = item.list.filter((item) => item.isSelected)
          if (selectedArr.length) {
            arr.push({
              name: item.name,
              list: selectedArr,
            })
          }
        })
        return arr
      },
      /**
       * 车系、车型对比去重
       * @param brand 品牌
       * @param vehicles id库
       */
      isSeriesEqual(brand, vehicles) {
        let originBrandArr = brand.list.map((item) => item.name)
        this.treeList[0].list.forEach((item) => {
          let index = originBrandArr.indexOf(item.name)
          // 是否存在该车系
          if (index !== -1) {
            item.list.forEach((it) => {
              if (vehicles.indexOf(it.levelid) !== -1) {
                // 存在，判断当前选中状态
                if (!it.isSelected) {
                  let index = originBrandArr.indexOf(item.name)
                  if (brand.list[index].list.length > 2) {
                    let arr = brand.list[index].list.filter((i) => {
                      if (i.levelid !== it.levelid) {
                        console.log(i);
                        return i
                      }
                    })
                    console.log(arr);
                    brand.list[index].list = arr
                  } else {
                    brand.list.splice(index, 1)
                  }
                }
              } else {
                // 不存在，判断当前选中状态
                if (it.isSelected) {
                  brand.list[index].list.push(it)
                }
              }
            })
          } else {
            let arr = item.list.filter((item) => item.isSelected)
            if (arr.length) {
              brand.list.push({
                name: item.name,
                list: arr,
              })
            }
          }
        })
      },
      /**
       * 车型id合并去重
       * @param arr1 原数组
       * @param arr2 被选中数据数组
       * @returns {*[]} 合并后的数组
       */
      vehiclesUnique(arr1, arr2) {
        return Array.from(new Set([...arr1, ...arr2]))
      },
      /**
       * tree组件按钮事件
       * @param item  当前被点击按钮
       */
      btnFn(item) {
        let isSelected = !item.isSelected
        // let bool = this.checkSelectLength(item, isSelected)
        // if (bool) {
        //   this.$u.toast('')
        // }
        this.selectThis(item, isSelected)
        console.log(this.treeList)
        let arr = uni.$u.deepClone(this.treeList)
        this.treeList = []
        this.$forceUpdate()
        this.treeList = uni.$u.deepClone(arr)
        this.fomatterIds(this.treeList[0])
      },
      /**
       * 检查新选择数据长度是否超限制
       * @param data  新选择数据
       * @param{boolean} type 选择类型（新选择，取消选择）
       * @returns {boolean}
       */
      checkSelectLength(data, type) {
        let len = 0
        if (data.list && data.list.length) {
          data.list.forEach((item) => {
            if (type) {
              // 只计算新增
              if (!item.isSelected) {
                len += item.levelIds.length
              }
            } else {
              // 只计算减少
              len = len - item.levelIds.length
            }
          })
        } else {
          if (type) {
            len = data.levelIds.length
          } else {
            len = 0 - data.levelIds.length
          }
        }
        return this.vehicles.length + len >= 5000
      },
      /**
       * 设置按钮选中状态
       * @param item  当前被选中数据
       * @param isSelected  需要被设置的状态值
       */
      selectThis(item, isSelected) {
        if (item.list && item.list.length) {
          this.$set(item, 'isSelected', isSelected)
          item.list.forEach((it) => {
            this.$set(it, 'isSelected', isSelected)
            if (it.list && it.list.length) {
              this.selectThis(it, isSelected)
            }
          })
        } else {
          this.$set(item, 'isSelected', isSelected)
          this.isSelectAll(item)
        }
      },
      /**
       * 查找车系
       * @param target 当前选中元素
       */
      isSelectAll(target) {
        let arr = this.treeList[0].list
        let parent = arr.find((item) => item.name === target.series)
        let selectedArr = parent.list.filter((item) => item.isSelected)
        parent.isSelected = selectedArr.length === parent.list.length
      },
      // 滑动触发判断是否固定
      scrollHandler({ detail: { scrollTop } }) {
        this.showTop = scrollTop >= 200
        uni.$u.debounce(() => {
          this.scrollTop = scrollTop
        }, 500)
      },
    },
    //生命周期 - 页面加载（可以访问当前this实例）
    onLoad(options) {
      if (options.id) {
        this.isLoading = true
        this.getTreeList(options.id)
      }
    },
    //生命周期 - 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {},
    //生命周期 - 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //生命周期 - 监听页面隐藏
    onHide() {},
    //生命周期 - 监听页面卸载
    onUnload() {},
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
