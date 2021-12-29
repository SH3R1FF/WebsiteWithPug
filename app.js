const express = require('express');
const path = require('path')
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contacts',{useNewUrlParser:true});
const port = 8000;


const contactSchema = new mongoose.Schema({
    Fullname:{
      type:String,
      required:true
    },
    EmailAddress:{
      type:String,
      required:true
    },
    Phonenumber:{
      type:Number,
      required:true
    },
    Message:{
      type:String,
      required:true
    },
  });

const Contact = mongoose.model('Contact',contactSchema);


// Express Specific Stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());


// Pug Specific Stuff
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

// Endpoints
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
  })
app.get('/contacts', (req, res)=>{
    const params = {}
    res.status(200).render('contacts.pug',params);
  })

app.post('/contacts', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
      res.send('The item has been saved successfully')
    }).catch(()=>{
      res.status(400).send('The item has not been saved')
    });

    // res.status(200).render('contacts.pug')
  })

//Starting the server
app.listen(port,()=>{
    console.log('Application Started');
})