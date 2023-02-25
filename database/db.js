const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB=()=>{
    mongoose.connect("mongodb+srv://Vraj:Vishal123@cluster0.n6fk1.mongodb.net/mock-xi?retryWrites=true&w=majority",()=>{
        console.log("Connected to DB")
    })
}

module.exports = connectDB