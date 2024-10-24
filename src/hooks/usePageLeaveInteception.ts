import { onUnmounted, watch, type Ref } from 'vue';
import { useModalInterception } from '@/hooks/useModalInterception';
import { onBeforeRouteLeave } from 'vue-router';

/**
 * Hook to provide page leave interception functionality to components
 * @param shouldIntercept - Wether or not some current state is in a form that
 * should block page leave
 * @param interceptionAction - Action to take when interception is triggered on
 * internal route change
 */
export const usePageLeaveInterception = (
  shouldIntercept: Ref<Boolean>,
  interceptionAction: ReturnType<typeof useModalInterception>['interceptAction'],
) => {
  /**
   * Before unload handler as recommended by mdn\
   * Gets called when user has unsaved changes and tries to leave the page
   */
  const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
    // Recommended
    event.preventDefault();

    // Included for legacy support, e.g. Chrome/Edge < 119
    // eslint-disable-next-line no-param-reassign
    event.returnValue = true;
  };

  watch(shouldIntercept, (newValue) => {
    if (newValue) {
      window.addEventListener('beforeunload', beforeUnloadHandler, true);
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler, true);
    }
  });

  // Intercept internal route change/navigation on unsaved changes
  onBeforeRouteLeave((to, from, next) => {
    if (to.redirectedFrom !== undefined) {
      return next();
    }

    if (shouldIntercept.value) {
      return interceptionAction(
        () => {
          next();
        },
        () => {
          next(false);
        },
      );
    }

    return next();
  });

  onUnmounted(() => {
    window.removeEventListener('beforeunload', beforeUnloadHandler, true);
  });
};
