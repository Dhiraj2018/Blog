const express = require('express');
const path = require('path');
const app = express();
const mongoose = require ('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/meanang2',(err)=>{
    if(err){
        console.log('Cannot Connect to the Database: ', err);
    } else{
        console.log('Connected to database: '+ config.db);
        
    }
})
const schema = mongoose.Schema;
var userSchema = new schema({
    name: String
});

app.use(express.static(path.join(__dirname,'client/dist/client')));
app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'client/dist/client/index.html'))
    
})
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Listening to the server \n');
    
})

module.exports = mongoose.model('user',userSchema);