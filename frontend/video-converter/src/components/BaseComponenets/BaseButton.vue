<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
      default: 'filledBtn'
    }
  }
}
</script>

<style scoped>
  .filledBtn{
    border: none;
    border-radius: 10px;
    background-color: black;
    color: white;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
  }

  .filledBtn:hover{
    background-color: rgb(48, 48, 48);
  }
</style>