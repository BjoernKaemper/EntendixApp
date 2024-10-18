<template>
  <aside
    v-if="wissenssammlung && knowledgeItem"
    ref="sidebar"
    class="sidebar"
    :class="{ 'sidebar--open': isOpen }"
    @click="toggleSidebar(true)"
    @keydown.enter="toggleSidebar(true)"
  >
    <button
      type="button"
      class="sidebar--button"
      @click.stop="toggleSidebar(false)"
      @keydown.enter.stop="toggleSidebar(false)"
    >
      Schließen <MaterialSymbol :symbol="IconTypes.CLOSE" />
    </button>
    <div class="sidebar--header">
      <MaterialSymbol :symbol="IconTypes.KNOWLEDGE" />
      <h2 class="sidebar--header-headline">Wissens-Sammlung</h2>
      <h2 class="sidebar--header-headline-topic">
        Wissen über <br /><strong>{{ knowledgeItem.title }}</strong>
      </h2>
    </div>
    <p class="sidebar--description" v-if="wissenssammlung">
      {{ knowledgeItem.description[0].de }}
    </p>
  </aside>
</template>

<script lang="ts">
// Vue imports
import type { PropType } from 'vue';

// Component imports
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

// Interface imports
import type { Wissenssammlung, WissenssammlungItem } from '@/types/Knowledge';
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
    knowledgeItem() {
      return this.wissenssammlung.find((item) => item.title === this.topic);
    },
  },
  mounted() {
    this.wissenssammlung = wissenssammlungTyped.wissenssammlung;
  },
  methods: {
    toggleSidebar(state: boolean) {
      this.isOpen = state;
      this.$emit('toggle-sidebar', state);
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
  width: 355px;
  padding: $xxl $m;
  color: $dark-purple;
  transition: transform 0.3s;
  cursor: pointer;
  position: sticky;
  margin: -#{$xxl} 0 -#{$xxl} #{$m};

  display: flex;
  flex-direction: column;
  align-items: start;

  &--button {
    display: none;
  }
  &--header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $l;
    margin-bottom: $l;

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

    & .sidebar--header {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      width: 100%;

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
    }

    & .sidebar--description {
      display: block;
    }
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
