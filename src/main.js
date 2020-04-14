import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import * as rules from 'vee-validate/dist/rules';
import 'element-ui/lib/theme-chalk/index.css';

import userApp from "./helper/userApp"
Vue.use(userApp)

// install rules and localization
Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});
  
localize('en', en);
  
// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
