import starWarsService from '@/services/starwars.service';
import { getLastViewedShips, addLastViewedShip } from '@/services/last.viewed.ships.service';


const initialState = {
  shipsList: [],
  shipInfo: [],
  lastViewedShips: getLastViewedShips(),
  loading: true, // индикатор загрузки
  count: null,
  previous: null,
  next: null,
  openShip: false,
};

const actions = {
  async getShips({ commit, state }, direction = null) {
    commit('startLoading');
    let data;
    if (direction !== null && state[direction] !== null) {
      data = await starWarsService.getShips(state[direction]);
    } else {
      data = await starWarsService.getShips();
    }
    commit('setResults', data);
    commit('endLoading');
  },
  async getShipInfo({ commit }, url) {
    const ship = await starWarsService.getShipInfo(url);
    commit('setShipInfo', ship);
    commit('showShip');
    commit('updateLastViewedShips', ship);
  },
};

const mutations = {
  setResults(state, data) {
    state.shipsList = data.results;
    state.count = data.count;
    state.previous = data.previous;
    state.next = data.next;
  },
  setShipInfo(state, data) {
    state.shipInfo = data;
  },
  showShip(state) {
    state.showShip = true;
    state.openShip = true;
  },
  updateLastViewedShips(state, ship) {
    addLastViewedShip(ship);
    state.lastViewedShips = getLastViewedShips();
  },
  closeShip(state) {
    state.showShip = false;
    state.openShip = false;
  },
  startLoading(state) {
    state.loading = true;
  },
  endLoading(state) {
    state.loading = false;
  },
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
};
