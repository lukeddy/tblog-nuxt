<template>
 <div></div>
</template>

<script>
    export default {
        created() {
            this.$store.dispatch('logout')
            this.$axios.setToken(null)
            this.$router.push('/login')
        }
    }
</script>

