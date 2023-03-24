<template>
  <view class="result">
    <view class="list">
      <view class="px-30">
        <view class="brand-list--block">
          <view class="brand-logo">
            <image :src="brandObj.logo" class="brand-logo-img" mode="aspectFit" />
          </view>
          <view class="brand-text">
            {{ brandObj.name }}
            <text class="brand-list--num">({{ carNum }})</text>
          </view>
        </view>
      </view>
      <view>
        <u-collapse ref="collapse" :border="false" :value="collapseValue" @change="collapseChange">
          <u-collapse-item
            v-for="(item, index) in carList"
            :key="index"
            :clickable="true"
            :isLink="true"
            :name="item.type"
          >
            <template #title>
              <view>
                <view class="brand-list--block">
                  <view class="brand-text flex flex-vertical-c">
                    <view class="fz-0" @click.stop="selectHandler(item.id)">
                      <VoIcon v-if="!item.checked" :size="26" color="#E3D9D9" name="circle" />
                      <VoIcon v-else :size="26" color="#FF5319" name="select-right" />
                    </view>
                    <view class="p-l-10">{{ item.type }}</view>
                    <text class="brand-list--num">({{ item.size }})</text>
                  </view>
                </view>
              </view>
            </template>
            <template #value>
              <view class="close-icon"> {{ item.status === 'open' ? '收起' : '展开' }}</view>
            </template>
            <template #right-icon>
              <VoIcon :opacity="0.15" :size="20" color="#000000" name="right-arrow" />
            </template>
            <view class="u-collapse-content">
              <view class="select-inner">
                <view
                  v-for="(car, cindex) in item.list"
                  :key="cindex"
                  class="select-item"
                  @click="selectHandler(car.id, item.id)"
                >
                  <VoIcon v-if="!car.checked" :size="26" color="#E3D9D9" name="circle" />
                  <VoIcon v-else :size="26" color="#FF5319" name="select-right" />
                  <view class="select-content">
                    {{ car.str_name }}
                  </view>
                </view>
              </view>
            </view>
          </u-collapse-item>
        </u-collapse>
      </view>
    </view>
  </view>
</template>

<script>
  import Bus from '@/common/Bus'

  export default {
    name: 'BrandContent',
    inject: ['brand', 'selectData'],
    props: {
      query: {
        type: Object,
        default() {
          return {}
        },
      },
      initData: {
        type: Array,
        default() {
          return []
        },
      },
      chooseValue: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        show: true,
        collapseValue: [],
        selectKeys: [],
        carList: [],
        carNum: 0,
        selectCars: [],
      }
    },
    computed: {
      brandObj() {
        return this.brand()
      },
    },
    watch: {
      query: {
        deep: true,
        handler(newVal) {
          this.queryData(newVal)
        },
      },
      chooseValue: {
        deep: true,
        handler(newVal) {
          alert(1)
          if (!newVal.length) {
            // 清空
            this.carList.map((item) => {
              item.checked = false
              item.list = item.list.map((i) => {
                i.checked = item.checked
                return i
              })
              return item
            })
            return
          }
        },
      },
    },
    mounted() {
      // this.$refs.collapse.init()
      this.queryData(this.query)
    },
    methods: {
      setDefaultCheck(arr) {
        this.carList.map((item) => {
          item.checked = arr.includes(item.id)
          item.list = item.list.map((i) => {
            i.checked = item.checked ? item.checked : arr.includes(i.id)
            return i
          })
          return item
        })
      },
      clearAll() {
        this.carList.map((item) => {
          item.checked = false
          item.list = item.list.map((i) => {
            i.checked = item.checked
            return i
          })
          return item
        })
      },
      clearCheck(target, pid) {
        this.carList = this.carList.map((item) => {
          if (item.id === target) {
            item.checked = false
            if (item.hasOwnProperty('list') && item.list.length) {
              item.list = item.list.map((v) => {
                v.checked = item.checked
                return v
              })
            }
          }
          item.list = item.list.map((v) => {
            v.checked = v.id === target ? false : v.checked
            return v
          })
          return item
        })
        if (pid) {
          this.carList = this.carList.map((item) => {
            item.checked = item.list.every((v) => v.checked)
            return item
          })
        }

        this.selectCars = this.emitValue()
      },
      halfCheck(row) {
        return row.list.every((item) => {
          return item.checked
        })
      },
      // 检测是否选择中
      selectedBundle(target, pid) {
        console.log(111111111111111)
        this.carList = this.carList.map((item) => {
          if (item.id === target) {
            item.checked = !item.checked
            if (item.hasOwnProperty('list') && item.list.length) {
              item.list = item.list.map((v) => {
                v.checked = item.checked
                return v
              })
            }
          }
          item.list = item.list.map((v) => {
            v.checked = v.id === target ? !v.checked : v.checked
            return v
          })
          return item
        })
        if (pid) {
          this.carList = this.carList.map((item) => {
            item.checked = item.list.every((v) => v.checked)
            return item
          })
        }

        this.selectCars = this.emitValue()
        console.log(this.selectCars, 'selectCars')
        // 抛出已选择的变化
        Bus.$emit('CarTypeChoose', this.selectCars)
      },
      emitValue() {
        const value = []
        this.carList.forEach((item) => {
          const flag = item.list.every((v) => v.checked)
          if (flag) {
            value.push({
              carModels: item.id,
              hierarchy: item.level,
              name: item.name + '全系',
              pid: 0,
            })
          } else {
            item.list.forEach((i) => {
              if (i.checked) {
                value.push({
                  carModels: i.id,
                  hierarchy: i.level,
                  name: i.name,
                  pid: item.id,
                })
              }
            })
          }
        })
        return value
      },
      // 选择车型
      selectHandler(car, pid) {
        this.selectedBundle(car, pid)
      },

      collapseChange(res) {
        this.carList = this.carList.map((item) => {
          const t = res.find((r) => r.name === item.type)
          item.status = t.status
          return item
        })
        // this.$refs.collapse.init()
      },
      async queryData(val) {
        const { data, code } = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectMode({
          ...val,
          brandIds: val.brandIds ? val.brandIds : this.brandObj.id,
        })
        if (+code === 20001) {
          // this.hotList = data.hotList
          // this.list = data.detail
          // console.log(data.list, 'data.list')
          // return
          this.carList = data.list.map((item, index) => {
            item['checked'] = this.initData.includes(item.seriesId)
            if (index === 0) {
              item['status'] = 'open'
            } else {
              item['status'] = 'close'
            }
            item['name'] = `${this.brandObj.name} ${item.type}`
            item['id'] = item.seriesId
            item.list = item.list.map((i) => {
              i['checked'] = item['checked'] ? item['checked'] : this.initData.includes(i.id)
              i.str_name = `${i.year} ${i.displacement} ${i.induction} ${i.transmissionDescription} ${i.name}`
              i.name = `${item['name']} ${i.year} ${i.displacement} ${i.induction} ${i.transmissionDescription} ${i.name}`
              return i
            })
            // 品牌名称 + 车系名称 + 年款 + 排量 + 进气方式 + 车型
            item.list = this.$vocenApi._.orderBy(item.list, ['year'], ['desc'])
            return item
          })
          // console.log(this.carList, 'cardList')
          this.collapseValue = []
          const list = this.carList.map((item) => item.type)
          this.collapseValue = [list[0]]
          this.carNum = data.num

          this.$nextTick(() => {
            // 处理一下初始化数据
            this.selectCars = this.emitValue()
            // 抛出已选择的变化
            Bus.$emit('CarTypeChoose', this.selectCars)
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .select-inner {
    flex: 1;
    padding: 20rpx 20rpx;
    font-size: 0;

    .select-item {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;

      .icon-noactive {
        display: block;
      }

      .icon-active {
        display: none;
      }

      &.active {
        .icon-noactive {
          display: none;
        }

        .icon-active {
          display: block;
        }
      }

      .select-content {
        font-size: 28rpx;
        @include black-color(0.85);
        line-height: 1;
        padding-left: 15rpx;
      }
    }
  }

  .list {
    ::v-deep {
      .u-collapse-item__content__text {
        padding: 0 0 !important;
      }

      .u-collapse-content {
        .u-cell__body {
          padding: 0 15px 10px !important;
        }
      }
    }
  }

  .close-icon {
    @include black-size-color(24, 0.45);
  }

  .brand-list--block {
    display: flex;
    align-items: center;

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
      font-size: 30rpx;
      margin-left: -10rpx;

      .brand-list--num {
        font-size: 20rpx;
        margin-left: 15rpx;
      }
    }
  }
</style>
