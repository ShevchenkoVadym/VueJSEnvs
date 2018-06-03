import Vue from 'vue'
import VueFire from 'vuefire'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import BootstrapVue from 'bootstrap-vue'
import VuejsDialog from "vuejs-dialog"


import App from './App.vue'
import AddEnv from './components/AddEnv.vue'
import EditEnv from './components/EditEnv.vue'
import Home from './components/Home.vue'

import '../node_modules/nprogress/nprogress.css'

Vue.use(BootstrapVue);
Vue.use(VueFire);
Vue.use(VueRouter);
Vue.use(VuejsDialog, {
  html: true,
  loader: true,
  okText: 'Confirm',
  cancelText: 'Cancel',
  animation: 'bounce',
});
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.http.options.root = 'https://envsvuejs.firebaseio.com/';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Add',
    path: '/add',
    component: AddEnv
  },
  {
    name: 'Edit',
    path: '/edit/:id',
    component: EditEnv
  },
];

const router = new VueRouter({ mode: 'history', routes: routes });

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
