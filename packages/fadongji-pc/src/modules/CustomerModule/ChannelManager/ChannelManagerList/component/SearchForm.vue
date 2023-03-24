<template>
  <a-form
          :model="formState"
          name="horizontal_login"
          autocomplete="off"
          :label-col="labelCol" :wrapper-col="wrapperCol"
  >
    <a-row>
      <a-col :span="colSpan">
        <a-form-item label="渠道经理名称" class="mb-24px">
          <a-input @pressEnter="enterName" v-model:value="formState.name" placeholder="名称"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="colSpan">
        <a-form-item label="渠道经理手机号" class="mb-24px">
          <a-input @pressEnter="enterName" v-model:value="formState.userName" placeholder="手机号"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="colSpan">
        <a-form-item label="所属地区" class="mb-24px">
          <a-cascader v-model:value="formState.areaCode" :field-names="fieldNames" :options="areaOptions" placeholder="请选择"/>
        </a-form-item>
      </a-col>
      <a-col :span="colSpan">
        <a-form-item label="注册时间" class="mb-24px">
          <a-range-picker class="w-full" v-model:value="searchTime" valueFormat="YYYY-MM-DD" format="YYYY-MM-DD" :placeholder="['开始时间', '结束时间']"/>
        </a-form-item>
      </a-col>
      <a-col :span="colSpan" :offset="offset">
        <a-form-item class="mb-24px mr-0 text-right	 " :wrapperCol='{span: 24}'>
          <a-button  @click="handlerRest">重置</a-button>
          <a-button style="margin-left: 10px" type="primary" @click="handlerSubmit">查询</a-button>
        </a-form-item>
      </a-col>
    </a-row>

  </a-form>

</template>

<script>
  import AdminHttp from '/@/utils/http/adminHttp'
  import {AreaDataApi} from '/@/api/model/dictionaryApi'
  import { _ } from '@vocen/shared'

  const initialForm = {
    name: '',
    phone: '',
    areaCode: '',
    startTime: '',
    endTime: ''
  };
  export default {
    name: "SearchForm",
    data() {
      return {
        searchTime: [],
        areaOptions: [], // 地区参数地址
        labelCol: {style: {width: '120px'}},
        wrapperCol: {span: 18},
        colSpan:8,
        //这里设置搜索按钮的偏移量，搜索按钮在页面右侧,页面三等分,
        offset:8,
        formState: {},
        fieldNames: {children: 'children', label: 'name', value: 'id'},
      }
    },
    methods: {
      enterName(){
        this.handlerSubmit()
      },
      handlerSubmit() {
        let formState = _.cloneDeep(this.formState);
        if (formState.length > 0) {
          formState.startTime = formState[0]+' 00:00:00';
          formState.endTime = formState[1]+' 23:59:59';
        }
        if(formState.areaCode &&formState.areaCode.length > 0){
          formState.areaCode = formState.areaCode[formState.areaCode.length -1]
        }
        this.$emit('submit', formState)

      },
      handlerRest() {
        console.log(initialForm)
        this.formState = _.cloneDeep(initialForm);
        this.searchTime = [];
        this.$emit('rest', this.formState)

      },
      // 获取地区数据
      async getArea() {
        try {
          const data = await AreaDataApi();
          this.areaOptions = data;
        } catch (e) {
            console.log(e)
        }
      }
     
    },
    mounted(){
      this.formState = _.cloneDeep(initialForm)
      this.getArea()
    }
  }
</script>

<style scoped lang="scss">

</style>
