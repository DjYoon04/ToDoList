import '@mdi/font/css/materialdesignicons.css'; // Add this line to include MDI icons

// main.js
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; 
import { loadFonts } from './plugins/webfontloader';

loadFonts();

createApp(App)
  .use(vuetify)
  .mount('#app');
