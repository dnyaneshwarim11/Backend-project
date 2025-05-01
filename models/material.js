
const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },       
  totalQuantity: { type: Number, required: true },    
  description: { type: String, required: true },    
  history: [
    {
      type: { type: String }, 
      amount: { type: Number },
      date: { type: String }
    }
  ]
});

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;
