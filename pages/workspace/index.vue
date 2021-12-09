<template>
  <div>
    <div class="form-body">
        Mutation create workspaces
        <div class="input-field">
          <input type="text" class="input-text" v-model="addworkspaces.name" placeholder="enter the name" />
          <button  @click="addWorkspace" >Create Workspace</button>
        </div>
        <div v-if="workspaceAdd">
          <h2>Add workspace success:</h2>
          <p>workspace id: {{workspaceAdd}}</p>
        </div>
    </div>
    <div class="workpaces-list"  v-if="workspaces">
      <div name="list" tag="ul">
          <h2>Workspaces</h2>
          <ul>
            <li>
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
import {WORKSPACES, ADD_WORKSPACE} from '~/graphql/workspace'
export default {
  name: 'WORKSPACES',
  data() {
    return {
      workspaces: [],
      addworkspaces: {
        name: ''
      },
      workspaceAdd: ''
    };
  },
  apollo: {
    $loadingKey: 'loading',
    workspaces: {
      query: WORKSPACES
    },
  },
  methods: {
    addWorkspace() {
      this.$apollo
      .mutate({
        mutation: ADD_WORKSPACE,
        variables: {
          createWorkSpaceInput:{
            name: this.addworkspaces.name
          }
        }
      })
      .then(response => {
        this.workspaceAdd = response.data.createWorkspace.w_id
      })
      .catch(er => {
        console.log(er);
      });
    }
  }
}
</script>
<style>
</style>
