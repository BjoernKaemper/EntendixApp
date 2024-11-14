<template>
  <div class="card" tabindex="0" :class="status ? status : 'no-status'">
    <template v-if="isLoading">
      <div class="loading">
        <LoadingSpinner />
      </div>
    </template>
    <template v-else>
      <img :src="imgsrc" :onerror="useFallbackImage" alt="Gebäudebild" class="card--image" />
      <div class="info">
        <ChipComponent v-if="status" :status="status" :isMini="true" />
        <div class="info--text">
          <span class="title">{{ name }}</span>
          <span class="subtitle">{{ location }}</span>
        </div>
      </div>
      <div class="action" v-if="status">
        <button
          type="button"
          @click="$emit('digitalTwinClicked')"
          @keydown.enter="$emit('clicked')"
        >
          <span>
            <MaterialSymbol :symbol="IconTypes.HOME" />
            Digitaler Zwilling
          </span>
          <MaterialSymbol :symbol="IconTypes.ARROW" />
        </button>
        <button type="button" @click="$emit('monitoringClicked')" @keydown.enter="$emit('clicked')">
          <span>
            <MaterialSymbol :symbol="IconTypes.MONITORING" />
            Monitoring
          </span>
          <MaterialSymbol :symbol="IconTypes.ARROW" />
        </button>
      </div>
      <div class="no-action" v-else>
        <MaterialSymbol :symbol="IconTypes.LOCK" />
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
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

// type imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { type PropType } from 'vue';
import { IconTypes } from '@/types/enums/IconTypes';

// helper imports
import SymbolImageHelper from '@/helpers/SymbolImageHelper';

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
    MaterialSymbol,
  },
  setup() {
    return {
      IconTypes,
    };
  },
  methods: {
    useFallbackImage(event: Event) {
      const target = event.target as HTMLImageElement;
      target.src = SymbolImageHelper.getImage('default', 'default');
    },
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

  &--image {
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: $border-radius;
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
      padding: $xs $xxs;

      & > span {
        display: flex;
        align-items: center;
        gap: $xxs;
      }
    }

    & > button:first-child {
      background-color: $dark-green-15;
      & > span > span {
        color: $dark-green;
      }
    }
    & > button:last-child {
      background-color: $dark-purple-15;
      & > span > span {
        color: $dark-purple;
      }
    }
  }

  > .no-action {
    padding-right: $xxs;
  }
}
</style>
