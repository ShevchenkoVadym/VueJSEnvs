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
      <tbody class="hover_row" v-for="env in filteredEnvs" :key="env['.key']" @click="showModal(env['.key'])">
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
        <td :rowspan="env.nodes.length">{{env.timestamp_modified | moment("MMMM Do YYYY, h:mm:ss a") }}</td>
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

    <!--Detailed PopUp-->
    <b-modal ref="myModalRef" centered hide-footer title="Detailed Information">
      <div class="d-block">
        <b-tabs>
          <b-tab title="General info">
            <table class="details">
              <tbody>
              <tr>
                <th>EEA-SQM:</th>
                <td>{{ selectedEnv.versionSQM | emptyValues}}</td>
              </tr>
              <tr>
                <th>Build:</th>
                <td>{{ selectedEnv.build | emptyValues}}</td>
              </tr>
              <tr>
                <th>HostType:</th>
                <td>{{ selectedEnv.serverUsageType }}</td>
              </tr>
              <tr>
                <th>CEM:</th>
                <td>{{ selectedEnv.isCemInstalled }}</td>
              </tr>
              <tr>
                <th>UTF 8:</th>
                <td>{{ selectedEnv.utf8 }}</td>
              </tr>
              <tr>
                <th>Comments:</th>
                <td style="white-space: pre">{{ selectedEnv.comments | emptyValues}}</td>
              </tr>
              <tr>
                <th>Owner:</th>
                <td>{{ selectedEnv.owner | emptyValues}}</td>
              </tr>
              <tr>
                <th>Created:</th>
                <td>{{ selectedEnv.timestamp_created | moment("MMMM Do YYYY, h:mm:ss a") }}</td>
              </tr>
              <tr>
                <th>Modified:</th>
                <td>{{ selectedEnv.timestamp_modified | moment("MMMM Do YYYY, h:mm:ss a") }}</td>
              </tr>
              </tbody>
            </table>
          </b-tab>

          <b-tab v-for="node in selectedEnv.nodes" :title="`${node.hostType}`" :key="node.hostname">
            <table class="details">
              <tbody>
              <tr>
                <th>Hostname:</th>
                <td>{{node.hostname}}</td>
              </tr>
              <tr v-if="node.version">
                <th>Version:</th>
                <td>{{ node.version }}</td>
              </tr>
              <tr>
                <th v-if="node.database">Database:</th>
                <td>{{ node.database }}</td>
              </tr>
              <tr>
                <th>Model:</th>
                <td>{{ node.model | emptyValues}}</td>
              </tr>
              <tr>
                <th>OS:</th>
                <td>{{ node.os | emptyValues}}</td>
              </tr>
              <tr>
                <th>CPU:</th>
                <td>{{ node.hardware_cpu | emptyValues }}</td>
              </tr>
              <tr>
                <th>RAM:</th>
                <td>{{ node.hardware_ram | emptyValues}}</td>
              </tr>

              </tbody>
            </table>
          </b-tab>
        </b-tabs>
      </div>

      <div class="d-block text-center">
        <b-link :href="selectedEnv.sqmLink" class="card-link" target="_blank">Rich Client</b-link>
        <b-link :href="selectedEnv.thinClientLink" class="card-link" target="_blank">Thin Client</b-link>
        <b-link :href="selectedEnv.iSecureLink" class="card-link" target="_blank">iSecure Client</b-link>
        <b-link :href="selectedEnv.svcMgmtLink" class="card-link" target="_blank">Svc Mgmt</b-link>
      </div>


      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-btn>
    </b-modal>
    <input type="text" class="form-control" placeholder="search" v-model="search"/>

  </div>

</template>

<script>
  import {FulfillingBouncingCircleSpinner} from 'epic-spinners'
  import {db} from '../config/db';
  import {eventBus} from '../main'

  export default {
    components: {
      name: 'Home',
      FulfillingBouncingCircleSpinner
    },

    data() {
      return {
        search: "",
        selectedEnv: {},
        loaded: false,
        envs: [],
        computedEnvs: [],
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
        setTimeout(() => {
          this.loaded = true
        }, 1000);
      },

      showModal(key) {
        let detailedEnv = this.$firebaseRefs.envs.child(key);
        detailedEnv.on('value', (snap) => this.selectedEnv = snap.val());
        this.$refs.myModalRef.show()
      },

      hideModal() {
        this.$refs.myModalRef.hide()
      }
    },

    filters: {
      emptyValues: function (value) {
        if (value === "") {
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

    created() {
      eventBus.$on('reload', () => {
        this.reloadData();
      });
    },
    computed: {

      filteredEnvs: function () {
        this.computedEnvs = this.envs;
        if (this.search) {
          this.computedEnvs = this.computedEnvs.filter(item => item.owner.toUpperCase().includes(this.search.toUpperCase()) /*|| item.username.toUpperCase().includes(this.search.toUpperCase()) || item.email.toUpperCase().includes(this.search.toUpperCase()*/);
          return this.computedEnvs;
        }
        return this.computedEnvs;
      }
      /* filteredEnvs() {
         this.envs = this.envs.filter(env => {
           return env.typeEnvironment.toLowerCase().indexOf(this.search.toLowerCase()) > -1
         })
       }*/
    }
  }


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

  .hover_row:hover {
    background-color: #bddef9;
    cursor: pointer;
  }

  .details {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
  }

  .details td, .details th {
    padding: 5px 10px 0px 0px;
  }

</style>
