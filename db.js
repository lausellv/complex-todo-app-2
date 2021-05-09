const mongodb = require('mongodb');
const app = require('./app');

const connectionString =
'mongodb+srv://todoAppUser:pobox00603@cluster0.hgrns.mongodb.net/ComplexTodoApp?retryWrites=true&w=majority';


mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
module.exports = client.db();
app.listen(3000, "127.0.0.1", function (){
    console.log('Listening on port 3000')
  })

})

