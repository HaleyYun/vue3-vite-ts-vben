<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="brand flex flex-column"
  >
    <VoNav :is-fixed="false" :title="title" is-have-more />
    <view
      :class="{ active: tabOneIndex === -1 }"
      class="left-item py-20 flex flex-justify-between flex-vertical-c global-area"
    >
      <view class="flex flex-vertical-c p-l-10" @click="chooseAll(!selectKey.includes('86'))">
        <VoIcon v-if="selectKey.includes('86')" :size="24" color="#FF5319" name="select-right" />
        <VoIcon v-else :opacity="0.15" :size="24" color="#000" name="circle" />
        <view v-if="selectKey.includes('86')" class="m-l-5 lh150 fz-28 text-color"> 全国</view>
        <view v-else class="m-l-5 lh150 fz-28 color-block-45"> 全国</view>
      </view>
    </view>

    <view class="brand-content flex1 overflow-hidden">
      <scroll-view :scroll-y="true" class="brand-content__left">
        <view
          v-for="(p, i) in list"
          :key="i"
          :class="{ 'left-active': i === tabOneIndex }"
          class="left-item"
        >
          <view class="flex flex-vertical-c">
            <template v-if="selectKey.includes(p.code)">
              <VoIcon
                v-if="checkCheckStatus(p)"
                :size="24"
                color="#FF5319"
                name="select-right"
                @click="tabOneCheckHandler(p, i)"
              />
              <VoIcon
                v-else
                :size="24"
                color="#FF5319"
                name="half-check"
                @click="cancelTreeDataAll(p, true)"
              />
            </template>
            <VoIcon
              v-else
              :opacity="0.15"
              :size="24"
              color="#000"
              name="circle"
              @click="tabOneCheckHandler(p, i)"
            />
            <VoIcon v-if="false" :size="24" color="#FF5319" name="half-check" />
            <view
              v-if="selectKey.includes(p.code)"
              class="select-text m-l-5"
              @click="chooseTabOneHandler(i)"
            >
              {{ p.name }}
            </view>
            <view v-else class="m-l-5" @click="chooseTabOneHandler(i)"> {{ p.name }}</view>
          </view>
        </view>
      </scroll-view>
      <scroll-view
        :scroll-into-view="scrollIntoView"
        :scroll-top="scrollTop"
        :scroll-y="true"
        class="brand-content__right"
        scroll-with-animation
      >
        <view class="fz-30 lh150 p-l-24 p-t-24 p-b-32 text-color"
          >已选中 {{ transferLeafData().length }}
        </view>
        <view v-for="(c, i) in tabTwoList" id="collapse" :key="i">
          <u-collapse
            v-if="tabTwoList.length"
            ref="collapse"
            :border="false"
            :value="collapseValue"
            @change="collapseChange"
          >
            <u-collapse-item
              :border="false"
              :clickable="false"
              :isLink="false"
              :name="c.code"
              :title="c.name"
            >
              <view slot="title">
                <view class="flex flex-vertical-c" @click.stop>
                  <template v-if="selectKey.includes(c.code)">
                    <VoIcon
                      v-if="checkCheckStatus(c)"
                      :size="24"
                      color="#FF5319"
                      name="select-right"
                      @click="tabTwoCheckHandler(c, i)"
                    />
                    <VoIcon
                      v-else
                      :size="24"
                      color="#FF5319"
                      name="half-check"
                      @click="cancelTreeDataAll(c, true)"
                    />
                  </template>

                  <VoIcon
                    v-else
                    :opacity="0.15"
                    :size="24"
                    color="#000"
                    name="circle"
                    @click="tabTwoCheckHandler(c, i)"
                  />

                  <view> {{ c.name }}</view>
                </view>
              </view>
              <view class="u-collapse-content fz-0">
                <view class="flex right-list flex-wrap">
                  <view
                    v-for="(t, s) in c.children"
                    :key="s"
                    :class="{ active: selectKey.includes(t.code) }"
                    class="right-item"
                    @click="selectAreaHandler(t, c)"
                  >
                    <view class="right-item--inner">{{ t.name }}</view>
                  </view>
                </view>
              </view>
              <template #value>
                <view>
                  <view v-if="c.status === 'open'" class="close-icon">收起</view>
                  <view v-else class="close-icon">展开</view>
                </view>
              </template>
              <template #right-icon>
                <VoIcon :opacity="0.15" :size="20" color="#000000" name="right-arrow" />
              </template>
            </u-collapse-item>
          </u-collapse>
        </view>
      </scroll-view>
    </view>

    <view v-if="!preview" class="p-b-safe-area">
      <view class="flex py-20 flex-vertical-c flex-justify-between">
        <u-button
          class="brand-fixed__button"
          color="#FF5319"
          hoverStartTime="999999"
          hoverStayTime="0"
          plain
          shape="circle"
          size="large"
          text="重置"
          @click="resetHandler"
        />
        <u-button
          class="brand-fixed__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="确定"
          @click="confirmHandler"
        />
      </view>
    </view>
    <view v-else class="p-b-safe-area">
      <view class="flex py-20 flex-vertical-c flex-justify-between">
        <u-button
          class="brand-fixed__button"
          color="#FF5319"
          hoverStartTime="999999"
          hoverStayTime="0"
          plain
          shape="circle"
          size="large"
          text="返回"
          @click="$backFn"
        />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'BrandSelect',
    props: {
      value: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        type: 1, // 1是上货销售区域  2是 只是选择省市区 然后返回
        title: '',
        scrollIntoView: '',
        scrollTop: 0,
        selectKey: [],
        tabOneSelectKey: [],
        tabTwoSelectKey: [],
        collapseValue: [],
        list: [],
        tabOneIndex: -1,
        tabOneOldIndex: -1,
        tabOneId: '',
        tabTwoList: [],
        tabTwoIndex: -1,
        checkMap: null,
        leafTreeMap: null,
        leafData: [],
        allDataChecked: [],
        preview: false,
        selectChildrenEndLenght: 0,
      }
    },
    onShow() {},
    onHide() {
      this.$storage.remove('defaultArea')
    },
    created() {},
    methods: {
      resetHandler() {
        this.selectKey = []
      },
      chooseAll(flag) {
        if (this.preview) return
        this.tabOneIndex = -1
        if (flag) {
          this.selectKey = this.allDataChecked.concat(['86'])
        } else {
          this.selectKey = []
        }
      },
      confirmHandler() {
        // this.selectKey 全部选择
        if (!this.selectKey.length) {
          return this.$u.toast('区域不能为空')
        }
        // 只是包含叶子节点
        if (this.type === 1) {
          // 上货销售区域选择
          const leafData = this.transferLeafData()
          // 绑定信息供调用页面使用
          if (uni?.$VoPutProductForm) {
            uni['$VoPutProductForm'].salesArea = this.selectKey.includes('86') ? ['86'] : leafData
          }
          if (uni?.$VoEditProductForm) {
            uni['$VoEditProductForm'].salesArea = this.selectKey.includes('86') ? ['86'] : leafData
          }
        } else if (this.type === 2) {
          // 其他选择完返回
          const leafData = this.transferLeafData()
          uni.$emit('addressFn', this.selectKey.includes('86') ? ['86'] : leafData)
          uni.$emit('addressNames', this.selectKey.includes('86') ? ['86'] : this.getNames())
          console.log(this.getNames(), 1234567)
        }
        this.$backFn()
      },
      // 获取叶子节点
      transferLeafData() {
        const list = []
        this.$vocenApi.VoUtils.treeMap(this.list, {
          children: 'children',
          conversion: (item) => {
            if (!item.children) {
              // 非子节点
              const flag = this.selectKey.includes(item.code)
              this.selectKey.includes(item.code)
              if (flag) {
                list.push(item.code)
              }
            }
          },
        })
        return list
      },
      // 获取叶子节点
      getNames() {
        const nameList = []
        this.$vocenApi.VoUtils.treeMap(this.list, {
          children: 'children',
          conversion: (item) => {
            if (!item.children) {
              // 非子节点
              const flag = this.selectKey.includes(item.code)
              this.selectKey.includes(item.code)
              if (flag) {
                nameList.push(item.name)
                console.log(nameList, 'names')
              }
            }
          },
        })
        return nameList
      },
      // 获取叶子节点
      getList() {
        const list = []
        this.$vocenApi.VoUtils.treeMap(this.list, {
          children: 'children',
          conversion: (item) => {
            if (!item.children) {
              // 非子节点
              this.selectKey.includes(item.code)
            }
          },
        })
        return list
      },
      // 取消全部和本省
      cancelTreeDataAll(target) {
        // const index = this.selectKey.findIndex((item) => item === target.code)
        // if (index > -1) {
        // this.selectKey.splice(index, 1)
        // }
        this.toggleTreeDataAll(target.children, true)
      },
      // 获取所有子节点的map集合
      transferData() {
        const map = new Map()
        this.$vocenApi.VoUtils.treeMap(this.list, {
          children: 'children',
          conversion: (treeItem) => {
            if (treeItem.hasOwnProperty('children') && treeItem.children) {
              const t = this.getLeafData(treeItem.children)
              map.set(treeItem.code, t)
            }
          },
        })
        return map
      },
      // 获取叶子节点id所有值
      getLeafData(data) {
        const tmpArr = []
        this.$vocenApi.VoUtils.treeMap(data, {
          children: 'children',
          conversion: (treeItem) => {
            tmpArr.push(treeItem.code)
          },
        })
        return tmpArr
      },
      checkCheckStatus(one) {
        const oneCheckOrigin = this.leafTreeMap.get(one.code)
        if (oneCheckOrigin) {
          return oneCheckOrigin.every((item) => {
            return this.selectKey.includes(item)
          })
        } else {
          return false
        }
      },
      checkLeafData(id) {
        // 检测二级选择是否已经被取消完
        const oneCheckOrigin = this.checkMap.get(id)
        const flag = oneCheckOrigin.some((item) => this.selectKey.includes(item))
        if (!flag) {
          const oIndex = this.selectKey.findIndex((i) => i === id)
          this.selectKey.splice(oIndex, 1)
        }
      },
      tabTwoCheckHandler(two, index) {
        if (this.tabOneIndex < 0) return
        if (this.preview) return
        if (this.selectKey.includes(1)) return
        if (this.tabTwoIndex === index) return
        const one = this.list[this.tabOneIndex]
        if (this.selectKey.includes(two.code)) {
          const index = this.selectKey.findIndex((i) => i === two.code)
          this.selectKey.splice(index, 1)

          // 检测二级选择是否已经被取消完
          // 检测所有节点包含
          this.checkLeafData(one.code)

          // 把当前下得选中的条目全部取消
          this.toggleTreeDataAll(two.children, false)
          // 检测当前的id是否不再选择列，如果是，则把父级id选择取消
        } else {
          if (!this.selectKey.includes(one.code)) {
            this.selectKey.push(one.code)
          }
          this.selectKey.push(two.code)
          this.toggleTreeDataAll(two.children, true)
        }
        this.checkIsSelectAllHandler()
      },
      // 检测是否选择完
      checkIsSelectAllHandler() {
        const vg = this.selectKey.findIndex((item) => item === '86')
        if (vg > -1) {
          this.selectKey.splice(vg, 1)
        }
        const checkAll = this.list.every((item) => {
          return this.selectKey.includes(item.code)
        })
        if (checkAll) {
          this.selectKey.push('86')
        } else {
          const index = this.selectKey.findIndex((item) => item === '86')
          if (index > -1) {
            this.selectKey.splice(index, 1)
          }
        }
      },
      tabOneCheckHandler(one) {
        if (this.preview) return
        if (this.selectKey.includes(one.code)) {
          const index = this.selectKey.findIndex((i) => i === one.code)
          this.selectKey.splice(index, 1)
          // 把当前下得选中的条目全部取消
          this.toggleTreeDataAll(one.children, false)
        } else {
          this.selectKey.push(one.code)
          // 把当前下得选中所有的都取消
          this.toggleTreeDataAll(one.children, true)
        }
        this.checkIsSelectAllHandler()
      },
      toggleTreeDataAll(data, flag) {
        this.$vocenApi.VoUtils.treeMap(data, {
          children: 'children',
          conversion: (res) => {
            if (flag) {
              if (!this.selectKey.includes(res.code)) {
                this.selectKey.push(res.code)
              }
            } else {
              const index = this.selectKey.findIndex((i) => i === res.code)
              this.selectKey.splice(index, 1)
            }
          },
        })
      },
      // 展开和关闭的处理
      collapseChange(res) {
        const target = res[0]
        this.tabTwoList = this.tabTwoList.map((item) => {
          if (item.code === target.name) {
            item.status = target.status
          }
          return item
        })
      },
      // 区域的选择
      selectAreaHandler(item, two) {
        if (this.preview) return

        if (this.selectKey.includes(item.code)) {
          const index = this.selectKey.findIndex((i) => i === item.code)
          this.selectKey.splice(index, 1)
          this.checkLeafData(two.code)
          this.checkLeafData(this.list[this.tabOneOldIndex].code)
        } else {
          if (!this.selectKey.includes(two.code)) {
            this.selectKey.push(two.code)
          }
          if (!this.selectKey.includes(this.list[this.tabOneOldIndex].code)) {
            this.selectKey.push(this.list[this.tabOneOldIndex].code)
          }
          this.selectKey.push(item.code)
        }

        const leafSelect = this.transferLeafData().length
        if (leafSelect === this.selectChildrenEndLenght) {
          this.selectKey.unshift('86')
        } else {
          const index = this.selectKey.findIndex((item) => item === '86')
          if (index > -1) {
            this.selectKey.splice(index, 1)
          }
        }
        // 判断是否全选
        // this.checkIsSelectAllHandler()
      },
      // 一级区域的选择
      chooseTabOneHandler(index) {
        if (this.tabOneIndex === index) return
        this.initData(index)
      },
      async initAddressData() {
        const ret = await this.$VoHttp.GOODS.apiGoodsSealAreaQueryList()
        const selectCode = []
        const parentCode = []
        const leafData = []
        this.list = ret.data
        this.initData()
        this.checkMap = new Map()
        this.$vocenApi.VoUtils.treeMap(this.list, {
          children: 'children',
          conversion: (item) => {
            if (!item.children) {
              leafData.push(item.code)
            }
            this.allDataChecked.push(item.code)
            if (!item.children && +this.selectKey[0] !== 86) {
              const flag = this.selectKey.includes(item.code)
              if (flag) {
                selectCode.push(item.code)
                parentCode.push(item.pid)
              }
            }
            if (item.hasOwnProperty('children') && item.children) {
              // 非子节点
              this.checkMap.set(
                item.code,
                item.children.map((item) => item.code),
              )
            }
          },
        })
        this.selectChildrenEndLenght = leafData.length
        const filteRcode = [...new Set(parentCode)]
        const list = []
        this.list.forEach((item) => {
          if (item.children) {
            item.children.forEach((t) => {
              if (filteRcode.includes(t.code)) {
                list.push(item.code)
              }
            })
          }
        })

        const tmp = [...new Set(list)]
        this.selectKey =
          +this.selectKey[0] === 86
            ? this.allDataChecked.concat(this.selectKey)
            : selectCode.concat(filteRcode).concat(tmp)
        this.leafTreeMap = this.transferData()
      },
      // 初始化数据
      initData(index = 0) {
        // 拿数据
        if (this.list.length) {
          this.tabOneIndex = index
          this.tabOneOldIndex = index
          this.tabTwoList.length = 0
          this.collapseValue.length = 0
          this.tabOneId = this.list[this.tabOneIndex].code
          this.$nextTick(() => {
            this.tabTwoList = [...this.list[this.tabOneIndex].children]
            this.tabTwoList = this.tabTwoList.map((i) => {
              this.collapseValue.push(i.code)
              return {
                ...i,
                status: 'open',
              }
            })
          })
        }
      },
    },
    onLoad(options) {
      this.preview = !!options.preview
      if (options.title) {
        this.title = options.title
      } else {
        this.title = '销售区域'
      }
      if (options.type) {
        this.type = Number(options.type)
      }
      let defaultArea = this.$storage.get('defaultArea') || []
      console.log(defaultArea, 'defaultArea')
      this.selectKey = defaultArea ? defaultArea.map((item) => item.toString()) : []
      this.initAddressData(this.selectKey)
    },
  }
</script>

<style lang="scss" scoped>
  .brand {
    .global-area {
      background-color: #f6f7f8;
      position: relative;

      &.active {
        background-color: #fff;

        &:after {
          content: '';
          width: 6rpx;
          height: 100rpx;
          position: absolute;
          left: 0rpx;
          top: 0rpx;
          background-color: #ff5319;
        }
      }
    }

    .right-list {
      margin: 0 -10rpx;
    }

    .close-icon {
      color: rgba(0, 0, 0, 0.45);
      font-size: 24rpx;
    }

    width: 750rpx;
    background: #ffffff;
    overflow: hidden;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &-content {
      flex: 1;
      width: 750rpx;
      display: flex;

      &__left {
        width: 200rpx;
        height: 100%;
        background-color: #f6f7f8;

        .left-item {
          box-sizing: border-box;
          width: 100%;
          height: 100rpx;
          line-height: 100rpx;
          text-align: center;
          font-size: 28rpx;
          color: rgba(0, 0, 0, 0.45);
          white-space: nowrap;
          overflow-x: hidden;
          text-overflow: ellipsis;
          padding: 0rpx 10rpx;
          position: relative;
        }

        .left-active {
          background-color: #ffffff !important;
        }

        .left-active:after {
          content: '';
          width: 6rpx;
          height: 100rpx;
          position: absolute;
          left: 0rpx;
          top: 0rpx;
          background-color: #ff5319;
        }

        .select-text {
          color: #ff5319;
        }
      }

      &__right {
        flex: 1;
        padding: 0;

        .right-item {
          width: 50%;
          padding: 0rpx 10rpx;
          box-sizing: border-box;
          margin-bottom: 24rpx;
          overflow-x: hidden;

          &.active {
            .right-item--inner {
              background: #ffece5 !important;
              border: 2rpx solid #ff5319 !important;
              line-height: 60rpx !important;
              color: #ff5319 !important;
            }
          }

          &--inner {
            border: 2rpx solid transparent;
            height: 64rpx;
            line-height: 60rpx !important;
            text-align: center;
            background: #f7f7f8;
            border-radius: 64rpx;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.85);
            white-space: nowrap;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .right-active {
          background: #feecee !important;
          border: 2rpx solid #f7909c !important;
          line-height: 60rpx !important;
          color: #e50012 !important;
        }
      }
    }

    &-fixed {
      width: 750rpx;
      padding: 20rpx 32rpx;
      border-top: 2rpx solid #f7f7f8;
      box-sizing: border-box;
      background-color: #fff;
      z-index: 99;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;

      &__button {
        width: 326rpx;
        height: 92rpx;
      }

      &__color {
        opacity: 1 !important;
        background-color: #f6f7f8 !important;
        color: rgba(0, 0, 0, 0.25) !important;
      }
    }
  }

  .text-color {
    color: #ff5319;
  }
</style>
