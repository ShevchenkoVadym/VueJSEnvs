<template>
  <div class="row">

    <table class="table table-bordered">
      <thead class="thead-light">
      <tr>
        <th>EEA-SQM</th>
        <th>Build Number</th>
        <th>iSecure</th>
        <th>Host</th>
        <th>Host Type</th>
        <th>Version</th>
        <th>DEV/PT/TEST</th>
        <th>SQM</th>
        <th>Thin Client</th>
        <th>iSecure</th>
        <th>Database</th>
        <th>Last Update</th>
        <th>Action 1</th>
        <th>Action 2</th>
      </tr>
      </thead>
      <tbody class="hover_row" v-for="env in envs" :key="env['.key']">
      <tr>
        <!--<td rowspan=2>{{env.id}}</td>-->
        <td :rowspan="env.nodes.length">{{env.versionSQM | emptyValues}}</td>
        <td :rowspan="env.nodes.length">{{env.build | emptyValues}}</td>
        <td :rowspan="env.nodes.length">{{env.versionISecure | emptyValues}}</td>
        <td rowspan="1">
          {{env.nodes[0].hostname | shortName}}
        </td>
        <td rowspan="1">
          {{env.nodes[0].hostType}}
        </td>
        <td rowspan="1">
          {{env.nodes[0].version | emptyValues}}
        </td>
        <td :rowspan="env.nodes.length">{{env.serverUsageType}}</td>

        <td :rowspan="env.nodes.length">
          <a class="btn btn-info" role="button" :href="env.sqmLink" target="_blank">Rich Client</a>
        </td>
        <td :rowspan="env.nodes.length">
          <a class="btn btn-info" role="button" :href="env.thinClientLink" target="_blank">Thin Client</a>
        </td>
        <td :rowspan="env.nodes.length">
          <a class="btn btn-info" role="button" :href="env.iSecureLink" target="_blank">Client</a>
        </td>
        <td rowspan="1">
          {{env.nodes[0].database | emptyValues}}
        </td>
        <td :rowspan="env.nodes.length">{{env.timestamp_modified  | moment("MMMM Do YYYY, h:mm:ss a") }}</td>
        <td :rowspan="env.nodes.length">
          <router-link :to="{ name: 'Edit', params: {id: env['.key']} }">
            <button type="button" class="btn btn-warning">EDIT</button>
          </router-link>
        </td>
        <td :rowspan="env.nodes.length">
          <button type="button" @click="deleteEnv(env['.key'])" class="btn btn-danger">DELETE</button>
        </td>



      </tr>
      <tr v-for="node in env.nodes.slice(1, env.nodes.length)">
        <td rowspan="1">{{node.hostname | shortName}}</td>
        <td rowspan="1">{{node.hostType}}</td>
        <td rowspan="1">{{node.version | emptyValues}}</td>
        <td rowspan="1">{{node.database | emptyValues}}</td>
      </tr>

      </tbody>
    </table>



  </div>

</template>

<script>

  import {db} from '../config/db';

  export default {
    components: {
      name: 'Home'
    },

    data() {
      return {

        fields: ['first_name', 'last_name', 'show_details', 'lol_intereesting'],
        items: [
          {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
          {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
          {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson', _showDetails: true},
          {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney'}
        ],
        envs: []
      }
    },

    firebase: {
      envs: db.ref('envs')
    },

    methods: {
      deleteEnv(key) {
        this.$dialog.confirm("If you delete this record, it'll be gone forever.", {
          loader: true // default: false - when set to true, the proceed button shows a loader when clicked.
          // And a dialog object will be passed to the then() callback
        })
          .then((dialog) => {
            setTimeout(() => {
              this.$firebaseRefs.envs.child(key).remove();
              console.log('Delete action completed ');
              dialog.close();
            }, 2500);
          })
          .catch(() => {
            // Triggered when cancel button is clicked
            console.log('Delete aborted');
          });
      }
    },

    filters: {
      emptyValues: function (value) {
        if (value === ""){
          return "N/A"
        } else {
          return value
        }
      },
      shortName: function (value) {
        if (value) {
          return value.split(".")[0]
        }
      }
    }
  }

  /*  computed: {
      filteredItems() {
        return this.items.filter(item => {
          return item.typeEnvironment.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        })
      }
    }*/

</script>

<style scoped>
  div {
    margin: 20px;
  }

  table {
    table-layout: fixed;
    word-wrap: break-word;
  }

  .table td {
    text-align: center;
  }

  .table > tbody > tr > td {
    vertical-align: middle;
  }

  .table > thead > tr > th {
    text-align: center;
  }



</style>
