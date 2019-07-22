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
			console.log("Creating");
			this.$http.post("/api/game", {
				user: this.user
			}, (res) => {
				console.log(res);
			});
		}
	}
};
</script>

