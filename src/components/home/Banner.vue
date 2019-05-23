<template>
  <base-card dark>
    <v-img
      class="grey lighten-2"
      height="400"
      width="100%"
      :src="require('@/assets/baner.jpeg')"
    >
      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          xs12
          md7
          offset-md5
        >
          <h1 class="display-3 font-weight-light">
            Learn on your schedule
          </h1>
          <div class="subheading text-uppercase pl-2 mb-4">
            Study any topic, anytime. Choose from thousands of course now!
          </div>
        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
</template>
