<template>
  <v-layout justify-center class="mt-4">
    <v-flex xs12 sm8>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>My Courses</v-toolbar-title>
      </v-toolbar>
      <v-alert v-if='emptyCard'
        :value="true"
        type="warning"
      >
        You have 0 course
      </v-alert>
      <v-progress-linear v-if='prcessing' color='success' :indeterminate='true'></v-progress-linear>
      <v-card flat>
        <v-container>
          <v-layout row wrap>
            <v-flex
              v-for="(course,index) in list_course"
              :key="index"
              xs6
            >
              <v-layout class="blue-grey--text mx-3 my-4">
                <v-img
                  :src="mediaUrl(course.image)"
                  height="130px"
                  max-width="200px"
                ></v-img>
                <v-card-title primary-title class="pa-0 ml-3">
                  <div>
                    <v-card-text class="blue--text headline pa-0 text-truncate">{{titleFix(course.title,21)}}</v-card-text>
                    <v-card-text class="pa-0 text-truncate">{{titleFix(course.description,25)}}</v-card-text>
                      <v-icon>mdi-account-circle</v-icon> {{course.name}}
                    <br>
                    <v-icon>mdi-calendar</v-icon>{{course.date}}
                    <v-card-actions class="pa-0">
                      <v-btn color="green" @click="onDetailCourse(course.id)">Detail</v-btn>
                    </v-card-actions>
                  </div>
                </v-card-title>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import { media,teacherApi } from '../api/config.js'


  export default {
    name: 'MyCourse',
    data: () => ({
      emptyCard: false,
      prcessing : false,
      list_course: [],
      token: ''
    }),
    created: function () {
      this.emptyCard = false
      this.prcessing = true
      if(this.$cookies.get('userData')==null){
        this.$router.push('/')
        return
      }
      this.token = 'thanhhao ' + this.$cookies.get('userData').token
      axios.get(teacherApi('listCourse'),
        {
          headers:
              {
                'Authorization':
                this.token
              }
        }).then(
        res => {
          if (res.data.isSuccessfully){
            this.list_course = res.data.data.courseList
            if(this.list_course.length == 0){
              this.emptyCard = true
            }
            this.list_course.forEach(function (course) {
              course.date = moment(course.date).format('MM/DD/YYYY')
            })
            this.prcessing = false
          } else {
            this.$router.push('/')
          }
        }
      ).catch(error=>{
        this.$router.push('/')
      })
    },
    methods: {
      titleFix: function(title,num){
        if(title.length > num){
          return title.slice(0,num-4) + ' ...'
        }
        return title
      },
      mediaUrl: function(url){
        return media(url)
      },
      onDetailCourse: function (id) {
        this.$router.push('detailCourse/' + id.toString())
      }
    }
  }
</script>
