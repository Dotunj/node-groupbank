const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
}
input UserInputData {
    email: String!
    first_name: String!
    last_name: String!
    password: String!
}
type RootMutation {
    registerUser(userInput: UserInputData): User!
}
schema{
mutation: RootMutation
}
`);
