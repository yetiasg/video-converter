<template>
  <div class="converter">
    <h3>The converter</h3>
    <h4>{{response}}</h4>
    <form enctype="multipart/form-data" @submit.prevent>
      <input type="file" id="file"  ref="file" @change="onSelect">
      <div class="buttons">
        <base-button @click="uploadFile" mode="filledBtn" >Wyślij</base-button>
        <base-button @click="convertFile" mode="greenBtn" >Konwertuj</base-button>
        <base-button @click="downloadConvertedFile" mode="greenBtn" >Pobierz</base-button>
      </div>
    </form>
    <p v-if="url"><a :href="url">download video</a></p>
    <p>{{text}}</p>
  </div>
</template>

<script>
import BaseButton from './../components/BaseComponenets/BaseButton.vue';
export default {
  components: {
    BaseButton
  },
  data(){
    return{
      response: null,
      file: "",
      url: null,
      text: null
    }
  },
  methods: {
    onSelect(){
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async uploadFile(){
      const formData = new FormData();
      formData.append('file', this.file);
      try{
        await fetch('http://localhost:3000/uploadFile', {
          method: 'POST',
          headers: {
            'Accept': 'multipart/form-data'
          },
          credentials: 'include',
          body: formData
        })
      }catch (error){
        console.log(error)
      }

    },
    async convertFile(){
      await fetch('http://localhost:3000/convert', {
        method: 'GET',
        credentials: 'include',
      }
    )},
    async downloadConvertedFile(){
      const response = await fetch('http://localhost:3000/download', {
        method: 'GET',
        credentials: 'include',
      })
      if(!response.ok) return;
      const blob = await response.blob();
      this.url =URL.createObjectURL(blob);
      open(this.url)
      // window.location.href = url

    }
  }
}
</script>

<style scoped>
  .converter{
    width:100%;
    height: 100vh;
    background-color: rgb(245, 245, 245);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  form{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
</style>