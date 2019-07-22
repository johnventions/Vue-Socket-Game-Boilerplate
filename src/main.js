import Vue from 'vue'
import App from './App.vue'
import router from './router'
import authGuard from './authGuard'
import VueSocketIO from 'vue-socket.io'
import store from './store'
import Axios from "axios";

require('./styles/form.styl')

router.beforeEach(authGuard);

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
	debug: true,
	connection: 'http://localhost:5050/',
}))

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')