<template>
  <v-app>
    <CoreToolbar
      @drawerProfile="drawerEmitProfile"
      @drawerLogin="drawerEmitLogin"
      @drawerRegister="drawerEmitRegister"
      :isLogin="isLogin"
      :links="links"
      :userData="userData">
    </CoreToolbar >

    <CoreDrawerProfile  @drawerExit="drawerEmitExit" :drawer="drawerProfile"></CoreDrawerProfile>
    <CoreDrawerLogin    @drawerExit="drawerEmitExit" :drawer="drawerLogin"></CoreDrawerLogin>
    <CoreDrawerRegister @drawerExit="drawerEmitExit" :drawer="drawerRegister"></CoreDrawerRegister>

    <core-view />

    <CoreFooter/>

  </v-app>
</template>

<script>

  export default {
    name: 'App',
    components: {
      CoreDrawerProfile: () => import('@/components/core/DrawerProfile'),
      CoreDrawerLogin: () => import('@/components/core/DrawerLogin'),
      CoreDrawerRegister: () => import('@/components/core/DrawerRegister'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreToolbar: () => import('@/components/core/Toolbar'),
      CoreView: () => import('@/components/core/View')
    },
    data: function () {
      return {
        drawerProfile: false,
        drawerLogin: false,
        drawerRegister: false,
        userData: {
          avt: "https://cdn.vuetifyjs.com/images/john.jpg",
          username: "testAvt2",
          email: "testAvt2@gmail.com",
          name: "testAvt2",
          isAdmin: true,
        },
        isLogin: false,
        links: [
          {
            to: '#',
            text: 'type1'
          },
          {
            to: '#',
            text: 'type2'
          },
          {
            to: '#',
            text: 'type3'
          },
          {
            to: '#',
            text: 'type4'
          },
          {
            to: '#',
            text: 'type5'
          },
          {
            to: '#',
            text: 'type6'
          },
          {
            to: '#',
            text: 'type7'
          },
          {
            to: '#',
            text: 'type8'
          }
        ]
      }
    },
    methods: {
      drawerEmitProfile: function() {
        this.drawerProfile = true
        this.drawerLogin = false
        this.drawerRegister = false
      },
      drawerEmitLogin: function() {
        this.drawerProfile = false
        this.drawerLogin = true
        this.drawerRegister = false
      },
      drawerEmitRegister: function() {
        this.drawerProfile = false
        this.drawerLogin = false
        this.drawerRegister = true
      },
      drawerEmitExit: function() {
        this.drawerProfile = false
        this.drawerLogin = false
        this.drawerRegister = false
      }
    }
  }
</script>
