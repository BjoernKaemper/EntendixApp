<template>
  <div class="site-detail">
    <!-- TODO: Should be a user Added image -->
    <img
      class="site-detail__image"
      :src="site.data.imageDataUrl || SymbolImageHelper.getImage('default', 'default')"
      :alt="`image of ${site.data.siteName}`"
      :onerror="useFallbackImage"
    />
    <div class="site-detail__form-wrap">
      <div class="site-detail__updating" v-if="updateLoading">
        <LoadingSpinner size="large" />
      </div>
      <form
        ref="form"
        class="site-detail__info"
        :class="{ 'site-detail__info--loading': updateLoading }"
        @submit.prevent="handleSubmit"
        @focusin="formFocused = true"
        @focusout="formFocused = false"
        @reset="closeAndResetForm"
      >
        <h3>Informationen über die Liegenschaft</h3>
        <FormInput
          id="street-input"
          label="Straße"
          placeholder="Straße"
          v-model="streetInput.value.value"
          :hasError="!streetInput.isValid.value"
          :errorMessage="streetInput.errorMessage.value"
        />
        <div class="site-detail__group">
          <FormInput
            id="plz-input"
            label="PLZ"
            placeholder="PLZ"
            v-model="zipCodeInput.value.value"
            :hasError="!zipCodeInput.isValid.value"
            :errorMessage="zipCodeInput.errorMessage.value"
          />
          <FormInput
            id="city-input"
            label="Stadt"
            placeholder="Stadt"
            v-model="cityInput.value.value"
            :hasError="!cityInput.isValid.value"
            :errorMessage="cityInput.errorMessage.value"
          />
        </div>
        <FormInput
          id="country-input"
          label="Land"
          placeholder="Land"
          v-model="countryInput.value.value"
          :hasError="!countryInput.isValid.value"
          :errorMessage="countryInput.errorMessage.value"
        />
        <div class="site-detail__form-actions" v-if="formFocused || formState.isChanged.value">
          <ButtonComponent type="reset" text="Abbrechen" state="secondary" />
          <ButtonComponent
            type="submit"
            text="Speichern"
            state="primary"
            :icon="IconTypes.CHECK_MARK"
          />
        </div>
      </form>
    </div>
  </div>
  <InterceptionModal
    :isOpen="leaveFormInterception.isOpen.value"
    @cancel="leaveFormInterception.abortAction"
    @confirm="leaveFormInterception.confirmAction"
  />
</template>

<script lang="ts">
// Store imports
import { useSiteStore } from '@/store/site';
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

// Hook import
import { useInput } from '@/hooks/useInput';
import { useFormManager } from '@/hooks/useFormManager';
import { useModalInterception } from '@/hooks/useModalInterception';
import { usePageLeaveInterception } from '@/hooks/usePageLeaveInteception';

// Component imports
import FormInput from '@/components/general/forms/FormInput.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

// Helper imports
import { requiredValidator } from '@/helpers/FormValidators';
import SymbolImageHelper from '@/helpers/SymbolImageHelper';

// Type imports
import type { SiteWithBuildinginformationAndDataurl } from '@/types/local/Site';
import type { FlatSiteData, SiteUpdateData } from '@/types/global/site/Site';
import { type PropType } from 'vue';
import { IconTypes } from '@/types/enums/IconTypes';
import type { EntendixInput } from '@/types/local/Inputs';

export default {
  name: 'SiteDetails',
  components: {
    FormInput,
    ButtonComponent,
    InterceptionModal,
    LoadingSpinner,
  },
  props: {
    site: {
      type: Object as PropType<SiteWithBuildinginformationAndDataurl>,
      required: true,
    },
  },
  computed: {
    ...mapStores(useSiteStore),
    ...mapStores(useGeneralStore),
  },
  setup(props) {
    const inputs: { [key in keyof Omit<FlatSiteData, 'siteName'>]: EntendixInput<string> } = {
      street: useInput<string>([requiredValidator], props.site.data.address.street),
      zipcode: useInput<string>([requiredValidator], props.site.data.address.zipcode),
      cityTown: useInput<string>([requiredValidator], props.site.data.address.cityTown),
      nationalCode: useInput<string>([requiredValidator], props.site.data.address.nationalCode),
    };

    const formState = useFormManager(Object.values(inputs));

    const leaveFormInterception = useModalInterception();

    usePageLeaveInterception(formState.isChanged, leaveFormInterception.interceptAction);

    return {
      streetInput: inputs.street,
      zipCodeInput: inputs.zipcode,
      cityInput: inputs.cityTown,
      countryInput: inputs.nationalCode,
      formState,
      leaveFormInterception,
      SymbolImageHelper,
      inputs,
    };
  },
  data() {
    return {
      IconTypes,
      // TODO: handle focus properly, when one looses focus and another one gets
      // it, the state flaps
      formFocused: false,
      updateLoading: false,
    };
  },
  methods: {
    closeAndResetForm() {
      this.formState.reset();
      this.formFocused = false;
    },
    async handleSubmit() {
      if (!this.formState.isValid.value) {
        return;
      }

      this.updateLoading = true;

      const updatedData: SiteUpdateData = {};

      Object.entries(this.inputs).forEach(([key, input]) => {
        if (input.isChanged.value) {
          updatedData[key as keyof SiteUpdateData] = input.value.value;
        }
      });

      this.siteStore
        .updateSite(this.site.id, updatedData)
        .then((updatedSite) => {
          // Update initial values of inputs with new data from backend
          Object.entries(updatedSite.data.address).forEach(([key, value]) => {
            if (this.inputs[key as keyof typeof this.inputs]) {
              this.inputs[key as keyof typeof this.inputs].updateInitialValue(value);
            }
          });

          // Communicate success to user
          this.closeAndResetForm();
          const alertId = this.generalStore.addAlert({
            type: 'success',
            title: 'Änderungen gespeichert',
            description: 'Die Liegenschaft wurde erfolgreich aktualisiert!',
          });

          setTimeout(() => {
            this.generalStore.removeAlert(alertId);
          }, 7000);
        })
        .catch(() => {
          this.generalStore.addAlert({
            type: 'error',
            title: 'Fehler',
            description:
              'Die Liegenschaft konnte nicht aktualisiert werden. Bitte versuchen Sie es später erneut.',
          });
        })
        .finally(() => {
          this.updateLoading = false;
        });
    },
    useFallbackImage(event: Event) {
      const target = event.target as HTMLImageElement;
      target.src = SymbolImageHelper.getImage('default', 'default');
    },
  },
};
</script>

<style scoped lang="scss">
.site-detail {
  display: flex;
  flex-direction: column;
  gap: $s;

  &__image {
    aspect-ratio: 3 / 2;
    border-radius: $border-radius;
  }

  &__form-wrap {
    position: relative;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $xxs;

    &--loading {
      opacity: 0.6;
    }
  }

  &__updating {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  &__group {
    width: 100%;
    display: flex;
    gap: $xxs;
  }

  &__form-actions {
    display: flex;
    gap: $xxs;
    justify-content: flex-end;
    padding-top: calc($xxs + $xs); // Gap + spacer from design
  }
}

h3 {
  @include content-subtitle;
}

p,
label {
  @include content;
}
</style>
