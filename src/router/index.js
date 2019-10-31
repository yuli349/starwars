import Vue from 'vue';
import Router from 'vue-router';
import ShipsList from '@/components/ShipsList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShipsList',
      component: ShipsList,
    },
  ],
});
