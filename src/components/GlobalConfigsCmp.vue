<template>
  <b-container>
    <h3>Global Configuration</h3>
    <hr />
    <p class="lead">
      Here you can customize the overall behavior of the crawler.
    </p>
    <div>
      <b-card
        title="Set Global Parameters"
        style="max-width: 60rem"
        class="mb-2"
      >
        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form
            @submit.stop.prevent="passes(onSubmit)"
            @reset="onReset"
            v-if="show"
          >
            <validation-provider
              name="Update Interval"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                id="input-group-1"
                label="Update Database Time"
                label-for="input-1"
                description="Set the time you would like to update the database content."
              >
                <b-form-select
                  id="input-1"
                  v-model="globalConfig.updateFreq"
                  :options="updateFreqOptions"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-1-live-feedback"
                ></b-form-select>
                <b-form-invalid-feedback id="input-1-live-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider
              name="Crawler Interval"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                id="input-group-2"
                label="Crawler Run Interval"
                label-for="input-2"
                description="Set the hourly interval to run the crawler."
              >
                <b-form-select
                  id="input-2"
                  v-model="globalConfig.crawlFreq"
                  :options="crawlFreqOptions"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-2-live-feedback"
                ></b-form-select>
                <b-form-invalid-feedback id="input-2-live-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <div class="d-flex flex-row">
              <p class="mr-2" v-if="showLoadingMessage">
                Sending data to server...
              </p>
              <p
                v-if="showMessage"
                v-bind="resultMessage"
                v-bind:class="{
                  'text-success': isSuccess,
                  'text-danger': !isSuccess,
                }"
              >
                <b>{{ resultMessage }}</b>
              </p>
              <b-spinner
                class="spinner-border-sm mt-1"
                v-if="showSpinner"
                variant="primary"
              ></b-spinner>
            </div>
            <b-button
              class="mr-2"
              type="submit"
              variant="success"
              v-bind:disabled="isDisabled"
              >Submit</b-button
            >
            <b-button type="reset" v-bind:disabled="isDisabled"
              >Defaults</b-button
            >
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
      globalConfig: {
        updateFreq: "",
        crawlFreq: "",
      },
      show: true,
      showSpinner: false,
      showMessage: false,
      showLoadingMessage: false,
      resultMessage: "",
      isDisabled: false,
      isSuccess: false,
      updateFreqOptions: [
        { value: 2, text: "At 2:00 A.M." },
        { value: 3, text: "At 3:00 A.M." },
        { value: 4, text: "At 4:00 A.M." },
      ],
      crawlFreqOptions: [
        { value: "*/6", text: "Every 6 hours" },
        { value: "*/12", text: "Every 12 hours" },
        { value: 0, text: "Every 24 hours" },
      ],
    };
  },
  created() {
    this.BASE_URL = "https://crawler-admin-config-be.herokuapp.com";
    this.axios
      .get(this.BASE_URL + "/seeds/getDefaultIntervals")
      .then((res) => {
        this.globalConfig.updateFreq = res.data.updateContentTime;
        this.globalConfig.crawlFreq = res.data.fullScanInterval;
      })
      .catch((err) => {
        console.log("error" + err);
      });
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    onSubmit() {
      console.log(JSON.stringify(this.globalConfig));
      let uri = this.BASE_URL + "/seeds/configure";
      this.showLoadingMessage = true;
      this.showSpinner = true;
      this.showMessage = false;
      this.isDisabled = true;
      this.globalConfig["username"] = sessionStorage.getItem("username");
      this.globalConfig["password"] = sessionStorage.getItem("password");
      this.axios
        .post(uri, this.globalConfig, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.resultMessage = "Settings sent!";
          this.showLoadingMessage = false;
          this.showMessage = true;
          this.showSpinner = false;
          this.isSuccess = true;
          this.isDisabled = false;
          console.log(res);
          setTimeout(() => {
            location.reload();
          }, 800);
        })
        .catch((err) => {
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
      this.globalConfig.updateFreq = 12;
      this.globalConfig.crawlFreq = 24;
      console.log(JSON.stringify(this.globalConfig));
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style>
</style>