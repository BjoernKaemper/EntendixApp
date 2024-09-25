<template>
  <aside
    ref="sidebar"
    class="sidebar"
    :class="{ 'sidebar--open': isOpen }"
    @click="openSidebar"
    @keydown.enter="openSidebar"
  >
    <button
      type="button"
      class="sidebar--button"
      @click="closeSidebar($event)"
      @keydown.enter="closeSidebar($event)">Schließen <CloseIcon /></button>
    <div class="sidebar--header">
      <QuickRefIcon />
      <h2 class="sidebar--header-headline">Wissens-Sammlung</h2>
      <h2 class="sidebar--header-headline-topic">Wissen über <br /><strong>{{ wissenssammlung[0]?.title }}</strong></h2>
    </div>
    <p
      class="sidebar--description"
      v-if="wissenssammlung">{{ wissenssammlung[0]?.description[0].de }}
    </p>
  </aside>
</template>

<script lang="ts">
import QuickRefIcon from '@/components/icons/QuickRefIcon.vue';
import wissenssammlungData from '@/assets/json/wissenssammlung.json';
import CloseIcon from '@/components/icons/CloseIcon.vue';

// @TODO move type to separate file
interface Description {
  de: string;
  en: string;
}

interface WissenssammlungItem {
  id: number;
  title: string;
  description: Description[];
}

interface Wissenssammlung {
  wissenssammlung: WissenssammlungItem[];
}

const wissenssammlungTyped = wissenssammlungData as Wissenssammlung;

export default {
  components: {
    QuickRefIcon,
    CloseIcon,
  },
  props: {
    topic: {
      type: String,
      default: '-',
    },
  },
  data() {
    return {
      isOpen: false,
      wissenssammlung: [] as WissenssammlungItem[],
    };
  },
  mounted() {
    this.wissenssammlung = wissenssammlungTyped.wissenssammlung;
  },
  methods: {
    openSidebar() {
      const sidebar = this.$refs.sidebar as HTMLElement;
      this.isOpen = true;
      sidebar.classList.add('sidebar--open');
    },
    closeSidebar(event: Event) {
      event.stopPropagation();
      this.isOpen = false;
      const sidebar = this.$refs.sidebar as HTMLElement;
      sidebar.classList.remove('sidebar--open');
    },
  },
};
</script>

<style lang="scss" scoped>
// @TODO: use position fixed (somehow) so that the sidebar is always visible and covers the full height of the page
.sidebar {
  background-color: $dark-purple-20;
  width: 80px;
  padding: $xxl $m;
  color: $dark-purple;
  transition: width 0.3s;
  cursor: pointer;
  position: sticky;
  margin: -#{$xxl} -#{$m} -#{$xxl} 0;
  height: calc(100vh - 111px);

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
      @include content-subtitle;

      &-topic {
        display: none;
        @include content-subtitle;
      }
    }
  }

  &--description {
    display: none;
    @include content;
    border-radius: $base-size;
    color: $dark-purple;
  }

  &--open {
    width: 355px;
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
      border-radius: $base-size;
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
