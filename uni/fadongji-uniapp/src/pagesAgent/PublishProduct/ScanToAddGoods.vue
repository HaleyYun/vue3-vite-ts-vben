<template>
  <view class="container">
    <!-- NavBar -->
    <VoNav :title="title" is-fixed is-have-more isShadow class="m-b-16"> </VoNav>
    <!-- 商品信息 -->
    <view v-if="!hideGoods" class="goods">
      <view class="goods-image">
        <image :src="goodsInfo.pic" class="img" mode="aspectFill" />
      </view>
      <view class="flex1 fz-32 color-block">
        <view class="goods-title overTwoEllipsis">
          <text class="sign font-shu-hei-ti">{{ goodsInfo.categoryType }}</text>
          <text class="fz-b">{{ goodsInfo.name }}</text>
        </view>
        <view class="fz-b">
          <text>商家仓总库存：</text>
          <text class="goods-count">{{ total }}</text>
        </view>
      </view>
    </view>
    <!-- 扫码组件 -->
    <ScanList
      :list.sync="scanList"
      :total-count="scanList.length || 0"
      :typeIndex="type"
      :mGoodsId="mGoodsId"
      class="flex1"
    />

    <!-- 底部按钮 -->
    <view class="bg-white border-top btnBar">
      <EraButton :text="saveBtnTitle" @click="sure" />
      <VoSafetyArea :is-fixed="false" />
    </view>
  </view>
</template>
<script>
  import ScanList from '@/pagesAgent/PublishProduct/components/ScanList'

  export default {
    name: 'ScanToAddGoods',
    components: {
      ScanList,
    },
    data() {
      return {
        id: '', //需要补货的商品id
        hideGoods: false, // 是否不要展示商品
        total: 0, // 商家仓总库存
        title: '', // 标题名
        saveBtnTitle: '', // 确认入/出库按钮名
        type: 1, // 类型：1.商家仓扫码补货 2.商家仓手动出库 3.一件上架
        // 商品信息
        goodsInfo: {},
        // 识别码列表
        scanList: [
          // { value: 'NUI19874327421483' },
          // { value: 'NUI19874327421483', tips: '该识别码已入库到「江陵动力B12」,请清除。' },
          // { value: 'NUI19874327421483' },
          // { value: 'NUI19874327421483' },
          // { value: 'NUI19874327421483', tips: '该识别码已入库到「江陵动力B12」,请清除。' },
          // { value: 'NUI19874327421483' },
          // { value: 'NUI19874327421483' },
          // { value: 'NUI19874327421483', tips: '该识别码已入库到「江陵动力B12」,请清除。' },
          // { value: 'NUI19874327421483' },
          // { value: 'NUI19874327421483' },
        ],
        isLoading: false,
        mGoodsId: '',
      }
    },
    methods: {
      // 确定入库/出库
      sure() {
        console.log("this.scanList ------>",this.scanList)
        if (!this.scanList.length) {
          this.$u.toast('请至少录入1个发动机识别码')
          return
        }
        // let goodsTips = this.scanList.map((item) => item.tips).join()
        // console.log('goodsTips', goodsTips)
        // console.log('scanList', this.scanList)
        // if (goodsTips.indexOf('该识别码已入库到') > -1) {
        //   if (this.type === 1) {
        //     this.$u.toast('入库失败，录入的识别码与库存中已有码重复。')
        //   } else if (this.type === 2) {
        //     this.$u.toast('出库失败，录入的识别码与库存中已有码重复。')
        //   }
        //   return
        // }

        let goodsVin = this.scanList.map((item) => item.value).join()
        console.log("goodsVin --->",goodsVin)
        let boList = [
          {
            goodsVin: goodsVin,
            goodsId: this.goodsInfo.id,
          },
        ]

        // 1.确定入库
        if (Number(this.type) === 1) {
          this.$VoHttp.WAREHOUSE.apiWarehouseOperFacilitatorSelfRefillBatch({
            boList,
          })
            .then((res) => {
              console.log(res, 'res')
              let data = res.data
              // 不重复，校验通过
              if (data.code === 0) {
                uni.$u.toast('入库成功')
                setTimeout(() => {
                  this.$backFn()
                }, 2000)
              } else if (data.code === 1) {
                // 部分重复，校验通过
                uni.$u.toast(data.message)
                setTimeout(() => {
                  this.$backFn()
                }, 2000)
              } else if (data.code === 2) {
                // 全部重复，校验不通过
                uni.$u.toast('入库失败，录入的识别码与库存中已有码重复。')
              } else if (data.code === 3) {
                // 该识别码已入库到商品名称X下，提交失败
                let repeatResukt = []
                for (let item in data.data) {
                  console.log(Number(item), 'Number(item)')
                  console.log(data.data[item], 'data.data[item]')
                  console.log(data.data, 'data.data')
                  repeatResukt.push({
                    value: Number(item),
                    label: data.data[item],
                  })
                }
                this.scanList.map((item) => {
                  repeatResukt.map((it) => {
                    if (it.value === Number(item.value)) {
                      item.tips = '该识别码已入库到「' + it.label + '」,请清除。'
                      uni.$u.toast(item.tips)
                    }
                  })
                })
              }
            })
            .catch((err) => {
              console.log(err, '9999')
              uni.$u.toast('操作失败')
            })
          setTimeout(() => {
            this.isLoading = !this.isLoading
          }, 2000)

          return
        }
        // 2.确定出库
        if (Number(this.type) === 2) {
          this.$VoHttp.WAREHOUSE.apiWarehouseOperFacilitatorSelfOutBatch({
            goodsVin: goodsVin,
          })
            .then((res) => {
              console.log(res, 'res')
              // 都在库，校验通过
              if (res.data.code === 0) {
                uni.$u.toast('出库成功')
                setTimeout(() => {
                  this.$backFn()
                }, 2000)
              } else if (res.data.code === 1) {
                uni.$u.toast(res.data.message)
                setTimeout(() => {
                  this.$backFn()
                }, 2000)
              } else if (res.data.code === 2) {
                uni.$u.toast(res.data.message)
                setTimeout(() => {
                  this.$backFn()
                }, 2000)
              }
            })
            .catch((err) => {
              uni.$u.toast('操作失败')
            })
          setTimeout(() => {
            this.isLoading = !this.isLoading
          }, 2000)

          return
        }

        // if (this.isLoading) return
        // this.isLoading = !this.isLoading

        // 伪校验，需要根据接口实际情况来写
        // let arr = this.scanList.filter((item) => item.tips)
        // if (arr.length) {
        //   if (arr.length === this.scanList.length) {
        //     this.$toast(`入库失败，录入的识别码与库存中已有码重复。`)
        //   } else {
        //     this.$toast(`入库成功，其中${arr.length}个之前已入库，本次不重复入库`)
        //   }
        // }
      },
      // 获取商品信息
      getInfo(id) {
        this.$VoHttp.GOODS.apiGoodsDetail({ id: id })
          .then((res) => {
            this.goodsInfo = res.data
            this.goodsInfo.pic =
              this.goodsInfo.pic && this.goodsInfo.pic.length ? this.goodsInfo.pic[0] : ''
            this.$forceUpdate()
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络请求失败')
          })
        // this.goodsInfo.id = id
      },
    },
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    onLoad(options) {
      if (options.hideGoods) {
        this.hideGoods = true
      } else {
        this.getInfo(options.id)
      }
      this.mGoodsId = options.id
      if (options.total) {
        this.total = options.total
      }
      this.type = Number(options.index)
      // 1.去扫码补货 2.手动出库
      if (Number(options.index) === 1) {
        this.title = '商家仓扫码补货'
        this.saveBtnTitle = '确定入库'
      }
      if (Number(options.index) === 2) {
        this.title = '商家仓手动出库'
        this.saveBtnTitle = '确定出库'
      }
    },
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {},
    //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //监听页面隐藏
    onHide() {},
    //监听页面卸载
    onUnload() {},
    //监听用户下拉动作，一般用于下拉刷新
    onPullDownRefresh() {},
    //页面滚动到底部的事件（不是scroll-view滚到底）
    onReachBottom() {},
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f7f7f8;

    .goods {
      display: flex;
      flex-wrap: nowrap;
      padding: 24rpx 32rpx;
      background-color: #fff;

      &-image {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
        overflow: hidden;
        margin-right: 16rpx;

        .img {
          width: 100%;
          height: 100%;
        }
      }

      &-title {
        //display: flex;
        width: 500rpx;
        margin-bottom: 16rpx;

        .sign {
          font-weight: 700;
          display: inline-block;
          flex-shrink: 0;
          padding: 0 12rpx;
          font-size: 32rpx;
          color: #f20014;
          // background: #ff5319;
          // border-radius: 24rpx;
          height: 36rpx;
          line-height: 36rpx;
          margin-right: 4rpx;
        }
      }

      &-count {
        color: #ff5319;
      }
    }
    .btnBar {
      width: 100vw;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
  }

  .position-f {
    position: fixed;
    z-index: 10;
  }
</style>
