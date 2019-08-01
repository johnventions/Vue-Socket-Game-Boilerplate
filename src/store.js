import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: '',
		loggedIn: 0, // bool for logged in
		user: '',
		code: '',
		admin: 0,
		gameID: null,
		started: false,

	},
	mutations: {
		setLogin(state, data) {
			state.loggedIn = 1;
			state.user = data.player.name;
			state.admin = data.player.admin;
		},
		setGame(state, game) {
			state.gameID = game._id;
			state.started = game.started;
			state.code = game.code;
		}
	},
	getters: {
		status: state => {
			return {
				loggedIn: state.loggedIn,
				user: state.user,
				code: state.code,
				admin: state.admin
			}
		}
	},
	actions: {

	}
})