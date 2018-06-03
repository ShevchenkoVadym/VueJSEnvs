<template>
  <div class="row">
    <table class="table table-bordered" v-if="loaded">
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

    <!--SPINNER-->
    <div style="margin:auto;" v-else>
      <fulfilling-bouncing-circle-spinner
        :animation-duration="4000"
        :size="60"
        color="#3D9970"
      ></fulfilling-bouncing-circle-spinner>
    </div>

  </div>

</template>

<script>
  import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
  import {db} from '../config/db';
  import {eventBus} from '../main'

  export default {
    components: {
      name: 'Home',
      FulfillingBouncingCircleSpinner
    },

    data() {
      return {
        loaded: false,
        envs: []
      }
    },

    firebase: {
      envs: {
        source: db.ref("envs"),
        cancelCallback: function () {
        },
        readyCallback: function () {
          this.loaded = true;
        }
      },
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
      },

      reloadData() {
        this.loaded = false;
        setTimeout(() => {this.loaded = true}, 1000);
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
    },

    created () {
      eventBus.$on('reload', () => {
        this.reloadData();
      });
    },

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
