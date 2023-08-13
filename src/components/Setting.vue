<template>
  <div class="setting" v-click-outside="closeSetting">
    <div class="setting__icon" @click="openSetting">
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
          fill="#000000"
          stroke="none"
        >
          <path
            d="M122 295 c-10 -22 -15 -24 -33 -14 -18 9 -25 8 -41 -9 -16 -16 -18 -23 -9 -40 10 -18 8 -24 -14 -38 -33 -22 -33 -57 0 -72 22 -10 24 -15 14 -33 -9 -18 -8 -25 9 -41 16 -17 23 -18 41 -9 18 10 23 8 33 -14 8 -18 19 -25 40 -25 16 0 28 5 28 13 0 24 21 37 43 26 28 -16 64 20 48 48 -11 22 2 43 26 43 8 0 13 12 13 28 0 21 -7 32 -25 40 -22 10 -24 15 -14 33 9 18 8 25 -9 41 -16 16 -23 18 -40 9 -18 -10 -24 -8 -38 14 -22 33 -57 33 -72 0z m58 -10 c0 -22 38 -39 56 -24 21 17 42 -4 25 -25 -15 -18 2 -56 24 -56 8 0 15 -9 15 -20 0 -11 -7 -20 -15 -20 -22 0 -39 -38 -24 -56 17 -21 -4 -42 -25 -25 -18 15 -56 -2 -56 -24 0 -8 -9 -15 -20 -15 -11 0 -20 7 -20 15 0 21 -31 35 -53 23 -26 -13 -45 5 -28 26 15 18 -2 56 -24 56 -8 0 -15 9 -15 20 0 11 7 20 15 20 21 0 35 32 23 54 -14 25 5 44 26 27 18 -15 56 2 56 24 0 8 9 15 20 15 11 0 20 -7 20 -15z"
          />
          <path
            d="M115 205 c-14 -13 -25 -33 -25 -45 0 -27 43 -70 70 -70 27 0 70 43 70 70 0 27 -43 70 -70 70 -11 0 -32 -11 -45 -25z m79 -11 c31 -30 9 -84 -34 -84 -24 0 -50 26 -50 50 0 24 26 50 50 50 10 0 26 -7 34 -16z"
          />
        </g>
      </svg>
    </div>
    <Transition name="fade">
      <div class="setting__box" v-show="settingOpen" ref="settingBox">
        <MyClose class="setting__close" @click="closeSetting" />
        <h4 class="setting__title">Settings</h4>
        <SettingList
          class="setting__list"
          :listData="cityData"
          @changeList="changeList"
        />
        <h4 class="setting__title setting__title_form">Add Location:</h4>
        <SettingForm @addNewCity="addNewCity" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import vClickOutside from "click-outside-vue3";
import MyClose from "./UI/MyClose.vue";
import SettingForm from "./SettingForm.vue";
import SettingList from "./SettingList.vue";
import { ICard } from "../types/ICard";

interface State {
  settingOpen: boolean;
}

export default defineComponent({
  name: "Setting",
  components: {
    MyClose,
    SettingForm,
    SettingList,
  },
  props: {
    cityData: {
      type: Array as PropType<ICard[]>,
      required: true,
    },
  },
  emits: {
    changeList: (arr: ICard[]) => Array.isArray(arr),
    addNewCity: (city: ICard) => typeof city === "object",
  },
  data(): State {
    return {
      settingOpen: false,
    };
  },
  methods: {
    openSetting() {
      this.settingOpen = true;
    },
    closeSetting() {
      this.settingOpen = false;
    },
    addNewCity(e: ICard) {
      this.$emit("addNewCity", e);
    },
    changeList(e: ICard[]) {
      this.$emit("changeList", e);
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
});
</script>

<style lang="scss" scoped>
.setting {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 40px);
  z-index: 3;
  pointer-events: none;

  &__icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    pointer-events: all;
    @media (min-width: 992px) {
      &:hover {
        opacity: 0.7;
      }
    }

    svg {
      width: 100%;
      height: auto;
    }
  }

  &__box {
    position: absolute;
    right: -15px;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: calc(100% + 30px);
    height: auto;
    max-height: 300px;
    min-height: 300px;
    padding: 20px;
    overflow-y: auto;
    border-radius: 3px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
    background: #fff;
    pointer-events: all;

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

  &__list {
    flex-grow: 1;
  }

  .setting__close {
    top: 10px;
    right: 10px;
  }

  &__title {
    text-align: left;
    font-size: 18px;
    font-weight: 600;

    &_form {
      margin-top: 24px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
