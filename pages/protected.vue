<template>
    <h1>我是受保护页面</h1>
</template>

<script>
    export default {
        middleware: 'authenticated',
    }
</script>
