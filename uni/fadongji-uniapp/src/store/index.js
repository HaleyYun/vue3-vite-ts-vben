import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import theme from './modules/theme'
import role from './modules/role'
import im from './modules/im'
import mapDrag from './modules/mapDrag'
import search from './modules/search'
import serviceNotification from './modules/serviceNotification'
Vue.use(Vuex)

// Store里面的状态与单纯的全局变量是不一样的，无法直接改变Store中的状态。想要改变Store中的状态，只有一个办法，显式地提交mutation
export default new Vuex.Store({
    modules: {
        user,
        theme,
        role,
        im,
        mapDrag,
        search,
        serviceNotification,
    },
})
