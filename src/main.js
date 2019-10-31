import Vue from 'vue';
import VueResource from 'vue-resource';
import App from '@/App';
import router from '@/router/index';
import store from '@/store/index';
import BootstrapVue from 'bootstrap-vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueResource);
Vue.use(BootstrapVue);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
