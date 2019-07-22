<template src="./Join.html"></template>
<style src="./Join.styl" lang="styl"></style>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
export default {
	name: "join",
	data: () => {
		return {
			user: "",
			code: ""
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
				}, (res) => {
					console.log(res);
				});
			}
		}
	}
};
</script>

