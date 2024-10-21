<template>
  <div class="twin-building-details">
    <figure class="twin-building-details__preview">
      <img
        class="twin-building-details__image"
        :src="BuildingCardPreview"
        :alt="`Schema des Gebäudes ${buildingName}`"
      />
    </figure>
    <div class="twin-building-details__info">
      <div class="twin-building-details__info-header">
        <h4>Informationen über das Gebäude</h4>
        <!-- TODO: correct icon -->
        <ButtonComponent text="Bearbeiten" :icon="IconTypes.ADD" state="tertiary" />
      </div>
      <div class="twin-building-details__input-group">
        <label for="area" class="twin-building-details__label">Netto-Grundfläche (in m²)</label>
        <input
          id="area"
          class="twin-building-details__input"
          type="number"
          placeholder="Netto-Grundfläche"
          :value="building.data.usableSpace"
        />
      </div>
      <div class="twin-building-details__input-group">
        <label for="usageTime" class="twin-building-details__label">Allgemeine Nutzungszeit</label>
        <!-- TODO: no data for this field yet -->
        <textarea
          class="twin-building-details__input twin-building-details__input--textarea"
          id="usageTime"
          placeholder="Allgemeine Nutzungszeit"
          rows="2"
        />
      </div>

      <div class="twin-building-details__input-group">
        <p>Planungsdaten</p>
        <div class="twin-building-details__files">
          <FileEntry fileName="gebäude-plan.pdf" url="test" />
          <FileEntry fileName="Energieausweis.pdf" url="test" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Library imports
import type { PropType } from 'vue';

// Component imports
import BuildingCardPreview from '@/assets/BuildingCardPreview.svg';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import FileEntry from '@/components/general/FileEntry.vue';

// Type imports
import { IconTypes } from '@/types/enums/IconTypes';
import type { Building } from '@/types/global/building/Building';

export default {
  components: {
    ButtonComponent,
    FileEntry,
  },
  props: {
    buildingName: {
      type: String as PropType<string>,
      required: true,
    },
    building: {
      type: Object as PropType<Building>,
      required: true,
    },
  },
  data() {
    return {
      BuildingCardPreview,
      IconTypes,
    };
  },
};
</script>

<style scoped lang="scss">
.twin-building-details {
  display: flex;
  flex-direction: column;
  gap: $m;

  &__preview {
    width: 100%;
    aspect-ratio: 4 / 5;
    padding: $xxxl;
    background-color: $lightest;
    border-radius: $border-radius;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    width: 100%;
  }

  &__info {
    display: flex;
    flex-flow: column;
    gap: $xxs;
  }

  &__info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__input-group {
    display: flex;
    flex-direction: column;
    gap: $xxxs;
  }

  &__files {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }

  &__label {
    @include content;
  }

  &__input {
    background-color: $lightest;
    padding: $base-size $xxs;
    border-radius: $border-radius;
    border: 1px solid $light-purple;

    &::placeholder {
      @include content;
    }

    &:focus {
      outline: none;
    }

    &--textarea {
      resize: vertical;

    }
  }
}

h4 {
  @include content-subtitle;
}

p {
  @include content;
}

</style>
