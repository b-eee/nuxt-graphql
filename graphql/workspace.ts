import gql from 'graphql-tag'

export const WORKSPACES = gql`
  query Workspaces {
    workspaces {
      workspaces {
        workspace_name
        workspace_id
      },
      current_workspace_id
    }
  }`

export const ADD_WORKSPACE = gql`
mutation createWorkspace($createWorkSpaceInput: CreateWorkSpaceInput!) {
    createWorkspace(createWorkSpaceInput: $createWorkSpaceInput) {
      w_id
    }
  }`;
