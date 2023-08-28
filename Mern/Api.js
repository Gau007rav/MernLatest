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
    // let response = await collection.find().toArray();
   
}

let app = express();
app.use(cors());
app.use(express.json());
app.get("/",async(req,res)=>{
    let data = await dbConnect();
    let page = Number(req.query.page) || 1;
    
    let limit = Number(req.query.limit) || 10;
    let skip = (page-1)*limit;
    //let startIndex= (page-1)*limit;
    //let endIndex = page.limit
    data = await data.find(req.query).skip(skip).limit(limit).toArray();
    //data = data.slice(startIndex,endIndex);
    
    //console.log(data)
    
    res.send(data)
})




app.listen(7000)