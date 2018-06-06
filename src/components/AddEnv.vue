<template>
  <div class="container">

    <div class="card">
      <div class="card-header">
        <h3>Add New Environment</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addEnv">
          <div>
            <b-form-select v-model="newEnv.typeEnvironment" :options="optionsTypeEnvironmentType" class="mb-3" required>
            </b-form-select>
          </div>

          <div>
            <b-form-select v-model="newEnv.serverUsageType" :options="optionsServerUsageType" class="mb-3" required>
            </b-form-select>
          </div>

          <form class="form-horizontal">
            <div class="container">
              <div class="row">
                <div class="form-group form-group-sm col-sm-6">
                  <div class="row">
                    <label for="versionSQM" class="col-sm-3 col-form-label">EEA-SQM:</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="versionSQM"
                             placeholder="Version of SQM, 17.2, 17.2.1 etc" v-model="newEnv.versionSQM" required
                             name="versionSQM">
                    </div>
                  </div>
                </div>
                <div class="form-group form-group-sm col-sm-6">
                  <div class="row">
                    <label for="build" class="col-sm-3 col-form-label">Build number:</label>
                    <div class="col-sm-9">
                      <input type="number" class="form-control" id="build" name="build" placeholder="Build number"
                             v-model="newEnv.build">
                    </div>
                  </div>
                </div>
                <div class="form-group form-group-sm col-sm-6">
                  <div class="row">
                    <label for="versionISecure" class="col-sm-3 col-form-label">iSecure:</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="versionISecure" name="versionISecure"
                             placeholder="Version of iSecure, 14.2, 17.0, 18.0 etc" v-model="newEnv.versionISecure">
                    </div>
                  </div>
                </div>

                <div class="form-group form-group-sm col-sm-6">
                  <div class="row">
                    <label for="svcMgmtLink" class="col-sm-3 col-form-label">Svc Mgmt:</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="svcMgmtLink" name="svcMgmtLink"
                             placeholder="Link address" v-model="newEnv.svcMgmtLink">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <hr>

          <!--        ADD NODE FORM          -->

          <div class="form-group row align-items-center" v-for="(node, index) in newEnv.nodes" :key="index"
               style="margin: 10px">
            <div class="col">
              <h3 align="center" style="color: #0074D9">Node number {{index + 1}} </h3>
              <div class="form-group row">


                <label for="host_name" class="col-xs-3 col-form-label mr-2">Name of Hostname: </label>
                <div class="col">
                  <input type="text" class="form-control" id="host_name" name="host_name" required
                         placeholder="FSQM hostname address" v-model="node.hostname">
                </div>
              </div>
              <div class="form-group row">
                <b-form-select v-model="node.hostType" id="host_type" :options="optionsHostType" class="mb-3" required
                               style="margin: 10px 15px 0px 0px">
                </b-form-select>
              </div>

              <form class="form-horizontal"
                    v-if="node.hostType != optionsHostType[0].value">
                <div class="container">
                  <div class="row">
                    <div class="form-group form-group-sm col-sm-6">
                      <div class="row">
                        <label for="model" class="col-sm-3 col-form-label">Version:</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" id="versionDB"
                                 placeholder="Version of Database etc" v-model="node.version"
                                 name="versionDB">
                        </div>
                      </div>
                    </div>
                    <div class="form-group form-group-sm col-sm-6">
                      <div class="row">
                        <label for="database" class="col-sm-3 col-form-label">Databases:</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" id="database" name="database" placeholder="sd, bo"
                                 v-model="node.database">
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </form>

              <h4 style="margin: 0px 0px 30px 0px">Hardware</h4>

              <form class="form-horizontal">
                <div class="container">
                  <div class="row">
                    <div class="form-group form-group-sm col-sm-6">
                      <div class="row">
                        <label for="model" class="col-sm-3 col-form-label">Model:</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" id="model"
                                 placeholder="For example: Xeon Family 6 Model 26" v-model="node.model"
                                 name="versionSQM">
                        </div>
                      </div>
                    </div>
                    <div class="form-group form-group-sm col-sm-6">
                      <div class="row">
                        <label for="hardware_cpu" class="col-sm-3 col-form-label">CPU:</label>
                        <div class="col-sm-9">
                          <input type="number" class="form-control" id="hardware_cpu" name="hardware_cpu"
                                 placeholder="16"
                                 v-model="node.hardware_cpu">
                        </div>
                      </div>
                    </div>
                    <div class="form-group form-group-sm col-sm-6">
                      <div class="row">
                        <label for="hardware_ram" class="col-sm-3 col-form-label">RAM:</label>
                        <div class="col-sm-9">
                          <input type="number" class="form-control" id="hardware_ram" name="hardware_ram"
                                 placeholder="64" v-model="node.hardware_ram">
                        </div>
                      </div>
                    </div>

                    <div class="form-group form-group-sm col-sm-6">
                      <div class="row">
                        <label for="os" class="col-sm-3 col-form-label">OS:</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" id="os" name="os"
                                 placeholder="Red Hat 7.3 Santiago" v-model="node.os">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <hr>

            </div>
            <div class="col-auto"></div>

            <div class="form-group row">
              <div class="col-auto">
                <button type="submit" class="btn btn-danger" v-on:click.prevent="removeNode(index)">Remove</button>
              </div>
            </div>

          </div>

          <button class="btn btn-success" type="submit" v-on:click.prevent="addNode">Add Node</button>

          <b-alert variant="danger"
                   dismissible
                   :show="showDismissibleAlert"
                   @dismissed="showDismissibleAlert=false" style="margin: 15px">
            You need to add at least one SQM Node
          </b-alert>

          <hr>

          <!--        ADD NODE FORM END        -->


          <div class="form-group">
            <label>Owner:</label>
            <input type="text" class="form-control" v-model="newEnv.owner"/>
          </div>

          <div class="form-group">
            <label for="Textarea">Comments:</label>
            <textarea class="form-control rounded-0" id="Textarea" v-model="newEnv.comments" rows="3"
                      placeholder="Any comments to this environment"></textarea>
          </div>

          <div>
            <b-form-checkbox v-model="newEnv.isCemInstalled">
              CEM
            </b-form-checkbox>
          </div>
          <div>
            <b-form-checkbox v-model="newEnv.utf8">
              UTF 8
            </b-form-checkbox>
          </div>

          <hr>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Add Environment"/>
          </div>

        </form>


      </div>
    </div>


  </div>
</template>

<script>
  import {db} from '../config/db';

  export default {
    components: {
      name: 'AddEnv'
    },

    firebase: {
      envs: db.ref('envs')
    },

    data() {
      return {
        showDismissibleAlert: false,
        newEnv: {
          typeEnvironment: "",
          serverUsageType: "",
          versionSQM: "",
          build: "",
          versionISecure: "",
          nodes: [],
          svcMgmtLink: "",
          utf8: false,
          isCemInstalled: false,
          owner: "",
          comments: "",
          sqmLink: '',
          iSecureLink: '',
          thinClientLink: '',
        },

        optionsTypeEnvironmentType: [
          {value: "", text: 'Please select development Type'},
          {value: 'currentDevelopment', text: 'Current Development'},
          {value: 'openReleases', text: 'Open releases'},
          {value: 'retired', text: 'Retired'},
        ],

        optionsServerUsageType: [
          {value: "", text: 'Please select type of environment'},
          {value: 'DEV', text: 'DEV'},
          {value: 'TEST', text: 'TEST'},
          {value: 'PT', text: 'PT'},
          {value: 'Automation', text: 'Automation'},
        ],

        optionsHostType: [
          {value: "", text: 'Please select type of host'},
          {value: 'SQM Core', text: 'SQM Core Node'},
          {value: 'Oracle DB Node', text: 'Oracle DB Node'},
          {value: 'Kafka', text: 'Kafka Node'},
          {value: 'Zookeeper', text: 'Zookeeper'},
          {value: 'HBase', text: 'HBase'},
        ]
      }
    },

    methods: {
      addEnv() {
        if (this.newEnv.nodes.length < 1) {
          this.showDismissibleAlert = true;
          return
        }

        let fsqmSQMCore = this.newEnv.nodes.find(item => item.hostType === this.optionsHostType[1].value);
        if (fsqmSQMCore) {
          this.newEnv.sqmLink = 'http://' + fsqmSQMCore.hostname + ":8102/SD";
          this.newEnv.iSecureLink = 'http://' + fsqmSQMCore.hostname + ":8102/iSECURE";
          this.newEnv.thinClientLink = 'https://' + fsqmSQMCore.hostname + ":8103/App.html";
        }

        this.$firebaseRefs.envs.push({
          typeEnvironment: this.newEnv.typeEnvironment,
          serverUsageType: this.newEnv.serverUsageType,
          versionSQM: this.newEnv.versionSQM,
          build: this.newEnv.build,
          versionISecure: this.newEnv.versionISecure,
          nodes: this.newEnv.nodes,
          svcMgmtLink: this.newEnv.svcMgmtLink,
          utf8: this.newEnv.utf8,
          isCemInstalled: this.newEnv.isCemInstalled,
          owner: this.newEnv.owner,
          comments: this.newEnv.comments,
          sqmLink: this.newEnv.sqmLink,
          iSecureLink: this.newEnv.iSecureLink,
          thinClientLink: this.newEnv.thinClientLink,
          timestamp_created: Date.now(),
          timestamp_modified: Date.now(),
        });
        this.newEnv.typeEnvironment = "";
        this.newEnv.serverUsageType = "";
        this.newEnv.versionSQM = "";
        this.newEnv.build = "";
        this.newEnv.versionISecure = "";
        this.newEnv.nodes = [];
        this.newEnv.svcMgmtLink = "";
        this.newEnv.utf8 = false;
        this.newEnv.isCemInstalled = false;
        this.newEnv.owner = "";
        this.newEnv.comments = "";
        this.newEnv.sqmLink = "";
        this.newEnv.iSecureLink = "";
        this.newEnv.thinClientLink = "";
        this.$router.push('/')
      },

      addNode() {
        this.showDismissibleAlert = false;
        this.newEnv.nodes.push({
          hostname: "",
          hostType: "",
          model: "",
          hardware_cpu: "",
          hardware_ram: "",
          os: "",
          version: "",
          database: "",
        });
      },

      removeNode(index) {
        this.newEnv.nodes.splice(index, 1)
      }

    }

  }
</script>
<style scoped>
  label.col-sm-12.left-label {
    text-align: left;
  }
</style>
