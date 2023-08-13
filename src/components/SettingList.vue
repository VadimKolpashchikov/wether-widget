<template>
  <div class="setting-list">
    <h3 v-if="!currentData.length">City list is empty</h3>
    <draggable
      v-else
      v-model="currentData"
      tag="ul"
      item-key="id"
      ghost-class="ghost"
    >
      <template #item="{ element, index }">
        <li>
          <MyHamburger class="icon" />
          <p>{{ element.name }}</p>
          <MyDelete
            @click="deleteElement(index)"
            @mousedown.prevent
            class="icon"
          />
        </li>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import draggable from "vuedraggable";
import MyHamburger from "./UI/MyHamburger.vue";
import MyDelete from "./UI/MyDelete.vue";
import { ICard } from "../types/ICard";
export default defineComponent({
  name: "SettingList",
  components: {
    draggable,
    MyHamburger,
    MyDelete,
  },
  props: {
    listData: {
      type: Array as PropType<ICard[]>,
    },
  },
  emits: {
    changeList: (arr: ICard[]) => Array.isArray(arr),
  },
  computed: {
    currentData: {
      get(): ICard[] {
        return this.listData || [];
      },
      set(newValue: ICard[]) {
        this.$emit("changeList", newValue);
      },
    },
  },
  methods: {
    deleteElement(id: number) {
      this.currentData.splice(id, 1);
      this.$emit("changeList", this.currentData);
    },
  },
});
</script>

<style lang="scss" scoped>
.setting-list {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: center;
  padding: 3px;
  margin-top: 16px;
  background: #ebebeb;
  border-radius: 3px;
}
.setting-list {
  h3 {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
  }

  ul {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    flex-grow: 1;
    gap: 12px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 6px;
    border-radius: 3px;
    background-color: rgb(204, 204, 204);
    pointer-events: none;
    user-select: none;

    p {
      text-align: left;
    }

    .icon {
      flex-shrink: 0;
    }
  }
}
</style>
