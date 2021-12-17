<template>
  <div>
    <div>
      <div class="form-body">
        Get Datastores
        <div class="input-field">
          <input class="input-text" type="text" v-model="AppDs.application_id" placeholder="enter the application id" />
          <button  @click="getDs" >Get Datastores</button>
        </div>
      </div>
    </div>
    <div class="workpaces-list"  v-if="datastores">
      <div name="list" tag="ul">
          <h2>Datastores:</h2>
          <ul>
            <li v-if="pendding">Loading...</li>
            <li v-if="errors">{{errors}}</li>
          </ul>
          <ul>
            <li v-for="datastore in datastores" :key="datastore">
              <div>{{datastore}}</div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {GET_DATASTORES} from '~/graphql/datastore'
export default {
  name: 'DATASTORES',
  data() {
    return {
      errors: '',
      pendding: null,
      datastores: [],
      AppDs: {
        application_id: '',
      }
    };
  },
  methods: {
    getDs(){
      this.pendding = true
      this.$apollo
      .query({
        query: GET_DATASTORES,
        variables: {
          applicationId: this.AppDs.application_id
        }
      })
      .then(response => {
        this.pendding = false
        this.datastores = response.data.getApplicationDatastores;
      })
      .catch(error => {
        console.log(error);
        this.pendding = false

      });
    },
  }
}
</script>
<style>
</style>
