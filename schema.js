const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
_id : ID!
firstName : String!
lastName : String!
email : String!
password : String!
message : String!
}

type Auth {
    message : String!
    tokens : String!
    success : Boolean!  
}

type Query{
    Users(userID:String!):[User]
}

type Mutation{
   register(firstName: String!, lastName: String!, email: String!, password: String!):Auth
   login(email: String!, password: String!):Auth
   changePassword(email: String! , password: String! , newPassword: String!):Auth
}
`
module.exports = { typeDefs };
