const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = 4464
const mongoose = require('mongoose')
const myRoutes = express.Router();


app.use(cors());
app.use(bodyparser.json())

app.listen(PORT, function(){
    console.log('Server is running on: ' + PORT)  
})


//*************************************************************** */ Database connection håndtering. 
mongoose.connect('mongodb://127.0.0.1:27017/prove_eksamen_bageri', { useNewUrlParser: true, useUnifiedTopology:true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log('mongodb connection complete')
})

app.use('',myRoutes);

//*************************************************************** */ Set up Models
let newslistmodel = require('./model/newsletter.model.js');
let userlistmodel = require('./model/bruger.model.js');
let kommentarlistmodel = require('./model/kommentar.model.js');
let likemodel = require('./model/like.model.js');

//*************************************************************** */ nyhedsbrevs Håndtering.

myRoutes.route('/add/newsEmail').post(function(req,res){
    let newemail = new newslistmodel(req.body);

    newemail.save().then(newsmail =>{
        res.status(200).json({'Email':' Added'})
    }).catch(err => {
        res.status(400).send('add new news-email Fail')
    })
})


//*************************************************************** */ Bruger Håndtering.

myRoutes.route('/add/newUser').post(function(req,res){
    let newuser = new userlistmodel(req.body);

    newuser.save().then(user =>{
        res.status(200).json({'user':' Added'})
    }).catch(err => {
        res.status(400).send('add new user Fail')
    })
})


myRoutes.route('/get/user').get(function(req,res){
    userlistmodel.find({},function(err, brugerList){
        if(err) {
            console.log(err)
        } else {
            res.json(brugerList)
        }
        
    })
})

//*************************************************************** */ Kommentar Håndtering.


myRoutes.route('/add/kommentar').post(function(req,res){
    let newcomment = new kommentarlistmodel(req.body);

    newcomment.save().then(user =>{
        res.status(200).json({'kommentar':' Added'})
    }).catch(err => {
        res.status(400).send('add new news-email Fail')
    })
})

// get kommentar ud fra produkt-id.
myRoutes.route('/get/kommentar/:id').get(function(req,res){

    let p_id = req.params.id;

    kommentarlistmodel.find({"produkt_id": p_id}  ,function(err, currentUser){
        if(err){
            console.log('hej')
        } else {
            res.json(currentUser)
        }

    })
})

// Slet kommentar ud fra kommentar-id.
myRoutes.delete('/delete/comment/:id', function(req,res, next){
    kommentarlistmodel.deleteOne({_id: req.params.id}, function(err, result){
        if(err) {
            console.log('fejl in delete')
        } else {
            var svarretur = "Antal Slettede kommentar: " + result.deletedCount
            res.json(svarretur);
            console.log("Antal Slettede: " + result.deletedCount) 
        }
    }) .catch(function(){
        console.log("FEJL i Deleted Catch")
    })
})


//*************************************************************** */ Like Håndtering.


myRoutes.route('/add/like').post(function(req,res){
    let newlike = new likemodel(req.body);
    newlike.save().then(user =>{
        res.status(200).json({'like':' Added'})
    }).catch(err => {
        res.status(400).send('add like Fail')
    })
})

// get kommentar ud fra produkt-id.
myRoutes.route('/get/like/:id').get(function(req,res){

    let p_id = req.params.id;

    likemodel.find({"produkt_id": p_id}  ,function(err, currentLike){
        if(err){
            console.log('hej')
        } else {
            res.json(currentLike)
        }

    })
})