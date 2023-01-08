<template>
  <img alt="logo" src="./assets/logo.png" width="300" style="opacity: 0.6" />
  <HelloWorld msg="The Ultimate Nuclear TIC-TAC-TOE" />
</template>

<script setup lang="ts">
import useEmitter from "@/composables/useEmitter";
import HelloWorld from "@/components/HelloWorld.vue";

const emitter = useEmitter();
emitter.on("gameStarted", (val: string) => {
  const body = document.getElementsByTagName("body")[0];
  body.style.backgroundImage = "none";
});
emitter.on("winner", (val: string) => {
  const body = document.getElementsByTagName("body")[0];
  body.style.backgroundImage =
    "url('" + process.env.BASE_URL + "bomb.webp" + "')";
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  /* background-image: url("~@/assets/bomb.webp"); */
  /* background-image: v-bind("img"); */
  /* background-image: url(v-bind("img"));*/
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
</style>
