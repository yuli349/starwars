<template>
  <div>
    <div class="mask"></div>
    <div class="ship-block">
      <div class="info-block">
        <b-button class="btn-close"
          @click.prevent="closeShip()">
        </b-button>
        <div>Name: {{ this.starWars.shipInfo.name }}</div>
        <div>Model: {{ this.starWars.shipInfo.model }}</div>
        <div>Manufacturer: {{ this.starWars.shipInfo.manufacturer }}</div>
        <div>Cost in credits: {{ this.starWars.shipInfo.cost_in_credits }}</div>
        <div>Length: {{ this.starWars.shipInfo.length }}</div>
        <div>Max atmosphering speed: {{ this.starWars.shipInfo.max_atmosphering_speed }}</div>
        <div>Crew: {{ this.starWars.shipInfo.crew }}</div>
        <div>Passengers: {{ this.starWars.shipInfo.passengers }}</div>
        <div>Cargo capacity: {{ this.starWars.shipInfo.cargo_capacity }}</div>
        <div>Consumables: {{ this.starWars.shipInfo.consumables }}</div>
        <div>Hyperdrive rating: {{ this.starWars.shipInfo.hyperdrive_rating }}</div>
        <div>MGLT: {{ this.starWars.shipInfo.MGLT }}</div>
        <div>Starship class: {{ this.starWars.shipInfo.starship_class }}</div>
        <div>Created: {{ this.starWars.shipInfo.created }}</div>
        <div>Edited: {{ this.starWars.shipInfo.edited }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      starWars: state => state.starWars,
    }),
  },
  methods: {
    ...mapMutations('starWars', ['closeShip']),
  },
};
</script>
<style lang="scss">
  .mask {
    background: rgba(0, 0, 0, 0.71);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .btn-close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 32px;
    height: 32px;
    opacity: 0.6;
    background: transparent;
    border: none;

    &:before, &:after {
      position: absolute;
      left: 15px;
      top: 0;
      content: ' ';
      height: 33px;
      width: 2px;
      background-color: #ffeb3b;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
  .ship-block {
    position: absolute;
    height: 400px;
    width: 700px;
    top: 50%;
    background: #131010;
    left: 50%;
    border-radius: 10px;
    margin: -200px 0 0 -350px;
    z-index: 3;
    box-shadow: 0px 0px 20px #ffeb3b;
    .info-block {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 10px 40px 10px 10px;
      color: #fff;
    }
  }
</style>
