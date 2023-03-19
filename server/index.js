// server/index.js

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fruitDB');
}


const personSchema = new mongoose.Schema({
  name: String
});

const Person = mongoose.model('Person', personSchema);

app.get('/', (req, res) => {
  res.send("Hello King");
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server! The King will be back soon!!" });
});

app.post("/post", (req, res) => {
  console.log("Connected to React");

  const name_from_react = req.body.name;
  console.log(name_from_react);

  const newPerson = new Person({ name: name_from_react });
  newPerson.save();

  
  res.json({ message: "Post" });
    
});


app.get("/getName", (req, res) => {
  
  const name_from_react = req.query.name;
  console.log("NAMEREACT:" + name_from_react);
  Person.findOne({ name: name_from_react }).then((docs) => {
    console.log("Result :", docs);
    res.json({ message: "Hello " + docs.name });
  })
    .catch((err) => {
      console.log(err);
      res.json({ message: "" });
    });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
