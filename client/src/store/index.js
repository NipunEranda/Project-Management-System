import { createStore } from 'vuex'

import { alert } from './modules/alert.module';
import { account } from './modules/account.module';
import { users } from './modules/users.module';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alert,
    account,
    users
  }
})
