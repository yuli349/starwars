<template>
  <div>
    <div class="loading" v-if="starWars.loading">
      <img src="../assets/lg.rotating-balls-spinner.gif" alt="">
    </div>
    <div v-else>
      <div class="wrapper" v-if="starWars.shipsList.length > 0">
        <input class="search" type="search" placeholder="Search" v-model="filter"/>
        <main>
          <ship v-if="starWars.openShip"></ship>
          <b-table striped hover
                   class="all_ships"
                   :items="items"
                   :fields="fields"
                   @row-clicked="showShipDetails"
          ></b-table>
          <div class="btn-block">
            <b-button
              @click.prevent="getShips('previous')"
              v-if="starWars.previous !== null" class="btn" variant="outline-primary">
              <i class="prev"></i>
            </b-button>
            <b-button
              @click.prevent="getShips('next')"
              v-if="starWars.next !== null" class="btn" variant="outline-primary">
              <i class="next"></i>
            </b-button>
          </div>
        </main>
        <div class="last_ships">Last ships: <br>
          <div :key="index" v-for="(ship, index) in starWars.lastViewedShips">
            {{ ship.name }}, {{ ship.dateTime }}
          </div>
        </div>
      </div>
      <div class="empty" v-else>
        Извините, кораблей не найдено
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Ship from './Ship';

export default {
  components: {
    Ship,
  },
  data() {
    return {
      filter: null,
    };
  },
  mounted() {
    this.getShips();
  },
  computed: {
    ...mapState({
      starWars: state => state.starWars,
    }),
    fields() {
      return [
        {
          key: 'created',
          sortable: true,
        },
        {
          key: 'name',
          sortable: false,
        },
        {
          key: 'starShipClass',
          sortable: true,
        },
        {
          key: 'cargoCapacity',
          sortable: true,
        },
        {
          key: 'costInCredits',
          sortable: true,
        },
      ];
    },
    items() {
      let ships = this.starWars.shipsList.map(item => ({
        created: item.created,
        name: item.name,
        starShipClass: item.starship_class,
        cargoCapacity: item.cargo_capacity,
        costInCredits: item.cost_in_credits,
        url: item.url,
      }));

      if (this.filter !== null) {
        ships = ships.filter((ship) => {
          const { url, ...starShip } = ship;
          const values = Object.values(starShip);
          for (let i = 0; i < values.length; i += 1) {
            if (values[i].toLowerCase().includes(this.filter.toLowerCase())) {
              return true;
            }
          }
          return false;
        });
      }
      return ships;
    },
  },
  methods: {
    ...mapActions('starWars', ['getShips', 'getShipInfo']),
    ...mapMutations('starWars', ['showShip', 'closeShip']),
    showShipDetails(ship) {
      this.getShipInfo(ship.url);
    },
  },
};
</script>
<style lang="scss">
  .empty {
    position: absolute;
    text-align: center;
    color: #00b0ff;
    width: 300px;
    font-size: 20px;
    padding: 10px;
    font-family: sans-serif;
    top: 50%;
    left: 50%;
    margin-left: -160px;
    margin-top: -33px;
  }
  .wrapper {
    display: grid;
    grid-template-rows: 70px 1fr 100px;
    grid-template-columns: 1fr;
    grid-gap: 1em;
    height: 100vh;
    grid-template-areas:
      'search'
      'main'
      'last_ships';
  }
  .search {
    grid-area: search;
  }
  .last_ships {
    grid-area: last_ships;
    text-align: center;
    font-size: 20px;
    color: #fff;
  }
  main {
    grid-area: main;
  }

  .loading {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    & img {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -128px;
      margin-left: -128px;
    }
  }
  .search {
    width: 300px;
    background: #000;
    color: #fff;
    border: 4px solid #f0d906;
    padding: 4px;
    display: block;
    margin: 15px auto 0;
    font-size: 20px;
    outline: none;
  }

  input.search[type="search"]::-webkit-input-placeholder { color: #ffeb3b78; }
  input.search[type="search"]:-ms-input-placeholder { color: #ffeb3b78; }
  input.search[type="search"]::-ms-input-placeholder { color: #ffeb3b78; }
  input.search[type="search"]::placeholder { color: #ffeb3b78; }

  .all_ships {
    width: 1100px;
    color: #fff;
    border: 4px solid #f0d906;
    border-radius: 10px;
    margin: 0px auto;
    background: #000a;
    min-height: 548px;
    thead tr {
      background: #f0d90661;
    }
    & tr {
      cursor: pointer;
    }
    .table-striped tbody tr:nth-of-type(odd) {
      background-color: transparent;
    }
    tbody tr:hover {
      color: #f0d906;
      background-color: rgba(255, 235, 59, 0.28);
    }
  }
  .btn-block {
    display: block;
    width: 140px;
    margin: 15px auto;
    text-align: center;

    & .btn {
      background: #000;
      color: #f0d906;
      border: 4px solid #f0d906;
      margin: auto;
      display: inline-block;
      text-align: center;
      &:hover {
        background: #f0d906;
        color: #000;
        & i {
          border: solid #000;
          border-width: 0 3px 3px 0;
        }
      }
      & i {
        border: solid #f0d906;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 5px;
        position: relative;
      }
      & .next {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        left: -3px;
      }
      & .prev {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        left: 3px;
      }
    }
  }

  .last_ships > div {
    display: inline-block;
    padding: 3px;
    border: 2px solid #ffeb3b78;
    margin: 3px;
  }
</style>
