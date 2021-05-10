const mongodb = require('mongodb');


const connectionString =
'mongodb+srv://todoAppUser:pobox00603@cluster0.hgrns.mongodb.net/ComplexTodoApp?retryWrites=true&w=majority';

//mongodb.connect(a=connectionString,{},c=function (err, client))
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
module.exports = client.db();  // from here we can find the collection
const app = require('./app');
app.listen(3000, "127.0.0.1", function (){
    console.log('Listening on port 3000')
  })

})

