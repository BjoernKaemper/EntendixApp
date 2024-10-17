<template>
  <div class="alert-tiles--wrapper" :class="alert.type" ref="alert">
    <MaterialSymbol :symbol="icon" />
    <div class="alert-tiles--wrapper--inner">
      <h4>{{ alert.title }}</h4>
      <p>
        {{ alert.description }}
      </p>
      <small>
        <time>{{ alert.time }} Uhr</time>
      </small>
    </div>
    <button type="button" @click="closeAlert(alert.id)">
      <MaterialSymbol :symbol="IconTypes.CLOSE" />
    </button>
  </div>
</template>

<script lang="ts">
/**
 * @name AlertElement
 * @description
 * This component is used to display alert tiles on the top right corner of the screen.
 * The alert tiles can be of different types like success, warning, error, and info.
 * The alert tiles can be closed by clicking on the close icon.
 * The alert tiles are displayed in a stack, so the latest alert tile is displayed on top.
 */

// component imports
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

// library imports
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

// type imports
import { IconTypes } from '@/types/enums/IconTypes';
import { AlertTypes } from '@/types/enums/AlertTypes';
import type { Alert } from '@/types/Alert';

export default {
  name: 'AlertElement',
  components: {
    MaterialSymbol,
  },
  props: {
    /**
     * The alert object that contains the alert details.
     * @type Alert
     */
    alert: {
      type: Object as () => Alert,
      required: true,
    },
  },
  computed: {
    ...mapStores(useGeneralStore),
    icon() {
      switch (this.alert.type) {
        case AlertTypes.INFO:
          return IconTypes.INFO_CIRCLE;
        case AlertTypes.WARNING:
          return IconTypes.EXCLAMATION_MARK;
        case AlertTypes.SUCCESS:
          return IconTypes.CHECK_MARK_CIRCLE;
        case AlertTypes.ERROR:
          return IconTypes.WARNING;
        default:
          return IconTypes.INFO_CIRCLE;
      }
    },
  },
  methods: {
    closeAlert(alertId: string | undefined) {
      if (!alertId) {
        return;
      }

      this.generalStore.removeAlert(alertId);
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
.alert-tiles--wrapper {
  background-color: $darken;
  color: $lightest;
  padding: $xxs $xxs $xxs $xxs;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: $base-size;

  border-left: $xxs solid $lightest;
  border-radius: $base-size;
  box-shadow: 0px $base-size $base-size 0px $shadow;

  &.success {
    border-left-color: $light-green;
    & > span {
      color: $light-green;
    }
  }

  &.warning {
    border-left-color: $yellow;
    & > span {
      color: $yellow;
    }
  }

  &.error {
    border-left-color: $orange;
    & > span {
      color: $orange;
    }
  }

  &.info {
    border-left-color: $light-purple;
    & > span {
      color: $light-purple;
    }
  }

  & > span {
    flex-shrink: 0;
  }

  & > button {
    border: none;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    color: $lightest;
  }

  &--inner {
    display: flex;
    flex-direction: column;
    gap: $xxs;

    h4 {
      margin-top: 2.5px;
      @include section-headline;
    }

    p {
      @include content;
    }

    small {
      @include meta-information;
      color: $lightest;
    }
  }
}
</style>
