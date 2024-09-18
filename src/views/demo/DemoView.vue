<template>
  <div>
    <ChipComponent :status="StatusTypes.SUCCESS" />
    <ChipComponent :status="StatusTypes.WARNING" />
    <ChipComponent :status="StatusTypes.ERROR" />
    <ChipComponent />
    <LiegenschaftCard location="Köln" name="TH Köln, Campus Deutz" />
    <LiegenschaftCard location="Köln" name="TH Köln, Campus Gummersbach" />
    <LiegenschaftCard location="Köln" name="TH Köln, Campus Deutz" :showIcon="false" />
    <StatusCard
      title="Success"
      subtitle="Some description"
      :status="StatusTypes.SUCCESS"
      :actionType="ActionTypes.ARROW"
    />
    <StatusCard
      title="Warning"
      subtitle="Some description"
      :status="StatusTypes.WARNING"
      :actionType="ActionTypes.INFO"
    />
    <StatusCard
      title="Error"
      subtitle="An error occurred"
      :status="StatusTypes.ERROR"
      :actionType="ActionTypes.NONE"
    />
    <StatusCard title="Info" subtitle="This is some info" :status="StatusTypes.INFO" />
    <StatusCard
      title="Success"
      subtitle="Some description"
      :status="StatusTypes.SUCCESS"
      :actionType="ActionTypes.ARROW"
      :isBordered="false"
    />
    <StatusCard
      title="Warning"
      subtitle="Some description"
      :status="StatusTypes.WARNING"
      :actionType="ActionTypes.INFO"
      :isBordered="false"
    />
    <StatusCard
      title="Error"
      subtitle="An error occurred"
      :status="StatusTypes.ERROR"
      :actionType="ActionTypes.NONE"
      :isBordered="false"
    />
    <StatusCard
      title="Info"
      subtitle="This is some info"
      :status="StatusTypes.INFO"
      :isBordered="false"
    />
  </div>
</template>
<script lang="ts">
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue'
import StatusCard from '@/components/general/StatusCard.vue'
import ChipComponent from '@/components/general/ChipComponent.vue'

import { StatusTypes } from '@/types/enums/StatusTypes'
import { ActionTypes } from '@/types/enums/ActionTypes'

export default {
  components: {
    LiegenschaftCard,
    StatusCard,
    ChipComponent
  },
  setup() {
    return {
      StatusTypes,
      ActionTypes
    }
  },
}
</script>
<style lang="scss"></style>
