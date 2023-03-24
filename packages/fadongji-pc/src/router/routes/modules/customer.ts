import type { AppRouteModule } from '/@/router/types'

import { LAYOUT, getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
import { SuppierData } from '/@/modules/CustomerModule/SupplierModule/routes'
import { agentRouter } from '/@/modules/CustomerModule/AgentPages/routes/index'
import { GarageRouter } from '/@/modules/CustomerModule/Garage/router/GarageRouter'
import { CommodityRouter } from '/@/modules/CustomerModule/CommodityManager/router/commodityManager'
import { ChannelRouter } from '/@/modules/CustomerModule/ChannelManager/router/ChannelManager'
import { TechnicalWorkersRouter } from '/@/modules/CustomerModule/TechnicalWorkers/router/index'
import { OldMachineBuyersRouter } from '/@/modules/CustomerModule/OldMachineBuyers/router/index'

const customer: AppRouteModule = {
  path: '/customerModule',
  name: 'CustomerModule',
  component: LAYOUT,
  meta: {
    orderNo: 2,
    icon: 'ant-design:team-outlined',
    title: t('客户'),
  },
  children: [
    {
      path: 'supplier',
      name: 'Supplier',
      component: getParentLayout('view'),
      meta: {
        title: '供应商',
      },
      redirect: '/CustomerModule/supplier/view/SupplierList/SupplierList.vue',
      children: [...SuppierData],
    },
    {
      path: 'agent',
      name: 'Agent',
      component: getParentLayout('view'),
      meta: {
        title: '服务商',
      },
      redirect: '/CustomerModule/agentPages/view/AgentManage.vue',
      children: [...agentRouter],
    },
    {
      path: 'garageRouter',
      name: 'GarageRouter',
      component: getParentLayout('view'),
      meta: {
        title: '修理厂',
      },
      children: [...GarageRouter],
    },
    {
      path: 'CommodityManager',
      name: 'CommodityManager',
      component: getParentLayout('view'),
      meta: {
        title: '招商经理',
      },

      children: [...CommodityRouter],
    },
    {
      path: 'ChannelManager',
      name: 'ChannelManager',
      component: getParentLayout('view'),
      meta: {
        title: '渠道经理',
      },
      children: [...ChannelRouter],
    },
    {
      path: 'TechnicalWorkers',
      name: 'TechnicalWorkers',
      component: getParentLayout('view'),
      meta: {
        title: '集师傅',
      },
      children: [...TechnicalWorkersRouter],
    },
    {
      path: 'OldMachineBuyers',
      name: 'OldMachineBuyers',
      component: getParentLayout('view'),
      meta: {
        title: '旧机买家',
      },
      children: [...OldMachineBuyersRouter],
    },
    // OldMachineBuyersRouter
  ],
}

export default customer
