<template>
  <div>
    <div>
      <div class="form-body">
        Get Application
        <div class="input-field">
          <input type="text" v-model="AppDs.workspace_id" placeholder="enter the workspace id" />
          <button  @click="getAppDs" >Get Application</button>
        </div>
    </div>
    </div>
    <div class="workpaces-list"  v-if="applications">
      <div name="list" tag="ul">
          <h2>applications</h2>
          <ul>
            <li v-for="application in applications" :key="application.application_id">
              <div class="description">
                <p>application id: {{application.application_id}}</p>
              </div>
              <div class="description">
                <p>display id: {{application.display_id}}</p>
              </div>
              <div class="description">
                <p>name: {{application.name}}</p>
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
import {GET_APPLICATIONDATASTORE, ADD_APPLICATION} from '~/graphql/application'
export default {
  name: 'WORKSPACES',
  data() {
    return {
      applications: [],
      addworkspaces: {
        name: ''
      },
      AppDs: {
        workspace_id: ''
      }
    };
  },
  methods: {
    getAppDs(){
      this.$apollo
      .query({
        query: GET_APPLICATIONDATASTORE,
        variables: {
          workspaceId: this.AppDs.workspace_id
        }
      })
      .then(response => {
        this.applications = response.data.getApplicationAndDataStore;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>
<style>
  header {
    text-align: center;
  }
  header .order {
    margin-top: 20px;
  }
  button {
    margin: 0 10px;
    color: #1195c9;
    border: 3px solid #1195c9;
    background: #d5f0ff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  header .title{
    /* display: flex; */
    justify-content: center;
  }
  header img {
    width: 100%;
    max-width: 250px;
    margin-right: 20px;
  }
  .form-body{
    margin: 0 auto;
    width: 100%;
    max-width: 400px;
  }
  .form-body{
    margin: 0 auto;
    width: 100%;
    max-width: 400px;
  }
</style>
