const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const { data } = require('./data')
//const data = require('./data');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

function offsetf(offset)  {
    if(offset === 0 || isNaN(offset)) {
        return 0;
    } else {
        return offset;
    }
}

function  limitf(limit){
    if(limit === 0 || isNaN(limit)) {
        return 20;
    } else {
        return limit;
    }
}


app.get("/topRankings", (req, res) => {
    let limit = Number(req.query.limit);
    let offset = Number(req.query.offset);
    
    const list = [];
    limit = limitf(limit);
    offset = offsetf(offset);
   
    console.log(limit);
    console.log(offset);


    for(let i = offset; i < offset+limit; i++) {
        list.push(data[i]);
    }
    res.send(list);
})



// app.get('/topRankings',(req,res)=>{
//    // console.log(data);
//  let limit = req.query.limit;
//  let offset = req.query.offset
//  console.log(offset);
//  console.log(limit);

//  const datas = data.find().limit(limit).skip(offset)
//    res.status(200).send(datas);
// })


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
