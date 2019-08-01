<template src="./Lobby.html"></template>
<style src="./Lobby.styl" lang="styl"></style>

<script>
// @ is an alias to /src
import CookieService from "@/cookies.js";

export default {
	name: "lobby",
	data: () => {
		return {
		};
	},
	components: {

	},
	mounted: function() {
		CookieService.setCookie("code", this.$store.getters.status.code, 7);
	},
	methods: {
		mystatus: function() {
			return this.$store.getters.status;
		},
		displayStart: function() {
			if (this.$settings.minPlayers > 1) {
				return true;
			}
		}
	}
};
</script>

