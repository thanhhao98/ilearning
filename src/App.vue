<template>
  <v-app>
    <CoreToolbar
      @drawerProfile="drawerEmitProfile"
      @drawerLogin="drawerEmitLogin"
      @drawerRegister="drawerEmitRegister"
      :isLogin="isLogin"
      :userData="userData">
    </CoreToolbar >

    <CoreDrawerProfile :isTeacher='isTeacher' @drawerLogout="drawerEmitLogout" @drawerExit="drawerEmitExit" v-if='drawerProfile'></CoreDrawerProfile>
    <CoreDrawerLogin @loginSuccess="loginEmitSuccess"    @drawerExit="drawerEmitExit" v-if='drawerLogin' ></CoreDrawerLogin>
    <CoreDrawerRegister @drawerExit="drawerEmitExit" v-if='drawerRegister'></CoreDrawerRegister>

    <core-view />

    <CoreFooter/>

  </v-app>
</template>

<script>
  import { media } from './api/config.js'
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
        userData: {},
        isLogin: false,
        isTeacher: false
      }
    },
    created: function () {
      if(this.$cookies.get('userData')!=null) {
        this.userData = this.$cookies.get('userData')
      } else {
        this.userData = {}
      }
      if(this.$cookies.get('isTeacher')!=null) {
        this.isTeacher = this.$cookies.get('isTeacher') == 'true'
      } else {
        this.isTeacher = false
      }
      if(this.$cookies.get('isLogin')) {
        this.isLogin = this.$cookies.get('isLogin') == 'true'
      } else {
        this.isLogin = false
      }
    },
    methods: {
      drawerEmitProfile: function () {
        this.drawerProfile = true
        this.drawerLogin = false
        this.drawerRegister = false
      },
      drawerEmitLogin: function () {
        this.drawerProfile = false
        this.drawerLogin = true
        this.drawerRegister = false
      },
      drawerEmitRegister: function () {
        this.drawerProfile = false
        this.drawerLogin = false
        this.drawerRegister = true
      },
      drawerEmitExit: function () {
        this.drawerProfile = false
        this.drawerLogin = false
        this.drawerRegister = false
      },
      loginEmitSuccess: function (data, isTeacher) {
        console.log(isTeacher)
        data.avt = media(data.avt)
        this.$cookies.set('userData',data)
        this.$cookies.set('isTeacher',isTeacher)
        this.$cookies.set('isLogin',true)
        this.userData = data
        this.isTeacher = isTeacher
        this.isLogin = true
        this.drawerProfile = false
        this.drawerLogin = false
        this.drawerRegister = false
      },
      drawerEmitLogout: function () {
        this.$cookies.remove('userData')
        this.$cookies.remove('isTeacher')
        this.$cookies.remove('isLogin')
        this.userData = {}
        this.isTeacher = false
        this.isLogin = false
        this.drawerProfile = false
        this.drawerLogin = false
        this.drawerRegister = false
      }
    },

  }
</script>
