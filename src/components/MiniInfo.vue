<template>
  <div class="mini-info" :class="hideClass">
    <MyLoader v-if="getLoaderStatus && !error" />
    <h4 class="error-text" v-else-if="error && !cityData">Error</h4>
    <template v-else-if="typeof cityData === 'object'">
      <WeatherIcon
        :icon="cityData.weather[0].icon"
        :iconAlt="cityData.weather[0].main"
      />
      <p class="mini-info__text">{{ getTemp(cityData.main.temp) }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WeatherIcon from "./WeatherIcon.vue";
import MyLoader from "./UI/MyLoader.vue";
import getTemp from "../mixins/getTemp";
import { ICard } from "../types/ICard";
export default defineComponent({
  name: "MiniInfo",
  components: {
    WeatherIcon,
    MyLoader,
  },
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    error: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    cityData: {
      type: Object as PropType<ICard>,
    },
  },
  mixins: [getTemp],
  computed: {
    hideClass() {
      return {
        "mini-info_hide": this.show,
      };
    },
    getLoaderStatus() {
      if (this.cityData) {
        return false;
      } else {
        return true;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.mini-info {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100px;
  width: 100%;
  height: 100%;
  max-height: 100px;
  padding: 20px;
  background: #fafafa;
  border-radius: 50px;
  transition: opacity 0.4s, max-width 0.4s ease-in-out 0.6s,
    max-height 0.4s ease-in-out 0.6s, border-radius 0.4s 0.1s;

  &_hide {
    bottom: 0;
    right: 0;
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.7s ease-in-out 0.6s, max-width 0.4s ease-in-out 0.1s,
      border-radius 0.4s;
  }

  &__text {
    font-size: 16px;
    font-weight: 600;
  }

  .error-text {
    font-size: 16px;
    font-weight: 600;
    color: crimson;
  }
}
</style>
