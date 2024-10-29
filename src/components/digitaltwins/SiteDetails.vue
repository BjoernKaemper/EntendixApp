<template>
  <div class="site-detail">
    <!-- TODO: Should be a user Added image -->
    <img
      class="site-detail__image"
      src="@/assets/placeholder-campus-deutz.png"
      :alt="`image of ${site.data.siteName}`"
    />
    <form
      ref="form"
      class="site-detail__info"
      @submit.prevent="console.log('TODO')"
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
  <InterceptionModal
    :isOpen="leaveFormInterception.isOpen.value"
    @cancel="leaveFormInterception.abortAction"
    @confirm="leaveFormInterception.confirmAction"
  />
</template>

<script lang="ts">
// TODO: connect to backend
// TODO: handle page leave for unsaved changes

// Hook import
import { useInput } from '@/hooks/useInput';
import { useFormManager } from '@/hooks/useFormManager';
import { useModalInterception } from '@/hooks/useModalInterception';
import { usePageLeaveInterception } from '@/hooks/usePageLeaveInteception';

// Component imports
import FormInput from '@/components/general/forms/FormInput.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';

// Helper imports
import { requiredValidator } from '@/helpers/FormValidators';

// Type imports
import type { SiteWithBuildinginformation } from '@/types/global/site/Site';
import { type PropType } from 'vue';
import { IconTypes } from '@/types/enums/IconTypes';

export default {
  name: 'SiteDetails',
  components: {
    FormInput,
    ButtonComponent,
    InterceptionModal,
  },
  props: {
    site: {
      type: Object as PropType<SiteWithBuildinginformation>,
      required: true,
    },
  },
  setup(props) {
    const streetInput = useInput<string>([requiredValidator], props.site.data.address.street);
    const zipCodeInput = useInput<string>([requiredValidator], props.site.data.address.zipcode);
    const cityInput = useInput<string>([requiredValidator], props.site.data.address.cityTown);
    const countryInput = useInput<string>(
      [requiredValidator],
      props.site.data.address.nationalCode,
    );

    const formState = useFormManager([streetInput, zipCodeInput, cityInput, countryInput]);

    const leaveFormInterception = useModalInterception();

    usePageLeaveInterception(formState.isChanged, leaveFormInterception.interceptAction);

    return {
      streetInput,
      zipCodeInput,
      cityInput,
      countryInput,
      formState,
      leaveFormInterception,
    };
  },
  data() {
    return {
      IconTypes,
      // TODO: handle focus properly, when one looses focus and another one gets
      // it, the state flaps
      formFocused: false,
    };
  },
  methods: {
    closeAndResetForm() {
      this.formState.reset();
      this.formFocused = false;
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

  &__info {
    display: flex;
    flex-direction: column;
    gap: $xxs;
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
