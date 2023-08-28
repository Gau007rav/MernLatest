//conncetion with database and create an Get Api which have filter and get the data from ExchangeInfo Database(collection name= posts)

import express from "express";
import cors from "cors"
import {MongoClient} from "mongodb";
let url = "mongodb://localhost:27017";
let database = "ExchangeInfo"
let client = new MongoClient(url);

async function dbConnect(){
    let result = await client.connect();
    let db = result.db(database);
     return db.collection("posts");
   
}

let app = express();
app.use(cors());
app.use(express.json());
app.get("/",async(req,res)=>{
    let data = await dbConnect();
    let page = Number(req.query.page) || 1;
    
    let limit = Number(req.query.limit) || 10;
    let skip = (page-1)*limit;
   
    data = await data.find(req.query).skip(skip).limit(limit).toArray();
   
    
    res.send(data)
})




app.listen(7000)