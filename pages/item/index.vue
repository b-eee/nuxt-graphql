<template>
  <div>
    <div>
      <div class="form-body">
        Get Items
        <div class="input-field">
          <input class="input-text" type="text" v-model="AppDs.application_id" placeholder="enter the application id" />
          <input class="input-text" type="text" v-model="AppDs.datastore_id" placeholder="enter the datastore id" />
          <button  @click="getItems" >Get Items</button>
        </div>
      </div>
    </div>
    <div class="workpaces-list"  v-if="items">
      <div name="list" tag="ul">
          <h2>Items:</h2>
          <ul>
            <li v-if="pendding">Loading...</li>
            <li v-if="errors">{{errors}}</li>
          </ul>
          <ul>
            <li v-if="totalItems">Total Items: {{totalItems}}</li>
            <li v-for="(item, index) in items" :key="item">
              <div>Item {{index}}:{{item}}</div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {MUTATION_ITEMS} from '~/graphql/item'
export default {
  name: 'ITEMS',
  data() {
    return {
      errors: '',
      pendding: null,
      items: [],
      totalItems: 0,
      AppDs: {
        application_id: '',
        datastore_id: '',
      },
      getItemsParameters: {
        page:1,
        per_page:0
      }
    };
  },
  methods: {
    getItems(){
      this.pendding = true
      this.$apollo
      .mutate({
        mutation: MUTATION_ITEMS,
        variables: {
          datastoreId: this.AppDs.datastore_id,
          projectId: this.AppDs.application_id,
          getItemsParameters:{
            page: this.getItemsParameters.page,
            per_page: this.getItemsParameters.per_page
          }
        }
      })
      .then(response => {
        this.items = response.data.datastoreGetDatastoreItems.items
        this.totalItems = response.data.datastoreGetDatastoreItems.totalItems
        this.pendding = false
      })
      .catch(er => {
        console.log(er)
        this.errors = JSON.stringify(er)
        this.pendding = false
      });
    },
  }
}
</script>
<style>
</style>
