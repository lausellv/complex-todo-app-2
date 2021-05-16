const dotenv = require('dotenv');
dotenv.config();
mongodb = require('mongodb');

//mongodb.connect(a=connectionString,{},c=function (err, client))
mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
  // firts we access mongodb
module.exports = client;  // from here we can find the collection
//now we can access the app
const app = require('./app');
app.listen(process.env.PORT, "127.0.0.1", function (){
    console.log(`Listening on ${process.env.PORT}`)
  })

})

