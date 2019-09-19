
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const db = require('./config/db').db;

const userRouter = require('./router/api/userinfo');

const bodyParser = require('body-parser');


mongoose.connect(db).then(() => {
    console.log('mongodb connected');
}).catch(err => console.log(err));

app.get('/', (req,res) => {
    res.send('express done!');
});

const port = process.env.PORT || 8080;
app.get('/api/hello', (req,res) => {
    res.send({express:'Hello from Express'});
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use('/api/',userRouter);


app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});

