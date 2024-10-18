/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader';
import pinia from '../store';
import router from '../router';

export function registerPlugins(app: any) {
  loadFonts();
  app.use(router).use(pinia);
}
