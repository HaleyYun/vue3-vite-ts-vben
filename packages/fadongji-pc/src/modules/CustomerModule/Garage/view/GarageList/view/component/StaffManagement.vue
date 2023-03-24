<template>
  <div class="form">
    <BasicForm
      ref="opForm"
      :labelWidth="120"
      :schemas="schemasArr"
      :actionColOptions="{ span: 8,offset:8 }"
      @reset="handlerFilterRest"
      @submit="handlerFilterSubmit"
    />

    <a-table :columns="columns" :dataSource="dataSource" >

      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-switch v-model:checked="record.status" :checkedValue="false"  :unCheckedValue="true" @change="changeStatusFn($event,record)"   />
        </template>


        <template v-if="column.dataIndex === 'operation'">


          <a-popconfirm title="确定要重置该用户密码？" @confirm="resetStaffFn(record)">
            <AButton type="link" >重置密码</AButton>
          </a-popconfirm>
          <a-popconfirm title="确定要删除该用户？" @confirm="delStaffFn(record)">
            <AButton type="link" >删除</AButton>
          </a-popconfirm>
        </template>



      </template>

      <template #pagination>
        <a-pagination
          :current="paginations.current"
          :page-size="paginations.pageSize"
          :total="paginations.total"
          @pagination="paginationChange"
        />
      </template>


    </a-table>

    <a-modal v-model:visible="staffShow" cancelText="取消" okText="确认添加" title="添加员工账号" @ok="toAddSureFn">
      <div class="p-5">
        <div class="flex flex-vertical-c">
          <div class="m-r-2 w120">
            所属角色
          </div>
          <a-select v-model:value="addStaffInfo.roleId" class="w200" option="roleArr"  placeholder="请选择所属角色" @change="changePlatFormCodeFn">
            <a-select-option v-for="(item,index) of  roleArr"  :key="index" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </div>
        <div class="flex flex-vertical-c">
          <div class="m-r-2 w120">
            账户名称
          </div>
          <a-input v-model:value="addStaffInfo.realName" class="w200" maxlength="11"   placeholder="请输入账户名称" >
          </a-input>
        </div>
        <div class="flex flex-vertical-c">
          <div class="m-r-2 w120">
            手机号
          </div>
          <a-input v-model:value="addStaffInfo.userName" class="w200" maxlength="11"   placeholder="请输入手机号" >
          </a-input>
        </div>
      </div>
    </a-modal>

  </div>
</template>

<script lang="ts" setup>
import { BasicForm, FormSchema } from '/@/components/Form';
import { defineExpose, reactive } from "vue";
import adminHttp from "/@/utils/http/adminHttp";
import { useMessage } from "/@/hooks/web/useMessage";
import { useRoute } from "vue-router";
const { createMessage } = useMessage()
import {ref} from 'vue'
import { schemas,columns } from "/@/modules/CustomerModule/Garage/view/GarageList/view/data/StaffManagementData";
const route = useRoute()



const dataSource=ref([])
const initFn=async (value:{})=>{
  let param={
    companyId: route.query?.id,
    pageNo:paginations.current,
    pageSize:paginations.pageSize,
    ...value
  }
  await adminHttp.CUSTOMER.companyInfoStaffPage(param).then(res=>{
    dataSource.value=res.data.records


    paginations.total = res.data.total


  })


}

const roleArr=ref([])




// 分页
const paginationChange = ({ current, pageSize }) => {
  paginations.current = current
  paginations.pageSize = pageSize
  initFn()
}
const paginations = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
})
const handlerFilterRest=()=>{
  initFn()
}
const handlerFilterSubmit=(val)=>{

  let  param={
    account:val.account,
    status:val.status,
    roleId:val.roleId
  }
  if(val.time){
    param.startTime=val.time[0]
    param.endTime=val.time[1]
  }

  initFn(param)
}

/**
 *  @description 更改状态
 */
const changeStatusFn=(status,row)=>{
  adminHttp.CUSTOMER.companyInfoChangeUserStatus({
    status,
    id:row.id,
  }).then(res=>{
    createMessage.success({ content: `修改成功` })
    initFn()
  })
}
/**
 * @description 删除员工
 * @param row
 */
const delStaffFn=(row)=>{
  adminHttp.CUSTOMER.useInfoAccountItem({
    id:row.accountId,
  }).then(res=>{
    createMessage.success({ content: `删除成功` })
    initFn()
  })
}
/**
* @description 重置员工
* @param row
*/
const resetStaffFn=(row)=>{
  adminHttp.USER.userInfoPassword({
    userId:row.userId,
  }).then(res=>{
    createMessage.success({ content: `重置成功` })
    initFn()
  })
}



const schemasArr=ref([])
const initList=()=>{
  adminHttp.CUSTOMER.customerRoleCompany({
    companyId: route.query?.id,
  }).then(res=>{
    roleArr.value=[]
    res.data.map(item=>{
      roleArr.value.push({
        label:item.name,
        value:item.id
      })
    })
    schemas[1].componentProps.options=roleArr.value
    schemasArr.value=schemas

  })
}
initList()

initFn()


defineExpose({
  initFn
})

</script>


<style lang="less" scoped>

.form{
  padding: 20px;
  min-height: 60vh;
}
.m-r-10{
  margin: 0px  20px 0px 0px !important;
}
.w120{
  width: 120px;
}
.w200{
  width: 200px;
}
</style>
