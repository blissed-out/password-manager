const express = require('express')
const bodyparser = require('body-parser')
const { MongoClient, ObjectId} = require('mongodb');
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passman';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

// Get all the passwords 
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult })
})

// Delete passwords by id
app.delete('/', async (req, res) => {
    const id = req.body
    const db = client.db(dbName);
    let findResult = await db.collection('passwords').deleteOne({ _id: new ObjectId(id._id)});
    console.log(findResult)
    res.send({success:true, result:findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
