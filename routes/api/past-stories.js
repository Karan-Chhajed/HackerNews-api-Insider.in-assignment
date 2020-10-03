const express = require('express');
const router = express.Router();
const client = require('../../redis/redisclient');

//@route            GET routers/api/past-stories
//@desc             gets all the past stories served
//@access           Public


router.get('/', async (req, res) => {
    client.get("paststories", (err, data) => {
        if(err) throw err

        if(data !== null){
            res.send(JSON.parse(data))
        } else {
            res.status(404).send("No data Found")
        }
    })
})

module.exports = router