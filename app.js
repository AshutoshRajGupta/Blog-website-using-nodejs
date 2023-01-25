const express = require('express');
const morgan=require('morgan');
const mongoose=require('mongoose')

//express app
const app=express();   // cfeating ana instance of the express app

//connect to mongodb
const dburi='mongodb+srv://admin:26432643@cluster0.m264ofs.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

//register view engine
app.set('view engine','ejs');


//listen to the request
app.listen(3000);

//middleware and static files

app.use(express.static('public'));
app.use(morgan('dev'));



app.get('/',(req,res)=>{
    const blogs=[
        {title:'eggs',snippet:'hello'},

    ];
    res.render('index',{title:'Home',blogs})
});

app.get('/about',(req,res)=>{
    // res.send('<p>About page</p>');
    // res.sendFile('./views/about.html',{root:__dirname});
    res.render('about',{title:'About'})

});


app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'create a new blog'});
})

//redirects
// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// })


//404 page
app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html',{root:__dirname});
    res.status(404).render('404',{title:'404'});
})
//use function is going to fire for all every single request
//it should be in the bottom of the page
