import mongoose from 'mongoose';
const mongoURI='mongodb://localhost:27017';

export const connecToMongo= ()=>{
    mongoose.connect(mongoURI,{
        dbName:"Inotebook",
    })
    .then(()=>{console.log("Connected to DB")})
    .catch((e)=>{console.log(e)});
}
