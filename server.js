const express = require('express')
const app = express()
const port = 3000

var cors = require('cors')
let projectCollection; 


app.use(express.static(__dirname+'/public'))
// Calling the express.json() method for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const MongoClient = require('mongodb').MongoClient

//add database connection...

const uri = 'mongodb+srv://root:admin@cluster0.fbvd86t.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})

//create collection....
const createColllection = (collectionName) => {
  client.connect((err,db) => {
      projectCollection = client.db().collection(collectionName);
      if(!err) {
          console.log('MongoDB Connected')
      }
      else {
          console.log("DB Error: ", err);
          process.exit(1);
      }
  })
}

//insert project......
const insertProjects = (project, callback) => {
  projectCollection.insert(project,callback);
}

//get project....
const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
}

const cardList = [
  {
      title: "Kitten 2",
      image: "images/kitten-2.jpg",
      link: "About Kitten 2",
      desciption: "Demo desciption about kitten 2"
  },
  {
      title: "Kitten 3",
      image: "images/kitten-3.jpg",
      link: "About Kitten 3",
      desciption: "Demo desciption about kitten 3"
  }
]

// get api...!!
app.get('/api/projects',(req,res) => {
  getProjects((err,result) => {
      if(err) {
          res.json({statusCode: 400, message: err})
      }
      else {
          res.json({statusCode: 200, message:"Success", data: result})
      }
  })
})

// post api....
app.post('/api/projects',(req,res) => {
  console.log("New Project added", req.body)
  var newProject = req.body;
  insertProjects(newProject,(err,result) => {
      if(err) {
          res.json({statusCode: 400, message: err})
      }
      else {
          res.json({statusCode: 200, message:"Project Successfully added", data: result})
      }
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
  createColllection('Pets')
})