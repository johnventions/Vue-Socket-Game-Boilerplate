<template src="./Lobby.html"></template>
<style src="./Lobby.styl" lang="styl"></style>

<script>
// @ is an alias to /src
import CookieService from "@/cookies.js";

export default {
	name: "lobby",
	data: () => {
		return {
			pending: false,
			started: false,
		};
	},
	components: {

	},
	mounted: function() {
		this.joinRoom(this.$store.getters.status.code);
		CookieService.setCookie("code", this.$store.getters.status.code, 7);
		CookieService.setCookie("user", this.$store.getters.status.user, 7);
		CookieService.setCookie("userID", this.$store.getters.status.userID, 7);
	},
	methods: {
		isAdmin: function() {
			var s = this.$store.getters.status;
			return s.admin;
		},
		status: function() {
			return this.$store.getters.status;
		},
		players: function() {
			return this.$store.getters.players;
		},
		displayStart: function() {
			if (!this.isAdmin()) {
				return false;
			}
			if (this.$settings.minPlayers <= this.players().length) {
				return true;
			}
			return false;
		},
		startGame: function() {
			this.pending = true;
			this.$http.post("/api/game/" + this.status().code + "/start", {})
				.then( function() {
					this.started = true;
			}.bind(this))
			.catch(function(err) {
				console.log("ERROR", err);
			});
		}
	}
};
</script>

