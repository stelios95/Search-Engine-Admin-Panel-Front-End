<template>
  <b-container>
    <h3>Remove Seeds</h3>
    <hr />
    <p class="lead">Here you can remove one or more pages from the seed list.</p>
    <b-card
      title="Select URLs to remove from the seed pool."
      style="max-width: 60rem;"
      class="mb-2"
    >
      <b-table
        id="my-table"
        ref="selectableTable"
        selectable
        select-mode="multi"
        :items="items"
        @row-selected="onRowSelected"
        responsive="sm"
        :per-page="perPage"
        :current-page="currentPage"
      ></b-table>
      <b-row align-v="center" align-h="center" cols="3">
        <b-col>
          <b-form-checkbox
            class="mr-2"
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
            value="allSelected"
            unchecked-value="noneSelected"
            @change="selectRowsHandle"
          >Select All</b-form-checkbox>
        </b-col>
        <b-col>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            class="mt-3"
          ></b-pagination>
        </b-col>
        <b-col>
          <b-button class="float-right" type="submit" variant="success">Remove Selected</b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      status: "noneSelected",
      perPage: 6,
      currentPage: 1,
      selected: [],
      items: [
        { parentUrl: "https://bootstrap-vue.js.org/1" },
        { parentUrl: "https://bootstrap-vue.js.org/2" },
        { parentUrl: "https://bootstrap-vue.js.org/3" },
        { parentUrl: "https://bootstrap-vue.js.org/4" },
        { parentUrl: "https://bootstrap-vue.js.org/5" },
        { parentUrl: "https://bootstrap-vue.js.org/6" },
        { parentUrl: "https://bootstrap-vue.js.org/7" },
        { parentUrl: "https://bootstrap-vue.js.org/8" },
        { parentUrl: "https://bootstrap-vue.js.org/9" },
        { parentUrl: "https://bootstrap-vue.js.org/10" },
        { parentUrl: "https://bootstrap-vue.js.org/11" },
        { parentUrl: "https://bootstrap-vue.js.org/12" },
        { parentUrl: "https://bootstrap-vue.js.org/13" },
        { parentUrl: "https://bootstrap-vue.js.org/14" },
        { parentUrl: "https://bootstrap-vue.js.org/15" },
        { parentUrl: "https://bootstrap-vue.js.org/16" }
      ]
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    selectRowsHandle(evt) {
      console.log(JSON.stringify(evt));
      evt === "allSelected" ? this.selectAllRows() : this.clearSelected();
    },
    onRowSelected(items) {
      this.selected = items;
      console.log(JSON.stringify(this.selected));
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    }
  }
};
</script>

<style>
</style>