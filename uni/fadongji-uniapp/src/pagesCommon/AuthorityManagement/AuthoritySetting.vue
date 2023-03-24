<template>
  <view class="authority flex">
    <VoNav :is-fixed="false" is-have-more title="权限配置" />

    <view class="authority-title"> 当前角色：{{ name }} </view>

    <view class="flex1 flex">
      <template v-if="listData.length > 0">
        <view class="authority-role">
          <view
            v-for="(item, index) of listData"
            :key="index"
            :class="{ 'role-active': index === selectDataIndex }"
            class="authority-role__item overflow-ellipsis"
            @click="changeLeftFn(index)"
          >
            {{ item.name }}
          </view>
        </view>
        <view
          v-if="
            listData[selectDataIndex] &&
            listData[selectDataIndex].children &&
            listData[selectDataIndex].children.length > 0
          "
          class="authority-user"
        >
          <view
            v-for="(children, childrenIndex) of listData[selectDataIndex].children"
            :key="childrenIndex"
            :class="{ 'user-active': selectIdArr.indexOf(Number(children.id)) !== -1 }"
            class="authority-user__item"
            @click="selectItem(children)"
          >
            {{ children.name }}
          </view>
        </view>
        <view v-else class="authority-user">
          <VoNoData />
        </view>
      </template>
      <VoNoData v-else />
    </view>

    <VoSafetyArea :is-fixed="false">
      <template #group>
        <view class="add-group flex flex-justify-between">
          <EraButton size="lg" @click="sureFn">确定</EraButton>
        </view>
      </template>
    </VoSafetyArea>
  </view>
</template>

<script>
  export default {
    name: 'AuthorityManagement',
    data() {
      return {
        isLoading: false,
        name: '',
        roleId: '',
        listData: [], // 数据数组
        selectDataIndex: 0, // 选中下标
        selectIdArr: [],
      }
    },
    methods: {
      /**
       * 确定按钮
       */
      sureFn() {
        // 组装数据
        let permsIds = this.assembleData()
        let param = {
          roleId: this.roleId,
          permsIds,
        }
        if (this.isLoading) return
        this.isLoading = true
        this.$VoHttp
          .apiRolePerms(param)
          .then((res) => {
            uni.$u.toast('保存成功')
            setTimeout(() => {
              this.$backFn()
            }, 1500)
            this.isLoading = false
          })
          .catch((e) => {
            this.isLoading = false
            uni.$u.toast(e.message || '请求失败')
          })
      },
      /**
       * 计算数据
       */
      assembleData() {
        let resultData = [...this.selectIdArr]
        console.log(resultData, 'resultDataresultData')
        this.listData.map((item) => {
          if (item.children) {
            item.children.map((it) => {
              if (
                resultData.indexOf(Number(it.id)) !== -1 &&
                resultData.indexOf(Number(item.id)) === -1
              ) {
                resultData.push(Number(item.id))
              }
            })
          }
        })

        return resultData
      },
      /**
       * 选中
       */
      selectItem(item) {
        const id = Number(item.id)
        const index = this.selectIdArr.indexOf(id)
        if (index === -1) {
          this.selectIdArr.push(id)
        } else {
          this.selectIdArr.splice(index, 1)
        }
      },
      /**
       * 角色管理
       */
      goRole() {
        this.$linkToEasy('/pagesCommon/AuthorityManagement/RoleManagement')
      },
      /**
       * 选择左侧下标
       */
      changeLeftFn(index) {
        if (this.selectDataIndex === index) return
        this.selectDataIndex = index
      },
      /**
       * 初始化函数
       */
      async initFn() {
        // 获取当前组织权限
        await this.getMenu()
        if (this.listData.length > 0) {
          // 根据角色获取当前权限
          await this.getRole()
        }
      },
      // 获取当前组织权限
      async getMenu() {
        try {
          const { data } = await this.$VoHttp.apiMenuOrgTree()
          this.listData = data
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
      },
      // 根据角色获取当前权限
      async getRole() {
        try {
          let { data } = await this.$VoHttp.apiMenuRoleTree({ roleId: this.roleId })
          this.selectIdArr = []
          if (data && data.length > 0) {
            data.map((item) => {
              if (item.children) {
                item.children.map((it) => {
                  this.selectIdArr.push(Number(it.id))
                })
              }
            })
          }
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
      },
    },
    onLoad(options) {
      // 角色id
      this.roleId = options.roleId
      this.name = options.name
      // 初始化方法
      this.initFn()
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
    &-title {
      height: 80rpx;
      width: 100%;
      padding: 0rpx 32rpx;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.85);
      font-size: 28rpx;
      line-height: 80rpx;
    }
    &-role {
      width: 200rpx;
      height: 100%;
      background-color: #f7f7f8;
      &__item {
        width: 200rpx;
        height: 100rpx;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.45);
        line-height: 100rpx;
        text-align: center;
        padding: 0rpx 10rpx;
        box-sizing: border-box;
        position: relative;
      }
      .role-active {
        color: #22284b;
        background-color: #ffffff;
        &:after {
          content: '';
          width: 6rpx;
          height: 100rpx;
          position: absolute;
          top: 0rpx;
          left: 0rpx;
          background: $color-primary-yellow;
        }
      }
    }

    &-user {
      flex: 1;
      height: 100%;
      background-color: #ffffff;
      padding: 24rpx 0rpx 24rpx 24rpx;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;

      &__item {
        box-sizing: border-box;
        width: 240rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        background: #f7f7f8;
        border-radius: 80rpx;
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.85);
        margin-right: 16rpx;
        margin-bottom: 24rpx;
      }
      .user-active {
        color: $color-primary-yellow;
        background: $v-tags-btn-disabled;
        border: 2rpx solid $v-tags-one;
        line-height: 60rpx;
      }
    }

    .add-group {
      padding: 18rpx 32rpx;
      background-color: #ffffff;
    }
  }
</style>
