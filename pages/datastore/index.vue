<template>
  <div>
    <div>
      <div class="form-body">
        Get Datastores
        <div class="input-field">
          <input class="input-text" type="text" v-model="AppDs.application_id" placeholder="enter the application id" />
          <button  @click="getDs" >Get Datastores</button>
        </div>
        <!-- <router-link exact to="/datastore/create" class='link'> Create datastores</router-link> -->
      </div>
    </div>
    <div class="workpaces-list"  v-if="datastores">
      <div name="list" tag="ul">
          <h2>Datastores</h2>
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
      datastores: [],
      AppDs: {
        application_id: '',
      }
    };
  },
  methods: {
    getDs(){
      this.$apollo
      .query({
        query: GET_DATASTORES,
        variables: {
          applicationId: this.AppDs.application_id
        }
      })
      .then(response => {
        this.datastores = response.data.getApplicationDatastores;
      })
      .catch(error => {
        console.log(error);
      });
    },
  }
}
</script>
<style>
</style>
