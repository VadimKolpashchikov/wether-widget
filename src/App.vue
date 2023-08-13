<template>
  <MainContainer> </MainContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainContainer from "./components/MainContainer.vue";
export default defineComponent({
  components: {
    MainContainer,
  },
});
</script>

<style lang="scss">
.weather-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: fit-content;
  max-width: calc(100% - 40px);
  color: #323232;
  font-family: sans-serif;
  word-break: break-word;

  * {
    box-sizing: border-box;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  button {
    background: none;
    outline: none;
    border: none;
    width: auto;
    padding: 0;
    cursor: pointer;
  }
}
</style>
