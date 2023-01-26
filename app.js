const express = require('express');
const morgan=require('morgan');
const mongoose=require('mongoose')
const Blog = require('./models/blog.js')
const blogRoutes=require('./routes/blogRoutes');

//express app
const app=express();   // cfeating ana instance of the express app

//connect to mongodb
const dburi='mongodb+srv://admin:26432643@cluster0.m264ofs.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));
//register view engine
app.set('view engine','ejs');

//middleware and static files

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.get('/',(req,res)=>{
    res.redirect('/blogs')
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'})

});

//blogs routes
app.use('/blogs',blogRoutes);

//404 page
app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html',{root:__dirname});
    res.status(404).render('404',{title:'404'});
})
//use function is going to fire for all every single request
//it should be in the bottom of the page
