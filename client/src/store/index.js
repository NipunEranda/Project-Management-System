import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist';

import { alert } from './modules/alert.module';
import { account } from './modules/account.module';
import { users } from './modules/users.module';

const vuexPersist = new VuexPersist({
  key: 'pms-app',
  storage: window.localStorage
});

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
  },
  plugins: [vuexPersist.plugin]
})
