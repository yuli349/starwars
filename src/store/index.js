import Vue from 'vue';
import Vuex from 'vuex';

import starWars from './starwars.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    starWars,
  },
});
