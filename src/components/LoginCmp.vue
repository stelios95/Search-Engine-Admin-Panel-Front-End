<template>
  <b-container class="h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <b-card title="Enter your credentials" style="max-width: 50rem;" class="mb-2">
        <b-form>
          <b-form-input
            class="p-3 my-2"
            v-model="username"
            type="text"
            placeholder="Enter your username"
          ></b-form-input>
          <b-form-input
            class="p-3 my-2"
            v-model="password"
            type="password"
            placeholder="Enter your password"
          ></b-form-input>
          <b-button class="my-2" variant="success" v-on:click="login()">Login</b-button>
        </b-form>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$emit("authenticated", true);
      this.$router.replace({ name: "global" });
    }
  }
};
</script>

<style>
</style>