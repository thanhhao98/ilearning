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
        <v-btn
          v-for="(link, i) in buttons"
          :key="i"
          :to="link.to"
          class="ml-0 hidden-sm-and-down"
          flat
          @click="onClick($event, item)"
        >
          {{ link.text }}
        </v-btn>
        <v-btn v-if="isMoveLeft" small flat @click="leftClick">
          <v-icon dark>mdi-chevron-double-left</v-icon>
        </v-btn>
        <v-btn  v-if="isMoveRight" small flat @click="rightClick">
          <v-icon dark>mdi-chevron-double-right</v-icon>
        </v-btn>
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
    props: ['links','isLogin','userData'],
    data: function () {
      return {
        moveLeft: false,
        moveRight: true,
        from: 0,
        to: 5,
        home:{
          to: '/',
          text: 'Home'
        },
      }
    },
    computed: {
      hasAvt: function(){
        return this.userData.avt != ''
      },
      firstName: function(){
        return this.userData.name[0]
      },
      buttons: function(){
        return this.links.slice(this.from,this.to)
      },
      isMoveLeft: function(){
        return this.from > 0
      },
      isMoveRight: function(){
        return this.to <  this.links.length
      }
    },
    methods: {
      drawerProfile: function(){
        this.$emit('drawerProfile')
      },
      drawerLogin: function(){
        this.$emit('drawerLogin')
      },
      drawerRegister: function(){
        this.$emit('drawerRegister')
      },
      rightClick: function() {
        this.from +=1
        this.to +=1
      },
      leftClick: function() {
        this.from -=1
        this.to -=1
      },
      onClick (e, item) {
        e.stopPropagation()
        if (item.to || !item.href) return
        this.$vuetify.goTo(item.href)
      }
    }
  }
</script>
