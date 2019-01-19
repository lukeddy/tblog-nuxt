<template>
    <div>
        <Header/>
        <Main/>
    </div>
</template>
<script>
import Header from './Navbar';
import Main from './Main';

export default {
  name: 'Home',
  components: {
    Header,
    Main,
  }
}
</script>

