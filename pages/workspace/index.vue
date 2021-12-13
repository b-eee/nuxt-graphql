<template>
  <div>
    <div class="form-body">
        Get workspaces
        <div class="input-field">
          <button  @click="getWorkspaces" >Get Workspaces</button>
        </div>
        <router-link exact to="/workspace/create" class='link'> Create Workspace</router-link>
    </div>
    <div class="workpaces-list"  v-if="workspaces">
      <div name="list" tag="ul">
          <h2>Workspaces:</h2>
          <ul>
            <li v-if="pendding">Loading...</li>
            <li v-if="errors">{{errors}}</li>
          </ul>
          <ul>
            <li v-if="workspaces.current_workspace_id">
              <div class="description">
                <p> <span>Current workspace id: </span>{{workspaces.current_workspace_id}}</p>
              </div>
            </li>
            <li v-for="workspace in workspaces.workspaces" :key="workspace.id">
              <div class="description">
                <p>{{workspace}}</p>
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {WORKSPACES} from '~/graphql/workspace'
export default {
  name: 'WORKSPACES',
  data() {
    return {
      errors: '',
      pendding: null,
      workspaces: [],
    };
  },
  methods: {
    getWorkspaces(){
      this.pendding = true
      this.$apollo
      .query({
        query: WORKSPACES,
      })
      .then(response => {
        this.workspaces = response.data.workspaces
        this.pendding = false
      })
      .catch(er => {
        console.log(er);
        this.errors = JSON.stringify(er)
        this.pendding = false

      });
    },
  }
}
</script>
<style>
</style>
