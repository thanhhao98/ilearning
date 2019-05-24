<template>
  <v-layout justify-center class="mt-4">
    <v-flex xs12 sm8>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>My Courses</v-toolbar-title>
      </v-toolbar>
      <v-card>
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
                    <v-card-text class="blue--text headline pa-0 text-truncate">{{course.title}}</v-card-text>
                    <v-card-text class="pa-0 text-truncate">{{course.description}}</v-card-text>
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
        <v-card-actions class="mb-2 mx-4">
        <v-spacer></v-spacer>
        <v-btn color="red" @click="onBack()">back</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import { media } from '../api/config.js'


  export default {
    name: 'MyCourse',
    data: () => ({
      list_course: [],
      token: ''
    }),
    created: function () {
      this.token = 'thanhhao ' + this.$cookies.get('userData').token
      axios.get('https://api-ilearning.herokuapp.com/api/v1/admin/listCourse',
        {
          headers:
              {
                'Authorization':
                this.token
              }
        }).then(
        res => {
          this.list_course = res.data.data.courseList
          this.list_course.forEach(function (course) {
            course.date = moment(course.date).format('MM/DD/YYYY')
          })
        }
      )
    },
    methods: {
      mediaUrl: function(url){
        return media(url)
      },
      onBack: function () {
        // this.$router.push('/detail-course/10')
      },
      onDetailCourse: function (id) {
        this.$router.push('detailCourse/' + id.toString())
      }
    }
  }
</script>
