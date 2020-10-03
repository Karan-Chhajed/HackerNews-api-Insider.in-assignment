# Hacker News API assignment By Paytm Insider.in
A take on Paytm Insider.in assignment. Target is to get the JSON data from Hacker News API and set it us a backend for the client

## Requirements and Dependencies

You will require Node package manager like npm or yarn installed.
      
 ### Dependencies
 
  axios
  redis
  express
  
  
  ### To use the docker / Start the server
  
  Get in the root folder and run
  
    $ docker-compose build
    $ docker-compose up
    
### File Structure

Project---
     redis-
        redisclient.js ---- (Sets redis client)
        cache-middleware-topstories.js ---- (cache middleware for holding top stories) 
     routes/api-
        past-stories.js ---- (sends the stories previosly fetched to past-stories route)
        top-stories ---- (gets and sends top 10 stories sorted by score, single story for an ID, top 10 comments sorted by the number of child comments and child                           comments in a JSON object)
     utils - (utilitsy modules which can re used)
        getNestedComments.js ---- (gets the inner branch of comments)
        hnAgeFinder.js ---- (Finds the age of User in years, when username is passed)
        sorter.js ---- (sorts the given stream of data. Its a custom sort, sorts on the basis of given arguments passed and the method called)
        requestWithMap.js ---- ( Calls axios.get over an array of ids)
        
     docker-compose.yml ---- (docker compose file)
     Dockerfile ---- (Docker File)
     
     server.js ---- main server file, has the server setup

### What you will see

  ##### /top-stories - top 10 stories sorted by their score

  ##### /top-stories/:story_id - story details of one selected story

  ##### ./top-stories/:story_id/comments - Story and its comments sorted by the number of child comments and also the child components




