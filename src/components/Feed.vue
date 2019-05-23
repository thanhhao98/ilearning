<template>
  <v-container
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex xs12>
        <slot />
      </v-flex>

      <feed-card
        v-for="(article, i) in paginatedCourses"
        :key="article.title"
        :size="layout[i]"
        :value="article"
        :userData="userData"
        :isAssign='isAssign'
      />
    </v-layout>

    <v-layout align-center>
      <v-flex xs3>
        <base-btn
          v-if="page !== 1"
          class="ml-0"
          title="Previous page"
          square
          @click="page--"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </base-btn>
      </v-flex>

      <v-flex
        xs6
        text-xs-center
        subheading
      >
        PAGE {{ page }} OF {{ pages }}
      </v-flex>

      <v-flex
        xs3
        text-xs-right
      >
        <base-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          title="Next page"
          square
          @click="page++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </base-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Feed',
    props: ['courses'],
    components: {
      FeedCard: () => import('@/components/FeedCard')
    },

    data: () => ({
      layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
      page: 1,
      userData: {},
      isLogin: false,
      isTeacher: false,
      isAssign: false,

    }),

    created: function () {
      if(this.$cookies.get('userData')!=null) {
        this.userData = this.$cookies.get('userData')
      } else {
        this.userData = {}
      }
      if(this.$cookies.get('isTeacher')!=null) {
        this.isTeacher = this.$cookies.get('isTeacher') == 'true'
      } else {
        this.isTeacher = false
      }
      if(this.$cookies.get('isLogin')) {
        this.isLogin = this.$cookies.get('isLogin') == 'true'
      } else {
        this.isLogin = false
      }
      if(this.isLogin){
        if(this.isTeacher){
          this.isAssign = false
        } else {
          this.isAssign = true
        }
      } else {
        this.isAssign = false
      }
    },

    computed: {
      pages () {
        return Math.ceil(this.courses.length / 11)
      },
      paginatedCourses () {
        const start = (this.page - 1) * 11
        const stop = this.page * 11
        return this.courses.slice(start, stop)
      }
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      }
    },
  }
</script>
