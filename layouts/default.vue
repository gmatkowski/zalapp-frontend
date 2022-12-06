<template>
  <v-app dark>
    <v-main>
      <Nuxt />
      <SnackbarComponent />
    </v-main>
  </v-app>
</template>

<script>
import SnackbarComponent from '~/components/SnackbarComponent'

export default {
  name: 'DefaultLayout',
  components: {
    SnackbarComponent
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
