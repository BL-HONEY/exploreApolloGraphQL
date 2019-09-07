module.exports = {
    "isProduction": false,
    "PORT": 4000,
    "mongo": {
        "url": "mongodb://localhost:27017/apollo",
        "options": {
            "useNewUrlParser": true
        },
        "createIndex": {
            "useCreateIndex": true
        }
    },
}