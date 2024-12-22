const express = require('express');
const app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
//export DEBUG=app:generale
const debugGenerale = require('debug')('app:generale');
const cors = require('cors');

const authRouter = require('./routes/auth');

const URLMongo = 'mongodb+srv://giuseppe2:db_123@cluster0.8p51urq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(URLMongo || process.env.DB_URI);
var db = {};
var collection = {};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
// Configura CORS per non permettere richieste da domini non autorizzati
const corsOptions = {
    origin: true // Impostando 'origin' a false, non permettiamo nessuna richiesta cross-origin
  };
app.use(cors(corsOptions));

app.use('/',authRouter);


// app.listen(3000, () => {
//     try{
//         console.log('Server running on port 3000');
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// });


//Controllo connessione
// async function ping()
// {
//     let pingResult = await client.db().admin().ping();
//     if(pingResult.ok == 1)
//     {
//         debugGenerale('Connesso al DB');
//     }
//     else
//     {
//         debugGenerale('Non Connesso al DB');
//     }
// }

module.exports = app;
