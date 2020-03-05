<template>
  <b-container class="h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <b-card title="Enter your credentials" style="max-width: 50rem;" class="mb-2">
        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)">
            <validation-provider name="Username" rules="required" v-slot="validationContext">
              <b-form-input
                class="p-3 my-2"
                v-model="username"
                type="text"
                placeholder="Enter your username"
                :state="getValidationState(validationContext)"
                aria-describedby="input-1-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>

            <validation-provider name="Password" rules="required" v-slot="validationContext">
              <b-form-input
                class="p-3 my-2"
                v-model="password"
                type="password"
                placeholder="Enter your password"
                :state="getValidationState(validationContext)"
                aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>

            <b-button class="my-2" variant="success" type="submit">Login</b-button>
          </b-form>
        </validation-observer>
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
    onSubmit() {
      this.$emit("authenticated", true);
      this.$router.replace({ name: "global" });
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    }
  }
};
</script>

<style>
</style>