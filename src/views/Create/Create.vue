<template src="./Create.html"></template>
<style src="./Create.styl" lang="styl"></style>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "create",
	data: () => {
		return {
			user: "",
		};
	},
	components: {},
	mounted: function() {},
	methods: {
		create: function() {
			if (this.user != "") {
				this.$http.post("/api/game", {
					user: this.user
				}).then( function(res){
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

