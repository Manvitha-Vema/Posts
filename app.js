if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const helmet = require("helmet");
const Post=require("./models/Post");
const app = express();
const path=require("path");
let port = 3000;

const dbURL= process.env.MONGO_URL;
// const dbURL="mongodb://localhost:27017/postsDB";
mongoose.connect(dbURL, {
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


app.set("view engine", "ejs");
app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride("_method"));
app.use(helmet()); 


// app.use(
//   session({
//     secret: process.env.SECRET, 
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
//     cookie: { secure: false, httpOnly: true, maxAge: 60000 }, 
//   })
// );

app.get("/",(req,res)=>{
    res.send("working");
})

app.get("/posts", async(req, res) => {
    try{
      const { category } = req.query;
      let query = {};
      if (category) {
        query.category = category;
      }
      const posts = await Post.find(query);
      res.render("post.ejs", { posts });
    
} catch (err) {
        res.status(500).send("Server Error");
      }
  });
  
  app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
  });
  
  app.post("/posts", async(req, res) => {
    try{
    let { title, content,username,category } = req.body;
    const newPost=new Post({
      title: title,
      content: content,
      username:username,
      category:category,
    });
    await newPost.save();
    res.redirect("/posts");
}
    catch (err) {
        res.status(500).send("Server Error");
      }
  });
  
  app.get("/posts/:id", async(req, res) => {
    try{
    let { id } = req.params;
    const posts = await Post.findById(id);
    res.render("view.ejs", { posts });
}
catch (err) {
    res.status(500).send("Server Error");
  }
  });
  
  app.patch("/posts/:id", async(req, res) => {
    try{
    let { id } = req.params;
    let { title, content, username, category } = req.body;
    await Post.findByIdAndUpdate(id, {title, content, username, category });
    res.redirect("/posts");
}
catch (err) {
    res.status(500).send("Server Error");
  }
  });


  app.get("/posts/:id/edit", async(req, res) => {
    try{
    let { id } = req.params;
    const post = await Post.findById(id);
    res.render("edit.ejs", { post });
}
catch (err) {
    res.status(500).send("Server Error");
  }
  });
  
  app.delete("/posts/:id", async(req, res) => {
    try{
    let { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect("/posts");
}
catch (err) {
    res.status(500).send("Server Error");
  }
  });

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
