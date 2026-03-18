import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"

// Custom Retro Pop Global Styles
import "./style.css"

createApp(App)
  .use(router)
  .mount("#app")