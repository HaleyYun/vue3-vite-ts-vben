<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="workbench flex flex-column"
  >
    <VoNav :left-width="240" :right-width="240" is-fixed is-have-more>
      <block slot="title">
        <block v-if="userInfo.isAdmin">
          <text>注销{{ getRoleName(userInfo.roleCode, roleArrGet) }}</text>
        </block>
        <block v-else>
          <text>注销员工</text>
        </block>
      </block>

      <block slot="operation">
        <view class="workbench-operate">
          <!--          <EraButton-->
          <!--            :font-size="24"-->
          <!--            class="p-zero m-r-28"-->
          <!--            size="nav-mini"-->
          <!--            @click.native="historyApplyForClick"-->
          <!--            >历史申请</EraButton-->
          <!--          >-->
          <view v-if="showBtn" class="workbench-operate__button" @click="historyApplyForClick"
            >历史申请</view
          >
          <!--          <view class="workbench-operate__button" @click="historyApplyForClick">历史申请</view>-->
        </view>
      </block>
    </VoNav>
    <view class="workbench-top">
      <image class="workbench-top__image" src="/static/created/Setting/group.png" />
      <view class="workbench-top__title">注销后会清除当前角色信息，请慎重操作！</view>
    </view>
    <view class="workbench-line" />
    <view class="workbench-reason flex flex-justify-between flex-vertical-c" @click="reasonClick">
      <view class="workbench-reason__title"><text style="color: #e50012">*</text>注销理由</view>
      <view class="flex">
        <view v-if="reasonStr" class="fz-32 color-block-65">{{ reasonStr }}</view>
        <view v-else class="fz-32 color-block-25">请选择注销理由</view>
        <VoIcon color="#BFBFBF" name="right-arrow" />
      </view>
    </view>
    <view class="workbench-reasonLine" />
    <!--详情藐视-->
    <view class="workbench-detail">
      <view class="workbench-detail__title"><text style="color: #e50012">*</text>详情描述</view>
      <EraTextarea
        v-model="remark"
        border="none"
        count
        height="326rpx"
        maxlength="500"
        placeholder="请输入详情描述"
        @input="textareaChange"
      />
    </view>
    <view class="workbench-reasonLine" />

    <!--上传图片-->
    <view class="workbench-uploadPhoto">
      <view class="flex flex-justify-between m-r-32">
        <view class="workbench-uploadPhoto__title">上传图片</view>
        <view class="workbench-uploadPhoto__num">{{ fileList.length }}/9</view>
      </view>
      <view class="workbench-uploadPhoto__des">支持png.jpg.jpge.格式</view>

      <view class="workbench-uploadPhoto__pictures">
        <VoUpload
          :fileList="fileList"
          :isTencentCloud="false"
          :maxCount="9"
          :previewFullImage="true"
          height="108"
          multiple
          name="1"
          width="108"
        >
          <image
            class="pictures-img"
            mode="widthFix"
            src="/static/created/circle/upload_pictures.png"
          />
        </VoUpload>
      </view>
    </view>

    <view class="workbench-bottom p-b-safe-area">
      <view
        :class="confirmSelect ? 'workbench-bottom__select' : ''"
        class="workbench-bottom__confirm"
        @click="confirmClick"
        >提交注销申请</view
      >
    </view>

    <u-picker-era
      :columns="reasonList"
      :defaultIndex="[0]"
      :show="reasonShow"
      cancelColor="#8C8C8C"
      confirmColor="#22284B"
      keyName="label"
      title="注销理由"
      @cancel="reasonShow = false"
      @confirm="reasonConfirm"
    />

    <VoModal
      :content="content"
      :show="submitShow"
      confirmColor="#22284B"
      showCancelButton
      @cancel="submitShow = false"
      @confirm="confirmSubmit"
    />
  </view>
</template>

<script>
  import { toRoleHome } from '@/common/helper'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        roleArr: [[]],
        fileList: [], // 图片地址（json数组形式 比如：['3434343','1e23232']）
        reasonShow: false,
        reasonType: '', // 注销理由类型
        remark: '', // 注销详细信息
        content: '确认要提交吗？',
        reasonList: [
          [
            {
              id: 1,
              label: '注销理由一',
            },
            {
              id: 2,
              label: '注销理由二',
            },
            {
              id: 3,
              label: '注销理由三',
            },
          ],
        ],
        reasonStr: '', // 理由选择器
        confirmSelect: false,
        submitShow: false,
        showBtn: 0,
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        roleArrGet: 'role/roleArrGetter',
      }),
    },
    async onLoad() {
      await this.getReasonList()
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      try {
        const { data } = await this.$VoHttp.apiCompanyCancellationPage(params)
        console.log(data)
        this.showBtn = data.total || 0
        if (this.showBtn === 0) {
          this.content = '是否注销，注销后将重新登录'
        }
      } catch (e) {
        console.log(e)
        this.showBtn = 0
        this.content = '是否注销，注销后将重新登录'
      }
    },
    methods: {
      async getReasonList() {
        try {
          const { data } = await this.$VoHttp.apiCompanyCancellationType()
          data.forEach((item) => {
            item.id = item.value
            item.label = item.name
          })
          this.reasonList = [data]
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
      },
      //注销理由选择框
      reasonClick() {
        this.reasonShow = true
      },
      //确认提交事件
      confirmClick() {
        if (!this.confirmSelect) {
          return
        }
        this.submitShow = true
      },

      //提交弹框确认事件
      confirmSubmit() {
        let url = this.fileList.map((item) => item.url)
        let param = {
          reasonType: this.reasonType,
          remark: this.remark,
          url: JSON.stringify(url),
        }
        let api = ''
        if (this.userInfo.isAdmin === true) {
          api = 'apiCompanyCancellation$Post'
        } else if (this.userInfo.isAdmin === false) {
          api = 'apiCompanyCancellationStaff'
        } else if (this.userInfo.isAdmin === null) {
          this.$u.toast('我们已经收到您的申请，请静候处理')
          this.submitShow = false
        }
        this.$VoHttp[api](param)
          .then((res) => {
            console.log(res)
            this.submitShow = false
            uni.$u.toast('提交成功')
            setTimeout(() => {
              if (res.data.roleCode === 'supplier') {
                // 如果是供应商
                uni.redirectTo({
                  url: '/pages/AuthenticationInformation/FirstStepDefault',
                })
              } else if (res.data.roleCode === 'agent') {
                // 服务商
                uni.redirectTo({
                  url: '/pages/AuthenticationInformation/PublicAccounts',
                })
              } else if (res.data.roleCode === 'garage') {
                // 汽修厂
                uni.redirectTo({
                  url: '/pages/AuthenticationInformation/GarageAccounts',
                })
              } else if (res.data.roleCode === 'skilledWorker') {
                // 技术工
                uni.redirectTo({
                  url: '/pagesEngineer/AuthenticationInformation/EngineerAccounts',
                })
              } else {
                if (this.showBtn > 0) {
                  toRoleHome()
                }
                this.quit()
                return
              }
            }, 1500)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
      //注销理由谈弹框确定事件
      reasonConfirm(data) {
        console.log(data, 1111111111)
        this.reasonStr = data.value[0].label
        this.reasonType = data.value[0].id
        this.reasonShow = false

        if (
          this.remark.length > 0 &&
          this.reasonStr.length > 0 &&
          this.reasonStr !== '请选择注销理由'
        ) {
          this.confirmSelect = true
        } else {
          this.confirmSelect = false
        }
      },
      //详情描述输入框
      textareaChange() {
        if (
          this.remark.length > 0 &&
          this.reasonStr.length > 0 &&
          this.reasonStr !== '请选择注销理由'
        ) {
          this.confirmSelect = true
        } else {
          this.confirmSelect = false
        }
      },
      quit() {
        const roleCode = this.userInfo.platformCode
        this.$VoHttp
          .logoff({}, { noPrefix: true })
          .then((res) => {
            this.vocenPluginJPushModule()
            this.$store.dispatch('user/setUseInfo', {})
            uni.reLaunch({
              url: '/pages/CommonLogin/UserLogin?roleCode=' + roleCode,
            })
          })
          .catch((e) => {
            this.$store.dispatch('user/setUseInfo', {})
            uni.reLaunch({
              url: '/pages/CommonLogin/UserLogin?roleCode=' + roleCode,
            })
          })
          .finally(() => {})
      },
      /**
       * 历史申请
       */
      historyApplyForClick() {
        this.$linkToEasy('/pagesSupplier/Setting/SupplierHistoryApplyFor')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .workbench {
    width: 750rpx;
    min-height: 100vh;
    background-color: #ffffff;
    padding-bottom: 132rpx;
    &-operate {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .p-zero {
        padding: 0rpx !important;
      }
      .more-icon {
        margin-left: 28rpx;
      }
      &__button {
        height: 56rpx;
        line-height: 56rpx;
        padding: 0 24rpx;
        border: 2rpx solid #ffa98c;
        border-radius: 100rpx;
        color: #ff5319;
        font-size: 24rpx;
        margin-right: 24rpx;
      }
    }

    &-top {
      width: 750rpx;
      text-align: center;
      padding: 44rpx 0;
      &__image {
        width: 120rpx;
        height: 120rpx;
      }
      &__title {
        margin-top: 24rpx;
        color: $v-c0-85;
        font-size: 28rpx;
      }
    }

    &-reason {
      padding: 0rpx 32rpx;
      height: 96rpx;
      &__title {
        color: $v-c0-85;
        font-size: 32rpx;
      }
    }
    &-reasonLine {
      margin: 0rpx 32rpx;
      height: 2rpx;
      background-color: $v-bg-light;
    }

    &-detail {
      padding: 0rpx 32rpx;
      margin-top: 40rpx;
      margin-bottom: 16rpx;

      &__title {
        color: $v-c0-85;
        font-size: 32rpx;
      }
      &__right {
        color: $v-c0-25;
        font-size: 32rpx;
      }
    }

    &-uploadPhoto {
      margin: 24rpx 0 28rpx 32rpx;

      &__title {
        color: $v-c0-85;
        font-size: 32rpx;
      }
      &__num {
        font-size: 32rpx;
        color: $v-c0-25;
      }
      &__des {
        color: $v-c0-25;
        font-size: 28rpx;
        margin-top: 12rpx;
      }
      &__pictures {
        margin-top: 24rpx;
        .pictures-img {
          width: 218rpx;
          height: 218rpx;
        }
      }
    }

    &-line {
      width: 750rpx;
      height: 16rpx;
      background-color: #f8f8f8;
    }

    &-bottom {
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      height: 132rpx;
      width: 100%;
      background-color: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
      &__confirm {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background-color: $color-disabled-yellow;
        color: $v-c0-25;
        font-size: 32rpx;
        border-radius: 48rpx;
      }

      &__select {
        background-color: $color-primary-yellow;
        color: #ffffff;
      }
    }
  }
</style>
