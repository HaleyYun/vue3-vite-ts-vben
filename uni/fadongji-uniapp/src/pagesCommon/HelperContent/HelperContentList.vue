<template>
  <div class="page-wrap">
    <div class="page-bg"></div>
    <VoNav is-fixed is-have-more is-transparent title="帮助中心" />
    <div class="page-header">
      <div class="flex1">
        <view class="hello">Hi，{{ userinfo.storeName || userinfo.userName }}</view>
        <view class="hello-small">有什么需要帮助的吗？</view>
      </div>
      <image :src="userinfo.storeUrl || '/static/default_avatar.png'" class="headimg" />
    </div>
    <div class="page-container">
      <div class="container-header"> 猜你想问 </div>
      <div class="container-main">
        <div class="container-menu">
          <div
            v-for="(menu, idx) in menus"
            :key="idx"
            :class="{ active: idx === currentActiveMenuIdx }"
            class="container-menu-item"
            @click="changeMenuActive(menu, idx)"
          >
            <span>{{ menu.name }}</span>
            <div class="underline"></div>
          </div>
        </div>
        <div class="container-list">
          <template v-if="questionList.length">
            <div
              v-for="(question, idx) in questionList"
              :key="idx"
              class="container-list-item"
              @click="toDetail(question)"
            >
              {{ question.name }}
            </div>
          </template>
          <template v-else>
            <VoNoData />
          </template>
        </div>
      </div>
    </div>
    <div class="page-footer p-b-safe-area">
      <view class="flex flex-vertical-c flex-justify-between">
        <div class="concat-btn online" @click="handlerRedirectCustomer">在线客服</div>
        <div class="concat-btn mobile" @click="handlerMobile">电话客服</div>
      </view>
      <view class="safearea-box" />
    </div>
    <VoHelpAction ref="helpRef" />
  </div>
</template>

<script>
  import mock from '@/common/mock/mock'
  import helper from '@/common/helper'
  import helpUtil from '@/common/helper'
  import { storage } from '@/common/unifyGlobalReg'

  const loadQuestionMenuFn = () => {
    return new Promise((resolve, reject) => {
      resolve(mock.createMockData({ title: '常见问题' }, 20, true))
    })
  }

  const loadQuestionListFn = (menuId) => {
    return new Promise((resolve, reject) => {
      resolve(
        mock.createMockData(
          { title: '问题名称问题名称问题名称问题名称问题名称问题名称', menuId },
          20,
          true,
        ),
      )
    })
  }
  export default {
    name: 'HelperContentList',
    data() {
      return {
        menus: [],
        currentActiveMenuIdx: 0,
        questionList: [],
        pageNo: 1,
        pageSize: 100,
        total: 0,
        userinfo: '',
      }
    },
    created() {
      // loadQuestionMenuFn().then((list) => {
      //   this.menus = list
      // })
      // loadQuestionListFn().then((questionList) => {
      //   this.questionList = questionList
      // })
      if (storage.get('userInfo')) {
        this.userinfo = storage.get('userInfo')
        console.log('this.userinfo===', this.userinfo)
      }
      this.getTypeList()
    },
    methods: {
      getTypeList() {
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.$VoHttp.apiContentUniversityQueryHelpTypeList(params).then((res) => {
          console.log('res', res.data)
          this.menus = res.data
          this.getDetailList(this.menus[0].id)
        })
      },
      getDetailList(categoryId) {
        helper.showLoading()
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          categoryId: categoryId,
        }
        this.$VoHttp
          .apiContentUniversityQueryHelpDetail(params)
          .then((res) => {
            console.log('res22', res)
            if (res.data) {
              this.questionList = res.data.records
            } else {
              this.questionList = []
            }
            helper.hideLoading()
          })
          .catch((err) => {
            helper.hideLoading()
            console.log('err', err)
          })
      },
      toDetail(item) {
        this.$storage.set('helpQuestionData', item)
        this.$linkToEasy(`/pagesCommon/HelperContent/HelperContentDetail?id=${item.categoryId}`)
      },
      changeMenuActive(menu, idx) {
        this.currentActiveMenuIdx = Number(idx)
        this.getDetailList(menu.id)
      },
      handlerRedirectCustomer() {
        this.$refs.helpRef.open()
      },
      handlerMobile() {
        console.log(helpUtil.appSource(), '999999999')
        if (helpUtil.appSource() === 1) {
          uni.showActionSheet({
            itemList: ['400-893-5518'],
            success: (res) => {
              //console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
              this.$VoHttp.apiExtraCustomerMoor().then(res=>{
                this.$cellCustomerPhone('400-893-5518')

              })
            },
            fail: function (res) {
              console.log(res.errMsg)
            },
          })
        } else {
          this.$VoHttp.apiExtraCustomerMoor().then(res=>{
            this.$cellPhone('400-893-5518')

          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page-container {
    position: relative;
    z-index: 2;
    flex: 1;
    overflow: hidden;
    //overflow-y: scroll;
    background: #fff;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    display: flex;
    flex-direction: column;
  }
  .container {
    &-header {
      line-height: 96rpx;
      height: 96rpx;
      margin: 0 32rpx;
      border-bottom: 1rpx solid #f7f7f8;
      font-weight: 500;
      font-size: 32rpx;
      color: $v-c0-85;
    }
    &-main {
      flex: 1;
      display: flex;
      overflow-y: hidden;
      //position: relative;
    }
    &-menu {
      background: #f6f7f8;
      overflow-y: scroll;
      &-item {
        position: relative;
        width: 268rpx;
        height: 100rpx;
        line-height: 100rpx;
        font-size: 28rpx;
        padding-left: 24rpx;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.45);
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .underline {
          visibility: hidden;
          position: absolute;
          width: 8rpx;
          left: 0rpx;
          top: 0rpx;
          bottom: 0rpx;
          background: $color-primary-yellow;
          //border-radius: 0rpx 22rpx 22rpx 0rpx;
          content: ' ';
        }
        &.active {
          color: #ff5319;
          background: #fff;
          .underline {
            visibility: visible;
          }
        }
      }
    }
    &-list {
      flex: 1;

      overflow-y: scroll;
      &-item {
        margin-left: 32rpx;
        line-height: 96rpx;
        height: 96rpx;
        padding: 0 32rpx 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(0, 0, 0, 0.85);
        font-size: 32rpx;
        border-bottom: 2rpx solid #f7f7f8;
      }
    }
  }
  .page-wrap {
    position: fixed;
    left: 0rpx;
    top: 0rpx;
    right: 0rpx;
    bottom: 0rpx;
  }
  .page-bg {
    position: fixed;
    width: 750rpx;
    height: 1066rpx;
    left: 0rpx;
    top: 0rpx;
    background-image: url('/static/agent/agent_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 868rpx;
    z-index: 0;
    //background: linear-gradient(
    //  180deg,
    //  rgba(46, 64, 186, 0.204) -40.14%,
    //  rgba(151, 161, 220, 0) 69.39%
    //);
  }

  .page-wrap {
    display: flex;
    flex-direction: column;
  }
  .page-footer {
    padding: 20rpx;
    background: #fff;
    .concat-btn {
      text-align: center;
      line-height: 80rpx;
      width: 325rpx;
      height: 80rpx;
      background: #ffffff;
      border: 2rpx solid $v-c0-25;
      border-radius: 46px;
      font-size: 32rpx;
      color: $v-c0-85;
      &.mobile {
        margin-left: 36rpx;
        background: $color-primary-yellow;
        border: 2rpx solid $color-primary-yellow;
        color: #fff;
      }
    }
  }
  .page-header {
    display: flex;
    padding: 44rpx 64rpx;
    z-index: 2;
    .hello {
      font-weight: 500;
      font-size: 36rpx;
      line-height: 150%;
      color: #000000;
    }
    .hello-small {
      font-size: 28rpx;
      line-height: 150%;
      color: rgba(0, 0, 0, 0.45);
    }
    .headimg {
      width: 96rpx;
      height: 96rpx;
      border-radius: 50%;
      border: 4rpx solid #fff;
      box-sizing: border-box;
    }
  }
  .container-header {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 32rpx;
  }
</style>
