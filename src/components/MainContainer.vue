<template>
  <div
    class="main-container"
    :class="openClass"
    @click="openWidget"
    v-click-outside="closeWidget"
  >
    <Setting
      @addNewCity="addNewCity"
      @changeList="changeList"
      :cityData="favoritCity"
    />
    <h4
      class="error-text"
      v-if="error && !favoritCity.length && !defaultCity.length"
    >
      Error: {{ errorText }}
    </h4>
    <CityList
      :cityData="favoritCity"
      :defaultCityData="defaultCity"
      :show="open"
      :error="error"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import vClickOutside from "click-outside-vue3";
import CityList from "./CityList.vue";
import Setting from "./Setting.vue";
import { getWetherByPosition } from "../api/api";
import { Coord } from "../types/ICard";
import { ICard } from "../types/ICard";
interface State {
  open: boolean;
  favoritCity: ICard[];
  defaultGeoPosition: Coord;
  geoPositionId: number;
  defaultCity: ICard[];
  error: boolean;
  errorText: string;
}

export default defineComponent({
  name: "MainContainer",
  components: {
    CityList,
    Setting,
  },
  data(): State {
    return {
      open: false,
      favoritCity: [],
      defaultGeoPosition: { lat: NaN, lon: NaN },
      geoPositionId: NaN,
      defaultCity: [],
      error: false,
      errorText: "",
    };
  },
  computed: {
    openClass() {
      return {
        "main-container_open": this.open,
      };
    },
  },
  methods: {
    openWidget() {
      this.open = true;
    },
    closeWidget() {
      this.open = false;
    },
    addNewCity(e: ICard) {
      if (typeof e === "object") this.favoritCity.push(e);
      localStorage.setItem(
        "weatherWidgetData",
        JSON.stringify(this.favoritCity)
      );
      navigator.geolocation.clearWatch(this.geoPositionId);
    },
    changeList(e: ICard[] | []) {
      this.favoritCity = e;
      this.addToLocalStorage(e);
    },
    addToLocalStorage(e: ICard[] | []) {
      if (e.length) {
        localStorage.setItem("weatherWidgetData", JSON.stringify(e));
        navigator.geolocation.clearWatch(this.geoPositionId);
      } else {
        localStorage.removeItem("weatherWidgetData");
        this.geoFindMe();
      }
    },
    geoFindMe() {
      const success = (position: {
        coords: { latitude: number; longitude: number };
      }) => {
        this.defaultGeoPosition = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
      };
      const error = () => {
        this.error = true;
        this.errorText = "Unable to get your location";
        return NaN;
      };

      if (!navigator.geolocation) {
        this.error = true;
        this.errorText = "Geolocation is not supported by your browser";
      } else {
        this.geoPositionId = navigator.geolocation.watchPosition(
          success,
          error
        );
      }
    },
  },
  watch: {
    async defaultGeoPosition(newPos, oldPos) {
      if (
        !this.favoritCity.length &&
        (newPos.lat != oldPos.lat || newPos.lon != oldPos.lon)
      ) {
        const defaultCity = await getWetherByPosition(newPos);
        if ("error" in defaultCity) {
          this.defaultCity = [];
          this.error = true;
          this.errorText = defaultCity.error.errorText;
        } else {
          this.defaultCity = [defaultCity];
        }
      }
    },
  },
  mounted() {
    if (!localStorage.getItem("weatherWidgetData")) {
      this.geoFindMe();
    } else {
      const localDataString = localStorage.getItem("weatherWidgetData");
      const localData: ICard[] = localDataString
        ? JSON.parse(localDataString)
        : [];
      localData.forEach(async (el) => {
        const reloadedData = await getWetherByPosition(el.coord);
        if ("error" in reloadedData) {
          el.localError = true;
          this.favoritCity.push(el);
        } else {
          this.favoritCity.push(reloadedData);
        }
      });
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
});
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100px;
  min-width: 100px;
  min-height: 100px;
  padding: 24px 10px;
  max-width: 360px;
  border-radius: 50px;
  background: #fafafa;
  text-align: center;
  transition: width 0.4s ease-in-out 0.6s, min-width 0.4s ease-in-out 0.6s,
    max-height 0.4s ease-in-out 0.2s, min-height 0.4s ease-in-out 0.2s,
    border-radius 0.4s 0.1s, opacity 0.4s;
  box-shadow: 3px 2px 8px rgba(0, 0, 0, 0.45);
  &:not(.main-container_open) {
    cursor: pointer;
    max-height: 100px;
    @media (min-width: 992px) {
      &:hover {
        opacity: 0.7;
      }
    }
  }

  &_open {
    border-radius: 10px;
    width: 100%;
    height: auto;
    min-height: 360px;
    min-width: 280px;
    max-height: calc(80vh - 20px);
    transition: width 0.4s ease-in-out 0.2s, min-width 0.4s ease-in-out 0.2s,
      max-height 0.4s ease-in-out 0.6s, min-height 0.4s ease-in-out 0.6s,
      border-radius 0.4s 0.1s;
  }

  .error-text {
    margin: 30px 0;
    font-size: 20px;
    font-weight: 400;
    color: crimson;
  }
}
</style>
