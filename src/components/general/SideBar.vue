<template>
  <!-- TODO: replace the or with an and, this is just for the Coming Soon Placeholder -->
  <aside
    v-if="wissenssammlung || knowledgeItem"
    ref="sidebar"
    class="sidebar"
    :class="{ 'sidebar--open': isOpen }"
    @click="toggleSidebar(true)"
    @keydown.enter="toggleSidebar(true)"
  >
    <div class="sidebar__wrapper">
      <button
        type="button"
        class="sidebar--button"
        @click.stop="toggleSidebar(false)"
        @keydown.enter.stop="toggleSidebar(false)"
      >
        Schließen <MaterialSymbol :symbol="IconTypes.CLOSE" />
      </button>
      <div class="sidebar--header">
        <MaterialSymbol :symbol="IconTypes.KNOWLEDGE" size="x-large" />
        <h2 class="sidebar--header-headline">Wissens-Sammlung</h2>
        <h2 class="sidebar--header-headline-topic" v-if="knowledgeItem">
          Wissen über <br /><strong>{{ knowledgeItem.title }}</strong>
        </h2>
        <h2 v-else class="sidebar--header-headline-topic">Wissens-Sammlung</h2>
      </div>
      <p class="sidebar--description" v-if="knowledgeItem">
        {{ knowledgeItem.description[0].de }}
      </p>
      <p class="sidebar--description" v-else>
        Hier finden Sie in Zukunft Wissen zu den verschiedenen Themenbereichen.
      </p>
    </div>
  </aside>
</template>

<script lang="ts">
// Vue imports
import type { PropType } from 'vue';

// Component imports
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

// Interface imports
import type { Wissenssammlung, WissenssammlungItem } from '@/types/local/Knowledge';
import { IconTypes } from '@/types/enums/IconTypes';

// Data imports
import wissenssammlungData from '@/assets/json/wissenssammlung.json';

const wissenssammlungTyped = wissenssammlungData as Wissenssammlung;

export default {
  components: {
    MaterialSymbol,
  },
  props: {
    /**
     * The topic of the knowledge collection
     * @default '-'
     * @type {String}
     */
    topic: {
      type: String as PropType<string>,
      default: '-',
    },
  },
  data() {
    return {
      isOpen: false,
      wissenssammlung: [] as WissenssammlungItem[],
    };
  },
  computed: {
    knowledgeItem(): WissenssammlungItem | undefined {
      // return this.wissenssammlung.find((item) => item.title === this.topic);
      return undefined;
    },
  },
  mounted() {
    this.wissenssammlung = wissenssammlungTyped.wissenssammlung;
  },
  methods: {
    toggleSidebar(state: boolean) {
      this.$emit('toggle-sidebar', state);
      this.isOpen = state;
    },
  },
  setup() {
    return {
      IconTypes,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: $dark-purple-20;
  width: 80px;
  padding: $xxl $m;
  color: $dark-purple;
  transition: all 0.3s ease;
  cursor: pointer;
  position: sticky;
  top: 0;
  margin: -#{$xxl} 0 -#{$xxl} #{$m};

  display: flex;
  flex-direction: column;
  align-items: start;

  &__wrapper {
    position: fixed;
    width: 40px;
    transition: all 0.3s ease;
  }

  &--open &__wrapper {
    position: fixed;
    width: 315px;
  }

  &--button {
    display: none;
  }
  &--header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $l;
    margin-bottom: $l;
    position: fixed;

    &-headline {
      transform: rotate(-180deg);
      white-space: nowrap;
      writing-mode: vertical-lr;
      @include content-headline;
      color: $dark-purple;

      &-topic {
        display: none;
        @include content-subtitle;
      }
    }
  }

  &--description {
    display: none;
    @include content;
    border-radius: $border-radius;
    color: $dark-purple;
  }

  &--open {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    cursor: default;
    width: 355px;

    & .sidebar--header {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: $xxs;
      width: 100%;
      position: relative;

      &-headline {
        display: none;
      }
      &-headline-topic {
        display: block;
      }
    }

    & .sidebar--button {
      display: block;
      margin-bottom: $l;
      padding: $base-size $xxs;
      border-radius: $border-radius;
      background-color: $light-purple;
      color: $darkest;
      cursor: pointer;
      position: relative;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-self: flex-end;
    }

    & .sidebar--description {
      display: block;
    }
  }
}
</style>
