<template>
  <b-container>
    <h3>Add Seed</h3>
    <hr />
    <p class="lead">Here you can add a new page as a seed for the crawler.</p>
    <!-- main div -->
    <div>
      <b-card title="Set new Seed Page Parameters" style="max-width: 60rem;" class="mb-2">
        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)" @reset="onReset" v-if="show">
            <!-- input url -->
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

            <!-- is spa -->
            <b-form-group
              id="input-group-2"
              label="Is Single Page Application"
              label-for="input-2"
              description="Check the box if the page is a Single Page Application"
            >
              <b-form-checkbox
                id="input-2"
                class="mr-2"
                v-model="isSpaValue"
                name="checkbox-1"
                value="isSpa"
                unchecked-value="isNotSpa"
                @change="isSpaCheckboxChange"
              >Is SPA</b-form-checkbox>
            </b-form-group>
            <!-- end of spa -->

            <!-- select crawling method -->
            <b-form-group
              v-if="addSeedConfig.isSpa"
              id="input-group-3"
              label="Crawling Method"
              label-for="input-3"
              description="Set the crawling method of this page."
            >
              <b-form-select id="input-3" v-model="addSeedConfig.method" :options="methodOptions" @change="setNumberOfChildren"></b-form-select>
            </b-form-group>
            <!-- end of select crawling method -->

            <!-- select number of children pages -->
            <b-form-group
              id="input-group-4"
              label="Number of Children"
              label-for="input-4"
              description="Set the number of children to crawl."
            >
              <b-form-select
                id="input-4"
                v-model="addSeedConfig.numberOfChildren"
                :options="numberOfChildrenOptions"
              ></b-form-select>
            </b-form-group>

            <!-- end of selection of number of children pages -->
            <div class="d-flex flex-row">
              <p class="mr-2" v-if="showLoadingMessage">Sending data to server...</p>
              <p
                v-if="showMessage"
                v-bind="resultMessage"
                v-bind:class="{'text-success': isSuccess, 
                                'text-danger': !isSuccess
                                }"
              >
                <b>{{ resultMessage }}</b>
              </p>
              <b-spinner class="spinner-border-sm mt-1" v-if="showSpinner" variant="primary"></b-spinner>
            </div>
            <b-button
              class="mr-2"
              type="submit"
              variant="success"
              v-bind:disabled="isDisabled"
            >Submit</b-button>
            <b-button type="reset" v-bind:disabled="isDisabled">Defaults</b-button>
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
      isSpaValue: "isNotSpa",
      addSeedConfig: {
        page: "",
        isSpa: false,
        method: 0,
        numberOfChildren: 30
      },
      show: true,
      showSpinner: false,
      showMessage: false,
      methodOptions: [
        { value: 0, text: "Cheerio" },
        { value: 1, text: "Puppeteer" }
      ],
      numberOfChildrenOptions: [],
      showLoadingMessage: false,
      resultMessage: "",
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
    isSpaCheckboxChange(evt) {
      this.addSeedConfig.isSpa = evt === "isNotSpa" ? false : true;
      console.log(this.addSeedConfig.isSpa);
    },
    setNumberOfChildren(evt){
      if(evt === 0){
        this.numberOfChildrenOptions = this.getNumberOfChildrenOptions(30)
        this.addSeedConfig.numberOfChildren = 30
      } else {
        this.numberOfChildrenOptions = this.getNumberOfChildrenOptions(10)
        this.addSeedConfig.numberOfChildren = 10
      }
    },
    getNumberOfChildrenOptions(n){
      let options = new Array();
      for(let i = 1; i <= n; i++){
        options.push({value: i, text: i.toString()})
      }
      return options
    },
    onSubmit() {
      this.isSpa = this.isSpaValue === "isNotSpa" ? false : true;
      console.log(JSON.stringify(this.addSeedConfig));
      this.showLoadingMessage = true;
      let uri = "http://localhost:5000/seeds/add";
      this.showSpinner = true;
      this.showMessage = false;
      this.isDisabled = true;
      this.axios
        .post(uri, this.addSeedConfig)
        .then(response => {
          if (response.status === 200) {
            this.resultMessage = "Seed settings saved!";
            this.showLoadingMessage = false;
            this.showMessage = true;
            this.showSpinner = false;
            this.isSuccess = true;
            this.isDisabled = false;
            console.log("Response: " + JSON.stringify(response));
          }
          console.log(JSON.stringify(this.addSeedConfig));
          //alert("Changes submited!");
          setTimeout(() => {
            location.reload();
          }, 800);
        })
        .catch(err => {
          this.showLoadingMessage = false;
          this.showSpinner = false;
          this.isSuccess = false;
          this.resultMessage =
            "An Error occured: " + err.message.replace("Error:", "");
          this.showMessage = true;
          this.isDisabled = false;
          console.log(err);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.addSeedConfig.page = "";
      this.addSeedConfig.isSpa = false;
      this.isSpaValue = "isNotSpa";
      this.addSeedConfig.method = 0;
      this.addSeedConfig.numberOfChildren = 30;
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
    this.numberOfChildrenOptions = this.getNumberOfChildrenOptions(30)
  }
};
</script>

<style>
</style>