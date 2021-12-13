<template>
  <div>
    <div class="form-body">
        Mutation create workspaces
        <div class="input-field">
          <input type="text" class="input-text" v-model="addworkspaces.name" placeholder="enter the name" />
          <button  @click="addWorkspace" >Create Workspace</button>
        </div>
         <div class="workpaces-list">
          <div name="list" tag="ul">
              <h2>Add workspace:</h2>
              <ul>
                <li v-if="pendding">Loading...</li>
                <li v-if="errors">{{errors}}</li>
              </ul>
              <ul>
                <li v-if="workspaceAdd">
                  <div class="description">
                    <p> <span>Workspace id: </span>{{workspaceAdd}}</p>
                  </div>
                </li>
              </ul>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {ADD_WORKSPACE} from '~/graphql/workspace'
export default {
  name: 'WORKSPACES',
  data() {
    return {
      errors: '',
      pedding: false,
      addworkspaces: {
        name: ''
      },
      workspaceAdd: ''
    };
  },
  methods: {
    addWorkspace() {
      this.pedding = true
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
      this.pedding = false

      })
      .catch(er => {
        console.log(er);
        this.errors = JSON.stringify(er)
      });
    }
  }
}
</script>
<style>
</style>
