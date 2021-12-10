
import gql from 'graphql-tag'
export const GET_DATASTORES = gql`
  query GetApplicationDatastores($applicationId: String!) {
    getApplicationDatastores(applicationId: $applicationId) {
      datastore_id
      name
      display_id
      deleted
      imported
      uploading
    }
  }`;

