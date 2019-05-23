<template>
  <v-toolbar
    app
    flat
  >
    <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />
    <v-container
      mx-auto
      py-0
    >
      <v-layout>
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        />
        <v-btn
          :to="home.to"
          class="ml-0 hidden-sm-and-down"
          flat
        >
          {{ home.text }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-flex xs12 sm6>
          <v-text-field
            label="Search"
            single-line
          ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <div v-if="isLogin" >
          <v-btn fab dark @click="drawerProfile">
            <v-avatar v-if="hasAvt">
              <img
                :src="userData.avt"
              >
            </v-avatar>
            <v-avatar v-else color="teal">
              <span class="white--text headline">{{firstName}}</span>
            </v-avatar>
          </v-btn>
        </div>
        <div v-else >
          <v-btn color="success"  @click="drawerLogin">Login</v-btn>
          <v-btn color="error"  @click="drawerRegister">Register</v-btn>
        </div>
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>

  export default {
    props: ['isLogin','userData'],
    data: function () {
      return {
        home:{
          to: '/',
          text: 'Home'
        },
      }
    },
    computed: {
      hasAvt: function () {
        if(this.userData.avt == undefined){
          return false
        }
        return this.userData.avt !== ''
      },
      firstName: function () {
        return this.userData.name[0]
      }
    },
    methods: {
      drawerProfile: function () {
        this.$emit('drawerProfile')
      },
      drawerLogin: function () {
        this.$emit('drawerLogin')
      },
      drawerRegister: function () {
        this.$emit('drawerRegister')
      },
      onClick (e, item) {
        e.stopPropagation()
        if (item.to || !item.href) return
        this.$vuetify.goTo(item.href)
      }
    }
  }
</script>
