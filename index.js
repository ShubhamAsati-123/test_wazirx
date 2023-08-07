const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const db = require('./database/data');
let logger = require('./middleware/logger.js');
require('dotenv').config()
const port = process.env.PORT
app.use(logger);
app.use(upload.array());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public/'));
const url = "https://api.wazirx.com/api/v2/tickers";

async function FetchAPI() {
    let res = await fetch(url);
    let Data = await res.json();
    let result_keys = Object.keys(Data).slice(0, 10);
    result_keys.map(async (responses) => {
       await db.PutData(Data[responses]);
    });

};
db.ConnectDB();
app.get('/', async (req, res) => {
    await FetchAPI();
       let data = await db.GetData();
    res.json(data);
});


app.listen(port, (req, res) => {
    console.log(`server listening on port ${port}....`);
});