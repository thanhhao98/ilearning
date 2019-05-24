<template>
  <v-navigation-drawer
    fixed
    right
    app
  >
    <v-list dense>
      <v-list-tile v-if='false' @click="">
        <v-list-tile-action>
          <v-icon large>mdi-account-circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="!isTeacher" @click="alreadyCourse">
        <v-list-tile-action>
          <v-icon large>mdi-marker-check</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Already course</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="isTeacher" @click="">
        <v-list-tile-action>
          <v-icon large>mdi-marker-check</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>My course</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="!isTeacher" @click="waitingCourse">
        <v-list-tile-action>
          <v-icon large>mdi-dots-horizontal</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Waiting course</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="logout">
        <v-list-tile-action>
          <v-icon large>mdi-logout</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="exit" color='warning'>
        <v-list-tile-action>
          <v-icon large>mdi-close-box-outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Close</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: ["isTeacher"],
    data: () => ({
    }),
    methods: {
      logout: function () {
        this.$emit('drawerLogout')
      },
      exit: function () {
        this.$emit('drawerExit')
      },
      alreadyCourse: function () {
        this.$router.push('/user/alreadyCourse')
      },
      waitingCourse: function () {
        this.$router.push('/user/waitingCourse')
      },
    }
  }
</script>

