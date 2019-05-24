<template>
  <v-layout justify-center>
    <v-flex xs12 sm8>
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-progress-linear v-if='processing' color='success' :indeterminate='true'></v-progress-linear>
          <v-alert v-if='emptyCard'
            :value="true"
            type="warning"
          >
            You have 0 course
          </v-alert>
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              :key="card.title"
              v-bind="{ [`xs3`]: true }"
            >
              <v-card>
                <v-img
                  :src="mediaUrl(card.image)"
                  height="200px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    flat
                    @click="quickLook(card.id)"
                  >
                    Quick look
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import { media } from '../api/config.js'
  import userApi from '../api/user.js'
  export default {
    data: () => ({
      emptyCard: false,
      processing: false,
      cards: [
      ]
    }),
    async mounted () {
      this.processing = true
      if(this.$cookies.get('userData')==null){
        this.$router.push('/')
        return
      }
      let result = await userApi.listWaiting(this.$cookies.get('userData').token)
      if(result.data.isSuccessfully){
        this.cards = result.data.data.listCourse
        this.processing = false
        this.emptyCard = this.cards.length == 0
      } else {
        this.$router.push('/')
      }
    },
    methods: {
      mediaUrl: function(url){
        return media(url)
      },
      quickLook: function (id) {
        this.$router.push('/quickLookCourse/'+id)
      },
    },
  }
</script>
