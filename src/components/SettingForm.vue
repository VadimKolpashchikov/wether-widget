<template>
  <form class="setting-form" @submit.prevent="submitForm">
    <div class="setting-form__search-container" v-click-outside="closeCollapse">
      <input placeholder="City..." type="text" v-model="desired" />
      <transition>
        <ul class="setting-form__choices-list" v-show="open && !desired">
          <li v-show="error" class="error-text">{{ errorText }}</li>
          <SettingSearchItem
            v-for="el in lastResult"
            :data="el"
            @selectedCity="findCity"
            :key="`${el.name + el.lat + el.lon}`"
          />
          <div v-show="loading && !error" class="loader-wrap">
            <MyLoader />
          </div>
        </ul>
      </transition>
    </div>
    <button type="submit" class="setting-form__btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="32.000000pt"
        height="32.000000pt"
        viewBox="0 0 32.000000 32.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
          fill="#323232"
          stroke="none"
        >
          <path
            d="M300 281 c0 -18 -53 -72 -89 -91 -20 -10 -53 -21 -73 -25 -34 -6 -37 -5 -40 20 -3 26 -3 26 -51 -22 l-47 -49 50 -49 50 -49 0 31 c0 27 4 31 36 36 56 9 122 46 151 83 27 37 45 124 24 124 -6 0 -11 -4 -11 -9z m1 -64 c-6 -18 -24 -46 -40 -61 -29 -28 -116 -66 -151 -66 -14 0 -20 -7 -20 -22 0 -21 -3 -19 -37 15 l-38 37 38 37 c35 36 37 36 37 14 0 -22 2 -23 47 -17 55 7 126 47 149 82 22 33 29 24 15 -19z"
          />
        </g>
      </svg>
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SettingSearchItem from "./SettingSearchItem.vue";
import vClickOutside from "click-outside-vue3";
import MyLoader from "./UI/MyLoader.vue";
import { getWetherByPosition, getPositionByCity } from "../api/api";
import { ICity } from "../types/ICity";
import { Coord } from "@/types/ICard";
import { ICard } from "@/types/ICard";

interface State {
  desired: string;
  open: boolean;
  lastResult: ICity[];
  error: boolean;
  errorText: string;
  loading: boolean;
}

export default defineComponent({
  name: "SettingForm",
  components: {
    SettingSearchItem,
    MyLoader,
  },
  emits: {
    addNewCity: (city: ICard) => typeof city === "object",
  },
  data(): State {
    return {
      desired: "",
      open: false,
      lastResult: [],
      error: false,
      errorText: "",
      loading: false,
    };
  },
  methods: {
    openCollapse() {
      this.open = true;
    },
    closeCollapse() {
      if (this.open) {
        this.open = false;
      }
    },
    async submitForm() {
      this.loading = false;
      const result = await getPositionByCity(this.desired);
      if ("error" in result) {
        this.lastResult = [];
        this.errorText = result.error.errorText;
        this.error = true;
        this.open = true;
        this.desired = "";
      } else {
        this.errorText = "";
        this.error = false;
        this.desired = "";
        this.lastResult = result;
        this.open = true;
      }
    },
    async findCity(e: Coord) {
      this.lastResult = [];
      this.loading = true;
      const result = await getWetherByPosition(e);
      if ("error" in result) {
        this.error = true;
        this.errorText = result.error.errorText;
      } else {
        this.$emit("addNewCity", result);
      }
      this.open = false;
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
});
</script>

<style lang="scss" scoped>
.setting-form {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;

  &__search-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  input {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 38px;
    padding: 3px 8px;
    outline: none;
    border: none;
    font-size: 18px;
    border-radius: 3px;
    border: 1px solid #323232;
  }

  &__choices-list {
    position: absolute;
    bottom: calc(100% - 3px);
    left: 0;
    width: 100%;
    max-height: 230px;
    overflow-y: auto;
    background: #ffffff;
    border-radius: 3px 3px 0 0;
    border: 1px solid #323232;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.45);

    &::-webkit-scrollbar {
      width: 3px;
      height: 2px;
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

    &::-webkit-scrollbar-thumb:hover {
      background-color: #444444;
    }
  }

  .error-text {
    padding: 10px 5px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: crimson;
  }

  .loader-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    max-width: 25px;
    @media (min-width: 992px) {
      &:hover {
        opacity: 0.7;
      }
    }
    svg {
      max-width: 100%;
      height: auto;
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease-in;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
