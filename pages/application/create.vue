<template>
  <div>
    <div>
      <div class="form-body">
        Create Application
        <div class="input-field">
          <div>
            <div>
              Name EN: <input class="input-text" type="text" v-model="addApp.name.en" placeholder="name English" />
            </div>
            <div>
              Name JP: <input class="input-text" type="text" v-model="addApp.name.ja" placeholder="name Japanese" />
            </div>
            <div>
              Template ID: <input class="input-text" type="text" v-model="addApp.tp_id" placeholder="Template Id" />
            </div>
          </div>
          <button  @click="createApp" >Create Application</button>
        </div>
      </div>
      <div class="result"  v-if="isCreated">
        <h2>Add Application success:</h2>
        <p>Project id: {{applicationAdd.project_id}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {ADD_APPLICATION} from '~/graphql/application'
export default {
  name:   'WORKSPACES',
  data() {
    return {
      applicationAdd: {
        project_id: ''
      },
      isCreated: false,
      addApp: {
        name: {
          ja: '',
          en: '',
        },
        tp_id: ''
      },
    };
  },
  methods: {
    createApp() {
      this.$apollo
      .mutate({
        mutation: ADD_APPLICATION,
        variables: {
          createProjectParams:{
            name: {
              ja: this.addApp.name.ja,
              en: this.addApp.name.en
            },
            tp_id: this.addApp.tp_id
          }
        }
      })
      .then(response => {
        this.applicationAdd = response.data.applicationCreateProject
        this.isCreated = true
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
