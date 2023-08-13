<template>
  <li class="setting-search-item" @click="selectCity">
    <p class="setting-search-item__name">{{ data.name }}</p>
    <div class="setting-search-item__icon">
      <img
        :src="`https://openweathermap.org/images/flags/${data.country.toLowerCase()}.png`"
        :alt="data.country"
      />
    </div>
    <span class="setting-search-item__coord"
      >{{ data.lat.toFixed(3) }},<br />
      {{ data.lon.toFixed(3) }}</span
    >
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import getTemp from "../mixins/getTemp";
import { ICity } from "../types/ICity";
import { Coord } from "../types/ICard";
export default defineComponent({
  name: "SettingSearchItem",
  props: {
    data: {
      type: Object as PropType<ICity>,
      required: true,
    },
  },
  emits: {
    selectedCity: (coord: Coord) => typeof coord === "object",
  },
  mixins: [getTemp],
  methods: {
    selectCity() {
      this.$emit("selectedCity", { lat: this.data.lat, lon: this.data.lon });
    },
  },
});
</script>

<style lang="scss" scoped>
.setting-search-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3px;
  padding: 8px 6px;
  background: #ffffff;
  transition: 0.3s all;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(50, 50, 50, 0.4);
  }

  @media (min-width: 992px) {
    &:hover {
      background: #ffdec3;
    }
  }

  &__name {
    min-width: 50%;
    max-width: 65%;
    font-size: 16px;
    text-align: left;
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 16px;
    width: 100%;
    margin-left: auto;
    margin-right: 6px;

    img {
      max-width: 16px;
      height: auto;
    }
  }

  &__coord {
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>
