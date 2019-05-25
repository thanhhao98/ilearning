<template>
<v-container>
  <v-progress-linear v-if='processing' color='success' :indeterminate='true'></v-progress-linear>
  <v-alert
      v-model="addSuccess"
      dismissible
      type="success"
    >
    Add docuemnt successfully
  </v-alert>
  <v-alert
      v-model="addFail"
      dismissible
      type="error"
    >
    {{message}}
  </v-alert>
  <form>
      <v-text-field label='Title' class="ma-3 pt-3" v-model="title">
  </v-text-field>
  <v-text-field label='Description' class="ma-3 pa-0" v-model="description">
  </v-text-field>
  <div class="large-12 medium-12 small-12 cell ml-4">
    <label>File
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" accept="document/*"/>
    </label>
  </div>
      <v-btn @click="submit()">Add document</v-btn>
      <v-btn @click="cancle()">Cancle</v-btn>
  </form>

</v-container>
</template>
<script>
  import { media,teacherApi } from '../api/config.js'
  import axios from 'axios'
  export default {
    props: ['id'],
    data: () => ({
      title: '',
      processing : false,
      description:'',
      file: '',
      token: '',
      addSuccess: false,
      addFail: false,
      message: '',
    }),
    methods:{
      submit: function(){
        this.processing = true
        this.addFail = false
        this.addSuccess = false
        let formData = new FormData()
        formData.append('courseId', this.id)
        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('document', this.file)
        if(this.$cookies.get('userData')==null){
          this.$router.push('/')
        }
        this.token = 'thanhhao ' + this.$cookies.get('userData').token
        axios.post(teacherApi('createDocument'), formData,
            {
            headers: {
                'Authorization':
                this.token,
                'Content-Type': 'multipart/form-data'
            }
            }
        ).then(
          res => {
            if(res.data.isSuccessfully){
              this.addSuccess = true
              this.processing = false
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
      handleFileUpload () {
        this.file = this.$refs.file.files[0]
      },
      cancle:function(){
        let path = '/teacher/detailCourse/' + this.id.toString()
        this.$router.push(path)
      }
    }
  }
</script>
