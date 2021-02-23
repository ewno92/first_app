const express = require('express')
const app = express()
const port = 3000
const Animal = require('./model/Animal')
const ejsMate = require('ejs-mate')

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate)



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fa', {useNewUrlParser: true, useUnifiedTopology: true});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected')
});



// app.get('/', (req, res) => {
//   res.send('Hello World!')
//   res.render('');
// })



app.get('/', async (req, res) => {
  const animal = await Animal.find({})
  res.render('home', {animal});
})

app.get('/home/:id', async (req, res) => {
  const animal = await Animal.findById(req.params.id)
  res.render('show', { animal });
  console.log(animal)
})

app.listen(port, () => {
  console.log(`Port: ${port} connected`)
})


app.get('/new', async (req, res) => {
  res.render('new');
})



// app.use(express.urlencoded({extended: true}));
app.use(express.urlencoded());

app.post('/new', async (req, res) => {
  const animal = new Animal(req.body)
  console.log(animal)
  // res.send(req.body);
  await animal.save()
  res.redirect(`/home/${animal._id}`)
  // res.redirect('/new')
  console.log(animal)
  // console.log(animal.name)
  // console.log(animal.age)

  
})

app.get('/new/:id', async (req, res) => {
  res.send('hello');
  const {subred} = req.params
  // console.log(subred);
})




app.get('/show/:id/edit', async (req, res) => {
   const animal = await Animal.findById(req.params.id)

  //  console.log(`${animal}`)
  // const animal = await Animal.findById(req.params.id)

  res.render('edit', {animal})
})


app.put('/show/:id', async (req, res) => {

  const {id} = req.params;
  const animal = await Animal.findByIdAndUpdate(id, req.body)
  // const animal = await Animal.findByIdAndUpdate(id, {req.body.name})
  res.redirect(`/home/${animal._id}`)
  console.log(id)

})

app.delete('/show/:id', async (req, res) => {
  const {id} = req.params;
  await Animal.findByIdAndDelete(id);
  res.redirect('/home')
})


app.get('*', async (req, res) => {
  // res.send('unavailable');
  res.send('<a href="/home">home</a>');

})
















const clearDB = async () =>{
  await Animal.deleteMany({});
  
}

const seedDB = async (a, b) =>{
  // await Animal.deleteMany({});
  const animal = new Animal({name: a, age: b})
  await animal.save();
}

// clearDB();
// seedDB('a',4);
// seedDB('bc',6);
// seedDB('asdf', 2);
// seedDB('ffbn', 6);
// seedDB('dgdga',124);
// seedDB('fghj', 24);
// seedDB('dgd', 6);
// seedDB('uyyu', 44);

