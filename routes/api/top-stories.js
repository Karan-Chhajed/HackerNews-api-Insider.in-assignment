const express = require('express');
const router = express.Router();
const axios = require('axios')
const client = require('../../redis/redisclient');
const cache = require('../../redis/cache-middleware-topstories')

const {sortIt, sortItByLength} = require('../../utils/sorter')
const ageFinder = require('../../utils/hnAgefinder');
const getNestedComments = require('../../utils/getNestedComments')

//@route        GET routes/api/top-stories
//@desc         GET get the description of the top stories
//access        public


//cache middleware

router.get('/', cache, async (req, res) => {
   try {
       const listOfStoriesResponse = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json") //get all top stories
        const listOfTenStories = listOfStoriesResponse.data.slice(0,10)                                        //get first ten story ids
        const storiesContentResponses = await Promise.all(
            listOfTenStories.map(
                (id) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)                     //make axios request to each one of ids
            )
        )
        const storiesContent = storiesContentResponses.map(response => response.data)                          //resolve the response

        const finalStoriesData = storiesContent.sort(sortIt("score"))                                          //sort by score using a custom sort function

        //set data to redis
        client.set("topstories", JSON.stringify(finalStoriesData), 'EX', 600)                                  // set data to redis cache, cache emptys after 600 seconds(10 mins)
        client.set("paststories", JSON.stringify(finalStoriesData))                                            //set data to another redis key so that it can keep record of stories fetched and   
                                                                                                            //retrieve it in past stories route
        res.send(finalStoriesData)
    } catch(err) {
        console.log(err.message)
    }
})

//@route        GET routes/api/top-stories/:story_id
//desc          get the story details
//access        public

router.get('/:story_id', async (req, res) => {
   try {
        const onStory = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${req.params.story_id}.json`) //just get the story details by api call
        res.send(onStory.data)
        
   } catch(err) {
        console.error(err.mesage)
   }
})

//@route        GET routes/api/:story_id/comments
//desc          get the comments on the selected story
//access        Public


router.get('/:story_id/comments', async (req, res) => {
    try {

        const storyComments = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${req.params.story_id}/kids.json`) //Get all the comments and then select the first 10 comments
        const listOfTenComments = storyComments.data.slice(0, 10)                                                             //in the next step
        const commentsContentResponse = await Promise.all(
            listOfTenComments.map((id) => 
                axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            )
        )

        const commentsResponse = commentsContentResponse.map(response => response.data) //get all the comments data

        const parent = JSON.parse(commentsResponse[0].parent)                           //get the parent(story) details here so that we can properly frame the JSON object we want to send

        const parentData = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${parent}.json`)
        
        const nestedComments = await getNestedComments(commentsResponse)                //use getNestedComments to get inner comments. Visit utils/getNestedComments to see how the function works
        const sortedNestedComments = nestedComments.sort(sortItByLength("replies"))     //sort by the number of child comments 
        
        const commentsPayload = [{
            story: {
                id: parentData.data.id,                                                  //JSON payload which we will be sending
                title: parentData.data.title,
                url: parentData.data.url,
                score: parentData.data.score,
                timeOfSubmission: parentData.data.time,
                by: parentData.data.by,
                date:await ageFinder(parentData.data.by),
                comments: sortedNestedComments,
                
                }
            }]
        
            res.send(commentsPayload)

        
    } catch (err) {
        console.error(err.message)
    }
})


module.exports = router;
