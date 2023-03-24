import { DescItem } from '/@/components/Description/index';


export const DescItemData: DescItem[] = [
  {
    field: 'parenBankName',
    label: '对公账户银行',
    labelMinWidth:100
  },
  {
    field: 'accountNo',
    label: '账号',
    labelMinWidth:100
  },
  {
    field: 'bankcardNum',
    label: '法人银行卡',
    labelMinWidth:100
  },
  {
    field: 'accountInfo',
    label: '对公账户信息',
    labelMinWidth:100,
  },
  // {
  //   field: 'paymentAccount',
  //   label: '账期额度',
  //   labelMinWidth:120
  // },
  {
    field: 'paidSecurityDeposit',
    label: '实缴保证金',
    labelMinWidth:120
  },


]

export const accountColumns = [
  {
    title: '持卡人',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: '绑定手机号',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: '开户银行',
    dataIndex: 'branchBankName',
    width: '25%',
  },
  {
    title: '银行账号',
    dataIndex: 'bankCardNo',
    width: '35%',
  }
];


