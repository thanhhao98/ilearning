<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    right
    app
  >
    <v-list dense>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon large>mdi-account-circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        absolute
        color="red"
      >
        <v-btn @click="exit">Exit</v-btn>
      </v-bottom-nav>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: ["drawer"],
    data: () => ({
    }),
    methods: {
      exit: function(){
        this.$emit('drawerExit')
      }
    }
  }
</script>

