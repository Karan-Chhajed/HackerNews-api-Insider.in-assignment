
const ageFinder = require('./hnAgefinder')
const requestWithMap = require('./arrayMapper')

const getNestedComments = async (targetArray) => {
    let nestedCommentsResponse = []

    for(let objectArray of targetArray){

        const hnAge = await ageFinder(objectArray.by)                   //Make use of ageFinder to find the age of each ad every user
        const replies = await requestWithMap(objectArray.kids)          //get the data of in-nest comments        
        let commentJsonObject = {
            by: objectArray.by,
            hnAge: hnAge,
            text: objectArray.text,
            replies: replies,                                            //JSON object which will act as sub comments response for the selected story
        }
        
        nestedCommentsResponse.push(commentJsonObject)
    }
   
    return nestedCommentsResponse
}

module.exports = getNestedComments;