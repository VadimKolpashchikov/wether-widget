<template>
  <div class="card">
    <h3 class="card__title">
      {{ currentData.name }}, {{ currentData.sys.country }}
    </h3>
    <p v-if="error" class="error-text">
      Error while updating data<br />
      {{ errorText }}
    </p>
    <div class="card__view-wrap">
      <WeatherIcon
        :icon="currentData.weather[0].icon"
        :iconAlt="currentData.weather[0].main"
      />
      <p class="card__info">{{ getTemp(currentData.main.temp) }}</p>
    </div>
    <p class="card__text">
      Feels like {{ getTemp(currentData.main.feels_like) }}.
      {{ getDescription(currentData.weather[0].description) }}
    </p>
    <CardList :listData="getListData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WeatherIcon from "./WeatherIcon.vue";
import CardList from "./CardList.vue";
import { getWetherByPosition } from "../api/api";
import getKm from "../mixins/getKm";
import getDescription from "../mixins/getDescription";
import getTemp from "../mixins/getTemp";
import { ICard } from "../types/ICard";
interface State {
  currentData: ICard;
  updateTimeout: number;
  error: boolean;
  errorText: string;
}

export default defineComponent({
  name: "CityCard",
  components: {
    WeatherIcon,
    CardList,
  },
  props: {
    cardData: {
      type: Object as PropType<ICard>,
      required: true,
    },
    cardIndex: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  emits: {
    updateData: (city: ICard) => typeof city === "object",
  },
  data(): State {
    return {
      currentData: { ...this.cardData },
      updateTimeout: 0,
      error: false,
      errorText: "",
    };
  },
  computed: {
    getListData() {
      return {
        list: [
          this.currentData.wind.speed + "m/s",
          this.currentData.main.pressure + "hPa",
          "Humidity: " + this.currentData.main.humidity + "%",
          "Ground: " + this.getKm(this.currentData.main.grnd_level),
          "Sea: " + this.getKm(this.currentData.main.sea_level),
          "Visibility: " + this.getKm(this.currentData.visibility),
        ],
        windDeg: this.currentData.wind.deg,
      };
    },
  },
  mixins: [getKm, getDescription, getTemp],
  methods: {
    updateData() {
      this.updateTimeout = setTimeout(async () => {
        const updateData = await getWetherByPosition(this.cardData.coord);
        if ("error" in updateData) {
          this.error = true;
          this.errorText = updateData.error.errorText;
        } else {
          this.error = false;
          this.currentData = updateData;
          if (this.cardIndex === 0) {
            this.$emit("updateData", updateData);
          }
        }
        this.updateData();
      }, 300000);
    },
  },
  mounted() {
    if (this.currentData.localError) this.error = true;
    this.updateData();
    if (this.cardIndex === 0) {
      this.$emit("updateData", this.currentData);
    }
  },
  watch: {
    cardData: {
      handler(newCardData: ICard) {
        this.currentData = newCardData;
      },
      deep: true,
    },
    cardIndex(newIndex: number) {
      if (newIndex === 0) {
        this.$emit("updateData", this.currentData);
      }
    },
  },
  unmounted() {
    clearTimeout(this.updateTimeout);
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 14px;
  width: 100%;

  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid #bbbbbb;
  }

  &__title {
    font-size: 24px;
    text-align: left;
  }

  &__view-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }

  .card__info {
    font-size: 46px;
    font-weight: 700;
  }

  &__text {
    font-size: 16px;
    font-weight: 400;
    text-align: left;
  }

  .error-text {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    color: crimson;
  }
}
</style>
