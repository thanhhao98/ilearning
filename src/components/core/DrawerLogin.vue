<template>
  <v-navigation-drawer
    v-model='drawer'
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
        <v-text-field  name='login' v-model='email' label='Email' type='text'></v-text-field>
        <v-text-field  name='password' v-model='password' label='Password' type='password'></v-text-field>
      </v-form>
    </v-card-text>
    <v-switch class='ma-3 pa-0' v-model='isTeacher' label='Teacher'></v-switch>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color='success' large @click='login'>Login</v-btn>
      <v-btn color='warning' large @click='exit'>Exit</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-navigation-drawer>
</template>

<script>
  import userApi from '../../api/user.js'
  import teacherApi from '../../api/teacher.js'
  export default {
    props: ['drawer'],
    data: () => ({
      email: '',
      password: '',
      isTeacher: false,
    }),
    computed: {
      nameForm: function(){
        if(this.isTeacher){
          return 'Teacher Register'
        } else {
          return 'User Register'
        }
      }
    },
    methods: {
      login: async function(){
        let res = {}
        if (this.isTeacher) {
          res = await teacherApi.login(this.email,this.password)
        } else {
          res = await userApi.login(this.email,this.password)
        }
        let result = res.data
        if(result.isSuccessfully){
          this.$emit('loginSuccess',result.data.userInfo,this.isTeacher)
        } else {
          console.log(result.message)
        }
      },
      exit: function(){
        this.$emit('drawerExit')
      }
    }
  }
</script>
