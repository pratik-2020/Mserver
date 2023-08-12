const MongoClient = require('mongodb');
let url = "mongodb+srv://pratik:pratik@cluster0.2f1wudi.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((er, dt) => {
    if(er){
        console.log(er);
    }
    else{
        console.log("Connection successful!!");
    }
});

module.exports = client;