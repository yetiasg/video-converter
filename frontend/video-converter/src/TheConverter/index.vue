<template>
  <div class="converter">
    <h3>The converter</h3>
    <base-button>Wyślij</base-button>
  </div>
</template>

<script>
import BaseButton from './../components/BaseComponenets/BaseButton.vue';
export default {
  components: {
    BaseButton
  }
}
</script>

<style scoped>
  .converter{
    width:100%;
    height: 100vh;
    background-color: bisque;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>