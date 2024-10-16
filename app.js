const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const session = require("express-session")
const port = 3000;

// const task = [
//     {
//         title:"Apprendre a programmer",
//         done : true,
//     },
//     {
//         title:"Faire les courses",
//         done : false,
//     }
// ];

//console.log(task);


app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:'keyboard',
    resave:false,
    saveUninitialized:true,
    //cookie:{secure:true},
}));

app.set('view engine','ejs');

app.post('/task',(req,res)=>{
    if(req.body.task){
        req.session.task.push({
            title: req.body.task,
            done:false,
        });
    }
    res.redirect('/');

})
app.get('/task/:id/done',(req,res)=>{
    if(req.session.task[req.params.id]){
        req.session.task[req.params.id].done = true
    }

    res.redirect('/')
});

app.get('/task/:id/delete',(req,res)=>{
    if(req.session.task[req.params.task]){
        req.session.task.splice(req.params.id,1);
    }

    
    res.redirect('/')

})

app.get('/',(req,res)=>{
    if(!req.session.task){
        req.session.task = [];
    }
    res.render('todolist',{task:req.session.task});
});

app.listen(port,()=>{
    console.log(`Serveur lancé sur le port ${port}`);
});