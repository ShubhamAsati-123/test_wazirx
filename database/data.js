const mongoose = require('mongoose');
const Display = require('./display');
async function ConnectDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/testDB");

};

async function PutData(data){
    let Data = Display(data);
    await Data.save();
    return await  Data;
}
async function GetData(){
    let data = await Display.find() ;
    let Data = data.splice(0,data.length-10);
    return data;
}
module.exports = {
  PutData,
  GetData,
  ConnectDB
}