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

  .greenBtn{
    border: none;
    border-radius: 10px;
    background-color: rgb(33, 160, 65);
    color: white;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
  }

  .greenBtn:hover{
    background-color: rgb(37, 187, 75)
  }
</style>