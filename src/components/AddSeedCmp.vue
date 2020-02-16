<template>
  <b-container>
    <h3>Add Seed</h3>
    <hr>
    <p class="lead">Here you can add a new page as a seed for the crawler.</p>
    <div>
      <b-card title="Set new Seed Page Parameters" fluid style="max-width: 60rem;" class="mb-2">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Crawling Timeout"
            label-for="input-1"
            description="Set the root page."
          >
            <b-form-input
              id="input-1"
              v-model="addSeedConfig.page"
              type="text"
              required
              placeholder="Root page URL"
            ></b-form-input>
          </b-form-group>

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
              required
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Crawling Depth"
            label-for="input-2"
            description="Set the crawling depth level of this page."
          >
            <b-form-input
              id="input-3"
              v-model="addSeedConfig.depth"
              type="number"
              required
              placeholder="Select depth"
            ></b-form-input>
          </b-form-group>

          <b-button class="mr-2" type="submit" variant="success">Submit</b-button>
          <b-button type="reset">Defaults</b-button>
        </b-form>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data(){
    return {
      addSeedConfig: {
        page: '',
        children: '',
        depth: 3
      },
      show: true
    }
  },
    methods: {
    onSubmit(evt) {
      evt.preventDefault()
      const seeds = {
        ...this.addSeedConfig,
        children: this.addSeedConfig.children.split('\n')
      }
      console.log(JSON.stringify(seeds))
      alert("Changes submited!")
    },
    onReset(evt) {
      evt.preventDefault();
      this.addSeedConfig.page = ''
      this.addSeedConfig.children = ''
      this.addSeedConfig.depth = 3
      console.log(JSON.stringify(this.addSeedConfig))
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      });
    }
  }
}
</script>

<style>

</style>