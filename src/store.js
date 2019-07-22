import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: '',
		loggedIn: 0, // bool for logged in
		user: '',
		code: '',
		admin: 0

	},
	mutations: {
		setLogin(state, user, code, isAdmin) {
			state.loggedIn = 1;
			state.user = user;
			state.code = code;
			state.isAdmin = isAdmin;
		}
	},
	getters: {
		status: state => {
			return {
				loggedIn: state.loggedIn,
				user: state.user,
				code: state.code,
				isAdmin: state.isAdmin
			}
		}
	},
	actions: {

	}
})