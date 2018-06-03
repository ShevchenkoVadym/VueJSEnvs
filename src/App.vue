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
      'app-home':  Home,
    },

    data() {
      return {
        user: {
          username: '',
          email: ''
        },
        users: [],
        resource: {},
        node: 'data'
      };
    },
    methods: {
      submit() {
//                this.$http.post('data.json', this.user)
//                        .then(response => {
//                            console.log(response);
//                        }, error => {
//                            console.log(error);
//                        });
//                this.resource.save({}, this.user);
        this.resource.saveAlt(this.user);
      },
      fetchData() {
//                this.$http.get('data.json')
//                        .then(response => {
//                            return response.json();
//                        })
//                        .then(data => {
//                            const resultArray = [];
//                            for (let key in data) {
//                                resultArray.push(data[key]);
//                            }
//                            this.users = resultArray;
//                        });
        this.resource.getData({node: this.node})
          .then(response => {
            return response.json();
          })
          .then(data => {
            const resultArray = [];
            for (let key in data) {
              resultArray.push(data[key]);
            }
            this.users = resultArray;
          });
      }
    },
    created() {
      const customActions = {
        saveAlt: {method: 'POST', url: 'data.json'},
        getData: {method: 'GET'}
      };
      this.resource = this.$resource('{node}.json', {}, customActions);
    }
  }
</script>

<style lang="css">
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  .gap {
    margin-top: 50px;
  }
</style>
