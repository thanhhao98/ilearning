<template>
  <v-container>
    <v-progress-linear v-if='processing' color='success' :indeterminate='true'></v-progress-linear>
    <v-alert
        v-model="addSuccess"
        dismissible
        type="success"
      >
      Add video successfully
    </v-alert>
    <v-alert
        v-model="addFail"
        dismissible
        type="error"
      >
      {{message}}
    </v-alert>
    <form>
    <v-text-field label='Title' class="ma-3 pt-3" v-model="title_video">
    </v-text-field>
    <v-text-field label='Description' class="ma-3 pa-0" v-model="description_video">
    </v-text-field>
    <v-text-field label='Path' class="ma-3 pa-0" v-model="path_video">
    </v-text-field>

        <v-btn @click="submit()">Add Video</v-btn>
        <v-btn @click="cancle()">Cancle</v-btn>
    </form>

  </v-container>
</template>
<script>
  import axios from 'axios'
  import { media,teacherApi } from '../api/config.js'

  export default {
    props: ['id'],
    data: () => ({
      processing: false,
      title_video: '',
      description_video:'',
      path_video: '',
      addSuccess: false,
      addFail: false,
      message: '',
      token: '',
    }),
    methods:{
      submit: function(){
        this.processing = true
        this.addFail = false
        this.addSuccess = false
        if(this.$cookies.get('userData')==null){
          this.$router.push('/')
        }
        this.token = 'thanhhao ' + this.$cookies.get('userData').token
        axios.post(teacherApi('createVideo'), {
          courseId: this.id,
          title: this.title_video,
          path: this.path_video,
          description: this.description_video
        },
        {
          headers: {
              'Authorization':
              this.token
          }
        }
        ).then(
          res => {
            if(res.data.isSuccessfully){
              this.processing = false
              this.addSuccess = true
            }
            else {
              this.processing = false
              this.message = res.data.message
              this.addFail = true
            }
          }
        ).catch(error=>{
            this.processing = false
            this.addFail = true
            this.message = error
          }
        )
      },
      cancle:function(){
        let path = '/teacher/detailCourse/' + this.id.toString()
        this.$router.push(path)
      }
    }
  }
</script>
