<template>
  <view class="AuthorityManagement">
    <view class="authority flex">
      <VoNav :is-fixed="false" is-have-more title="权限管理" />
      <view class="line-bg h24 w-full" />

      <view class="flex1 flex overflow-hidden">
        <scroll-view class="authority-role" scroll-y>
          <view
            v-for="(item, index) of listData"
            :key="item.id"
            :class="{
              'role-active': index === leftVal,
            }"
            class="authority-role__item overflow-ellipsis"
            @click="changeLeftFn(index)"
          >
            {{ item.name }}{{ '(' + item.number + ')' }}
          </view>
        </scroll-view>
        <scroll-view class="authority-user" scroll-y>
          <block
            v-if="
              listData.length > 0 &&
              listData[leftVal].userList &&
              listData[leftVal].userList.length > 0
            "
          >
            <view
              v-for="(user, userIndex) of listData[leftVal].userList"
              :key="userIndex"
              class="authority-user__item  "
            >
              <view class="fz-28  overEllipsis color-block lh150 color-block-85 fz-b">
               {{ user.realName }}
              </view>
              <view class="fz-24 m-t-16 color-block-45 lh150" >{{ encryptPhone(user.userName) }}</view>


              <view class="flex flex-vertical-c flex-justify-between fz-24 m-t-16">
                <view>
                  <view   v-if="userInfo.roleCode=='supplier'&&userInfo.isAdmin" class="flex flex-vertical-c " @click="setUser(user)">
                    <VoIcon v-if="user.customerServiceStatus" :size="24" class="m-r-8" name="select-right" color="#FF5319"  />
                    <VoIcon v-else :size="24" class="m-r-8" name="circle" color="#000" opacity="0.15" />
                    <view class="fz-28 lh150 color-block-65">店铺客服</view>
                  </view>
                </view>
               <view class="flex flex-vertical-c">
                 <view class="flex flex-vertical-c" @click="editUser(user)">
                   <VoIcon :size="16" class="m-r-4" name="edit" color="#000" opacity="0.45" />
                   <view class="fz-28 lh150 color-block-65">修改</view>
                 </view>
                 <view class="line-bg bg-d3d4db w2 h24 m-l-24" />
                 <view class="flex flex-vertical-c m-l-24" @click="delFn(user)">
                   <VoIcon :size="16" class="m-r-4" name="delete" color="#000" opacity="0.45" />
                   <view class="fz-28 lh150 color-block-65">删除</view>
                 </view>
               </view>
              </view>
            </view>
          </block>
          <view v-else class="h-full flex-vertical-c flex flex-justify-c flex-column">
            <vo-no-data
              :no-data-tips="['暂无子账号', '快去新增子账号吧～']"
              imgUrl="/static/noData/searchGoods.png"
            />
          </view>
        </scroll-view>
      </view>

      <VoSafetyArea :is-fixed="false">
        <template #group>
          <view class="add-group flex flex-justify-between">
            <EraButton fontSize="32" size="small" theme-type="Default" @click="goRole"
              >角色管理</EraButton
            >
            <EraButton fontSize="32" size="small" @click="goAccountAdd">新增子账号</EraButton>
          </view>
        </template>
      </VoSafetyArea>
    </view>
    <u-modal
      :closeOnClickOverlay="true"
      :show="delShow"
      :showCancelButton="true"
      cancelColor="rgba(0, 0, 0, 0.65)"
      cancelText="取消"
      confirmColor="rgba(0, 0, 0, 0.85)"
      confirmText="确定"
      width="640rpx"
      @cancel="delShow = false"
      @close="delShow = false"
      @confirm="confirmDelFn"
    >
      <view class="modal-content"> 确认要删除该账号吗？ </view>


    </u-modal>




    <u-modal
        :closeOnClickOverlay="true"
        :show="customerShow"
        :showCancelButton="true"
        cancelColor="rgba(0, 0, 0, 0.65)"
        cancelText="取消"
        confirmColor="rgba(0, 0, 0, 0.85)"
        confirmText="确定"
        width="640rpx"
        @cancel="customerShow = false"
        @close="customerShow = false"
        @confirm="confirmCustomerShowFn"
    >
      <view class="modal-content"> 请确认将该账号设为店铺客服？ </view>
    </u-modal>

  </view>
</template>

<script>
  import {toast,error} from "@/common/helper";

  export default {
    name: 'AuthorityManagement',
    data() {
      return {
        customerShow:false,//设置为客服
        isLoading: false,
        delShow: false,
        // 删除的用户ID
        delDataId: '',
        // 数组array
        listData: [],
        //左侧选中val
        leftVal: 0,
      }
    },
    methods: {
      /**
       * @description 确定设置客服
       */
      async confirmCustomerShowFn(){
        let param={
          accountId:this.delDataId,
          companyId:this.userInfo.companyId,
          customerServiceStatus:true
        }
         await this.$VoHttp.apiUserInfoCustomerService(param).then(res=>{
           // 手动设置 修改成功的
           this.listData.map(item=>{
             if(item.userList){
               item.userList.map(it=>{
                  if(it.accountId==this.delDataId){
                    // 设置成功的
                    it.customerServiceStatus=true
                  }else{
                    // 设置失败
                    it.customerServiceStatus=false
                  }
               })
             }
           })
           this.customerShow=false
           this.$toast('设置成功','','/static/success.png')
         }).catch(err=>{
           this.customerShow=false
           error(err.message||'设置失败')

         })


      },
      /**
       * 确定删除
       */
      async confirmDelFn() {
        if (this.isLoading) return
        this.isLoading = true
        this.$VoHttp
          .apiUserInfoAccount$Id({ id: this.delDataId })
          .then((res) => {
            uni.$u.toast('删除成功')
            this.delShow = false
            this.isLoading = false

            this.initFn()
          })
          .catch((e) => {
            this.delShow = false
            this.isLoading = false
            uni.$u.toast(e.message)
          })
      },
      /**
       * 删除
       */
      delFn(user) {
        this.delShow = true
        this.delDataId = user.accountId
      },
      setUser(user){
        if(user.customerServiceStatus)return
        this.customerShow = true
        this.delDataId = user.accountId
      },
      /**
       * 编辑
       */
      editUser(user) {
        let url =
          '/pagesCommon/AuthorityManagement/AccountAdd?edit=1&id=' +
          user.accountId +
          '&realName=' +
          user.realName +
          '&userName=' +
          user.userName +
          '&roleId=' +
          this.listData[this.leftVal].id
        this.$linkToEasy(url)
        console.log(user, 'sssssssss')
      },
      encryptPhone(phone) {
        return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
      },
      /**
       * 更改左侧按钮
       */
      changeLeftFn(index) {
        if (index === this.leftVal) return
        this.leftVal = index
      },
      /**
       *  新增子账号
       */
      goAccountAdd() {
        this.$linkToEasy('/pagesCommon/AuthorityManagement/AccountAdd')
      },
      /**
       * 角色管理
       */
      goRole() {
        this.$linkToEasy('/pagesCommon/AuthorityManagement/RoleManagement')
      },
      initFn() {
        this.$VoHttp
          .apiUserInfoAccountRole()
          .then((res) => {
            if (res.data) {
              this.listData = res.data
            }
          })
          .catch((e) => {
            uni.$u.toast(e.message)
          })
      },
    },
    onShow(options) {
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
    &-role {
      width: 200rpx;
      height: 100%;
      background-color: #f7f7f8;
      &__item {
        width: 200rpx;
        height: 100rpx;
        font-size: 28rpx;
        color: $v-c0-45;
        line-height: 100rpx;
        text-align: center;
        padding: 0rpx 10rpx;
        box-sizing: border-box;
        position: relative;
      }
      .role-active {
        color: $color-primary-yellow;
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
      padding: 0rpx 32rpx;
      box-sizing: border-box;
      overflow-x: hidden;
      &__no {
        width: 416rpx;
        height: 360rpx;
        display: block;
        margin: 360rpx auto 0rpx;
      }
      &__item {
        width: 100%;
        border-bottom: 2rpx solid #f7f7f8;
        padding: 24rpx 0rpx;
        box-sizing: border-box;
        .info {
          width: 200rpx;
          line-height: 150%;
        }
      }
    }

    .add-group {
      padding: 18rpx 32rpx;
      box-sizing: border-box;
      background-color: #ffffff;
    }
  }
  .modal-content {
    padding: 15px 7px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 32rpx;
    line-height: 150%;
  }
  .bg-d3d4db{
    background-color: #D3D4DB !important;
  }

 .AuthorityManagement ::v-deep  .u-modal__button-group__wrapper--confirm{
    font-weight: bold;
  }
</style>
