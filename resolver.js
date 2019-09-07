const register = require('./mutation/userMutation').register;
const login = require('./mutation/userMutation').login;
const changePassword = require('./mutation/userMutation').changePassword;



//resolvers
exports.resolvers = {

    Query: {
 
    },
    // Mutations
    Mutation: {
        register,
        login,
        changePassword
    },
}