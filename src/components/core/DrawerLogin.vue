<template>
  <v-navigation-drawer
    fixed
    right
    app
  >
    <v-toolbar dark color='success'>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{nameForm}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field name='login' v-model='email' label='Email' type='text' :rules='[rules.required,rules.emailRules]'></v-text-field>
        <v-text-field name='password' v-model='password' label='Password' type='password' :rules='[rules.required, rules.min]' v-on:keyup='passWordPressEnter'></v-text-field>
      </v-form>
    </v-card-text>
    <v-switch class='ma-3 pa-0' v-model='isTeacher' label='Teacher'></v-switch>
    <v-alert :value='loginFail' type='error'>
      {{messageAlert}}
    </v-alert>
    <v-progress-linear v-if='processing' color='success' :indeterminate='true'></v-progress-linear>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color='success' large @click='login'>Login</v-btn>
      <v-btn color='warning' large @click='exit'>Close</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-navigation-drawer>
</template>

<script>
  import {rules} from '../../api/config.js'
  import userApi from '../../api/user.js'
  import teacherApi from '../../api/teacher.js'
  export default {
    data: () => ({
      processing: false,
      messageAlert: '',
      loginFail: false,
      email: '',
      password: '',
      isTeacher: false,
      rules: rules
    }),
    computed: {
      nameForm: function () {
        if(this.isTeacher) {
          return 'Teacher Register'
        } else {
          return 'User Register'
        }
      }
    },
    methods: {
      passWordPressEnter: function (e) {
        if (e.keyCode === 13) {
          this.login()
        }
      },
      login: async function () {
        this.loginFail = false
        this.processing = true
        let res = {}
        if (this.isTeacher) {
          res = await teacherApi.login(this.email,this.password)
        } else {
          res = await userApi.login(this.email,this.password)
        }
        let result = res.data
        if (result.isSuccessfully) {
          this.$emit('loginSuccess', result.data.userInfo, this.isTeacher)
          this.$router.push('/home')
        } else {
          this.loginFail = true
          this.messageAlert = result.message
        }
        this.processing = false
      },
      exit: function () {
        this.$emit('drawerExit')
      }
    }
  }
</script>
