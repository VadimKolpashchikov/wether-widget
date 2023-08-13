<template>
  <ul class="cards-list">
    <template v-if="defaultCityData.length && !cityData.length">
      <CityCard
        v-for="(card, i) in defaultCityData"
        :key="`${i}${card.id}`"
        :cardData="card"
        :card-index="i"
        @updateData="updateData"
      />
    </template>

    <CityCard
      v-for="(card, i) in cityData"
      :key="`${i}${card.id}`"
      :cardData="card"
      :card-index="i"
      @updateData="updateData"
    />
  </ul>
  <MiniInfo :cityData="firstElement" :show="show" :error="error" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CityCard from "./CityCard.vue";
import MiniInfo from "./MiniInfo.vue";
import { ICard } from "../types/ICard";

interface State {
  firstElement: ICard;
}

export default defineComponent({
  name: "CityList",
  components: {
    CityCard,
    MiniInfo,
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
      type: Object as PropType<ICard[]>,
      required: true,
    },
    defaultCityData: {
      type: Object as PropType<ICard[]>,
      required: true,
    },
  },
  emits: {
    updateData: (city: ICard) => typeof city === "object",
  },
  data(): State {
    return {
      firstElement: this.cityData[0] || this.defaultCityData[0],
    };
  },
  methods: {
    updateData(event: ICard) {
      this.firstElement = event;
    },
  },
});
</script>

<style lang="scss" scoped>
.cards-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-height: calc(80vh - 20px - 48px);
  padding: 0 10px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #6b6b6b;
    border-radius: 10px;
    box-shadow: inset 1px 1px 10px rgb(107, 107, 107);
    cursor: pointer;
  }
}
</style>
