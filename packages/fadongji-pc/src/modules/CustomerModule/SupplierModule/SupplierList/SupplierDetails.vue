<template>
  <div>
    <div class="page-wrap">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="供应商详情">
        <div class="page-step">
          <a-steps v-model:current="current" labelPlacement="vertical">
            <a-step title="注册入驻">
              <template #description> 2022-01-09 15:00:00</template>
            </a-step>
            <a-step title="资料认证">
              <template #description> 2022-01-09 15:00:00</template>
            </a-step>
            <a-step title="认证审核">
              <template #description>
                <template v-if="description">
                  <a-button type="primary" @click="audit">去审核</a-button>
                </template>
                <template v-else>2022-01-09 15:00:00</template>
              </template>
            </a-step>
            <a-step title="认证结果">
              <template #description> 2022-01-09 15:00:00</template>
            </a-step>
          </a-steps>
        </div>
        <div class="tab-list">
          <a-tabs v-model:activeKey="active" type="card">
            <a-tab-pane key="1" tab="基础信息">
              <table style="width: 100%" class="edit-table">
                <tr v-for="(item, i) in basisData" :key="i">
                  <td class="edit-table-column">{{ item.title }}</td>
                  <template v-if="item.title === '详细地址'">
                    <template v-if="addressBool">
                      <input style="width: 140px" />
                      <a @click="confirmEditEvent(item)">确定</a>
                    </template>
                    <template v-else>
                      <span>{{ item.content }}</span>
                      <a @click="editEvent(item)">编辑</a>
                    </template>
                  </template>
                  <template v-else>
                    <td class="edit-table-column">{{ item.content }}</td>
                  </template>
                  <td class="edit-table-column">{{ item.title1 }}</td>
                  <td class="edit-table-column">{{ item.content1 }}</td>
                </tr>
              </table>
            </a-tab-pane>
            <a-tab-pane key="2" tab="公司资质">
              <table style="width: 100%" class="edit-table">
                <tr v-for="(item, i) in proveData" :key="i">
                  <td class="edit-table-column">{{ item.title }}</td>
                  <td class="edit-table-column">{{ item.content }}</td>
                  <td class="edit-table-column">{{ item.title1 }}</td>
                  <td class="edit-table-column">{{ item.content1 }}</td>
                </tr>
              </table>
            </a-tab-pane>
            <a-tab-pane key="3" tab="经营品类">
              <div class="category">
                <div
                  ><p>已授权品类</p>
                  <a-button type="primary" @click="addCategory">添加</a-button>
                </div>
                <div class="category-list">
                  <div v-for="(item, i) in businessData" :key="i">
                    <div class="category-item"
                      >{{ item.title }}--{{ item.subTitle }}
                      <a-popconfirm
                        @confirm="grant(item)"
                        title="有当前品类的商品正在销售，解除后会立即下架，是否确认解除？"
                        ok-text="确认"
                        cancel-text="取消"
                      >
                        <a class="item" href="#">解除授权</a>
                      </a-popconfirm>
                    </div>
                  </div>
                </div>
              </div>
              <div class="brand">
                <div
                  ><p>已授权品牌</p>
                  <a-button type="primary" @click="addCategory">添加</a-button>
                </div>
                <div class="category-list">
                  <a-table
                    style="width: 800px"
                    :dataSource="brandPlace"
                    bordered
                    size="small"
                    :pagination="false"
                    :columns="brandColumns"
                  >
                    <template #addCategory="{ record }">
                      <div class="list-child">
                        <div v-for="item of record.addChildCategory" :key="item.id">
                          <img :src="item.img" />
                        </div>
                      </div>
                    </template>
                    <template #operation="{ record }">
                      <div>
                        <a-button type="link">解除授权</a-button>
                      </div>
                    </template>
                  </a-table>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="财务信息">
              <table style="width: 100%" class="edit-table">
                <tr v-for="(item, i) in serviceData" :key="i">
                  <td class="edit-table-column">{{ item.title }}</td>
                  <td class="edit-table-column">{{ item.content }}</td>
                  <td class="edit-table-column">{{ item.title1 }}</td>
                  <td class="edit-table-column">{{ item.content1 }}</td>
                </tr>
              </table>
            </a-tab-pane>
            <a-tab-pane key="5" tab="合同信息">
              <div class="contract-content">
                <IconFont type="icon-morenbiaozhi" />
                合同信息
              </div>
              <div class="contract">
                <span class="inContract">入驻合同</span>
                <div class="contract-box">
                  <p class="contract-wrap">
                    <a class="contract-title" href="javascript::;">《平台商户入驻合同》</a>
                    <a-button class="up-btn" @click="showModal" size="large">点击查看</a-button>
                  </p>
                  <p class="contract-wrap"
                    ><a class="contract-title" href="javascript::;">《质量管控协议》</a>
                    <a-button class="up-btn" type="link" size="large">上传</a-button>
                  </p>
                  <p class="contract-wrap">
                    <a class="contract-title" href="javascript::;">《售后退出机制》</a>
                    <a-button class="up-btn" type="link" size="large">上传</a-button>
                  </p>
                  <p class="contract-wrap">
                    <a class="contract-title" href="javascript::;">《供应商保供协议》</a>
                    <a-button class="up-btn" type="link" size="large">上传</a-button>
                  </p>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="6" tab="店铺信息">
              <div style="padding: 10px">
                <p>店铺信息</p>
                <div class="page-store">
                  <img class="pageImg" src="../../../../assets/images/assets.png" alt="" />
                  <a class="replace" href="javascrpit::;">点击更换</a>
                </div>
                <div>
                  <div class="shop-name"><span>店铺名称：</span><span>江陵动力旗舰店</span></div>
                  <div><span>简称：</span><span>江陵动力</span></div>
                </div>
                <div>
                  <span>商品综合评价：</span>
                  <a-rate v-model:value="score" disabled allow-half />
                  <span class="score-item">9.45分</span>
                </div>
                <div>
                  <span style="margin-right: 37px">店家服务:</span>
                  <a-rate v-model:value="score" disabled allow-half />
                  <span class="score-item">9.45分</span>
                </div>
                <div>
                  <span style="margin-right: 37px">物流履约:</span>
                  <a-rate v-model:value="score" disabled allow-half />
                  <span class="score-item">9.45分</span>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="7" tab="地址信息">
              <a-table
                :dataSource="dataPlace"
                bordered
                size="small"
                :pagination="false"
                :columns="placeColumns"
              />
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="员工管理">
        <div class="search">
          <EraSearchTable :item-width="246" :search-data="searchData">
            <template #operation>
              <Button type="primary" class="submit-btn" @click="searchTableEvent()">查询</Button>
              <Button type="primary" class="submit-btn" @click="resetEvent()">重置</Button>
            </template>
            <template #content="{ row }">
              <template v-if="row.id === 'tag-2'">
                <a-select
                  class="form-select"
                  v-model:value="row.value"
                  :options="options"
                  :placeholder="row.placeHolder"
                />
              </template>
              <template v-if="row.id === 'tag-3'">
                <a-range-picker class="form-select" v-model:value="value1" />
              </template>
              <template v-if="row.id === 'tag-4'">
                <a-select
                  class="form-select"
                  v-model:value="row.value"
                  :options="options1"
                  :placeholder="row.placeHolder"
                />
              </template>
            </template>
          </EraSearchTable>
        </div>
        <div class="wrap-table">
          <DetailsTable />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
  <a-modal v-model:visible="auditVisible" centered title="供应商审核" :footer="null">
    <div style="padding: 20px">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ style: { width: '150px' } }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="代理商名称" name="username">
          <a-input v-model:value="formState.username" disabled />
        </a-form-item>

        <a-form-item label="审核结果" name="password">
          <a-radio-group v-model:value="formState.password" @change="radioChangeEvent">
            <a-radio value="1">审核通过</a-radio>
            <a-radio value="2">审核不通过</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="isReject" label="拒绝原因" name="word">
          <a-textarea
            v-model:value="formState.word"
            :rows="4"
            placeholder="最多输入150字"
            :maxlength="150"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 10, offset: 9 }">
          <a-button style="margin-right: 60px" @click="auditVisible = false">取消</a-button>
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  <a-modal v-model:visible="visible" title="合同" @ok="handleOk">
    <div style="padding: 20px">
      <p>合同内容</p>
    </div>
  </a-modal>
  <a-modal v-model:visible="categoryVisible" centered title="添加品类" :footer="null">
    <div style="padding: 20px">
      <a-form
        :model="categoryState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="categoryFinish"
        @finishFailed="categoryFailed"
      >
        <a-form-item
          label="品类名称"
          name="username"
          :wrapper-col="{ span: 10, offset: 1 }"
          :rules="[{ required: true, message: '请选择品类' }]"
        >
          <a-cascader
            v-model:value="categoryState.username"
            :options="categoryOptions"
            placeholder="请选择"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 10, offset: 9 }">
          <a-button style="margin-right: 60px" @click="categoryVisible = false">取消</a-button>
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  </div>
</template>

<script lang="ts">
  import { createFromIconfontCN } from '@ant-design/icons-vue'

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3417860_o9xftpwv6ss.js',
  })
  import { defineComponent, ref, reactive } from 'vue'
  import { Button } from 'ant-design-vue'
  import type { CascaderProps } from 'ant-design-vue'
  import type { SelectProps } from 'ant-design-vue'
  import DetailsTable from '../SupplierList/component/DetailsTable.vue'
  import EraSearchTable from '/@/components/EraSearchTable/EraSearchTable.vue'
  import type { Dayjs } from 'dayjs'

  type RangeValue = [Dayjs, Dayjs]
  import { supplierSearchData } from './type'

  interface categoryState {
    username: string
  }

  //品牌
  const brandColumns = [
    {
      title: '品牌名称',
      dataIndex: 'category',
      key: 'category',
      slots: { customRender: '' },
      align: 'center',
      width: '50px',
    },
    {
      title: '品牌logo',
      dataIndex: 'move',
      key: 'move',
      slots: { customRender: '' },
      align: 'center',
      width: '60px',
    },
    {
      title: '资质文件',
      dataIndex: 'addChildCategory',
      key: 'addChildCategory',
      slots: { customRender: 'addCategory' },
      align: 'center',
      width: '60px',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      slots: { customRender: 'operation' },
      align: 'center',
      width: '60px',
    },
  ]
  const placeColumns = [
    {
      title: '收货人',
      dataIndex: 'category',
      key: 'category',
      slots: { customRender: '' },
      align: 'center',
      width: '50px',
    },
    {
      title: '收货电话',
      dataIndex: 'move',
      key: 'move',
      slots: { customRender: '' },
      align: 'center',
      width: '60px',
    },
    {
      title: '地址',
      dataIndex: 'addChildCategory',
      key: 'addChildCategory',
      slots: { customRender: '' },
      align: 'center',
      width: '60px',
    },
  ]
  const businessData = [
    {
      title: '底盘件',
      subTitle: '离合器',
    },
    {
      title: '底盘件',
      subTitle: '刹车片',
    },
    {
      title: '底盘件',
      subTitle: '离合器',
    },
    {
      title: '底盘件',
      subTitle: '刹车片',
    },
    {
      title: '底盘件',
      subTitle: '离合器',
    },
    {
      title: '底盘件',
      subTitle: '刹车片',
    },
    {
      title: '底盘件',
      subTitle: '离合器',
    },
    {
      title: '底盘件',
      subTitle: '刹车片',
    },
    {
      title: '底盘件',
      subTitle: '离合器',
    },
    {
      title: '底盘件',
      subTitle: '刹车片',
    },
    {
      title: '底盘件',
      subTitle: '离合器',
    },
    {
      title: '底盘件',
      subTitle: '刹车片',
    },
  ]
  const basisData = [
    {
      title: '主体状态',
      content: '正常',
      title1: '认证状态',
      content1: '已认证',
    },
    {
      title: '等级',
      content: '1',
      title1: '名称',
      content1: '长葛姜天龙',
    },
    {
      title: '负责人',
      content: '张三',
      title1: '手机号',
      content1: '13200000000',
    },
    {
      title: '营业执照注册地址',
      content: '河南省-郑州市-金水区木华广场',
      title1: '用户来源',
      content1: '邀请注册',
    },
    {
      title: '详细地址',
      content: '正商木华广场3号楼A座7层(省市县+具体地址)',
      title1: '收货地址',
      content1: '查看',
    },
    {
      title: '渠道经理',
      content: '张三',
      title1: '代理品牌',
      content1: '2',
    },
  ]
  const proveData = [
    {
      title: '企业类型',
      content: '个体工商户',
      title1: '企业名称',
      content1: '沃森科技有限公司',
    },
    {
      title: '社会信用代码',
      content: 'G000000000000001',
      title1: '有效期',
      content1: '长期',
    },
    {
      title: '注册地址',
      content: '河南省郑州市金水区木华广场',
      title1: '营业执照图片',
      content1: '查看图片',
    },
    {
      title: '法人身份证姓名',
      content: '张三',
      title1: '身份证号',
      content1: '410101202001011234',
    },
    {
      title: '身份证人像页',
      content: '查看',
      title1: '身份证国徽页',
      content1: '查看',
    },
  ]
  const serviceData = [
    {
      title: '对公账户银行',
      content: '中国银行',
      title1: '账号',
      content1: '1000010000111',
    },
    {
      title: '法人银行卡',
      content: '3张',
      title1: '银行信息',
      content1: '查看',
    },
    {
      title: '应缴保证金',
      content: '1000.00',
      title1: '实缴保证金',
      content1: '0.00',
    },
    {
      title: '开票信息',
      content: '沃森科技有限公司  1212123123  中国银行  1000001',
      title1: '',
      content1: '',
    },
    {
      title: '账期额度',
      content: '2000.00',
      title1: '',
      content1: '',
    },
  ]

  interface FormState {
    username: string
    password: string
    remember: boolean
    word: string
  }

  const categoryOptions: CascaderProps['options'] = [
    {
      value: '底盘件',
      label: '底盘件',
      children: [
        {
          value: '离合器',
          label: '离合器',
        },
        {
          value: '球头',
          label: '球头',
        },
        {
          value: '刹车片',
          label: '刹车片',
        },
        {
          value: '方向机',
          label: '方向机',
        },
      ],
    },
    {
      value: '发动机',
      label: '发动机',
      children: [
        {
          value: '机油',
          label: '机油',
        },
        {
          value: '轴承',
          label: '轴承',
        },
        {
          value: '润滑',
          label: '润滑',
        },
      ],
    },
  ]

  import img1 from '../../../../assets/images/assets.png'

  export default defineComponent({
    components: { EraSearchTable, Button, DetailsTable, IconFont },
    setup() {
      const categoryState = reactive<categoryState>({
        username: '',
      })
      const categoryFinish = (values: any) => {
        console.log('Success:', values)
        categoryVisible.value = false
      }

      const categoryFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }
      const visible = ref<boolean>(false)

      const showModal = () => {
        visible.value = true
      }
      const score = ref<number>(4.5)
      /**
       * @function searchTableEvent
       * @description 清空筛选输入的内容
       * @param  ‘|供应商名称|手机号|’ {Map}
       * @return void
       * @author stoneAge 2022/05/24
       */
      const searchTableEvent = () => {
        alert('供应商')
      }
      const options = ref<SelectProps['options']>([
        { value: 'admin', label: 'admin' },
        { value: 'users', label: 'users' },
      ])
      const options1 = ref<SelectProps['options']>([
        { value: '禁用', label: '禁用' },
        { value: '正常', label: '正常' },
      ])
      let searchData = reactive(supplierSearchData)
      // 是否显示 “拒绝原因”输入框 isReject: true--显示； false--隐藏
      const isReject = ref<boolean>(false)
      const formState = reactive<FormState>({
        username: '长葛姜天龙',
        password: '',
        remember: true,
        word: '',
      })
      //  "供应商列表" 修改详细地址的 boolean tag
      const addressBool = ref<boolean>(false)
      const description = ref<boolean>(true)
      const current = ref<number>(0)
      const editEvent = (item) => {
        addressBool.value = true
      }
      const confirmEditEvent = (item) => {
        addressBool.value = false
      }
      const auditVisible = ref<boolean>(false)
      const audit = () => {
        auditVisible.value = true
      }
      const onFinish = (values: any) => {
        console.log('Success:', values)
      }

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }
      const radioChangeEvent = (item) => {
        if (item.target.value === '2') {
          isReject.value = true
        } else {
          isReject.value = false
        }
      }
      const dataPlace = reactive([
        {
          id: '1',
          key: 4,
          category: '张三',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
        },
        {
          id: '2',
          key: 4,
          category: '张三',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
        },
        {
          id: '3',
          key: 4,
          category: '张三',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
        },
        {
          id: '5',
          key: 5,
          category: '张三',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
        },
      ])
      const brandPlace = reactive([
        {
          id: '1',
          key: 4,
          category: '张三',
          move: '13333331234',
          addChildCategory: [{ id: '1', img: img1 }],
        },
        {
          id: '2',
          key: 4,
          category: '张三',
          move: '13333331234',
          addChildCategory: [{ id: '1', img: img1 }],
        },
        {
          id: '3',
          key: 4,
          category: '张三',
          move: '13333331234',
          addChildCategory: [
            { id: '1', img: img1 },
            { id: '2', img: '../../../../assets/images/assets.png' },
          ],
        },
        {
          id: '5',
          key: 5,
          category: '张三',
          move: '13333331234',
          addChildCategory: [{ id: '1', img: img1 }],
        },
      ])
      /**
       * @function resetEvent
       * @description 清空筛选输入的内容
       * @return void
       * @author stoneAge 2022/05/24
       */
      const resetEvent = () => {
        searchData = searchData.filter((item) => {
          item.value = ''
          return item
        })
      }
      const grant = (item) => {
        console.log(item, 'kkkk')

        alert('删除成功')
      }
      const categoryVisible = ref<boolean>(false)

      const addCategory = (record) => {
        console.log(record, 'ssss')

        categoryVisible.value = true
      }

      return {
        addCategory,
        categoryVisible,
        grant,
        visible,
        showModal,
        score,
        resetEvent,
        searchTableEvent,
        value1: ref<RangeValue>(),
        isReject,
        formState,
        onFinish,
        onFinishFailed,
        auditVisible,
        description,
        serviceData,
        basisData,
        proveData,
        current,
        addressBool,
        active: ref('1'),
        activeKey: ref('1'),
        editEvent,
        confirmEditEvent,
        radioChangeEvent,
        audit,
        dataPlace,
        placeColumns,
        brandColumns,
        searchData,
        options,
        options1,
        categoryValue: ref<string[]>([]),
        categoryOptions,
        businessData,
        //--
        categoryState,
        categoryFinish,
        categoryFailed,
        brandPlace,
        IconFont,
      }
    },
  })
</script>

<style lang="less" scoped>
  ::v-deep(.ant-steps-item-description) {
    width: 127px !important;
  }

  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;

    .page-step {
      padding: 50px;
      background: #fff;
      margin-bottom: 10px;
    }

    .edit-table td:nth-child(even) {
      background: #f6f7f8;
    }

    .edit-table td,
    .edit-table th {
      border: 1px solid #cad9ea;
      color: #666;
      height: 50px;
    }

    .tab-list {
      padding: 15px;
      background: #fff;
    }
  }

  .submit-btn {
    width: 80px;
    margin-right: 10px;
  }

  .form-select {
    width: 246px;
  }

  .wrap-table {
    padding: 10px 0;
  }

  .page-store {
    position: relative;

    .pageImg {
      width: 70px;
      height: 70px;
    }

    .replace {
      position: absolute;
      left: 80px;
      top: 50px;
    }
  }

  .shop-name {
    padding-top: 10px;
  }

  .score-item {
    margin-left: 10px;
  }

  .contract-content {
    font-size: 24px;
    font-weight: 400;
  }

  .contract {
    padding: 30px;

    .inContract {
      font-size: 24px;
      font-weight: bolder;
    }

    .contract-box {
      border: 1px solid #e4e4e4;

      .contract-wrap {
        position: relative;

        .contract-title {
          display: block;
          margin-top: 20px;
          font-size: 24px;
          width: 250px;
        }

        .up-btn {
          position: absolute;
          // margin-top: 5px;
          left: 470px;
          top: 1px;
          width: 88px;
        }
      }
    }
  }

  .category {
    padding: 10px;
    border: 1px solid #e4e4e4;

    .category-list {
      display: flex;
      flex-wrap: wrap;
      width: 850px;
      background: #fff;
      // border: 1px solid #e4e4e4;

      .category-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 5px 0 5px 5px;
        padding: 5px;
        height: 30px;
        border: 1px solid #e4e4e4;

        .item {
          margin-left: 5px;
        }
      }
    }
  }

  .brand {
    margin-top: 15px;
    padding: 10px;
    border: 1px solid #e4e4e4;

    .list-child {
      display: flex;
    }
  }
</style>
