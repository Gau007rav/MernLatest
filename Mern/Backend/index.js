//create a connection with Databasse and store data in ExchangeInfo database .


import fetch from "node-fetch";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/ExchangeInfo");
let exchangeSchema = new mongoose.Schema({
    exchange_id: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data_quote_start: {
        type: String,
        required: true
    },
    data_quote_end: {
        type: String,
        required: true
    },
    data_orderbook_start: {
        type: String,
        required: true
    },
    data_orderbook_end: {
        type: String,
        required: true
    },
    data_trade_start: {
        type: String,
        required: true
    },
    data_trade_end: {
        type: String,
        required: true
    },
    data_symbols_count: {
        type: Number,
        required: true
    },
    volume_1hrs_usd: {
        type: Number,
        required: true
    },
    volume_1day_usd: {
        type: Number,
        required: true
    },
    volume_1mth_usd: {
        type: Number,
        required: true
    },
    
})

let exchange = mongoose.model("Post", exchangeSchema)

async function getExchanges() {
   try{ let exchanges = await fetch("https://rest.coinapi.io/v1/exchanges/apikey-FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9");
    let response = await exchanges.json();
    for(let i=0;i<=response.length;i++){
     let data =  new exchange ({
        exchange_id:response[i]["exchange_id"],
        website:response[i]["website"],
        name:response[i]["name"],
        data_quote_start:response[i]["data_quote_start"],
        data_quote_end:response[i]["data_quote_end"],
        data_orderbook_start:response[i]["data_orderbook_start"],
        data_orderbook_end:response[i]["data_orderbook_end"],
        data_trade_start:response[i]["data_trade_start"],
        data_trade_end:response[i]["data_trade_end"],
        data_symbols_count:response[i]["data_symbols_count"],
        volume_1hrs_usd:response[i]["volume_1hrs_usd"],
       evolume_1day_usd:response[i]["volume_1day_usd"],
        volume_1mth_usd:response[i]["volume_1mth_usd"],
        //metric_id:response[i][["metric_id"]],
       })
      data.save();
       
    }
}catch{(err)=>{
    console.log(err)
}}
   
}

getExchanges();