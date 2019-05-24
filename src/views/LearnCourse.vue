<template>
<v-flex>
  <div  style="position: fixed; left:400px; top:100px;">
   <iframe v-if = "showV" id = "video" width="700" height="400"
   src = ""
   frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
   allowfullscreen></iframe>
   <pdf v-if= "showD" src="./src/Document/N33-TTCNPM.pdf"></pdf>
    <!-- vẫn chưa render đc file pdf :( -->

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


        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title style="color: blue">Video</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="(admin, i) in data.listVideo"
            :key="i"
            @click="showVideo(admin)"
          >
            <v-list-tile-title v-text="admin.title"></v-list-tile-title>
            <!-- <v-list-tile-action>
              <v-icon v-text="ádsad"></v-icon>
            </v-list-tile-action> -->
          </v-list-tile>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Document</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(crud, i) in data.listDocument"
            :key="i"
            @click="showDocument(crud)"
          >
            <v-list-tile-title v-text="crud.title"></v-list-tile-title>
            <!-- <v-list-tile-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-tile-action> -->
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
      showV: false,
      showD: false,
      data: {
      }
    }),
    async mounted () {
      let res = await userApi.learnCourse(this.id,this.$cookies.get('userData').token)
      if(res.data.isSuccessfully){
        this.data = res.data.data
        console.log(this.data)
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
      showDocument: function(ru){
        this.showD = true
        this.showV = false
      },
    }
  }
</script>

