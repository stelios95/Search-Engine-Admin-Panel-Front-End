<template>
  <div class="container">
    <h3>Global Configuration</h3>
    <hr />
    <p class="lead">Here you can customize the overall behavior of the crawler.</p>
    <div>
      <b-card title="Set Global Parameters" style="max-width: 60rem;" class="mb-2">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Crawling Timeout"
            label-for="input-1"
            description="Set the maximum hours the crawler can run."
          >
            <b-form-input
              id="input-1"
              v-model="globalConfig.timeout"
              type="number"
              required
              placeholder="Timeout"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Update Database Interval"
            label-for="input-2"
            description="Set the hourly interval to update database content."
          >
            <b-form-input
              id="input-2"
              v-model="globalConfig.updateFreq"
              type="number"
              required
              placeholder="Update Frequency"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Crawler Run Interval"
            label-for="input-2"
            description="Set the hourly interval to run the crawler."
          >
            <b-form-input
              id="input-3"
              v-model="globalConfig.crawlFreq"
              type="number"
              required
              placeholder="Crawler Run Frequency"
            ></b-form-input>
          </b-form-group>

          <b-button class="mr-2" type="submit" variant="success">Submit</b-button>
          <b-button type="reset">Defaults</b-button>
        </b-form>
      </b-card>
    </div>
  </div>
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
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
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