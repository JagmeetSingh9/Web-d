const port = 5000;
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
require('./db/connection');
app.set("view engine", "ejs");
const staticPath = path.join(__dirname, "./public");
app.use(express.static(staticPath));
const Article = require("./models/article");

app.get('/', (req, res) => {
    try{
        res.render('home');
    }
    catch(e)
    {
        console.log(e);
    }
})

app.get('/article/new/', (req, res) => {
    try{
        res.render('new');
    }
    catch(e)
    {
        console.log(e);
    }
})

app.post('/my-article', async (req, res) => {
    try{
        console.log("hello");
        console.log(req.body);
        const articleData = new Article({
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        })

        const data = await articleData.save();  
        console.log(data);
        res.render('my-article', {title: "hello"});
    } 
    catch(e){
        console.log("hi");
        res.render('my-article', {title: "hello"});
        res.send(e);
    }
})

app.get('my-article', (req, res) => {
    try {
        res.render('my-article');
    } 
    catch (e) {
        console.log(e);
    }
})


app.listen(port, (error) => {
    if(error){
        console.log("Error");
        return;
    }
    console.log(`Listening to post ${port}`);
})