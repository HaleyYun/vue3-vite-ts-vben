<template>
  <view>
    <VoNav is-fixed is-have-more title="接单设置" />
    <view class="setting">
      <view>
        <view class="setting-title">接单类型</view>
        <view class="btn fz-24 p-t-18 p-b-14">
          <view
            v-for="(item, key) in btnGroup"
            :key="key"
            :class="{ isActive: item.value == currentTab }"
            calss="btn_item"
            @click="tap(item)"
            >{{ item.label }}
          </view>
        </view>
      </view>
      <view>
        <view class="setting-title">专修车系</view>
        <view class="btn btn_sec_item fz-24">
          <view
            v-for="(item, key) of btnObj"
            :key="key"
            :class="{ isActive: isIncloud(item) }"
            calss="btn_item"
            @click="selectItem(item)"
            >{{ item.label }}
          </view>
        </view>
      </view>
    </view>
    <view class="setting-bottom p-b-safe-area">
      <view class="setting-bottom__quit" @click="submitFn">保存</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        currentTab: 1,
        selectedArray: [1],
        btnGroup: [
          {
            label: '全部类型',
            value: 1,
          },
          {
            label: '安装单',
            value: 32,
          },
          {
            label: '回收单',
            value: 33,
          },
          {
            label: '售后单',
            value: 31,
          },
        ],
        btnObj: [
          {
            label: '国产车',
            value: 1,
          },
          {
            label: '韩系车',
            value: 2,
          },
          {
            label: '德系车',
            value: 3,
          },
          {
            label: '日系车',
            value: 4,
          },
          {
            label: '美系车',
            value: 5,
          },
          {
            label: '其它',
            value: 6,
          },
        ],
        info: {
          majorCarSeries: '',
        },
        isLoading: false,
      }
    },
    methods: {
      /**
       * @description 保存
       */
      submitFn() {
        if (!this.selectedArray.length) {
          uni.$u.toast('专修车系不能为空')
          return
        }
        if (!this.currentTab) {
          uni.$u.toast('接单类型不能为空')
          return
        }
        let param = {
          supportType: this.currentTab,
          majorCarSeries: this.selectedArray.join(),
          id: this.info.id,
          companyId: this.info.companyId,
          workerStatus: this.info.workerStatus, //技术工状态(1:接单,2:休息)
        }
        if (this.isLoading) return
        this.isLoading = true
        this.$VoHttp
          .apiOrdertakesettingUpdate(param)
          .then((res) => {
            uni.$u.toast('修改成功')
            this.initFn()
            setTimeout(() => {
              this.isLoading = false
              this.$backFn()
            }, 1000)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '保存失败')
            this.isLoading = false
          })
      },
      tap(val) {
        this.currentTab = val.value
      },
      selectItem(val) {
        if (this.selectedArray.includes(val.value)) {
          this.selectedArray.splice(this.selectedArray.indexOf(val.value), 1)
        } else {
          this.selectedArray.push(val.value)
        }
      },
      isIncloud(item) {
        return this.selectedArray.includes(item.value)
      },
      initFn() {
        this.$VoHttp.apiOrdertakesettingDetail().then((res) => {
          this.info = res.data
          this.currentTab = Number(this.info.supportType)
          let selectedArray = []
          if (this.info.majorCarSeries.match(/[1-6]+/g)) {
            selectedArray = this.info.majorCarSeries.split(',')
          }
          this.selectedArray = selectedArray.map((item) => (item = Number(item)))
        })
      },
    },
    onLoad() {
      this.initFn()
    },
  }
</script>

<style lang="scss" scoped>
  .setting {
    > :nth-child(n) {
      background-color: #fff;
      padding: 32rpx 0 32rpx 32rpx;
      margin-top: 16rpx;

      .setting-title {
        font-size: 30rpx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }

  .btn {
    display: flex;

    > :nth-child(n) {
      margin-right: 26rpx;
      padding: 14rpx 0;
      width: 152rpx;
      box-sizing: border-box;
      text-align: center;
      border-radius: 200rpx;
      background: #f7f7f8;
      color: rgba(0, 0, 0, 0.85);
      border: 2rpx solid #f7f7f8;
    }
    :last-child {
      margin-right: 0rpx;
    }

    .isActive {
      background: #ffece5;
      color: #ff5319;
      border: 2rpx solid #ff6633;
    }
  }

  .btn_sec_item {
    flex-wrap: wrap;

    > :nth-child(n) {
      margin-right: 26rpx;
      padding: 14rpx 0;
      width: 152rpx;
      box-sizing: border-box;
      text-align: center;
      border-radius: 200rpx;
      background: #f7f7f8;
      color: rgba(0, 0, 0, 0.85);
      border: 2rpx solid #f7f7f8;
      margin-top: 24rpx;
    }
    :last-child {
      margin-right: 0rpx;
    }

    .isActive {
      background: #ffece5;
      color: #ff5319;
      border: 2rpx solid #ff6633;
    }
  }

  .setting-bottom {
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;

    &__quit {
      margin: 20rpx 47rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background-color: $color-primary-yellow;
      color: #ffffff;
      font-size: 32rpx;
      border-radius: 48rpx;
    }
  }
</style>
