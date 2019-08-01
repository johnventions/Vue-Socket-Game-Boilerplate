import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home.vue'
import Create from './views/Create/Create.vue'
import Join from './views/Join/Join.vue'
import Lobby from './views/Lobby/Lobby.vue'
import Game from './views/Game/Game.vue'

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/create',
		name: 'create',
		component: Create
	},
	{
		path: '/join',
		name: 'join',
		component: Join
	},
	{
		path: '/lobby',
		name: 'lobby',
		component: Lobby,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/game',
		name: 'game',
		component: Game,
		meta: {
			requiresAuth: true
		}
	}
	],
	scrollBehavior(to, from, savedPosition) {
		return new Promise(resolve => {
			setTimeout(() => {
				if (savedPosition) {
					resolve(savedPosition);
				} else {
					resolve({
						x: 0,
						y: 0
					});
				}
			}, 600);
		});
	}
})