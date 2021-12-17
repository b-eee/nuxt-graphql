<template>
  <div>
    <div>
      <div class="form-body">
        Get Application
        <div class="input-field">
          <input class="input-text" type="text" v-model="AppDs.workspace_id" placeholder="enter the workspace id" />
          <button  @click="getAppDs" >Get Application</button>
        </div>
        <router-link exact to="/application/create" class='link'> Create Applications</router-link>
      </div>
    </div>
    <div class="workpaces-list"  v-if="applications">
      <div name="list" tag="ul">
          <h2>Applications:</h2>
          <ul>
            <li v-if="pendding">Loading...</li>
            <li v-if="errors">{{errors}}</li>
          </ul>
          <ul>
            <li v-for="application in applications" :key="application.application_id">
              <div class="description">
                <p>Application id: {{application.application_id}}</p>
              </div>
              <div class="description">
                <p>Display id: {{application.display_id}}</p>
              </div>
              <div class="description">
                <p>Name: {{application.name}}</p>
              </div>
              <div class="description">
                Datastores:
                <ul>
                  <li  v-for="datastore in application.datastores" :key="datastore"> {{datastore}}</li>
                </ul>
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {GET_APPLICATIONDATASTORE} from '~/graphql/application'
export default {
  name: 'WORKSPACES',
  data() {
    return {
      errors: '',
      pendding: null,
      applications: [],
      AppDs: {
        workspace_id: '',
      }
    };
  },
  methods: {
    getAppDs(){
      this.pendding = true
      this.$apollo
      .query({
        query: GET_APPLICATIONDATASTORE,
        variables: {
          workspaceId: this.AppDs.workspace_id
        }
      })
      .then(response => {
        this.applications = response.data.getApplicationAndDataStore;
        this.pendding = false
      })
      .catch(error => {
        console.log(error);
        this.errors = error
        this.pendding = false
      });
    },
  }
}
</script>
<style>
</style>
