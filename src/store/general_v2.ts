import { defineStore } from 'pinia'

interface GeneralStoreState {
  userId?: string,
}

export const useGeneralStore = defineStore('general', {
  state: (): GeneralStoreState => {
    return {
      userId: undefined
    }
  },
  actions: {

  },
});
