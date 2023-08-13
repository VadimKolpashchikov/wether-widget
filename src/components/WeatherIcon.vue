<template>
  <div class="img-wrap">
    <img :src="`http://openweathermap.org/img/w/${icon}.png`" :alt="iconAlt" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "WeatherIcon",
  props: {
    icon: {
      type: String as PropType<string>,
      required: true,
    },
    iconAlt: {
      type: String as PropType<string>,
      default: "#",
    },
  },
});
</script>

<style lang="scss" scoped>
.img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80px;
  width: 100%;
  aspect-ratio: 1/1;
  height: auto;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
