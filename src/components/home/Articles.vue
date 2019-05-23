<template>
  <section id="feed">
    <feed
      :courses='courses'
    >
      <slot />
    </feed>
  </section>
</template>

<script>
  export default {
    props: ['courses'],
    components: {
      Feed: () => import('@/components/Feed')
    }
  }
</script>
