// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'; // Make sure this is imported
import { mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // Set the default icon set to mdi
    sets: {
      mdi,
    },
  },
});

export default vuetify;
