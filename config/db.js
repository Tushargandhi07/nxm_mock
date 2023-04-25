const mongoose = require('mongoose');

const connection= mongoose.connect("mongodb+srv://tushar:tushargan@cluster0.8gqmylk.mongodb.net/mock");

module.exports={
    connection
}