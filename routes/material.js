
const express = require('express');
const Material = require('../models/material');

const router = express.Router();


router.get('/all', async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch materials' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const material = await Material.findById(id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching material' });
  }
});


router.post('/add', async (req, res) => {
  const { name, quantity, description } = req.body;

  const newMaterial = new Material({
    name,
    quantity,
    totalQuantity: quantity,
    description,
    history: [{
      type: 'Added',
      amount: quantity,
      date: new Date().toLocaleString()
    }]
  });

  try {
    await newMaterial.save();
    res.status(201).json({ message: 'Material added successfully' });
  } catch (err) {  
    res.status(500).json({ message: 'Error adding material' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity, history } = req.body;
  console.log(quantity,history)
  try {
    const material = await Material.findById(id);

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    const updatedProduct = await Material.findByIdAndUpdate(
      id,
      { $set: { quantity: quantity } },
      { new: true }                    
    );
    res.status(200).json({ message: 'Material updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating material'});
  }
});

module.exports = router;
