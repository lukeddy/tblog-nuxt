<template>
  <div class="loader" v-once>
    <div class="loader-content">
      <img class="loader-logo" src="../assets/tblog-leaf-logo3.png">
      <p class="loader-tip">
        {{ messages | randomize }}
      </p>
      <div class="spinner loader-spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preload',
  data() {
    return {
      messages: [
        '学而不思则罔，思而不学则殆。',
        '温故而知新，可以为师矣。',
        '知之者不如好知者，好之者不如乐之者。',
        '三人行必有我师焉，择其善者而从之，其不善者而改之。',
        '学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎。',
      ],
    };
  },
  filters: {
    randomize(messages) {
      if (!messages) return '';
      const randomMessage = Math.floor(Math.random() * messages.length);
      return messages[randomMessage];
    },
  },
};
</script>
<style scoped>
  .loader {
    position: absolute;
    z-index: 100000;
    background-color: #fff;
    width: calc(100%);
    height: calc(100vh);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .loader-content {
    text-align: center;
    max-width: 400px
  }

  .loader-logo {
    max-width: 220px;
    height:auto;
  }

  .loader-tip {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 1.2;
    margin-top: 10px;
    margin-bottom: 16px;
    color: #616161
  }

  .loader-spinner {
    display: inline-block
  }

  .spinner,
  .spinner:after {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  .spinner {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-left-color: #ff512f;
    transform: translateZ(0);
    animation: spin 1.1s infinite linear;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
