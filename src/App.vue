<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="/">Crawler Configuration</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="token">
          <b-link to="/global" router-tag="b-nav-item"
            >General Configuration</b-link
          >
          <b-link to="/add" router-tag="b-nav-item">Add Seed</b-link>
          <b-link to="/remove" router-tag="b-nav-item">Remove Seeds</b-link>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button
              v-if="token"
              size="sm"
              class="my-2 my-sm-0"
              @click="logout"
              >Log out</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view @token="setAuthenticated" class="mt-4"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  mounted() {
    if (!this.token) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.token = status;
    },
    logout() {
      console.log("button pressed");
      this.setAuthenticated(false);
      localStorage.removeItem("token");
      console.log(this.authenticated);
      this.$router.replace({ name: "login" });
      location.reload();
    },
  },
};
</script>

<style>
</style>
