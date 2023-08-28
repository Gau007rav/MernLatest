//create a connection with Databasse and store data in IconInfo database .

import fetch from "node-fetch";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/IconInfo");
let iconSchema = new mongoose.Schema({
    exchange_id: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    }
})
let icon = mongoose.model("Post", iconSchema)

async function getIcons() {
    try{ let icons = await fetch("https://rest.coinapi.io/v1/exchanges/icons/32/apikey-FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9");
     let response = await icons.json();
     for(let i=0;i<response.length;i++){
        let info = new icon({
            exchange_id:response[i]["exchange_id"],
            URL:response[i]["url"]
        })
        console.log(info)
        info.save();
     }
}catch{
    (err)=>console.log(err)
}
}

getIcons();