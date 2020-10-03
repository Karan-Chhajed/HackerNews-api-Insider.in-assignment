const express = require('express')

app = express()

PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API is up'))

//Define Routes

app.use('/api/top-stories',require('./routes/api/top-stories'))
app.use('/api/past-stories', require('./routes/api/past-stories'))

app.listen(PORT, () => {
    console.log(`Server up and running at ${PORT}`)
})