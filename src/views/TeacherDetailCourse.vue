<template>
  <v-layout justify-center class="mt-4">
    <v-flex xs12 sm8>
      <v-progress-linear v-if='prcessing' color='success' :indeterminate='true'></v-progress-linear>
      <v-layout row>
        <v-img
          :src="mediaUrl(course.image)"
          height="260px"
          max-width="400px"
        ></v-img>
        <v-card-title primary-title class="pa-0 ml-3">
          <div>
            <v-card-text class="blue--text headline pa-0 text-truncate">{{course.title}}</v-card-text>
            <v-card-text class="pa-0 text-truncate">{{course.description}}</v-card-text>
            <v-icon>mdi-account-circle</v-icon>
            {{course.name}}
            <br>
            <v-icon>mdi-calendar</v-icon>
            {{date}}
          </div>
        </v-card-title>
      </v-layout>
      <div>
        <v-card>
          <v-toolbar
            color="cyan"
            dark
            tabs
            class="mt-3"
          >
            <template>
              <v-tabs
                v-model="tab"
                color="cyan"
                grow
              >
                <v-tabs-slider color="yellow"></v-tabs-slider>

                <v-tab
                  v-for="item in items"
                  :key="item"
                >
                  {{ item }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="item in items"
              :key="item"
            >
              <v-card flat>
                <div v-if='item === "users assign"'>
                 <!--TODO: UI list users assign-->
                </div>
                <div v-else-if='item === "documents"'>
                      <!--TODO: UI list documents-->
                </div>
                <div v-else>
                  <!--TODO: UI list video-->
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>

    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import { media,teacherApi } from '../api/config.js'
  export default {
    name: 'DetailCourse',
    data: () => ({
      prcessing: false,
      tab: null,
      id: '',
      course: '',
      items: [
        'documents', 'videos', 'Users waiting'
      ],
      token: '',
      list_user_assign: [],
      list_document: [],
      list_video: []
    }),
    computed: {
      date: function(){
        return this.course.date.slice(0,10)
      }
    },
    methods: {
      mediaUrl: function(url){
        return media(url)
      },
    },
    created: function () {
      this.prcessing = true
      this.id = this.$route.params.id
      if(this.$cookies.get('userData')==null){
        this.$router.push('/')
      }
      this.token = 'thanhhao ' + this.$cookies.get('userData').token
      let getUserAssignPath =  teacherApi('listUserWaitingInCourse/') + this.id
      axios.get(getUserAssignPath, {
        headers:
            {
              'Authorization':
              this.token
            }
      }).then(
        res => {
          if(res.data.isSuccessfully){
            this.list_user_assign = res.data.data.listUserAssign
          } else {
            this.$router.push('/')
          }
        }
      ).catch(error=>{
        this.$router.push('/')
      })
      let getInfoCourse = teacherApi('viewCourse/') + this.id
      axios.get(getInfoCourse, {
        headers:
          {
            'Authorization':
            this.token
          }
      }).then(
        res => {
          if(res.data.isSuccessfully){
            this.course = res.data.data.courseInfo
            this.list_document = res.data.data.listDocument
            this.list_video = res.data.data.listVideo
          } else {
            this.$router.push('/')
          }
        }
      ).catch(error=>{
        this.$router.push('/')
      })
      this.prcessing = false
    }
  }
</script>
