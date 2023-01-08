<template>
  <img
    alt="logo"
    src="./assets/logo.png"
    width="300"
    :class="[bombed ? 'bombed-logo' : 'logo']"
  />
  <HelloWorld msg="The Ultimate Nuclear TIC-TAC-TOE" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import useEmitter from "@/composables/useEmitter";
import HelloWorld from "@/components/HelloWorld.vue";
const bombed = ref(false);

const emitter = useEmitter();

// remove background image from page
emitter.on("gameStarted", (val: string) => {
  const body = document.getElementsByTagName("body")[0];
  body.style.backgroundImage = "none";
  bombed.value = false;
});

// add background image to page
emitter.on("winner", (val: string) => {
  const body = document.getElementsByTagName("body")[0];
  body.style.backgroundImage =
    "url('" + process.env.BASE_URL + "bomb.webp" + "')";
  bombed.value = true;
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
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
.bombed-logo {
  opacity: 0.4;
  filter: invert(100%);
}

.logo {
}
</style>
