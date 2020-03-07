<template>
  <b-container class="h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <b-card title="Enter your credentials" style="max-width: 50rem;" class="mb-2">
        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)">
            <validation-provider name="Username" rules="required" v-slot="validationContext">
              <b-form-input
                class="p-3 my-2"
                v-model="credentials.username"
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
                v-model="credentials.password"
                type="password"
                placeholder="Enter your password"
                :state="getValidationState(validationContext)"
                aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>

            <b-button class="my-2" variant="success" type="submit"> <b-spinner v-if="showSpinner" small></b-spinner>Login</b-button>
            
          </b-form>
        </validation-observer>
        <p v-if="showErrorMessage" class="text-danger"><b>{{errorMessage}}</b></p>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      errorMessage: "",
      showErrorMessage: false,
      showSpinner: false
    };
  },
  methods: {
    onSubmit() {
      this.showErrorMessage = false
      this.showSpinner = true
      let uri = "http://localhost:5000/seeds/login";
      this.axios
        .post(uri, this.credentials)
        .then(response => {
          this.showSpinner = false
          console.log(JSON.stringify(response));
          if (response.data === "ok") {
            sessionStorage.setItem("authenticated", true);
            this.$emit("authenticated", true);
            this.$router.replace({ name: "global" });
          } else {
            this.errorMessage = response.data
            this.showErrorMessage = true
          }
        })
        .catch(err => {
          console.log(err.message);
          this.showSpinner = false
          this.errorMessage = err.message
          this.showErrorMessage = true
        });
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    }
  }
};
</script>

<style>
</style>