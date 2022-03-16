const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee');

app.use(bodyParser.json());

const Employee = mongoose.model("employee");
const mongoUri = "mongodb+srv://XHmYbRKCd52h4Jad:XHmYbRKCd52h4Jad@cluster0.jysgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// XHmYbRKCd52h4Jad
mongoose.connect(mongoUri,{
    useNewUrlParser: true 
})

mongoose.connection.on("connected", ()=>{
    console.log('connected to mongo');
})

mongoose.connection.on("error", (err)=>{
    console.log('error', err);
})

app.get('/', (req, res) => {
    Employee.find({})
    .then((data) => {
        console.log('data', data);
        res.send(data)
    })
    .catch((err) => {
        console.log('err', err);
    })
})

app.post('/send-data', (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image,
        salary: req.body.salary,
        position: req.body.position
    })
    employee.save()
    .then((data) => {
        console.log('data', data);
        res.send(data)
    })
    .catch((err) => {
        console.log('err', err);
    })
    
})

app.post('/delete', (req, res) => {
    Employee.findByIdAndRemove(req.body.id)
    .then((data) => {
        console.log('data', data);
        res.send(data)
    })
    .catch((err) => {
        console.log('err', err);
    })
})

app.post('/update', (req, res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image,
        salary: req.body.salary,
        position: req.body.position
    })
    .then((data) => {
        console.log('data', data);
        res.send(data)
    })
    .catch((err) => {
        console.log('err', err);
    })
})

app.listen(4000,()=> {
    console.log('server is running');
})

    // "name":"Hitesh",
    // "email":"abc@123",
    // "phone":"1234567899",
    // "image":"image url here",
    // "salary":"5 LPA",
    // "position":"Web Developer"