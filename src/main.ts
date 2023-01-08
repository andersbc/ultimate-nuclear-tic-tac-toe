import { createApp } from "vue";
import App from "./App.vue";

// Global event emitter, solely use to change page background
// image from TicTacToe.vue
import mitt from "mitt";
const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.mount("#app");
