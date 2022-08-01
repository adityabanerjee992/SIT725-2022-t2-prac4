const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname+'/public'))
// Calling the express.json() method for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})