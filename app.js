const express = require("express");
const path = require("path");
const exp = require("constants");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const { time } = require("console");
const cors = require('cors')
require('dotenv').config()


//define mongoose schema
const contactFormSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String, 
      
},{ timestamps: true });

const contact = mongoose.model('contact', contactFormSchema);

app.use(cors())

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) // For serving static files
app.use(express.urlencoded())


// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}

    res.status(200).sendFile(path.join(__dirname+'/home.html'))
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).sendFile(path.join(__dirname+'/static/html/contacts.html'))
})

app.get('/blog', (req, res) => {
    const params = {}
    res.status(200).sendFile(path.join(__dirname+'/static/html/blog.html'))
})

app.get('/resume', (req, res) => {
    const params = {}
    res.status(200).sendFile(path.join(__dirname+'/static/html/resume.html'))
})
app.get('/submit', (req, res) => {
    const params = {}
    res.status(200).sendFile(path.join(__dirname+'/static/html/submit.html'))
})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    // console.log(req.body);
    myData.save().then(() => {
        res.redirect('/submit')
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")
    });
});


const port = process.env.PORT ||8000;
// START THE SERVER
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
    app.listen(port, () => {
        console.log(`The application started successfully on port ${port}`);
    });
}).catch(err => {
    console.log('Something went wrong with db connection')
    console.error(err)
});
