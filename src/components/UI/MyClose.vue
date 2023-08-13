<template>
  <div class="my-close">
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyClose",
});
</script>

<style lang="scss" scoped>
.my-close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  transition: 0.3s all;
  cursor: pointer;

  @media (min-width: 992px) {
    &:hover {
      opacity: 0.7;
    }
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 2px;
    width: 100%;
    background-color: #323232;

    &:nth-child(1) {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:nth-child(2) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>
