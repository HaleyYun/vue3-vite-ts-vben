<template>
  <view class="page_view">
    <VoNav :is-fixed="false" is-have-more title="服务单详情" />
    <view v-if="info">
      <view class="m-t-20 bg-white">
        <RepairShop :info="info" :repairShop="JSON.parse(info.addressDetail)" />
      </view>
      <view class="m-t-20 bg-white">
        <ServiceMessage :info="info" />
      </view>
      <view class="m-t-20 bg-white">
        <OldMachineMessage v-if="info.supportType === 31" :data="info" />
        <OldMachineMessageImage v-else-if="info.supportType === 33" :info="info" title="旧机信息" />
      </view>
      <GrabSingle
        :info="info"
        :row="row"
        :show.sync="showGrab"
        @updateFn="getDetail"
      />
      <EraApproveModal :show.sync="showApprove" />
      <u-modal
        :show="showSkillApprove"
        cancel-text="暂不认证"
        confirm-text="联系客服"
        confirmColor="#22284B"
        show-cancel-button
        @cancel="showSkillApprove = false"
        @confirm="confirmHandler"
      >
        <view class="info-content"
          >您还没有认证成为
          <text v-if="+info.supportType === 31">售后</text>
          <text v-if="+info.supportType === 32">安装</text>
          <text v-if="+info.supportType === 33">回收</text>
          师</view
        >
      </u-modal>
    </view>
    <view class="setting-bottom p-b-safe-area">
      <view
        v-if="
          +info.orderStatus === 3230 ||
          +info.orderStatus === 3130 ||
          +info.orderStatus === 3231 ||
          +info.orderStatus === 3330 ||
          +info.orderStatus === 3331
        "
        class="setting-bottom__quit"
        @click="handleGetOrder"
        >抢单</view
      >
      <view v-else class="setting-bottom__quit__disabled color-block-25">已分配</view>
    </view>
  </view>
</template>

<script>
  import RepairShop from '../components/RepairShop.vue'
  import ServiceMessage from '../components/ServiceMessage.vue'
  import OldMachineMessage from '../components/OldMachineMessage.vue'
  import OldMachineMessageImage from '../components/OldMachineMessageImage.vue'
  import GrabSingle from '@/pages/EngineerCenter/components/HomeComponents/GrabSingle'
  import store from '@/store'
  import { checkIsApproveFn, goOnlineCustomerFn, getLocation } from '@/common/helper'
  import { mapGetters } from "vuex";

  export default {
    components: {
      GrabSingle,
      RepairShop,
      ServiceMessage,
      OldMachineMessage,
      OldMachineMessageImage,
    },
    data() {
      return {
        id: '',
        row: {},
        info: '',
        showGrab: false,
        showApprove: false,
        showSkillApprove: false,
        loading: false,
        skillerState: null,
        distance: '',
      }
    },
    // computed: {
    //   ...mapGetters({
    //     locationInfo: 'mapDrag/getLocationInfo',
    //   }),
    // },
    // watch: {
    //   locationInfo: {
    //     deep: true,
    //     handler(newVal) {
    //       console.log(newVal)
    //       this.LocationInfo = newVal
    //     },
    //   },
    // },
    async onLoad(options) {
      if (options && options.id) {
        this.id = options.id
      }
      this.distance = options.distance
      await this.getSkillerState()
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      async getSkillerState() {
        if (this.loading) return
        this.loading = !this.loading
        try {
          const { data } = await this.$VoHttp.apiContentLearningTasksInitialize()
          this.skillerState = data
        } catch (e) {
          console.log(e)
          uni.$u.toast(e.message || '请检查网络')
        }
        this.loading = !this.loading
      },
      async getDetail() {
        try {
          const res = await this.$VoHttp.apiGraborderGetorderdetailbyid$Id({ id: this.id })
          this.info = res.data
          this.info.distance = this.distance
          //组装时间段
          if (this.info.homeStartTime && this.info.homeEndTime) {
            this.info.time =
              this.$vocenApi.VoUtils.timeFormat(this.info.homeStartTime, 'yyyy-mm-dd hh:MM') +
              '-' +
              this.$vocenApi.VoUtils.timeFormat(this.info.homeEndTime, 'hh:MM')
          }
        } catch (err) {
          uni.$u.toast(err.message)
        }
      },
      initInfo() {
        store.dispatch('user/getFullUserInfo').then((res) => {
          this.currentUserFullInfo = res
        })
      },
      confirmHandler() {
        this.showSkillApprove = false
        // this.$linkToEasy(
        //   '/pagesEngineer/pagesQualification/RecyclingQualification/CourseList?qualifyType=' +
        //     this.info.supportType,
        // )
        goOnlineCustomerFn(2)
      },
      async handleGetOrder() {
        let LocationInfo
        try {
          LocationInfo = await getLocation(this.locationgTips)
        } catch (e) {
          console.log(e)
          return
        }
        if (!LocationInfo || !LocationInfo.longitude) return
        if (!checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        // 判断是否具有该类型单的抢单资格
        let type = this.info.supportType
        let obj = this.skillerState.filter((item) => +item.qualifyType === +type)
        if (obj.length && !obj[0].certification) {
          this.showSkillApprove = true
          return
        }
        if (this.loading) return
        this.loading = !this.loading
        let param = {
          orderIds: [this.info.id],
          buyerId: this.info.buyerId,
          longitude: +LocationInfo.longitude,
          latitude: +LocationInfo.latitude,
          createTime: this.info.createTime,
          isTwoConfirm: 0,
        }
        this.$VoHttp
          .apiGraborderGraborders(param)
          .then((res) => {
            // 抢单二次弹窗，无20001的的情况了
            // this.$toast('抢单成功', 'success', '/static/icons/success_icon.png')
            // 需要传递条件
          })
          .catch((e) => {
            console.log(e);
            let info = Object.assign({}, this.info)
            info.addressDetail = JSON.parse(info.addressDetail)
            info.modelId = info.modelName ? info.modelName : info.modelId
            if (+e.code === 20002) {
              if (e.data && e.data.length) {
                // 20002 还有其他单子可以抢
                e.data.forEach((item) => {
                  //组装时间段
                  if (item.homeStartTime && item.homeEndTime) {
                    item.time =
                      this.$vocenApi.VoUtils.timeFormat(item.homeStartTime, 'yyyy-mm-dd hh:MM') +
                      '-' +
                      this.$vocenApi.VoUtils.timeFormat(item.homeEndTime, 'hh:MM')
                  }
                })
                this.row = {
                  list: e.data,
                  row: info,
                }
                this.showGrab = true
              } else {
                console.log(this.info);
                // 20002 无其他单子可以抢
                this.row = {
                  list: [],
                  row: info,
                }
                this.showGrab = true
              }
            } else if (+e.code === 20003) {
              this.showSkillApprove = true
            } else {
              uni.$u.toast(e.message || '抢单失败')
            }
          })
          .finally(() => {
            this.loading = !this.loading
          })
      },
      handleCloseModel(val) {
        this.showGrab = val
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page_view {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    > :nth-child(2) {
      flex-grow: 1;
      overflow: auto;
    }
    .setting-bottom {
      height: 132rpx;
      width: 100%;
      background-color: #ffffff;

      &__quit {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $color-primary-yellow;
        color: #ffffff;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
      &__quit__disabled {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background: #f6f7f8;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
    }
  }
</style>
