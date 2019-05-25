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
            <v-alert v-model='approveFail' type='error' dismissible>
              {{message}}
            </v-alert>
            <v-tab-item
              v-for="item in items"
              :key="item"
            >
              <v-card flat>
                <div v-if='item === "Users waiting"'>
                  <div v-for="(user,index) in list_user_assign" :key="user.userInfo.id" row class="my-2">
                    <v-card-actions>
                      <v-list-tile-avatar color="grey darken-3">
                        <v-img
                          class="elevation-6"
                          :src="mediaUrl(user.userInfo.avt)"
                        ></v-img>
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title>{{user.userInfo.username}}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">Email: {{user.userInfo.email}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-spacer></v-spacer>
                      <v-btn color="green" @click="approveUser(user.signId,index)">Accept</v-btn>
                    </v-card-actions>
                  </div>
                  <v-divider></v-divider>
                </div>
                <div v-else-if='item === "documents"'>
                  <v-list two-line>
                    <template v-for="(item,index) in list_document">
                      <div :key="index" class="ml-3">
                      <v-card-actions >
                      <v-img :src="require('@/assets/pdf_icon.png')"
                      max-width="70px"
                      max-height="90px"></v-img>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title @click="goTo(mediaUrl(item.path))"
                          class="text-title">{{ item.title }}</v-list-tile-title>
                          <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      </v-card-actions>
                      <v-divider></v-divider>
                      </div>

                    </template>
                  </v-list>
                  <div>

                    <v-btn
                      color="red"
                      dark
                      @click="add_doc()"
                    >
                      Add Document
                    </v-btn>

                  </div>
                </div>
                 <div v-else>
                  <!--TODO: UI list video-->
                  <v-list two-line>
                    <template v-for="(item, index) in list_video">
                      <v-list-tile
                        :key="item.id"
                      >
                        <v-list-tile-content>
                          <v-list-tile-sub-title @click="goTo(mediaUrl(item.path))" class="text--primary">Title: {{ item.title }}</v-list-tile-sub-title>
                          <v-list-tile-sub-title>Description: {{ item.description }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                  <div>
                    <v-btn
                      color="red"
                      dark
                      @click="add_video()"
                    >
                      Add Video
                    </v-btn>
                  </div>
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
    props: ['id'],
    data: () => ({
      approveFail: false,
      message: '',
      prcessing: false,
      tab: null,
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
      goTo: function(url){
        window.open(url)
      },
      add_doc: function(){
        this.$router.push('/teacher/addDoc/'+this.course.id)
      },
      add_video: function(){
        this.$router.push('/teacher/addVideo/'+this.course.id)
      },
      approveUser: function (signId,index) {
        let path = teacherApi('approveSign')
        axios.put(path, {
          signId: signId,
        }, {
          headers:
              {
                'Authorization':
                this.token
              }
        }).then(
          res => {
            if(res.data.isSuccessfully){
              this.list_user_assign.splice(index, 1)
            } else {
              this.approveFail = true
              this.message = res.data.message
              console.log(res.data.message)
            }
          }
        ).catch(error=>{
          this.approveFail = true
          this.message = res.data.message
          console.log(error)
        })
      },
      mediaUrl: function(url){
        return media(url)
      },
    },
    created: function () {
      this.prcessing = true
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
