<template>
  <view class="list flex flex-column">
    <VoNav is-fixed title="我的收藏" is-have-more>

      <view slot="operation" class="operation">
        <span v-if="editOpen" class="edit" @click="openEditMode">编辑</span>
        <span v-else class="done" @click="editDone">完成</span>
        <!--<VoIcon name="category" color="#22284B" />-->
<!--        <VoIcon :opacity="0.45" color="#000000" name="more" />-->
      </view>
    </VoNav>
    <VoNoData v-if="!dataList.length" no-data-tips="暂无我的收藏~" />
    <block v-else>
      <scroll-view :scroll-y="true" class="scroll-list flex1 overflow-y">
        <view
          v-for="(item, index) in dataList"
          :key="index"
          class="scroll-list__item flex flex-vertical-c"
          @click="handlerRowClick(item, index)"
        >
          <view v-if="editShow === true" class="m-r-8">
            <VoIcon v-if="item.check" :opacity="1" color="#FF5319" name="select-right" size="28" />
            <VoIcon v-else :opacity="0.15" color="#000000" name="circle" size="28" />
          </view>
          <ListItem :data-obj="item" :disabled="true" class="item-collect" />
        </view>
        <VoSafetyArea v-if="editShow === false" :is-fixed="false" />
      </scroll-view>
    </block>
    <view v-if="editShow === true" class="scroll-bottom">
      <view class="flex flex-vertical-c flex-justify-between">
        <view class="flex flex-vertical-c">
          <VoIcon
            v-if="allCheck"
            :opacity="1"
            color="#FF5319"
            name="select-right"
            size="28"
            @click="checkAllCancel"
          />
          <VoIcon
            v-else
            :opacity="0.15"
            color="#000000"
            name="circle"
            size="28"
            @click="checkAll"
          />
          <view :class="allCheck ? 'color-block-85' : 'color-block-45'" class="m-l-8 lh48 fz-32"
            >全选</view
          >
        </view>
        <view class="scroll-bottom__button" @click="deleteFn">删除</view>
      </view>
      <VoSafetyArea :is-fixed="false" />
    </view>
  </view>
</template>
<script>
  import ListItem from '@/pagesSupplier/BusinessUniversity/components/ListItem'
  import helpUtil from '@/common/helper'

  export default {
    name: 'MyCollect',
    components: { ListItem },
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        editOpen: true, // 是否显示编辑
        pageNo: 1,
        pageSize: 10,
        dataList: [],
        editShow: false, // 点击编辑时图标显示
        ids: [], // 收藏id集合
        allCheck: false, // 全选
      }
    },
    watch: {
      dataList: {
        deep: true,
        handler(newValue, oldValue) {
          let ids = newValue.map((item) => item.collectionId)
          let arr = newValue.filter((item) => item.check)
          this.ids = arr.map((item) => item.collectionId)
          if (
            this.ids.length == ids.length &&
            this.ids.every(function (v, i) {
              return v === ids[i]
            })
          ) {
            this.allCheck = true
          } else {
            this.allCheck = false
          }
        },
      },
    },
    onShow() {
      this._init_func()
    },
    methods: {
      handlerRowClick(row, index) {
        if(this.editOpen){
          this.$linkToEasy(`/pagesSupplier/BusinessUniversity/CourseDetail?id=${row.id}`)
        }else{
          this.$set(row, 'check', !row.check)

        }
      },
      /**
       * 完成
       */
      editDone() {
        this.editShow = false
        this.editOpen = true
        this.dataList.forEach((item) => {
          item.check = false
        })
      },
      /**
       * 编辑
       */
      openEditMode() {
        if (!this.dataList.length) {
          return
        }
        console.log(111)
        this.editShow = true
        this.editOpen = false
      },
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem) {
        this.$linkToEasy('/pagesSupplier/BusinessUniversity/CourseDetail')
      },
      async _init_func() {
        this.dataList = await this.$VoHttp
          .apiContentUniversityMyCollection()
          .then((res) => {
            if (res && res.data) {
              // return res.data.records.map((item) => ({ ...item, check: false }))
              let records = res.data.records
              records.forEach((item) => {
                item.check = false
                helpUtil.regroupFileData(item, 'fileUrl', ',')
              })
              return records
            } else {
              return []
            }
          })
          .catch((err) => {
            return []
          })
        if(this.dataList.length<=0){
          this.editShow = false
          this.editOpen = true
        }
      },
      /**
       * 全选
       */
      checkAll() {
        this.allCheck = true
        this.dataList.forEach((item) => {
          item.check = true
        })
      },
      /**
       * 取消全选
       */
      checkAllCancel() {
        this.allCheck = false
        this.dataList.forEach((item) => {
          item.check = false
        })
      },
      /**
       * 删除
       */
      deleteFn() {
        if (this.ids.length <= 0) {
          this.$u.toast('请选择要取消收藏的数据')
          return
        }
        let param = {
          ids: this.ids,
        }
        this.$VoHttp
          .apiContentUniversityBatchDelete(param)
          .then((res) => {
            console.log(res)
            if (res && res.data) {
              uni.$u.toast('删除成功！')
              this._init_func()
            }
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .operation {
    display: flex;
    align-items: center;
  }
  .done {
    color: #22284b;
    font-size: 32rpx;

    margin-right: 36rpx;
  }
  .edit {
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.65);
    margin-right: 36rpx;
  }
  .list {
    overflow-x: hidden;
    height: 100vh;
    .scroll-list {
      height: 100%;
      overflow-y: auto;
      padding-left: 32rpx;
      box-sizing: border-box;
      background: #fff;
      &__item {
        margin-bottom: 24rpx;
        padding: 32rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid #f7f7f8;
        display: flex;
        .item-collect {
          flex: 1;
        }
      }
    }
    .scroll-bottom {
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
      &__button {
        width: 240rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: $color-primary-yellow;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: #ffffff;
      }
    }
  }
</style>
