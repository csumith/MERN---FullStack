const mongoose = require('mongoose');
const assert = require('assert')

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err) => {
        if (err) 
          assert.deepStrictEqual(err,null)
        console.log('mongodb connected successfully')
    })
}
module.exports = connectDB