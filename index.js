const express = require("express");
const app = express();
const port = process.env.PORT || 3000; //updated
const path = require("path");
const{v4:uuidv4} = require("uuid");
const methodOverride = require('method-override')


app.use(express.urlencoded({extended:true})); //parse middleware for handling post request
app.use(methodOverride('_method'))

app.set("view engine","ejs"); //set ejs as template engine
app.set("views", path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))

let posts = [
    {
    id:uuidv4(),
    username:"ApnaCollege",
    content : "I love apna college" 
    },
    {
    id:uuidv4(),
    username:"Sakshi",
    content : "Hi..! I am a full stack developer." 
    },
    {
    id:uuidv4(), 
    username:"Rahul Kumar",
    content : "Hard Work is important to achieve success" 
    }
]
app.get("/", (req, res) => {
    res.redirect("/posts");
});
app.get("/posts", (req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});

    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{ //view post individually
    let {id}=req.params;    
    let post = posts.find((p)=> id===p.id)
    console.log(post)
    res.render("show.ejs",{post})  
})

app.patch("/posts/:id",(req,res)=>{ //update patch request (edit)
    let {id}=req.params;    
    let newContent = req.body.content;
    let post = posts.find((p)=> id===p.id)
    post.content = newContent;
    console.log(post)
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;    
    let post = posts.find((p)=> id===p.id)
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id} =req.params;
    posts = posts.filter((p)=> id!==p.id);
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log(`Server Started, listening on port${port}`);
})

