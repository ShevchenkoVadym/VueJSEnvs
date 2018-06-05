<template>
  <div>
    <app-header></app-header>
    <div class="gap">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>

  import Header from './components/Shared/Header.vue';
  import Footer from './components/Shared/Footer.vue';
  import Home from './components/Home.vue';

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer,
      'app-home': Home,
    },
  }
</script>

<style lang="css">
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

  .gap {
    margin-top: 50px;
  }

  /*Dialog window CSS style*/
  .dg-btn--ok {
    border-color: green;
    color: green;
  }

  .dg-btn--cancel {
    border-color: red;
    background-color: #f63636;
  }

  .dg-btn-loader .dg-circle {
    background-color: green;
  }
</style>
