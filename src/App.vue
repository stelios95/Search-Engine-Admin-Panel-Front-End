<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="/">Crawler Configuration</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="authenticated">
          <b-link to="/global" router-tag="b-nav-item">Global Configuration</b-link>
          <b-link to="/add" router-tag="b-nav-item">Add Seed</b-link>
          <b-link to="/remove" router-tag="b-nav-item">Remove Seeds</b-link>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-link to='/login' v-if="authenticated" size="sm" class="my-2 my-sm-0" @click.native="logout" replace  router-tag="b-button">Log out</b-link>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view @authenticated="setAuthenticated" class="mt-4"></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      authenticated: false
    }
  },
     mounted(){
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
              console.log('button pressed')
              this.authenticated = false;
                
            }
        }
};
</script>

<style>
</style>
