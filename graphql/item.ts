import gql from 'graphql-tag'

export const MUTATION_ITEMS = gql`
    mutation Mutation($getItemsParameters: GetItemsParameters!, $datastoreId: String!, $projectId: String) {
      datastoreGetDatastoreItems(getItemsParameters: $getItemsParameters, datastoreId: $datastoreId, projectId: $projectId) {
        items
        totalItems
      }
    }`;
