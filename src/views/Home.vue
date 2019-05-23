<template>
  <div id="home">
    <articles
      :courses='courseWithCategories'
    >
      <banner />
      <v-spacer></v-spacer>
      <v-tabs
        v-model='tab'
        color="blue lighten-5"
        align-with-title
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </articles>
    <subscribe />
  </div>
</template>

<script>
  import homeApi from '../api/home.js'
  export default {
    name: 'Home',
    data: () => ({
      courses: [
      ],
      tab: null,
      items: [
      ],
    }),
    components: {
      Articles: () => import('@/components/home/Articles'),
      Banner: () => import('@/components/home/Banner'),
      Subscribe: () => import('@/components/home/Subscribe')
    },
    computed: {
      courseWithCategories: function () {
        return this.courses.filter(course => course.category == this.items[this.tab])
      }
    },
    async mounted () {
      let result = await homeApi.listCourses()
      this.courses = result.data.data.courseList
      this.items = result.data.data.categories
    }
  }
</script>
