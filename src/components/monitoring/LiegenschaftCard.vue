<template>
  <div
    class="card"
    tabindex="0"
    :class="status ? status : 'no-status'"
  >
    <template v-if="isLoading">
      <div class="loading">
        <LoadingSpinner />
      </div>
    </template>
    <template v-else>
      <img :src="imgsrc" alt="Gebäudebild" />
      <div class="info">
        <ChipComponent
          v-if="status"
          :status="status"
          :isMini="true"
        />
        <div class="info--text">
          <span class="title">{{ name }}</span>
          <span class="subtitle">{{ location }}</span>
        </div>
      </div>
      <div
        class="action"
        v-if="status"
      >
        <button type="button">
          <span>
            <HouseIcon />
            Digitaler Zwilling
          </span>
          <ArrowIcon />
        </button>
        <button
          type="button"
          @click="$emit('clicked')"
          @keydown.enter="$emit('clicked')"
        >
          <span>
            <MonitoringIcon />
            Monitoring
          </span>
          <ArrowIcon />
        </button>
      </div>
      <div
        class="no-action"
        v-else
      >
        <LockIcon />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/**
 * LiegenschaftCard component
 * @module components/monitoring/LiegenschaftCard
 * @summary A card component that displays a location and name of a property
 * @displayName LiegenschaftCard
 */

// component imports
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';

// icon imports
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import HouseIcon from '@/components/icons/HouseIcon.vue';
import MonitoringIcon from '@/components/icons/MonitoringIcon.vue';
import LockIcon from '@/components/icons/LockIcon.vue';

// type imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { type PropType } from 'vue';

export default {
  props: {
    /**
     * The location of the property
     * @default 'Ort'
     */
    location: {
      type: String as PropType<string>,
      default: 'Ort',
    },
    /**
     * The name of the property
     * @default 'Name'
     */
    name: {
      type: String as PropType<string>,
      default: 'Name',
    },
    /**
     * Whether to show the icon on the right side of the card
     * @default true
     */
    showIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * Whether the card is loading
     * @default true
     */
    isLoading: {
      type: Boolean,
      default: true,
    },
    /**
     * The image source of the card
     * @default '-'
     */
    imgsrc: {
      type: String as PropType<string>,
      default: '-',
    },
    /**
     * The status of the card
     * @default TrafficLightTypes.GREEN
     */
    status: {
      type: String as PropType<ChipStatusTypes>,
      required: false,
      default: '' as ChipStatusTypes,
    },
  },
  components: {
    LoadingSpinner,
    ChipComponent,
    ArrowIcon,
    HouseIcon,
    MonitoringIcon,
    LockIcon,
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: $lightest;
  border-radius: $base-size;
  display: flex;
  margin-bottom: $s;
  align-items: center;
  height: 100px;
  overflow: hidden;

  & > .loading {
    margin: 0 auto;
  }

  &.no-status {
    opacity: 0.6;
  }

  > img {
    height: 100%;
    border-radius: 0 $base-size $base-size 0;
  }

  > .info {
    display: flex;
    flex-direction: column;
    gap: $xxs;
    padding: $m;
    flex-grow: 1;

    & > .info--text {
      display: flex;
      flex-direction: column;
      > .title {
        @include section-headline;
      }
      > .subtitle {
        @include content;
      }
    }
  }
  > .action {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;

    & > button {
      @include content;
      border: none;
      cursor: pointer;
      height: 100%;
      width: 100%;
      border-radius: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: $xxs;

      & > span {
        display: flex;
        align-items: center;
        gap: $xxs;
      }
    }

    & > button:first-child {
      background-color: $light-green-20;
    }
    & > button:last-child {
      background-color: $light-purple-20;
    }
  }

  > .no-action {
    padding-right: $xxs;
  }
}
</style>
