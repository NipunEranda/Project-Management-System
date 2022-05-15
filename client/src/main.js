import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const app = createApp(App);
app.use(store)
.use(router)
.component('app-header', Header)
.component('app-footer', Footer)
.mount('#app')
