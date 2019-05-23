<template>
  <v-flex
    xs12
    :class="classes"
  >
    <base-card
      :height="value.prominent ? 450 : 350"
      color="grey lighten-1"
      dark
      href="#!"
    >
      <v-img
        :src="image"
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-layout
          fill-height
          wrap
          text-xs-right
          ma-0
        >
          <v-flex xs12>
            <v-chip
              label
              class="mx-0 mb-2 text-uppercase"
              color="grey darken-3"
              text-color="white"
              large
              @click.stop=""
            >
              {{ value.category }}
            </v-chip>
            <h2 class="title font-weight-bold mb-2">
              {{ value.title }}
            </h2>
            <div class="caption">
              {{ value.name }}
            </div>
          </v-flex>
          <v-flex align-self-end>
            <v-btn color="primary" @click='quickLook'>Quick Look</v-btn>
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  color="red lighten-2"
                  dark
                  v-on="on"
                  @click='signCourse'
                >
                  Sign course
                </v-btn>
              </template>

              <v-card>


                <v-card-text>
                  <v-alert :value='signFail' type='error'>
                    {{messageAlert}}
                  </v-alert>
                  <v-alert :value='signSuccess' type='success'>
                    User sign this course successfully
                  </v-alert>
                  <v-progress-linear v-if='processing' color='success' :indeterminate='true'></v-progress-linear>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    flat
                    @click="dialog = false"
                  >
                    Exit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-img>
    </base-card>
  </v-flex>
</template>

<script>
  import { media } from '../api/config.js'
  import userApi from '../api/user.js'
  export default {
    props: ['size','value','isAssign','userData'],
    data () {
      return {
        messageAlert: '',
        signSuccess: false,
        signFail: false,
        processing: false,
        dialog: false
      }
    },
    computed: {
      image: function () {
        return media(this.value.image)
      },
      classes () {
        return {
          'md6': this.size === 2,
          'md4': this.size === 3
        }
      }
    },
    methods: {
      quickLook: function () {
        this.$router.push('/quickLookCourse/'+this.value.id)
      },
      signCourse: async function(){
        this.signFail = false
        this.signSuccess = false
        this.processing = true
        let res = await userApi.signCourse(this.value.id,this.$cookies.get('userData').token)
        if(res.data.isSuccessfully){
          this.signSuccess  = true
        } else {
          this.signFail = true
          this.messageAlert = res.data.message
        }
        this.processing = false
      }
    },
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
</style>
