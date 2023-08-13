<template>
  <div class="my-hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyHamburger",
});
</script>

<style lang="scss" scoped>
.my-hamburger {
  position: relative;
  aspect-ratio: 1/1;
  width: 20px;
  transition: 0.3s all;
  pointer-events: all;
  cursor: grab;

  @media (min-width: 992px) {
    &:hover {
      opacity: 0.7;
    }
  }

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 2px;
    background-color: #323232;

    &:nth-child(1) {
      top: 20%;
      transform: translate(-50%, -50%);
    }
    &:nth-child(2) {
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &:nth-child(3) {
      top: auto;
      bottom: 20%;
      transform: translate(-50%, 50%);
    }
  }
}
</style>
