import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

//components

import GlobalConfigsCmp from "./components/GlobalConfigsCmp.vue";
import AddSeedCmp from "./components/AddSeedCmp.vue";
import RemoveSeedsCmp from "./components/RemoveSeedsCmp.vue";
import VueAxios from "vue-axios";
import axios from "axios";

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("en", en);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const routes = [
  {
    name: "home",
    path: "/",
    component: GlobalConfigsCmp
  },
  {
    name: "add",
    path: "/add",
    component: AddSeedCmp
  },
  {
    name: "remove",
    path: "/remove",
    component: RemoveSeedsCmp
  }
];

const router = new VueRouter({ mode: "history", routes: routes });

new Vue(Vue.util.extend({ router }, App)).$mount("#app");
