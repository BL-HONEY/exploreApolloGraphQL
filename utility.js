require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateTokens = (payload) => {
    var tokens =  jwt.sign({
        "email": payload.email,
        "userId": payload.userId
    }, process.env.APP_SECRET);
    return tokens;
}

exports.verifyTokens = (tokens) => {
    var payload =  jwt.verify(tokens, process.env.APP_SECRET)
    return payload;
}