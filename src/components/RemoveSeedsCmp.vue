<template>
  <b-container>
    <h3>Remove Seeds</h3>
    <hr />
    <p class="lead">
      Here you can remove one or more pages from the seed list.
    </p>
    <b-card
      title="Select URLs to remove from the seed pool."
      style="max-width: 60rem"
      class="mb-2"
    >
      <div v-if="showSpinner" class="text-center">
        <b-spinner variant="primary"></b-spinner>
      </div>
      <div v-if="showErrorMessage" class="text-center">
        <p class="text-danger">
          <b>An error occurred: {{ errorMessage }}</b>
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
      <b-row v-if="showControls" cols="3">
        <b-col class="xs-3">
          <b-form-checkbox
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
            value="allSelected"
            unchecked-value="noneSelected"
            @change="selectRowsHandle"
            >Select All</b-form-checkbox
          >
        </b-col>
        <b-col class="xs-3">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
        <b-col class="xs-3">
          <b-button
            v-if="!isMobile"
            v-on:click="removeSelected"
            variant="success"
            v-bind:disabled="isDisabled"
            >Remove Selected</b-button
          >
        </b-col>
      </b-row>
      <b-button
        v-if="isMobile"
        v-on:click="removeSelected"
        variant="success"
        v-bind:disabled="isDisabled"
        >Remove Selected</b-button
      >
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      status: "noneSelected",
      perPage: 6,
      currentPage: 1,
      selected: [],
      items: [],
      showSpinner: true,
      isDisabled: true,
      showErrorMessage: false,
      errorMessage: "",
      showControls: false,
    };
  },
  created() {
    this.BASE_URL = "https://crawler-admin-config-be.herokuapp.com";
  },
  mounted() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.isMobile = true;
    }
    this.fetchAll();
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    fetchAll() {
      this.isDisabled = true;
      this.showSpinner = true;
      this.showErrorMessage = false;
      this.errorMessage = "";
      let uri = this.BASE_URL + "/seeds/fetchAll";
      this.axios
        .get(uri, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(JSON.stringify(res));
          this.items = res.data;
          if (!this.items.length) {
            this.showErrorMessage = true;
            this.errorMessage = "No pages found.";
            this.showControls = false;
            this.showSpinner = false;
          } else {
            this.showSpinner = false;
            //this.isDisabled = false;
            this.showControls = true;
          }
        })
        .catch((err) => {
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
      this.isDisabled = !items.length;
      this.selected = items;
      console.log(JSON.stringify(this.selected));
    },
    selectAllRows() {
      this.isDisabled = false;
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.isDisabled = true;
      this.$refs.selectableTable.clearSelected();
    },
    removeSelected() {
      this.isDisabled = true;
      this.showSpinner = true;
      this.errorMessage = "";
      this.showErrorMessage = false;
      let uri = this.BASE_URL + "/seeds/removeSeeds";
      let ids = new Array();
      this.selected.forEach((el) => {
        ids.push(el._id);
      });
      this.axios
        .post(uri, ids, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((result) => {
          this.showSpinner = false;
          console.log(result);
          setTimeout(() => {
            location.reload();
          }, 700);
        })
        .catch((err) => {
          this.showErrorMessage = true;
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>