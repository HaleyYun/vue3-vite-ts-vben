import type { AppRouteModule } from '/@/router/types'

import { LAYOUT, getParentLayout } from '/@/router/constant'
import { MachineRouter } from '/@/modules/OrderModule/view/OldMachineOrder/router/oldMachine'
import { t } from '/@/hooks/web/useI18n'

const order: AppRouteModule = {
  path: '/OrderModule',
  name: 'OrderModule',
  component: LAYOUT,
  meta: {
    orderNo: 5,
    icon: 'ant-design:file-text-outlined',
    title: t('订单'),
  },
  children: [
    {
      path: 'supplierOrder',
      name: 'SupplierOrder',
      component: getParentLayout('view'),
      meta: {
        title: '供应商订单',
      },
      redirect: '/OrderModule/view/SupplierOrder/SalesOrder/SalesOrder.vue',
      children: [
        {
          path: 'salesOrder',
          name: 'SalesOrder',
          component: () =>
            import('/@/modules/OrderModule/view/SupplierOrder/SalesOrder/SalesOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('修理厂订单'),
          },
        },
        {
          path: 'investmentOrder',
          name: 'InvestmentOrder',
          component: () =>
            import('/@/modules/OrderModule/view/SupplierOrder/InvestmentOrder/InvestmentOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('投资订单'),
          },
        },
        {
          path: 'afterSalesOrder',
          name: 'AfterSalesOrder',
          component: () =>
            import('/@/modules/OrderModule/view/SupplierOrder/AfterSalesOrder/AfterSalesOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('退换货处理订单'),
          },
        },
        {
          path: 'afterDetails',
          name: 'AfterDetails',
          component: () =>
            import('/@/modules/OrderModule/view/SupplierOrder/AfterSalesOrder/AfterDetails.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            hideTab: true,
            // 当前路由不再菜单显示  
            hideMenu: true,
            title: t('供应商退换货详情'),
          },
        },
      ],
    },
    //代理商订单
    {
      path: 'agentOrder',
      name: 'AgentOrder',
      component: getParentLayout('view'),
      meta: {
        title: '服务商订单',
      },
      redirect: '/OrderModule/view/AgentOrder/AgentSaleOrder/AgentSaleOrder.vue',
      children: [
        {
          path: 'agentSaleOrder',
          name: 'AgentSaleOrder',
          component: () =>
            import('/@/modules/OrderModule/view/AgentOrder/AgentSaleOrder/AgentSaleOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('修理厂订单'),
          },
        },
        {
          path: 'agentInvestmentOrder',
          name: 'AgentInvestmentOrder',
          component: () =>
            import(
              '/@/modules/OrderModule/view/AgentOrder/AgentInvestmentOrder/AgentInvestmentOrder.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('投资订单'),
          },
        },
        {
          path: 'agentInvestDetails',
          name: 'AgentInvestDetails',
          component: () =>
            import(
              '/@/modules/OrderModule/view/AgentOrder/AgentInvestmentOrder/AgentInvestDetails.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            hideTab: true,
            // 当前路由不再菜单显示
            hideMenu: true,
            title: t('代理商投资详情'),
          },
        },
        {
          path: 'agentAfterSalesOrder',
          name: 'AgentAfterSalesOrder',
          component: () =>
            import(
              '/@/modules/OrderModule/view/AgentOrder/AgentAfterSalesOrder/AgentAfterSalesOrder.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('退换货申请订单'),
          },
        },
        {
          path: 'agentHandleOrder',
          name: 'AgentHandleOrder',
          component: () =>
            import('/@/modules/OrderModule/view/AgentOrder/AgentHandleOrder/AgentHandleOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('退换货处理订单'),
          },
        },
      ],
    },
    //修理厂订单
    {
      path: 'repairShopOrder',
      name: 'RepairShopOrder',
      component: getParentLayout('view'),
      meta: {
        title: '修理厂订单',
      },
      redirect: '/OrderModule/view/RepairShopOrder/RepairShopOrder.vue',
      children: [
        {
          path: 'purchaseOrder',
          name: 'PurchaseOrder',
          component: () =>
            import('/@/modules/OrderModule/view/RepairShopOrder/PurchaseOrder/PurchaseOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('进货订单'),
          },
        },
        {
          path: 'purchaseDetails',
          name: 'PurchaseDetails',
          component: () =>
            import('/@/modules/OrderModule/view/RepairShopOrder/PurchaseOrder/PurchaseDetails.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            hideTab: true,
            // 当前路由不再菜单显示
            hideMenu: true,
            title: t('进货详情'),
          },
        },
        {
          path: 'shopOrder',
          name: 'ShopOrder',
          component: () =>
            import('/@/modules/OrderModule/view/RepairShopOrder/ReturnGoods/ReturnGoods.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('退换货申请订单'),
          },
        },
        {
          path: 'installOrder',
          name: 'InstallOrder',
          component: () =>
            import(
              '/@/modules/OrderModule/view/RepairShopOrder/InstallationOrder/InstallationOrder.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('安装订单'),
          },
        },
        {
          path: 'recoveryOrder',
          name: 'RecoveryOrder',
          component: () =>
            import('/@/modules/OrderModule/view/RepairShopOrder/RecoveryOrder/RecoveryOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('回收订单'),
          },
        },
        {
          path: 'afterSaleService',
          name: 'AfterSaleService',
          component: () =>
            import(
              '/@/modules/OrderModule/view/RepairShopOrder/AfterSaleService/AfterSaleService.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('售后服务订单'),
          },
        },
        {
          path: 'doorOrder',
          name: 'DoorOrder',
          component: () =>
            import('/@/modules/OrderModule/view/RepairShopOrder/DoorOrder/DoorOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('售后上门订单'),
          },
        },
        {
          path: 'serviceEvaluation',
          name: 'ServiceEvaluation',
          component: () =>
            import(
              '/@/modules/OrderModule/view/RepairShopOrder/ServiceEvaluation/ServiceEvaluation.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('售后服务评价'),
          },
        },
        {
          path: 'orderEvaluation',
          name: 'OrderEvaluation',
          component: () =>
            import(
              '/@/modules/OrderModule/view/RepairShopOrder/OrderEvaluation/OrderEvaluation.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('增值服务评价'),
          },
        },

        {
          path: 'evaluationDetails',
          name: 'EvaluationDetails',
          component: () =>
            import(
              '/@/modules/OrderModule/view/RepairShopOrder/OrderEvaluation/EvaluationDetails.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            hideTab: true,
            // 当前路由不再菜单显示
            hideMenu: true,
            ignoreKeepAlive: true,
            title: t('增值服务评价详情'),
          },
        },

        {
          path: 'afterServiceDetails',
          name: 'AfterServiceDetails',
          component: () =>
            import(
              '/@/modules/OrderModule/view/RepairShopOrder/AfterSaleService/AfterServiceDetails.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            hideTab: true,
            // 当前路由不再菜单显示
            hideMenu: true, 
            ignoreKeepAlive: true,
            title: t('售后服务订单详情'),
          },
        },
        {
          path: 'doorOrderDetails',
          name: 'DoorOrderDetails',
          component: () =>
            import('/@/modules/OrderModule/view/RepairShopOrder/DoorOrder/DoorOrderDetails.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            hideTab: true,
            // 当前路由不再菜单显示
            hideMenu: true,
            ignoreKeepAlive: true,
            title: t('上门订单详情'),
          },
        },
        {
          path: 'recoveryDetails',
          name: 'RecoveryDetails',
          component: () =>
            import('/@/modules/OrderModule/view/RepairShopOrder/RecoveryOrder/RecoveryDetails.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            hideTab: true,
            // 当前路由不再菜单显示
            hideMenu: true,
            ignoreKeepAlive: true,
            title: t('回收订单详情'),
          },
        },
        {
          path: 'installationDetails',
          name: 'InstallationDetails',
          component: () =>
            import(
              '/@/modules/OrderModule/view/RepairShopOrder/InstallationOrder/InstallationDetails.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            hideTab: true,
            // 当前路由不再菜单显示
            hideMenu: true,
            ignoreKeepAlive: true,
            title: t('安装订单详情'),
          },
        },
      ],
    },
    //旧机订单
    {
      path: 'oldSecondOrder',
      name: 'OldSecondOrder',
      component: getParentLayout('view'),
      meta: {
        title: '旧机订单',
      },
      redirect: '/OrderModule/view/OldMachineOrder/OldMachineOrder.vue',
      children: [...MachineRouter],
    },
    //违约订单
    {
      path: 'defaultOrder',
      name: 'DefaultOrder',
      component: getParentLayout('view'),
      meta: {
        title: '违约订单',
      },
      redirect: '/OrderModule/view/DefaultOrder/DefaultList/DefaultList.vue',
      children: [
        {
          path: 'defaultList',
          name: 'DefaultList',
          component: () =>
            import('/@/modules/OrderModule/view/DefaultOrder/DefaultList/DefaultList.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('违约订单'),
          },
        },
      ],
    },
    //订单设置
    {
      path: 'orderSettings',
      name: 'OrderSettings',
      component: getParentLayout('view'),
      meta: {
        title: '订单设置',
      },
      redirect: '/OrderModule/view/SetOrder/SetOrder.vue',
      children: [
        {
          path: 'setOrder',
          name: 'SetOrder',
          component: () =>
            import('/@/modules/OrderModule/view/OrderSettings/SetOrder/SetOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('订单设置'),
          },
        },
        {
          path: 'cancelOrder',
          name: 'CancelOrder',
          component: () =>
            import('/@/modules/OrderModule/view/OrderSettings/CancelOrder/CancelOrder.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('取消订单原因配置'),
          },
        },
        {
          path: 'installConfig',
          name: 'installConfig',
          component: () => import('/@/modules/OrderModule/view/InstallConfig/InstallConfig.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('安装佣金配置'),
          },
        },
        {
          path: 'recoveryConfig',
          name: 'recoveryConfig',
          component: () => import('/@/modules/OrderModule/view/RecoveryConfig/RecoveryConfig.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('回收佣金配置'),
          },
        },
        {
          path: 'afterSaleConfig',
          name: 'afterSaleConfig',
          component: () =>
            import('/@/modules/OrderModule/view/AfterSaleConfig/AfterSaleConfig.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('售后补偿配置'),
          },
        },
      ],
    },
  ],
}
export default order
