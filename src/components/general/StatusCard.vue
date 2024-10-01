<template>
  <div
    class="status-card"
    :class="[{ isBordered }, status]"
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
      <div class="kpi-icon">
        <component :is="kpiIcon" />
      </div>
      <div class="text-section">
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
        <component :is="actionIcon" />
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

// type imports
import { type PropType } from 'vue';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { SubsectionTypes } from '@/types/enums/SubsectionTypes';

// icon imports
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import InfoCircleIcon from '@/components/icons/InfoCircleIcon.vue';
import AirIcon from '@/components/icons/AirIcon.vue';
import MediaIcon from '@/components/icons/MediaIcon.vue';
import HeatIcon from '@/components/icons/HeatIcon.vue';
import ColdIcon from '@/components/icons/ColdIcon.vue';
import SecurityIcon from '@/components/icons/SecurityIcon.vue';
import ElectricityIcon from '@/components/icons/ElectricityIcon.vue';
import OpenInBrowserIcon from '@/components/icons/OpenInBrowserIcon.vue';

// component imports
import IconChip from '@/components/general/IconChip.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

export default {
  components: {
    ArrowIcon,
    InfoCircleIcon,
    AirIcon,
    MediaIcon,
    HeatIcon,
    ColdIcon,
    ElectricityIcon,
    SecurityIcon,
    OpenInBrowserIcon,
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
  mounted() {
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWidth);
  },
  methods: {
    checkWidth() {
      this.isFullWidthClass = this.$el.getBoundingClientRect().width > window.innerWidth / 2 ? 'full-width' : '';
    },
  },
  computed: {
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
    kpiIcon(): string | undefined {
      switch (this.kpiType) {
        case SubsectionTypes.MEDIA:
          return 'MediaIcon';
        case SubsectionTypes.HEAT:
          return 'HeatIcon';
        case SubsectionTypes.COLD:
          return 'ColdIcon';
        case SubsectionTypes.AIR:
          return 'AirIcon';
        case SubsectionTypes.ELECTRICITY:
          return 'ElectricityIcon';
        case SubsectionTypes.SECURITY:
          return 'SecurityIcon';
        default:
          return undefined;
      }
    },
    actionIcon(): string | undefined {
      switch (this.actionType) {
        case ActionTypes.INFO:
          return 'InfoCircleIcon';
        case ActionTypes.ARROW:
          return 'ArrowIcon';
        case ActionTypes.OPEN:
          return 'OpenInBrowserIcon';
        default:
          return undefined;
      }
    },
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
  margin-bottom: $xxs;
  padding-right: $xxs;
  cursor: pointer;

  & .loading {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    &--wrapper > * {
      width: 50%;
    }
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
      gap: $xxs;
      align-items: center;
    }
  }

  > .icon-section,
  .action-section {
    display: flex;
    align-items: center;
    & > div {
      padding: $s $xxs;
      border-radius: $border-radius 0 0 $border-radius;
    }
  }
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
