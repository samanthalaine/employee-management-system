const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      wage: {
        type: Number,
        required: true,
      },
}, 
{ timestamps: true }
)

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee