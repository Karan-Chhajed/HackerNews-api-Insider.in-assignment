//Cache middleware to implement redis cache

const client = require('./redisclient')

const cache = (req, res, next) => {
    client.get("topstories", (err, data) => {
        if(err) throw err;

        if(data !== null) {
            res.send(JSON.parse(data))
        } else {
            next();
        }
    })
}

module.exports = cache;