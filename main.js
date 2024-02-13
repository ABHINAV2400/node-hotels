// let fs = require('fs');
// let os = require('os');

// let user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt', + 'hi' +user.username+ '\n' , () => console.log('file created'));


// console.log(fs);

// let _ = require('lodash');
// const notes = require('./note')

// let age = notes.age;
// let result = notes.addNumber(age, 10);
// let data = ["abhinav", "hello", 12, 12];
// let filter = _.uniq(data);
// console.log(filter);
// console.log(age);
// console.log(result);

const express = require('express')
const app = express();
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const personRoutes = require('./routes/person_routes');
app.use('/person',personRoutes); 

const MenuItem = require('./models/menuItem')

app.get('/', function(req, res){
    res.send('hello world');
}); 

app.listen(3000,() =>{
    console.log('server running on 3000')
})