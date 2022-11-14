<template>
  <main>
    <div class="background-container">
      <h1 class="header">IP Address Tracker</h1>
    
      <form class="input-container" @submit="searchIpDomain">
        <input type="text" v-model="ipInput" placeholder="Search for any IP address or domains" />
        <button type="submit">
          <img src="./assets/icon-arrow.svg" alt="Search">
        </button>
      </form>
      <section class="list-container">
        <ul class="list">
          <li class="list__item">
            <span class="list__item__header">IP Address</span>
            <span class="list__item__content">{{ ip }}</span>
          </li>
          <li class="list__item">
            <span class="list__item__header">Location</span>
            <span class="list__item__content">{{ location }}</span>
          </li>
          <li class="list__item">
            <span class="list__item__header">Timezone</span>
            <span class="list__item__content">{{ timezone }}</span>
          </li>
          <li class="list__item">
            <span class="list__item__header">ISP</span>
            <span class="list__item__content">{{ isp }}</span>
          </li>
        </ul>
      </section>
    </div>

    <l-map
      v-if="coordinates.length"
      ref="map"
      v-model:zoom="zoom"
      :options="{ zoomControl: false }"
      :center="coordinates"
    >
      <l-tile-layer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        attribution="<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        :max-zoom="18"
      />
      <l-marker :lat-lng="coordinates" />
    </l-map>
  </main>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";
import getLocation from './services/getLocation';

export default {
  name: 'App',

  components: {
    LMap,
    LMarker,
    LTileLayer,
  },

  data() {
    return {
      ipInput: '',
      zoom: 15,
      coordinates: [],
      ip: '',
      location: '',
      timezone: '',
      isp: '',
    };
  },

  methods: {
    isIp(text) {
      const ipRegex = /^(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
      return ipRegex.test(text);
    },
    async searchIpDomain(event) {
      event.preventDefault();

      if (this.isIp(this.ipInput))
        this.updateInfo(await getLocation({ ipAddress: this.ipInput }));
      else
        this.updateInfo(await getLocation({ domain: this.ipInput }));
    },
    updateInfo({ ip, location, isp }) {
      this.ip = ip;
      this.coordinates = [location.lat, location.lng];
      this.location = `${location.city}, ${location.region}`;
      this.timezone = `UTC ${location.timezone}`;
      this.isp = isp;
    },
  },

  async mounted() {
    this.updateInfo(await getLocation());
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: none;
}

body {
  font-family: 'Rubik', sans-serif;
  font-size: 18px;
}
</style>

<style lang="scss" scoped>
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.background-container {
  background-image: url('./assets/pattern-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.header {
  text-align: center;
  padding-top: 24px;
  padding-bottom: 24px;
  font-weight: 500;
  color: #fff;
  font-size: 26px;
}

.input-container {
  margin: 0 auto 20px auto;
  width: 86%;
  max-width: 480px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;

  input {
    margin: 0 auto;
    padding: 18px 0 18px 18px;
    flex-grow: 1;
    color: #2b2b2b;
    font-size: inherit;
    font-weight: 400;

    &::placeholder {
      font-size: 14px;
      color: #969696;
    }
  }

  button {
    width: 18%;
    background-color: #000;
    color: #fff;
    max-width: 60px;
  }
}

.list-container {
  position: relative;
  height: 150px;
  /* only mobile */
  pointer-events: none;
}

.list {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  list-style: none;
  background-color: #fff;
  width: 86%;
  margin: 0 auto;
  border-radius: 16px;
  padding-top: 24px;
  padding-bottom: 24px;
  
  &__item {
    text-align: center;
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
    
    &__header {
      text-transform: uppercase;
      color: #969696;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    &__content {
      color: #2b2b2b;
      padding-top: 12px;
      font-weight: 500;
    }

    &:last-child {
      padding: 0;
    }
  }

}

@media screen and (min-width: 768px) {
  .input-container {
    margin-bottom: 48px;

    input::placeholder {
      font-size: 16px;
    }
  }

  .list-container {
    height: 64px;
    pointer-events: auto;
  }

  .list {
    display: flex;
    justify-content: space-between;
    max-width: 1100px;

    &__item {
      padding-left: 32px;
      padding-bottom: 0;
      text-align: start;
      flex-grow: 1;

      &__header {
        display: block;
        font-size: 12px;
      }

      &__content {
        display: block;
        font-size: 26px;
        border-right: 1px solid #9696967c;
        padding-bottom: 24px;
      }

      &:last-child {
        padding-left: 32px;
      }

      &:last-child > &__content {
        border: none;
      }
    }
  }
}
</style>
