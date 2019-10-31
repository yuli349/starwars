import Vue from 'vue';

function getShips(url = 'https://swapi.co/api/starships/') {
  return Vue.http.get(url).then(response => response.data);
}

function getShipInfo(url) {
  return Vue.http.get(url).then((response) => {
    const ship = response.data;


    return ship;
  });
}

const starWarsService = {
  getShips,
  getShipInfo,
};

export default starWarsService;
