const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser")
const port = 8000;

//Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// connecting mongodb 
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', { useNewUrlParser: true });

// define mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    concern: String
  });

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contact.pug', params);
})

 // post method to send values in mongodb
// app.post('/contact', (req, res)=>{
//     var myData = new Contact(req.body);
//     myData.save().then(()=>{
//       res.send("this Item has been saved to the database")  
//     }).catch(()=>{
//         res.status(400).send("Item was not saved to the database")
//     });
//     // res.status(200).render('contact.pug');
// })

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database");
    }).catch((error) => {
        console.error(error);
        res.status(400).send(`Error: ${error.message}`);
    });
});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
