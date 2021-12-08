<template>
  <div>
    <div class="form-body">
        Mutation create workspaces
        <div class="input-field">
          <input type="text" v-model="addworkspaces.name" placeholder="enter the name" />
          <button  @click="addWorkspace" >ADD Workspace</button>
        </div>
        <div v-if="workspaceAdd">
          Add workspace success:
          <p>workspace id:{{workspaceAdd}}</p>
        </div>
    </div>
    <div v-if="loading">
      <h2>LOADING...</h2>
    </div>
    <div v-else-if="error">{{error}}</div>
    <div class="workpaces-list"  v-else-if="workspaces">
      <div name="list" tag="ul">
          <h2>Workspaces</h2>
          <ul>
            <li>
              <div class="description">
                <p> <span> current workspace id: </span>{{workspaces.current_workspace_id}}</p>
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
</style>
