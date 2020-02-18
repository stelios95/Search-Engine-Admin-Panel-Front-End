<template>
  <b-container>
    <h3>Add Seed</h3>
    <hr />
    <p class="lead">Here you can add a new page as a seed for the crawler.</p>
    <div>
      <b-card title="Set new Seed Page Parameters" style="max-width: 60rem;" class="mb-2">
        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)" @reset="onReset" v-if="show">
            <validation-provider name="Page" rules="required|url" v-slot="validationContext">
              <b-form-group
                id="input-group-1"
                label="Root Page"
                label-for="input-1"
                description="Set the root page."
              >
                <b-form-input
                  id="input-1"
                  v-model="addSeedConfig.page"
                  type="text"
                  placeholder="Root page URL"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-1-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback
                  id="input-1-live-feedback"
                >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider
              name="Children"
              rules="required|urlTextArea"
              v-slot="validationContext"
            >
              <b-form-group
                id="input-group-2"
                label="Singificant Children URLs"
                label-for="input-2"
                description="Set the children URLs that need their content to be updated on each line."
              >
                <b-form-textarea
                  lazy
                  id="input-2"
                  placeholder="Here you can add the significant children..."
                  rows="3"
                  max-rows="6"
                  v-model="addSeedConfig.children"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-2-live-feedback"
                ></b-form-textarea>
                <b-form-invalid-feedback
                  id="input-2-live-feedback"
                >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider name="Depth" rules="required" v-slot="validationContext">
              <b-form-group
                id="input-group-3"
                label="Crawling Depth"
                label-for="input-2"
                description="Set the crawling depth level of this page."
              >
                <b-form-select
                  id="input-3"
                  v-model="addSeedConfig.depth"
                  :options="options"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-3-live-feedback"
                ></b-form-select>
                <b-form-invalid-feedback
                  id="input-3-live-feedback"
                >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <div class="d-flex align-items-center">
              <p
                v-if="showMessage"
                v-bind="loadingMessage"
                v-bind:class="{'text-success': isSuccess, 
                                'text-danger': !isSuccess
                                }"
              >{{ loadingMessage }}</p>
              <b-spinner v-if="showSpinner" variant="primary" class="ml-auto"></b-spinner>
            </div>
            <b-button
              class="mr-2"
              type="submit"
              variant="success"
              v-bind:disabled="isDisabled"
            >Submit</b-button>
            <b-button class="mr-2" type="reset" v-bind:disabled="isDisabled">Defaults</b-button>
          </b-form>
        </validation-observer>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { extend } from "vee-validate";

export default {
  data() {
    return {
      extend: extend,
      addSeedConfig: {
        page: "",
        children: "",
        depth: 3
      },
      show: true,
      showSpinner: false,
      showMessage: false,
      options: [
        { value: 1, text: "1 level" },
        { value: 2, text: "2 levels" },
        { value: 3, text: "3 levels" },
        { value: 4, text: "4 levels" }
      ],
      loadingMessage: "Sending data to server...",
      isDisabled: false,
      isSuccess: false
    };
  },

  methods: {
    isValidUrl(v) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(v);
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    extractURLs(str) {
      const arr = str.split("\n").filter(el => {
        //get only the valid urls on each line
        return this.isValidUrl(el);
      });
      const set = [...new Set(arr)];
      console.log("Array: " + JSON.stringify(arr));
      console.log("Set: " + JSON.stringify(set));
      return set;
    },
    onSubmit() {
      const seeds = {
        ...this.addSeedConfig,
        children: this.extractURLs(this.addSeedConfig.children)
      };
      let uri = "http://localhost:5000/seeds/add";
      this.showSpinner = true;
      this.isSuccess = true;
      this.showMessage = true;
      this.isDisabled = true;
      this.axios
        .post(uri, seeds)
        .then(response => {
          if (response.status === 200) {
            this.showSpinner = false;
            this.loadingMessage = "Seed settings saved!";
            this.isDisabled = false;
            console.log("Response: " + JSON.stringify(response));
          }
          console.log(JSON.stringify(seeds));
          alert("Changes submited!");
          setTimeout(() => {
            location.reload();
          }, 800);
        })
        .catch(err => {
          this.showSpinner = false;
          this.isSuccess = false;
          this.loadingMessage = "An Error occured: " + err;
          this.isDisabled = false;
          console.log(err);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.addSeedConfig.page = "";
      this.addSeedConfig.children = "";
      this.addSeedConfig.depth = 3;
      this.showMessage = false;
      this.showSpinner = false;
      console.log(JSON.stringify(this.addSeedConfig));
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  mounted() {
    extend("url", value => {
      if (this.isValidUrl(value)) {
        return true;
      }
      return "You must give a valid URL!";
    }),
      extend("urlTextArea", value => {
        console.log("value: " + value);
        const arr = this.extractURLs(value);
        if (arr.length) {
          return true;
        }
        return "You must give at least one valid child URL!";
      });
  }
};
</script>

<style>
</style>