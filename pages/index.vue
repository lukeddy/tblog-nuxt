<template>
  <section class="container">
    <div class="text-center">
      <logo />
      <h1 class="title">
        tblog-nuxt
      </h1>
      <h2 class="subtitle">
        tblog nuxt version
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="btn btn-default"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="btn btn-success"
        >GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>

</style>
