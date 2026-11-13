import DefaultTheme from 'vitepress/theme';
import LibraryHome from './LibraryHome.vue';
import './style.css';
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) { app.component('LibraryHome', LibraryHome); }
};
