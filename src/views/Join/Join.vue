<template src="./Join.html"></template>
<style src="./Join.styl" lang="styl"></style>

<script>
import CookieService from "@/cookies.js";

export default {
	name: "join",
	data: () => {
		return {
			user: CookieService.getCookie("user") || "",
			code: CookieService.getCookie("code") || "",
		};
	},
	components: {},
	mounted: function() {},
	methods: {
		join: function() {
			console.log("Joining");
			if (this.user != "" && this.code.length == 4) {
				this.$http.post("/api/game/join/" + this.code, {
					user: this.user
				}).then( function(res) {
					console.log(res);
					this.$store.commit('setGame', res.data.game);
					this.$store.commit('setLogin', {code: res.data.game.code, player: res.data.player});
					if ( res.data.game.started ) {
						this.$router.push("/game");
					} else {
						this.$router.push("/lobby");
					}
				}.bind(this));
			}
		}
	}
};
</script>

