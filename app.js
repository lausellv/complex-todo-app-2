const express = require ('express');
const app = express();
const router = require('./router')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', router);  // this is our universal entry point for our router





module.exports = app; 
// app.listen(3000, "127.0.0.1", function (){
//   console.log('Listening on port 3000')
// })