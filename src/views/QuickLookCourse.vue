<template>
  <div id="quicklook"
    v-ripple
    class="text-xs-center elevation-2 pa-5 headline"
  >
    <v-timeline align-top>
      <v-timeline-item
          color="red lighten-2"
          icon="mdi-star"
          fill-dot
        >
          <v-card
            color="red lighten-2"
            dark
          >
            <v-card-title class="title">Teacher</v-card-title>
            <v-card-text class="white text--primary">
              <p>Name: {{AdminInfo.name}}</p><br/>
              <p>Email: {{AdminInfo.email}}</p><br/>
            </v-card-text>
          </v-card>
      </v-timeline-item>
      <v-timeline-item
          color="indigo"
          icon="mdi-buffer"
          fill-dot
        >
          <v-card
            color="indigo"
            dark
          >
            <v-card-title class="title">Course</v-card-title>
            <v-card-text class="white text--primary">
              <p>Title: {{course.title}}</p><br/>
              <p>Student signed: {{course.signed}}</p><br/>
            </v-card-text>
          </v-card>
      </v-timeline-item>
      <v-timeline-item
          color="purple darken-1"
          icon="mdi-book-variant"
          fill-dot
        >
          <v-card
            color="rpurple darken-1"
            dark
          >
            <v-card-title class="title">Videos</v-card-title>
            <v-card-text class="white text--primary">
              <p v-for="(video, i) in videos">{{video.title}}: {{video.description}}</p><br/>
            </v-card-text>
          </v-card>
      </v-timeline-item>
      <v-timeline-item
          color="green lighten-1"
          icon="mdi-airballoon"
          fill-dot
        >
          <v-card
            color="green lighten-1"
            dark
          >
            <v-card-title class="title">Documents</v-card-title>
            <v-card-text class="white text--primary">
              <p v-for="(document, i) in documents">{{document.title}}: {{document.description}}</p><br/>
            </v-card-text>
          </v-card>
      </v-timeline-item>

    </v-timeline>
  </div>
</template>
<script>
  import homeApi from '../api/home.js'
  export default {
    props: ['id'],
    data: () => ({
      videos: [
      ],
      documents: [
      ],
      AdminInfo: {
      },
      course: {
      }
    }),
    async mounted () {
      let result = await homeApi.quickLook(this.id)
      this.course = result.data.data.courseInfo
      this.AdminInfo = result.data.data.AdminInfo
      this.videos = result.data.data.videos
      this.documents = result.data.data.documents
    }
  }
</script>
