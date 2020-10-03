//Map over and make request over array of ids

const axios = require('axios')

const arrayMapper = async (array) => {
    if(array !== undefined) {
        let response = await Promise.all(
            array.map(
                id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            )
         ) 
        const finalResponse =await response.map(res => res.data)
        return finalResponse
   }
   return "No Comments"
}

module.exports = arrayMapper;
    