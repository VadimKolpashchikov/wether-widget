<template>
  <ul class="card-list">
    <li v-for="(el, idx) in listData.list" :key="el">
      <div v-if="idx === 0">
        <svg
          viewBox="0 0 1000 1000"
          enable-background="new 0 0 1000 1000"
          xml:space="preserve"
          :style="{ transform: `rotate(${listData.windDeg}deg)` }"
        >
          <g fill="#323232">
            <path
              d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"
            ></path>
            <path
              d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"
            ></path>
          </g>
        </svg>
      </div>
      <div v-if="idx === 1">
        <svg width="96pt" height="96pt" viewBox="0 0 96 96">
          <g
            transform="translate(0,96) scale(0.100000,-0.100000)"
            fill="#323232"
            stroke="none"
          >
            <path
              d="M351 854 c-98 -35 -179 -108 -227 -202 -27 -53 -29 -65 -29 -172 0
    -107 2 -119 29 -172 38 -75 104 -141 180 -181 58 -31 66 -32 176 -32 110 0
    118 1 175 32 77 40 138 101 178 178 31 57 32 65 32 175 0 110 -1 118 -32 176
    -40 76 -106 142 -181 179 -49 25 -71 29 -157 32 -73 2 -112 -1 -144 -13z m259
    -80 c73 -34 126 -86 161 -159 24 -50 29 -73 29 -135 0 -62 -5 -85 -29 -135
    -57 -119 -161 -185 -291 -185 -130 0 -234 66 -291 185 -24 50 -29 73 -29 135
    0 130 66 234 185 291 82 40 184 41 265 3z"
            ></path>
            <path
              d="M545 600 c-35 -35 -68 -60 -80 -60 -27 0 -45 -18 -45 -45 0 -33 -50
    -75 -89 -75 -18 0 -41 -5 -53 -11 -20 -11 -20 -11 3 -35 12 -13 33 -24 46 -24
    17 0 23 -6 23 -23 0 -13 10 -33 23 -45 30 -28 47 -13 47 43 0 32 6 47 28 68
    15 15 37 27 48 27 26 0 44 18 44 44 0 12 26 47 60 81 l60 61 -28 27 -28 27
    -59 -60z"
            ></path>
          </g>
        </svg>
      </div>
      {{ el }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface IListData {
  list: string[];
  windDeg: number;
}

export default defineComponent({
  name: "CardList",
  props: {
    listData: {
      type: Object as PropType<IListData>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.card-list {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  row-gap: 12px;
  column-gap: 8px;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    width: calc(50% - 4px);
    font-size: 16px;
    font-weight: 500;
    text-align: left;

    div {
      display: flex;
    }

    svg {
      width: 18px;
      height: 18px;

      path {
        max-height: 100%;
        max-width: 100%;
      }
    }
  }
}
</style>
