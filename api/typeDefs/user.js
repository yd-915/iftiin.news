import { gql } from 'apollo-server-micro'

export default gql`
  extend type Query {
    me: User
    user(name: String!): User
    users: [User!]
    nameAvailable(name: String!): Boolean!
    topUsers(cursor: String, within: String!): Users
  }

  type Users {
    cursor: String
    users: [User!]!
  }

  extend type Mutation {
    setName(name: String!): Boolean
    setSettings(tipDefault: Int!): Boolean
    upsertBio(bio: String!): User!
    setWalkthrough(tipPopover: Boolean, upvotePopover: Boolean): Boolean
  }

  type User {
    id: ID!
    createdAt: String!
    name: String
    nitems: Int!
    ncomments: Int!
    stacked: Int!
    freePosts: Int!
    freeComments: Int!
    hasNewNotes: Boolean!
    hasInvites: Boolean!
    tipDefault: Int!
    bio: Item
    sats: Int!
    msats: Int!
    upvotePopover: Boolean!
    tipPopover: Boolean!
  }
`
