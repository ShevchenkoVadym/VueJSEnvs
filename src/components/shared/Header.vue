<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <div class="text-center">
        <router-link :to="{ name: 'Home' }" class="nav-link">
          <img src="../../assets/ericsson-logo-1024x228.png" class="rounded float-left mx-auto d-block"
               style="width: 150px;" alt="...">
        </router-link>
      </div>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <button class="btn btn-warning navbar-btn" @click="reload" :disabled="$route.path==='/' ? false : true">
            Reload
          </button>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Add' }">
            <button class="btn btn-outline-primary">
              Add new Environment
            </button>
          </router-link>
        </li>
      </ul>

    </div>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="search" v-on:input="searchMethod"
             :disabled="$route.path==='/' ? false : true">
    </form>
  </nav>
</template>

<script>
  import {eventBus} from '../../main'

  export default {
    components: {
      name: 'Header',
      Home: "Home",
    },

    data() {
      return {
        search: ""
      }
    },

    methods: {
      reload() {
        eventBus.$emit('reload', {});
      },
      searchMethod() {
        eventBus.$emit('search', this.search);

      }
    },

    computed: {
      filteredEnvs: function () {
        eventBus.$emit('search', this.search);
      },
    }
  }


</script>

<style scoped>
  button {
    margin: 0px 10px 0px 10px;
  }

  .disabled {
    background-color: black;
  }

</style>
