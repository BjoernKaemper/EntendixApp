<template>
  <div
    class="status-card"
    :class="[{ isBordered }, status, { hasSubtitle: subtitle }, isFullWidthClass]"
    @click="$emit('clicked')"
    @keydown.enter="$emit('clicked')"
    tabindex="0"
  >
    <template v-if="isLoading">
      <div class="loading">
        <LoadingSpinner />
      </div>
    </template>
    <template v-else>
      <div class="icon-section">
        <IconChip :status="status" />
      </div>
      <div class="kpi-icon" v-if="kpiIcon">
        <MaterialSymbol :symbol="kpiIcon" />
      </div>
      <div class="text-section" :class="isFullWidthClass">
        <span class="title">
          {{ title }}
        </span>
        <span v-if="subtitle" class="subtitle">
          {{ subtitle }}
        </span>
      </div>
      <div class="timestamp">
        <span v-if="timestamp">seit {{ timestampFormatted }}</span>
      </div>
      <div class="action-section" v-if="actionIcon">
        <MaterialSymbol :symbol="actionIcon" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/**
 * A card component that displays a title, subtitle, icon, and an optional action icon.
 * The card can be styled with a status color (success, warning, error, info).
 * @module components/general/StatusCard
 * @displayName StatusCard
 */

// Module imports
import { mapStores } from 'pinia';
import { useGeneralStore } from '@/store/general';

// type imports
import { type PropType } from 'vue';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { SubsectionTypes } from '@/types/enums/SubsectionTypes';
import { IconTypes } from '@/types/enums/IconTypes';

// component imports
import IconChip from '@/components/general/IconChip.vue';
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

export default {
  components: {
    MaterialSymbol,
    IconChip,
    LoadingSpinner,
  },

  props: {
    /**
     * The title of the card.
     * @default 'Title'
     */
    title: {
      type: String as PropType<string>,
      default: 'Title',
    },
    /**
     * The status of the card.
     * The status can be one of 'success', 'warning', 'error', or 'info'.
     * @default 'info'
     */
    status: {
      type: String as PropType<ChipStatusTypes | ComponentStatusTypes>,
      default: ChipStatusTypes.INFO,
    },
    /**
     * The subtitle of the card.
     */
    subtitle: {
      type: String as PropType<string> | undefined,
      default: undefined,
    },
    /**
     * The icon to display as an action icon.
     */
    actionType: {
      type: String as PropType<ActionTypes>,
      default: ActionTypes.NONE,
    },
    /**
     * Whether the card should have a border.
     * @default true
     */
    isBordered: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    /**
     * The type of KPI icon to display.
     * The KPI icon can be one of 'media', 'heat', 'cold', 'air', 'electricity', or 'security'.
     * @default 'none'
     */
    kpiType: {
      type: String as PropType<SubsectionTypes>,
      default: SubsectionTypes.NONE,
    },
    /**
     * The timestamp of the card.
     * @default ''
     */
    timestamp: {
      type: String as PropType<string>,
      default: '',
    },
    /**
     * Whether the card is loading.
     * @default true
     */
    isLoading: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },

  data() {
    return {
      isFullWidthClass: '',
    };
  },

  methods: {
    checkWidth() {
      if (!this.windowWidth || !this.$el) {
        return;
      }

      this.isFullWidthClass = this.$el.getBoundingClientRect().width > this.windowWidth / 2 ? 'full-width' : '';
    },
  },

  computed: {
    ...mapStores(useGeneralStore),

    windowWidth(): number | null {
      return this.generalStore.windowDimensions.width;
    },

    timestampFormatted(): string {
      const date = new Date(this.timestamp);
      const formatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      // replace all / with . and remove commas with regex and without replaceAll
      return formatter.format(date).replace(/,/g, '').replace(/\//g, '.');
    },

    kpiIcon(): IconTypes | undefined {
      switch (this.kpiType) {
        case SubsectionTypes.MEDIA:
          return IconTypes.MEDIA;
        case SubsectionTypes.HEAT:
          return IconTypes.HEAT;
        case SubsectionTypes.COLD:
          return IconTypes.COLD;
        case SubsectionTypes.AIR:
          return IconTypes.AIR;
        case SubsectionTypes.ELECTRICITY:
          return IconTypes.ELECTRICITY;
        case SubsectionTypes.SECURITY:
          return IconTypes.SECURITY;
        default:
          return undefined;
      }
    },

    actionIcon(): IconTypes | undefined {
      switch (this.actionType) {
        case ActionTypes.INFO:
          return IconTypes.INFO_CIRCLE;
        case ActionTypes.ARROW:
          return IconTypes.ARROW;
        case ActionTypes.OPEN:
          return IconTypes.OPEN_IN;
        default:
          return undefined;
      }
    },
  },

  watch: {
    windowWidth() {
      this.checkWidth();
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (!this.windowWidth) {
        window.dispatchEvent(new Event('resize'));
      }
      this.checkWidth();
    });
  },

  setup() {
    return {
      ComponentStatusTypes,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

.status-card {
  border-radius: $border-radius;
  background-color: $lightest;
  display: flex;
  align-items: center;
  gap: $xxs;
  cursor: pointer;

  & .loading {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.none {
    opacity: 0.6;
  }

  &.isBordered {
    &.success {
      border: 1px solid $light-green;
    }
    &.warning {
      border: 1px solid $yellow;
    }

    &.error {
      border: 1px solid $orange;
    }

    &.info {
      border: 1px solid $light-purple;
    }

    &.error-component {
      border: 1px solid $darkest;
    }

    &.warning-component {
      border: 1px solid $darkest;
    }
  }

  > .kpi-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > .text-section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &.full-width {
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;

      > .title {
        margin-right: $xxs;
      }
    }
  }

  > .icon-section,
  .action-section {
    display: flex;
    align-items: center;
    & > div {
      border-radius: $border-radius 0 0 $border-radius;
    }
  }
  .action-section {
    padding-right: $xxs;
  }
}

.hasSubtitle:not(.full-width) > .icon-section > div {
  padding: $s $xxxs;
}

.title {
  @include section-headline;
}

.subtitle {
  @include content;
}

.info,
.timestamp {
  @include meta-information;
}
</style>
