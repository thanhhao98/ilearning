<template>
  <v-layout justify-center>
    <v-flex xs12 sm8>
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
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
      cards: [
      ]
    }),
    async mounted () {
      let result = await userApi.listWaiting(this.$cookies.get('userData').token)
      this.cards = result.data.data.listCourse
      console.log(this.cards)
    },
    methods: {
      mediaUrl: function(url){
        console.log(media('url'))
        return media(url)
      },
      quickLook: function (id) {
        this.$router.push('/quickLookCourse/'+id)
      },
    },
  }
</script>
