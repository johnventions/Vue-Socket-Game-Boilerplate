import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: '',
		loggedIn: 0, // bool for logged in
		user: '',
		userID: '',
		code: '',
		admin: 0,
		gameID: null,
		started: false,
		players: []

	},
	mutations: {
		setup(state, payload) {
			console.log("Setup");
			this.commit('setLogin', payload.player);
			this.commit('setGame', payload.game);
			this.commit('setPlayers', payload.players)
		},
		setLogin(state, player) {
			state.loggedIn = 1;
			state.user = player.name;
			state.userID = player._id;
			state.admin = player.admin;
		},
		setGame(state, game) {
			state.gameID = game._id;
			state.started = game.started;
			state.code = game.code;
		},
		setPlayers(state, players) {
			state.players = players;
		}
	},
	getters: {
		status: state => {
			return {
				loggedIn: state.loggedIn,
				user: state.user,
				userID: state.userID,
				code: state.code,
				admin: state.admin
			}
		},
		players: state => {
			return state.players;
		}
	},
	actions: {

	}
})