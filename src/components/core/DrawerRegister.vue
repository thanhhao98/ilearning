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
        <v-text-field label='Full name' class='ma-3 pt-3'>
        </v-text-field>
        <v-text-field label='Username' class='ma-3 pa-0'>
        </v-text-field>
        <v-text-field label='Email' class='ma-3 pa-0' >
        </v-text-field>
        <v-text-field label='Password' class='mx-3 pa-0' type='password'>
        </v-text-field>
        <v-text-field label='Re-password' class='mx-3 pa-0' type='password'>
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-switch class='ma-3 pa-0' v-model='isTeacher'isUser label='Teacher'></v-switch>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color='success'  large>Login</v-btn>
      <v-btn color='warning' large @click='exit'>Exit</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: ['drawer'],
    data: () => ({
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
      exit: function(){
        this.$emit('drawerExit')
      }
    }
  }
</script>

