<template>
  <v-navigation-drawer
    v-model='drawer'
    fixed
    right
    app
  >
    <v-toolbar dark color='error'>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{nameForm}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field :rules='[rules.required]' v-model='fullname' label='Full name' class='ma-3 pt-3'></v-text-field>
        <v-text-field :rules='[rules.required]' v-model='username' label='Username' class='ma-3 pa-0'></v-text-field>
        <v-text-field :rules='[rules.required,rules.emailRules]' v-model='email' label='Email' class='ma-3 pa-0' ></v-text-field>
        <v-text-field :rules='[rules.required,rules.min]' v-model='password' label='Password' class='mx-3 pa-0' type='password'></v-text-field>
        <v-text-field :rules='[rules.required,rules.min]' v-model='rePassword' label='Re-password' class='mx-3 pa-0' type='password'></v-text-field>
        <div class="large-12 medium-12 small-12 cell ml-4">
          <label>Avatar
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" accept="image/*"/>
          </label>
        </div>

      </v-form>
    </v-card-text>
    <v-switch class='ma-3 pa-0' v-model='isTeacher'isUser label='Teacher'></v-switch>
    <v-alert :value='registerFail' type='error'>
      {{messageAlert}}
    </v-alert>
    <v-alert :value='registerSuccess' type='success'>
      Account create successfully
    </v-alert>
    <v-progress-linear v-if='processing' color='success' :indeterminate='true'></v-progress-linear>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color='success'  large @click='register'>Register</v-btn>
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
    props: ['drawer'],
    data: () => ({
      registerSuccess: false,
      processing: false,
      messageAlert: '',
      registerFail: false,
      fullname: '',
      username: '',
      email: '',
      password: '',
      rePassword: '',
      isTeacher: false,
      rules: rules,
      file: null
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
      register: async function () {
        this.registerSuccess = false
        this.registerFail = false
        this.processing = true
        if (this.password !== this.rePassword) {
          this.messageAlert = 'Password and re-password are difference!'
          this.registerFail = true
          this.processing = false
          return
        }
        let formData = new FormData()
        formData.append('avt', this.file)
        formData.append('name', this.fullname)
        formData.append('username', this.username)
        formData.append('email', this.email)
        formData.append('password', this.password)
        let res = {}
        if (this.isTeacher) {
          res = await teacherApi.register(formData)
        } else {
          res = await userApi.register(formData)
        }
        let result = res.data
        if (result.isSuccessfully) {
          this.registerSuccess = true
        } else {
          this.registerFail = true
          this.messageAlert = result.message
        }
        this.processing = false
      },
      handleFileUpload () {
        this.file = this.$refs.file.files[0]
        console.log(this.file)
      },
      exit: function () {
        this.$emit('drawerExit')
      }
    }
  }
</script>

