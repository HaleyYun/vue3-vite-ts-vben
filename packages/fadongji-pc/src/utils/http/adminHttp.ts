// @ts-ignore
import { AdminHttp as AdminHttpService } from '../../../../shared/src/ajax'
// import { AdminHttp as AdminHttpService } from '@vocen/shared'
import { defHttp } from '/@/utils/http/index'

const AdminHttp = new AdminHttpService({
  device: 'PC',
  requestInstance: defHttp,
})

export default AdminHttp
