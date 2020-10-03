const axios = require('axios')

const ageFinder =async (userName) => {
    try {
        let userDetails = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${userName}.json`).then(res =>(res.data.created)) //request to get user details, take in only created time
        let year = Number(userDetails.toString().substr(0, 4));                                                                            //as we need only created timestamp
        let month = Number(userDetails.toString().substr(4, 2));
        let day = Number(userDetails.toString().substr(6, 2));
        let today = new Date();
        let hnAge = today.getFullYear() -year;
        if(today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
            hnAge--;
        }
        return hnAge/365
    } catch(err) {
        console.log(err.message)
        }
    }

module.exports = ageFinder