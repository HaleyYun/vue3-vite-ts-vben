<template>
  <div class="page-wrap">
    <VoNav is-transparent is-fixed title="招商手册" />
    <div class="page-container">
      <div class="container-main">
        <template v-if="menus.length">
          <div class="container-menu">
            <div
              class="container-menu-item"
              v-for="(menu, idx) in menus"
              :key="idx"
              :class="{ active: idx === currentActiveMenuIdx }"
              @click="changeMenuActive(menu, idx)"
            >
              <span>{{ menu.name }}</span>
              <div class="underline"></div>
            </div>
          </div>
          <div class="container-list">
            <template v-if="questionList.length">
              <div
                class="container-list-item"
                v-for="(question, idx) in questionList"
                :key="idx"
                @click="toDetail(question)"
              >
                {{ question.name }}
              </div>
            </template>
            <template v-else>
              <VoNoData no-data-tips="暂无该模块内容" />
            </template>
          </div>
        </template>
        <template v-else>
          <VoNoData no-data-tips="暂无该模块内容" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import helper from '@/common/helper'
  import { storage } from '@/common/unifyGlobalReg'

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
        this.$VoHttp
          .apiContentUniversityQueryHelpTypeList(params)
          .then((res) => {
            console.log('res', res.data)
            this.menus = res.data
            this.getDetailList(this.menus[0].id)
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络请求失败')
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
            this.$u.toast(err.message || '网络请求失败')
          })
      },
      toDetail(item) {
        this.$storage.set('helpQuestionData', item)
        this.$linkToEasy(`./InvestmentBookDetail?id=${item.id}&categoryId=${item.categoryId}`)
      },
      changeMenuActive(menu, idx) {
        this.currentActiveMenuIdx = Number(idx)
        this.getDetailList(menu.id)
      },
      // handlerMobile() {
      //   uni.showActionSheet({
      //     itemList: ['400-893-5518'],
      //     success: (res) => {
      //       //console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
      //       this.$cellPhone('400-893-5518')
      //     },
      //     fail: function (res) {
      //       console.log(res.errMsg)
      //     },
      //   })
      // },
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
          background: #22284b;
          border-radius: 0rpx 22rpx 22rpx 0rpx;
          content: ' ';
        }
        &.active {
          color: #22284b;
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
    display: flex;
    flex-direction: column;
  }
</style>
