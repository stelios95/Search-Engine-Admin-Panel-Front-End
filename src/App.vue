<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="/">Crawler Configuration</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-link to="/" router-tag="b-nav-item">Global Configuration</b-link>
          <b-link to="/add" router-tag="b-nav-item">Add Seed</b-link>
          <b-link to="/remove" router-tag="b-nav-item">Remove Seeds</b-link>
        </b-navbar-nav>
        <!-- Right aligned nav items --> 
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Log out</b-button>
          </b-nav-form>         
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view class="mt-4"></router-view>
  </div>
</template>

<script>

export default {

}
</script>

<style>


</style>
