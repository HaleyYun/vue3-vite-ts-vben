<template>
  <view v-if="list.length" class="authority flex">
    <VoNav :is-fixed="false" is-have-more title="认证新品类" />
    <view class="flex1 flex overflow-y">
      <!--    左侧    -->
      <scroll-view class="authority-role" scroll-y>
        <view
          v-for="(item, index) of list"
          :key="item.id"
          :class="{
            'role-active': index === leftVal,
          }"
          class="authority-role__item"
          @click="changeLeftFn(index)"
        >
          {{ item.name }}
        </view>
      </scroll-view>
      <!--    右侧    -->
      <scroll-view class="authority-user" scroll-y>
        <block v-if="list[oneIndex].children.length > 0">
          <view
            v-for="(info, index) of list[oneIndex].children"
            :key="index"
            class="authority-user__list m-b-40 flex"
          >
            <!--   未选中样式   -->
            <view class="flex flex-vertical-c" @click="chooseCategory(info)">
              <VoIcon v-if="!info.selected && !info.status" name="address_select" />
              <VoIcon v-if="info.selected && !info.status" color="#FF5319" name="select-right" />

              <view class="m-l-8 fz-28 m-r-16 color-block">{{ info.name }}</view>
            </view>
            <!--   选中样式   -->
            <!--   已认证   -->
            <view v-if="info.status === 2" class="m-t-6 green status flex flex-row flex-vertical-c">
              <VoIcon color="#26BF26" name="pending-review" size="12" />
              <view class="status-text3">已认证</view>
            </view>
            <!--   认证中   -->
            <view
              v-if="info.status === 1"
              class="m-t-6 status flex flex-row flex-vertical-c orange"
            >
              <VoIcon color="#FF9B05" name="pending-review" size="14" />
              <view class="status-text2 m-l-4">认证中</view>
            </view>
          </view>
        </block>
        <view v-else class="h-full flex-vertical-c flex flex-justify-c">
          <u-empty icon="/static/noData/nodata.png" text="暂无数据" />
        </view>
      </scroll-view>
    </view>

    <VoSafetyArea :is-fixed="false">
      <template #group>
        <view class="add-group flex flex-justify-between">
          <EraButton size="small" theme-type="Wire" @click="resetHandler">重置</EraButton>
          <EraButton :loading="loading" size="small" @click="submitAuthHandler">确定</EraButton>
        </view>
      </template>
    </VoSafetyArea>
  </view>
</template>

<script>
  export default {
    name: 'CertifiedCategory',
    data() {
      return {
        loading: false,
        list: [],
        twoList: [],
        oneIndex: 0,
        // 数组array
        listData: [
          {
            name: '发动机系列',
          },
          {
            name: '电器系列',
          },
          {
            name: '油液类',
          },
        ],
        //左侧选中val
        leftVal: 0,
        selectedKeys: [],
      }
    },
    watch: {
      list: {
        deep: true,
        handler(newVal) {
          const keys = []
          newVal.forEach((item) => {
            item.children.forEach((c) => {
              if (c.selected) {
                keys.push(c.id)
              }
            })
          })
          this.selectedKeys = keys
        },
      },
    },
    methods: {
      resetHandler() {
        this.list = this.list.map((item) => {
          item.children = item.children.map((c) => {
            return { ...c, selected: false }
          })
          return item
        })
      },
      // 提交数据认证
      async submitAuthHandler() {
        if (this.selectedKeys.length) {
          try {
            this.loading = true
            const { code } = await this.$VoHttp.apiGoodsCategoryApplySave({
              categoryIds: this.selectedKeys,
            })
            if (+code === 20001) {
              this.$u.toast('提交成功')
              setTimeout(() => {
                this.loading = false
                this.$linkToEasy('/pagesLeaseManager/WorkingTable/BusinessCategory')
              }, 1000)
            }
          } catch (e) {
            this.loading = false
            console.warn(e, 'CertifiedCategory')
            this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
          }
        } else {
          this.$u.toast('请选择分类')
        }
      },
      // 选择数据进行认证
      chooseCategory(row) {
        this.list = this.list.map((item) => {
          item.children = item.children.map((c) => {
            return { ...c, selected: c.id === row.id ? !c.selected : c.selected }
          })
          return item
        })
      },
      // 初始化数据
      async initData() {
        try {
          const { data } = await this.$VoHttp.GOODS.apiGoodsCategoryQueryCategoryList({ name: '' })
          this.list = data.map((item) => {
            item.children = item.children.map((c) => {
              return { ...c, selected: false }
            })
            return item
          })
        } catch (e) {
          console.warn(e, 'CertifiedCategory')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      /**
       * 更改左侧按钮
       */
      changeLeftFn(index) {
        if (index === this.oneIndex) return
        this.oneIndex = index
        this.leftVal = index
      },
    },
    onShow(options) {
      this.initData()
    },
  }
</script>

<style lang="scss" scoped>
  .authority {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #f7f7f8;

    &-role {
      width: 200rpx;
      height: 100%;
      background-color: #f7f7f8;

      &__item {
        width: 200rpx;
        min-height: 100rpx;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.45);
        line-height: 100rpx;
        text-align: center;
        padding: 0rpx 10rpx;
        box-sizing: border-box;
        position: relative;
      }

      .role-active {
        color: #ff5319;
        background-color: #ffffff;

        &:after {
          content: '';
          width: 6rpx;
          height: 100rpx;
          position: absolute;
          top: 0rpx;
          left: 0rpx;
          background: #ff5319;
        }
      }
    }

    &-user {
      flex: 1;
      height: 100%;
      background-color: #ffffff;
      padding: 24rpx 16rpx 0;
      box-sizing: border-box;

      &__no {
        width: 416rpx;
        height: 360rpx;
        display: block;
        margin: 360rpx auto 0rpx;
      }
    }

    .add-group {
      padding: 18rpx 32rpx;
      background-color: #ffffff;
    }
  }
  .status {
    border-radius: 200rpx;
    box-sizing: border-box;
    padding: 0 6rpx;
    height: 36rpx;
    margin-left: 8rpx;
    &.grey {
      color: $v-c0-25;
      background: #f7f7f8;
    }
    &.orange {
      color: #ff9b05;
      background-color: #fff5e5;
    }
    &.green {
      color: #07c160;
      background-color: #ecfaf3;
    }
    &.red {
      color: #ff5319;
      background: #feecee;
    }
    &-text1,
    &-text2,
    &-text3,
    &-text4 {
      font-size: 20rpx;
      line-height: 30rpx;
      height: 30rpx;
      padding: 0 4rpx;
    }
  }
  .green {
    color: #5ed697;
  }

  .yellow {
    color: #fdc25a;
  }
</style>
