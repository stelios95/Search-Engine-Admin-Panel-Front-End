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
      <div v-if="showSpinner" class="text-center">
        <b-spinner variant="primary"></b-spinner>
      </div>
      <div v-if="showErrorMessage" class="text-center">
        <p class="text-danger">
          <b>An error occurred: {{errorMessage}}</b>
        </p>
      </div>
      <b-table
        v-else
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
      <b-row v-if="showControls" align-v="center" align-h="center" cols="3">
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
          <b-button
            class="float-right"
            v-on:click="removeSelected"
            variant="success"
            v-bind:disabled="isDisabled"
          >Remove Selected</b-button>
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
      items: [],
      showSpinner: true,
      isDisabled: false,
      showErrorMessage: false,
      errorMessage: "",
      showControls: false
    };
  },
  mounted() {
    this.fetchAll();
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    fetchAll() {
      this.isDisabled = true;
      this.showSpinner = true;
      this.showErrorMessage = false;
      this.errorMessage = "";
      let uri = "http://localhost:5000/seeds/fetchAll";
      this.axios
        .get(uri)
        .then(res => {
          this.items = res.data;
          this.showSpinner = false;
          this.isDisabled = false;
          this.showControls = true;
        })
        .catch(err => {
          console.log(err.message);
          this.showSpinner = false;
          this.showErrorMessage = true;
          this.errorMessage = err.message;
          this.showControls = false;
        });
    },
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
    },
    removeSelected() {
      this.isDisabled = true;
      let uri = "http://localhost:5000/seeds/removeSeeds";
      let ids = new Array();
      this.selected.forEach(el => {
        ids.push(el._id);
      });
      this.axios
        .post(uri, ids)
        .then(result => {
          console.log(result);
          setTimeout(() => {
            location.reload();
          }, 800);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>