<template>
  <b-container>
    <h3>Global Configuration</h3>
    <hr />
    <p class="lead">Here you can customize the overall behavior of the crawler.</p>
    <div>
      <b-card title="Set Global Parameters" style="max-width: 60rem;" class="mb-2">
        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)" @reset="onReset" v-if="show">
            <validation-provider name="Timeout" rules="required" v-slot="validationContext">
              <b-form-group
                id="input-group-1"
                label="Crawling Timeout"
                label-for="input-1"
                description="Set the maximum hours the crawler can run."
              >
                <b-form-select
                  id="input-1"
                  v-model="globalConfig.timeout"
                  :options="timeOutOptions"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-1-live-feedback"
                ></b-form-select>
                <b-form-invalid-feedback
                  id="input-1-live-feedback"
                >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider name="Update Interval" rules="required" v-slot="validationContext">
              <b-form-group
                id="input-group-2"
                label="Update Database Interval"
                label-for="input-2"
                description="Set the hourly interval to update database content."
              >
                <b-form-select
                  id="input-2"
                  v-model="globalConfig.updateFreq"
                  :options="updateFreqOptions"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-2-live-feedback"
                ></b-form-select>
                <b-form-invalid-feedback
                  id="input-2-live-feedback"
                >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider
              name="Crawler Interval"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                id="input-group-3"
                label="Crawler Run Interval"
                label-for="input-2"
                description="Set the hourly interval to run the crawler."
              >
                <b-form-select
                  id="input-3"
                  v-model="globalConfig.crawlFreq"
                  :options="crawlFreqOptions"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-3-live-feedback"
                ></b-form-select>
                <b-form-invalid-feedback
                  id="input-3-live-feedback"
                >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <b-button class="mr-2" type="submit" variant="success">Submit</b-button>
            <b-button type="reset">Defaults</b-button>
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
        timeout: 1,
        updateFreq: 12,
        crawlFreq: 24
      },
      show: true,
      timeOutOptions: [
        { value: 1, text: "After 1 hour" },
        { value: 2, text: "After 2 hours" },
        { value: 3, text: "After 3 hours" }
      ],
      updateFreqOptions: [
        { value: 3, text: "Every 3 hours" },
        { value: 6, text: "Every 6 hours" },
        { value: 9, text: "Every 9 hours" },
        { value: 12, text: "Every 12 hours" }
      ],
      crawlFreqOptions: [
        { value: 18, text: "Every 18 hours" },
        { value: 24, text: "Every 24 hours" },
        { value: 36, text: "Every 36 hours" }
      ]
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    onSubmit() {
      console.log(JSON.stringify(this.globalConfig));
      alert("Changes submited!");
    },
    onReset(evt) {
      evt.preventDefault();
      this.globalConfig.timeout = 1;
      this.globalConfig.updateFreq = 12;
      this.globalConfig.crawlFreq = 24;
      console.log(JSON.stringify(this.globalConfig));
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
</style>