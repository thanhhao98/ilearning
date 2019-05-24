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
        <div v-if='isTeacher'>
          <v-dialog v-model="dialog_course" persistent width="500">
            <template v-slot:activator="{ on }">
              <v-btn
                color="red"
                dark
                v-on="on"
              >
                Create course
              </v-btn>
            </template>
            <v-card>
              <v-card-title
                class="headline red lighten-2"
                primary-title
              >
                Ilearning - create course
              </v-card-title>
              <v-progress-linear v-if='processing' color='success' :indeterminate='true'></v-progress-linear>
              <v-text-field label='Title' class="ma-3 pt-3" v-model="title_course">
              </v-text-field>
              <v-text-field label='Description' class="ma-3 pa-0" v-model="description_course">
              </v-text-field>
              <v-flex xs6 sm6 d-flex>
                <v-select
                  v-model='cate'
                  :items="items"
                  label="Category"
                  solo
                ></v-select>
              </v-flex>
              <div class="large-12 medium-12 small-12 cell ml-4">
                <label>File
                  <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" accept="image/*"/>
                </label>
              </div>
              <v-alert
                :value="created_faile"
                type="error"
              >
                {{message}}
              </v-alert>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="create_course()"
                >
                  Create
                </v-btn>
                <v-btn
                  color="primary"
                  flat
                  @click="closeLogin()"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
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
  import axios from 'axios'
  import {teacherApi} from '../../api/config.js'
  export default {
    props: ['isLogin','userData','isTeacher'],
    data: function () {
      return {
        processing: false,
        dialog_course: false,
        created_faile: false,
        message:'',
        cate: '',
        items: [
          'Development', 'Design', 'Bussiness', 'IT & Software', 'Personal Development', 'Marketing', 'Photography', 'Music'
        ],
        title_course:'',
        description_course: '',
        category: '',
        file: null,
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
       closeLogin: function () {
        this.dialog_course = false
      },

      handleFileUpload () {
        this.file = this.$refs.file.files[0]
      },
      create_course: function () {
        this.created_faile = false
        this.processing = true
        let formData = new FormData()
        formData.append('image', this.file)
        formData.append('title', this.title_course)
        formData.append('category', this.cate)
        formData.append('description', this.description_course)
        if(this.$cookies.get('userData')==null){
          this.$router.push('/')
        }
        this.token = 'thanhhao ' + this.$cookies.get('userData').token
        axios.post(teacherApi('createCourse'), formData, {
          headers:
            {
              'Authorization':
              this.token,
              'Content-Type': 'multipart/form-data'
            }
        }).then(
          res => {
            this.created_faile = !res.data.isSuccessfully
            if (this.created_faile){
              this.processing = false
              this.created_faile = true
              this.message  = res.data.message
            } else {
              let courseId = res.data.data.courseId
              this.$router.push('/teacher/detailCourse/' + courseId)
              this.dialog_course = false
            }
          }
        ).catch(error=>{
          this.processing = false
          this.created_faile = true
          this.message = 'Create fail'
        })
      },
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
