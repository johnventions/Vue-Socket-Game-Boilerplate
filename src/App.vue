<template>
	<div id="app">
		<router-view />
	</div>
</template>
<style lang="stylus" src="./app.styl"></style>
<script>
export default {
	name: "app",
	data: () => {
		return {};
	},
	components: {},
	computed: {
		gameCode () {
			return this.$store.state.code
		}
	},
	mounted: function() {
		console.log(this.$socket);
		this.sockets.subscribe("NewPlayer", players => {
			this.$store.commit('setPlayers', players);
		});

		this.sockets.subscribe("StartGame", () => {
			this.$router.push("/game");
		});

		//reconnect logic
		this.$socket.on("reconnect", function() {
			console.log("Reconnected!");
			if (this.gameCode) {
				this.joinRoom(this.gameCode);
			}
		}.bind(this));

		//disconnect logic
		this.$socket.on("disconnect", () => {
			console.log("Disconnected!");
		});
	},
	methods: {
	}
};
</script>