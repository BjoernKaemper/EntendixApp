/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import pinia from '../store';
import router from '../router';

export function registerPlugins(app: any) {
  app.use(router).use(pinia);
}
