<template>
  <v-flex>
    <v-progress-linear v-if='processing' color='success' :indeterminate='true'></v-progress-linear>
    <div style="position: fixed; left:400px; top:100px;">
      <iframe
        v-if = "showV"
        id = "video"
        width="900"
        height="600"
        src = ""
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      >
      </iframe>
      <embed
        v-if= "showD"
        id = "document"
        src = ""
        type="application/pdf"
        width="900px"
        height="600px"
      >
    </div>

    <v-navigation-drawer permanent right="true" >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              {{data.courseInfo.title}}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-group no-action sub-group value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title style="color: blue">Video</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile v-for="(video, i) in data.listVideo" :key="i" @click="showVideo(video)">
            <v-list-tile-title v-text="video.title"></v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Document</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile v-for="(doc, i) in data.listDocument" :key="i" @click="showDocument(doc)">
            <v-list-tile-title v-text="doc.title"></v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

  </v-flex>

</template>



<script>
  import { media } from '../api/config.js'
  import userApi from '../api/user.js'
  import pdf from 'vue-pdf'
  export default {
    props: ['id'],
    components: {
        pdf
    },
    data: () => ({
      processing: false,
      showV: false,
      showD: false,
      data: {
      }
    }),
    async mounted () {
      this.processing = true
      let res = await userApi.learnCourse(this.id,this.$cookies.get('userData').token)
      if(res.data.isSuccessfully){
        this.data = res.data.data
        this.processing = false
      } else {
        this.$router.push('/')
      }
    },
    methods: {
      showVideo: function(ad){
        this.showV = true,
        this.showD = false,
        document.getElementById('video').src = ad.path
      },
      showDocument: function(doc){
        this.showD = true
        this.showV = false
        document.getElementById('document').src = media(doc.path)
      },
    }
  }

</script>

