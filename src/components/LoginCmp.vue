<template>
  <b-container>
    <b-button v-on:click="login()">Login</b-button>
  </b-container>
</template>

<script>
export default {
  methods: {
    login(){
      this.$emit("authenticated", true);
      this.$router.replace({ name: "global" });
    }
  }
}
</script>

<style>

</style>