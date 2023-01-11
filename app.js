//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); // it is a module for comparing  strings
const mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost:27017/blogDB");
mongoose.connect("mongodb+srv://shivam:niGsUsiJrBDKadts@cluster0.c1g4cgk.mongodb.net/?retryWrites=true&w=majority");

const postSchema = new mongoose.Schema({
  title : String,
  content : String
});

const Post = mongoose.model("Post",postSchema);

const homeStartingContent = "Welcome to the Daily Journal . Here you can write your custom personalised diaries . You can use it as your daily Diary . Click on the COMPOSE tab on the right side of this page . Mention the content of your story and give each story a specific Title .All your posted diaries will be visible on this Home page .  Hope you like it.";
const aboutContent = "It is a full stack website created using html , css, javascript for the Frontend and nodejs and mongodb for the Backend . The server created using node using various express modules and libraries is hosted by Heroku. Heroku keeps the server on and working . The Database used for it is mongodb and it is hosted by Mongodb atlas . All the changes you make on the webpage and data gets svaed on the mongodb server . ";
const contactContent = "You ca reach me out on my mail  - jagtapshivam02@gmail.com . Also can connect with me on Twitter , Instagram and LinkedIn. Thanks For Visiting. ";

const app = express();

//let posts=[]; //it is a globally declared array. we will add new posts created by the user here

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){

 // res.render("home",{homeStartingContent2:homeStartingContent }); 

 Post.find({},function(err,posts){
  res.render("home",{homeStartingContent2:homeStartingContent , posts:posts});
 })

 //res.render("home",{homeStartingContent2:homeStartingContent , postTobeWritten:posts});
})
// these below requests of .get will be called whenever it is called from anywhere...
app.get("/about",function(req,res){
  res.render("about",{aboutContent2:aboutContent})
})

app.get("/contact",function(req,res){
  res.render("contact" ,{contactContent2:contactContent})
})

app.get("/compose",function(req,res){
  res.render("compose");
  
})


  app.get("/posts/:postId",function(req,res){
    const requestedPostId=req.params.postId;

    Post.findOne({_id:requestedPostId},function(err,post){
      res.render("post",{title:post.title , content:post.content});
    })
 
 })

app.post("/compose",function(req,res){
  
const post2=new Post({
  title : req.body.t2,
  content : req.body.textbody
});

post2.save(function(err){
  if(!err){
    res.redirect("/");
  }
});

 
})











app.listen(3000, function() {
  console.log("Server started on port 3000");
});