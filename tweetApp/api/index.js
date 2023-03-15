const express = require('express');
const Post = require('../models/post-model');
const User = require('../models/user-model');
const bodyParser = require("body-parser");
const path = require('path')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')



app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cookieParser())
app.use(bodyParser.json())


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//database connection 
const DATABASE_URI = "mongodb+srv://<>:<>@cluster0.yguzzzc.mongodb.net/mypostingapp?retryWrites=true&w=majority"
const mongoose = require('mongoose');

    

mongoose.connect(DATABASE_URI)
    .then((result) =>{
    console.log('connected to db');
    app.listen(8080,()=>{
        console.log("listning .....")
    })
})
    .catch((err)=>{
    console.log(err)
})



app.get('/',(req,res)=>{
    res.render('home')
})
//LOGIN

app.get('/login',(req, res)=>{
    res.render('login')
})

app.post('/login-user',(req,res)=>{
    var username = req.body.username;
    User.find({userid: username})
     .then((result)=>{
        if (result.length == 0) res.send("Invalid Username")
        if(req.body.password == result[0].password){
            var payload = {
                "userid": result[0]._id,
                "role" : "user" 
            }
            var JWT = jwt.sign(payload, 'hello');
            res.cookie('token', JWT)
            res.send({token:JWT}) 

        }
        
        })
     
     .catch((err)=>{
        
        console.log({"err": err})
     })
    })



//user-creation
app.get('/register',(req,res)=>{
    res.render('register');
})
app.post('/add-user',(req,res)=>{
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    if (password == confirm_password){
        var user = new User({
            userid: username,
            firstname: firstname,
            lastname : lastname,
            password : password
        })
        user.save()
         .then((result)=> res.send('success'))
         
         .catch((err)=> {
            res.send("not unique")
         })
    }else{
        res.send("retry")
    }
    
})



//uopoad post .... 

app.post('/upload',(req, res) => {
    const token = req.cookies['token']
    if (token) {
        const decode = jwt.verify(token,'hello');
        if (decode){
        
         



         const posT = new Post({
            userid: decode.userid,
            title : req.body.title,
            post: req.body.post

         })
         posT.save()
          .then((result)=>{
            res.send('post uploaded successfully!!!')
          }) 







        }
    }
    else{
        res.send('no token')
    }
})


//test-code 

app.get('/test-add-post',(req,res)=>{
   const post = new Post({
    userid: 'awdw456',
    title: 'hello world awd',
    post: 'hello world from me!'

   })
   post.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.get('/test-add-user',(req,res)=>{
    const user = new User({
        userid:'max',
        firstname: 'max',
        lastname: 'plank',
        password:'test1234'
    })
    user.save()
     .then((result)=>{
        res.send(result)
    })
     .catch((err)=>{
        res.send(err)
    })
})
