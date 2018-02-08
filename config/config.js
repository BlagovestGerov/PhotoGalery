
module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbPath:'mongodb://localhost:27017/server-express-db'
    },
    production: {}
}